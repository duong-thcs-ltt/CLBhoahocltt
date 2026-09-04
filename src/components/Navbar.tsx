import React from "react";
import { 
  FlaskConical, 
  CalendarDays, 
  Sparkles, 
  BookOpenCheck, 
  Atom, 
  FileText, 
  HelpCircle, 
  Lightbulb, 
  Trophy,
  GraduationCap,
  Flame
} from "lucide-react";
import { TeacherAvatar } from "./TeacherAvatar";

export type NavTab = 
  | "cover"
  | "roadmap" 
  | "virtual_lab" 
  | "ai_assistant" 
  | "teacher"
  | "journal" 
  | "quiz" 
  | "khkt" 
  | "fair"
  | "plan";

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onQuickSimJump?: (simType: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: "cover", label: "CLB Hoá Học", icon: Flame, badge: "Đam Mê" },
    { id: "roadmap", label: "Lộ Trình 9 Tháng", icon: CalendarDays, badge: "9 Tháng" },
    { id: "virtual_lab", label: "Phòng Thực Hành Ảo", icon: FlaskConical, badge: "5 Mô Phỏng" },
    { id: "ai_assistant", label: "Trợ Lý AI Cô Dương", icon: Sparkles, badge: "Gemini" },
    { id: "teacher", label: "Cô Thuỳ Dương", icon: GraduationCap, badge: "Chủ Nhiệm" },
    { id: "journal", label: "Nhật Ký Nhà Khoa Học", icon: BookOpenCheck },
    { id: "quiz", label: "Đố Vui Khám Phá", icon: HelpCircle, badge: "Đấu Trường" },
    { id: "khkt", label: "Ươm Mầm KHKT & Olympic", icon: Lightbulb, badge: "Tây Ninh" },
    { id: "fair", label: "Ngày Hội Tháng 5", icon: Trophy, badge: "STEM Fair" },
    { id: "plan", label: "Kế Hoạch Năm", icon: FileText, badge: "Văn Bản" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-emerald-100 shadow-xs">
      {/* Top Banner with School Identity */}
      <div className="bg-linear-to-r from-emerald-900 via-teal-900 to-cyan-950 text-white px-4 py-2 sm:py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-black shadow-xs shrink-0">
              <Atom className="w-3.5 h-3.5 text-emerald-950 animate-spin" style={{ animationDuration: "12s" }} />
            </div>
            <div className="flex items-center flex-wrap gap-1.5">
              <span className="font-bold tracking-wide uppercase text-amber-300">Tổ Khoa Học Tự Nhiên</span>
              <span className="opacity-40">•</span>
              <span className="font-medium text-emerald-100">Trường THCS Lý Tự Trọng</span>
              <span className="opacity-40">•</span>
              <span className="text-emerald-200">Phường Long Hoa, Tỉnh Tây Ninh</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("teacher")}
              className="bg-amber-400/90 hover:bg-amber-400 text-emerald-950 font-bold pl-1.5 pr-3 py-0.5 rounded-full flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <TeacherAvatar size="sm" allowEdit={false} bordered={true} className="w-5 h-5" />
              <span>Chủ nhiệm: Cô Huỳnh Thị Thuỳ Dương</span>
            </button>
            <span className="hidden lg:inline-block bg-teal-800/80 px-2 py-0.5 rounded-md text-[11px] text-emerald-200 border border-teal-700/50">
              Năm học 2026 – 2027 (KNTT)
            </span>
          </div>
        </div>
      </div>

      {/* Main Title & Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-4">
          <div 
            onClick={() => setActiveTab("cover")} 
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-emerald-500 via-teal-600 to-cyan-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/25 group-hover:scale-105 transition-transform shrink-0">
              <FlaskConical className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                  CÂU LẠC BỘ HOÁ HỌC
                </h1>
                <span className="hidden sm:inline-block text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  KNTT Khối 7 - 8 - 9
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                THCS Lý Tự Trọng • Phường Long Hoa, Tây Ninh • Chủ nhiệm: <strong className="text-emerald-800 font-semibold">Cô Huỳnh Thị Thuỳ Dương</strong>
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab("teacher")}
              className="inline-flex items-center gap-1.5 text-xs font-bold pl-1.5 pr-3 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors shadow-2xs cursor-pointer"
            >
              <TeacherAvatar size="sm" allowEdit={false} bordered={true} className="w-5 h-5" />
              <span className="hidden sm:inline">Góc Cô Dương</span>
            </button>

            <button
              onClick={() => setActiveTab("virtual_lab")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden md:inline">Phòng Lab</span>
            </button>

            <button
              onClick={() => setActiveTab("ai_assistant")}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-linear-to-r from-teal-600 to-emerald-600 text-white shadow-xs hover:opacity-95 transition-opacity"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Hỏi AI</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Responsive Scrollable) */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1 scrollbar-none border-t border-slate-100 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "text-slate-650 hover:text-emerald-900 hover:bg-emerald-50/70"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-amber-300" : "text-slate-500"}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-150 text-slate-600"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
