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
  text = text.replace(/--\s*t°\s*-->/gi, " —(t°)→ ");
  text = text.replace(/\$([0-9.,]+)\$/g, "$1");
  return text;
}

function getKhktFallback(idea: string, grade = "8"): string {
  return `### Cố vấn Dự án KHKT cấp THCS - Cô Huỳnh Thị Thuỳ Dương

1. **Tên dự án chuẩn hoá:** "Nghiên cứu tận dụng phụ phẩm nông nghiệp Tây Ninh (vỏ quả, rơm rạ) làm vật liệu hấp phụ sinh học và chất chỉ thị màu thân thiện môi trường"
2. **Tính cấp thiết & Ý nghĩa:**
   - Gắn liền với điều kiện thực tế địa phương Tây Ninh: nông nghiệp phong phú, cần giải pháp xử lý phụ phẩm xanh.
   - Ứng dụng kiến thức KHTN Lớp ${grade} về dung dịch, sự hấp phụ ion kim loại nặng và chất chỉ thị tự nhiên.
3. **Quy trình thực nghiệm:**
   - Bước 1: Thu gom và xử lý sạch nguyên liệu vỏ trái cây hoặc bã nông sản.
   - Bước 2: Sấy khô và nghiền mịn thành bột than hoạt tính sinh học.
   - Bước 3: Thử nghiệm khả năng lọc nước hoặc thử nghiệm làm chất chỉ thị pH với dung dịch axit - bazơ gia đình.
4. **Lời khuyên từ Cô Dương:**
   - Luôn ghi chép nhật ký thực nghiệm tỉ mỉ, đo lường bằng số liệu định lượng (khối lượng gam, thể tích mL, thời gian phút) để bài báo cáo thuyết phục ban giám khảo nhé!`;
}

const TEACHER_SYSTEM_PROMPT = `Cô là Huỳnh Thị Thuỳ Dương, giáo viên chủ nhiệm CLB Hoá học trường THCS Lý Tự Trọng (Tây Ninh). Bộ sách: Kết nối tri thức với cuộc sống (KNTT) môn Khoa học tự nhiên (phân môn Hoá học khối 7, 8, 9).
Phong cách: Thân thiện, sư phạm, chuẩn mực, truyền cảm hứng yêu thích khoa học.
LƯU Ý: Tuyệt đối không dùng mã LaTeX thô như $...$. Luôn viết thẳng 100 °C, 1 atm, H₂O, CO₂, Fe²⁺, SO₄²⁻.`;

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
    const idea = (body.idea || body.prompt || body.question || "").toString().trim();
    const grade = body.grade || "8";

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: { headers: { "User-Agent": "aistudio-build" } },
        });

        const prompt = `Cố vấn dự án Cuộc thi Khoa học Kỹ thuật (KHKT) cấp THCS cho học sinh trường THCS Lý Tự Trọng.
Ý tưởng của học sinh: ${idea || "Nghiên cứu ứng dụng hoá học phục vụ đời sống hoặc bảo vệ môi trường"}
Khối lớp: ${grade}

Hãy hướng dẫn hoàn thiện ý tưởng thành dự án KHKT mẫu:
1. **Tên dự án chuẩn hoá**
2. **Tính cấp thiết & Mục tiêu nghiên cứu**
3. **Phương pháp nghiên cứu & Quy trình thực nghiệm**
4. **Dự kiến kết quả & Ý nghĩa thực tiễn**
5. **Lời khuyên của Cô Dương**`;

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
            console.warn(`Model ${model} error in khkt-mentor:`, modelErr);
          }
        }
        if (generatedText && generatedText.trim()) {
          return res.status(200).json({ text: normalizeChemistryText(generatedText) });
        }
      } catch (geminiError: any) {
        console.warn("Gemini generation error in khkt-mentor:", geminiError?.message);
      }
    }

    const answer = getKhktFallback(idea, grade);
    return res.status(200).json({ text: normalizeChemistryText(answer) });
  } catch (error: any) {
    console.error("Vercel khkt-mentor error:", error);
    const fallback = getKhktFallback(req.body?.idea || "", "8");
    return res.status(200).json({ text: normalizeChemistryText(fallback) });
  }
}
