import React, { useState } from "react";
import { ROADMAP_DATA } from "../data/curriculumData";
import { MonthRoadmap } from "../types";
import { 
  Calendar, 
  FlaskConical, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  BookOpen, 
  Package, 
  ChevronRight,
  Filter,
  GraduationCap,
  Award,
  Atom,
  Zap,
  Scale,
  MapPin,
  School,
  Flame,
  ArrowRight,
  Lightbulb
} from "lucide-react";
import { NavTab } from "./Navbar";
import { TeacherAvatar } from "./TeacherAvatar";

interface RoadmapTimelineProps {
  onSelectSimulation: (simType: string) => void;
  onAskAIAboutTopic: (topic: string) => void;
  setActiveTab: (tab: NavTab) => void;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({
  onSelectSimulation,
  onAskAIAboutTopic,
  setActiveTab,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [activeMonthId, setActiveMonthId] = useState<string>("month-9");

  const filteredRoadmap = ROADMAP_DATA.filter((item) => {
    if (selectedGrade === "all") return true;
    if (selectedGrade === "7") return item.gradeBadge === "Lớp 7" || item.gradeBadge === "Chung";
    if (selectedGrade === "8") return item.gradeBadge === "Lớp 8" || item.gradeBadge === "Chung";
    if (selectedGrade === "9") return item.gradeBadge === "Lớp 9" || item.gradeBadge === "Chung";
    return true;
  });

  const activeMonth = ROADMAP_DATA.find((m) => m.id === activeMonthId) || ROADMAP_DATA[0];

  const quickSimulations = [
    {
      id: "volcano",
      title: "Núi Lửa Sủi Bọt CO₂",
      grade: "Khối 7 – 8",
      color: "from-orange-500 to-amber-600",
      bgLight: "bg-orange-50 text-orange-950 border-orange-200",
      icon: Flame,
      desc: "Phản ứng giấm ăn & baking soda sinh bọt khí CO2 mát lạnh thu nhiệt",
    },
    {
      id: "ph_scale",
      title: "Thước Đo pH Bắp Cải Tím",
      grade: "Khối 8 (Axit - Bazơ)",
      color: "from-fuchsia-600 to-purple-600",
      bgLight: "bg-purple-50 text-purple-950 border-purple-200",
      icon: FlaskConical,
      desc: "Dải sắc ký Anthocyanin tự nhiên kiểm tra 9 dung dịch gia đình",
    },
    {
      id: "lemon_battery",
      title: "Pin Chanh Thắp Sáng LED",
      grade: "Khối 9 (Kim Loại)",
      color: "from-amber-500 to-yellow-600",
      bgLight: "bg-yellow-50 text-yellow-950 border-yellow-200",
      icon: Zap,
      desc: "Cặp cực Zn - Cu phát điện 3.6V làm sáng đèn LED đỏ rực rỡ",
    },
    {
      id: "atom_model",
      title: "Cấu Tạo Nguyên Tử 3D",
      grade: "Khối 7 (KNTT)",
      color: "from-teal-600 to-cyan-600",
      bgLight: "bg-teal-50 text-teal-950 border-teal-200",
      icon: Atom,
      desc: "Quỹ đạo electron Rutherford - Bohr với lớp K, L, M sống động",
    },
    {
      id: "equation_balancer",
      title: "Bảo Toàn Khối Lượng",
      grade: "Khối 8 (Phản Ứng)",
      color: "from-emerald-600 to-teal-700",
      bgLight: "bg-emerald-50 text-emerald-950 border-emerald-200",
      icon: Scale,
      desc: "Cân bằng phản ứng tự động & minh họa số lượng nguyên tử 2 vế",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* World-Class Hero Exploration Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-900 via-teal-900 to-cyan-950 text-white shadow-xl border border-emerald-500/30">
        {/* Decorative background visual */}
        <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1400&q=80"
            alt="Chemistry Lab Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Ambient glowing orbs */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left Hero Content */}
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              {/* Institution Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold text-amber-300">
                <School className="w-3.5 h-3.5" />
                <span>Trường THCS Lý Tự Trọng • Phường Long Hoa, Tây Ninh</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white">
                Câu Lạc Bộ Hoá Học <span className="text-amber-300">"Hạt Mầm Khoa Học"</span>
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                Hành trình 9 tháng trải nghiệm thực nghiệm đa giác quan dành riêng cho học sinh <strong>Khối 7, 8, 9</strong> theo bộ sách <em>Kết nối tri thức với cuộc sống</em>. Tự tay làm thí nghiệm, sáng tạo sản phẩm sinh học và khám phá vẻ đẹp khoa học quanh đời sống Tây Ninh.
              </p>

              {/* Quick stats ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-center">
                  <span className="block text-lg font-black text-amber-300">09</span>
                  <span className="text-[11px] text-emerald-100 font-medium">Tháng Khám Phá</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-center">
                  <span className="block text-lg font-black text-cyan-300">05</span>
                  <span className="text-[11px] text-emerald-100 font-medium">Mô Phỏng Phòng Lab</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-center">
                  <span className="block text-lg font-black text-emerald-300">100%</span>
                  <span className="text-[11px] text-emerald-100 font-medium">Thực Nghiệm An Toàn</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-center">
                  <span className="block text-lg font-black text-rose-300">04</span>
                  <span className="text-[11px] text-emerald-100 font-medium">Đề Tài KHKT ViSEF</span>
                </div>
              </div>
            </div>

            {/* Right: Teacher Brand Spotlight Card */}
            <div className="w-full lg:w-80 shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-white space-y-3.5 shadow-lg">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <TeacherAvatar size="md" bordered={true} allowEdit={true} />
                  <div className="absolute -bottom-1 -right-1 bg-amber-400 text-emerald-950 p-1 rounded-full shadow-xs pointer-events-none">
                    <Award className="w-3 h-3" />
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-md">
                    Người sáng lập & Chủ nhiệm
                  </span>
                  <h3 className="font-extrabold text-base text-white">
                    Cô Huỳnh Thị Thuỳ Dương
                  </h3>
                  <p className="text-xs text-emerald-200">
                    Giáo viên Hoá học • THCS Lý Tự Trọng
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/20 text-xs text-slate-200 italic leading-relaxed">
                “Mỗi buổi sinh hoạt là một cánh cửa mở ra thế giới vi mô kỳ thú, giúp các em tự tin yêu thích bộ môn Khoa học Tự nhiên!”
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setActiveTab("teacher")}
                  className="flex-1 py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-950" />
                  <span>Hồ Sơ Cô Dương</span>
                </button>

                <button
                  onClick={() => setActiveTab("ai_assistant")}
                  className="py-2 px-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs border border-white/20 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  title="Hỏi Trợ lý AI của Cô Dương"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Hỏi AI</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Interactive Quick Discovery Lab Launcher */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Phòng Thực Hành Ảo Tương Tác (STEM Simulator)
              </h2>
              <p className="text-xs text-slate-500">
                Trực tiếp thao tác và quan sát hiện tượng đổi màu, thoát khí, sinh điện ngay trên màn hình
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab("virtual_lab")}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
          >
            <span>Xem cả 5 mô phỏng</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5 Quick Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {quickSimulations.map((sim) => {
            const Icon = sim.icon;
            return (
              <div
                key={sim.id}
                onClick={() => {
                  onSelectSimulation(sim.id);
                  setActiveTab("virtual_lab");
                }}
                className="group cursor-pointer rounded-2xl p-4 bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between space-y-3 relative overflow-hidden"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-xl bg-linear-to-br ${sim.color} text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {sim.grade}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {sim.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {sim.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Trải nghiệm ngay</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Roadmap Section with Filter & Details */}
      <div className="space-y-4">
        {/* Section Header with Grade Filter */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
              <Calendar className="w-3.5 h-3.5" />
              Lộ trình 9 tháng sinh hoạt năm học 2026 – 2027
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Chi Tiết Chuyên Đề Thực Nghiệm Hàng Tháng
            </h2>
          </div>

          {/* Grade filter pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            {[
              { id: "all", label: "Tất cả (9 Tháng)" },
              { id: "7", label: "Khối 7" },
              { id: "8", label: "Khối 8" },
              { id: "9", label: "Khối 9" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedGrade(btn.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedGrade === btn.id
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Roadmap Grid: Month Sidebar + Active Focus Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Month Selector List (Desktop 4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1 flex items-center justify-between">
              <span>Danh Sách 9 Chuyên Đề</span>
              <span className="text-emerald-700 font-semibold">{filteredRoadmap.length} Chủ đề</span>
            </h3>

            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {filteredRoadmap.map((item) => {
                const isSelected = item.id === activeMonthId;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveMonthId(item.id)}
                    className={`cursor-pointer p-3.5 rounded-xl border transition-all text-left ${
                      isSelected
                        ? "bg-linear-to-r from-emerald-50 to-teal-50 border-emerald-500 shadow-xs ring-1 ring-emerald-500/20"
                        : "bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {item.monthLabel}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                        {item.gradeBadge}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                      {item.theme}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {item.experimentPreview}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Month Focus (Right 8 cols) */}
          <div className="lg:col-span-8">
            <MonthDetailCard
              month={activeMonth}
              onSelectSimulation={onSelectSimulation}
              onAskAIAboutTopic={onAskAIAboutTopic}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>
      </div>

      {/* Banner: Local Tay Ninh Agricultural Innovation */}
      <div className="rounded-3xl bg-linear-to-r from-teal-800 via-emerald-800 to-amber-900 text-white p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-emerald-950 text-xs font-bold uppercase">
              <MapPin className="w-3.5 h-3.5" />
              Sáng Tạo Hoá Học Gắn Liền Quê Hương Tây Ninh
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Khám Phá Tài Nguyên Bản Địa Cùng Cô Thuỳ Dương
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Tận dụng tinh bột sắn (củ mì) Tây Ninh làm màng bọc sinh học tự huỷ, chưng cất tinh dầu từ vỏ bưởi da xanh, kiểm tra độ chua đất trồng mãng cầu Bà Đen và ủ phân compost trường học.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab("khkt")}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4 text-emerald-950" />
              <span>Xem 4 Đề Tài KHKT Tây Ninh</span>
            </button>
            <button
              onClick={() => setActiveTab("fair")}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs border border-white/25 transition-all flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Ngày Hội Tháng 5</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MonthDetailCardProps {
  month: MonthRoadmap;
  onSelectSimulation: (simType: string) => void;
  onAskAIAboutTopic: (topic: string) => void;
  setActiveTab: (tab: NavTab) => void;
}

const MonthDetailCard: React.FC<MonthDetailCardProps> = ({
  month,
  onSelectSimulation,
  onAskAIAboutTopic,
  setActiveTab,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
              {month.monthLabel}
            </span>
            <span className="text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-md">
              {month.gradeAlignment}
            </span>
          </div>
          <h3 className="text-lg sm:text-2xl font-black text-slate-900">
            {month.theme}
          </h3>
          <p className="text-xs text-slate-500 italic mt-1">
            "{month.quote}"
          </p>
        </div>

        {/* Quick Simulation CTA */}
        <div className="flex items-center gap-2 shrink-0">
          {month.simulationType && (
            <button
              onClick={() => {
                onSelectSimulation(month.simulationType!);
                setActiveTab("virtual_lab");
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer"
            >
              <FlaskConical className="w-4 h-4 text-amber-300" />
              <span>Thực Hành Ảo</span>
            </button>
          )}

          <button
            onClick={() => {
              onAskAIAboutTopic(`${month.theme} (${month.gradeAlignment})`);
              setActiveTab("ai_assistant");
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Hỏi Trợ Lý AI</span>
          </button>
        </div>
      </div>

      {/* Main Activities Section */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase text-slate-600 tracking-wider flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          Hoạt Động Trọng Tâm Của Buổi Sinh Hoạt
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {month.mainActivities.map((act, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium">{act}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Expected Product & Key Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 space-y-2">
          <h4 className="text-xs font-bold uppercase text-emerald-900 tracking-wider flex items-center gap-1.5">
            <Package className="w-4 h-4 text-emerald-700" />
            Sản Phẩm Cầm Tay Mang Về
          </h4>
          <p className="text-xs text-slate-800 font-semibold leading-relaxed">
            {month.expectedProducts}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/70 space-y-2">
          <h4 className="text-xs font-bold uppercase text-teal-900 tracking-wider flex items-center gap-1.5">
            <FlaskConical className="w-4 h-4 text-teal-700" />
            Khái Niệm Cốt Lõi SGK KNTT
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {month.keyConcepts.map((kc, i) => (
              <span
                key={i}
                className="text-[11px] font-bold bg-white text-teal-900 px-2.5 py-1 rounded-lg border border-teal-200 shadow-2xs"
              >
                {kc}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Notice Standard */}
      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Quy Chuẩn An Toàn Phòng Lab CLB: </span>
          <span className="text-amber-800">{month.safetyTips}</span>
        </div>
      </div>
    </div>
  );
};
