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
    const rawInput = (body.materials || body.prompt || body.question || "").toString().trim();
    const grade = body.grade || "8";
    const interest = body.interest || "Khám phá khoa học";

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: { headers: { "User-Agent": "aistudio-build" } },
        });

        const prompt = `Gợi ý 1 thí nghiệm hoá học STEM vui, an toàn tuyệt đối và sáng tạo cho học sinh CLB Hoá học THCS (Khối ${grade}).
Nguyên liệu / Yêu cầu học sinh đề xuất: ${rawInput || "Nguyên liệu gian bếp dễ tìm (chanh, giấm, muối, baking soda...)"}
Sở thích/Mục tiêu: ${interest}

Hãy trình bày cụ thể:
- **Tên thí nghiệm**:
- **Mục tiêu học tập**: (Liên hệ bài học SGK Kết nối tri thức lớp 7/8/9)
- **Dụng cụ & Hoá chất cần chuẩn bị**: (Dễ kiếm, an toàn)
- **Các bước tiến hành chi tiết**: (Bước 1, Bước 2, Bước 3...)
- **Hiện tượng quan sát được**:
- **Giải thích khoa học**: (Dễ hiểu cho học sinh THCS)
- **Cảnh báo an toàn**:

LƯU Ý: Không dùng LaTeX $...$. Viết thẳng 100 °C, 1 atm, H₂O, CO₂.`;

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
            console.warn(`Model ${model} error in suggest-experiment:`, modelErr);
          }
        }
        if (generatedText && generatedText.trim()) {
          return res.status(200).json({ text: normalizeChemistryText(generatedText) });
        }
      } catch (geminiError: any) {
        console.warn("Gemini generation error in suggest-experiment:", geminiError?.message);
      }
    }

    const answer = getClientPedagogicalFallback(rawInput, "suggest", grade);
    return res.status(200).json({ text: answer });
  } catch (error: any) {
    console.error("Vercel suggest-experiment error:", error);
    const fallback = getClientPedagogicalFallback(req.body?.materials || "", "suggest", "8");
    return res.status(200).json({ text: fallback });
  }
}
