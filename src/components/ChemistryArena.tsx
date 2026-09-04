import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { QUIZ_BANK } from "../data/curriculumData";
import { QuizQuestion } from "../types";
import { normalizeChemistryText } from "../utils/chemistryFormatter";
import { quizSound } from "../utils/quizSound";
import { 
  Trophy, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  Flame, 
  Award,
  ChevronRight,
  Volume2,
  VolumeX,
  Timer,
  Shuffle,
  Zap,
  BookOpen,
  MapPin,
  HelpCircle,
  Share2
} from "lucide-react";

type QuizMode = "practice" | "arena";

export const ChemistryArena: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [mode, setMode] = useState<QuizMode>("arena");
  const [isMuted, setIsMuted] = useState<boolean>(() => quizSound.getMuted());
  
  // Question ordering (can be shuffled)
  const [seed, setSeed] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Arena mode timer (15 seconds per question)
  const QUESTION_TIME_LIMIT = 15;
  const [timeLeft, setTimeLeft] = useState<number>(QUESTION_TIME_LIMIT);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter questions based on category
  const filteredQuestions = useMemo(() => {
    let pool: QuizQuestion[] = [];
    if (selectedCategory === "all") {
      pool = [...QUIZ_BANK];
    } else if (selectedCategory === "7") {
      pool = QUIZ_BANK.filter(q => q.grade === "Lớp 7");
    } else if (selectedCategory === "8") {
      pool = QUIZ_BANK.filter(q => q.grade === "Lớp 8");
    } else if (selectedCategory === "9") {
      pool = QUIZ_BANK.filter(q => q.grade === "Lớp 9");
    } else if (selectedCategory === "tayninh") {
      pool = QUIZ_BANK.filter(q => q.topic?.includes("Tây Ninh") || q.grade === "Chung");
    } else {
      pool = [...QUIZ_BANK];
    }

    // Pseudo-shuffle when seed changes
    if (seed > 0) {
      return [...pool].sort(() => Math.sin(seed + pool.length) - 0.5);
    }
    return pool;
  }, [selectedCategory, seed]);

  const currentQ: QuizQuestion | undefined = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];

  const handleToggleSound = () => {
    const nextMuted = quizSound.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      quizSound.playClick();
    }
  };

  const handleSelectOption = useCallback((idx: number | null) => {
    if (isAnswered || !currentQ) return;
    
    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setMaxStreak((prev) => Math.max(prev, nextStreak));
      
      // Points calculation: Base 10 + Time bonus (up to 5 pts in arena mode) + Streak bonus
      const timeBonus = mode === "arena" ? Math.floor(timeLeft / 3) : 0;
      const streakBonus = nextStreak >= 3 ? 5 : 0;
      const earned = 10 + timeBonus + streakBonus;
      setScore((prev) => prev + earned);

      // Sound effect
      quizSound.playCorrect(nextStreak);
    } else {
      setStreak(0);
      quizSound.playWrong();
    }
  }, [isAnswered, currentQ, streak, mode, timeLeft]);

  // Timer countdown for Arena mode
  useEffect(() => {
    if (mode !== "arena" || isAnswered || quizFinished) return;

    setTimeLeft(QUESTION_TIME_LIMIT);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleSelectOption(null); // Time's up: treat as wrong/unanswered
          return 0;
        }

        // Sound tick in the last 4 seconds
        if (prev <= 5) {
          quizSound.playTick(true);
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentQuestionIndex, mode, isAnswered, quizFinished, handleSelectOption]);

  const handleNextQuestion = () => {
    quizSound.playClick();
    if (currentQuestionIndex + 1 < filteredQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(QUESTION_TIME_LIMIT);
    } else {
      setQuizFinished(true);
      quizSound.playVictory();
    }
  };

  const handleRestart = (category = selectedCategory, newMode = mode, shouldShuffle = false) => {
    quizSound.playClick();
    setSelectedCategory(category);
    setMode(newMode);
    if (shouldShuffle) {
      setSeed(Date.now());
    }
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setQuizFinished(false);
    setTimeLeft(QUESTION_TIME_LIMIT);
  };

  // Rank title determination based on final percentage
  const totalPossible = (filteredQuestions.length || 1) * 10;
  const percentage = Math.min(100, Math.round((score / totalPossible) * 100));

  const rankInfo = useMemo(() => {
    if (percentage >= 85) {
      return {
        title: "TRẠNG NGUYÊN HOÁ HỌC",
        medal: "🥇",
        color: "text-amber-500",
        badgeBg: "bg-amber-100 border-amber-300",
        desc: "Xuất sắc tuyệt đỉnh! Em xứng đáng là cánh chim đầu đàn của CLB Hạt Mầm Khoa Học trường THCS Lý Tự Trọng!"
      };
    }
    if (percentage >= 70) {
      return {
        title: "BẢNG NHÃN HOÁ HỌC",
        medal: "🥈",
        color: "text-emerald-600",
        badgeBg: "bg-emerald-100 border-emerald-300",
        desc: "Rất cừ khôi! Kiến thức hoá học và khả năng phản xạ nhanh nhạy của em cực kỳ ấn tượng!"
      };
    }
    if (percentage >= 50) {
      return {
        title: "THÁM HOA HOÁ HỌC",
        medal: "🥉",
        color: "text-blue-600",
        badgeBg: "bg-blue-100 border-blue-300",
        desc: "Làm tốt lắm! Em đã nắm vững nền tảng kiến thức cơ bản của bộ sách Kết nối tri thức!"
      };
    }
    return {
      title: "HẠT MẦM TRI THỨC TRẺ",
      medal: "🌱",
      color: "text-teal-600",
      badgeBg: "bg-teal-100 border-teal-300",
      desc: "Khoa học là một hành trình rèn luyện kiên trì. Hãy tiếp tục thử thách để bứt phá điểm số cao hơn nhé!"
    };
  }, [percentage]);

  return (
    <div id="chemistry-arena-page" className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Competition Banner Header */}
      <div className="bg-linear-to-r from-emerald-900 via-teal-900 to-slate-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div className="relative z-10 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Đấu Trường Tranh Tài Hoá Học KNTT</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-[11px]">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>{QUIZ_BANK.length} Câu hỏi phong phú</span>
            </div>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            ĐẤU TRƯỜNG ĐỐ VUI HOÁ HỌC
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 font-medium">
            Học mà chơi, chơi mà học — Rèn luyện bản lĩnh khoa học cùng CLB "Hạt Mầm Khoa Học" THCS Lý Tự Trọng
          </p>
        </div>

        {/* Live Score, Streak & Sound Controls */}
        <div className="relative z-10 flex items-center gap-2.5">
          {/* Sound Toggle Button */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? "Bật âm thanh sống động" : "Tắt âm thanh"}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
              isMuted 
                ? "bg-rose-500/20 border-rose-400/40 text-rose-300 hover:bg-rose-500/30" 
                : "bg-emerald-500/20 border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/30 animate-pulse"
            }`}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Score Counter */}
          <div className="bg-white/10 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-white/10 text-center min-w-[70px]">
            <span className="text-[10px] uppercase tracking-wider text-emerald-300 block font-semibold">ĐIỂM</span>
            <span className="text-lg font-black text-amber-300 font-mono">{score}</span>
          </div>

          {/* Streak Counter */}
          <div className="bg-white/10 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-white/10 text-center min-w-[75px]">
            <span className="text-[10px] uppercase tracking-wider text-emerald-300 block font-semibold">CHUỖI</span>
            <span className="text-lg font-black text-orange-400 font-mono flex items-center justify-center gap-1">
              <Flame className={`w-4 h-4 text-orange-400 ${streak > 0 ? "fill-orange-400 animate-bounce" : ""}`} />
              {streak}
            </span>
          </div>
        </div>
      </div>

      {/* Mode & Category Selection Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Category Filter */}
        <div className="flex items-center flex-wrap gap-1.5 text-xs">
          <span className="text-slate-500 font-bold px-1 hidden sm:inline">Khối lớp:</span>
          {[
            { id: "all", label: `Tất cả (${QUIZ_BANK.length})` },
            { id: "7", label: `Khối 7 (${QUIZ_BANK.filter(q => q.grade === "Lớp 7").length})` },
            { id: "8", label: `Khối 8 (${QUIZ_BANK.filter(q => q.grade === "Lớp 8").length})` },
            { id: "9", label: `Khối 9 (${QUIZ_BANK.filter(q => q.grade === "Lớp 9").length})` },
            { id: "tayninh", label: "Tây Ninh & Đời Sống" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleRestart(cat.id, mode, false)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Mode Switcher + Shuffle */}
        <div className="flex items-center gap-2 text-xs">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => handleRestart(selectedCategory, "practice", false)}
              className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                mode === "practice" 
                  ? "bg-white text-emerald-800 shadow-xs" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Luyện tập tự do không giới hạn thời gian"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Luyện tập</span>
            </button>
            <button
              onClick={() => handleRestart(selectedCategory, "arena", false)}
              className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                mode === "arena" 
                  ? "bg-amber-500 text-slate-950 font-bold shadow-xs" 
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Đấu trường tính giờ 15s kịch tính, thưởng tốc độ"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Tranh tài 15s</span>
            </button>
          </div>

          {/* Shuffle button */}
          <button
            onClick={() => handleRestart(selectedCategory, mode, true)}
            title="Đảo ngẫu nhiên thứ tự câu hỏi"
            className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-emerald-700 transition-colors cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Quiz Arena Card */}
      {!quizFinished && currentQ ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden">
          {/* Top Info Bar: Category + Question Counter + Timer */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-emerald-900 bg-emerald-100/80 px-2.5 py-1 rounded-lg border border-emerald-200">
                {currentQ.grade} • {currentQ.topic || currentQ.knttReference || "KNTT"}
              </span>

              {currentQ.difficulty && (
                <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                  currentQ.difficulty === "Dễ" 
                    ? "bg-teal-50 text-teal-700 border border-teal-200" 
                    : currentQ.difficulty === "Trung bình" 
                    ? "bg-amber-50 text-amber-700 border border-amber-200" 
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}>
                  ★ {currentQ.difficulty}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Arena Mode Countdown Timer Bar */}
              {mode === "arena" && (
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono font-bold text-xs ${
                  timeLeft <= 5 
                    ? "bg-rose-100 text-rose-600 animate-pulse border border-rose-300" 
                    : "bg-amber-100 text-amber-800"
                }`}>
                  <Timer className={`w-3.5 h-3.5 ${timeLeft <= 5 ? "animate-spin" : ""}`} />
                  <span>{timeLeft}s</span>
                </div>
              )}

              <span className="font-mono font-bold text-slate-500">
                {currentQuestionIndex + 1} / {filteredQuestions.length}
              </span>
            </div>
          </div>

          {/* Arena Timer Visual Progress Bar */}
          {mode === "arena" && !isAnswered && (
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ease-linear rounded-full ${
                  timeLeft <= 5 ? "bg-rose-500" : timeLeft <= 8 ? "bg-amber-500" : "bg-emerald-500"
                }`}
                style={{ width: `${(timeLeft / QUESTION_TIME_LIMIT) * 100}%` }}
              />
            </div>
          )}

          {/* Question Prompt */}
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {normalizeChemistryText(currentQ.question)}
            </h3>
          </div>

          {/* Multiple Choice Options Grid */}
          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let style = "bg-white border-slate-200 text-slate-800 hover:border-emerald-400 hover:bg-emerald-50/30";
              if (isAnswered) {
                if (isCorrect) {
                  style = "bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20";
                } else if (isSelected) {
                  style = "bg-rose-50 border-rose-400 text-rose-950 font-medium";
                } else {
                  style = "bg-slate-50/60 border-slate-200 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-2xl border-2 text-left text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected && isCorrect 
                        ? "bg-emerald-600 text-white" 
                        : isSelected && !isCorrect 
                        ? "bg-rose-600 text-white" 
                        : "bg-slate-100 text-slate-700"
                    }`}>
                      {["A", "B", "C", "D"][idx]}
                    </span>
                    <span className="leading-snug">{normalizeChemistryText(opt)}</span>
                  </div>

                  {isAnswered && (
                    <div className="shrink-0 ml-2">
                      {isCorrect && <CheckCircle className="w-5 h-5 text-emerald-600 animate-scale" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 animate-shake" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box (Revealed after answering) */}
          {isAnswered && (
            <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-200 text-xs sm:text-sm space-y-2.5 animate-fade-in shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>
                    {selectedOption === currentQ.correctIndex
                      ? "🎉 Chính xác xuất sắc! Em làm rất tốt!"
                      : selectedOption === null 
                      ? "⏰ Đã hết 15 giây! Hãy cùng xem lời giải nhé:"
                      : "💡 Chưa chính xác rồi! Đừng nản lòng nhé:"}
                  </span>
                </div>

                {streak >= 3 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wider animate-bounce">
                    <Flame className="w-3.5 h-3.5 fill-white" />
                    Chuỗi {streak}x Thưởng lớn!
                  </span>
                )}
              </div>

              <p className="text-slate-700 leading-relaxed font-normal">
                {normalizeChemistryText(currentQ.explanation)}
              </p>

              {currentQ.funFact && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                  <span className="font-bold shrink-0">🔬 Góc mở rộng:</span>
                  <span>{normalizeChemistryText(currentQ.funFact)}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] text-slate-500 italic">
                  {currentQ.knttReference}
                </span>

                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 rounded-xl bg-linear-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-sm cursor-pointer ml-auto"
                >
                  <span>
                    {currentQuestionIndex + 1 < filteredQuestions.length
                      ? "Câu Tiếp Theo"
                      : "Xem Bảng Vàng Tổng Kết"}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Victory Screen with Rank Badge */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-6 shadow-md animate-fade-in">
          <div className="relative inline-block">
            <div className="text-6xl animate-bounce">{rankInfo.medal}</div>
          </div>

          <div className="space-y-1.5">
            <div className={`inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${rankInfo.badgeBg} ${rankInfo.color}`}>
              ★ {rankInfo.title} ★
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Vinh Danh Bản Lĩnh Nhà Khoa Học Trẻ!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              {rankInfo.desc}
            </p>
          </div>

          {/* Detailed Statistics Cards */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto text-center">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
              <span className="text-[11px] text-emerald-800 font-semibold block">TỔNG ĐIỂM</span>
              <span className="text-2xl font-black text-emerald-900 font-mono">{score}</span>
            </div>
            <div className="p-3 rounded-2xl bg-orange-50 border border-orange-100">
              <span className="text-[11px] text-orange-800 font-semibold block">CHUỖI CAO NHẤT</span>
              <span className="text-2xl font-black text-orange-600 font-mono flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 fill-orange-500" />
                {maxStreak}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100">
              <span className="text-[11px] text-amber-800 font-semibold block">TỈ LỆ ĐẠT</span>
              <span className="text-2xl font-black text-amber-700 font-mono">{percentage}%</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => handleRestart(selectedCategory, mode, true)}
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-transform active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Thử Thách Lượt Mới (Đảo Câu)</span>
            </button>

            <button
              onClick={() => {
                quizSound.playClick();
                window.print();
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>Lưu / In Kết Quả</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
