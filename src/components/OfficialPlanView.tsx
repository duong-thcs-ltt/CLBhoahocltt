import React, { useState } from "react";
import { ROADMAP_DATA } from "../data/curriculumData";
import { Printer, Copy, Check, FileText, ChevronRight, Award, ShieldCheck, Users, Calendar } from "lucide-react";
import { NavTab } from "./Navbar";

interface OfficialPlanViewProps {
  onNavigateMonth?: (monthId: string) => void;
  setActiveTab: (tab: NavTab) => void;
}

export const OfficialPlanView: React.FC<OfficialPlanViewProps> = ({ setActiveTab }) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const planText = `TỔ KHOA HỌC TỰ NHIÊN - TRƯỜNG THCS LÝ TỰ TRỌNG
KẾ HOẠCH TỔ CHỨC CÂU LẠC BỘ HOÁ HỌC NĂM HỌC 2026 - 2027
Chủ nhiệm: Cô Huỳnh Thị Thùy Dương
Quy mô: 30-40 học sinh khối 7, 8, 9 (Sách Kết nối tri thức)
Thời gian: Tháng 9/2026 đến Tháng 5/2027 (9 buổi sinh hoạt trực tiếp + Ngày hội tháng 5)`;
    navigator.clipboard.writeText(planText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              Văn Bản Kế Hoạch Số .../KH-CLBHH
            </h2>
            <p className="text-xs text-slate-500">
              Phê duyệt chính thức bởi Ban Giám Hiệu Trường THCS Lý Tự Trọng – Tây Ninh
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Đã sao chép!" : "Sao chép tóm tắt"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In văn bản / Xuất PDF</span>
          </button>
        </div>
      </div>

      {/* Official Document Paper Container */}
      <div className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-12 shadow-sm print:border-none print:shadow-none print:p-0">
        {/* Document Header Standard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-200 text-center">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 uppercase tracking-wider">
              TRƯỜNG THCS LÝ TỰ TRỌNG
            </p>
            <p className="text-xs sm:text-sm font-bold text-slate-900 uppercase underline decoration-1 underline-offset-4">
              TỔ KHOA HỌC TỰ NHIÊN
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Số: ...../KH-CLBHH
            </p>
          </div>

          <div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 uppercase">
              CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 underline decoration-1 underline-offset-4">
              Độc lập – Tự do – Hạnh phúc
            </p>
            <p className="text-xs text-slate-500 italic mt-2">
              Tây Ninh, ngày ..... tháng ..... năm 2026
            </p>
          </div>
        </div>

        {/* Document Title */}
        <div className="text-center py-6 space-y-1.5">
          <h1 className="text-lg sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
            KẾ HOẠCH
          </h1>
          <p className="text-sm sm:text-base font-bold text-emerald-900 uppercase">
            TỔ CHỨC CÂU LẠC BỘ HOÁ HỌC NĂM HỌC 2026 – 2027
          </p>
          <p className="text-xs text-slate-500 italic">
            (Bám sát chương trình Khoa học tự nhiên – Bộ sách Kết nối tri thức với cuộc sống)
          </p>
        </div>

        {/* Highlights Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <p className="text-slate-500 text-[11px]">Chủ nhiệm CLB</p>
              <p className="font-bold text-slate-800">Cô Huỳnh Thị Thùy Dương</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
            <div>
              <p className="text-slate-500 text-[11px]">Thời gian thực hiện</p>
              <p className="font-bold text-slate-800">09/2026 – 05/2027 (9 Tháng)</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0" />
            <div>
              <p className="text-slate-500 text-[11px]">Quy mô thành viên</p>
              <p className="font-bold text-slate-800">30 – 40 Học sinh Khối 7, 8, 9</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <p className="text-slate-500 text-[11px]">Sự kiện đặc biệt</p>
              <p className="font-bold text-slate-800">Ngày hội Khám phá (Tháng 5)</p>
            </div>
          </div>
        </div>

        {/* Document Body Sections */}
        <div className="space-y-6 text-xs sm:text-sm text-slate-800 leading-relaxed pt-2">
          {/* Section I */}
          <section className="space-y-2">
            <h3 className="font-bold text-slate-950 uppercase text-xs sm:text-sm tracking-wide text-emerald-900">
              I. MỤC ĐÍCH – YÊU CẦU
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>
                Tạo sân chơi khoa học bổ ích, giúp học sinh yêu thích và đam mê môn Hoá học thông qua trải nghiệm, khám phá thực tế thay vì học thuộc, luyện đề nặng nề.
              </li>
              <li>
                Gắn kiến thức trong sách giáo khoa Kết nối tri thức (khối 7, 8, 9) với các hiện tượng, ứng dụng gần gũi trong đời sống, khơi dậy sự tò mò và tinh thần ham học hỏi, sáng tạo.
              </li>
              <li>
                Từng bước phát hiện, bồi dưỡng năng khiếu, tạo nền tảng tự nhiên hướng tới HSG, Olympic Hoá học và các dự án nghiên cứu Khoa học kỹ thuật (KHKT) trong những năm học sau.
              </li>
              <li>
                Đảm bảo an toàn tuyệt đối khi thực hành thí nghiệm; sinh hoạt CLB diễn ra vui vẻ, nhẹ nhàng, khoa học và duy trì đều đặn trong suốt năm học.
              </li>
            </ul>
          </section>

          {/* Section II */}
          <section className="space-y-2">
            <h3 className="font-bold text-slate-950 uppercase text-xs sm:text-sm tracking-wide text-emerald-900">
              II. ĐỐI TƯỢNG – QUY MÔ – CHỦ NHIỆM CLB
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>Chủ nhiệm CLB:</strong> Cô Huỳnh Thị Thùy Dương – Giáo viên Hoá học, Tổ KHTN, Trường THCS Lý Tự Trọng.</li>
              <li><strong>Đối tượng tham gia:</strong> Học sinh khối lớp 7, 8, 9 có nguyện vọng và năng lực phù hợp với môn Hoá học.</li>
              <li><strong>Số lượng:</strong> Dự kiến 30 – 40 học sinh.</li>
            </ul>
          </section>

          {/* Section III */}
          <section className="space-y-2">
            <h3 className="font-bold text-slate-950 uppercase text-xs sm:text-sm tracking-wide text-emerald-900">
              III. THỜI GIAN – HÌNH THỨC SINH HOẠT
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>Thời gian thực hiện:</strong> Từ tháng 9/2026 đến tháng 5/2027 (9 tháng), theo lộ trình chi tiết tại Mục V.</li>
              <li><strong>Định kỳ:</strong> Mỗi tháng 01 buổi sinh hoạt, nội dung theo chủ đề khám phá của từng tháng.</li>
              <li><strong>Hình thức:</strong> Sinh hoạt trực tiếp tại phòng học của nhà trường, tập trung thực hành thí nghiệm, trải nghiệm làm sản phẩm và trưng bày, chia sẻ kết quả.</li>
              <li><strong>Tổng số buổi sinh hoạt dự kiến:</strong> 09 buổi trực tiếp (mỗi tháng 01 buổi).</li>
              <li><strong>Riêng tháng 5/2027:</strong> Buổi sinh hoạt được tổ chức thành <em>"Ngày hội Khám phá Hoá học"</em> — tổng kết, trưng bày sản phẩm và trao thưởng cho cả năm học.</li>
            </ul>
          </section>

          {/* Section IV */}
          <section className="space-y-2">
            <h3 className="font-bold text-slate-950 uppercase text-xs sm:text-sm tracking-wide text-emerald-900">
              IV. NỘI DUNG SINH HOẠT TRỌNG TÂM
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>Thí nghiệm vui, an toàn, dễ thực hiện để minh hoạ trực quan các hiện tượng hoá học gắn với nội dung SGK Kết nối tri thức.</li>
              <li>Dự án nhỏ khám phá ứng dụng hoá học trong đời sống: ẩm thực, sức khoẻ, môi trường, công nghệ.</li>
              <li>Trò chơi, đố vui khoa học, kể chuyện về lịch sử hoá học và các nhà khoa học nổi tiếng.</li>
              <li>Hoạt động trải nghiệm STEM, tự tay làm sản phẩm liên quan hoá học (giấy quỳ tự nhiên, xà phòng, slime an toàn, pin chanh...).</li>
              <li>Khơi gợi và nuôi dưỡng ý tưởng dự án Khoa học kỹ thuật xuất phát từ chính sự tò mò, khám phá của học sinh.</li>
            </ul>
          </section>

          {/* Section V: The Official 9-month Table */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-950 uppercase text-xs sm:text-sm tracking-wide text-emerald-900">
                V. LỘ TRÌNH SINH HOẠT THEO THÁNG (THÁNG 9/2026 – THÁNG 5/2027)
              </h3>
              <button
                onClick={() => setActiveTab("roadmap")}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 print:hidden"
              >
                <span>Xem dạng thẻ tương tác</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-300 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-emerald-800 text-white font-semibold">
                    <th className="p-3 border-r border-emerald-700 w-24">Tháng</th>
                    <th className="p-3 border-r border-emerald-700 w-44">Chủ đề khám phá</th>
                    <th className="p-3 border-r border-emerald-700">Hoạt động chính</th>
                    <th className="p-3 w-52">Sản phẩm / Kết quả</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {ROADMAP_DATA.map((item, idx) => (
                    <tr key={item.id} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                      <td className="p-3 font-bold text-slate-900 border-r border-slate-200 align-top">
                        {item.monthLabel}
                        <div className="mt-1">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                            {item.gradeBadge}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 font-semibold text-emerald-900 border-r border-slate-200 align-top">
                        {item.theme}
                      </td>
                      <td className="p-3 text-slate-700 border-r border-slate-200 align-top space-y-1">
                        {item.mainActivities.map((act, aIdx) => (
                          <p key={aIdx}>• {act}</p>
                        ))}
                      </td>
                      <td className="p-3 text-slate-800 font-medium align-top bg-emerald-50/30">
                        {item.expectedProducts}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section VI */}
          <section className="space-y-2">
            <h3 className="font-bold text-slate-950 uppercase text-xs sm:text-sm tracking-wide text-emerald-900">
              VI. ỨNG DỤNG CÔNG NGHỆ AI TRONG SINH HOẠT CLB
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>AI hỗ trợ giải thích các hiện tượng khoa học bằng ngôn ngữ gần gũi, dễ hiểu, phù hợp lứa tuổi học sinh THCS.</li>
              <li>AI gợi ý các thí nghiệm vui, an toàn, dễ chuẩn bị bằng vật liệu sẵn có, phù hợp điều kiện thực tế của trường.</li>
              <li>AI dựng hình ảnh, sơ đồ, video minh hoạ trực quan cho các khái niệm trừu tượng (nguyên tử, phân tử, phản ứng hoá học...).</li>
              <li>AI hỗ trợ trả lời các câu hỏi "Vì sao?", "Như thế nào?" mà học sinh tò mò đặt ra trong quá trình khám phá.</li>
              <li>Ứng dụng trò chơi tương tác (Kahoot/Quizizz dạng đố vui khám phá, không mang tính kiểm tra áp lực) để tạo không khí hào hứng.</li>
            </ul>
          </section>

          {/* Section VII */}
          <section className="space-y-2">
            <h3 className="font-bold text-slate-950 uppercase text-xs sm:text-sm tracking-wide text-emerald-900">
              VII. TỔ CHỨC THỰC HIỆN
            </h3>
            <div className="overflow-x-auto border border-slate-300 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 font-bold text-slate-800 border-b border-slate-300">
                    <th className="p-2.5 w-12 border-r border-slate-200">STT</th>
                    <th className="p-2.5 w-64 border-r border-slate-200">Người phụ trách</th>
                    <th className="p-2.5">Nhiệm vụ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2.5 font-bold border-r border-slate-200 text-center">1</td>
                    <td className="p-2.5 font-semibold text-slate-900 border-r border-slate-200">
                      Cô Huỳnh Thị Thùy Dương
                      <span className="block text-[11px] font-normal text-slate-500">
                        (Chủ nhiệm CLB, GV Hoá học – Tổ KHTN)
                      </span>
                    </td>
                    <td className="p-2.5 text-slate-700">
                      Xây dựng nội dung chuyên môn, trực tiếp giảng dạy/hướng dẫn, quản lý danh sách học sinh, đánh giá kết quả học tập, phụ trách chuyên đề Olympic & KHKT.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold border-r border-slate-200 text-center">2</td>
                    <td className="p-2.5 font-semibold text-slate-900 border-r border-slate-200">
                      Giáo viên tổ KHTN hỗ trợ (nếu có)
                    </td>
                    <td className="p-2.5 text-slate-700">
                      Hỗ trợ ra đề, coi thi thử, hướng dẫn thực hành thí nghiệm buổi trực tiếp cuối tháng.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold border-r border-slate-200 text-center">3</td>
                    <td className="p-2.5 font-semibold text-slate-900 border-r border-slate-200">
                      Ban Giám hiệu / Đoàn – Đội
                    </td>
                    <td className="p-2.5 text-slate-700">
                      Phê duyệt kế hoạch, bố trí phòng học buổi trực tiếp, hỗ trợ truyền thông và khen thưởng.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold border-r border-slate-200 text-center">4</td>
                    <td className="p-2.5 font-semibold text-slate-900 border-r border-slate-200">
                      Học sinh CLB (30–40 HS khối 7, 8, 9)
                    </td>
                    <td className="p-2.5 text-slate-700">
                      Tham gia đầy đủ các buổi sinh hoạt, hoàn thành bài tập/đề tài được giao, tự học có hướng dẫn qua công cụ AI.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section VIII */}
          <section className="space-y-2">
            <h3 className="font-bold text-slate-950 uppercase text-xs sm:text-sm tracking-wide text-emerald-900">
              VIII. DỰ KIẾN KẾT QUẢ
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>Học sinh yêu thích, chủ động và hào hứng tham gia sinh hoạt CLB; tăng hứng thú với môn Hoá học, giảm áp lực học tập.</li>
              <li>Mỗi tháng có ít nhất 01 sản phẩm/dự án trải nghiệm nhỏ do học sinh tự thực hiện (mô hình, thí nghiệm, sản phẩm thủ công...).</li>
              <li>Hình thành nhóm học sinh có năng khiếu, đam mê thực sự với môn học – nền tảng tự nhiên để hướng tới HSG, Olympic Hoá học và KHKT trong các năm học tiếp theo.</li>
              <li>Tổ chức thành công "Ngày hội Khám phá Hoá học" vào cuối năm học, lan toả tinh thần yêu khoa học trong toàn trường.</li>
            </ul>
          </section>
        </div>

        {/* Signature Blocks */}
        <div className="grid grid-cols-2 gap-8 pt-10 text-center text-xs sm:text-sm">
          <div>
            <p className="font-bold text-slate-900 uppercase">
              DUYỆT CỦA BAN GIÁM HIỆU
            </p>
            <p className="text-slate-500 italic text-xs">HIỆU TRƯỞNG (Ký, ghi rõ họ tên, đóng dấu)</p>
            <div className="h-28 flex items-end justify-center">
              {/* Không gian trống để ký tên và đóng dấu văn bản */}
            </div>
          </div>

          <div>
            <p className="text-slate-500 italic text-xs">
              Long Hoa, Tây Ninh, ngày 01 tháng 09 năm 2026
            </p>
            <p className="font-bold text-slate-900 uppercase mt-1">
              NGƯỜI LẬP KẾ HOẠCH & CHỦ NHIỆM CLB
            </p>
            <p className="text-slate-500 italic text-xs">(Ký và ghi rõ họ tên)</p>
            <div className="h-28 flex flex-col items-center justify-end">
              <span className="text-base font-normal italic text-emerald-900 font-bold tracking-wide">
                Thuỳ Dương
              </span>
              <p className="font-bold text-slate-900 text-sm mt-1">Huỳnh Thị Thuỳ Dương</p>
              <p className="text-[11px] text-slate-500">Giáo viên Hoá học – Tổ Khoa học Tự nhiên</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
