import express from "express";
import type { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// Inlined chemistry formatting utilities to ensure zero relative-import issues in Vercel Serverless
const SUB_MAP: Record<string, string> = {
  "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄",
  "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
  "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎", "n": "ₙ", "m": "ₘ",
};
const SUP_MAP: Record<string, string> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
  "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
  "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾",
};
function toSubscript(str: string): string {
  return str.split("").map((c) => SUB_MAP[c] || c).join("");
}
function toSuperscript(str: string): string {
  return str.split("").map((c) => SUP_MAP[c] || c).join("");
}
const COMMON_CHEM_FORMULAS = [
  { raw: /\bH2O\b/g, formatted: "H₂O" },
  { raw: /\bCO2\b/g, formatted: "CO₂" },
  { raw: /\bO2\b/g, formatted: "O₂" },
  { raw: /\bN2\b/g, formatted: "N₂" },
  { raw: /\bH2\b/g, formatted: "H₂" },
  { raw: /\bCl2\b/g, formatted: "Cl₂" },
  { raw: /\bSO2\b/g, formatted: "SO₂" },
  { raw: /\bSO3\b/g, formatted: "SO₃" },
  { raw: /\bNO2\b/g, formatted: "NO₂" },
  { raw: /\bN2O\b/g, formatted: "N₂O" },
  { raw: /\bNH3\b/g, formatted: "NH₃" },
  { raw: /\bCH4\b/g, formatted: "CH₄" },
  { raw: /\bC2H4\b/g, formatted: "C₂H₄" },
  { raw: /\bC2H2\b/g, formatted: "C₂H₂" },
  { raw: /\bC2H5OH\b/g, formatted: "C₂H₅OH" },
  { raw: /\bCH3COOH\b/g, formatted: "CH₃COOH" },
  { raw: /\bC6H12O6\b/g, formatted: "C₆H₁₂O₆" },
  { raw: /\bH2SO4\b/g, formatted: "H₂SO₄" },
  { raw: /\bHNO3\b/g, formatted: "HNO₃" },
  { raw: /\bCaCO3\b/g, formatted: "CaCO₃" },
  { raw: /\bCa\(OH\)2\b/g, formatted: "Ca(OH)₂" },
  { raw: /\bBaSO4\b/g, formatted: "BaSO₄" },
  { raw: /\bFe2O3\b/g, formatted: "Fe₂O₃" },
  { raw: /\bFe3O4\b/g, formatted: "Fe₃O₄" },
  { raw: /\bAl2O3\b/g, formatted: "Al₂O₃" },
  { raw: /\bCuSO4\b/g, formatted: "CuSO₄" },
  { raw: /\bNaCl\b/g, formatted: "NaCl" },
];
function normalizeChemistryText(content: string): string {
  if (!content) return "";
  let text = content;
  text = text.replace(/\$([0-9.]+)\s*\^\\circ\s*\\text\{\s*([A-Za-z]+)\s*\}\$/g, "$1 °$2");
  text = text.replace(/\$([0-9.]+)\s*\^\{\\circ\}\s*\\text\{\s*([A-Za-z]+)\s*\}\$/g, "$1 °$2");
  text = text.replace(/\$([0-9.]+)\s*\^\\circ\s*([A-Za-z]+)\$/g, "$1 °$2");
  text = text.replace(/([0-9.]+)\s*\^\\circ\s*([A-Za-z]+)\b/g, "$1 °$2");
  text = text.replace(/\$([0-9.,]+)\s*\\text\{\s*([^}]+)\s*\}\$/g, "$1 $2");
  text = text.replace(/\$([0-9.,]+)\s*(atm|kPa|bar|mmHg|mol\/L|mL|L|mol|g|kg)\$/gi, "$1 $2");
  text = text.replace(/_\{([0-9+-\s]+)\}/g, (_, sub) => toSubscript(sub.trim()));
  text = text.replace(/_([0-9])/g, (_, sub) => toSubscript(sub));
  text = text.replace(/\^\{([0-9+-\s]+)\}/g, (_, sup) => toSuperscript(sup.trim()));
  text = text.replace(/\^([0-9+\-])/g, (_, sup) => toSuperscript(sup));
  text = text.replace(/\\rightarrow/g, "→");
  text = text.replace(/\\to\b/g, "→");
  text = text.replace(/\\rightleftharpoons/g, "⇌");
  text = text.replace(/--\s*t°\s*-->/gi, " —(t°)→ ");
  text = text.replace(/-->/g, " → ");
  text = text.replace(/\$([0-9.,]+)\$/g, "$1");
  COMMON_CHEM_FORMULAS.forEach(({ raw, formatted }) => {
    text = text.replace(raw, formatted);
  });
  return text;
}

let currentDirname = process.cwd();
try {
  if (typeof import.meta?.url === "string") {
    currentDirname = path.dirname(fileURLToPath(import.meta.url));
  }
} catch {
  currentDirname = process.cwd();
}

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initialization of GoogleGenAI
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Teacher Avatar Persistent Storage
const AVATAR_FILE_PATH = path.join(process.cwd(), "public", "teacher_duong.png");
const AVATAR_DATA_PATH = process.env.VERCEL
  ? path.join("/tmp", ".teacher_avatar.json")
  : path.join(process.cwd(), ".teacher_avatar.json");

// Club Cover Photo Persistent Storage
const COVER_FILE_PATH = path.join(process.cwd(), "public", "assets", "students_chemistry_lab.jpg");
const COVER_DATA_PATH = process.env.VERCEL
  ? path.join("/tmp", ".club_cover.json")
  : path.join(process.cwd(), ".club_cover.json");

const apiRouter = express.Router();

// Health check endpoint
apiRouter.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    appName: "CLB Hoá học THCS Lý Tự Trọng - KNTT",
    academicYear: "2026-2027",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

apiRouter.get("/teacher-avatar", (_req: Request, res: Response) => {
  try {
    if (fs.existsSync(AVATAR_DATA_PATH)) {
      const data = JSON.parse(fs.readFileSync(AVATAR_DATA_PATH, "utf8"));
      if (data && data.avatarUrl) {
        return res.json({ avatarUrl: data.avatarUrl });
      }
    }
    const defaultDataPath = path.join(process.cwd(), ".teacher_avatar.json");
    if (fs.existsSync(defaultDataPath)) {
      const data = JSON.parse(fs.readFileSync(defaultDataPath, "utf8"));
      if (data && data.avatarUrl) {
        return res.json({ avatarUrl: data.avatarUrl });
      }
    }
    if (fs.existsSync(AVATAR_FILE_PATH)) {
      return res.json({ avatarUrl: "/teacher_duong.png" });
    }
    return res.json({ avatarUrl: null });
  } catch (err) {
    console.error("Error reading teacher avatar:", err);
    return res.json({ avatarUrl: null });
  }
});

apiRouter.post("/teacher-avatar", (req: Request, res: Response) => {
  try {
    const { avatarUrl } = req.body;
    if (!avatarUrl || typeof avatarUrl !== "string") {
      return res.status(400).json({ error: "Thiếu dữ liệu ảnh avatar" });
    }

    try {
      fs.writeFileSync(AVATAR_DATA_PATH, JSON.stringify({ avatarUrl, updatedAt: new Date().toISOString() }), "utf8");
    } catch (writeErr) {
      console.warn("Could not write avatar data path:", writeErr);
    }

    // If it is a base64 data URL, attempt to write binary to public/teacher_duong.png if filesystem is writable
    if (avatarUrl.startsWith("data:image/") && !process.env.VERCEL) {
      try {
        const base64Data = avatarUrl.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const publicDir = path.join(process.cwd(), "public");
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true });
        }
        fs.writeFileSync(AVATAR_FILE_PATH, buffer);
      } catch (fileErr) {
        console.warn("Could not write avatar image to public folder:", fileErr);
      }
    }

    return res.json({ success: true, avatarUrl });
  } catch (err: any) {
    console.error("Error saving teacher avatar:", err);
    return res.status(500).json({ error: "Không thể lưu ảnh đại diện trên máy chủ" });
  }
});

// Club Cover Image Endpoint
apiRouter.get("/club-cover", (_req: Request, res: Response) => {
  try {
    if (fs.existsSync(COVER_DATA_PATH)) {
      const data = JSON.parse(fs.readFileSync(COVER_DATA_PATH, "utf8"));
      if (data && data.coverUrl) {
        return res.json({ coverUrl: data.coverUrl });
      }
    }
    const defaultCoverPath = path.join(process.cwd(), ".club_cover.json");
    if (fs.existsSync(defaultCoverPath)) {
      const data = JSON.parse(fs.readFileSync(defaultCoverPath, "utf8"));
      if (data && data.coverUrl) {
        return res.json({ coverUrl: data.coverUrl });
      }
    }
    if (fs.existsSync(COVER_FILE_PATH)) {
      return res.json({ coverUrl: "/assets/students_chemistry_lab.jpg" });
    }
    return res.json({ coverUrl: null });
  } catch (err) {
    console.error("Error reading club cover:", err);
    return res.json({ coverUrl: null });
  }
});

apiRouter.post("/club-cover", (req: Request, res: Response) => {
  try {
    const { coverUrl } = req.body;
    if (!coverUrl || typeof coverUrl !== "string") {
      return res.status(400).json({ error: "Thiếu dữ liệu ảnh bìa CLB" });
    }

    try {
      fs.writeFileSync(COVER_DATA_PATH, JSON.stringify({ coverUrl, updatedAt: new Date().toISOString() }), "utf8");
    } catch (writeErr) {
      console.warn("Could not write cover data path:", writeErr);
    }

    // If it is a base64 data URL, attempt to write binary to public/assets/students_chemistry_lab.jpg
    if (coverUrl.startsWith("data:image/") && !process.env.VERCEL) {
      try {
        const base64Data = coverUrl.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const assetsDir = path.join(process.cwd(), "public", "assets");
        if (!fs.existsSync(assetsDir)) {
          fs.mkdirSync(assetsDir, { recursive: true });
        }
        fs.writeFileSync(COVER_FILE_PATH, buffer);
      } catch (fileErr) {
        console.warn("Could not write cover image to public folder:", fileErr);
      }
    }

    return res.json({ success: true, coverUrl });
  } catch (err: any) {
    console.error("Error saving club cover:", err);
    return res.status(500).json({ error: "Không thể lưu ảnh bìa trên máy chủ" });
  }
});

// System persona prompt for the Chemistry Teacher & AI Scientist
const TEACHER_SYSTEM_PROMPT = `Bạn là Trợ lý AI đồng hành cùng Cô Huỳnh Thị Thùy Dương (Chủ nhiệm CLB Hoá học, Giáo viên Hoá học - Tổ KHTN, Trường THCS Lý Tự Trọng, Tây Ninh).
Bạn là chuyên gia AI giáo dục, nhà khoa học hoá học và nhà sư phạm tâm huyết có nhiều năm kinh nghiệm giảng dạy môn Khoa học tự nhiên (phân môn Hoá học, Vật lý, Sinh học và STEM) lớp 6, 7, 8, 9 theo bộ sách "Kết nối tri thức với cuộc sống" (KNTT).

TÔN CHỈ SƯ PHẠM ĐỂ GIẢI THÍCH DỄ HIỂU NHẤT CHO MỌI HỌC SINH:
1. Luôn dùng hình ảnh ẩn dụ đời thường (Analogy) để biến khái niệm vi mô, trừu tượng thành hình ảnh quen thuộc:
   - Nguyên tử: như hệ mặt trời thu nhỏ (hạt nhân ở giữa, các electron quay quanh theo lớp như các hành tinh).
   - Phân tử & liên kết: như những bàn tay nắm chặt lấy nhau tạo thành khối vững chãi.
   - Hóa trị: như số cánh tay của nguyên tử chìa ra để ghép nối tạo nên hợp chất.
   - Độ tan & nồng độ: như độ ngọt đậm hay nhạt của một ly nước cam, nước chanh pha đường.
   - Chất xúc tác / Enzyme: như người chỉ đường nhanh nhẹn hoặc chiếc chìa khoá mở then chốt phản ứng mà không bị mất đi.
2. Trả lời đúng trọng tâm với cấu trúc 4 phần rõ ràng:
   ### 1. Hiện tượng & Câu trả lời cốt lõi (Nêu bản chất ngay trong 1-2 câu đầu bằng từ ngữ giản dị)
   ### 2. Bản chất khoa học đằng sau (Phân tích mạch lạc, phương trình chữ hoặc KHHH chuẩn Unicode)
   ### 3. Ứng dụng thực tế đời sống thú vị (Liên hệ nhà bếp, đồ ăn thức uống, thiên nhiên hay danh lam Tây Ninh)
   ### 4. Thử thách nhỏ / Câu hỏi gợi mở (Để kích thích học sinh tiếp tục tư duy)
3. Ngôn ngữ trong sáng, gần gũi, ấm áp của Cô Dương, xưng "cô" và gọi "em", truyền cảm hứng yêu khoa học.
4. Đảm bảo AN TOÀN TUYỆT ĐỐI trong mọi hướng dẫn thực nghiệm hay gợi ý thí nghiệm.

QUY CHUẨN KIẾN THỨC CHUẨN XÁC SGK KẾT NỐI TRI THỨC (GDPT 2018):
- Thể tích 1 mol chất khí ở điều kiện chuẩn (25 °C, 1 bar) là 24,79 L (tuyệt đối không dùng số cũ 22,4 L).
- Phản ứng sắt (Fe): Fe + 2HCl → FeCl₂ + H₂↑ (sắt II); nhưng 2Fe + 3Cl₂ —(t°)→ 2FeCl₃ (sắt III); 3Fe + 2O₂ —(t°)→ Fe₃O₄ (oxit sắt từ).
- Chỉ thị màu: Axit làm quỳ tím hoá đỏ; Kiềm/Bazơ tan làm quỳ tím hoá xanh; Phenolphthalein chỉ đổi màu hồng trong môi trường kiềm.
- Dãy hoạt động hoá học: K, Na, Ca, Mg, Al, Zn, Fe, Pb, (H), Cu, Ag, Au (kim loại trước H mới giải phóng H₂ từ axit loãng).
- An toàn pha loãng H₂SO₄ đặc: Rót từ từ axit vào nước, TUYỆT ĐỐI không rót nước vào axit đặc.

QUY CHUẨN TRÌNH BÀY HOÁ HỌC & ĐƠN VỊ KHOA HỌC (BẮT BUỘC):
- TUYỆT ĐỐI KHÔNG dùng cú pháp LaTeX thô như $100^\\circ\\text{C}$, $1\\text{ atm}$, $\\text{H}_2\\text{O}$, $\\text{CO}_2$, $\\text{Fe}^{3+}$.
- Luôn sử dụng ký tự Unicode trực tiếp:
  + Nhiệt độ: '100 °C', '25 °C', '0 °C'.
  + Áp suất & đơn vị: '1 atm', '101,3 kPa', '1 bar', '250 mL', '1 mol/L', '24,79 L'.
  + Công thức hoá học: H₂O, CO₂, O₂, N₂, H₂, CaCO₃, Al₂(SO₄)₃, BaSO₄, FeCl₂, FeCl₃, H₂SO₄, NaOH, Ca(OH)₂...
  + Điện tích ion: Fe²⁺, Fe³⁺, Cu²⁺, SO₄²⁻, Cl⁻, H⁺, OH⁻...
  + Phương trình phản ứng hoá học: viết trên dòng riêng, có mũi tên '→' (hoặc '—(t°)→' nếu có nhiệt độ), ghi rõ '↑' hoặc '↓'.`;

// Multi-model executor with seamless fallback
async function generateWithGemini(
  ai: GoogleGenAI,
  prompt: string,
  systemInstruction: string,
  temperature = 0.7
): Promise<string> {
  const candidateModels = ["gemini-flash-latest", "gemini-3.1-flash-lite", "gemini-3.8-flash"];
  let lastError: any = null;

  for (const model of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
          temperature,
        },
      });
      if (response.text && response.text.trim()) {
        return response.text;
      }
    } catch (err: any) {
      lastError = err;
      console.warn(`[Gemini API] Model ${model} unavailable (${err?.status || err?.message}), attempting next model...`);
    }
  }

  throw lastError || new Error("All candidate Gemini models failed to respond");
}

// Intelligent pedagogical knowledge engine for offline or high-demand fallback
function getPedagogicalAnswer(question: string, grade?: string): string {
  const q = question.toLowerCase().trim();

  if (q.includes("cân bằng") && (q.includes("phương trình") || q.includes("pt") || q.includes("hoá học") || q.includes("hóa học"))) {
    return normalizeChemistryText(`Chào em! Cân bằng phương trình hoá học là kỹ năng nền tảng quan trọng bậc nhất của môn KHTN / Hoá học THCS (bộ sách Kết nối tri thức). Cô hướng dẫn em **phương pháp cân bằng đơn giản, nhanh và chuẩn xác nhất (Quy tắc ưu tiên & Phương pháp Chẵn - Lẻ)** nhé:

### 1. Nguyên tắc cốt lõi không được quên
- **Định luật bảo toàn khối lượng:** Tổng số nguyên tử của từng nguyên tố ở vế trái (chất phản ứng) **luôn luôn bằng** vế phải (chất sản phẩm).
- **Quy tắc bất di bất dịch:** Ta chỉ được thêm **hệ số** đặt phía trước công thức hoá học (ví dụ: **2**H₂O, **3**O₂). **Tuyệt đối không được thay đổi chỉ số chân** (chẳng hạn không được đổi Al₂O₃ thành Al₂O₄ hay H₂O thành H₂O₂)!

### 2. Thứ tự ưu tiên cân bằng nhanh (Mẹo vàng của Cô Dương)
Khi nhìn vào một phương trình, em hãy cân bằng lần lượt theo thứ tự:
1. **Kim loại** trước tiên (Al, Fe, Cu, Na, Ca, Mg, Zn...).
2. **Phi kim** tiếp theo (C, S, P, Cl, N...).
3. **Hydrogen (H)** kế tiếp.
4. **Oxygen (O)** kiểm tra cuối cùng (nếu các nguyên tố trên đã đúng thì Oxygen sẽ tự động khớp!).
*(Mẹo nhỏ: Nếu trong phương trình có nhóm nguyên tử như SO₄, NO₃, OH, PO₄ không bị vỡ sau phản ứng, em hãy xem cả nhóm đó như một đơn vị để cân bằng).*

### 3. Phương pháp Chẵn - Lẻ (Bí quyết giải nhanh)
Nếu một nguyên tố ở một vế có số nguyên tử là **số lẻ**, còn vế kia là **số chẵn**, em hãy nhân hệ số **2** vào chất chứa số lẻ đó để biến nó thành số chẵn, sau đó cân bằng các nguyên tố còn lại.

### 4. Ba ví dụ mẫu từng bước cực dễ hiểu

**Ví dụ 1: Nhôm tác dụng với Oxi**
- Sơ đồ: \`Al + O₂ ──(t°)──> Al₂O₃\`
- Phân tích: Bên phải có 3 nguyên tử O (lẻ), bên trái có 2 nguyên tử O (chẵn).
- Bước 1 (Làm chẵn O): Đặt hệ số **2** trước Al₂O₃ ──> \`Al + O₂ ──> 2Al₂O₃\` (lúc này bên phải có 2 × 3 = 6 nguyên tử O).
- Bước 2 (Khớp O bên trái): Đặt hệ số **3** trước O₂ (3 × 2 = 6 nguyên tử O).
- Bước 3 (Khớp Al): Bên phải có 2 × 2 = 4 nguyên tử Al ──> Đặt hệ số **4** trước Al ở vế trái.
- Phương trình hoàn chỉnh:
  **4Al + 3O₂ ──(t°)──> 2Al₂O₃**

**Ví dụ 2: Sắt tác dụng với Axit clohiđric**
- Sơ đồ: \`Fe + HCl ──> FeCl₂ + H₂↑\`
- Quan sát: Vế phải có 2 Cl và 2 H.
- Bước 1: Chỉ cần đặt hệ số **2** trước HCl ở vế trái là cả Cl và H đều khớp!
- Phương trình hoàn chỉnh:
  **Fe + 2HCl ──> FeCl₂ + H₂↑**

**Ví dụ 3: Đốt cháy khí gas gia đình (Metan)**
- Sơ đồ: \`CH₄ + O₂ ──(t°)──> CO₂ + H₂O\`
- Cân bằng C: 1 C = 1 C (đã bằng).
- Cân bằng H: Vế trái có 4 H, vế phải có 2 H ──> Đặt hệ số **2** trước H₂O (thành 4 H).
- Cân bằng O: Vế phải có 2 (trong CO₂) + 2 (trong 2H₂O) = 4 O ──> Đặt hệ số **2** trước O₂ ở vế trái.
- Phương trình hoàn chỉnh:
  **CH₄ + 2O₂ ──(t°)──> CO₂ + 2H₂O**

Em hãy thử áp dụng ngay với phản ứng: \`Fe + O₂ ──(t°)──> Fe₃O₄\` và cho cô biết hệ số của Fe và O₂ là bao nhiêu nhé!`);
  }

  if (
    q.includes("sản xuất muối") ||
    q.includes("san xuat muoi") ||
    q.includes("làm muối") ||
    q.includes("lam muoi") ||
    q.includes("người ta sản xuất muối") ||
    q.includes("nguoi ta san xuat muoi") ||
    (q.includes("muối") && (q.includes("ruộng") || q.includes("bay hơi") || q.includes("kết tinh") || q.includes("tạo ra") || q.includes("như thế nào")))
  ) {
    return normalizeChemistryText(`Chào em, cô rất vui khi thấy em quan tâm đến những hiện tượng khoa học ngay trong đời sống hàng ngày! Câu hỏi của em về **"cách sản xuất muối"** rất thú vị, đặc biệt khi chúng ta liên hệ với những vùng làm muối nổi tiếng ở nước ta như Cà Ná (Ninh Thuận) hay Bạc Liêu:

### 1. Hiện tượng & Câu trả lời cốt lõi
Muối ăn (thành phần chính là **sodium chloride - NaCl**) mà chúng ta sử dụng hàng ngày chủ yếu được sản xuất từ nước biển thông qua phương pháp **kết tinh bằng cách làm bay hơi nước**.

Quy trình cơ bản là: Dẫn nước biển vào các ruộng muối (ô nề), dưới tác động của ánh nắng mặt trời và gió, nước sẽ bay hơi dần. Khi nồng độ muối trong nước biển đạt đến mức bão hòa, muối sẽ bắt đầu kết tinh thành các tinh thể rắn màu trắng trên mặt ruộng để diêm dân thu hoạch.

### 2. Quy trình 4 bước sản xuất muối truyền thống từ nước biển
1. **Lấy nước biển vào ruộng chứa (Ruộng phơi nước):** Dẫn nước biển triều cường vào các mương dẫn rồi vào các ô phơi thô để lắng bớt bùn cát và tạp chất lơ lửng.
2. **Cô đặc nước muối (Tăng độ mặn):** Nước biển được chuyển dần qua các ô phơi nông hơn (ô chịu, ô xắp). Ánh nắng mặt trời gay gắt và gió biển làm phân tử nước (**H₂O**) bay hơi liên tục, làm nồng độ muối tăng từ khoảng 3,5% lên 20–25% (nước chạt).
3. **Kết tinh muối (Ô kết tinh):** Khi nước chạt đạt độ bão hòa (khoảng 25–28 độ Bé), nước được tháo vào ô kết tinh có nền đất nện chặt hoặc lót bạt HDPE sạch. Tại đây, tinh thể **NaCl** bắt đầu lắng đọng và kết tinh thành những hạt muối trắng tinh.
4. **Thu hoạch & Tinh chế:** Diêm dân dùng bừa cào muối thành từng đống hình chóp để ráo nước chạt (chứa các muối magie, canxi đắng), sau đó vận chuyển về kho và đưa vào nhà máy tinh chế, bổ sung vi chất **Iodine (I-ốt)** chống bệnh bướu cổ trước khi đóng gói thành phẩm.

### 3. Bản chất hoá học & SGK KNTT (Lớp 8 & 9)
- **Phương pháp tách chất:** Sản xuất muối là ví dụ tiêu biểu nhất của phương pháp **cô cạn và kết tinh** dựa trên độ tan và sự bay hơi của dung môi (nước).
- **Phân tách phân đoạn:** Ở nồng độ thấp, thạch cao (CaSO₄) kết tinh trước; tiếp đến là muối ăn (NaCl) kết tinh ở độ mặn lý tưởng; cuối cùng các muối có vị đắng như MgCl₂, MgSO₄ còn lại trong nước ót được loại bỏ để hạt muối có vị mặn thanh khiết.
- **Vai trò công nghiệp:** Muối ăn NaCl là nguyên liệu đầu vào để sản xuất xút (NaOH), khí clo (Cl₂), nước Javel tẩy rửa và axit clohiđric (HCl).

### 4. Thử thách nhỏ cho em
Vì sao các cánh đồng muối lớn nhất Việt Nam lại tập trung ở Duyên hải Nam Trung Bộ (Ninh Thuận, Bình Thuận) mà không nằm ở miền Bắc? Yếu tố thời tiết nào quyết định năng suất làm muối của diêm dân?`);
  }

  if (q.includes("nước biển") || (q.includes("biển") && q.includes("mặn")) || q.includes("muối biển") || q.includes("đại dương")) {
    return normalizeChemistryText(`Chào em! Câu hỏi "Tại sao nước biển lại mặn?" là một câu hỏi khoa học kinh điển rất hay và gắn liền với chu trình tự nhiên của Trái Đất qua hàng tỷ năm:

### 1. Hiện tượng & Câu trả lời cốt lõi
Nước biển mặn là do sự hòa tan và tích tụ của **các loại muối khoáng**, chủ yếu là **muối ăn (sodium chloride - NaCl)** chiếm hơn 85% tổng lượng muối tan, cùng với các ion khoáng chất khác được nước mưa và sông ngòi bào mòn từ đất đá trên lục địa đổ dồn về đại dương suốt hơn 4 tỷ năm qua.

### 2. Bản chất hoá học & Chu trình tuần hoàn
Quá trình tạo nên độ mặn của biển diễn ra theo chu trình hoá học tự nhiên khép kín:
- **Nước mưa có tính axit nhẹ:** Trong không khí có khí carbon dioxide (CO₂), khí này hoà tan vào nước mưa tạo thành một lượng axit carbonic (H₂CO₃) rất yếu:
  \`CO₂ + H₂O ⇌ H₂CO₃\`
- **Sự phong hoá đất đá:** Khi nước mưa rơi xuống núi non đất đá, axit nhẹ này phản ứng và bào mòn khoáng chất, giải phóng các ion kim loại và phi kim:
  + Các ion dương: Na⁺ (sodium), Mg²⁺ (magnesium), Ca²⁺ (calcium), K⁺ (potassium).
  + Các ion âm: Cl⁻ (chloride), SO₄²⁻ (sulfate), HCO₃⁻ (bicarbonate).
- **Hành trình ra biển:** Nước mưa gom thành suối, chảy ra các dòng sông và cuốn theo các ion này đổ về biển cả.
- **Sự tích tụ muối:** Nước biển dưới ánh nắng mặt trời liên tục bốc hơi (chỉ có phân tử **H₂O** bay lên mây), còn toàn bộ các ion muối khoáng không thể bay hơi mà đọng lại ở đại dương. Qua hàng tỷ năm, nồng độ muối ngày càng đậm đặc (trung bình khoảng 35 g muối / 1 lít nước biển, tức độ mặn 3,5%).

### 3. Ứng dụng thực tế đời sống
- **Nghề làm muối (Diêm dân):** Tận dụng quá trình bốc hơi tự nhiên của nước biển dưới nắng gió để kết tinh muối ăn NaCl tinh khiết phục vụ ăn uống và công nghiệp hoá chất.
- **Tại sao nước sông không mặn?** Nước sông cũng chứa các ion khoáng nhưng nồng độ cực nhỏ (dưới 0,05%) vì nước sông luôn luân chuyển liên tục, không bị tích tụ bốc hơi đậm đặc như đại dương.

### 4. Thử thách nhỏ cho em
Nếu em đun sôi một cốc nước biển cho đến khi cạn kiệt đáy nồi, em sẽ thu được chất gì? Hãy thử viết kí hiệu hoá học của chất đó nhé!`);
  }

  if (q.includes("nước sôi") || (q.includes("nước") && q.includes("sôi"))) {
    return normalizeChemistryText(`Chào em! Câu hỏi về nhiệt độ sôi của nước là một chủ đề rất quen thuộc nhưng chứa đựng vô số điều thú vị theo chương trình Khoa học tự nhiên (KNTT):

### 1. Hiện tượng & Câu trả lời cốt lõi
* **Nhiệt độ sôi chuẩn:** Nước tinh khiết sôi ở đúng **100 °C** trong điều kiện áp suất khí quyển tiêu chuẩn (**1 atm** hay **101,3 kPa**, tại mực nước biển).
* **Khi nào nhiệt độ này thay đổi?**
  - Khi áp suất khí quyển thay đổi (lên núi cao hoặc xuống hầm sâu).
  - Khi trong nước có hoà tan thêm các chất khác (như muối ăn NaCl, đường C₁₂H₂₂O₁₁).

### 2. Bản chất hoá học & vật lí đằng sau
- **Cấu tạo phân tử:** Phân tử nước (**H₂O**) gồm 1 nguyên tử Oxygen liên kết cộng hóa trị có cực với 2 nguyên tử Hydrogen. Giữa các phân tử H₂O tồn tại **liên kết hydro liên phân tử** bền vững.
- **Quá trình sôi:** Khi đun nóng tới **100 °C**, áp suất hơi bão hoà bên trong các bọt khí cân bằng với áp suất khí quyển bên ngoài, các phân tử nước bứt phá khỏi lực hút liên phân tử để chuyển ào ạt từ thể lỏng sang thể hơi (khí).
- **Nấu ăn trên núi cao (như đỉnh núi Bà Đen Tây Ninh - cao 986 m):** Càng lên cao, không khí càng loãng, áp suất khí quyển giảm (chỉ còn khoảng 0,9 atm). Vì vậy, nước trên đỉnh núi Bà Đen sôi ở khoảng **96–97 °C**, luộc thức ăn sẽ lâu chín hơn bình thường!
- **Nồi áp suất:** Hoạt động theo nguyên lí giữ kín hơi nước để tăng áp suất lên 1,5–2 atm, làm nước sôi ở nhiệt độ cao hơn (**115–120 °C**), giúp ninh hầm thức ăn nhanh nhừ gấp 3 lần và tiết kiệm năng lượng.

### 3. Ứng dụng thực tế đời sống
- **Nước muối sôi ở bao nhiêu độ?** Khi em cho muối ăn (NaCl) vào nước, các ion Na⁺ và Cl⁻ bị các phân tử nước hydrate hoá, cản trở các phân tử nước bay hơi. Vì thế, nước muối sôi ở nhiệt độ **cao hơn 100 °C** (khoảng 101–103 °C tuỳ nồng độ)!
- **Khử trùng dụng cụ y tế và bình sữa:** Đun sôi trong nước ở 100 °C trong 5–10 phút đủ để làm biến tính protein của hầu hết các loại vi khuẩn có hại.

### 4. Thử thách nhỏ cho em
Nếu em tiếp tục đun sôi một ấm nước đang sôi sùng sục ở 100 °C với ngọn lửa lớn hơn gấp đôi, nhiệt độ của nước lỏng có tăng lên 110 °C hay 120 °C được không? Tại sao?`);
  }

  if (q.includes("hành") || q.includes("cay mắt") || q.includes("chảy nước mắt")) {
    return normalizeChemistryText(`Chào em! Hiện tượng cắt hành tây bị cay mắt là một phản ứng tự vệ hoá học diệu kỳ của thực vật:

### 1. Hiện tượng & Câu trả lời cốt lõi
Khi em dùng dao cắt củ hành tây, các tế bào hành bị vỡ giải phóng hợp chất khí lưu huỳnh bay vào không khí. Khi tiếp xúc với màng nước mắt, khí này tạo thành một lượng cực nhỏ axit gây kích ứng, khiến tuyến lệ lập tức tiết nước mắt để rửa trôi.

### 2. Bản chất hoá học đằng sau
- Trong tế bào nguyên vẹn của hành, enzyme **alliinase** và các hợp chất **amino acid sulfoxide** nằm ở hai ngăn riêng biệt.
- Khi dao cắt đứt màng tế bào, enzyme alliinase lập tức xúc tác phản ứng chuyển hoá amino acid sulfoxide thành khí **syn-propanethial-S-oxide** (C₃H₆OS) rất dễ bay hơi.
- Khi khí này chạm vào bề mặt giác mạc ẩm ướt, nó phản ứng nhẹ với nước mắt tạo thành phân tử acid kích thích đầu mút dây thần kinh cảm giác. Não bộ lập tức ra lệnh cho tuyến lệ tiết nước mắt ào ạt.

### 3. Mẹo hoá học ứng dụng trong gian bếp
- **Làm lạnh hành trước khi cắt:** Để hành vào ngăn mát tủ lạnh 15–30 phút. Nhiệt độ thấp làm giảm mạnh tốc độ phản ứng enzyme và giảm sự bay hơi của khí lưu huỳnh.
- **Dùng dao thật sắc bén:** Dao sắc sẽ chém đứt tế bào gọn gàng, ít làm dập nát tế bào hơn dao cùn.
- **Cắt dưới nước hoặc nhúng dao vào nước:** Khí sinh ra sẽ bị nước hoà tan ngay trước khi kịp bay lên mắt em!

### 4. Thử thách nhỏ cho em
Vì sao khi xào nấu hành chín trên chảo lửa thơm nức mũi, chúng ta lại không hề bị cay mắt nữa?`);
  }

  if (q.includes("rỉ sét") || q.includes("gỉ") || q.includes("sắt") || q.includes("ăn mòn")) {
    return normalizeChemistryText(`Chào em! Sự rỉ sét của kim loại là một bài học trọng tâm trong chương trình KNTT Lớp 9 (Chương Kim loại & Sự ăn mòn):

### 1. Hiện tượng & Câu trả lời cốt lõi
Đinh sắt, hàng rào hoặc đồ dùng bằng sắt thép để ngoài không khí ẩm lâu ngày sẽ bị bao phủ bởi một lớp vảy màu nâu đỏ xốp, giòn, gọi là **gỉ sắt**. Đó là quá trình sắt bị oxi hoá chậm bởi oxygen và hơi nước trong khí quyển.

### 2. Bản chất hoá học đằng sau
- Sắt (Fe) trong môi trường ẩm bị oxi hoá thành gỉ sắt có thành phần chủ yếu là iron(III) oxide ngậm nước (**Fe₂O₃·nH₂O**).
- Phương trình hoá học mô tả quá trình:
  \`4Fe + 3O₂ + 2nH₂O → 2Fe₂O₃·nH₂O\`
- Khác với nhôm (Al) tạo lớp màng Al₂O₃ cực mỏng và rất mịn bảo vệ bên trong, lớp gỉ sắt Fe₂O₃ lại xốp rỗng, cho phép không khí và hơi ẩm tiếp tục thấm sâu vào phá huỷ hoàn toàn khối kim loại bên trong.

### 3. Ứng dụng & Biện pháp bảo vệ kim loại
- **Ngăn cách kim loại với môi trường:** Sơn phủ, quét dầu mỡ (cho xích xe đạp), mạ kim loại bền (như mạ kẽm ở tôn hoa, mạ crom/niken ở ghi-đông xe).
- **Chế tạo hợp kim chống gỉ:** Thêm Crôm (Cr) và Niken (Ni) vào sắt để tạo thành thép không gỉ (Inox 304, Inox 316) dùng làm nồi chảo, muỗng đũa an toàn.

### 4. Thử thách nhỏ cho em
Nếu nhúng một cây đinh sắt ngập hoàn toàn trong cốc nước đun sôi để nguội rồi rót một lớp dầu ăn lên bề mặt, đinh sắt có bị gỉ sét không? Hãy giải thích nhé!`);
  }

  if (q.includes("muối dưa") || q.includes("lên men") || q.includes("dưa chua")) {
    return normalizeChemistryText(`Chào em! Muối dưa cải là một ứng dụng vi sinh hoá học tuyệt vời mà ông bà ta đã áp dụng hàng ngàn năm:

### 1. Hiện tượng & Câu trả lời cốt lõi
Rau cải cay nồng, đắng chát khi ngâm vào nước muối ấm (khoảng 3–5% muối) có pha chút đường, sau 2–3 ngày sẽ chuyển sang màu vàng tươi, giòn tan và có vị chua thanh dịu rất hấp dẫn.

### 2. Bản chất hoá học đằng sau
- Đây là quá trình **lên men lactic** do các vi khuẩn lactic tự nhiên (*Lactobacillus*) có sẵn trên bề mặt lá rau thực hiện trong điều kiện yếm khí (kín gió).
- Vi khuẩn lactic tiêu thụ đường glucose (C₆H₁₂O₆) trong rau để chuyển hoá thành **axit lactic** (CH₃CH(OH)COOH):
  \`C₆H₁₂O₆ —(vi khuẩn lactic)→ 2CH₃CH(OH)COOH + Năng lượng\`
- Nồng độ axit lactic tăng dần làm độ pH của dung dịch giảm xuống dưới 4,0. Môi trường axit này ức chế hoàn toàn các vi khuẩn gây thối rữa, giúp dưa bảo quản được lâu mà không bị ôi thiu.

### 3. Kinh nghiệm dân gian dưới góc nhìn hoá học
- **Tại sao cần phơi héo rau trước khi muối?** Giúp tế bào rau mất bớt nước, khi ngâm nước muối rau sẽ hút dung dịch đều hơn và giòn hơn.
- **Tại sao cần chèn chặt rau ngập dưới nước muối?** Để tạo môi trường kị khí tuyệt đối, ngăn nấm men mốc hiếu khí phát triển sinh màng trắng.

### 4. Thử thách nhỏ cho em
Nếu em cho quá nhiều muối (trên 10%), hũ dưa có chua được không? Vi khuẩn lactic sẽ ra sao trong dung dịch ưu trương đậm đặc đó?`);
  }

  if (
    q.includes("hóa trị") ||
    q.includes("hoa tri") ||
    q.includes("nhớ hóa trị") ||
    q.includes("nho hoa tri") ||
    q.includes("bài ca hóa trị") ||
    q.includes("bai ca hoa tri") ||
    q.includes("bài thơ hóa trị") ||
    q.includes("bai tho hoa tri") ||
    q.includes("bảng hóa trị") ||
    q.includes("bang hoa tri")
  ) {
    return normalizeChemistryText(`Chào các em học sinh thân yêu của cô tại trường THCS Lý Tự Trọng!

Cô rất vui khi nhận được câu hỏi này. Hóa trị là "chìa khóa vàng" đầu tiên để các em mở cánh cửa vào thế giới Hóa học lớp 8 và 9 (SGK Kết nối tri thức). Đừng quá lo lắng, cô sẽ bật mí cho các em những "bí kíp" giúp ghi nhớ hóa trị một cách nhẹ nhàng và hiệu quả nhất nhé:

### 1. Học qua bài thơ hóa trị (Cách truyền thống nhưng cực kỳ hiệu quả)
Bài thơ hóa trị là "người bạn thân" của bao thế hệ học sinh. Nhịp điệu vần vè của bài thơ sẽ giúp các em nhớ hóa trị của các nguyên tố thường gặp một cách vô thức:

*Đoạn thơ hóa trị kinh điển dễ thuộc nhất:*
\`\`\`text
Kali (K), Natri (Na), Hydro (H), Bạc (Ag) cùng với Clo (Cl),
Một loài HÓA TRỊ I chẳng sai chút nào.
Magie (Mg), Kẽm (Zn) với Thủy ngân (Hg),
Oxy (O), Đồng (Cu), Thiếc (Sn) thêm phần Bari (Ba),
Cuối cùng thêm chú Canxi (Ca),
HÓA TRỊ II đó nhớ ghi cho tường!
Nhôm (Al) HÓA TRỊ III chớ quên,
Carbon (C), Silic (Si) tính bền IV thôi.
\`\`\`

### 2. Gom nhóm các nguyên tố theo hóa trị (Phương pháp tư duy logic)
Thay vì học thuộc lòng từng nguyên tố rời rạc, các em hãy gom chúng theo các nhóm hóa trị cố định:
- **Nhóm Hóa trị I:** H, Li, Na, K, Ag, Cl (trong muối clorua), F.
  *(Mẹo nhớ câu vui: "Học Lớp Nào Không Ai Cho Phép" ── H, Li, Na, K, Ag, Cl, F).*
- **Nhóm Hóa trị II:** O, Mg, Ca, Ba, Zn, Cu, Pb (chì).
  *(Mẹo nhớ câu vui: "Bé Mang Cây Súng Bắn Phá Cuộc Xâm Lược" ── Be, Mg, Ca, Sr, Ba, Pb, Cu, Zn).*
- **Nhóm Hóa trị III:** Al (Nhôm), Fe (Sắt khi mang hóa trị III).
  *(Mẹo nhớ: "Anh Sắt Ba" ── Al, Fe III).*
- **Nhóm nhiều hóa trị (Cần lưu ý đặc biệt):**
  + **Sắt (Fe):** Thường có hóa trị **II** (FeCl₂, FeO) và hóa trị **III** (FeCl₃, Fe₂O₃).
  + **Đồng (Cu):** Thường gặp hóa trị **II** (CuSO₄, CuO).
  + **Carbon (C):** Hóa trị **II** (CO) và **IV** (CO₂).
  + **Lưu huỳnh (S):** Hóa trị **II** (H₂S), **IV** (SO₂) và **VI** (SO₃, H₂SO₄).
  + **Nitơ (N):** Hóa trị I, II, III, IV, V (thường gặp II, IV trong khí NO, NO₂).

### 3. Hóa trị của các nhóm nguyên tử (Bắt buộc phải thuộc để viết CTHH)
Khi viết công thức axit, bazơ và muối, các em xem cả nhóm nguyên tử như một "nguyên tố lớn":
- **Nhóm Hóa trị I:** **-OH** (hiđroxit), **-NO₃** (nitrat), **-Cl** (clorua).
- **Nhóm Hóa trị II:** **=SO₄** (sunfat), **=CO₃** (cacbonat), **=SO₃** (sunfit).
- **Nhóm Hóa trị III:** **≡PO₄** (photphat).
*(Mẹo nhớ: "Nhóm Một có OH, NO₃; Nhóm Hai SO₄, CO₃ rõ ràng; Nhóm Ba duy nhất PO₄ nàng").*

### 4. Quy tắc hóa trị & Cách lập CTHH trong 5 giây
Trong hợp chất hai nguyên tố hoặc nguyên tố với nhóm nguyên tử: **AₓBᵧ** (với a là hóa trị của A, b là hóa trị của B):
$$\\text{Quy tắc:} \\quad x \\times a = y \\times b \\implies \\frac{x}{y} = \\frac{b}{a}$$
*(Em chỉ cần nghịch đảo tỉ số hóa trị rồi rút gọn về phân số tối giản là ra ngay chỉ số x, y!)*

*Ví dụ mẫu:* Lập CTHH tạo bởi Nhôm (Al hóa trị III) và Oxygen (O hóa trị II):
- Ta có tỉ lệ: $x/y = II/III = 2/3$.
- Vậy $x = 2$, $y = 3$ ──> Công thức hóa học là **Al₂O₃**.

### 5. Thử thách thực hành nhỏ cho em
Vận dụng các bí kíp trên, em hãy lập nhanh CTHH của:
1. Sắt (III) kết hợp với nhóm Sunfat (SO₄ hóa trị II).
2. Canxi (II) kết hợp với nhóm Photphat (PO₄ hóa trị III).
Hãy nhắn cho cô công thức em tìm được để cô kiểm tra xem em đã thành thạo chưa nhé!`);
  }

  // Learning method & motivation advice
  if (
    q.includes("học giỏi") || 
    q.includes("hoc gioi") || 
    q.includes("cách học") || 
    q.includes("cach hoc") || 
    q.includes("phương pháp học") || 
    q.includes("bí quyết") || 
    q.includes("bi quyet") || 
    q.includes("sợ hoá") || 
    q.includes("mất gốc") || 
    (q.includes("muốn") && q.includes("hoá")) ||
    (q.includes("học") && q.includes("hoá") && (q.includes("tốt") || q.includes("giỏi") || q.includes("sao")))
  ) {
    return normalizeChemistryText(`Chào em, cô là Cô Huỳnh Thị Thuỳ Dương đây! Cô rất vui và tự hào khi thấy em có tinh thần cầu tiến và khát khao muốn học giỏi môn Hoá học.

Ở trường THCS Lý Tự Trọng mình, cô luôn nhắn nhủ các bạn học sinh: **"Hoá học không hề khó hay khô khan, chỉ cần em nắm đúng phương pháp và hiểu bản chất tự nhiên"**. Để học giỏi môn Hoá (KNTT), cô gửi tặng em 5 bí quyết vàng sau đây:

### 1. Nắm chắc "chìa khoá vàng": Kí hiệu hoá học & Hoá trị
- Hoá trị và nguyên tử khối giống như bảng chữ cái và bảng cửu chương vậy. Nếu thuộc hoá trị (H: I, O: II, Cl: I, Na: I, Ca: II, Al: III, Fe: II & III, nhóm SO₄: II, nhóm OH: I...), em sẽ luôn lập đúng công thức hoá học.
- **Mẹo nhỏ của cô:** Em hãy chép bài ca hoá trị hoặc dán bảng hoá trị ngay góc bàn học, mỗi ngày ngắm 3 phút, chỉ sau 1 tuần là nhớ như in.

### 2. Không học vẹt — Luôn gắn liền với thí nghiệm & đời sống
- Hoá học là môn khoa học thực nghiệm. Mỗi khi học một chất mới, hãy tự hỏi:
  + Chất này có màu gì? Thể gì? Có ở đâu quanh ta? (Ví dụ: axit axetic có trong giấm ăn, canxi cacbonat có trong vỏ trứng, đá vôi).
  + Khi phản ứng xảy ra, có hiện tượng gì đặc trưng (đổi màu, sủi bọt khí ↑, hay tạo kết tủa ↓)?
- Quan sát kỹ thí nghiệm trên lớp hoặc xem lại video thí nghiệm ảo trong CLB sẽ giúp em nhớ bài lâu gấp nhiều lần việc đọc thuộc lòng sách.

### 3. Bí quyết cân bằng phương trình hoá học
- Luôn kiểm tra công thức các chất trước và sau phản ứng xem đã đúng hoá trị chưa.
- Nguyên tắc cân bằng: Đếm số nguyên tử kim loại trước → phi kim → hydrogen → cuối cùng là oxygen để kiểm tra lại hai vế.
- Tuyệt đối không thay đổi chỉ số chân của công thức (ví dụ: nước luôn là H₂O, không được sửa thành H₂O₂ để cân bằng).

### 4. Sử dụng sơ đồ tư duy (Mindmap) và Sổ tay hoá học
- Sau mỗi bài học KNTT (như bài Kim loại, Phi kim, Axit, Bazơ, Muối), em hãy vẽ một nhánh sơ đồ tư duy tổng kết tính chất hoá học và phương trình minh hoạ.
- Ghi lại các hiện tượng hay gặp hoặc những câu hỏi em còn thắc mắc để mang đến CLB trao đổi cùng cô và các bạn.

### 5. Luyện tập đều đặn mỗi ngày 15–20 phút
- Mỗi ngày chỉ cần làm 2–3 bài tập nhỏ hoặc giải thích 1 hiện tượng thực tế (như vì sao nước dừa để lâu bị chua, vì sao đinh sắt bị gỉ...).
- Đừng ngại làm sai! Sai ở đâu cô sẽ hướng dẫn và sửa cho em ở đó.

Cô tin chắc nếu em kiên trì áp dụng các bước trên, môn Hoá học sẽ trở thành môn học yêu thích và điểm số của em sẽ tiến bộ vượt bậc. Cố gắng lên nhé, cô luôn đồng hành và ủng hộ em!`);
  }

  if (q.includes("lá cây") && (q.includes("xanh") || q.includes("màu"))) {
    return normalizeChemistryText(`Chào em! Câu hỏi về màu xanh của lá cây liên quan đến sắc tố sinh hoá diệu kỳ nhất của sự sống trên Trái Đất:

### 1. Hiện tượng & Câu trả lời cốt lõi
Lá cây có màu xanh lục vì trong lục lạp của tế bào lá chứa một lượng lớn sắc tố hữu cơ tên là **diệp lục (chlorophyll)**. Phân tử diệp lục hấp thụ mạnh ánh sáng đỏ và ánh sáng xanh lam từ Mặt Trời để quang hợp, nhưng **không hấp thụ và phản xạ lại ánh sáng xanh lục** đến mắt người quan sát.

### 2. Bản chất hoá học
- Cấu tạo phân tử diệp lục (Chlorophyll a: C₅₅H₇₂O₅N₄Mg) có một ion trung tâm là **magnesium (Mg²⁺)** nằm giữa vòng porphyrin.
- Diệp lục đóng vai trò xúc tác quang hoá cho phản ứng quang hợp vĩ đại:
  \`6CO₂ + 6H₂O —(ánh sáng, diệp lục)→ C₆H₁₂O₆ (glucose) + 6O₂↑\`
- Cung cấp oxygen duy trì sự sống cho toàn bộ sinh vật và tích luỹ sinh khối tinh bột.

### 3. Điều thú vị trong đời sống
- Vào mùa thu, khi nhiệt độ giảm và ít ánh sáng, cây ngừng sản xuất diệp lục và phân huỷ nó. Lúc này các sắc tố phụ khác như **carotenoid** (màu vàng cam) và **anthocyanin** (màu đỏ tím) lộ ra, làm cho lá chuyển sang màu vàng đỏ rực rỡ!`);
  }

  if (q.includes("nước ngọt") || q.includes("có gas") || q.includes("sủi bọt") || q.includes("nước có ga")) {
    return normalizeChemistryText(`Chào em! Hiện tượng sủi bọt khi mở nắp lon nước ngọt có gas là kiến thức cực kỳ thú vị về độ tan của chất khí:

### 1. Hiện tượng & Câu trả lời cốt lõi
Khi em bật nắp lon nước ngọt, lập tức nghe tiếng "xì" và hàng ngàn bọt khí sủi tăm li ti trào lên. Đó là khí **carbon dioxide (CO₂)** đang thoát ra khỏi dung dịch lỏng.

### 2. Bản chất hoá học đằng sau
- Ở nhà máy sản xuất, người ta dùng áp suất rất cao (khoảng 3–4 atm) để ép khí CO₂ hoà tan vào nước ngọt có hương liệu và đường:
  \`CO₂ (khí) + H₂O ⇌ H₂CO₃ (axit carbonic yếu)\`
- Khi đóng kín lon, trạng thái cân bằng hoá học được duy trì.
- Khi em bật nắp, áp suất trong lon giảm đột ngột về áp suất khí quyển (1 atm). Theo **định luật Henry**, độ tan của chất khí tỉ lệ thuận với áp suất. Áp suất giảm khiến CO₂ không thể tan tiếp được nữa và nhanh chóng tách ra khỏi nước tạo thành vô số bọt khí bay lên!

### 3. Mẹo hoá học ứng dụng
- **Uống nước ngọt lạnh ngon và nhiều gas hơn:** Vì độ tan của khí CO₂ trong nước tăng lên khi nhiệt độ hạ thấp (ngược lại với chất rắn). Nước ngọt để ấm sẽ nhanh chóng mất hết gas và có vị ngọt gắt.`);
  }

  if (q.includes("pháo hoa") || (q.includes("màu") && q.includes("cháy"))) {
    return normalizeChemistryText(`Chào em! Màu sắc lung linh rực rỡ của pháo hoa trong đêm giao thừa chính là ứng dụng đỉnh cao của **quang phổ phát xạ ion kim loại**:

### 1. Hiện tượng & Câu trả lời cốt lõi
Mỗi màu sắc của pháo hoa được tạo ra từ việc đốt cháy các hợp chất muối của các kim loại khác nhau. Khi bị đốt nóng ở nhiệt độ hàng ngàn độ C, các electron của ion kim loại hấp thụ năng lượng rồi nhảy về trạng thái năng lượng thấp hơn và phát ra ánh sáng có bước sóng đặc trưng.

### 2. Bản đồ màu sắc hoá học
- **Màu vàng rực:** Hợp chất của Sodium (Na), ví dụ NaNO₃, NaCl.
- **Màu đỏ tươi:** Hợp chất của Strontium (Sr) hoặc Lithium (Li), ví dụ Sr(NO₃)₂.
- **Màu xanh lá cây (lục):** Hợp chất của Barium (Ba), ví dụ Ba(NO₃)₂, BaCl₂.
- **Màu xanh lam (dương):** Hợp chất của Đồng (Cu), ví dụ CuCl₂, CuSO₄.
- **Màu tím:** Pha trộn giữa hợp chất Strontium (đỏ) và Đồng (xanh lam).
- **Ánh sáng trắng bạc lấp lánh:** Bột kim loại Magie (Mg), Nhôm (Al) hoặc Titan (Ti) cháy toả nhiệt cực lớn.`);
  }

  if (q.includes("vôi") || q.includes("nước vôi") || q.includes("đục")) {
    return normalizeChemistryText(`Chào em! Hiện tượng nước vôi trong bị hoá đục là thí nghiệm đặc trưng nhận biết khí CO₂ trong môn KHTN / Hoá học:

### 1. Hiện tượng & Bản chất hoá học
- Dung dịch nước vôi trong là **calcium hydroxide [Ca(OH)₂]**.
- Khi em thổi hơi thở (chứa nhiều khí CO₂) hoặc sục khí CO₂ vào nước vôi trong, dung dịch dần dần xuất hiện vẩn đục màu trắng sữa như nước vo gạo.
- Phương trình hoá học:
  \`Ca(OH)₂ + CO₂ → CaCO₃↓ (trắng) + H₂O\`
- Chất kết tủa màu trắng không tan chính là **canxi cacbonat (CaCO₃)** — thành phần chính của đá vôi và vỏ trứng.

### 2. Ứng dụng nông nghiệp tại Tây Ninh
- Nông dân thường rải vôi bột (CaO / Ca(OH)₂) lên đất trồng cao su, mãng cầu để **khử chua (trung hoà axit trong đất)** và tiêu diệt nấm bệnh có hại.`);
  }

  if (q.includes("cặn") || q.includes("ấm đun") || q.includes("tẩy cặn")) {
    return normalizeChemistryText(`Chào em! Hiện tượng ấm đun nước bị bám một lớp cặn cứng màu trắng ngà dưới đáy sau một thời gian sử dụng là do **nước cứng**:

### 1. Hiện tượng & Bản chất hoá học
- Nước sinh hoạt tự nhiên thường hoà tan các muối khoáng như calcium hydrogencarbonate **Ca(HCO₃)₂** và **Mg(HCO₃)₂**.
- Khi đun sôi nước, các muối này bị nhiệt phân tạo thành kết tủa canxi cacbonat bám chặt vào đáy ấm:
  \`Ca(HCO₃)₂ ──(t°)──> CaCO₃↓ + CO₂↑ + H₂O\`

### 2. Mẹo hoá học tẩy cặn ấm siêu tốc bằng gian bếp
- Canxi cacbonat (CaCO₃) là muối không tan trong nước nhưng **rất dễ tan trong axit yếu** như axit axetic (trong giấm ăn) hoặc axit citric (trong nước cốt chanh):
  \`CaCO₃ + 2CH₃COOH → (CH₃COO)₂Ca + CO₂↑ + H₂O\`
- **Cách làm:** Đổ nửa bát giấm ăn hoặc vắt 2 quả chanh vào ấm, thêm chút nước rồi đun sôi lăn tăn 5 phút. Lớp cặn cứng sẽ sủi bọt khí CO₂ và tan biến hoàn toàn, trả lại lòng ấm sáng bóng như mới!`);
  }

  if (q.includes("đá nổi") || (q.includes("nước đá") && q.includes("nổi"))) {
    return normalizeChemistryText(`Chào em! Hiện tượng nước đá (băng) nổi trên mặt nước lỏng là một đặc tính vật lí - hoá học kỳ lạ và vô cùng đặc biệt của phân tử nước (**H₂O**):

### 1. Hiện tượng & Câu trả lời cốt lõi
Hầu hết các chất trong tự nhiên khi chuyển từ thể lỏng sang thể rắn đều co lại và trở nên nặng hơn. Nhưng **nước lại nở ra khi đóng băng**, khiến khối lượng riêng của nước đá (**0,917 g/cm³**) nhỏ hơn khối lượng riêng của nước lỏng ở 4 °C (**1,000 g/cm³**). Vì nhẹ hơn nên nước đá luôn **nổi trên mặt nước**.

### 2. Bản chất cấu trúc phân tử
- Ở thể lỏng, các phân tử H₂O chuyển động tự do và trượt sát lên nhau.
- Khi nhiệt độ hạ xuống dưới 0 °C, các liên kết hydro định hướng tạo thành một **mạng tinh thể lục giác rỗng xốp** chứa nhiều khoảng trống bên trong. Chính cấu trúc rỗng này làm thể tích tăng lên khoảng 9%, khiến mật độ giảm xuống.

### 3. Ý nghĩa sinh tồn vĩ đại của Trái Đất
Nếu nước đá chìm xuống đáy như các chất khác, toàn bộ đáy biển và sông ngòi ở vùng hàn đới sẽ đóng băng từ đáy lên trên, tiêu diệt toàn bộ sinh vật biển. Nhờ nước đá nổi lên trên tạo thành lớp màng cách nhiệt giữ ấm cho tầng nước bên dưới, cá và các loài thuỷ sinh vẫn bơi lội và sống sót an toàn qua mùa đông lạnh giá!`);
  }

  if (
    (q === "cô ơi" || q === "chào cô" || q === "cô ơi cho em hỏi" || q === "hello cô" || q === "hi cô") || 
    (q.length < 15 && (q.includes("chào") || q.includes("cô ơi")))
  ) {
    return normalizeChemistryText(`Chào em! Cô Huỳnh Thị Thuỳ Dương đây!

Cô luôn sẵn sàng lắng nghe và giải đáp mọi câu hỏi tò mò của em về thế giới Hoá học & Khoa học tự nhiên theo sách Kết nối tri thức (KNTT).

Em có thể bấm vào các gợi ý nhanh phía dưới hoặc hỏi cô về:
1. 💡 **Hiện tượng đời sống:** "Tại sao nước biển mặn?", "Nước sôi ở bao nhiêu độ?", "Tại sao cắt hành cay mắt?", "Tại sao đinh sắt bị gỉ?"
2. 🧪 **Thí nghiệm vui tại nhà:** "Cách làm slime an toàn", "Viết chữ tàng hình bằng chanh", "Đổi màu hoa giấy bằng bắp cải tím"
3. 🏆 **Nghiên cứu KHKT:** "Gợi ý đề tài nghiên cứu từ nông sản Tây Ninh", "Cách làm màng bọc thực phẩm từ tinh bột sắn"

Em đang muốn tìm hiểu về hiện tượng hoặc chất hoá học nào, hãy nói cụ thể cho cô nghe nhé!`);
  }

  // Comprehensive Chemistry Knowledge Synthesizer for any other inquiries
  const cleanQ = question.replace(/^(cô ơi|cô có thể|thưa cô|cho em hỏi|giải thích giúp em|giúp em|em muốn hỏi)\s*/i, "").trim();

  return normalizeChemistryText(`Chào em! Cô Huỳnh Thị Thuỳ Dương rất vui khi nhận được câu hỏi khoa học của em:

### 1. Hiện tượng & Câu trả lời trọng tâm
Đối với thắc mắc: **"${cleanQ || question}"**:
Trong thế giới Khoa học tự nhiên và Hoá học (bộ sách Kết nối tri thức), hiện tượng này xuất phát từ bản chất cấu tạo của các chất và sự tương tác giữa các phân tử, ion hoặc năng lượng:
- **Cấu tạo vi mô:** Mọi vật chất đều được hình thành từ các nguyên tố hoá học xác định. Khi các chất tiếp xúc với nhau hoặc chịu tác động của nhiệt độ, ánh sáng hay áp suất, các liên kết hoá học hoặc liên kết vật lí sẽ biến đổi tương ứng.
- **Quy luật biến đổi:** Quá trình này tuân theo định luật bảo toàn khối lượng và năng lượng, kèm theo sự toả nhiệt hoặc thu nhiệt đặc trưng.

### 2. Bản chất hoá học & Nguyên lý khoa học
- **Nếu là hiện tượng vật lí:** Chất chỉ thay đổi trạng thái (rắn, lỏng, khí), hình dạng hoặc kích thước mà không sinh ra chất mới (ví dụ: nước đá tan, nước bay hơi, hoà tan đường vào nước).
- **Nếu là hiện tượng hoá học:** Có sự bẻ gãy liên kết cũ và hình thành liên kết mới, tạo ra chất mới với tính chất hoàn toàn khác biệt. Dấu hiệu nhận biết là:
  + Xuất hiện chất khí thoát ra (sủi bọt khí ↑).
  + Xuất hiện chất kết tủa không tan lắng xuống (↓).
  + Thay đổi màu sắc hoặc phát sáng, toả nhiệt mạnh.

### 3. Liên hệ thực tế & SGK Kết nối tri thức Lớp ${grade || "8"}
- Em hãy mở sách KHTN Lớp ${grade || "8"}, đối chiếu với bài học tương ứng về các nhóm chất (Nguyên tử - Phân tử, Kim loại, Phi kim, Axit - Bazơ - Muối) để xem các phương trình hoá học chuẩn mực.
- **Mẹo của Cô Dương:** Hãy thử liên hệ xem hiện tượng này có diễn ra trong gian bếp gia đình mình, trong nông nghiệp hay trong tự nhiên quê hương Tây Ninh không nhé!

### 4. Lời khuyên từ Cô Dương
Hãy ghi lại câu hỏi này vào **Nhật Ký Nhà Khoa Học** của CLB. Nếu em muốn tìm hiểu sâu hơn về phương trình hoá học hoặc cách làm thí nghiệm mô phỏng cụ thể, hãy tiếp tục gõ câu hỏi chi tiết cho cô nhé!`);
}

// 1. AI Q&A / Explanation: "Vì sao? Như thế nào?"
apiRouter.post("/ai/ask", async (req: Request, res: Response) => {
  try {
    const question = (req.body.question || req.body.prompt || "").toString().trim();
    const grade = req.body.grade;
    const topic = req.body.topic;
    const mode = req.body.mode;
    if (!question) {
      return res.status(400).json({ error: "Vui lòng nhập câu hỏi cần giải đáp." });
    }

    const ai = getAIClient();
    if (ai) {
      try {
        const prompt = `Học sinh ${grade ? `lớp ${grade}` : "THCS"} trường THCS Lý Tự Trọng (Tây Ninh) hỏi Cô Huỳnh Thị Thuỳ Dương:
"${question}"
${topic ? `Thuộc chủ đề/tháng: ${topic}` : ""}
${mode ? `Chế độ lựa chọn: ${mode}` : ""}

QUY TẮC CỐT LÕI BẮT BUỘC: TRẢ LỜI ĐÚNG 100% TRỌNG TÂM CÂU HỎI HOẶC YÊU CẦU CỦA HỌC SINH! HỌC SINH HỎI GÌ THÌ TRẢ LỜI ĐÚNG CÁI ĐÓ!
- NẾU HỌC SINH HỎI VỀ CÁCH CÂN BẰNG PHƯƠNG TRÌNH HOÁ HỌC:
  + Trả lời trực diện, chi tiết, dễ hiểu nhất theo chương trình KHTN (Kết nối tri thức):
    1. Định luật bảo toàn khối lượng và quy tắc không được đổi chỉ số chân.
    2. Thứ tự ưu tiên cân bằng: Kim loại -> Phi kim -> Hydrogen -> Oxygen.
    3. Phương pháp Chẵn - Lẻ kinh điển.
    4. Cung cấp 2-3 ví dụ mẫu từng bước (Al + O₂ → Al₂O₃, Fe + HCl → FeCl₂ + H₂, CH₄ + O₂ → CO₂ + H₂O).
  + TUYỆT ĐỐI KHÔNG tự tiện gợi ý thí nghiệm không liên quan (như đèn lava hay slime) khi học sinh đang hỏi cách cân bằng phương trình.
- NẾU HỌC SINH HỎI VỀ PHƯƠNG PHÁP HỌC / TÂM SỰ / MUỐN HỌC GIỎI HOÁ:
  + Đóng vai Cô Thuỳ Dương đưa ra lời khuyên chân thành, khích lệ tinh thần, chỉ ra các bước cụ thể: nắm chắc hoá trị, học qua thí nghiệm thực tế, cách cân bằng phương trình, vẽ sơ đồ tư duy mindmap, luyện tập mỗi ngày.
  + Trả lời tự nhiên, ấm áp, truyền cảm hứng.
- NẾU HỌC SINH HỎI VỀ HIỆN TƯỢNG KHOA HỌC / ĐỜI SỐNG (Nước sôi, hành cay mắt, đinh gỉ...):
  + Giải đáp cuốn hút theo bộ sách Kết nối tri thức:
    ### 1. Hiện tượng & Câu trả lời cốt lõi (ngắn gọn, trực diện, chính xác)
    ### 2. Bản chất hoá học đằng sau (phương trình chữ hoặc KHHH chuẩn Unicode)
    ### 3. Ứng dụng thực tế đời sống thú vị
    ### 4. Thử thách nhỏ / Câu hỏi tò mò dành cho học sinh suy ngẫm
- NẾU HỌC SINH HỎI VỀ BÀI TẬP / LÝ THUYẾT / CÔNG THỨC / ĐỊNH NGHĨA:
  + Hướng dẫn tư duy từng bước để học sinh hiểu sâu bản chất.
- CHỈ KHI HỌC SINH THỰC SỰ YÊU CẦU GỢI Ý THÍ NGHIỆM HOẶC CUNG CẤP DANH SÁCH NGUYÊN LIỆU THÍ NGHIỆM:
  + Lúc đó mới trình bày quy trình thí nghiệm STEM an toàn.

LƯU Ý QUAN TRỌNG: Tuyệt đối không dùng mã LaTeX thô như $...$. Luôn viết thẳng 100 °C, 1 atm, H₂O, CO₂, Fe²⁺, SO₄²⁻.`;

        const generatedText = await generateWithGemini(ai, prompt, TEACHER_SYSTEM_PROMPT, 0.7);
        if (generatedText && generatedText.trim()) {
          const cleanedText = normalizeChemistryText(generatedText);
          return res.json({ text: cleanedText });
        }
      } catch (geminiError: any) {
        console.warn("Gemini generation error, falling back to smart pedagogical engine:", geminiError?.message);
      }
    }

    // High quality offline fallback
    const answer = getPedagogicalAnswer(question, grade);
    return res.json({ text: answer });
  } catch (error: any) {
    console.error("AI Ask error:", error);
    const fallbackAnswer = getPedagogicalAnswer(req.body?.question || "", req.body?.grade);
    return res.json({ text: fallbackAnswer });
  }
});

// 2. AI Experiment Suggestion / Custom STEM Protocol
apiRouter.post("/ai/suggest-experiment", async (req: Request, res: Response) => {
  try {
    const rawInput = (req.body.materials || req.body.prompt || req.body.question || "").toString().trim();
    const grade = req.body.grade;
    const interest = req.body.interest;
    const ai = getAIClient();

    // If student actually asks a conceptual question rather than experiment materials, answer the question directly
    const lowerInput = rawInput.toLowerCase();
    const isConceptualQuestion = lowerInput.includes("cân bằng") || lowerInput.includes("tại sao") || 
      lowerInput.includes("vì sao") || lowerInput.includes("như thế nào") || lowerInput.includes("là gì") || 
      lowerInput.includes("phương pháp") || lowerInput.includes("làm thế nào") || lowerInput.includes("tính ");

    if (isConceptualQuestion && ai) {
      const prompt = `Học sinh hỏi Cô Huỳnh Thị Thuỳ Dương: "${rawInput}". Hãy trả lời ĐÚNG TRỌNG TÂM câu hỏi này của học sinh một cách rõ ràng, sư phạm, chuẩn mực KNTT THCS. Tuyệt đối không tự ý gợi ý thí nghiệm không liên quan. Không dùng LaTeX $...$. Viết thẳng H₂O, CO₂, 100 °C.`;
      try {
        const text = await generateWithGemini(ai, prompt, TEACHER_SYSTEM_PROMPT, 0.7);
        if (text && text.trim()) {
          return res.json({ text: normalizeChemistryText(text) });
        }
      } catch (err) {
        console.warn("Gemini fallback in suggest experiment question mode:", err);
      }
      return res.json({ text: getPedagogicalAnswer(rawInput, grade) });
    }

    if (ai) {
      try {
        const prompt = `Gợi ý 1 thí nghiệm hoá học STEM vui, an toàn tuyệt đối và sáng tạo cho học sinh CLB Hoá học THCS (Khối ${grade || "7-9"}).
Nguyên liệu / Yêu cầu học sinh đề xuất: ${rawInput || "Nguyên liệu gian bếp dễ tìm (chanh, giấm, muối, baking soda, bắp cải tím...)"}
Sở thích/Mục tiêu: ${interest || "Khám phá hiện tượng biến đổi chất diệu kỳ"}

LƯU Ý: Phải đọc kỹ yêu cầu của học sinh để gợi ý đúng thí nghiệm phù hợp, không bị lạc đề.
Hãy trình bày cụ thể theo cấu trúc chuẩn CLB:
- **Tên thí nghiệm**: (Tên hấp dẫn, kích thích tò mò)
- **Mục tiêu học tập**: (Liên hệ bài học SGK Kết nối tri thức lớp 7/8/9)
- **Dụng cụ & Hoá chất cần chuẩn bị**: (Dễ kiếm, an toàn tại nhà hoặc trường THCS Lý Tự Trọng)
- **Các bước tiến hành chi tiết**: (Bước 1, Bước 2, Bước 3...)
- **Hiện tượng quan sát được**:
- **Giải thích khoa học**: (Dễ hiểu cho học sinh THCS)
- **Cảnh báo an toàn**: (Quy tắc an toàn)

LƯU Ý: Không dùng LaTeX $...$. Viết thẳng 100 °C, 1 atm, H₂O, CO₂.`;

        const generatedText = await generateWithGemini(ai, prompt, TEACHER_SYSTEM_PROMPT, 0.7);
        if (generatedText && generatedText.trim()) {
          const cleanedText = normalizeChemistryText(generatedText);
          return res.json({ text: cleanedText });
        }
      } catch (geminiError: any) {
        console.warn("Gemini API spike in experiment suggest, using offline protocol:", geminiError?.message);
      }
    }

    return res.json({
      text: normalizeChemistryText(`### Thí nghiệm gợi ý: Hoa giấy đổi màu kỳ diệu với nước bắp cải tím (Chỉ thị tự nhiên)

- **Mục tiêu học tập**: Tìm hiểu về dung dịch Axit - Bazơ và chất chỉ thị màu tự nhiên (Bám sát KNTT Lớp 8 - Bài Axit & Bazơ).
- **Dụng cụ & Hoá chất**:
  + 1/4 bắp cải tím cắt nhỏ, nước ấm (hoặc hoa dâm bụt đỏ, củ dền).
  + Giấy ăn trắng / giấy lọc cắt hình bông hoa hoặc cánh bướm.
  + Dung dịch thử nghiệm: Nước cốt chanh (axit citric), giấm ăn (axit axetic), nước xà phòng nhẹ (bazơ), nước baking soda (bazơ nhẹ).
  + Cọ vẽ hoặc tăm bông.
- **Các bước tiến hành**:
  1. Ngâm bắp cải tím vào nước ấm 15 phút, chắt lấy dung dịch màu tím đậm (chứa sắc tố Anthocyanin).
  2. Dùng tăm bông chấm nước bắp cải tím quét đều lên bông hoa giấy trắng, để khô tự nhiên.
  3. Dùng tăm bông mới chấm nước chanh vẽ lên cánh hoa (hoa chuyển sang màu hồng cánh sen rực rỡ!).
  4. Chấm nước xà phòng hoặc baking soda vẽ lên cánh hoa khác (hoa chuyển sang màu xanh lục biếc!).
- **Giải thích khoa học**: Phân tử sắc tố Anthocyanin trong bắp cải tím thay đổi cấu trúc quang học tuỳ thuộc vào nồng độ ion H⁺ (độ pH) của môi trường, tạo nên dải màu sinh động từ đỏ (axit) đến tím (trung tính) và xanh lá (bazơ).
- **Cảnh báo an toàn**: Toàn bộ nguyên liệu đều từ thực phẩm lành tính, an toàn tuyệt đối cho học sinh tự trải nghiệm tại nhà.`),
    });
  } catch (error: any) {
    console.error("AI Experiment Suggest error:", error);
    res.status(200).json({
      text: normalizeChemistryText("### Thí nghiệm an toàn: Núi lửa mini sủi bọt với giấm và baking soda\n\n- **Dụng cụ:** Cốc thủy tinh, giấm ăn, bột baking soda (NaHCO₃), phẩm màu thực phẩm đỏ.\n- **Tiến hành:** Cho 2 thìa baking soda vào cốc, nhỏ vài giọt phẩm màu, sau đó rót nhanh 50 mL giấm ăn vào.\n- **Hiện tượng:** Dung dịch sủi bọt khí CO₂ cuồn cuộn trào dâng như dung nham núi lửa.\n- **Giải thích:** Phản ứng giữa CH₃COOH và NaHCO₃ tạo muối natri axetat, nước và giải phóng khí CO₂↑.")
    });
  }
});

// 3. AI KHKT Mentor & Olympic Incubator
apiRouter.post("/ai/khkt-mentor", async (req: Request, res: Response) => {
  try {
    const studentIdea = (req.body.studentIdea || req.body.prompt || req.body.question || req.body.idea || "").toString().trim();
    const category = req.body.category;
    const ai = getAIClient();

    // If input is actually a direct conceptual/theoretical question rather than a KHKT project idea
    const lowerIdea = studentIdea.toLowerCase();
    const isConceptualQuestion = lowerIdea.includes("cân bằng") || lowerIdea.includes("tại sao") || 
      lowerIdea.includes("vì sao") || lowerIdea.includes("như thế nào") || lowerIdea.includes("là gì") || 
      lowerIdea.includes("phương pháp") || lowerIdea.includes("làm thế nào") || lowerIdea.includes("tính ");

    if (isConceptualQuestion && ai) {
      const prompt = `Học sinh hỏi Cô Huỳnh Thị Thuỳ Dương: "${studentIdea}". Hãy trả lời ĐÚNG TRỌNG TÂM câu hỏi này của học sinh một cách rõ ràng, sư phạm, chuẩn mực KNTT THCS. Không dùng LaTeX $...$. Viết thẳng H₂O, CO₂, 100 °C.`;
      try {
        const text = await generateWithGemini(ai, prompt, TEACHER_SYSTEM_PROMPT, 0.7);
        if (text && text.trim()) {
          return res.json({ text: normalizeChemistryText(text) });
        }
      } catch (err) {
        console.warn("Gemini fallback in khkt mentor question mode:", err);
      }
      return res.json({ text: getPedagogicalAnswer(studentIdea) });
    }

    if (ai) {
      try {
        const prompt = `Là chuyên gia tư vấn Khoa học Kỹ thuật (KHKT ViSEF) và Bồi dưỡng HSG Hoá học THCS:
Ý tưởng / Thắc mắc của học sinh: "${studentIdea}"
Lĩnh vực quan tâm: ${category || "Hoá học xanh & Môi trường"}

Hãy đưa ra định hướng nghiên cứu KHKT chuẩn mực theo các bước:
1. **Tên đề tài KHKT đề xuất**: (Tính khoa học, ứng dụng cao, khả thi với học sinh THCS)
2. **Tính mới & Ý nghĩa thực tiễn**: (Đặc biệt gắn với đời sống thực tế tại địa phương Tây Ninh hoặc trường học)
3. **Mục tiêu & Giả thuyết khoa học**:
4. **Phương pháp & Thí nghiệm cần thực hiện**:
5. **Dự kiến sản phẩm đầu ra**:
6. **Mở rộng bồi dưỡng kiến thức chuyên sâu (Olympic/HSG)**:

LƯU Ý: Không dùng LaTeX $...$. Viết thẳng 100 °C, 1 atm, H₂O, CO₂.`;

        const generatedText = await generateWithGemini(ai, prompt, TEACHER_SYSTEM_PROMPT, 0.6);
        if (generatedText && generatedText.trim()) {
          const cleanedText = normalizeChemistryText(generatedText);
          return res.json({ text: cleanedText });
        }
      } catch (geminiError: any) {
        console.warn("Gemini API spike in KHKT mentor, using offline model:", geminiError?.message);
      }
    }

    return res.json({
      text: normalizeChemistryText(`### Định hướng Dự án KHKT: Nghiên cứu chế tạo màng bọc thực phẩm sinh học từ tinh bột củ mì (sắn) Tây Ninh kết hợp tinh dầu sả kháng khuẩn

1. **Tên đề tài**: "Chế tạo màng bọc bảo quản nông sản tự phân huỷ sinh học từ tinh bột củ mì và tinh dầu tự nhiên"
2. **Tính mới & Ý nghĩa thực tiễn**: Tây Ninh là thủ phủ củ mì (sắn) của cả nước. Việc tận dụng tinh bột sắn kết hợp glycerin và tinh dầu sả (chống nấm mốc) giúp tạo ra sản phẩm thay thế túi nilon, bảo vệ môi trường nông thôn xanh.
3. **Mục tiêu**: Xác định tỷ lệ tối ưu giữa tinh bột, nước, giấm và glycerin để màng bọc có độ dai dẻo tốt nhất và khả năng phân huỷ sinh học trong đất sau 30 ngày.
4. **Thí nghiệm đề xuất**: Thử nghiệm độ bền kéo, đo tốc độ phân huỷ trong chậu đất hữu cơ của CLB, thử nghiệm bọc thử quả ổi/chuối để so sánh thời gian thâm hỏng.
5. **Sản phẩm**: Tấm màng bọc sinh học dẻo dai, an toàn vệ sinh thực phẩm và poster báo cáo KHKT.`),
    });
  } catch (error: any) {
    console.error("AI KHKT mentor error:", error);
    res.status(200).json({
      text: normalizeChemistryText("### Định hướng đề tài KHKT: Chế tạo chất chỉ thị pH sinh học từ phụ phẩm nông nghiệp Tây Ninh (vỏ quả thanh long đỏ, hoa đậu biếc) phục vụ dạy học Khoa học tự nhiên.")
    });
  }
});

apiRouter.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    appName: "CLB Hoá học THCS Lý Tự Trọng - KNTT",
    academicYear: "2026-2027",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

apiRouter.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    appName: "CLB Hoá học THCS Lý Tự Trọng - KNTT",
    academicYear: "2026-2027",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Mount API router under /api prefix and also root in serverless environment
app.use("/api", apiRouter);
if (process.env.VERCEL) {
  app.use(apiRouter);
}

// Fallback for unmatched API routes to prevent stream unpipe / finalhandler crashes in serverless runtimes
app.use("/api", (_req: Request, res: Response) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// Vite middleware setup for standalone local / container execution
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Only start standalone HTTP listener when not running in Vercel Serverless environment
if (!process.env.VERCEL) {
  startServer();
}

export default app;
