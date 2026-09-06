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

function getExperimentFallback(rawInput: string, grade = "8"): string {
  return `### Gợi ý Thí nghiệm STEM Hoá học Vui & An toàn (KNTT Lớp ${grade})

1. **Tên thí nghiệm:** "Núi lửa phun trào mini - Khám phá phản ứng Axit tác dụng với Muối cacbonat"
2. **Nguyên liệu dễ tìm trong gian bếp:**
   - 2 thìa baking soda (muối NaHCO₃).
   - 50 mL giấm ăn (axit axetic CH₃COOH) hoặc nước cốt 1 quả chanh (axit citric).
   - 1 giọt nước rửa chén và vài giọt phẩm màu đỏ (hoặc siro dâu).
   - 1 chiếc đĩa sâu lòng hoặc cốc thuỷ tinh nhỏ.
3. **Các bước tiến hành:**
   - Bước 1: Đặt cốc thuỷ tinh lên giữa đĩa. Cho 2 thìa baking soda vào đáy cốc.
   - Bước 2: Nhỏ vào cốc 1 giọt nước rửa chén và 2 giọt màu đỏ để tạo bọt dung nham đẹp mắt.
   - Bước 3: Rót từ từ 50 mL giấm ăn vào cốc.
4. **Hiện tượng quan sát:** Dung dịch lập tức sôi trào, bọt khí màu đỏ cuồn cuộn dâng cao trào qua miệng cốc như dòng nham thạch thu nhỏ!
5. **Bản chất khoa học:** Axit axetic trong giấm phản ứng mãnh liệt với baking soda giải phóng lượng lớn khí Carbon dioxide:
   \`CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑\`
   Khí CO₂ sinh ra bị bẫy trong màng xà phòng tạo thành bọt xốp khổng lồ!
6. **Lưu ý an toàn:** Thí nghiệm hoàn toàn lành tính, em có thể tự tin làm tại nhà hoặc trình diễn trong buổi sinh hoạt CLB!`;
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

    const answer = getExperimentFallback(rawInput, grade);
    return res.status(200).json({ text: normalizeChemistryText(answer) });
  } catch (error: any) {
    console.error("Vercel suggest-experiment error:", error);
    const fallback = getExperimentFallback(req.body?.materials || "", "8");
    return res.status(200).json({ text: normalizeChemistryText(fallback) });
  }
}
