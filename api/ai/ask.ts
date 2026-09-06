import { GoogleGenAI } from "@google/genai";

function normalizeChemistryText(content: string): string {
  if (!content) return "";
  let text = content;
  text = text.replace(/\$([0-9.]+)\s*\^\\circ\s*\\text\{\s*([A-Za-z]+)\s*\}\$/g, "$1 °$2");
  text = text.replace(/\$([0-9.]+)\s*\^\{\\circ\}\s*\\text\{\s*([A-Za-z]+)\s*\}\$/g, "$1 °$2");
  text = text.replace(/([0-9.]+)\s*\^\\circ\s*([A-Za-z]+)\b/g, "$1 °$2");
  text = text.replace(/\$([0-9.,]+)\s*\\text\{\s*([^}]+)\s*\}\$/g, "$1 $2");
  text = text.replace(/\$\\text\{([^}]+)\}\$/g, "$1");
  text = text.replace(/\\rightarrow/g, "→");
  text = text.replace(/\\uparrow/g, "↑");
  text = text.replace(/\\downarrow/g, "↓");
  text = text.replace(/--\s*t°\s*-->/gi, " —(t°)→ ");
  text = text.replace(/-->/g, " → ");
  text = text.replace(/\$([0-9.,]+)\$/g, "$1");
  text = text.replace(/\$([A-Za-z0-9₀-₉⁰-⁹⁺⁻()→⇌]+)\$/g, "$1");
  return text;
}

function getPedagogicalAnswer(question: string, grade = "8"): string {
  const q = (question || "").toLowerCase();

  if (
    q.includes("dẫn điện") ||
    q.includes("dan dien") ||
    (q.includes("kim loại") && q.includes("nước")) ||
    (q.includes("kim loai") && q.includes("nuoc"))
  ) {
    return `Chào em! Cô Huỳnh Thị Thuỳ Dương rất khen ngợi câu hỏi mang tính tư duy khoa học của em:

### 1. Hiện tượng & Câu trả lời cốt lõi
**Kim loại dẫn điện tốt hơn nước rất nhiều.**
Trong thực tế, **nước tinh khiết (nước cất)** gần như không dẫn điện. Chỉ khi nước có hoà tan muối khoáng hoặc axit/bazơ thì mới dẫn điện, nhưng khả năng dẫn điện vẫn kém xa kim loại hàng triệu lần!

### 2. Bản chất khoa học đằng sau
- **Trong kim loại (đồng Cu, nhôm Al, sắt Fe...):** Có một "biển electron tự do" di chuyển cực kỳ nhanh chóng và dễ dàng khắp mạng tinh thể kim loại khi có hiệu điện thế, tạo ra dòng điện rất mạnh.
- **Trong nước nguyên chất (H₂O):** Là các phân tử trung hoà điện, hầu như không có các hạt mang điện tự do.
- **Trong nước sinh hoạt (nước máy, nước sông, nước muối):** Có chứa các ion mang điện (Na⁺, Cl⁻, Ca²⁺...), các ion này di chuyển chậm hơn electron tự do trong kim loại rất nhiều.

### 3. Ứng dụng thực tế đời sống
- Lõi dây điện trong gia đình và trường Lý Tự Trọng luôn làm bằng đồng hoặc nhôm để dẫn điện tối ưu.
- Nước sinh hoạt và mồ hôi dẫn điện nên tuyệt đối KHÔNG chạm tay ướt vào ổ cắm điện để phòng tránh điện giật!

### 4. Thử thách nhỏ
Cô đố em: Giữa nước cất và nước muối ăn, nước nào sẽ làm sáng bóng đèn của mạch điện thử nghiệm?`;
  }

  if (
    (q.includes("sắt") || q.includes("fe")) &&
    (q.includes("hcl") || q.includes("fecl2") || q.includes("fecl3"))
  ) {
    return `Chào em! Cô Dương giải thích phản ứng của sắt (Fe) theo chuẩn SGK KNTT:

### 1. Hiện tượng & Câu trả lời cốt lõi
Sắt (Fe) phản ứng với axit clohiđric (HCl) **chỉ tạo ra muối Sắt(II) clorua FeCl₂**, không tạo ra FeCl₃:
**Fe + 2HCl → FeCl₂ + H₂↑**

### 2. Bản chất khoa học
Axit HCl có tính oxi hoá trung bình (qua ion H⁺), chỉ oxi hoá Fe lên mức +2 (Fe²⁺). Muốn đưa Fe lên +3 (FeCl₃), cần chất oxi hoá cực mạnh như khí Clo: \`2Fe + 3Cl₂ —(t°)→ 2FeCl₃\`.`;
  }

  if (q.includes("thể tích mol") || q.includes("24,79") || q.includes("đkc")) {
    return `Chào em! Theo SGK KNTT (GDPT 2018):
- Ở điều kiện chuẩn (đkc: 25 °C, 1 bar), **1 mol chất khí bất kì đều chiếm thể tích là 24,79 L**.
- Công thức: \`V = n × 24,79\`.
- Lưu ý: Không dùng số cũ 22,4 L của chương trình trước đây nữa nhé!`;
  }

  return `Chào em! Cô Huỳnh Thị Thuỳ Dương giải đáp câu hỏi của em:

### 1. Hiện tượng & Bản chất khoa học
Đối với câu hỏi "${question}":
Trong môn Khoa học tự nhiên (phân môn Hoá học - SGK Kết nối tri thức Lớp ${grade}), các chất và phản ứng luôn tuân theo cấu tạo nguyên tử, liên kết hoá học và định luật bảo toàn khối lượng.

### 2. Lời khuyên học tập từ Cô Dương
- Em hãy liên hệ hiện tượng này với bài học trong SGK KHTN ${grade} hoặc thực tế đời sống tại Tây Ninh.
- Thử suy ngẫm về các dấu hiệu nhận biết: có xuất hiện bọt khí (↑), kết tủa (↓) hay biến đổi nhiệt độ không nhé!`;
}

const TEACHER_SYSTEM_PROMPT = `Cô là Huỳnh Thị Thuỳ Dương, giáo viên chủ nhiệm CLB Hoá học trường THCS Lý Tự Trọng (phường Long Hoa, tỉnh Tây Ninh). Bộ sách giảng dạy: Kết nối tri thức với cuộc sống (KNTT) môn Khoa học tự nhiên (Toàn diện phân môn Hoá học, Vật lý, Sinh học và STEM đời sống khối 6, 7, 8, 9).

PHƯƠNG CHÂM SƯ PHẠM ĐỂ HỌC SINH HIỂU BẢN CHẤT DỄ NHẤT:
1. Ngôn từ gần gũi, ấm áp, khích lệ tinh thần say mê khám phá của học sinh THCS. Luôn xưng "cô" và gọi học sinh là "em".
2. LUÔN DÙNG HÌNH ẢNH ẨN DỤ ĐỜI THƯỜNG (Analogy) để biến những khái niệm trừu tượng thành trực quan:
   - Nguyên tử: như hệ mặt trời thu nhỏ với hạt nhân ở tâm và các electron quay quanh theo quỹ đạo.
   - Liên kết hoá học: như những bàn tay nắm chặt lấy nhau tạo thành khối bền vững.
   - Hoá trị: như số cánh tay của mỗi nguyên tử chìa ra để ghép nối tạo nên hợp chất.
   - Nồng độ dung dịch: như độ ngọt đậm hay nhạt của một ly nước đường pha nhiều hay ít nước.
   - Chất xúc tác / Enzyme: như chiếc chìa khoá chuyên biệt mở nhanh cánh cửa phản ứng mà không bị hao mòn.

QUY CHUẨN KIẾN THỨC CHUẨN XÁC SGK KẾT NỐI TRI THỨC (GDPT 2018):
- Thể tích 1 mol chất khí ở điều kiện chuẩn (25 °C, 1 bar) là 24,79 L (tuyệt đối không dùng số cũ 22,4 L).
- Phản ứng sắt (Fe): Fe + 2HCl → FeCl₂ + H₂↑ (sắt II); nhưng 2Fe + 3Cl₂ —(t°)→ 2FeCl₃ (sắt III); 3Fe + 2O₂ —(t°)→ Fe₃O₄ (oxit sắt từ).
- Chỉ thị màu: Axit làm quỳ tím hoá đỏ; Kiềm/Bazơ tan làm quỳ tím hoá xanh; Phenolphthalein chỉ đổi màu hồng trong môi trường kiềm.
- Dãy hoạt động hoá học: K, Na, Ca, Mg, Al, Zn, Fe, Pb, (H), Cu, Ag, Au (kim loại trước H mới giải phóng H₂ từ axit loãng).
- An toàn pha loãng H₂SO₄ đặc: Rót từ từ axit vào nước, TUYỆT ĐỐI không rót nước vào axit đặc.

CẤU TRÚC 4 PHẦN RÕ RÀNG:
### 1. Hiện tượng & Câu trả lời cốt lõi (Trực diện, chuẩn xác ngay 1-2 câu đầu)
### 2. Bản chất khoa học đằng sau (Giải thích logic, phương trình chữ hoặc KHHH chuẩn Unicode)
### 3. Ứng dụng thực tế đời sống thú vị (Liên hệ gian bếp, thiên nhiên, Tây Ninh)
### 4. Thử thách nhỏ / Câu hỏi gợi mở (Để kích thích học sinh tiếp tục đào sâu suy nghĩ)

QUY TẮC HIỂN THỊ:
- Tuyệt đối KHÔNG dùng mã LaTeX thô ($...$, \\frac...).
- Viết trực tiếp ký hiệu hoá học và đơn vị chuẩn Unicode: H₂O, CO₂, Al₂O₃, Fe²⁺, SO₄²⁻, 100 °C, 1 atm, 24,79 L.`;

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const question = (body.question || body.prompt || "").toString().trim();
    const grade = body.grade || "8";

    if (!question) {
      return res.status(200).json({
        text: "Chào em! Cô là Cô Huỳnh Thị Thuỳ Dương. Em hãy đặt câu hỏi về môn Hoá học hoặc hiện tượng đời sống để cô giải đáp cho em nhé!",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: { headers: { "User-Agent": "aistudio-build" } },
        });

        const prompt = `Học sinh hỏi Cô Huỳnh Thị Thuỳ Dương (GV Hoá học THCS Lý Tự Trọng): "${question}".
Hãy trả lời ĐÚNG TRỌNG TÂM câu hỏi này của học sinh theo chuẩn SGK KNTT Khối ${grade}.
Cấu trúc chuẩn sư phạm của Cô Dương:
### 1. Hiện tượng & Câu trả lời cốt lõi
### 2. Bản chất hoá học đằng sau (phương trình chữ hoặc KHHH chuẩn Unicode)
### 3. Ứng dụng thực tế đời sống thú vị
### 4. Thử thách nhỏ / Câu hỏi tò mò dành cho học sinh suy ngẫm

LƯU Ý QUAN TRỌNG: Tuyệt đối không dùng mã LaTeX thô như $...$. Luôn viết thẳng 100 °C, 1 atm, H₂O, CO₂, Fe²⁺, SO₄²⁻.`;

        const candidateModels = ["gemini-3.6-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
        let generatedText = "";
        for (const model of candidateModels) {
          try {
            const response = await ai.models.generateContent({
              model,
              contents: prompt,
              config: {
                systemInstruction: TEACHER_SYSTEM_PROMPT,
                temperature: 0.7,
              },
            });
            if (response.text && response.text.trim()) {
              generatedText = response.text;
              break;
            }
          } catch (modelErr) {
            console.warn(`Model ${model} error in api/ai/ask.ts:`, modelErr);
          }
        }
        if (generatedText && generatedText.trim()) {
          const cleanedText = normalizeChemistryText(generatedText);
          return res.status(200).json({ text: cleanedText });
        }
      } catch (geminiError: any) {
        console.warn("Gemini generation error in Vercel handler:", geminiError?.message);
      }
    }

    // High quality pedagogical fallback
    const answer = getPedagogicalAnswer(question, grade);
    return res.status(200).json({ text: normalizeChemistryText(answer) });
  } catch (error: any) {
    console.error("Vercel ask handler error:", error);
    const fallbackAnswer = getPedagogicalAnswer(req.body?.question || "", "8");
    return res.status(200).json({ text: normalizeChemistryText(fallbackAnswer) });
  }
}
