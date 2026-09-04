import express from "express";
import type { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { normalizeChemistryText } from "./src/utils/chemistryFormatter.ts";

dotenv.config();

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
Bạn là chuyên gia AI giáo dục, nhà khoa học hoá học và nhà sư phạm tâm huyết có nhiều năm kinh nghiệm giảng dạy môn Khoa học tự nhiên (phân môn Hoá học) lớp 6, 7, 8, 9 theo bộ sách "Kết nối tri thức với cuộc sống" (KNTT).

Tôn chỉ sư phạm:
1. Luôn lắng nghe, thấu hiểu và trả lời ĐÚNG TRỌNG TÂM câu hỏi của học sinh:
   - Nếu học sinh hỏi lời khuyên học tập, tâm sự, muốn học giỏi môn hoá: Đưa ra lời khuyên tâm huyết, lộ trình từng bước dễ hiểu, khích lệ tinh thần, truyền lửa đam mê.
   - Nếu học sinh hỏi về hiện tượng khoa học, đời sống: Giải thích rõ ràng hiện tượng, bản chất hoá học, liên hệ thực tế gần gũi (gian bếp, đời sống Tây Ninh, nông sản), kèm phương trình hoá học chuẩn mực.
   - Nếu học sinh hỏi bài tập, lý thuyết: Hướng dẫn phương pháp tư duy từng bước để học sinh tự tin tự giải.
2. Ngôn ngữ trong sáng, gần gũi, chuẩn mực sư phạm THCS, tránh thuật ngữ hàn lâm khó hiểu.
3. Luôn đảm bảo AN TOÀN TUYỆT ĐỐI khi thực hành thí nghiệm (kính bảo hộ, găng tay, không nếm/ngửi trực tiếp hoá chất).
4. Khơi gợi tư duy khoa học, phương pháp quan sát - thử nghiệm - kết luận, khuyến khích sáng tạo KHKT ViSEF.

QUY CHUẨN TRÌNH BÀY HOÁ HỌC & ĐƠN VỊ KHOA HỌC (BẮT BUỘC):
- TUYỆT ĐỐI KHÔNG dùng cú pháp LaTeX thô như $100^\\circ\\text{C}$, $1\\text{ atm}$, $\\text{H}_2\\text{O}$, $\\text{CO}_2$, $\\text{Fe}^{3+}$.
- Luôn sử dụng ký tự Unicode trực tiếp:
  + Nhiệt độ: '100 °C', '25 °C', '0 °C'.
  + Áp suất & đơn vị: '1 atm', '101,3 kPa', '1 bar', '250 mL', '1 mol/L'.
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
  const candidateModels = ["gemini-3.1-flash-lite", "gemini-flash-latest", "gemini-3.8-flash"];
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

  if (q.includes("nước sôi") || q.includes("nhiệt độ sôi") || (q.includes("nước") && q.includes("sôi")) || (q.includes("sôi") && q.includes("độ"))) {
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

  if (q.includes("sao cô") || q.includes("tại sao") || q.includes("cô ơi") || q.length < 10) {
    return normalizeChemistryText(`Chào em! Cô Huỳnh Thị Thuỳ Dương đây!

Cô luôn sẵn sàng lắng nghe và giải đáp mọi câu hỏi tò mò của em về thế giới Hoá học & Khoa học tự nhiên theo sách Kết nối tri thức (KNTT).

Em có thể bấm vào các gợi ý nhanh phía dưới hoặc hỏi cô về:
1. 💡 **Hiện tượng đời sống:** "Nước sôi ở bao nhiêu độ?", "Tại sao cắt hành cay mắt?", "Tại sao đinh sắt bị gỉ?"
2. 🧪 **Thí nghiệm vui tại nhà:** "Cách làm slime an toàn", "Viết chữ tàng hình bằng chanh", "Đổi màu hoa giấy bằng bắp cải tím"
3. 🏆 **Nghiên cứu KHKT:** "Gợi ý đề tài nghiên cứu từ nông sản Tây Ninh", "Cách làm màng bọc thực phẩm từ tinh bột sắn"

Em đang muốn tìm hiểu về hiện tượng hoặc chất hoá học nào, hãy nói cụ thể cho cô nghe nhé!`);
  }

  // General dynamic response
  return normalizeChemistryText(`Chào em! Dưới góc nhìn Hoá học của CLB Hoá học THCS Lý Tự Trọng (bộ sách Kết nối tri thức với cuộc sống):

### 1. Hiện tượng & Câu trả lời cốt lõi
Vấn đề em hỏi liên quan trực tiếp đến sự biến đổi chất và các định luật cơ bản của Khoa học tự nhiên. Trong tự nhiên, các phân tử và nguyên tử không tự nhiên sinh ra hay mất đi, mà chỉ tái sắp xếp liên kết hoá học để chuyển từ dạng chất này sang dạng chất khác.

### 2. Bản chất hoá học đằng sau
- Mọi vật chất xung quanh ta được cấu tạo từ các nguyên tố hoá học cấu thành (như C, H, O, N, Na, Cl, Fe, Ca...).
- Khi xảy ra phản ứng hoá học, các liên kết cũ giữa các nguyên tử bị bẻ gãy dưới tác động của nhiệt độ, nồng độ hoặc chất xúc tác, hình thành liên kết mới tạo ra sản phẩm mới có tính chất riêng biệt.
- Phương trình bảo toàn: Tổng khối lượng các chất tham gia phản ứng luôn bằng tổng khối lượng các chất sản phẩm tạo thành.

### 3. Ứng dụng thực tế đời sống
Từ gian bếp gia đình (pha nước chanh, nướng bánh, làm giấm gạo), nông nghiệp xanh (bón phân N-P-K cân đối, cải tạo đất chua bằng vôi bột CaO/Ca(OH)₂), đến bảo vệ môi trường đều là những ứng dụng thiết thực của Hoá học.

### 4. Thử thách nhỏ cho em
Em hãy thử liên hệ kiến thức này với một vật dụng hoặc hiện tượng diễn ra ngay trong nhà mình hôm nay và ghi chép lại vào Sổ tay khoa học nhí nhé!`);
}

// 1. AI Q&A / Explanation: "Vì sao? Như thế nào?"
apiRouter.post("/ai/ask", async (req: Request, res: Response) => {
  try {
    const { question, grade, topic } = req.body;
    if (!question || typeof question !== "string" || !question.trim()) {
      return res.status(400).json({ error: "Vui lòng nhập câu hỏi cần giải đáp." });
    }

    const ai = getAIClient();
    if (ai) {
      try {
        const prompt = `Học sinh ${grade ? `lớp ${grade}` : "THCS"} trường THCS Lý Tự Trọng (Tây Ninh) hỏi Cô Huỳnh Thị Thuỳ Dương:
"${question}"
${topic ? `Thuộc chủ đề/tháng: ${topic}` : ""}

HÃY PHÂN TÍCH Ý ĐỊNH VÀ TRẢ LỜI ĐÚNG TRỌNG TÂM CÂU HỎI CỦA HỌC SINH:
- NẾU HỌC SINH HỎI VỀ PHƯƠNG PHÁP HỌC / TÂM SỰ / MUỐN HỌC GIỎI HOÁ:
  + Đóng vai Cô Thuỳ Dương đưa ra lời khuyên chân thành, khích lệ tinh thần, chỉ ra các bước cụ thể: nắm chắc hoá trị, học qua thí nghiệm thực tế, cách cân bằng phương trình, vẽ sơ đồ tư duy mindmap, luyện tập mỗi ngày.
  + Trả lời tự nhiên, ấm áp, truyền cảm hứng, KHÔNG gượng ép chia theo tiêu đề hiện tượng/bản chất vật lý.
- NẾU HỌC SINH HỎI VỀ HIỆN TƯỢNG KHOA HỌC / THÍ NGHIỆM / ĐỜI SỐNG:
  + Giải đáp cuốn hút theo bộ sách Kết nối tri thức:
    ### 1. Hiện tượng & Câu trả lời cốt lõi (ngắn gọn, trực diện, chính xác)
    ### 2. Bản chất hoá học đằng sau (phương trình chữ hoặc KHHH chuẩn Unicode)
    ### 3. Ứng dụng thực tế đời sống thú vị
    ### 4. Thử thách nhỏ / Câu hỏi tò mò dành cho học sinh suy ngẫm
- NẾU HỌC SINH HỎI VỀ BÀI TẬP / CHẤT HOÁ HỌC:
  + Hướng dẫn tư duy từng bước để học sinh hiểu sâu bản chất.

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
    const { materials, grade, interest } = req.body;
    const ai = getAIClient();

    if (ai) {
      try {
        const prompt = `Gợi ý 1 thí nghiệm hoá học STEM vui, an toàn tuyệt đối và sáng tạo cho học sinh CLB Hoá học THCS (Khối ${grade || "7-9"}).
Nguyên liệu sẵn có học sinh đề xuất: ${materials || "Nguyên liệu gian bếp dễ tìm (chanh, giấm, muối, baking soda, bắp cải tím...)"}
Sở thích/Mục tiêu: ${interest || "Khám phá hiện tượng biến đổi chất diệu kỳ"}

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
    const { studentIdea, category } = req.body;
    const ai = getAIClient();

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

// Mount API router for both /api prefix and root (ensuring full compatibility with Vercel serverless rewrites)
app.use("/api", apiRouter);
app.use(apiRouter);

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
