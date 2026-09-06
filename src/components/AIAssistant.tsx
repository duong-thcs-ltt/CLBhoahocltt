import React, { useState } from "react";
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  ShieldCheck, 
  Copy, 
  Check, 
  BookmarkPlus, 
  HelpCircle,
  FlaskConical,
  Award
} from "lucide-react";
import { TeacherAvatar } from "./TeacherAvatar";
import { ChemMarkdown } from "./ChemMarkdown";
import { normalizeChemistryText } from "../utils/chemistryFormatter";
import { getClientPedagogicalFallback } from "../utils/offlineChemistryAnswers";

interface AIAssistantProps {
  initialTopic?: string;
  onSaveToJournal?: (entry: any) => void;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  mode?: "ask" | "suggest" | "khkt";
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ 
  initialTopic = "",
  onSaveToJournal 
}) => {
  const [activeMode, setActiveMode] = useState<"ask" | "suggest" | "khkt">("ask");
  const [inputQuery, setInputQuery] = useState<string>(
    initialTopic ? `Cô ơi, giải thích giúp em về chủ đề: ${initialTopic}` : ""
  );
  const [selectedGrade, setSelectedGrade] = useState<string>("8");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: `Chào các em học sinh thân mến! Cô là Trợ lý AI đồng hành cùng **Cô Huỳnh Thị Thùy Dương** (Chủ nhiệm CLB Hoá học – Trường THCS Lý Tự Trọng, Tây Ninh).

Cô rất vui được đồng hành cùng các em khám phá thế giới hoá học kỳ diệu theo bộ sách **Kết nối tri thức với cuộc sống (KNTT)**.

Em có thể hỏi cô bất cứ điều gì:
- 💡 **Giải đáp "Vì sao? Như thế nào?":** Hiện tượng quanh ta, trong gian bếp, hoa lá, môi trường...
- 🧪 **Gợi ý thí nghiệm vui, an toàn:** Sử dụng vật liệu dễ tìm tại gia đình (chanh, giấm, baking soda, bắp cải tím...).
- 🏆 **Ươm mầm ý tưởng KHKT & Olympic:** Xây dựng đề tài Nghiên cứu Khoa học Kỹ thuật từ chính sự tò mò của em!

Em đang thắc mắc điều gì, hãy gõ ngay cho cô nhé!`,
      timestamp: "08:00",
      mode: "ask",
    },
  ]);

  const quickPrompts: { label: string; query: string; mode: "ask" | "suggest" | "khkt"; grade: string }[] = [
    {
      label: "Làm sao dễ nhớ hóa trị nhất?",
      query: "Làm sao dễ nhớ hóa trị nhất",
      mode: "ask",
      grade: "8",
    },
    {
      label: "Cách sản xuất muối như thế nào?",
      query: "Cách người ta sản xuất muối như thế nào",
      mode: "ask",
      grade: "8",
    },
    {
      label: "Tại sao nước biển mặn?",
      query: "cô có thể giải thích tại sao nước biển mặn",
      mode: "ask",
      grade: "8",
    },
    {
      label: "Cách cân bằng PTHH đơn giản",
      query: "cách cân bằng phương trình hóa học đơn giản nhất",
      mode: "ask",
      grade: "8",
    },
    {
      label: "Bí quyết học giỏi môn Hoá",
      query: "Cô ơi, em muốn học giỏi môn Hoá học thì cần phương pháp học như thế nào và có bí quyết gì không ạ?",
      mode: "ask",
      grade: "8",
    },
    {
      label: "Nước sôi ở bao nhiêu độ?",
      query: "Nước sôi ở bao nhiêu độ C? Nhiệt độ sôi của nước phụ thuộc vào những yếu tố nào (áp suất, độ tinh khiết) và có hiện tượng gì thú vị trong đời sống?",
      mode: "ask",
      grade: "7",
    },
    {
      label: "Vì sao cắt hành cay mắt?",
      query: "Vì sao khi cắt hành tây ta lại bị cay mắt và chảy nước mắt? Dưới góc nhìn hoá học có mẹo nào tránh cay mắt không ạ?",
      mode: "ask",
      grade: "8",
    },
    {
      label: "Làm slime an toàn không hàn the",
      query: "Hướng dẫn em cách tự làm slime an toàn tại nhà bằng keo dán giấy PVA và nước muối sinh lý, tuyệt đối không dùng hàn the (borax) độc hại.",
      mode: "suggest",
      grade: "9",
    },
    {
      label: "Bí quyết hoá học muối dưa cải",
      query: "Tại sao muối dưa cải lại chuyển từ vị đắng chát sang chua giòn ngon miệng? Cơ chế hoá học và vi sinh của quá trình lên men lactic là gì?",
      mode: "ask",
      grade: "8",
    },
    {
      label: "Ý tưởng KHKT từ vỏ hoa quả Tây Ninh",
      query: "Em muốn làm một đề tài Khoa học Kỹ thuật (KHKT ViSEF) tận dụng vỏ bưởi da xanh hoặc vỏ sầu riêng Tây Ninh, cô gợi ý đề tài và hướng nghiên cứu cho em với ạ.",
      mode: "khkt",
      grade: "9",
    },
    {
      label: "Tại sao sắt bị rỉ sét?",
      query: "Tại sao đinh sắt để ngoài không khí ẩm sau vài ngày bị phủ một lớp gỉ màu nâu đỏ? Làm thế nào để bảo vệ kim loại không bị ăn mòn?",
      mode: "ask",
      grade: "9",
    },
    {
      label: "Mực tàng hình bằng chanh",
      query: "Cô hướng dẫn em làm mực viết tàng hình bí mật bằng nước cốt chanh và giải thích vì sao khi hơ nóng chữ lại hiện ra?",
      mode: "suggest",
      grade: "8",
    },
  ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      mode: activeMode,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const endpoint = "/api/ai/ask";
      const payload = { 
        question: textToSend, 
        prompt: textToSend, 
        grade: selectedGrade,
        mode: activeMode 
      };

      let aiReplyText = "";
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.text) {
            aiReplyText = normalizeChemistryText(data.text);
          }
        }
      } catch (fetchErr) {
        console.warn("API request error, switching to pedagogical engine:", fetchErr);
      }

      if (!aiReplyText) {
        aiReplyText = getClientPedagogicalFallback(textToSend, activeMode, selectedGrade);
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        mode: activeMode,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const fallbackText = getClientPedagogicalFallback(textToSend, activeMode, selectedGrade);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-msg-${Date.now()}`,
          sender: "ai",
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          mode: activeMode,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(normalizeChemistryText(text));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">
      {/* Top Card Info */}
      <div className="bg-linear-to-r from-teal-900 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 shadow-md border border-emerald-500/20 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <TeacherAvatar size="md" bordered={true} allowEdit={true} />
            <div className="absolute -bottom-1 -right-1 bg-amber-400 text-emerald-950 p-1 rounded-full shadow-xs pointer-events-none">
              <Sparkles className="w-3 h-3 text-emerald-950" />
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-amber-300 text-xs font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Tổ KHTN • THCS Lý Tự Trọng, Phường Long Hoa, Tây Ninh</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Trợ Lý AI Giáo Dục – Cô Huỳnh Thị Thuỳ Dương
            </h2>
            <p className="text-xs text-emerald-200">
              Giải thích dễ hiểu • Gợi ý thí nghiệm an toàn • Bồi dưỡng KHKT & Olympic Hoá học KNTT (Khối 7 - 8 - 9)
            </p>
          </div>
        </div>

        {/* Grade Selector */}
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl text-xs">
          <span className="text-emerald-200 font-medium">Khối lớp em học:</span>
          {["7", "8", "9"].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                selectedGrade === g ? "bg-amber-400 text-emerald-950 shadow-xs" : "hover:bg-white/20"
              }`}
            >
              Lớp {g}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: "ask", label: "Giải Đáp 'Vì Sao? Như Thế Nào?'", icon: HelpCircle },
          { id: "suggest", label: "Gợi Ý Thí Nghiệm STEM An Toàn", icon: FlaskConical },
          { id: "khkt", label: "Ươm Mầm KHKT & Olympic", icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMode(tab.id as any)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                isActive
                  ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-amber-300" : "text-slate-500"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Quick Prompts Carousel */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          Câu Hỏi & Chủ Đề Được Nhiều Học Sinh Quan Tâm:
        </span>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveMode(qp.mode);
                setSelectedGrade(qp.grade);
                handleSendMessage(qp.query);
              }}
              className="shrink-0 text-xs px-3 py-1.5 rounded-lg bg-emerald-50/80 border border-emerald-200/80 text-emerald-900 hover:bg-emerald-100 font-medium transition-colors"
            >
              {qp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 min-h-[420px] max-h-[600px] overflow-y-auto space-y-4 shadow-xs">
        {messages.map((msg) => {
          const isAi = msg.sender === "ai";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isAi ? "items-start" : "items-start flex-row-reverse"}`}
            >
              {/* Avatar */}
              {isAi ? (
                <TeacherAvatar size="sm" allowEdit={false} bordered={true} />
              ) : (
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-slate-800 text-white text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 ${
                  isAi
                    ? "bg-slate-50 border border-slate-200/90 text-slate-800"
                    : "bg-emerald-700 text-white shadow-xs"
                }`}
              >
                {/* Text with chemistry and markdown formatting */}
                {isAi ? (
                  <ChemMarkdown content={msg.text} />
                ) : (
                  <div className="whitespace-pre-line leading-relaxed text-white font-medium">
                    {msg.text}
                  </div>
                )}

                {/* Footer of AI message: Timestamp & Action Buttons */}
                {isAi && (
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Chuẩn kiến thức KNTT & An toàn THCS
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-slate-700 flex items-center gap-1 font-medium transition-colors"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedId === msg.id ? "Đã chép" : "Sao chép"}</span>
                      </button>

                      {onSaveToJournal && msg.id !== "welcome-1" && (
                        <button
                          onClick={() => {
                            onSaveToJournal({
                              title: "Giải đáp khoa học từ Trợ lý AI",
                              materialsUsed: ["Tư liệu AI giáo dục", "SGK Kết nối tri thức"],
                              observedPhenomena: "Tìm hiểu bản chất hoá học và ứng dụng đời sống",
                              chemicalExplanation: msg.text.slice(0, 300) + "...",
                              tags: ["Trợ lý AI", `Lớp ${selectedGrade}`]
                            });
                          }}
                          className="hover:text-emerald-700 flex items-center gap-1 font-bold transition-colors text-emerald-800"
                        >
                          <BookmarkPlus className="w-3.5 h-3.5" />
                          <span>Lưu Sổ Tay</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 animate-bounce" />
              <span>Cô Thùy Dương đang soạn câu trả lời chuẩn mực cho em, chờ cô một lát nhé...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={
            activeMode === "ask"
              ? "Đặt câu hỏi vì sao/như thế nào... (Ví dụ: Vì sao nước dừa để lâu bị chua?)"
              : activeMode === "suggest"
              ? "Nhập nguyên liệu sẵn có... (Ví dụ: Em có chanh, giấm, baking soda, màu nước)"
              : "Nhập ý tưởng KHKT em ấp ủ... (Ví dụ: Em muốn làm pin sinh học từ bã mía)"
          }
          className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isLoading}
          className="px-5 py-3 rounded-xl bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-emerald-800 transition-colors disabled:opacity-50 shadow-xs"
        >
          <span>Gửi</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
