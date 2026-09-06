import React, { useState, useEffect } from "react";
import { NavTab } from "./Navbar";
import {
  BookOpen,
  CheckCircle2,
  ListOrdered,
  Settings,
  ShieldAlert,
  Printer,
  Sparkles,
  FlaskConical,
  HelpCircle,
  Award,
  CalendarDays,
  FileText,
  UserCheck,
  ChevronRight,
  ArrowRight,
  Laptop,
  CheckSquare,
  Square,
  RotateCcw,
  AlertTriangle,
  Lightbulb,
  Download,
  Share2,
  ExternalLink,
  Flame,
  BookmarkCheck,
  Zap,
  Info
} from "lucide-react";
import { TeacherAvatar } from "./TeacherAvatar";

interface ClubAdminGuideProps {
  setActiveTab: (tab: NavTab) => void;
}

type GuideSubTab = "workflow" | "modules" | "checklist" | "scenarios" | "tech_faq";

const CHECKLIST_STORAGE_KEY = "clbhh_admin_session_checklist_v1";

interface ChecklistItem {
  id: string;
  category: "before" | "during" | "after";
  label: string;
  detail: string;
  defaultChecked?: boolean;
}

const DEFAULT_CHECKLIST_ITEMS: ChecklistItem[] = [
  // Trước buổi sinh hoạt
  {
    id: "chk-b1",
    category: "before",
    label: "Kiểm tra màn hình TV / Máy chiếu & Kết nối thiết bị",
    detail: "Bật TV/máy chiếu tại phòng bộ môn KHTN, cắm cáp HDMI hoặc trình chiếu không dây. Nhấn F11 hoặc Ctrl+ để phóng to giao diện ứng dụng cho cả phòng dễ quan sát.",
  },
  {
    id: "chk-b2",
    category: "before",
    label: "Mở ứng dụng và kiểm tra chủ đề tại 'Lộ Trình 9 Tháng'",
    detail: "Xác định tháng sinh hoạt hiện tại (Tháng 9 đến Tháng 5), xem nội dung trọng tâm bài học theo sách Kết nối tri thức để đồng bộ mục tiêu.",
  },
  {
    id: "chk-b3",
    category: "before",
    label: "Chuẩn bị hóa chất đời sống & dụng cụ thực tế",
    detail: "Chuẩn bị các nguyên liệu an toàn tại gia tương ứng: giấm ăn, baking soda, chanh, bắp cải tím, dầu ăn, đinh sắt... đặt sẵn trên các bàn nhóm.",
  },
  {
    id: "chk-b4",
    category: "before",
    label: "Cập nhật ảnh đại diện Cô Dương & Bìa CLB (nếu cần)",
    detail: "Vào 'Góc Cô Dương' hoặc 'CLB Hoá học' kiểm tra ảnh chân dung và ảnh bìa để tạo cảm hứng trang trọng, chỉn chu.",
  },
  {
    id: "chk-b5",
    category: "before",
    label: "Chia nhóm học sinh & Bầu nhóm trưởng phụ trách ghi chép",
    detail: "Phân chia 4-6 nhóm học sinh (mỗi nhóm 4-6 em), phân công nhóm trưởng ghi kết quả vào máy tính/máy tính bảng hoặc giấy nháp.",
  },

  // Trong buổi sinh hoạt
  {
    id: "chk-d1",
    category: "during",
    label: "Khởi động 10 phút với 'Đố Vui Khám Phá' (Chemistry Arena)",
    detail: "Chiếu tab Đố Vui lên màn hình, chọn bộ đề Khối 7/8/9, cho các nhóm giơ bảng hoặc bấm chuông trả lời đối kháng, tạo bầu không khí sôi nổi.",
  },
  {
    id: "chk-d2",
    category: "during",
    label: "Thị phạm mô phỏng tại 'Phòng Thực Hành Ảo' (Virtual Lab)",
    detail: "Người quản trị/giáo viên thao tác thí nghiệm tương tác trên máy chiếu trước, giải thích cơ chế phân tử và cảnh báo an toàn cho học sinh.",
  },
  {
    id: "chk-d3",
    category: "during",
    label: "Học sinh trực tiếp thực hành & đối chiếu mô phỏng với thực tế",
    detail: "Các nhóm học sinh tiến hành thí nghiệm thật tại bàn với nguyên liệu đã chuẩn bị, so sánh hiện tượng quan sát với mô phỏng trên màn hình.",
  },
  {
    id: "chk-d4",
    category: "during",
    label: "Tương tác với 'Trợ Lý AI Cô Dương' để mở rộng kiến thức",
    detail: "Học sinh hoặc quản trị viên gõ các câu hỏi tò mò vào Trợ lý AI (ví dụ: 'Cách cân bằng phương trình', 'Vì sao cắt hành cay mắt') để nghe Cô Dương giải thích sư phạm chuẩn mực.",
  },
  {
    id: "chk-d5",
    category: "during",
    label: "Nhập báo cáo vào 'Nhật Ký Nhà Khoa Học Nhí' (Lab Journal)",
    detail: "Nhóm trưởng đại diện lên máy tính hoặc máy cá nhân nhập kết quả: hiện tượng, phương trình phản ứng, bài học rút ra và chấm điểm an toàn.",
  },

  // Sau buổi sinh hoạt
  {
    id: "chk-a1",
    category: "after",
    label: "Giáo viên nhận xét, chấm điểm và lưu trữ Nhật ký thí nghiệm",
    detail: "Giáo viên chủ nhiệm vào xem các bài viết mới trong 'Nhật Ký Nhà Khoa Học', gửi nhận xét khích lệ học sinh.",
  },
  {
    id: "chk-a2",
    category: "after",
    label: "Ươm mầm ý tưởng nghiên cứu KHKT ViSEF & Olympic",
    detail: "Với các học sinh xuất sắc hoặc có ý tưởng mới, hướng dẫn các em vào tab 'Ươm Mầm KHKT' để lập đề cương dự thi KHKT cấp trường/thị xã.",
  },
  {
    id: "chk-a3",
    category: "after",
    label: "Dọn dẹp phòng bộ môn, xử lý chất thải thí nghiệm an toàn",
    detail: "Các dung dịch hữu cơ sinh hoạt xả với nhiều nước sạch, thu hồi dụng cụ, ngắt cầu dao điện phòng Lab.",
  },
  {
    id: "chk-a4",
    category: "after",
    label: "Giao nhiệm vụ thu thập nguyên liệu tự nhiên cho tuần kế tiếp",
    detail: "Gợi ý các em tìm kiếm hoa dâm bụt, vỏ quả thanh long đỏ, hạt bơ, vỏ trấu để chuẩn bị cho buổi sinh hoạt tiếp theo.",
  },
];

export const ClubAdminGuide: React.FC<ClubAdminGuideProps> = ({ setActiveTab }) => {
  const [activeSubTab, setActiveSubTab] = useState<GuideSubTab>("workflow");
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      if (saved) {
        setCheckedIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleResetChecklist = () => {
    if (window.confirm("Em/Thầy cô có muốn đặt lại toàn bộ bảng kiểm checklist về trạng thái ban đầu?")) {
      setCheckedIds({});
      try {
        localStorage.removeItem(CHECKLIST_STORAGE_KEY);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const completedCount = Object.values(checkedIds).filter(Boolean).length;
  const totalChecklist = DEFAULT_CHECKLIST_ITEMS.length;
  const completionPercent = Math.round((completedCount / totalChecklist) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 print:p-0 print:m-0 print:space-y-4">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-700/50 relative overflow-hidden print:bg-none print:text-black print:p-4 print:border-b-2">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              <Settings className="w-3.5 h-3.5 text-amber-400" />
              Tài Liệu Quản Trị & Vận Hành Sư Phạm
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              CẨM NANG VẬN HÀNH CLB HOÁ HỌC
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-amber-300 via-emerald-300 to-cyan-300 mt-1 print:text-black">
                Trường THCS Lý Tự Trọng – Tây Ninh
              </span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 font-medium max-w-3xl">
              Hướng dẫn chi tiết từng bước cho Quản trị viên, Giáo viên bộ môn Khoa học Tự nhiên và Ban Cán sự CLB 
              vận hành ứng dụng sinh hoạt chuyên môn, bám sát chương trình sách <strong>Kết nối tri thức với cuộc sống</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="bg-white/10 px-3 py-1 rounded-lg text-emerald-200 border border-white/10">
                Năm học: 2026 – 2027
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-lg text-amber-300 border border-white/10">
                Chủ nhiệm: Cô Huỳnh Thị Thuỳ Dương
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-lg border border-emerald-400/30">
                Tiến độ checklist: {completedCount}/{totalChecklist} ({completionPercent}%)
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-row md:flex-col items-center md:items-end gap-3 shrink-0 print:hidden">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/20 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              title="In cẩm nang thành tài liệu A4"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>In Cẩm Nang (A4)</span>
            </button>

            <button
              onClick={() => setActiveSubTab("checklist")}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <CheckSquare className="w-4 h-4 text-emerald-950" />
              <span>Bảng Kiểm Checklist</span>
            </button>
          </div>
        </div>
      </div>

      {/* SubTab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 print:hidden">
        {[
          { id: "workflow", label: "1. Quy Trình 4 Bước Sinh Hoạt", icon: ListOrdered },
          { id: "modules", label: "2. Hướng Dẫn 10 Phân Hệ Ứng Dụng", icon: BookOpen },
          { id: "checklist", label: "3. Bảng Kiểm Checklist Tương Tác", icon: CheckSquare, badge: `${completionPercent}%` },
          { id: "scenarios", label: "4. Kịch Bản 9 Tháng Mẫu KNTT", icon: CalendarDays },
          { id: "tech_faq", label: "5. Xử Lý Kỹ Thuật & Tình Huống", icon: ShieldAlert },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as GuideSubTab)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                isActive
                  ? "bg-emerald-800 text-white border-emerald-800 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-emerald-50 hover:text-emerald-900"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-amber-300" : "text-slate-500"}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isActive ? "bg-amber-400 text-emerald-950" : "bg-emerald-100 text-emerald-800"
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: 4-STEP WORKFLOW */}
      {activeSubTab === "workflow" && (
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 p-4 sm:p-5 rounded-2xl flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
              <strong className="font-bold">Mô hình vận hành chuẩn hóa:</strong> Mỗi buổi sinh hoạt CLB Hoá học "Hạt Mầm Khoa Học" 
              tại trường THCS Lý Tự Trọng kéo dài <strong>60 – 90 phút</strong> (thường vào chiều Thứ 5 hoặc sáng Thứ 7). 
              Quản trị viên và Giáo viên thực hiện tuần tự theo chu trình 4 giai đoạn khép kín dưới đây để đảm bảo tính kỷ luật, cuốn hút và an toàn tuyệt đối.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bước 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 hover:border-emerald-500 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm">
                    01
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Giai Đoạn 1: Chuẩn Bị Trước Buổi Sinh Hoạt</h3>
                    <p className="text-xs text-slate-500">Thời gian: T-24 giờ đến T-30 phút</p>
                  </div>
                </div>
                <span className="text-[11px] bg-amber-50 text-amber-800 font-bold px-2.5 py-1 rounded-full border border-amber-200">
                  Chuẩn bị thiết bị
                </span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p className="font-semibold text-emerald-800">Các bước thực hiện của Quản trị viên:</p>
                <ul className="space-y-2 list-disc list-inside text-slate-650">
                  <li>
                    <strong>Khởi động thiết bị trình chiếu:</strong> Mở máy tính giáo viên kết nối TV thông minh / Máy chiếu qua HDMI. 
                    Nhấn phím <code>F11</code> để kích hoạt chế độ toàn màn hình không viền.
                  </li>
                  <li>
                    <strong>Xác định chủ đề tháng:</strong> Nhấp vào tab <strong>"Lộ Trình 9 Tháng"</strong> để xem mục tiêu KNTT tương ứng 
                    (Ví dụ: Tháng 9 – Phép màu biến đổi chất; Tháng 10 – Bảng tuần hoàn diệu kỳ; Tháng 11 – Sắc màu Axit & Bazơ).
                  </li>
                  <li>
                    <strong>Kiểm kê khay dụng cụ đời sống:</strong> Chuẩn bị sẵn 4-6 khay vật liệu an toàn (cốc thủy tinh, thìa khuấy, giấm ăn, 
                    nước muối, baking soda, chanh...).
                  </li>
                  <li>
                    <strong>Đồng bộ hình ảnh:</strong> Kiểm tra ảnh đại diện Cô Dương tại <strong>"Góc Cô Dương"</strong> và ảnh bìa sinh hoạt 
                    để tạo không gian chuyên nghiệp.
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 italic">Mục tiêu: Đảm bảo 100% thiết bị và dụng cụ sẵn sàng</span>
                <button
                  onClick={() => setActiveTab("roadmap")}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                >
                  <span>Mở Lộ Trình 9 Tháng</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bước 2 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 hover:border-emerald-500 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-black text-sm">
                    02
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Giai Đoạn 2: Khởi Động & Đố Vui Tương Tác</h3>
                    <p className="text-xs text-slate-500">Thời gian: 10 – 15 phút đầu giờ</p>
                  </div>
                </div>
                <span className="text-[11px] bg-blue-50 text-blue-800 font-bold px-2.5 py-1 rounded-full border border-blue-200">
                  Khuấy động phòng Lab
                </span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p className="font-semibold text-emerald-800">Các bước thực hiện của Quản trị viên:</p>
                <ul className="space-y-2 list-disc list-inside text-slate-650">
                  <li>
                    <strong>Chiếu Đấu trường Hoá học:</strong> Chuyển sang tab <strong>"Đố Vui Khám Phá" (Chemistry Arena)</strong>.
                  </li>
                  <li>
                    <strong>Lựa chọn gói câu hỏi phù hợp:</strong> Chọn Khối 7 (Nguyên tử & Phân tử), Khối 8 (Axit - Bazơ & Biến đổi hoá học), 
                    hoặc Khối 9 (Hoá học hữu cơ & Kim loại).
                  </li>
                  <li>
                    <strong>Tổ chức thi đấu đối kháng:</strong> Gọi đại diện 4 nhóm học sinh bấm chuông hoặc giơ bảng A-B-C-D. 
                    Mỗi câu đúng cộng 10 điểm cho nhóm.
                  </li>
                  <li>
                    <strong>Nhấn xem giải thích sâu:</strong> Tận dụng phần giải thích chi tiết có trích dẫn bài học SGK Kết nối tri thức 
                    để khắc sâu kiến thức lý thuyết ngay tại chỗ.
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 italic">Mục tiêu: Đốt cháy ngọn lửa tò mò và ôn tập tự nhiên</span>
                <button
                  onClick={() => setActiveTab("quiz")}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
                >
                  <span>Mở Đố Vui Khám Phá</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bước 3 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 hover:border-emerald-500 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">
                    03
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Giai Đoạn 3: Thực Hành Ảo & Thí Nghiệm Thật</h3>
                    <p className="text-xs text-slate-500">Thời gian: 30 – 40 phút trọng tâm</p>
                  </div>
                </div>
                <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                  Trọng tâm buổi học
                </span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p className="font-semibold text-emerald-800">Các bước thực hiện của Quản trị viên:</p>
                <ul className="space-y-2 list-disc list-inside text-slate-650">
                  <li>
                    <strong>Trình diễn mẫu trên Phòng Lab Ảo:</strong> Mở tab <strong>"Phòng Thực Hành Ảo"</strong>, chọn 1 trong 5 mô phỏng 
                    (Núi lửa sủi bọt, Chỉ thị bắp cải tím, Viết chữ tàng hình, Gỉ sắt, Đèn Lava). Kéo thanh trượt điều chỉnh nồng độ để học sinh 
                    thấy trước hiện tượng và phương trình hoá học chuẩn.
                  </li>
                  <li>
                    <strong>Học sinh tiến hành thí nghiệm thật:</strong> Phát lệnh cho các nhóm đeo kính bảo hộ và găng tay, trực tiếp thực hiện 
                    trên bàn thí nghiệm bằng nguyên liệu thật.
                  </li>
                  <li>
                    <strong>Tương tác với Trợ lý AI Cô Dương:</strong> Khi học sinh thắc mắc (ví dụ: "Tại sao bắp cải tím gặp baking soda lại hoá xanh?"), 
                    mở tab <strong>"Trợ Lý AI Cô Dương"</strong> gõ câu hỏi để AI phân tích cơ chế phân tử Anthocyanin chuẩn mực.
                  </li>
                  <li>
                    <strong>Nhấn "Lưu vào Nhật Ký":</strong> Trên màn hình mô phỏng ảo, nhấn nút lưu kết quả để chuyển dữ liệu vào sổ tay.
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 italic">Mục tiêu: Kết hợp nhuần nhuyễn giữa ảo và thực hành tay</span>
                <button
                  onClick={() => setActiveTab("virtual_lab")}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                >
                  <span>Vào Phòng Lab Ảo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bước 4 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 hover:border-emerald-500 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-black text-sm">
                    04
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Giai Đoạn 4: Ghi Nhật Ký, Đánh Giá & KHKT</h3>
                    <p className="text-xs text-slate-500">Thời gian: 15 – 20 phút cuối giờ</p>
                  </div>
                </div>
                <span className="text-[11px] bg-purple-50 text-purple-800 font-bold px-2.5 py-1 rounded-full border border-purple-200">
                  Lưu trữ & Đánh giá
                </span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p className="font-semibold text-emerald-800">Các bước thực hiện của Quản trị viên:</p>
                <ul className="space-y-2 list-disc list-inside text-slate-650">
                  <li>
                    <strong>Ghi chép Nhật ký thí nghiệm:</strong> Nhấp sang tab <strong>"Nhật Ký Nhà Khoa Học"</strong>. Hướng dẫn các nhóm 
                    điền tên bài thực hành, hiện tượng quan sát, giải thích hoá học và tự chấm điểm an toàn phòng Lab.
                  </li>
                  <li>
                    <strong>Giáo viên phê duyệt & Nhận xét:</strong> Cô Thuỳ Dương đọc nhanh và nhập nhận xét trực tiếp, biểu dương nhóm thực hành tốt.
                  </li>
                  <li>
                    <strong>Ươm mầm đề tài KHKT ViSEF:</strong> Dành 5 phút mở tab <strong>"Ươm Mầm KHKT"</strong> để gợi ý học sinh giỏi mở rộng 
                    thí nghiệm thành đề tài nghiên cứu (ví dụ: tận dụng bã củ mì Tây Ninh làm màng bọc phân huỷ sinh học).
                  </li>
                  <li>
                    <strong>Xuất file in ấn / Lưu trữ:</strong> Định kỳ xuất danh sách bài nhật ký để lưu vào hồ sơ kiểm định chất lượng của nhà trường.
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 italic">Mục tiêu: Đóng gói sản phẩm học tập & phát hiện nhân tài</span>
                <button
                  onClick={() => setActiveTab("journal")}
                  className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
                >
                  <span>Mở Nhật Ký Nhà Khoa Học</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 10 APP MODULES DETAILED GUIDE */}
      {activeSubTab === "modules" && (
        <div className="space-y-6">
          <div className="bg-slate-100 border border-slate-200 p-4 rounded-2xl flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Cẩm Nang Chi Tiết 10 Phân Hệ Chức Năng Của Ứng Dụng
              </h3>
              <p className="text-xs text-slate-600">
                Mỗi phân hệ được thiết kế chuyên biệt để phục vụ một công đoạn cụ thể trong công tác giáo dục STEM hoá học.
              </p>
            </div>
            <span className="text-xs font-bold bg-emerald-800 text-white px-3 py-1.5 rounded-xl">
              10 Phân hệ tích hợp
            </span>
          </div>

          <div className="space-y-4">
            {[
              {
                tabId: "cover" as NavTab,
                title: "1. Phân Hệ Bìa CLB Hoá Học (Club Cover & Thẻ Hội Viên)",
                role: "Nhận diện thương hiệu CLB, chào đón học sinh & xuất thẻ hội viên điện tử",
                howToUse: [
                  "Quản trị viên có thể đổi ảnh bìa bằng cách nhấn nút 'Đổi ảnh bìa' (có biểu tượng Camera) ở góc ảnh bìa, chọn ảnh chụp học sinh thực hành thật tại trường.",
                  "Hệ thống tự động lưu trữ ảnh bìa vào localStorage và đồng bộ lên máy chủ.",
                  "Học sinh có thể nhập Họ và tên, chọn Khối lớp trong danh sách Dropdown để xem trước Thẻ Hội Viên CLB 'Hạt Mầm Khoa Học' có huy hiệu và chữ ký số.",
                  "Nút 'Quản lý danh sách lớp' cho phép quản trị viên thêm lớp mới (ví dụ 8A5, 9A6) hoặc điều chỉnh danh sách theo từng năm học.",
                ],
                btnLabel: "Xem Trang Bìa CLB",
              },
              {
                tabId: "roadmap" as NavTab,
                title: "2. Phân Hệ Lộ Trình 9 Tháng (Roadmap Timeline)",
                role: "Khung phân phối chương trình hoạt động ngoại khoá bám sát bộ sách KNTT",
                howToUse: [
                  "Hiển thị từ Tháng 9 (Làm quen & Khối 7) đến Tháng 5 (Ngày hội Khoa học toàn trường).",
                  "Mỗi tháng ghi rõ: Chủ đề chính, Liên kết SGK KNTT, 3 hoạt động trọng tâm, Sản phẩm dự kiến, Thí nghiệm tiêu biểu và Lời khuyên an toàn.",
                  "Quản trị viên có thể nhấn nút 'Chạy Thí Nghiệm Ảo' để nhảy thẳng đến mô phỏng tương ứng của tháng đó.",
                  "Nút 'Hỏi Trợ Lý AI về chủ đề này' tự động mở khung chat với Cô Dương để phân tích sâu nội dung giảng dạy.",
                ],
                btnLabel: "Xem Lộ Trình 9 Tháng",
              },
              {
                tabId: "virtual_lab" as NavTab,
                title: "3. Phân Hệ Phòng Thực Hành Ảo (Virtual Lab - 5 Mô Phỏng)",
                role: "Môi trường tương tác số hoá an toàn, trực quan hoá các hiện tượng hoá học",
                howToUse: [
                  "Tích hợp 5 mô phỏng hoá học kinh điển: Núi lửa NaHCO₃, Chỉ thị bắp cải tím, Chữ viết tàng hình, Gỉ sắt oxi hoá, Đèn Lava phân lớp.",
                  "Mỗi thí nghiệm có thanh trượt tương tác điều chỉnh khối lượng, nồng độ, nhiệt độ và dung dịch thử nghiệm.",
                  "Hệ thống tự động hiển thị phương trình phản ứng chuẩn Unicode (H₂O, CO₂, Fe²⁺, Fe₂O₃...) và giải thích cơ chế phân tử.",
                  "Nút 'Lưu Kết Quả Vào Nhật Ký' giúp tự động chuyển toàn bộ dữ liệu thí nghiệm ảo sang Sổ tay Nhật ký nhà khoa học nhí.",
                ],
                btnLabel: "Mở Phòng Thực Hành Ảo",
              },
              {
                tabId: "ai_assistant" as NavTab,
                title: "4. Phân Hệ Trợ Lý Sư Phạm AI Cô Huỳnh Thị Thuỳ Dương",
                role: "Gia sư hoá học AI 24/7, đồng hành giải đáp thắc mắc và gợi ý quy trình thí nghiệm",
                howToUse: [
                  "Được lập trình theo phong cách sư phạm ấm áp của Cô Huỳnh Thị Thuỳ Dương: Xưng hô 'Cô - em', bám sát sách KNTT.",
                  "3 Chế độ chuyên biệt: Giải đáp 'Vì sao? Như thế nào?' • Gợi ý thí nghiệm STEM an toàn • Ươm mầm KHKT & Olympic.",
                  "Luôn trả lời đúng trọng tâm câu hỏi (Ví dụ học sinh hỏi 'Cách cân bằng phương trình' -> Hướng dẫn chi tiết thứ tự kim loại, phi kim, chẵn lẻ; tuyệt đối không lạc đề).",
                  "Tích hợp Bộ Đệm Sư Phạm Ngoại Tuyến (Offline Pedagogical Engine): Vẫn trả lời xuất sắc ngay cả khi mất mạng.",
                  "Có nút 'Sao chép' và 'Lưu Sổ Tay' để học sinh đưa câu trả lời của cô vào nhật ký cá nhân.",
                ],
                btnLabel: "Trò Chuyện Với Trợ Lý AI",
              },
              {
                tabId: "teacher" as NavTab,
                title: "5. Phân Hệ Góc Cô Thuỳ Dương (Teacher Brand & Quyền Quản Trị)",
                role: "Khẳng định bản sắc người thầy, triết lý giáo dục và quản lý ảnh đại diện toàn hệ thống",
                howToUse: [
                  "Hiển thị thư ngỏ, chân dung, quá trình công tác, thành tích và triết lý sư phạm 'Khơi gợi ngọn lửa đam mê khoa học'.",
                  "Quản trị viên có thể thay đổi ảnh chân dung của Cô Dương bằng 4 cách: Tải ảnh từ máy tính • Chụp bằng Webcam • Nhập URL ảnh • Đặt lại mặc định.",
                  "Ảnh chân dung sau khi đổi sẽ đồng bộ ngay lập tức trên Navbar, Trợ lý AI chatbot, Thư ngỏ và Bìa CLB.",
                ],
                btnLabel: "Mở Góc Cô Thuỳ Dương",
              },
              {
                tabId: "journal" as NavTab,
                title: "6. Phân Hệ Nhật Ký Nhà Khoa Học Nhí (Lab Journal)",
                role: "Sổ tay nghiên cứu số ghi nhận toàn bộ quá trình thực hành của học sinh",
                howToUse: [
                  "Học sinh nhấn 'Viết bài thu hoạch mới', nhập: Tên thí nghiệm, Khối lớp, Nguyên liệu, Hiện tượng, Giải thích, Phương trình phản ứng.",
                  "Hệ thống cho phép tự chấm điểm an toàn phòng Lab (1 đến 5 sao) và lưu trữ nhận xét của giáo viên.",
                  "Hỗ trợ tìm kiếm, lọc theo khối lớp (Lớp 7, 8, 9, KNTT).",
                  "Dữ liệu được lưu trữ bền vững trong trình duyệt (localStorage), không lo mất bài khi tắt trang.",
                ],
                btnLabel: "Mở Nhật Ký Nghiên Cứu",
              },
              {
                tabId: "quiz" as NavTab,
                title: "7. Phân Hệ Đố Vui Khám Phá (Chemistry Arena - Đấu Trường Hoá Học)",
                role: "Sân chơi trắc nghiệm thi đấu tương tác khởi động đầu giờ hoặc sinh hoạt tuần",
                howToUse: [
                  "Bao gồm hàng chục câu hỏi trắc nghiệm chia theo 4 gói: Khối 7, Khối 8, Khối 9 và Thử thách Đố vui đời sống.",
                  "Có đồng hồ đếm ngược, hiển thị đáp án đúng/sai ngay lập tức cùng âm thanh trực quan.",
                  "Mỗi câu hỏi đều kèm phần 'Lời giải thích chuyên sâu' và trích dẫn bài học SGK Kết nối tri thức.",
                  "Quản trị viên có thể sử dụng màn hình này để chia đội thi đấu tính điểm lấy thưởng.",
                ],
                btnLabel: "Mở Đấu Trường Trắc Nghiệm",
              },
              {
                tabId: "khkt" as NavTab,
                title: "8. Phân Hệ Ươm Mầm KHKT & Olympic (KHKT Mentor)",
                role: "Bệ phóng nghiên cứu khoa học kỹ thuật ViSEF bám sát thế mạnh nông nghiệp Tây Ninh",
                howToUse: [
                  "Cung cấp 6 đề tài KHKT mẫu xuất sắc gắn với địa phương: Màng bọc sinh học từ củ mì Tây Ninh, Tinh dầu sả diệt khuẩn, Chất chỉ thị pH từ vỏ thanh long...",
                  "Mỗi đề tài có đầy đủ 5 phần: Vấn đề thực tế, Giả thuyết khoa học, Nguyên liệu địa phương, Quy trình thực nghiệm, Sản phẩm dự kiến.",
                  "Học sinh có thể nhập ý tưởng riêng của mình và nhấn 'Hỏi Trợ lý AI' để nhận đề cương nghiên cứu chuẩn thi KHKT cấp tỉnh.",
                  "Nút 'Tải Đề Cương Dự Án (.doc)' cho phép xuất văn bản hoàn chỉnh để nộp ban tổ chức.",
                ],
                btnLabel: "Mở Ươm Mầm KHKT",
              },
              {
                tabId: "fair" as NavTab,
                title: "9. Phân Hệ Ngày Hội Khoa Học Tháng 5 (STEM Fair)",
                role: "Kịch bản và 6 gian hàng trải nghiệm mở rộng cho ngày hội toàn trường",
                howToUse: [
                  "Chi tiết 6 gian hàng trải nghiệm: Quán trà đổi màu Anthocyanin, Trạm làm xà phòng hữu cơ, Xưởng màng bọc củ mì, Đấu trường tên lửa mini...",
                  "Cung cấp danh mục vật tư cần chuẩn bị, poster trưng bày và hướng dẫn thuyết minh cho học sinh phụ trách gian hàng.",
                  "Giúp quản trị viên dễ dàng lập kế hoạch trình Ban Giám hiệu tổ chức ngày hội STEM cuối năm.",
                ],
                btnLabel: "Mở Ngày Hội Tháng 5",
              },
              {
                tabId: "plan" as NavTab,
                title: "10. Phân Hệ Văn Bản Kế Hoạch Năm (Official Plan KH-CLBHH)",
                role: "Cơ sở pháp lý, quyết định phê duyệt và kế hoạch hoạt động chính thức của nhà trường",
                howToUse: [
                  "Hiển thị toàn văn Kế hoạch số 08/KH-CLBHH được Ban Giám hiệu trường THCS Lý Tự Trọng phê duyệt.",
                  "Gồm đầy đủ: Mục đích yêu cầu, Cơ cấu Ban chủ nhiệm, Tiêu chuẩn hội viên, Nội dung & Lịch trình sinh hoạt, Dự trù kinh phí.",
                  "Nút 'In văn bản chính thức' hỗ trợ xuất bản in chuẩn hành chính giáo dục để lưu hồ sơ thanh tra chuyên môn.",
                ],
                btnLabel: "Mở Kế Hoạch Năm",
              },
            ].map((mod, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 hover:border-emerald-400 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      {mod.title}
                    </h4>
                    <p className="text-xs text-emerald-800 font-medium mt-0.5">{mod.role}</p>
                  </div>
                  <button
                    onClick={() => setActiveTab(mod.tabId)}
                    className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5 border border-emerald-200 transition-colors cursor-pointer"
                  >
                    <span>{mod.btnLabel}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1.5 text-xs text-slate-650">
                  <p className="font-semibold text-slate-800">Hướng dẫn thao tác cho Quản trị viên:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    {mod.howToUse.map((item, itemIdx) => (
                      <li key={itemIdx} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: INTERACTIVE CHECKLIST */}
      {activeSubTab === "checklist" && (
        <div className="space-y-6">
          {/* Progress Overview */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-emerald-700" />
                  Bảng Kiểm Checklist Vận Hành Buổi Sinh Hoạt
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Đánh dấu từng mục hoàn thành để đảm bảo buổi sinh hoạt CLB diễn ra trôi chảy, an toàn và hấp dẫn nhất.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleResetChecklist}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 text-xs font-semibold flex items-center gap-1.5 border border-slate-200 transition-colors cursor-pointer"
                  title="Đặt lại bảng kiểm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Đặt lại checklist</span>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700">Mức độ hoàn tất chuẩn bị:</span>
                <span className="text-emerald-800">{completedCount}/{totalChecklist} mục ({completionPercent}%)</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div 
                  className="h-full bg-linear-to-r from-teal-500 to-emerald-600 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Checklist Sections */}
          <div className="space-y-6">
            {/* Nhóm 1: Trước buổi sinh hoạt */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-black text-amber-900 bg-amber-50 px-3.5 py-2 rounded-xl border border-amber-200">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>GIAI ĐOẠN 1: TRƯỚC BUỔI SINH HOẠT (Chuẩn bị thiết bị & phòng Lab)</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {DEFAULT_CHECKLIST_ITEMS.filter(item => item.category === "before").map((item) => {
                  const isChecked = Boolean(checkedIds[item.id]);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isChecked 
                          ? "bg-emerald-50/60 border-emerald-300 text-emerald-950" 
                          : "bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-2xs"
                      }`}
                    >
                      <button type="button" className="mt-0.5 shrink-0">
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 text-emerald-700" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400" />
                        )}
                      </button>
                      <div className="space-y-1 text-xs sm:text-sm">
                        <div className={`font-bold ${isChecked ? "line-through text-emerald-900 opacity-80" : "text-slate-900"}`}>
                          {item.label}
                        </div>
                        <p className={`text-xs ${isChecked ? "text-emerald-800 opacity-70" : "text-slate-500"}`}>
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Nhóm 2: Trong buổi sinh hoạt */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-black text-blue-900 bg-blue-50 px-3.5 py-2 rounded-xl border border-blue-200">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>GIAI ĐOẠN 2: TRONG BUỔI SINH HOẠT (Tương tác, thực hành & ghi chép)</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {DEFAULT_CHECKLIST_ITEMS.filter(item => item.category === "during").map((item) => {
                  const isChecked = Boolean(checkedIds[item.id]);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isChecked 
                          ? "bg-emerald-50/60 border-emerald-300 text-emerald-950" 
                          : "bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-2xs"
                      }`}
                    >
                      <button type="button" className="mt-0.5 shrink-0">
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 text-emerald-700" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400" />
                        )}
                      </button>
                      <div className="space-y-1 text-xs sm:text-sm">
                        <div className={`font-bold ${isChecked ? "line-through text-emerald-900 opacity-80" : "text-slate-900"}`}>
                          {item.label}
                        </div>
                        <p className={`text-xs ${isChecked ? "text-emerald-800 opacity-70" : "text-slate-500"}`}>
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Nhóm 3: Sau buổi sinh hoạt */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-black text-purple-900 bg-purple-50 px-3.5 py-2 rounded-xl border border-purple-200">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>GIAI ĐOẠN 3: SAU BUỔI SINH HOẠT (Đánh giá, KHKT & Vệ sinh an toàn)</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {DEFAULT_CHECKLIST_ITEMS.filter(item => item.category === "after").map((item) => {
                  const isChecked = Boolean(checkedIds[item.id]);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isChecked 
                          ? "bg-emerald-50/60 border-emerald-300 text-emerald-950" 
                          : "bg-white border-slate-200 text-slate-800 hover:border-slate-300 shadow-2xs"
                      }`}
                    >
                      <button type="button" className="mt-0.5 shrink-0">
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 text-emerald-700" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400" />
                        )}
                      </button>
                      <div className="space-y-1 text-xs sm:text-sm">
                        <div className={`font-bold ${isChecked ? "line-through text-emerald-900 opacity-80" : "text-slate-900"}`}>
                          {item.label}
                        </div>
                        <p className={`text-xs ${isChecked ? "text-emerald-800 opacity-70" : "text-slate-500"}`}>
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 9-MONTH SCENARIOS */}
      {activeSubTab === "scenarios" && (
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs sm:text-sm text-emerald-900">
            <p className="font-bold mb-1">Kịch Bản Sinh Hoạt Thực Chiến 9 Tháng Năm Học 2026 – 2027:</p>
            Dưới đây là kịch bản mẫu chi tiết từng tháng giúp bất kỳ giáo viên hoặc quản trị viên nào cũng có thể cầm trịch buổi sinh hoạt hoàn hảo.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                month: "Tháng 9/2026",
                theme: "Khởi Động & Phép Màu Biến Đổi Chất",
                grade: "Khối 7 & Đại trà",
                appScreen: "Virtual Lab (Núi Lửa NaHCO₃) & Đấu Trường Hoá Học",
                experiment: "Núi lửa mini sủi bọt (Giấm + NaHCO₃) và đổi màu hoa giấy.",
                keyDiscussion: "Khác biệt giữa hiện tượng vật lý và hiện tượng hoá học?",
              },
              {
                month: "Tháng 10/2026",
                theme: "Bảng Tuần Hoàn Diệu Kỳ & Thế Giới Nguyên Tử",
                grade: "Bám KNTT Lớp 7",
                appScreen: "Virtual Lab (Mô hình nguyên tử) & Trợ lý AI",
                experiment: "Chế tạo mô hình nguyên tử 3D từ đất nặn và que tăm.",
                keyDiscussion: "Nguyên tử khối, số hạt proton, electron và ý nghĩa ô nguyên tố.",
              },
              {
                month: "Tháng 11/2026",
                theme: "Thế Giới Đa Sắc Của Axit – Bazơ & pH",
                grade: "Bám KNTT Lớp 8",
                appScreen: "Virtual Lab (Chỉ thị bắp cải tím) & KHKT Mentor",
                experiment: "Chiết sắc tố Anthocyanin bắp cải tím thử nước chanh, xà phòng, baking soda.",
                keyDiscussion: "Thang đo pH trong đời sống, độ chua đất trồng mãng cầu Tây Ninh.",
              },
              {
                month: "Tháng 12/2026",
                theme: "Ăn Mòn Kim Loại & Phòng Chống Gỉ Sét",
                grade: "Bám KNTT Lớp 9",
                appScreen: "Virtual Lab (Gỉ sắt) & Lab Journal",
                experiment: "Khảo sát đinh sắt trong 4 môi trường (nước cất, nước muối, không khí khô, dầu ăn).",
                keyDiscussion: "Phương pháp bảo vệ cầu cống, xe đạp và đồ dùng kim loại trong gia đình.",
              },
              {
                month: "Tháng 01/2027",
                theme: "Hoá Học Ẩm Thực Ngày Tết – Lên Men Lactic",
                grade: "Khối 8 - 9",
                appScreen: "Trợ Lý AI Cô Dương & Lab Journal",
                experiment: "Quy trình muối dưa cải chua, ngâm kiệu giòn và giải thích sinh hoá.",
                keyDiscussion: "Cơ chế vi khuẩn lactic chuyển hoá đường thành axit lactic ức chế vi khuẩn thối.",
              },
              {
                month: "Tháng 02/2027",
                theme: "Mật Thư Khoa Học & Mực Tàng Hình",
                grade: "Khối 7 - 8",
                appScreen: "Virtual Lab (Viết chữ tàng hình bằng chanh)",
                experiment: "Viết chữ bằng nước cốt chanh, hơ đèn cồn hoặc bàn là để hiện chữ nâu.",
                keyDiscussion: "Sự nhiệt phân axit citric và phản ứng hoá than của carbohydrate.",
              },
              {
                month: "Tháng 03/2027",
                theme: "Ươm Mầm Nghiên Cứu KHKT ViSEF",
                grade: "Đội tuyển HSG & KHKT",
                appScreen: "KHKT Mentor & Xuất Đề Cương",
                experiment: "Làm màng bọc phân huỷ sinh học từ tinh bột củ mì (sắn) Tây Ninh.",
                keyDiscussion: "Xác định giả thuyết khoa học, biến độc lập, biến phụ thuộc và phương sai.",
              },
              {
                month: "Tháng 04/2027",
                theme: "Vũ Điệu Phân Tử & Hoá Học Xanh (Green Chemistry)",
                grade: "Khối 8 - 9",
                appScreen: "Virtual Lab (Đèn Lava phân lớp)",
                experiment: "Làm đèn Lava mini từ dầu ăn, nước màu và viên C sủi bọt.",
                keyDiscussion: "Khối lượng riêng, tính phân cực của nước và dầu, bảo vệ môi trường nước.",
              },
              {
                month: "Tháng 05/2027",
                theme: "Ngày Hội Khoa Học STEM Fair Toàn Trường",
                grade: "Toàn trường THCS Lý Tự Trọng",
                appScreen: "Festival Booth (6 Gian hàng hội chợ)",
                experiment: "Biểu diễn 6 gian hàng khoa học, phát thưởng 'Nhà hoá học xuất sắc năm học'.",
                keyDiscussion: "Tổng kết, vinh danh học sinh và chuyển giao thế hệ CLB kế cận.",
              },
            ].map((sc, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {sc.month}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">{sc.grade}</span>
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-sm leading-snug">{sc.theme}</h4>

                  <div className="space-y-1 text-xs text-slate-650">
                    <p><strong>Màn hình ứng dụng:</strong> {sc.appScreen}</p>
                    <p><strong>Thí nghiệm trọng tâm:</strong> {sc.experiment}</p>
                    <p className="text-emerald-900 font-medium italic">"{sc.keyDiscussion}"</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Chuẩn KNTT</span>
                  <button
                    onClick={() => setActiveTab("roadmap")}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Chi tiết</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: TECH FAQ & TROUBLESHOOTING */}
      {activeSubTab === "tech_faq" && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs sm:text-sm text-amber-900 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Cẩm nang xử lý sự cố công nghệ & an toàn sư phạm:</p>
              Hệ thống được thiết kế với độ tin cậy cấp chuyên gia (Enterprise-grade), tích hợp cơ chế tự phục hồi và bộ nhớ đệm ngoại tuyến. Dưới đây là các tình huống thực tế và cách xử lý trong 30 giây.
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "1. Phòng bộ môn bị mất kết nối Internet đột ngột, ứng dụng có bị dừng hoạt động không?",
                a: "Hoàn toàn KHÔNG! Toàn bộ 5 mô phỏng của 'Phòng Thực Hành Ảo', 'Đấu Trường Hoá Học', 'Lộ Trình 9 Tháng' và 'Nhật Ký Nghiên Cứu' hoạt động 100% trên trình duyệt cục bộ (Client-side). Riêng Trợ lý AI Cô Dương đã được trang bị 'Bộ đệm Sư phạm Ngoại tuyến' (Offline Pedagogical Engine), tự động nhận diện câu hỏi và trả lời chuẩn xác ngay cả khi không có mạng Internet.",
              },
              {
                q: "2. Chiếu lên màn hình TV hoặc Máy chiếu chữ bị nhỏ, làm thế nào để cả lớp nhìn rõ?",
                a: "Chỉ cần nhấn tổ hợp phím [Ctrl] và dấu [+] trên bàn phím máy tính 2 đến 3 lần để phóng to tỷ lệ màn hình lên 125% - 150%. Giao diện ứng dụng được lập trình đáp ứng (responsive), toàn bộ biểu đồ, bình thí nghiệm và chữ sẽ tự động co giãn sắc nét mà không bị vỡ bố cục.",
              },
              {
                q: "3. Làm sao để đổi ảnh đại diện Cô Dương bằng ảnh thật của giáo viên?",
                a: "Vào tab 'Góc Cô Thuỳ Dương', bấm vào nút biểu tượng Camera ở góc dưới ảnh đại diện. Có 4 lựa chọn: (1) Tải ảnh từ máy tính (hỗ trợ JPG, PNG tự động nén dung lượng); (2) Bật Webcam chụp trực tiếp tại lớp học; (3) Dán đường link ảnh; (4) Khôi phục ảnh mặc định. Sau khi chọn, ảnh sẽ được lưu bền vững vào bộ nhớ.",
              },
              {
                q: "4. Học sinh viết bài Nhật ký thí nghiệm xong, tắt máy thì có bị mất bài không?",
                a: "Không bị mất! Mọi bài viết thu hoạch của học sinh được tự động lưu vào bộ lưu trữ trình duyệt (localStorage) với khoá 'clbhh_lab_journal_entries_2026'. Lần sau khi mở lại ứng dụng trên máy tính đó, toàn bộ danh sách bài viết vẫn còn nguyên vẹn.",
              },
              {
                q: "5. Muốn in hoặc nộp kế hoạch hoạt động CLB cho Ban Giám Hiệu nhà trường?",
                a: "Vào tab 'Kế Hoạch Năm' (Văn bản KH-CLBHH), nhấn nút 'In văn bản chính thức' (có biểu tượng Máy in) ở góc trên bên phải. Hệ thống đã chuẩn hoá lề trang A4, quốc hiệu, tiêu ngữ và chữ ký số chuẩn văn bản hành chính giáo dục.",
              },
              {
                q: "6. Quy tắc an toàn phòng chống cháy nổ khi dùng nhiệt và hoá chất đời sống?",
                a: "Tuyệt đối không dùng lửa trực tiếp gần cồn hoặc dung môi dễ cháy. Ưu tiên các phản ứng toả nhiệt nhẹ tự nhiên (như vôi sống CaO với nước hoặc sủi bọt NaHCO₃). Luôn trang bị xô cát, khăn ẩm và bình chữa cháy mini tại góc phòng thí nghiệm.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
                <h4 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-650 leading-relaxed pl-6 border-l-2 border-emerald-500">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Institutional Sign-off Footer for Guide */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center space-y-2 print:border-none">
        <div className="flex items-center justify-center gap-2">
          <TeacherAvatar size="sm" allowEdit={false} className="w-8 h-8" />
          <span className="font-extrabold text-slate-900 text-sm">
            Cô Huỳnh Thị Thuỳ Dương – Chủ nhiệm CLB Hoá Học THCS Lý Tự Trọng
          </span>
        </div>
        <p className="text-xs text-slate-500 max-w-2xl mx-auto">
          "Ứng dụng này được phát triển để trao quyền cho tất cả giáo viên và học sinh yêu khoa học. 
          Chúc thầy cô và các em có những giờ sinh hoạt câu lạc bộ bùng nổ đam mê, an toàn và gặt hái nhiều thành tích rực rỡ!"
        </p>
        <div className="pt-2 flex justify-center gap-3 text-xs">
          <button
            onClick={() => setActiveTab("cover")}
            className="text-emerald-800 font-bold hover:underline"
          >
            Về Trang Chủ CLB
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={() => setActiveTab("plan")}
            className="text-emerald-800 font-bold hover:underline"
          >
            Văn Bản Kế Hoạch Năm
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={() => setActiveTab("teacher")}
            className="text-emerald-800 font-bold hover:underline"
          >
            Góc Cô Thuỳ Dương
          </button>
        </div>
      </div>
    </div>
  );
};
