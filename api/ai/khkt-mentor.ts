import { GoogleGenAI } from "@google/genai";
import { getClientPedagogicalFallback } from "../../src/utils/offlineChemistryAnswers";
import { normalizeChemistryText } from "../../src/utils/chemistryFormatter";

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

        const candidateModels = ["gemini-flash-latest", "gemini-3.1-flash-lite", "gemini-3.8-flash"];
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

    const answer = getClientPedagogicalFallback(idea, "khkt", grade);
    return res.status(200).json({ text: answer });
  } catch (error: any) {
    console.error("Vercel khkt-mentor error:", error);
    const fallback = getClientPedagogicalFallback(req.body?.idea || "", "khkt", "8");
    return res.status(200).json({ text: fallback });
  }
}
