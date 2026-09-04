import React, { useState, useEffect } from "react";
import { 
  FlaskConical, 
  Atom, 
  Zap, 
  RotateCcw, 
  Play, 
  Sparkles, 
  Sliders, 
  CheckCircle, 
  AlertCircle,
  Thermometer,
  Gauge,
  Flame,
  Info
} from "lucide-react";

interface VirtualLabProps {
  initialSimulation?: string;
  onSaveExperimentToJournal?: (experimentData: any) => void;
}

export const VirtualLab: React.FC<VirtualLabProps> = ({ 
  initialSimulation = "volcano",
  onSaveExperimentToJournal 
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialSimulation);

  useEffect(() => {
    if (initialSimulation) {
      setActiveTab(initialSimulation);
    }
  }, [initialSimulation]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
            <FlaskConical className="w-3.5 h-3.5" />
            Phòng Thực Hành Ảo STEM
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Phòng Thí Nghiệm Hoá Học Tương Tác
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Mô phỏng chân thực các hiện tượng hoá học trong SGK Kết nối tri thức (Lớp 7, 8, 9)
          </p>
        </div>

        {/* Experiment Switcher */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
          {[
            { id: "volcano", label: "Núi Lửa CO2", grade: "Lớp 8/Tháng 9" },
            { id: "ph", label: "Thước Đo pH Bắp Cải Tím", grade: "Lớp 8/Tháng 12" },
            { id: "atom", label: "Mô Hình Nguyên Tử Bohr", grade: "Lớp 7/Tháng 10" },
            { id: "lemon_battery", label: "Pin Chanh LED", grade: "Lớp 9/Tháng 1" },
            { id: "reaction", label: "Cân Bằng Phương Trình", grade: "Lớp 8/Tháng 11" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-650 hover:text-emerald-900 hover:bg-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Lab Canvas Area */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-7 shadow-xs">
        {activeTab === "volcano" && <VolcanoSimulation onSave={onSaveExperimentToJournal} />}
        {activeTab === "ph" && <PHIndicatorSimulation onSave={onSaveExperimentToJournal} />}
        {activeTab === "atom" && <BohrAtomSimulation onSave={onSaveExperimentToJournal} />}
        {activeTab === "lemon_battery" && <LemonBatterySimulation onSave={onSaveExperimentToJournal} />}
        {activeTab === "reaction" && <ReactionBalancerSimulation onSave={onSaveExperimentToJournal} />}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 1. NÚI LỬA GIẤM & BAKING SODA SIMULATION                                    */
/* -------------------------------------------------------------------------- */
const VolcanoSimulation: React.FC<{ onSave?: (data: any) => void }> = ({ onSave }) => {
  const [bakingSoda, setBakingSoda] = useState<number>(20); // grams
  const [vinegar, setVinegar] = useState<number>(60); // ml
  const [hasDishSoap, setHasDishSoap] = useState<boolean>(true);
  const [isReacting, setIsReacting] = useState<boolean>(false);
  const [foamLevel, setFoamLevel] = useState<number>(0);
  const [co2Produced, setCo2Produced] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(25.0);

  const handleStartReaction = () => {
    setIsReacting(true);
    setFoamLevel(0);
    // Calculated gas volume from molar stoichiometry
    const molesSoda = bakingSoda / 84.0;
    const molesVinegar = (vinegar * 0.05 * 1.05) / 60.05; // 5% acetic acid
    const limitingMoles = Math.min(molesSoda, molesVinegar);
    const gasVolumeLiters = limitingMoles * 24.79; // at 25C room temp in Vietnam
    setCo2Produced(Number(gasVolumeLiters.toFixed(2)));

    // Animation frames
    let currentFoam = 0;
    const maxFoam = Math.min(100, (bakingSoda * 2 + vinegar * 0.8) * (hasDishSoap ? 1.4 : 0.8));
    const interval = setInterval(() => {
      currentFoam += 4;
      if (currentFoam >= maxFoam) {
        clearInterval(interval);
        setFoamLevel(maxFoam);
        // Endothermic drop
        setTemperature(Number((25.0 - (bakingSoda * 0.08)).toFixed(1)));
        setTimeout(() => setIsReacting(false), 2000);
      } else {
        setFoamLevel(currentFoam);
      }
    }, 50);
  };

  const handleReset = () => {
    setIsReacting(false);
    setFoamLevel(0);
    setCo2Produced(0);
    setTemperature(25.0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-3 border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Thí Nghiệm Núi Lửa Sủi Bọt: Giấm Ăn (CH₃COOH) + Baking Soda (NaHCO₃)
          </h3>
          <p className="text-xs text-slate-500">
            Khám phá dấu hiệu nhận biết phản ứng hoá học và định luật bảo toàn khối lượng (SGK KNTT Lớp 8)
          </p>
        </div>
        <button
          onClick={handleReset}
          className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs flex items-center gap-1 font-semibold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Đặt lại</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Visual Volcano Stage (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[360px] border border-slate-800">
          {/* Sky & Atmosphere */}
          <div className="absolute top-3 left-4 text-xs text-slate-400 font-mono flex items-center gap-3 z-10">
            <span className="flex items-center gap-1 text-cyan-300">
              <Thermometer className="w-3.5 h-3.5" /> {temperature}°C (Thu nhiệt nhẹ)
            </span>
            <span className="flex items-center gap-1 text-amber-300">
              <Gauge className="w-3.5 h-3.5" /> CO₂: {co2Produced} L
            </span>
          </div>

          {/* SVG Volcano & Eruption Foam */}
          <div className="relative w-72 h-64 flex items-end justify-center">
            {/* Volcano Mountain body */}
            <svg viewBox="0 0 200 150" className="w-full h-full drop-shadow-xl">
              {/* Mountain */}
              <polygon points="10,150 75,40 125,40 190,150" fill="#451a03" stroke="#290e03" strokeWidth="2" />
              {/* Rock strata */}
              <polygon points="30,150 82,50 118,50 170,150" fill="#582305" opacity="0.6" />
              {/* Crater opening */}
              <ellipse cx="100" cy="40" rx="25" ry="8" fill="#1c0701" />
            </svg>

            {/* Overflowing Lava / Foam */}
            {foamLevel > 0 && (
              <div 
                className="absolute bottom-24 w-32 rounded-3xl bg-linear-to-t from-red-600 via-orange-500 to-amber-300 opacity-95 transition-all duration-300 flex flex-col items-center justify-center shadow-lg shadow-orange-500/50 animate-pulse"
                style={{ height: `${foamLevel * 1.8}px` }}
              >
                <div className="text-[10px] font-black text-white uppercase tracking-wider text-center drop-shadow-md">
                  CO₂ + H₂O
                </div>
                {/* Bubble particles */}
                <div className="flex gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-white/80 animate-ping" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-200/90" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                </div>
              </div>
            )}
          </div>

          {/* Equation Ribbon */}
          <div className="mt-4 bg-slate-800/90 border border-slate-700 px-4 py-2 rounded-xl text-center z-10">
            <span className="text-xs font-mono text-emerald-300 font-bold">
              CH₃COOH (giấm) + NaHCO₃ (baking soda) → CH₃COONa + H₂O + CO₂↑
            </span>
          </div>
        </div>

        {/* Controls & Parameters (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-emerald-600" />
              Thông Số Nguyên Liệu
            </h4>

            {/* Baking Soda Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Baking Soda (NaHCO₃):</span>
                <span className="text-emerald-700 font-bold">{bakingSoda} gam</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={bakingSoda}
                disabled={isReacting}
                onChange={(e) => setBakingSoda(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Vinegar Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Giấm ăn 5% (CH₃COOH):</span>
                <span className="text-emerald-700 font-bold">{vinegar} ml</span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                step="10"
                value={vinegar}
                disabled={isReacting}
                onChange={(e) => setVinegar(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Dish Soap toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
              <label htmlFor="dishsoap" className="font-semibold text-slate-700 cursor-pointer">
                Thêm vài giọt nước rửa chén (tạo bọt dày):
              </label>
              <input
                id="dishsoap"
                type="checkbox"
                checked={hasDishSoap}
                disabled={isReacting}
                onChange={(e) => setHasDishSoap(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 cursor-pointer rounded"
              />
            </div>

            {/* Trigger Button */}
            <button
              onClick={handleStartReaction}
              disabled={isReacting}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs ${
                isReacting
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                  : "bg-linear-to-r from-emerald-600 to-teal-700 text-white hover:opacity-95"
              }`}
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isReacting ? "Đang phản ứng sinh bọt khí..." : "Đổ Giấm Vào Núi Lửa (Kích Hoạt)"}</span>
            </button>
          </div>

          {/* Observations & Learning Points */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1.5 text-emerald-950">
            <p className="font-bold flex items-center gap-1.5 text-emerald-900">
              <Info className="w-4 h-4 text-emerald-700" />
              Hiện tượng quan sát:
            </p>
            <p>
              Hỗn hợp sôi sủi cuồn cuộn do giải phóng hàng triệu bọt khí CO₂. Phản ứng thu nhiệt nhẹ nên nhiệt độ giảm khoảng 1.5°C đến 2.5°C.
            </p>
            {onSave && (
              <button
                onClick={() => onSave({
                  title: "Thí nghiệm núi lửa CO2 sủi bọt",
                  materialsUsed: [`Baking soda: ${bakingSoda}g`, `Giấm ăn: ${vinegar}ml`, hasDishSoap ? "Nước rửa chén" : "Không xà phòng"],
                  observedPhenomena: `Sinh ra khoảng ${co2Produced}L khí CO2 sủi bọt mãnh liệt. Nhiệt độ hạ còn ${temperature}°C.`,
                  chemicalExplanation: "CH3COOH + NaHCO3 -> CH3COONa + H2O + CO2↑ (Phản ứng trao đổi tạo axit yếu H2CO3 phân huỷ thành H2O và CO2)",
                  equation: "CH3COOH + NaHCO3 → CH3COONa + H2O + CO2↑",
                  tags: ["Tháng 9", "Khí CO2", "Núi lửa"]
                })}
                className="mt-2 text-[11px] font-bold text-emerald-800 underline decoration-1 hover:text-emerald-950"
              >
                + Lưu kết quả vào Sổ tay thí nghiệm nhí
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. THƯỚC ĐO pH & BẮP CẢI TÍM (ANTHOCYANIN) SIMULATION                     */
/* -------------------------------------------------------------------------- */
interface SolutionItem {
  id: string;
  name: string;
  category: "axit" | "trung_tinh" | "bazo";
  pH: number;
  colorName: string;
  hexColor: string;
  notes: string;
  realWorld: string;
}

const SOLUTIONS: SolutionItem[] = [
  { id: "lemon", name: "Nước cốt chanh", category: "axit", pH: 2.0, colorName: "Đỏ hồng cánh sen", hexColor: "#e11d48", notes: "Chứa nhiều Axit citric C₆H₈O₇", realWorld: "Làm gia vị chua, kích thích tiêu hoá" },
  { id: "vinegar", name: "Giấm ăn", category: "axit", pH: 2.8, colorName: "Đỏ tím", hexColor: "#c026d3", notes: "Axit axetic CH₃COOH nồng độ 5%", realWorld: "Ngâm dưa, tẩy rửa cặn ấm đun" },
  { id: "orange", name: "Nước cam tươi", category: "axit", pH: 3.8, colorName: "Tím hồng", hexColor: "#a855f7", notes: "Axit citric & Vitamin C (axit ascorbic)", realWorld: "Bổ sung đề kháng cho cơ thể" },
  { id: "coffee", name: "Cà phê đen", category: "axit", pH: 5.0, colorName: "Tím sẫm", hexColor: "#7e22ce", notes: "Axit chlorogenic yếu", realWorld: "Thức uống kích thích tỉnh táo" },
  { id: "pure_water", name: "Nước cất tinh khiết", category: "trung_tinh", pH: 7.0, colorName: "Tím nguyên bản", hexColor: "#6366f1", notes: "Nồng độ H⁺ = OH⁻ = 10⁻⁷ M", realWorld: "Dung môi cho mọi sự sống" },
  { id: "saline", name: "Nước muối sinh lý 0.9%", category: "trung_tinh", pH: 7.2, colorName: "Tím lam nhạt", hexColor: "#4f46e5", notes: "Dung dịch NaCl đẳng trương", realWorld: "Rửa mắt, súc họng sát khuẩn" },
  { id: "baking_soda", name: "Dung dịch Baking Soda", category: "bazo", pH: 8.5, colorName: "Xanh lam biển", hexColor: "#0284c7", notes: "Muối NaHCO₃ tạo môi trường kiềm nhẹ", realWorld: "Làm bánh xốp, khử mùi tủ lạnh" },
  { id: "soap", name: "Nước xà phòng tắm", category: "bazo", pH: 10.0, colorName: "Xanh lục biếc", hexColor: "#059669", notes: "Muối natri của axit béo", realWorld: "Hoà tan chất béo và vi khuẩn" },
  { id: "lime_water", name: "Nước vôi trong Ca(OH)₂", category: "bazo", pH: 12.0, colorName: "Xanh lá ngả vàng", hexColor: "#84cc16", notes: "Canxi hiđroxit hoà tan", realWorld: "Làm mứt dừa giòn, khử chua đất phèn Tây Ninh" },
];

const PHIndicatorSimulation: React.FC<{ onSave?: (data: any) => void }> = ({ onSave }) => {
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem>(SOLUTIONS[0]);
  const [hasAddedIndicator, setHasAddedIndicator] = useState<boolean>(false);
  const [isDropping, setIsDropping] = useState<boolean>(false);

  const handleAddIndicator = () => {
    setIsDropping(true);
    setTimeout(() => {
      setHasAddedIndicator(true);
      setIsDropping(false);
    }, 600);
  };

  const handleSelect = (sol: SolutionItem) => {
    setSelectedSolution(sol);
    setHasAddedIndicator(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-3 border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Thước Đo pH & Chỉ Thị Màu Tự Nhiên Bắp Cải Tím (Anthocyanin)
          </h3>
          <p className="text-xs text-slate-500">
            Bám sát SGK KNTT Lớp 8 (Bài Axit – Bazơ & Thang đo pH) và Chủ đề Tháng 12: Hoá học trong gian bếp
          </p>
        </div>
        <button
          onClick={() => setHasAddedIndicator(false)}
          className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs flex items-center gap-1 font-semibold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Thử lại</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Test Tube Visualization (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-6 relative flex flex-col items-center justify-center min-h-[360px] border border-slate-800">
          <div className="text-center mb-4">
            <span className="text-xs font-mono text-emerald-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              Đang thử: {selectedSolution.name}
            </span>
          </div>

          {/* Test Tube Graphic */}
          <div className="relative w-28 h-64 flex flex-col items-center">
            {/* Pipette animation */}
            <div className={`transition-all duration-500 mb-2 ${isDropping ? "translate-y-2 opacity-100" : "opacity-70"}`}>
              <div className="w-4 h-12 bg-linear-to-b from-slate-300 to-slate-100 rounded-t-sm border border-slate-400 flex flex-col items-center">
                <span className="w-2.5 h-6 bg-purple-700 rounded-t-xs" />
                <span className="w-1 h-3 bg-purple-800" />
              </div>
              {isDropping && (
                <div className="w-2 h-2 rounded-full bg-purple-700 animate-bounce mx-auto mt-1" />
              )}
            </div>

            {/* Glass Tube Container */}
            <div className="w-20 h-44 rounded-b-3xl border-4 border-t-0 border-white/40 bg-white/5 backdrop-blur-xs relative overflow-hidden flex flex-col justify-end p-1 shadow-inner">
              {/* Liquid */}
              <div
                className="w-full rounded-b-2xl transition-all duration-700 shadow-md"
                style={{
                  height: "75%",
                  backgroundColor: hasAddedIndicator ? selectedSolution.hexColor : "#e2e8f0",
                  opacity: 0.9,
                }}
              >
                {/* Surface gloss */}
                <div className="w-full h-2 bg-white/30 rounded-t-full" />
              </div>

              {/* Measurement lines on test tube */}
              <div className="absolute top-4 left-1 w-2 h-0.5 bg-white/30" />
              <div className="absolute top-10 left-1 w-3 h-0.5 bg-white/40" />
              <div className="absolute top-16 left-1 w-2 h-0.5 bg-white/30" />
              <div className="absolute top-22 left-1 w-3 h-0.5 bg-white/40" />
            </div>
          </div>

          {/* pH Indicator Result Badge */}
          <div className="mt-5 text-center">
            {hasAddedIndicator ? (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedSolution.hexColor }} />
                <span className="text-white font-bold">pH ≈ {selectedSolution.pH}</span>
                <span className="text-slate-300">({selectedSolution.colorName})</span>
              </div>
            ) : (
              <button
                onClick={handleAddIndicator}
                disabled={isDropping}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-md"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Nhỏ Dịch Bắp Cải Tím Vào Ống Nghiệm</span>
              </button>
            )}
          </div>
        </div>

        {/* Solution Selector & pH Color Spectrum (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider mb-2">
              Chọn Dung Dịch Trong Gian Bếp / Đời Sống:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SOLUTIONS.map((sol) => (
                <button
                  key={sol.id}
                  onClick={() => handleSelect(sol)}
                  className={`p-2 rounded-xl text-left border transition-all text-xs ${
                    selectedSolution.id === sol.id
                      ? "bg-emerald-50 border-emerald-500 shadow-xs ring-1 ring-emerald-500"
                      : "bg-white border-slate-200 hover:border-emerald-300"
                  }`}
                >
                  <p className="font-bold text-slate-900 truncate">{sol.name}</p>
                  <p className="text-[10px] text-slate-500">pH {sol.pH}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Chemical Mechanism Details */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-700">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Môi trường:</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                selectedSolution.category === "axit" ? "bg-rose-100 text-rose-800" :
                selectedSolution.category === "bazo" ? "bg-cyan-100 text-cyan-800" :
                "bg-emerald-100 text-emerald-800"
              }`}>
                {selectedSolution.category === "axit" ? "AXIT (pH < 7)" :
                 selectedSolution.category === "bazo" ? "BAZƠ / KIỀM (pH > 7)" : "TRUNG TÍNH (pH = 7)"}
              </span>
            </div>
            <p><strong>Thành phần:</strong> {selectedSolution.notes}</p>
            <p><strong>Ứng dụng đời sống:</strong> {selectedSolution.realWorld}</p>

            {onSave && (
              <button
                onClick={() => onSave({
                  title: `Đo pH dung dịch ${selectedSolution.name}`,
                  materialsUsed: [selectedSolution.name, "Dịch chiết bắp cải tím (Anthocyanin)", "Ống nghiệm"],
                  observedPhenomena: `Dung dịch chuyển sang màu ${selectedSolution.colorName} tương ứng với độ pH ≈ ${selectedSolution.pH}.`,
                  chemicalExplanation: `Sắc tố Anthocyanin chuyển cấu trúc quang học trong môi trường ${selectedSolution.category.toUpperCase()}.`,
                  tags: ["Tháng 12", "Thang đo pH", "Bắp cải tím"]
                })}
                className="pt-2 block text-[11px] font-bold text-emerald-800 underline hover:text-emerald-950"
              >
                + Lưu kết quả vào Sổ tay thí nghiệm nhí
              </button>
            )}
          </div>

          {/* Full pH Color Spectrum Bar */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-600">Thang màu sắc Anthocyanin chuẩn:</span>
            <div className="h-4 rounded-full w-full flex overflow-hidden shadow-xs">
              <span className="flex-1 bg-[#e11d48]" title="pH 1-2: Đỏ hồng" />
              <span className="flex-1 bg-[#c026d3]" title="pH 3-4: Đỏ tím" />
              <span className="flex-1 bg-[#a855f7]" title="pH 5: Tím hồng" />
              <span className="flex-1 bg-[#6366f1]" title="pH 7: Tím lam" />
              <span className="flex-1 bg-[#0284c7]" title="pH 8-9: Xanh lam" />
              <span className="flex-1 bg-[#059669]" title="pH 10-11: Xanh lục" />
              <span className="flex-1 bg-[#84cc16]" title="pH 12-14: Vàng chanh" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>pH 2 (Axit mạnh)</span>
              <span>pH 7 (Trung tính)</span>
              <span>pH 12 (Bazơ mạnh)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. MÔ HÌNH NGUYÊN TỬ BOHR (LỚP 7 KNTT) SIMULATION                         */
/* -------------------------------------------------------------------------- */
interface ElementItem {
  symbol: string;
  name: string;
  vietnameseName: string;
  Z: number; // Protons = Electrons
  neutrons: number;
  shells: number[]; // e.g. Carbon: [2, 4]
  group: string;
  period: number;
  funFact: string;
}

const ELEMENTS: ElementItem[] = [
  { symbol: "H", name: "Hydrogen", vietnameseName: "Hiđro", Z: 1, neutrons: 0, shells: [1], group: "IA", period: 1, funFact: "Nguyên tố nhẹ nhất và dồi dào nhất trong vũ trụ!" },
  { symbol: "He", name: "Helium", vietnameseName: "Heli", Z: 2, neutrons: 2, shells: [2], group: "VIIIA", period: 1, funFact: "Khí trơ dùng để bơm bóng bay lơ lửng an toàn." },
  { symbol: "C", name: "Carbon", vietnameseName: "Cacbon", Z: 6, neutrons: 6, shells: [2, 4], group: "IVA", period: 2, funFact: "Cấu tạo nên kim cương quý giá và than chì trong bút chì của em." },
  { symbol: "N", name: "Nitrogen", vietnameseName: "Nitơ", Z: 7, neutrons: 7, shells: [2, 5], group: "VA", period: 2, funFact: "Chiếm tới 78% thể tích không khí Trái Đất." },
  { symbol: "O", name: "Oxygen", vietnameseName: "Oxi", Z: 8, neutrons: 8, shells: [2, 6], group: "VIA", period: 2, funFact: "Nuôi dưỡng sự hô hấp của muôn loài sinh vật." },
  { symbol: "Na", name: "Sodium", vietnameseName: "Natri", Z: 11, neutrons: 12, shells: [2, 8, 1], group: "IA", period: 3, funFact: "Kim loại kiềm mềm cắt được bằng dao, thành phần của muối ăn NaCl." },
  { symbol: "Mg", name: "Magnesium", vietnameseName: "Magie", Z: 12, neutrons: 12, shells: [2, 8, 2], group: "IIA", period: 3, funFact: "Khi cháy phát ra ánh sáng trắng chói lòa trong pháo hoa." },
  { symbol: "Al", name: "Aluminium", vietnameseName: "Nhôm", Z: 13, neutrons: 14, shells: [2, 8, 3], group: "IIIA", period: 3, funFact: "Kim loại nhẹ làm thân máy bay và đồ dùng gia đình." },
  { symbol: "Cl", name: "Chlorine", vietnameseName: "Clo", Z: 17, neutrons: 18, shells: [2, 8, 7], group: "VIIA", period: 3, funFact: "Halogen có tính oxi hoá mạnh dùng để sát trùng nước sinh hoạt." }
];

const BohrAtomSimulation: React.FC<{ onSave?: (data: any) => void }> = ({ onSave }) => {
  const [selectedElement, setSelectedElement] = useState<ElementItem>(ELEMENTS[2]); // Carbon

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-3 border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Mô Hình Cấu Tạo Nguyên Tử Rutherford – Bohr (SGK KNTT Lớp 7)
          </h3>
          <p className="text-xs text-slate-500">
            Khám phá hạt nhân nguyên tử (Proton, Neutron) và các lớp electron chuyển động quanh hạt nhân
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Animated Atomic Orbital Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 relative flex flex-col items-center justify-center min-h-[380px] border border-slate-800 overflow-hidden">
          {/* Legend */}
          <div className="absolute top-3 left-4 text-[11px] text-slate-400 flex items-center gap-3 font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Proton (p⁺)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Neutron (n⁰)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" /> Electron (e⁻)
            </span>
          </div>

          {/* SVG Atomic Model */}
          <div className="relative w-72 h-72 flex items-center justify-center">
            {/* Nucleus in Center */}
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-rose-600 via-amber-600 to-rose-700 flex flex-col items-center justify-center text-white z-20 shadow-lg shadow-rose-600/40 border border-amber-300/40">
              <span className="text-sm font-black tracking-tight">{selectedElement.symbol}</span>
              <span className="text-[9px] font-mono opacity-90">{selectedElement.Z}p, {selectedElement.neutrons}n</span>
            </div>

            {/* Electron Shells (K, L, M) */}
            {selectedElement.shells.map((count, shellIdx) => {
              const radius = 52 + shellIdx * 38; // px
              const shellName = ["K", "L", "M"][shellIdx];
              return (
                <div
                  key={shellIdx}
                  className="absolute rounded-full border border-cyan-500/25 flex items-center justify-center animate-spin"
                  style={{
                    width: `${radius * 2}px`,
                    height: `${radius * 2}px`,
                    animationDuration: `${12 + shellIdx * 8}s`,
                  }}
                >
                  <span className="absolute -top-3 text-[9px] font-mono text-cyan-400/60">
                    Lớp {shellName} ({count}e)
                  </span>

                  {/* Electron dots positioned along orbital */}
                  {Array.from({ length: count }).map((_, eIdx) => {
                    const angle = (2 * Math.PI * eIdx) / count;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    return (
                      <div
                        key={eIdx}
                        className="absolute w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/80 flex items-center justify-center text-[8px] font-bold text-slate-950"
                        style={{
                          transform: `translate(${x}px, ${y}px)`,
                        }}
                      >
                        -
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Electron Configuration Ribbon */}
          <div className="mt-3 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-xl text-xs font-mono text-cyan-300">
            Cấu hình electron: Lớp [{selectedElement.shells.join(", ")}] • Số electron lớp ngoài cùng:{" "}
            <strong>{selectedElement.shells[selectedElement.shells.length - 1]}</strong>
          </div>
        </div>

        {/* Element Selection & Scientific Data (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">
            Chọn Nguyên Tố Hoá Học (Bảng Tuần Hoàn KNTT 7):
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {ELEMENTS.map((el) => (
              <button
                key={el.symbol}
                onClick={() => setSelectedElement(el)}
                className={`p-2 rounded-xl text-center border transition-all ${
                  selectedElement.symbol === el.symbol
                    ? "bg-cyan-50 border-cyan-500 ring-1 ring-cyan-500 shadow-xs"
                    : "bg-white border-slate-200 hover:border-cyan-300"
                }`}
              >
                <span className="text-sm font-black text-slate-900 block">{el.symbol}</span>
                <span className="text-[10px] text-slate-500 block truncate">{el.vietnameseName}</span>
              </button>
            ))}
          </div>

          {/* Details Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 text-slate-800">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="font-bold text-sm text-slate-900">
                {selectedElement.name} ({selectedElement.vietnameseName})
              </span>
              <span className="text-xs font-mono bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded font-bold">
                Z = {selectedElement.Z}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <p>• Số proton: <strong>{selectedElement.Z}</strong></p>
              <p>• Số electron: <strong>{selectedElement.Z}</strong></p>
              <p>• Số neutron: <strong>{selectedElement.neutrons}</strong></p>
              <p>• Khối lượng A: <strong>{selectedElement.Z + selectedElement.neutrons} amu</strong></p>
              <p>• Chu kỳ: <strong>{selectedElement.period}</strong></p>
              <p>• Nhóm: <strong>{selectedElement.group}</strong></p>
            </div>
            <p className="pt-2 text-slate-600 italic border-t border-slate-200">
              💡 {selectedElement.funFact}
            </p>

            {onSave && (
              <button
                onClick={() => onSave({
                  title: `Khám phá mô hình nguyên tử ${selectedElement.name} (${selectedElement.symbol})`,
                  materialsUsed: ["Mô phỏng 3D nguyên tử", "Bảng tuần hoàn hoá học KNTT"],
                  observedPhenomena: `Nguyên tử ${selectedElement.symbol} có ${selectedElement.Z} proton, ${selectedElement.neutrons} neutron và ${selectedElement.shells.length} lớp electron [${selectedElement.shells.join(", ")}].`,
                  chemicalExplanation: "Mô hình Rutherford - Bohr giải thích tính chất hoá học được quyết định bởi số electron ở lớp ngoài cùng.",
                  tags: ["Tháng 10", "Nguyên tử Bohr", "Lớp 7"]
                })}
                className="pt-2 block text-[11px] font-bold text-emerald-800 underline hover:text-emerald-950"
              >
                + Lưu vào Sổ tay thí nghiệm nhí
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. PIN CHANH THẮP SÁNG LED (LỚP 9 KNTT) SIMULATION                        */
/* -------------------------------------------------------------------------- */
const LemonBatterySimulation: React.FC<{ onSave?: (data: any) => void }> = ({ onSave }) => {
  const [lemonsCount, setLemonsCount] = useState<number>(3); // 1 to 4 lemons

  const voltage = Number((lemonsCount * 0.9).toFixed(2));
  const isLedOn = voltage >= 1.8; // LED forward voltage threshold

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-3 border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Chế Tạo "Pin Chanh" Phát Điện Thắp Sáng Bóng Đèn LED (SGK KNTT Lớp 9)
          </h3>
          <p className="text-xs text-slate-500">
            Ứng dụng phản ứng oxi hoá - khử giữa Kẽm (Zn) và Đồng (Cu) trong dung dịch chất điện phân Axit Citric
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Lemon Battery Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 relative flex flex-col items-center justify-center min-h-[360px] border border-slate-800">
          {/* Voltmeter Gauge */}
          <div className="mb-4 bg-slate-800/90 border border-slate-700 px-4 py-2 rounded-xl text-center flex items-center gap-3">
            <Gauge className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-[10px] text-slate-400 block font-mono">ĐỒNG HỒ ĐO ĐIỆN ÁP (V)</span>
              <span className="text-base font-black font-mono text-amber-300">{voltage} Vôn</span>
            </div>
          </div>

          {/* Lemons Row */}
          <div className="flex items-center justify-center gap-3 flex-wrap my-4">
            {Array.from({ length: lemonsCount }).map((_, idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                {/* Electrodes sticking out */}
                <div className="flex gap-4 mb-0.5">
                  <span className="w-2 h-6 bg-slate-400 rounded-t-xs text-[8px] font-mono text-center font-bold text-slate-900" title="Cực Kẽm Zn (-)">Zn</span>
                  <span className="w-2 h-6 bg-amber-600 rounded-t-xs text-[8px] font-mono text-center font-bold text-white" title="Cực Đồng Cu (+)">Cu</span>
                </div>
                {/* Lemon Fruit */}
                <div className="w-16 h-14 rounded-3xl bg-linear-to-b from-yellow-300 via-amber-400 to-yellow-500 shadow-md border border-yellow-200/50 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-amber-950 font-mono">Chanh #{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>

          {/* LED Light Bulb */}
          <div className="mt-4 flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center ${
              isLedOn 
                ? "bg-red-500 shadow-xl shadow-red-500/80 ring-4 ring-red-400/50 animate-pulse" 
                : "bg-red-950/40 border border-red-800/50 text-slate-500"
            }`}>
              <Zap className={`w-5 h-5 ${isLedOn ? "text-yellow-200 fill-yellow-200" : "text-red-800"}`} />
            </div>
            <span className={`text-xs font-bold mt-2 ${isLedOn ? "text-red-400" : "text-slate-500"}`}>
              {isLedOn ? "BÓNG ĐÈN LED ĐANG PHÁT SÁNG!" : "LED CHƯA ĐỦ ĐIỆN ÁP (Cần ≥ 1.8V)"}
            </span>
          </div>
        </div>

        {/* Controls & Scientific Theory (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">
              Điều Chỉnh Số Quả Chanh Nối Tiếp:
            </h4>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setLemonsCount(num)}
                  className={`flex-1 py-2 rounded-xl font-bold text-xs border transition-all ${
                    lemonsCount === num
                      ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {num} Quả
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">
              Khi mắc nối tiếp các quả chanh: U_tổng = U₁ + U₂ + ... (Mỗi quả chanh đóng góp khoảng 0.9V).
            </p>
          </div>

          {/* Electrochemistry Principle */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-2 text-amber-950">
            <h5 className="font-bold text-amber-900 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-700" />
              Cơ Chế Phản Ứng Điện Hoá:
            </h5>
            <p>
              • <strong>Cực âm (Anode - Kẽm Zn):</strong> Zn hoạt động mạnh hơn, bị oxi hoá nhường 2 electron: <code className="font-mono bg-white px-1 rounded">Zn → Zn²⁺ + 2e⁻</code>
            </p>
            <p>
              • <strong>Cực dương (Cathode - Đồng Cu):</strong> Electron chạy qua mạch ngoài sang đồng, ion H⁺ trong nước chanh nhận electron tạo bọt khí hydro: <code className="font-mono bg-white px-1 rounded">2H⁺ + 2e⁻ → H₂↑</code>
            </p>

            {onSave && (
              <button
                onClick={() => onSave({
                  title: `Thí nghiệm Pin ${lemonsCount} quả chanh phát điện thắp sáng LED`,
                  materialsUsed: [`${lemonsCount} quả chanh`, "Bản kẽm Zn", "Bản đồng Cu", "Bóng đèn LED đỏ", "Dây kẹp cá sấu"],
                  observedPhenomena: `Điện áp đo được là ${voltage}V. ${isLedOn ? "Bóng đèn LED đỏ phát sáng rõ." : "Bóng đèn chưa đủ sáng do điện thế nhỏ hơn 1.8V."}`,
                  chemicalExplanation: "Phản ứng oxi hoá khử giải phóng electron tại cực kẽm tạo dòng điện một chiều.",
                  equation: "Zn + 2H⁺ → Zn²⁺ + H₂↑",
                  tags: ["Tháng 1", "Pin chanh", "Lớp 9"]
                })}
                className="pt-2 block text-[11px] font-bold text-emerald-800 underline hover:text-emerald-950"
              >
                + Lưu vào Sổ tay thí nghiệm nhí
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 5. CÂN BẰNG PHƯƠNG TRÌNH HOÁ HỌC (LỚP 8 KNTT) SIMULATION                  */
/* -------------------------------------------------------------------------- */
interface EquationChallenge {
  id: string;
  name: string;
  reactants: { formula: string; defaultCoef: number; targetCoef: number; atoms: Record<string, number> }[];
  products: { formula: string; defaultCoef: number; targetCoef: number; atoms: Record<string, number> }[];
  phenomenon: string;
}

const EQUATION_LIST: EquationChallenge[] = [
  {
    id: "fe_o2",
    name: "Sắt cháy trong khí oxi (Lớp 8)",
    reactants: [
      { formula: "Fe", defaultCoef: 1, targetCoef: 3, atoms: { Fe: 1 } },
      { formula: "O₂", defaultCoef: 1, targetCoef: 2, atoms: { O: 2 } },
    ],
    products: [
      { formula: "Fe₃O₄", defaultCoef: 1, targetCoef: 1, atoms: { Fe: 3, O: 4 } },
    ],
    phenomenon: "Sắt cháy sáng chói lòa tạo các hạt nóng chảy màu nâu đen oxit sắt từ."
  },
  {
    id: "h2_o2",
    name: "Tổng hợp nước từ khí hiđro và oxi",
    reactants: [
      { formula: "H₂", defaultCoef: 1, targetCoef: 2, atoms: { H: 2 } },
      { formula: "O₂", defaultCoef: 1, targetCoef: 1, atoms: { O: 2 } },
    ],
    products: [
      { formula: "H₂O", defaultCoef: 1, targetCoef: 2, atoms: { H: 2, O: 1 } },
    ],
    phenomenon: "Hỗn hợp nổ nhẹ kèm theo tiếng tách và những giọt nước đọng trên thành ống nghiệm."
  },
  {
    id: "zn_hcl",
    name: "Kẽm tác dụng với dung dịch Axit Clohiđric",
    reactants: [
      { formula: "Zn", defaultCoef: 1, targetCoef: 1, atoms: { Zn: 1 } },
      { formula: "HCl", defaultCoef: 1, targetCoef: 2, atoms: { H: 1, Cl: 1 } },
    ],
    products: [
      { formula: "ZnCl₂", defaultCoef: 1, targetCoef: 1, atoms: { Zn: 1, Cl: 2 } },
      { formula: "H₂", defaultCoef: 1, targetCoef: 1, atoms: { H: 2 } },
    ],
    phenomenon: "Mảnh kẽm tan dần và có nhiều bọt khí không màu (H2) thoát ra nhanh."
  }
];

const ReactionBalancerSimulation: React.FC<{ onSave?: (data: any) => void }> = ({ onSave }) => {
  const [selectedEqIndex, setSelectedEqIndex] = useState<number>(0);
  const currentEq = EQUATION_LIST[selectedEqIndex];

  const [rCoefs, setRCoefs] = useState<number[]>(currentEq.reactants.map(() => 1));
  const [pCoefs, setPCoefs] = useState<number[]>(currentEq.products.map(() => 1));

  // Reset coefficients on equation change
  useEffect(() => {
    setRCoefs(currentEq.reactants.map(() => 1));
    setPCoefs(currentEq.products.map(() => 1));
  }, [selectedEqIndex]);

  // Check balance
  const isBalanced = currentEq.reactants.every((r, i) => rCoefs[i] === r.targetCoef) &&
                     currentEq.products.every((p, i) => pCoefs[i] === p.targetCoef);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-3 border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Cân Bằng Phương Trình & Bảo Toàn Khối Lượng (SGK KNTT Lớp 8)
          </h3>
          <p className="text-xs text-slate-500">
            Điều chỉnh hệ số thích hợp sao cho số nguyên tử mỗi nguyên tố ở vế trái bằng vế phải
          </p>
        </div>
      </div>

      {/* Equation Tabs */}
      <div className="flex gap-2 flex-wrap">
        {EQUATION_LIST.map((eq, idx) => (
          <button
            key={eq.id}
            onClick={() => setSelectedEqIndex(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
              selectedEqIndex === idx
                ? "bg-emerald-700 text-white border-emerald-700"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            {eq.name}
          </button>
        ))}
      </div>

      {/* Interactive Equation Board */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col items-center justify-center min-h-[220px]">
        <div className="flex items-center gap-3 flex-wrap justify-center text-lg sm:text-2xl font-mono font-bold">
          {/* Reactants */}
          {currentEq.reactants.map((r, i) => (
            <React.Fragment key={`r-${i}`}>
              {i > 0 && <span className="text-emerald-400">+</span>}
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-700">
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      const newC = [...rCoefs];
                      newC[i] = Math.min(6, newC[i] + 1);
                      setRCoefs(newC);
                    }}
                    className="text-xs text-emerald-400 hover:text-white"
                  >
                    ▲
                  </button>
                  <span className="text-amber-300 font-black text-center">{rCoefs[i]}</span>
                  <button
                    onClick={() => {
                      const newC = [...rCoefs];
                      newC[i] = Math.max(1, newC[i] - 1);
                      setRCoefs(newC);
                    }}
                    className="text-xs text-emerald-400 hover:text-white"
                  >
                    ▼
                  </button>
                </div>
                <span className="text-white">{r.formula}</span>
              </div>
            </React.Fragment>
          ))}

          <span className="text-amber-400 font-bold px-2">→</span>

          {/* Products */}
          {currentEq.products.map((p, i) => (
            <React.Fragment key={`p-${i}`}>
              {i > 0 && <span className="text-emerald-400">+</span>}
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-700">
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      const newC = [...pCoefs];
                      newC[i] = Math.min(6, newC[i] + 1);
                      setPCoefs(newC);
                    }}
                    className="text-xs text-emerald-400 hover:text-white"
                  >
                    ▲
                  </button>
                  <span className="text-amber-300 font-black text-center">{pCoefs[i]}</span>
                  <button
                    onClick={() => {
                      const newC = [...pCoefs];
                      newC[i] = Math.max(1, newC[i] - 1);
                      setPCoefs(newC);
                    }}
                    className="text-xs text-emerald-400 hover:text-white"
                  >
                    ▼
                  </button>
                </div>
                <span className="text-white">{p.formula}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Balanced Status Notification */}
        <div className="mt-5">
          {isBalanced ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 text-xs font-bold animate-bounce">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>CHÚC MỪNG! Phương trình đã cân bằng đúng định luật bảo toàn khối lượng!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Chưa cân bằng số lượng nguyên tử giữa hai vế. Hãy tiếp tục điều chỉnh hệ số!</span>
            </div>
          )}
        </div>
      </div>

      {/* Phenomenon note */}
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
        <span className="font-bold">Hiện tượng thực tế: </span>
        <span>{currentEq.phenomenon}</span>
      </div>
    </div>
  );
};
