import React, { useState } from "react";
import { 
  GraduationCap, 
  Award, 
  Sparkles, 
  Heart, 
  BookOpen, 
  MapPin, 
  School, 
  Mail, 
  Phone, 
  CheckCircle2, 
  FlaskConical, 
  Atom, 
  Lightbulb, 
  MessageCircle, 
  Calendar, 
  Download,
  Share2,
  ExternalLink,
  ChevronRight,
  Star
} from "lucide-react";
import { NavTab } from "./Navbar";
import { TeacherAvatar } from "./TeacherAvatar";

interface TeacherBrandSectionProps {
  setActiveTab: (tab: NavTab) => void;
  onAskAI: (topic: string) => void;
}

export const TeacherBrandSection: React.FC<TeacherBrandSectionProps> = ({
  setActiveTab,
  onAskAI
}) => {
  const [selectedGradeTab, setSelectedGradeTab] = useState<"7" | "8" | "9">("7");
  const [studentQuestion, setStudentQuestion] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("Lớp 8A1");
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentQuestion.trim()) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setStudentQuestion("");
      alert("🎉 Cảm ơn em! Câu hỏi của em đã được chuyển đến Cô Huỳnh Thị Thùy Dương. Cô sẽ phản hồi vào buổi sinh hoạt CLB sắp tới hoặc em có thể hỏi Trợ lý AI Cô Dương ngay bây giờ!");
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Hero Presentation Card */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl border border-emerald-500/20">
        {/* Glow ambient effects */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-10 lg:p-12">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
            
            {/* Teacher Avatar & Badges */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="relative">
                {/* Outer animated aura */}
                <div className="absolute -inset-2 bg-linear-to-r from-amber-400 via-emerald-400 to-teal-300 rounded-full blur-sm opacity-70 animate-pulse" />
                
                {/* Portrait Frame with interactive avatar upload */}
                <TeacherAvatar size="xl" bordered={true} allowEdit={true} />

                {/* Verified Teacher Badge */}
                <div className="absolute bottom-2 right-2 bg-amber-400 text-emerald-950 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 shadow-lg border-2 border-white pointer-events-none">
                  <Award className="w-3.5 h-3.5 text-emerald-950" />
                  <span>Chủ Nhiệm CLB</span>
                </div>
              </div>

              {/* School Tag */}
              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs font-semibold">
                  <School className="w-3.5 h-3.5 text-amber-300" />
                  THCS Lý Tự Trọng • Long Hoa
                </span>
                <p className="text-[11px] text-emerald-300/80 mt-1 flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  Phường Long Hoa, Tỉnh Tây Ninh
                </p>
              </div>
            </div>

            {/* Profile Information & Credentials */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Người Phát Triển Chương Trình CLB Hoá Học 2026 – 2027
              </div>

              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                  Cô Huỳnh Thị Thuỳ Dương
                </h1>
                <p className="text-lg sm:text-xl font-medium text-emerald-300">
                  Giáo viên Hoá học • Tổ Khoa học Tự nhiên
                </p>
                <p className="text-sm text-slate-300">
                  Trường THCS Lý Tự Trọng, Phường Long Hoa, Tỉnh Tây Ninh
                </p>
              </div>

              {/* Teaching Philosophy Quote */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 text-slate-100 italic text-sm sm:text-base leading-relaxed relative">
                <span className="text-3xl text-amber-400 font-serif leading-none mr-2">“</span>
                Khoa học không phải là những trang sách khô khan hay những công thức phức tạp để học vẹt. Khoa học sống động và đẹp đẽ nhất khi các em được tự tay cầm ống nghiệm, quan sát bọt khí sủi lên, thấy màu sắc biến chuyển và hiểu được bí mật của vạn vật xung quanh quê hương Tây Ninh mình.
                <span className="text-3xl text-amber-400 font-serif leading-none ml-2">”</span>
              </div>

              {/* Key Credentials Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-amber-300 font-bold text-lg">KNTT</div>
                  <div className="text-[11px] text-slate-300">Chuẩn GDPT 2018</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-emerald-300 font-bold text-lg">Khối 7-8-9</div>
                  <div className="text-[11px] text-slate-300">Liên thông 3 năm</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-cyan-300 font-bold text-lg">AI 24/7</div>
                  <div className="text-[11px] text-slate-300">Trợ lý học tập</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-rose-300 font-bold text-lg">ViSEF</div>
                  <div className="text-[11px] text-slate-300">Ươm mầm KHKT</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
                <button
                  onClick={() => setActiveTab("ai_assistant")}
                  className="px-5 py-2.5 rounded-xl bg-linear-to-r from-amber-400 to-amber-500 text-emerald-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-emerald-950" />
                  Trò chuyện cùng Trợ lý AI Cô Dương
                </button>

                <button
                  onClick={() => setActiveTab("virtual_lab")}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all flex items-center gap-2"
                >
                  <FlaskConical className="w-4 h-4 text-emerald-300" />
                  Khám phá Phòng Lab Ảo
                </button>

                <button
                  onClick={() => setActiveTab("plan")}
                  className="px-4 py-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 font-medium text-xs border border-emerald-600/50 transition-all flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                  Văn bản Kế hoạch CLB
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Message by Grade for Students (Grade 7, 8, 9) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md">
              Lời khuyên học tập
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Thông Điệp Từ Cô Dương Dành Cho Từng Khối Lớp
            </h2>
          </div>

          {/* Grade Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setSelectedGradeTab("7")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedGradeTab === "7"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Học Sinh Khối 7
            </button>
            <button
              onClick={() => setSelectedGradeTab("8")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedGradeTab === "8"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Học Sinh Khối 8
            </button>
            <button
              onClick={() => setSelectedGradeTab("9")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedGradeTab === "9"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Học Sinh Khối 9
            </button>
          </div>
        </div>

        {/* Dynamic Grade Content */}
        {selectedGradeTab === "7" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-4 text-slate-700">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
                <Atom className="w-5 h-5 text-emerald-600" />
                <span>Chào đón các em Khối 7: Khám phá Thế giới Vi mô & Bảng tuần hoàn vui!</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                Lớp 7 là năm đầu tiên các em được làm quen với thế giới nguyên tử, electron và bảng tuần hoàn nguyên tố hoá học. Đừng lo lắng về việc phải học thuộc lòng máy móc! Ở CLB Hoá học THCS Lý Tự Trọng, cô sẽ cùng các em:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Chế tạo mô hình nguyên tử 3D</strong> từ bóng xốp nhiều màu sắc và dây kẽm để hiểu rõ hạt nhân, proton, neutron.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Trải nghiệm thí nghiệm Núi lửa sủi bọt</strong> (baking soda và giấm ăn) để tận mắt thấy phản ứng sinh khí CO2.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Bắt đầu cuốn "Nhật ký nhà khoa học nhí"</strong> để ghi chép lại những hiện tượng kỳ diệu đầu tiên của đời học sinh.</span>
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={() => onAskAI("Em là học sinh lớp 7, xin Cô Dương giải thích nguyên tử là gì và cấu tạo hạt nhân nguyên tử như thế nào thật dễ hiểu?")}
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl hover:bg-emerald-100 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Hỏi Cô Dương: "Nguyên tử cấu tạo thế nào?"
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Atom className="w-8 h-8 animate-spin" style={{ animationDuration: "10s" }} />
              </div>
              <h4 className="font-bold text-emerald-950 text-sm">Mục tiêu khối 7</h4>
              <p className="text-xs text-slate-600">
                Xây dựng nền tảng trực quan vững chắc, yêu thích môn Khoa học Tự nhiên và không bỡ ngỡ trước các thuật ngữ hoá học.
              </p>
              <span className="inline-block text-[11px] font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-full border border-emerald-200">
                100% Thực nghiệm an toàn
              </span>
            </div>
          </div>
        )}

        {selectedGradeTab === "8" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-4 text-slate-700">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-lg">
                <FlaskConical className="w-5 h-5 text-teal-600" />
                <span>Thử thách Khối 8: Làm chủ Phản ứng hoá học, Mol & Thế giới Axit - Bazơ!</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                Khối 8 là bước ngoặt quan trọng của môn Hoá học. Các em sẽ học cách cân bằng phương trình, hiểu về định luật bảo toàn khối lượng và phân biệt dung dịch Axit - Bazơ - Muối. Trong CLB, chúng ta sẽ đưa lý thuyết vào thực tiễn:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>Tự chế giấy chỉ thị màu pH</strong> từ bắp cải tím và hoa dâm bụt Tây Ninh để kiểm tra độ chua của đất vườn và nước sinh hoạt.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>Thực hành bảo toàn khối lượng</strong> trên cân điện tử mini để chứng minh nguyên tử không tự sinh ra hay mất đi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>Tìm hiểu hoá học gian bếp</strong>: Bí mật của phản ứng tạo độ giòn cho dưa cải muối, hiện tượng tráng trứng và khử mùi tanh cá.</span>
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={() => onAskAI("Em học lớp 8, xin Cô Dương hướng dẫn cách làm giấy quỳ từ bắp cải tím và thử nghiệm độ pH tại nhà?")}
                  className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 bg-teal-50 px-3.5 py-2 rounded-xl hover:bg-teal-100 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Hỏi Cô Dương: "Làm chỉ thị pH bắp cải tím ra sao?"
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-linear-to-br from-teal-50 to-cyan-50 border border-teal-200/80 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-teal-600 text-white flex items-center justify-center shadow-md">
                <FlaskConical className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-teal-950 text-sm">Mục tiêu khối 8</h4>
              <p className="text-xs text-slate-600">
                Thành thạo kỹ năng cân bằng phương trình hoá học, hiểu rõ bản chất mol và biến đổi chất, giải thích được hiện tượng đời sống.
              </p>
              <span className="inline-block text-[11px] font-bold text-teal-700 bg-white px-2.5 py-1 rounded-full border border-teal-200">
                Kỹ năng thực nghiệm nâng cao
              </span>
            </div>
          </div>
        )}

        {selectedGradeTab === "9" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-4 text-slate-700">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-lg">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <span>Bứt phá Khối 9: Chinh phục Kim loại, Hợp chất hữu cơ & Ươm mầm KHKT!</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                Các anh chị khối 9 là lực lượng nòng cốt của CLB! Chương trình Lớp 9 bám sát các chuyên đề kim loại, dãy hoạt động hoá học, rượu etylic, axit axetic và các polyme sinh học. Đây cũng là thời điểm vàng để ươm mầm các đề tài KHKT (ViSEF):
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Lắp ráp Pin Chanh thắp sáng LED</strong> và Pin điện hoá sinh học từ bã mía Tây Ninh để hiểu về thế điện cực.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Chế tạo màng bọc sinh học tự huỷ (Bioplastic)</strong> từ tinh bột củ mì Tây Ninh kết hợp tinh dầu sả kháng khuẩn.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Tập dượt nghiên cứu khoa học</strong>: Viết đề cương, tiến hành thí nghiệm đối chứng và thiết kế poster tham dự cuộc thi cấp trường & thị xã.</span>
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={() => onAskAI("Cô Dương ơi, em học lớp 9 muốn nghiên cứu đề tài chế tạo màng sinh học từ củ mì Tây Ninh thì cần các bước thực hiện như thế nào ạ?")}
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-50 px-3.5 py-2 rounded-xl hover:bg-amber-100 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Hỏi Cô Dương: "Tư vấn đề tài KHKT màng bọc củ mì"
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-linear-to-br from-amber-50 to-orange-50 border border-amber-200/80 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-600 text-white flex items-center justify-center shadow-md">
                <Lightbulb className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-amber-950 text-sm">Mục tiêu khối 9</h4>
              <p className="text-xs text-slate-600">
                Sẵn sàng cho kỳ thi tuyển sinh lớp 10, phát triển tư duy nghiên cứu khoa học thực thụ và tự tin thuyết trình gian hàng tại Ngày hội STEM.
              </p>
              <span className="inline-block text-[11px] font-bold text-amber-800 bg-white px-2.5 py-1 rounded-full border border-amber-200">
                Định hướng Nghiên cứu & Olympic
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3 Pillars of Club by Teacher Duong */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <FlaskConical className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              1. Thực Nghiệm Trực Quan – Học Đi Đôi Với Hành
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mỗi buổi sinh hoạt đều có sản phẩm thực tế cầm tay mang về. Học sinh tự tay cân đo, quan sát đổi màu và thảo luận khoa học thay vì chỉ ghi chép lý thuyết khô cứng.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Thí nghiệm an toàn tại trường</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              2. Đậm Đà Bản Sắc Tài Nguyên Tây Ninh
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tận dụng nguồn nguyên liệu dồi dào của quê hương: tinh bột củ mì Tây Ninh làm bioplastic, vỏ bưởi da xanh chưng cất tinh dầu đuổi muỗi, bã mía lên men làm pin sinh học.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-amber-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Gắn liền kinh tế & môi trường địa phương</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              3. Tiên Phong Trí Tuệ Nhân Tạo (AI) Trong KHTN
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Trợ lý AI mô phỏng phong cách sư phạm của Cô Dương luôn sẵn sàng 24/7 để giải đáp thắc mắc, gợi ý phản ứng và hướng dẫn phương pháp nghiên cứu KHKT chuẩn khoa học.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-teal-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Cá nhân hoá lộ trình từng học sinh</span>
          </div>
        </div>
      </div>

      {/* Direct Interactive Student Q&A Box with Teacher Duong */}
      <div className="bg-linear-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl p-6 sm:p-8 border border-emerald-200">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <MessageCircle className="w-3.5 h-3.5" />
              Hòm thư kết nối học trò
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Gửi Câu Hỏi & Ý Tưởng Thí Nghiệm Cho Cô Thuỳ Dương
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Các em học sinh THCS Lý Tự Trọng có thể gửi trực tiếp câu hỏi thắc mắc, đề xuất thí nghiệm mới hoặc đăng ký đề tài KHKT ngay tại đây!
            </p>
          </div>

          <form onSubmit={handleSendQuestion} className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-emerald-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ và tên học sinh:
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Minh Thư"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Lớp & Khối:
                </label>
                <select
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Lớp 7A1">Lớp 7A1 (Khối 7 - KNTT)</option>
                  <option value="Lớp 7A2">Lớp 7A2 (Khối 7 - KNTT)</option>
                  <option value="Lớp 8A1">Lớp 8A1 (Khối 8 - KNTT)</option>
                  <option value="Lớp 8A2">Lớp 8A2 (Khối 8 - KNTT)</option>
                  <option value="Lớp 9A1">Lớp 9A1 (Khối 9 - KNTT)</option>
                  <option value="Lớp 9A2">Lớp 9A2 (Khối 9 - KNTT)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nội dung câu hỏi hoặc ý tưởng thí nghiệm:
              </label>
              <textarea
                required
                rows={3}
                value={studentQuestion}
                onChange={(e) => setStudentQuestion(e.target.value)}
                placeholder="Ví dụ: Thưa Cô Dương, em muốn thử nghiệm chiết xuất màu từ quả mãng cầu gai Tây Ninh để làm phẩm màu an toàn thì có thể dùng cồn hay nước cất ạ?..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <School className="w-3.5 h-3.5 text-emerald-600" />
                <span>Trường THCS Lý Tự Trọng, Phường Long Hoa, Tây Ninh</span>
              </div>

              <button
                type="submit"
                disabled={feedbackSent}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                {feedbackSent ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 animate-bounce" />
                    <span>Đang gửi đến Cô Dương...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    <span>Gửi Câu Hỏi Cho Cô Dương</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
