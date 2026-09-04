import React, { useState } from "react";
import { FESTIVAL_BOOTHS } from "../data/curriculumData";
import { FestivalBoothItem } from "../types";
import { 
  Sparkles, 
  Award, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle2, 
  Gift, 
  PartyPopper,
  Printer
} from "lucide-react";

export const FestivalBooth: React.FC = () => {
  const [visitedBooths, setVisitedBooths] = useState<string[]>(["booth-1"]);
  const [selectedBooth, setSelectedBooth] = useState<FestivalBoothItem>(FESTIVAL_BOOTHS[0]);
  const [studentName, setStudentName] = useState<string>("Nguyễn Hoàng Minh");
  const [studentGrade, setStudentGrade] = useState<string>("Lớp 8A1");
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  const toggleVisit = (boothId: string) => {
    if (visitedBooths.includes(boothId)) {
      setVisitedBooths(visitedBooths.filter((id) => id !== boothId));
    } else {
      setVisitedBooths([...visitedBooths, boothId]);
    }
  };

  const isEligibleForCert = visitedBooths.length >= 3;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Festival Banner */}
      <div className="bg-linear-to-r from-amber-600 via-rose-600 to-emerald-700 text-white rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-yellow-100 text-xs font-bold">
            <PartyPopper className="w-4 h-4 text-amber-300" />
            Sự kiện Đỉnh cao Toàn Trường – Tháng 5/2027 (Mục III & V)
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black">
            Ngày Hội Khám Phá Hoá Học (Chemistry Festival Day)
          </h2>
          <p className="text-xs sm:text-sm text-yellow-100/90 leading-relaxed">
            Tổng kết 9 tháng rèn luyện và trải nghiệm của CLB Hoá học – Trường THCS Lý Tự Trọng. 
            Mỗi học sinh cầm trên tay "Hộ chiếu Khám phá", trải nghiệm 5 gian hàng tương tác, 
            nhận quà lưu niệm và chứng nhận danh dự từ Ban Giám Hiệu & Cô Huỳnh Thị Thùy Dương!
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-white/20 flex flex-wrap gap-4 text-xs text-white/90">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-300" /> Sân trường & Phòng Thực hành THCS Lý Tự Trọng
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-300" /> Chủ nhật, tuần thứ 2 của Tháng 5/2027
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-amber-300" /> Quy mô toàn trường: GV, HS và Phụ huynh
          </span>
        </div>
      </div>

      {/* Explorer Passport Stamp Progress */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-600" />
            Hộ Chiếu Trải Nghiệm Của Em (Đã đóng dấu: {visitedBooths.length}/{FESTIVAL_BOOTHS.length} gian hàng)
          </h3>
          <p className="text-xs text-slate-500">
            Trải nghiệm ít nhất 3 gian hàng để đủ điều kiện cấp "Chứng Nhận Nhà Hoá Học Nhí Xuất Sắc"
          </p>
        </div>

        <button
          onClick={() => setShowCertificate(true)}
          disabled={!isEligibleForCert}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
            isEligibleForCert
              ? "bg-amber-500 hover:bg-amber-600 text-slate-950 animate-pulse"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>Nhận Bằng Chứng Nhận Vinh Danh</span>
        </button>
      </div>

      {/* 5 Booths Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {FESTIVAL_BOOTHS.map((booth) => {
          const isVisited = visitedBooths.includes(booth.id);
          return (
            <div
              key={booth.id}
              className={`rounded-2xl border p-5 transition-all space-y-4 flex flex-col justify-between ${
                isVisited
                  ? "bg-emerald-50/40 border-emerald-300 shadow-xs"
                  : "bg-white border-slate-200 hover:border-emerald-300"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    Gian hàng #{booth.boothNumber}
                  </span>
                  <button
                    onClick={() => toggleVisit(booth.id)}
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors ${
                      isVisited
                        ? "bg-emerald-600 text-white"
                        : "border border-slate-300 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isVisited ? "Đã đóng dấu ✓" : "Đóng dấu hộ chiếu"}</span>
                  </button>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {booth.name}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {booth.description}
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="font-bold text-slate-700">Sản phẩm trưng bày:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {booth.showcasedItems.map((item, i) => (
                      <span key={i} className="text-[10px] bg-white text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 font-medium flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Thử thách nhận quà:</strong> {booth.interactiveChallenge}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-10 border-4 border-amber-400 shadow-2xl relative space-y-6">
            {/* Certificate Header */}
            <div className="text-center space-y-1">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                TRƯỜNG THCS LÝ TỰ TRỌNG – TÂY NINH
              </p>
              <p className="text-xs font-bold text-emerald-800 uppercase">
                CÂU LẠC BỘ HOÁ HỌC (2026 – 2027)
              </p>
              <h3 className="text-xl sm:text-2xl font-black text-amber-600 uppercase tracking-tight pt-2">
                CHỨNG NHẬN VINH DANH
              </h3>
              <p className="text-xs text-slate-500 italic">
                (Nhà Khoa Học Nhí Xuất Sắc – Ngày Hội Khám Phá Hoá Học Tháng 5/2027)
              </p>
            </div>

            {/* Student Info Inputs */}
            <div className="text-center space-y-3 py-4 border-y border-dashed border-slate-200">
              <p className="text-xs text-slate-600">Trân trọng trao tặng em:</p>
              <div className="flex justify-center gap-3">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Họ và tên học sinh"
                  className="font-bold text-base sm:text-lg text-emerald-950 text-center border-b-2 border-emerald-500 pb-1 focus:outline-none"
                />
                <input
                  type="text"
                  value={studentGrade}
                  onChange={(e) => setStudentGrade(e.target.value)}
                  placeholder="Lớp"
                  className="font-bold text-xs sm:text-sm text-slate-700 text-center border-b-2 border-slate-400 pb-1 w-24 focus:outline-none"
                />
              </div>
              <p className="text-xs text-slate-700 max-w-lg mx-auto leading-relaxed pt-2">
                Đã xuất sắc hoàn thành 9 tháng sinh hoạt thực nghiệm, tích cực đóng góp sáng tạo sản phẩm STEM và hoàn thành đầy đủ các thử thách tại Ngày hội Khám phá Hoá học.
              </p>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 text-center text-xs pt-2">
              <div>
                <p className="font-bold text-slate-800 uppercase">HIỆU TRƯỞNG</p>
                <p className="text-[11px] text-slate-400 italic">(Ký, đóng dấu)</p>
                <div className="h-12 flex items-center justify-center">
                  <span className="text-slate-300 italic">[Đã duyệt]</span>
                </div>
              </div>
              <div>
                <p className="font-bold text-slate-800 uppercase">CHỦ NHIỆM CLB</p>
                <p className="text-[11px] text-slate-400 italic">(Ký, ghi rõ họ tên)</p>
                <div className="h-12 flex items-end justify-center">
                  <p className="font-bold text-emerald-900">Huỳnh Thị Thùy Dương</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
              <button
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Đóng
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-800"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>In Chứng Nhận</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
