import React, { useState } from "react";
import { KHKT_SAMPLE_PROJECTS } from "../data/curriculumData";
import { KHKTIdea } from "../types";
import { 
  Award, 
  Sparkles, 
  Send, 
  Download, 
  ChevronRight, 
  CheckCircle2, 
  Lightbulb, 
  FileCheck,
  Compass,
  ArrowRight
} from "lucide-react";

export const KHKTMentor: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<KHKTIdea>(KHKT_SAMPLE_PROJECTS[0]);
  const [customIdea, setCustomIdea] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiProposal, setAiProposal] = useState<string | null>(null);

  const handleConsultAI = async (ideaText?: string) => {
    const text = ideaText || customIdea;
    if (!text.trim()) return;

    setIsGenerating(true);
    setAiProposal(null);

    try {
      const res = await fetch("/api/ai/khkt-mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentIdea: text,
          category: "Hoá học xanh & Đời sống THCS Lý Tự Trọng",
        }),
      });
      const data = await res.json();
      setAiProposal(data.text);
    } catch (e) {
      console.error(e);
      setAiProposal("Đã có lỗi kết nối. Em hãy thử lại nhé!");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportProposal = () => {
    const content = `ĐỀ CƯƠNG DỰ ÁN NGHIÊN CỨU KHOA HỌC KỸ THUẬT (KHKT ViSEF)
TRƯỜNG THCS LÝ TỰ TRỌNG - TÂY NINH
Năm học: 2026 - 2027
Người hướng dẫn: Cô Huỳnh Thị Thùy Dương

TÊN ĐỀ TÀI: ${selectedProject.title}
LĨNH VỰC: ${selectedProject.category}
ĐỐI TƯỢNG HỌC SINH: ${selectedProject.gradeSuitability}

1. LÝ DO CHỌN ĐỀ TÀI:
${selectedProject.realWorldProblem}

2. GIẢ THUYẾT KHOA HỌC:
${selectedProject.hypothesis}

3. VẬT LIỆU ĐỊA PHƯƠNG TÂY NINH:
${selectedProject.localMaterials.join(", ")}

4. PHƯƠNG PHÁP NGHIÊN CỨU & THỰC NGHIỆM:
${selectedProject.methodology.map((m, i) => `${i + 1}. ${m}`).join("\n")}

5. KẾT QUẢ KỲ VỌNG:
${selectedProject.expectedOutcome}`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `De_Cuong_KHKT_${selectedProject.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">
            <Award className="w-4 h-4 text-amber-400" />
            Vườn Ươm Tài Năng KHKT & Olympic Hoá Học
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black">
            Ươm Mầm Ý Tưởng Nghiên Cứu Khoa Học Kỹ Thuật (ViSEF)
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Từ những thắc mắc giản dị trong đời sống Tây Ninh đến đề tài nghiên cứu khoa học bài bản. 
            Cô Huỳnh Thị Thùy Dương và Trợ lý AI đồng hành cùng các em xây dựng giả thuyết khoa học, 
            thiết kế thí nghiệm đối chứng và hoàn thiện đề cương chuẩn cuộc thi KHKT cấp Thị xã và Tỉnh!
          </p>
        </div>
      </div>

      {/* Idea Consultation Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <span>Em có một ý tưởng tò mò muốn phát triển thành đề tài KHKT?</span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ví dụ: Em muốn làm màng bọc thực phẩm tự phân huỷ sinh học từ tinh bột củ mì Tây Ninh..."
            value={customIdea}
            onChange={(e) => setCustomIdea(e.target.value)}
            className="flex-1 px-4 py-3 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-emerald-600"
          />
          <button
            onClick={() => handleConsultAI()}
            disabled={!customIdea.trim() || isGenerating}
            className="px-5 py-3 rounded-xl bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-emerald-800 transition-colors disabled:opacity-50"
          >
            <span>Định Hướng Đề Cương AI</span>
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* AI Proposal Box */}
        {isGenerating && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center gap-2 animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Trợ lý AI đang tra cứu phương pháp và cấu trúc đề tài KHKT ViSEF cho em...</span>
          </div>
        )}

        {aiProposal && (
          <div className="p-5 rounded-xl bg-emerald-50/80 border border-emerald-300 text-xs sm:text-sm space-y-2 text-slate-800 animate-fadeIn">
            <div className="flex items-center justify-between font-bold text-emerald-900 pb-2 border-b border-emerald-200">
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-700" />
                Gợi Ý Đề Cương Dự Án Từ Trợ Lý AI & Cô Huỳnh Thị Thùy Dương:
              </span>
              <button
                onClick={() => setAiProposal(null)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Đóng
              </button>
            </div>
            <div className="whitespace-pre-line leading-relaxed text-slate-800">
              {aiProposal}
            </div>
          </div>
        )}
      </div>

      {/* Showcase of Outstanding Sample KHKT Proposals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: List of 4 Exemplary Local Projects (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Các Đề Tài Mẫu Tiêu Biểu Tận Dụng Nguồn Lực Tây Ninh
          </h3>
          <div className="space-y-2.5">
            {KHKT_SAMPLE_PROJECTS.map((proj) => {
              const isSelected = proj.id === selectedProject.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all text-left ${
                    isSelected
                      ? "bg-emerald-50 border-emerald-600 shadow-xs ring-1 ring-emerald-600/30"
                      : "bg-white border-slate-200 hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {proj.category}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {proj.gradeSuitability}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {proj.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">
                    {proj.realWorldProblem}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Proposal Card (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                {selectedProject.category} • {selectedProject.gradeSuitability}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-2">
                {selectedProject.title}
              </h3>
            </div>

            <button
              onClick={handleExportProposal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Đề Cương</span>
            </button>
          </div>

          {/* Vấn đề thực tiễn */}
          <div className="space-y-1 text-xs">
            <h5 className="font-bold text-slate-800 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              1. Vấn Đề Đặt Ra Trong Đời Sống & Nông Nghiệp Tây Ninh:
            </h5>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {selectedProject.realWorldProblem}
            </p>
          </div>

          {/* Giả thuyết khoa học */}
          <div className="space-y-1 text-xs">
            <h5 className="font-bold text-emerald-900 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-600" />
              2. Giả Thuyết Khoa Học (Scientific Hypothesis):
            </h5>
            <p className="text-slate-800 leading-relaxed bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/70 font-medium">
              "{selectedProject.hypothesis}"
            </p>
          </div>

          {/* Vật liệu địa phương & Các bước tiến hành */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <h5 className="font-bold text-slate-800">3. Vật Liệu Sẵn Có Tại Tây Ninh:</h5>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedProject.localMaterials.map((mat, i) => (
                  <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-1 rounded-md border border-slate-200 font-medium">
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <h5 className="font-bold text-slate-800">4. Kết Quả Dự Kiến:</h5>
              <p className="text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200/70 text-[11px]">
                {selectedProject.expectedOutcome}
              </p>
            </div>
          </div>

          {/* Phương pháp thực nghiệm */}
          <div className="space-y-1.5 text-xs">
            <h5 className="font-bold text-slate-800">5. Quy Trình Thực Nghiệm Chuẩn:</h5>
            <div className="space-y-1.5">
              {selectedProject.methodology.map((step, sIdx) => (
                <div key={sIdx} className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick AI Consultation trigger for this project */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Muốn tìm hiểu sâu hơn về đề tài này?
            </span>
            <button
              onClick={() => handleConsultAI(`Em muốn tìm hiểu sâu về đề tài: ${selectedProject.title}`)}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
            >
              <span>Hỏi Trợ Lý AI về đề tài này</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
