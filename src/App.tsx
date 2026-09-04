import React, { useState } from "react";
import { Navbar, NavTab } from "./components/Navbar";
import { ClubCover } from "./components/ClubCover";
import { OfficialPlanView } from "./components/OfficialPlanView";
import { RoadmapTimeline } from "./components/RoadmapTimeline";
import { VirtualLab } from "./components/VirtualLab";
import { AIAssistant } from "./components/AIAssistant";
import { LabJournal } from "./components/LabJournal";
import { KHKTMentor } from "./components/KHKTMentor";
import { ChemistryArena } from "./components/ChemistryArena";
import { FestivalBooth } from "./components/FestivalBooth";
import { TeacherBrandSection } from "./components/TeacherBrandSection";
import { TeacherAvatarProvider } from "./context/TeacherAvatarContext";

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>("cover");
  const [selectedSimulation, setSelectedSimulation] = useState<string>("volcano");
  const [aiInitialTopic, setAiInitialTopic] = useState<string>("");

  const handleSelectSimulation = (simType: string) => {
    setSelectedSimulation(simType);
    setActiveTab("virtual_lab");
  };

  const handleAskAITopic = (topic: string) => {
    setAiInitialTopic(topic);
    setActiveTab("ai_assistant");
  };

  const handleSaveExperimentToJournal = (entryData: any) => {
    try {
      const STORAGE_KEY = "clbhh_lab_journal_entries_2026";
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const newEntry = {
        id: `entry-${Date.now()}`,
        title: entryData.title,
        date: new Date().toISOString().split("T")[0],
        authorName: "Học sinh CLB THCS Lý Tự Trọng",
        grade: "Khối 8 (KNTT)",
        materialsUsed: entryData.materialsUsed || [],
        observedPhenomena: entryData.observedPhenomena || "",
        chemicalExplanation: entryData.chemicalExplanation || "",
        equation: entryData.equation || "",
        safetyScore: 5,
        teacherFeedback: "Thí nghiệm mô phỏng xuất sắc! Đã nắm vững bản chất hoá học.",
        tags: entryData.tags || ["Thực hành ảo", "KNTT"],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...existing]));
      alert("🎉 Đã lưu kết quả thành công vào Sổ tay 'Nhật ký nhà khoa học nhí'!");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <TeacherAvatarProvider>
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
        {/* Navigation Bar */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activeTab === "cover" && (
          <ClubCover
            setActiveTab={setActiveTab}
            onAskAI={handleAskAITopic}
          />
        )}

        {activeTab === "plan" && (
          <OfficialPlanView setActiveTab={setActiveTab} />
        )}

        {activeTab === "roadmap" && (
          <RoadmapTimeline
            onSelectSimulation={handleSelectSimulation}
            onAskAIAboutTopic={handleAskAITopic}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "virtual_lab" && (
          <VirtualLab
            initialSimulation={selectedSimulation}
            onSaveExperimentToJournal={handleSaveExperimentToJournal}
          />
        )}

        {activeTab === "ai_assistant" && (
          <AIAssistant
            initialTopic={aiInitialTopic}
            onSaveToJournal={handleSaveExperimentToJournal}
          />
        )}

        {activeTab === "teacher" && (
          <TeacherBrandSection
            setActiveTab={setActiveTab}
            onAskAI={handleAskAITopic}
          />
        )}

        {activeTab === "journal" && (
          <LabJournal />
        )}

        {activeTab === "khkt" && (
          <KHKTMentor />
        )}

        {activeTab === "quiz" && (
          <ChemistryArena />
        )}

        {activeTab === "fair" && (
          <FestivalBooth />
        )}
      </main>

      {/* Official Institutional Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <p className="font-extrabold text-slate-900 text-sm tracking-wide">
              CÂU LẠC BỘ HOÁ HỌC – TRƯỜNG THCS LÝ TỰ TRỌNG
            </p>
            <p className="text-emerald-800 font-semibold">
              Người phát triển chương trình & Chủ nhiệm: <strong>Cô Huỳnh Thị Thuỳ Dương</strong> (Tổ Khoa học Tự nhiên)
            </p>
            <p className="text-slate-500">
              Địa chỉ: Phường Long Hoa, Tỉnh Tây Ninh • Năm học 2026 – 2027
            </p>
            <p className="text-[11px] text-slate-400 pt-1">
              Chương trình Khoa học Tự nhiên – Bộ sách Kết nối tri thức với cuộc sống (Khối 7, 8, 9)
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <button
              onClick={() => setActiveTab("teacher")}
              className="text-amber-800 font-bold bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 hover:bg-amber-100 transition-colors"
            >
              Góc Cô Thuỳ Dương
            </button>
            <button
              onClick={() => setActiveTab("roadmap")}
              className="text-emerald-700 font-semibold hover:underline"
            >
              Lộ trình 9 tháng
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setActiveTab("virtual_lab")}
              className="text-emerald-700 font-semibold hover:underline"
            >
              Phòng thực hành ảo
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setActiveTab("plan")}
              className="text-emerald-700 font-semibold hover:underline"
            >
              Văn bản KH-CLBHH
            </button>
          </div>
        </div>
      </footer>
    </div>
    </TeacherAvatarProvider>
  );
}
