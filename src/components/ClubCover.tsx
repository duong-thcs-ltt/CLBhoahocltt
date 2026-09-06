import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  FlaskConical, 
  Heart, 
  Flame, 
  Award, 
  ArrowRight, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  Compass, 
  Lightbulb, 
  Atom, 
  Share2, 
  Printer, 
  CheckCircle2, 
  Quote,
  Plus,
  Settings2,
  X,
  Upload,
  Camera,
  RotateCcw
} from "lucide-react";
import { NavTab } from "./Navbar";
import { TeacherAvatar } from "./TeacherAvatar";

interface ClubCoverProps {
  setActiveTab: (tab: NavTab) => void;
  onAskAI?: (topic: string) => void;
}

const DEFAULT_CLASSES = ["6A1", "6A2", "7A1", "7A2", "8A1", "8A2", "9A1", "9A2"];

export const ClubCover: React.FC<ClubCoverProps> = ({ setActiveTab, onAskAI }) => {
  const [studentName, setStudentName] = useState("");
  
  const [classList, setClassList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("clb_custom_class_list");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return DEFAULT_CLASSES;
  });

  const [studentClass, setStudentClass] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("clb_custom_class_list");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
      }
    } catch {}
    return "8A1";
  });

  const [isManagingClasses, setIsManagingClasses] = useState(false);
  const [newClassInput, setNewClassInput] = useState("");
  const [isMemberCardCreated, setIsMemberCardCreated] = useState(false);

  const [coverImage, setCoverImage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem("clb_custom_cover_image");
      if (saved) return saved;
    } catch {}
    return "/assets/students_chemistry_lab.jpg";
  });
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/club-cover")
      .then((res) => res.json())
      .then((data) => {
        if (data?.coverUrl) {
          setCoverImage(data.coverUrl);
          try {
            localStorage.setItem("clb_custom_cover_image", data.coverUrl);
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  const processCoverFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn tệp hình ảnh (PNG, JPG, WebP)!");
      return;
    }
    setIsUploadingCover(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setCoverImage(dataUrl);
        try {
          localStorage.setItem("clb_custom_cover_image", dataUrl);
        } catch {}
        fetch("/api/club-cover", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ coverUrl: dataUrl }),
        })
          .catch((err) => console.error("Error saving cover:", err))
          .finally(() => setIsUploadingCover(false));
      } else {
        setIsUploadingCover(false);
      }
    };
    reader.onerror = () => setIsUploadingCover(false);
    reader.readAsDataURL(file);
  };

  const handleResetCover = () => {
    const defaultUrl = "/assets/students_chemistry_lab.jpg";
    setCoverImage(defaultUrl);
    try {
      localStorage.removeItem("clb_custom_cover_image");
    } catch {}
    fetch("/api/club-cover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coverUrl: defaultUrl }),
    }).catch(() => {});
  };

  const handleAddClass = () => {
    const trimmed = newClassInput.trim().toUpperCase();
    if (!trimmed) return;
    if (classList.includes(trimmed)) {
      alert(`Lớp ${trimmed} đã có trong danh sách!`);
      return;
    }
    const updated = [...classList, trimmed].sort();
    setClassList(updated);
    setStudentClass(trimmed);
    setNewClassInput("");
    try {
      localStorage.setItem("clb_custom_class_list", JSON.stringify(updated));
    } catch {}
  };

  const handleDeleteClass = (clsToDelete: string) => {
    if (classList.length <= 1) {
      alert("Cần giữ lại ít nhất một lớp trong danh sách!");
      return;
    }
    const updated = classList.filter(c => c !== clsToDelete);
    setClassList(updated);
    if (studentClass === clsToDelete) {
      setStudentClass(updated[0]);
    }
    try {
      localStorage.setItem("clb_custom_class_list", JSON.stringify(updated));
    } catch {}
  };

  const handleResetClasses = () => {
    setClassList(DEFAULT_CLASSES);
    setStudentClass(DEFAULT_CLASSES[0]);
    try {
      localStorage.setItem("clb_custom_class_list", JSON.stringify(DEFAULT_CLASSES));
    } catch {}
  };

  const inspirationalQuotes = [
    {
      author: "Marie Curie",
      role: "Nhà bác học đạt 2 giải Nobel Hoá học & Vật lí",
      quote: "Trong cuộc sống không có gì đáng sợ, chỉ có những điều cần được thấu hiểu. Bây giờ chính là lúc chúng ta cần hiểu nhiều hơn để bớt sợ hãi hơn.",
    },
    {
      author: "Cô Huỳnh Thị Thuỳ Dương",
      role: 'Chủ nhiệm CLB Hoá học "Hạt Mầm Khoa Học" – Trường THCS Lý Tự Trọng',
      quote: "Mỗi giọt dung dịch đổi màu, mỗi bọt khí trào dâng trong ống nghiệm không chỉ là phản ứng hoá học, mà chính là ngọn lửa đam mê đang bừng sáng trong tâm hồn mỗi học sinh THCS Lý Tự Trọng.",
    },
    {
      author: "Dmitri Mendeleev",
      role: "Người sáng lập Bảng tuần hoàn các nguyên tố hoá học",
      quote: "Khoa học bắt đầu từ những điều giản dị quanh ta, từ ngọn lửa, giọt nước, hạt muối... Hãy quan sát bằng đôi mắt tò mò và trái tim kiên trì.",
    },
  ];

  const corePillars = [
    {
      icon: Flame,
      color: "from-rose-500 to-amber-500",
      textColor: "text-rose-600",
      bgLight: "bg-rose-50",
      borderColor: "border-rose-200",
      title: "Thắp Sáng Đam Mê",
      desc: "Biến những công thức khô khan thành niềm vui bất tận qua thí nghiệm trực quan sinh động và hiện tượng kỳ thú.",
    },
    {
      icon: ShieldCheck,
      color: "from-emerald-500 to-teal-500",
      textColor: "text-emerald-600",
      bgLight: "bg-emerald-50",
      borderColor: "border-emerald-200",
      title: "An Toàn Là Trên Hết",
      desc: "Rèn luyện tác phong khoa học chuẩn mực: mang kính bảo hộ, găng tay, tuân thủ nghiêm ngặt quy tắc phòng thí nghiệm.",
    },
    {
      icon: Lightbulb,
      color: "from-amber-500 to-yellow-500",
      textColor: "text-amber-600",
      bgLight: "bg-amber-50",
      borderColor: "border-amber-200",
      title: "Tư Duy Khám Phá KNTT",
      desc: "Học đi đôi với hành theo bộ sách Kết nối tri thức, giải mã bí mật trong gian bếp và tự nhiên quê hương Tây Ninh.",
    },
    {
      icon: Compass,
      color: "from-blue-500 to-indigo-500",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50",
      borderColor: "border-blue-200",
      title: "Ươm Mầm Tài Năng ViSEF",
      desc: "Khởi nguồn cho các dự án Khoa học Kỹ thuật và bồi dưỡng thế hệ học sinh giỏi Hoá học tương lai.",
    },
  ];

  return (
    <div id="club-cover-page" className="w-full">
      {/* 1. HERO COVER BANNER SECTION */}
      <section className="relative overflow-hidden bg-linear-to-b from-slate-900 via-emerald-950 to-teal-950 text-white border-b-4 border-amber-400">
        {/* Background Decorative Pattern & Glows */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-red-600 rounded-full blur-3xl opacity-40" />
        </div>

        {/* Top Official Banner Header */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-6 pb-2">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-linear-to-r from-red-600/90 via-red-500/90 to-amber-500/90 border border-amber-300/40 text-white text-xs sm:text-sm font-semibold shadow-lg">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-300 animate-ping" />
            <span>TRƯỜNG THCS LÝ TỰ TRỌNG</span>
            <span className="text-amber-200 font-normal">|</span>
            <span className="text-yellow-200">TÂY NINH</span>
          </div>
        </div>

        {/* Hero Content Grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Big Title & Passion Message */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
                <Atom className="w-4 h-4 text-emerald-300 animate-spin" style={{ animationDuration: "8s" }} />
                Năm học 2026 – 2027
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                CÂU LẠC BỘ HOÁ HỌC
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-amber-300 via-yellow-200 to-emerald-300 mt-1">
                  "HẠT MẦM KHOA HỌC"
                </span>
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/90 font-medium">
                Trường THCS Lý Tự Trọng – Phường Long Hoa, Tỉnh Tây Ninh
              </p>
            </div>

            {/* Inspiring Passion Message Quote Box */}
            <div className="relative p-5 sm:p-6 rounded-2xl bg-linear-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/15 shadow-2xl text-left">
              <Quote className="w-8 h-8 text-amber-300/40 mb-2" />
              <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed">
                "Khăn quàng đỏ thắm trên vai, ngọn lửa đam mê trong tim. Mỗi ống nghiệm là một chân trời mở lối, mỗi phản ứng là bài học diệu kỳ của cuộc sống. Hãy cùng nhau tự tin khám phá, nuôi dưỡng ước mơ trở thành những nhà khoa học phụng sự quê hương đất nước!"
              </p>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <TeacherAvatar size="sm" allowEdit={false} className="w-6 h-6" />
                  <span className="font-bold text-amber-300">Cô Huỳnh Thị Thuỳ Dương</span>
                  <span className="text-slate-300">– Chủ nhiệm CLB "Hạt Mầm Khoa Học"</span>
                </div>
                <span className="text-emerald-300 font-semibold italic">
                  "Khoa học bắt đầu từ lòng tò mò trong trẻo"
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composite - Students in Red Scarves Doing Chemistry Experiments */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Card with Gold Rim */}
              <div className="relative rounded-3xl p-3 bg-linear-to-br from-amber-400 via-red-500 to-emerald-500 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 border-2 border-white/20">
                  {/* Real-world photograph of students practicing chemistry experiment in school lab */}
                  <div 
                    className={`relative h-72 sm:h-80 w-full overflow-hidden group transition-all duration-300 ${
                      isDragOver ? "ring-4 ring-amber-400 ring-inset" : ""
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragOver(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) processCoverFile(file);
                    }}
                  >
                    <img 
                      src={coverImage} 
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "https://images.pexels.com/photos/5427681/pexels-photo-5427681.jpeg?auto=compress&cs=tinysrgb&w=1200";
                      }}
                      alt="Học sinh THCS đeo kính bảo hộ thực hành thí nghiệm hoá học tại phòng Lab trường học"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Gradient Overlay for Rich Dramatic Look */}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />

                    {/* Drag-over Prompt Overlay */}
                    {isDragOver && (
                      <div className="absolute inset-0 z-30 bg-emerald-950/85 backdrop-blur-sm flex flex-col items-center justify-center text-amber-300 font-bold p-4 text-center animate-fade-in border-2 border-dashed border-amber-400">
                        <Upload className="w-8 h-8 mb-2 animate-bounce" />
                        <span className="text-sm">Thả tệp ảnh vào đây để cập nhật ảnh bìa CLB!</span>
                      </div>
                    )}

                    {/* Top Left: Interactive Upload / Replace Image Button */}
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
                      <label
                        htmlFor="clb-cover-file-input"
                        className="px-2.5 py-1 rounded-full bg-slate-950/85 hover:bg-slate-900 text-amber-300 hover:text-amber-200 border border-amber-400/50 text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer backdrop-blur shadow-md hover:scale-105 active:scale-95 transition-all"
                        title="Tải ảnh học sinh thực hành thí nghiệm lên làm ảnh bìa CLB"
                      >
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>{isUploadingCover ? "Đang lưu..." : "Đổi ảnh bìa"}</span>
                        <input 
                          id="clb-cover-file-input"
                          ref={fileInputRef}
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) processCoverFile(file);
                          }}
                        />
                      </label>

                      {coverImage !== "/assets/students_chemistry_lab.jpg" && (
                        <button
                          type="button"
                          onClick={handleResetCover}
                          className="p-1.5 rounded-full bg-slate-950/80 hover:bg-red-950 text-slate-300 hover:text-red-300 border border-white/20 hover:border-red-400/40 text-[10px] backdrop-blur shadow-md transition-all cursor-pointer"
                          title="Đặt lại ảnh bìa mặc định"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Top Right Badge: Thực hành Thí nghiệm Hoá học Lab */}
                    <div className="absolute top-3 right-3 bg-emerald-950/85 backdrop-blur text-emerald-300 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-emerald-400/50 flex items-center gap-1.5 shadow-md z-10">
                      <FlaskConical className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span>Thực hành Lab KHTN</span>
                    </div>

                    {/* Bottom Caption on Image */}
                    <div className="absolute bottom-3 inset-x-3 text-white pointer-events-none">
                      <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Thực hành trực quan – Khám phá hiện tượng</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-100 font-medium leading-snug">
                        Học sinh THCS Lý Tự Trọng đeo kính bảo hộ, trực tiếp thực hành thí nghiệm đổi màu dung dịch và theo dõi phản ứng hoá học kỳ diệu tại phòng Lab.
                      </p>
                    </div>
                  </div>

                  {/* Student Vignettes & Badges */}
                  <div className="p-4 bg-linear-to-b from-slate-900 to-emerald-950 border-t border-white/10 space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                        <span className="block text-amber-400 font-bold text-sm">100%</span>
                        <span className="text-slate-300 text-[11px]">Thực hành an toàn</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                        <span className="block text-emerald-400 font-bold text-sm">9 Tháng</span>
                        <span className="text-slate-300 text-[11px]">Lộ trình KNTT</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                        <span className="block text-cyan-400 font-bold text-sm">Khối 6-9</span>
                        <span className="text-slate-300 text-[11px]">THCS Lý Tự Trọng</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                      <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
                        <Award className="w-4 h-4 text-amber-400" />
                        Huy hiệu Nhà Khoa Học Trẻ
                      </span>
                      <span className="text-[11px] text-emerald-300">
                        Phường Long Hoa, Tây Ninh
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INSPIRATIONAL PHOTO MOSAIC: CÁC EM HỌC SINH THCS SAY MÊ THÍ NGHIỆM */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold tracking-wide uppercase mb-2">
              Khoảnh Khắc Đẹp Của Tuổi Thơ Khám Phá
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Khăn Quàng Đỏ Thắm – Say Mê Cùng Những Ống Nghiệm Sắc Màu
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Mỗi buổi chiều sinh hoạt tại phòng thí nghiệm trường THCS Lý Tự Trọng là một chuyến phiêu lưu khoa học kỳ thú. Ở đó, các em cùng nhau đặt giả thuyết, tự tay phối trộn hoá chất và vỡ oà niềm vui khi quan sát hiện tượng đổi màu, kết tủa hay sủi bọt khí.
            </p>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Thí nghiệm đổi màu chỉ thị tự nhiên */}
            <div className="group rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col">
              <div className="relative h-52 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80" 
                  alt="Thí nghiệm dung dịch đổi màu chỉ thị pH tự nhiên bắp cải tím"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                  Tháng 9 • Khối 8
                </div>
                <div className="absolute bottom-2 right-2 bg-slate-950/70 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded-md">
                  Chỉ thị bắp cải tím
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                    Sắc Màu Kỳ Diệu Của Thiên Nhiên
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Đeo chiếc khăn quàng đỏ thân thương, các em háo hức quan sát nước bắp cải tím chuyển từ màu tím sang hồng cánh sen rực rỡ khi chạm vào giấm chanh, và xanh lục biếc khi gặp xà phòng.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
                  <span>Khám phá Axit - Bazơ</span>
                  <button 
                    onClick={() => onAskAI ? onAskAI("Giải thích hiện tượng đổi màu của bắp cải tím trong môi trường axit bazơ") : setActiveTab("ai_assistant")}
                    className="text-emerald-600 hover:text-emerald-800 underline cursor-pointer"
                  >
                    Hỏi Cô Dương →
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Đội viên THCS Chăm ngoan - Sáng tạo */}
            <div className="group rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col">
              <div className="relative h-52 overflow-hidden">
                <img 
                  src="/assets/nu_sinh_thcs_khan_quang_do.jpg" 
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/commons/2/27/THCS_Hoangvanthu.jpg";
                  }}
                  alt="Nữ sinh THCS Việt Nam đeo khăn quàng đỏ chăm ngoan học giỏi"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                  Đội viên Tiêu biểu • Khăn quàng đỏ
                </div>
                <div className="absolute bottom-2 right-2 bg-slate-950/70 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded-md">
                  THCS Lý Tự Trọng
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-700 transition-colors">
                    Đội Viên Khăn Quàng Đỏ – Say Mê Sáng Tạo
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Khăn quàng đỏ thắm trên vai, các em học sinh THCS luôn hăng hái thi đua học tập tốt, tích cực tham gia nghiên cứu và thực hành thí nghiệm hoá học với tinh thần Đội viên gương mẫu.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-amber-700 font-semibold">
                  <span>Học sinh giỏi KHTN</span>
                  <button 
                    onClick={() => setActiveTab("virtual_lab")}
                    className="text-amber-600 hover:text-amber-800 underline cursor-pointer"
                  >
                    Vào phòng Lab →
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Nghiên cứu KHKT ViSEF gắn với Tây Ninh */}
            <div className="group rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col">
              <div className="relative h-52 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80" 
                  alt="Nuôi dưỡng ý tưởng sáng tạo khoa học kỹ thuật trẻ"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                  Ươm mầm ViSEF • KHKT
                </div>
                <div className="absolute bottom-2 right-2 bg-slate-950/70 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded-md">
                  Nông sản Tây Ninh
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition-colors">
                    Từ Bàn Thí Nghiệm Đến Ước Mơ Nhà Khoa Học
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Tận dụng củ mì (sắn), vỏ mãng cầu Bà Đen và muối ớt Tây Ninh để chế tạo màng sinh học và chất khử khuẩn hữu cơ. Hoá học trở thành công cụ đắc lực giải quyết bài toán môi trường thực tế.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-blue-700 font-semibold">
                  <span>Ý tưởng sáng tạo</span>
                  <button 
                    onClick={() => setActiveTab("khkt")}
                    className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
                  >
                    Xem dự án KHKT →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 4 TRỤ CỘT ĐAM MÊ HOÁ HỌC (CORE PILLARS) */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-full">
              Giá Trị Cốt Lõi Của CLB
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Bốn Trụ Cột Nuôi Dưỡng Ngọn Lửa Khoa Học
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Chúng tôi không chỉ dạy hoá học, chúng tôi truyền cảm hứng để các em nhìn thế giới bằng con mắt của sự thấu hiểu và lòng nhân ái.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {corePillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-2xl bg-white border ${pillar.borderColor} shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between`}
                >
                  <div className="space-y-3">
                    <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${pillar.color} text-white flex items-center justify-center shadow-md`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className={`font-bold text-base ${pillar.textColor}`}>
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-500">
                    <span>Mục tiêu #{idx + 1}</span>
                    <CheckCircle2 className="w-4 h-4 ml-auto text-emerald-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CHÂM NGÔN & LỜI DẶN TỪ CÔ HUỲNH THỊ THUỲ DƯƠNG */}
      <section className="py-12 bg-linear-to-br from-emerald-900 via-teal-900 to-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Quotes Carousel / Display */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Lời Dẫn Đường Tinh Thần</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                "Hoá học là chiếc cầu nối giữa trí tưởng tượng kỳ diệu và thực tiễn đời sống"
              </h2>

              <div className="space-y-4">
                {inspirationalQuotes.map((q, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-1.5"
                  >
                    <p className="text-xs sm:text-sm text-slate-200 italic font-normal leading-relaxed">
                      "{q.quote}"
                    </p>
                    <div className="flex items-center justify-between text-xs pt-1 text-amber-300 font-semibold">
                      <span>— {q.author}</span>
                      <span className="text-slate-400 font-normal text-[11px]">{q.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Interactive Member Badge Creator */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl p-6 bg-linear-to-b from-white/10 to-white/5 border border-white/20 backdrop-blur-md shadow-2xl space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold shadow-md">
                    🇻🇳
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Thẻ Thành Viên Danh Dự</h3>
                    <p className="text-xs text-emerald-200">CLB Hoá Học "Hạt Mầm Khoa Học" – THCS Lý Tự Trọng</p>
                  </div>
                </div>

                {!isMemberCardCreated ? (
                  <div className="space-y-3.5 pt-1">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Họ và tên học sinh:
                      </label>
                      <input 
                        type="text" 
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Ví dụ: Nguyễn Minh Thư"
                        className="w-full px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-medium text-slate-300">
                            Lớp:
                          </label>
                          <button
                            type="button"
                            onClick={() => setIsManagingClasses(!isManagingClasses)}
                            className="text-[11px] text-amber-300 hover:text-amber-200 underline cursor-pointer flex items-center gap-1"
                            title="Thêm hoặc xoá lớp"
                          >
                            <Settings2 className="w-3 h-3" />
                            <span>{isManagingClasses ? "Đóng" : "Thêm/Xoá"}</span>
                          </button>
                        </div>
                        <select 
                          value={studentClass}
                          onChange={(e) => setStudentClass(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                        >
                          {classList.map((cls) => (
                            <option key={cls} value={cls}>
                              Lớp {cls}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Huy hiệu cam kết:
                        </label>
                        <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-amber-300 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>An toàn & Đam mê</span>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Class Management Panel */}
                    {isManagingClasses && (
                      <div className="p-3.5 rounded-2xl bg-slate-900/95 border border-amber-400/40 text-xs space-y-3 animate-fade-in shadow-xl backdrop-blur-md">
                        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                          <span className="font-bold text-amber-300 flex items-center gap-1.5">
                            <Settings2 className="w-3.5 h-3.5 text-amber-400" />
                            Quản lý danh sách Lớp
                          </span>
                          <button
                            type="button"
                            onClick={handleResetClasses}
                            className="text-[10px] text-slate-400 hover:text-amber-200 underline cursor-pointer"
                          >
                            Đặt lại mặc định
                          </button>
                        </div>

                        {/* Add new class form */}
                        <div className="flex items-center gap-2">
                          <input 
                            type="text"
                            value={newClassInput}
                            onChange={(e) => setNewClassInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddClass();
                              }
                            }}
                            placeholder="Nhập tên lớp (VD: 8A3, 7/1...)"
                            className="flex-1 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-1 focus:ring-amber-400 uppercase"
                          />
                          <button
                            type="button"
                            onClick={handleAddClass}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Thêm</span>
                          </button>
                        </div>

                        {/* Class chips with delete */}
                        <div className="space-y-1.5">
                          <div className="text-[11px] text-slate-300 flex items-center justify-between">
                            <span>Danh sách lớp hiện có ({classList.length}):</span>
                            <span className="text-[10px] text-slate-400">Nhấp × để xoá</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                            {classList.map((cls) => (
                              <span 
                                key={cls}
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                                  studentClass === cls 
                                    ? "bg-amber-400 text-slate-950 ring-2 ring-amber-300" 
                                    : "bg-white/10 text-slate-200 border border-white/15 hover:bg-white/15"
                                }`}
                              >
                                <span onClick={() => setStudentClass(cls)} className="cursor-pointer">
                                  Lớp {cls}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteClass(cls)}
                                  title={`Xoá lớp ${cls}`}
                                  className="w-4 h-4 rounded-full hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-slate-400"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        if (!studentName.trim()) {
                          alert("Em hãy nhập họ tên để tạo thẻ thành viên danh dự nhé!");
                          return;
                        }
                        setIsMemberCardCreated(true);
                      }}
                      className="w-full py-2.5 rounded-xl bg-linear-to-r from-red-600 via-amber-500 to-emerald-600 text-white font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Nhận Thẻ Thành Viên CLB</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-linear-to-br from-amber-500/20 via-red-500/10 to-emerald-500/20 border-2 border-amber-300/40 text-center space-y-3 animate-fade-in">
                    <div className="inline-block px-3 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider">
                      ★ THÀNH VIÊN TIÊU BIỂU CLB "HẠT MẦM KHOA HỌC" ★
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-black text-amber-300 tracking-wide">
                        {studentName.toUpperCase()}
                      </h4>
                      <p className="text-xs text-slate-200">
                        Chi đội: <strong>{studentClass}</strong> • Trường THCS Lý Tự Trọng
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-black/30 text-xs text-emerald-200 italic">
                      "Lời hứa Đội viên: Đeo khăn quàng đỏ thắm – Học tập chăm ngoan – Giữ an toàn thí nghiệm – Thắp sáng ước mơ khoa học!"
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-1 text-xs">
                      <button
                        onClick={() => window.print()}
                        className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white font-medium flex items-center gap-1.5 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>In Thẻ</span>
                      </button>
                      <button
                        onClick={() => setIsMemberCardCreated(false)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 font-medium cursor-pointer"
                      >
                        Đổi tên khác
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. QUICK NAVIGATION HUB */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-bold text-slate-900 text-lg">
                Sẵn Sàng Cho Cuộc Hành Trình Khám Phá Hoá Học?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Lựa chọn chuyên mục em yêu thích để bắt đầu học tập và thực hành ngay hôm nay!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={() => setActiveTab("roadmap")}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
              >
                📅 9 Tháng KNTT
              </button>
              <button
                onClick={() => setActiveTab("virtual_lab")}
                className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
              >
                🧪 Phòng Lab Ảo
              </button>
              <button
                onClick={() => setActiveTab("ai_assistant")}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-xs"
              >
                ✨ Trợ Lý AI Cô Dương
              </button>
              <button
                onClick={() => setActiveTab("journal")}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
              >
                📖 Sổ Tay KHKT
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
