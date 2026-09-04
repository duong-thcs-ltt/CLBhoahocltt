import { MonthRoadmap, QuizQuestion, KHKTIdea, LabJournalEntry, ExhibitionBooth, FestivalBoothItem } from "../types";
import { QUIZ_GRADE_7 } from "./quizQuestionsGrade7";
import { QUIZ_GRADE_8 } from "./quizQuestionsGrade8";
import { QUIZ_GRADE_9 } from "./quizQuestionsGrade9";
import { QUIZ_GENERAL_SCIENCE } from "./quizGeneralScience";

export { QUIZ_GRADE_7, QUIZ_GRADE_8, QUIZ_GRADE_9, QUIZ_GENERAL_SCIENCE };

export const ROADMAP_DATA: MonthRoadmap[] = [
  {
    id: "month-9",
    monthNumber: 9,
    monthLabel: "Tháng 9/2026",
    year: 2026,
    theme: "Hoá học kỳ diệu quanh em",
    gradeAlignment: "Khởi động & Làm quen Khoa học (Lớp 7 - 8 - 9)",
    gradeBadge: "Chung",
    mainActivities: [
      "Ra mắt Câu lạc bộ Hoá học năm học 2026 – 2027; phổ biến quy tắc an toàn phòng học.",
      "Xem video / hình ảnh AI minh họa về phép màu hoá học trong cuộc sống hằng ngày.",
      "Trò chơi tương tác làm quen 'Đố vui hoá học kỳ thú'.",
      "Thí nghiệm mở màn gây tò mò: Mô phỏng núi lửa phun trào (Giấm ăn + Baking soda), Nước bắp cải tím đổi màu theo dải pH."
    ],
    expectedProducts: "Cảm nhận đầu tiên tích cực, hào hứng về môn Hoá; danh sách 30-40 thành viên CLB chính thức.",
    experimentPreview: "Núi lửa CO₂ sủi bọt cuồn cuộn và Vũ điệu màu sắc của bắp cải tím.",
    keyConcepts: [
      "Hiện tượng vật lí & Hiện tượng hoá học",
      "Khí Carbon dioxide (CO₂)",
      "Chỉ thị màu tự nhiên (Anthocyanin)"
    ],
    safetyTips: "Không nếm hoá chất, đeo kính bảo hộ khi làm thí nghiệm sủi bọt khí.",
    quote: "Hoá học không phải là những trang sách khô khan, mà là vũ điệu biến đổi kỳ diệu của vật chất quanh ta.",
    simulationType: "volcano"
  },
  {
    id: "month-10",
    monthNumber: 10,
    monthLabel: "Tháng 10/2026",
    year: 2026,
    theme: "Thế giới nguyên tử – phân tử",
    gradeAlignment: "Bám sát SGK KNTT Lớp 7 (Chương I: Nguyên tử - Nguyên tố hoá học)",
    gradeBadge: "Lớp 7",
    mainActivities: [
      "Khám phá mô hình nguyên tử Rutherford – Bohr qua hình ảnh & sơ đồ AI 3D trực quan.",
      "Kể chuyện các nhà khoa học vĩ đại: Mendeleev, Marie Curie, Niels Bohr.",
      "Trò chơi lắp ráp mô hình nguyên tử bằng bi màu, hạt nam châm và đất nặn.",
      "Hoạt động ghép 'Gia đình nguyên tố' (Kim loại kiềm, Halogen, Khí hiếm) trên Bảng tuần hoàn vui."
    ],
    expectedProducts: "Bộ mô hình nguyên tử tự làm bằng vật liệu tái chế; Góc trưng bày 'Bảng tuần hoàn vui CLB'.",
    experimentPreview: "Tự tay bố trí các hạt proton (+), neutron (0) trong hạt nhân và electron (-) trên các lớp vỏ.",
    keyConcepts: [
      "Cấu tạo nguyên tử (p, n, e)",
      "Nguyên tố hoá học & Kí hiệu hoá học",
      "Bảng tuần hoàn các nguyên tố hoá học"
    ],
    safetyTips: "Cẩn thận khi dùng kéo, dây thép mỏng để uốn các quỹ đạo electron mô hình.",
    quote: "Mỗi hạt cát, giọt nước hay làn gió đều được kiến tạo từ những viên gạch nguyên tử tinh vi nhất vũ trụ.",
    simulationType: "atom"
  },
  {
    id: "month-11",
    monthNumber: 11,
    monthLabel: "Tháng 11/2026",
    year: 2026,
    theme: "Phản ứng hoá học – Sự biến hoá kỳ thú",
    gradeAlignment: "Bám sát SGK KNTT Lớp 8 (Chương I: Phản ứng hoá học)",
    gradeBadge: "Lớp 8",
    mainActivities: [
      "Thảo luận 4 dấu hiệu nhận biết phản ứng hoá học: Đổi màu sắc, tạo chất kết tủa, sủi bọt khí, tỏa nhiệt hoặc phát sáng.",
      "Thực hành thí nghiệm 'Hoa giấy đổi màu thần kỳ' bằng quỳ tím và dung dịch kiềm nhẹ.",
      "Thực hành viết 'Mực tàng hình bí mật' bằng nước cốt chanh / sữa tươi và làm hiện hình bằng nhiệt độ.",
      "Khởi động viết Sổ tay 'Nhật ký nhà khoa học nhí' ghi chép phương trình chữ và hiện tượng."
    ],
    expectedProducts: "Sổ tay 'Nhật ký nhà khoa học nhí' của từng thành viên ghi lại hiện tượng và giải thích khoa học.",
    experimentPreview: "Dòng chữ bí mật hiện lên màu nâu khi hơ nhẹ trên nguồn nhiệt ấm.",
    keyConcepts: [
      "Biến đổi hoá học & Liên kết hoá học",
      "Định luật bảo toàn khối lượng",
      "Phương trình hoá học"
    ],
    safetyTips: "Hơ giấy trên ngọn đèn cồn / máy sấy tóc phải giữ khoảng cách an toàn, tránh để bén lửa.",
    quote: "Trong phản ứng hoá học, các nguyên tử không mất đi mà chỉ sắp xếp lại trật tự gắn kết.",
    simulationType: "reaction"
  },
  {
    id: "month-12",
    monthNumber: 12,
    monthLabel: "Tháng 12/2026",
    year: 2026,
    theme: "Hoá học trong gian bếp",
    gradeAlignment: "Bám sát SGK KNTT Lớp 8 (Dung dịch, Nồng độ, Axit – Bazơ – Muối – Thang đo pH)",
    gradeBadge: "Lớp 8",
    mainActivities: [
      "Giải mã khoa học ẩm thực: Vì sao muối dưa cải lại lên men chua ngon? Vì sao nướng bánh cần bột nở?",
      "Tìm hiểu bản chất Axit (vị chua), Bazơ (nhờn, chát) và thang đo độ chua pH trong cơ thể và thực phẩm.",
      "Tự tay chế tạo Giấy quỳ tự nhiên từ dịch chiết bắp cải tím, hoa dâm bụt, củ dền.",
      "Thực hành đo thử pH của 10 loại nước ép và gia vị quen thuộc (chanh, nước dừa, nước mắm, xà phòng, baking soda)."
    ],
    expectedProducts: "Hộp bộ giấy quỳ tự nhiên tự chế; Bảng đối chiếu kết quả đo thử pH thực phẩm gia đình.",
    experimentPreview: "Dải giấy lọc tẩm bắp cải tím đổi màu rực rỡ từ đỏ anh đào đến xanh lục ngọc bích.",
    keyConcepts: [
      "Dung dịch & Độ pH",
      "Axit và Bazơ quen thuộc",
      "Quá trình lên men Lactic tự nhiên"
    ],
    safetyTips: "Không nếm các dung dịch tẩy rửa bếp; chỉ nếm các thực phẩm sạch dùng trong khu ẩm thực.",
    quote: "Gian bếp của mẹ chính là phòng thí nghiệm hoá học ấm áp và kỳ diệu nhất thế giới.",
    simulationType: "ph"
  },
  {
    id: "month-1",
    monthNumber: 1,
    monthLabel: "Tháng 1/2027",
    year: 2027,
    theme: "Kim loại và câu chuyện quanh ta",
    gradeAlignment: "Bám sát SGK KNTT Lớp 9 (Chương: Kim loại – Dãy hoạt động hoá học)",
    gradeBadge: "Lớp 9",
    mainActivities: [
      "Khám phá tính chất vật lí và ứng dụng kỳ diệu của kim loại (Vàng, Bạc, Đồng, Nhôm, Sắt) qua video AI.",
      "Học cách ghi nhớ dãy hoạt động hoá học: 'Khi Nào Cần May Áo Giáp Sắt Nhớ Sang Phố Hỏi Cửa Hàng Á Phi Âu'.",
      "Thí nghiệm quan sát tốc độ ăn mòn kim loại của đinh sắt trong các môi trường khác nhau (nước muối, dầu ăn, giấm).",
      "Thực hành chế tạo 'Pin chanh / Pin cam' phát điện thắp sáng bóng đèn LED màu đỏ."
    ],
    expectedProducts: "Mô hình 'Pin chanh phát điện'; Bản thuyết trình hiểu biết thực tế về ăn mòn và cách bảo vệ kim loại.",
    experimentPreview: "Dòng điện 1.8V sinh ra từ phản ứng oxi hoá khử giữa kẽm và đồng trong tép chanh chua.",
    keyConcepts: [
      "Dãy hoạt động hoá học của kim loại",
      "Sự ăn mòn kim loại & Bảo vệ kim loại",
      "Phản ứng điện hoá sinh dòng điện"
    ],
    safetyTips: "Ghim kẽm và đồng có cạnh nhọn, thao tác cẩn thận không để đâm vào tay.",
    quote: "Kim loại đã đưa loài người bước từ thời đồ đá sang kỷ nguyên công nghệ hiện đại rực rỡ.",
    simulationType: "lemon_battery"
  },
  {
    id: "month-2",
    monthNumber: 2,
    monthLabel: "Tháng 2/2027",
    year: 2027,
    theme: "Hoá học và môi trường xanh (Sau Tết)",
    gradeAlignment: "Tích hợp Khoa học Môi trường & Hóa học ứng dụng (Lớp 7 - 8 - 9)",
    gradeBadge: "Chung",
    mainActivities: [
      "Tìm hiểu hiện tượng ô nhiễm không khí, hiệu ứng nhà kính (CO₂, CH₄) và mưa axit liên hệ kiến thức hoá học.",
      "Phát động phong trào 'Tết xanh không rác thải': Tái chế vỏ chai nhựa làm chậu cây thông minh.",
      "Khởi động dự án nhỏ: Ủ phân hữu cơ (Compost) từ rác nhà bếp (vỏ trái cây, bã trà, lá khô) làm phân bón sạch.",
      "Quan sát sự phân huỷ sinh học và quá trình sinh nhiệt của vi sinh vật trong thùng ủ."
    ],
    expectedProducts: "Mô hình thùng ủ phân hữu cơ mini và các chậu cây cảnh tái chế đặt tại hành lang lớp học.",
    experimentPreview: "Biến vỏ chuối, bã cà phê thành mùn đất giàu dinh dưỡng N-P-K cho cây trồng.",
    keyConcepts: [
      "Khí nhà kính & Mưa axit",
      "Phân bón hoá học vs Phân bón hữu cơ",
      "Kinh tế tuần hoàn & Tái chế xanh"
    ],
    safetyTips: "Đeo găng tay vệ sinh khi phân loại rác hữu cơ và lật trộn thùng ủ phân.",
    quote: "Bảo vệ Trái Đất bắt đầu từ sự thấu hiểu chu trình chuyển hoá vật chất trong tự nhiên.",
    simulationType: "volcano"
  },
  {
    id: "month-3",
    monthNumber: 3,
    monthLabel: "Tháng 3/2027",
    year: 2027,
    theme: "Chất hữu cơ – Từ thiên nhiên đến đời sống",
    gradeAlignment: "Bám sát SGK KNTT Lớp 9 (Chương: Hợp chất hữu cơ, Tinh bột, Polime)",
    gradeBadge: "Lớp 9",
    mainActivities: [
      "Tìm hiểu thế giới Polime: Nhựa, cao su thiên nhiên, tơ sợi và vấn đề nan giải về rác thải vi nhựa.",
      "Thực hành tự làm Slime an toàn (từ keo sữa dán giấy PVA và nước muối sinh lý / dung dịch ngâm kính áp tròng, không dùng hàn the độc hại).",
      "Thí nghiệm chế tạo 'Nhựa sinh học Bioplastic' từ tinh bột ngô/khoai mì Tây Ninh, giấm ăn và glycerin.",
      "Thiết kế poster và thông điệp hành động giảm thiểu đồ nhựa dùng 1 lần trong trường học."
    ],
    expectedProducts: "Mẫu slime an toàn tự làm; Mảnh nhựa sinh học dẻo dai từ tinh bột; Poster lan tỏa lối sống xanh.",
    experimentPreview: "Dung dịch tinh bột sắn khuấy nóng cùng glycerin đóng rắn thành màng nhựa sinh học tự phân huỷ.",
    keyConcepts: [
      "Hợp chất hữu cơ & Polime chuỗi dài",
      "Nhựa nhiệt dẻo & Nhựa sinh học",
      "Tác hại của hạt vi nhựa (Microplastics)"
    ],
    safetyTips: "Đun nóng dung dịch tinh bột cần sự giám sát của giáo viên phụ trách, tránh bỏng nhiệt.",
    quote: "Thiên nhiên là nhà hoá học hữu cơ bậc thầy, nuôi dưỡng sự sống bằng tinh bột và xenlulozơ.",
    simulationType: "bioplastic"
  },
  {
    id: "month-4",
    monthNumber: 4,
    monthLabel: "Tháng 4/2027",
    year: 2027,
    theme: "Hoá học và công nghệ tương lai",
    gradeAlignment: "Định hướng KHKT, STEM & Năng lượng mới (Lớp 7 - 8 - 9)",
    gradeBadge: "Chung",
    mainActivities: [
      "Khám phá các siêu vật liệu mới: Graphene siêu nhẹ siêu bền, Aerogel siêu cách nhiệt, Pin nhiên liệu Hydro.",
      "Trải nghiệm mô hình pin mặt trời mini và xe đồ chơi chạy bằng điện hoá mặt trời.",
      "Thảo luận nhóm: 'Từ tò mò đến Dự án Nghiên cứu Khoa học Kỹ thuật (KHKT ViSEF)' dưới sự dẫn dắt của Cô Huỳnh Thị Thùy Dương.",
      "Xây dựng đề cương sơ bộ cho các ý tưởng dự án tham gia thi KHKT học sinh THCS cấp trường và tỉnh Tây Ninh."
    ],
    expectedProducts: "Danh sách 8-10 ý tưởng đề tài KHKT xuất phát từ chính sự tò mò và sở thích cá nhân của học sinh.",
    experimentPreview: "Mô phỏng tế bào quang điện chuyển năng lượng ánh sáng thành dòng dịch chuyển electron.",
    keyConcepts: [
      "Năng lượng sạch & Năng lượng tái tạo",
      "Vật liệu nano & Siêu vật liệu",
      "Phương pháp tư duy nghiên cứu KHKT"
    ],
    safetyTips: "Lắp ráp mạch điện pin năng lượng mặt trời theo đúng cực âm (-) và dương (+).",
    quote: "Công nghệ tương lai nằm trong tay những cô cậu học trò mang trái tim tò mò khoa học hôm nay.",
    simulationType: "lemon_battery"
  },
  {
    id: "month-5",
    monthNumber: 5,
    monthLabel: "Tháng 5/2027",
    year: 2027,
    theme: "Ngày hội Khám phá Hoá học (Chemistry Fair)",
    gradeAlignment: "Tổng kết, Trưng bày sản phẩm & Vinh danh (Toàn trường THCS Lý Tự Trọng)",
    gradeBadge: "Chung",
    mainActivities: [
      "Các nhóm chuẩn bị gian hàng trưng bày: Poster, mô hình nguyên tử, bộ giấy quỳ, sản phẩm nhựa sinh học, pin chanh.",
      "Tổ chức sân khấu biểu diễn thí nghiệm hoá học vui: Bàn tay lửa an toàn, Bọt tuyết voi ma mút, Nước đổi màu theo điệu nhạc.",
      "Báo cáo tổng kết chặng đường 9 tháng sinh hoạt của CLB Hoá học năm học 2026 – 2027.",
      "Lễ trao giải, vinh danh và cấp chứng nhận 'Nhà khoa học nhí xuất sắc' từ Ban Giám Hiệu và Cô Chủ nhiệm."
    ],
    expectedProducts: "Báo cáo tổng kết năm học; Kỷ yếu ảnh sinh hoạt CLB; 30-40 chứng nhận 'Nhà khoa học nhí' được trao tặng.",
    experimentPreview: "Sân khấu bùng nổ sắc màu khoa học với các màn biểu diễn thí nghiệm an toàn tuyệt đối.",
    keyConcepts: [
      "Kỹ năng thuyết trình & Trình diễn khoa học",
      "Làm việc nhóm & Tự tin chia sẻ tri thức",
      "Nuôi dưỡng ước mơ trở thành nhà khoa học"
    ],
    safetyTips: "Kiểm tra toàn bộ khu vực biểu diễn, bình chữa cháy dự phòng và rào chắn khoảng cách khán giả.",
    quote: "Một năm học khép lại nhưng ngọn lửa đam mê khoa học sẽ mãi rực sáng trong trái tim các em!",
    simulationType: "volcano"
  }
];

export const QUIZ_BANK: QuizQuestion[] = [
  ...QUIZ_GRADE_7,
  ...QUIZ_GRADE_8,
  ...QUIZ_GRADE_9,
  ...QUIZ_GENERAL_SCIENCE
];

export const KHKT_SAMPLE_PROJECTS: KHKTIdea[] = [
  {
    id: "khkt-1",
    title: "Chế tạo màng bọc thực phẩm tự phân huỷ từ tinh bột củ mì Tây Ninh kết hợp tinh dầu sả kháng khuẩn",
    category: "Nông nghiệp & Địa phương Tây Ninh",
    gradeSuitability: "Khối 8 – 9",
    realWorldProblem: "Rác thải màng bọc nilon mất hàng trăm năm phân huỷ và thôi nhiễm hạt vi nhựa độc hại vào thức ăn. Tây Ninh là thủ phủ tinh bột sắn nhưng giá trị thô còn thấp.",
    hypothesis: "Khi gelatin hoá tinh bột sắn với glycerin ở tỷ lệ thích hợp và bổ sung 0.5% tinh dầu sả chanh, màng sinh học có độ bền kéo đạt chuẩn và ức chế 99% vi khuẩn E.coli sau 48h.",
    localMaterials: ["Tinh bột củ mì Tây Ninh", "Glycerin thực vật", "Giấm ăn (axit axetic)", "Tinh dầu sả chanh Tây Ninh"],
    methodology: [
      "Chiết xuất và phối trộn tinh bột với nước cất, glycerin và axit axetic theo các tỷ lệ đối chứng.",
      "Gia nhiệt khuấy đều ở 85°C đến khi dung dịch chuyển trong suốt (gelatin hoá).",
      "Đổ khuôn tráng màng mỏng 0.2mm trên khay silicon và sấy gió ở 50°C trong 8 giờ.",
      "Thử nghiệm độ bền cơ học và kiểm tra khả năng bảo quản cà chua, dưa leo tươi."
    ],
    expectedOutcome: "Tấm màng bọc sinh học dẻo dai, trong suốt, bảo quản rau củ tươi lâu hơn 5 ngày và phân huỷ hoàn toàn trong đất vườn sau 30 ngày."
  },
  {
    id: "khkt-2",
    title: "Nghiên cứu bộ que chỉ thị pH tự nhiên từ hoa dâm bụt và bắp cải tím đo độ chua đất trồng mãng cầu Bà Đen",
    category: "Hoá học xanh & Môi trường",
    gradeSuitability: "Khối 7 – 8",
    realWorldProblem: "Đất trồng mãng cầu Bà Đen Tây Ninh hay bị chua do bón phân hoá học và mưa nhiều, nhưng thiết bị đo pH điện tử đắt tiền, bà con khó tiếp cận.",
    hypothesis: "Hợp chất sắc tố Anthocyanin chiết xuất bằng cồn 70 độ từ bắp cải tím và hoa dâm bụt tẩm trên giấy lọc tạo ra que thử đo độ pH đất chính xác từ 4.0 đến 8.0 với sai số dưới 0.5 pH.",
    localMaterials: ["Cánh hoa dâm bụt đỏ", "Lá bắp cải tím", "Giấy lọc định tính", "Cồn y tế 70 độ", "Mẫu đất vườn mãng cầu"],
    methodology: [
      "Nghiền nát bắp cải tím và cánh hoa, ngâm chiết bằng cồn y tế 70 độ trong bóng râm.",
      "Ngâm dải giấy lọc vào dịch chiết trong 30 phút rồi sấy khô trong tủ sấy nhiệt độ thấp.",
      "Chuẩn độ màu với dung dịch đệm chuẩn từ pH 3 đến pH 10 để lập bảng so màu chuẩn.",
      "Thử nghiệm với 10 mẫu đất thực tế tại chân núi Bà Đen Tây Ninh."
    ],
    expectedOutcome: "Hộp que thử pH nông nghiệp tự nhiên giá rẻ (dưới 500đ/que), thao tác đơn giản giúp nông dân nhận biết độ chua của đất trong 30 giây."
  },
  {
    id: "khkt-3",
    title: "Mô hình pin điện hoá sinh học (BFC) tận dụng nước thải bã mía làm nguồn năng lượng thắp sáng cảm biến IoT",
    category: "Vật liệu mới & Năng lượng",
    gradeSuitability: "Khối 9 (Olympic)",
    realWorldProblem: "Nước thải chế biến đường mía chứa lượng đường hữu cơ dư thừa gây ô nhiễm nếu thải trực tiếp. Cần giải pháp tận dụng biến chất thải thành năng lượng sạch.",
    hypothesis: "Quá trình oxy hoá phân giải đường sucrose của vi khuẩn kị khí tại cực anode carbon giải phóng dòng electron liên tục tạo ra hiệu điện thế 0.4V - 0.6V trên mỗi ngăn pin.",
    localMaterials: ["Bã mía lên men", "Điện cực than chì graphite", "Điện cực đồng", "Màng trao đổi ion tự chế", "Đồng hồ đo VOM"],
    methodology: [
      "Thu thập bã mía và nước rỉ đường từ nhà máy đường Tây Ninh, ủ kị khí tạo màng sinh học vi sinh vật.",
      "Lắp ráp ngăn pin điện hoá sinh học với 2 cực điện than chì và màng ngăn xốp.",
      "Đo đạc đường đặc trưng vôn - ampe và công suất phát điện theo thời gian.",
      "Mắc nối tiếp 4 ngăn pin để thắp sáng bóng đèn LED tín hiệu cảm biến độ ẩm đất."
    ],
    expectedOutcome: "Hệ thống pin sinh học xanh phát điện liên tục 1.8V - 2.2V trong 14 ngày, vừa xử lý COD nước thải hữu cơ vừa cấp điện cho cảm biến môi trường."
  },
  {
    id: "khkt-4",
    title: "Chế phẩm xua đuổi muỗi và côn trùng tự nhiên từ vỏ bưởi da xanh Tây Ninh và cồn sinh học",
    category: "Hoá học & Đời sống",
    gradeSuitability: "Khối 7 – 8",
    realWorldProblem: "Mùa mưa ở Tây Ninh muỗi vằn sinh sản mạnh gây bệnh sốt xuất huyết trong trường học. Thuốc xịt muỗi hoá học công nghiệp thường có mùi hắc và gây kích ứng đường hô hấp.",
    hypothesis: "Hàm lượng Limonene và Citral dồi dào trong vỏ bưởi da xanh Tây Ninh khi được chưng cất lôi cuốn hơi nước có khả năng làm tê liệt thụ thể khứu giác của muỗi, ngăn ngừa muỗi đốt hiệu quả trên 3 giờ.",
    localMaterials: ["Vỏ bưởi da xanh tươi", "Cồn y tế 70 độ", "Nước cất", "Bình xịt phun sương", "Bộ chưng cất hơi nước"],
    methodology: [
      "Thái nhỏ lớp vỏ xanh ngoài của bưởi da xanh Tây Ninh (chứa nhiều túi tinh dầu nhất).",
      "Tiến hành chưng cất lôi cuốn hơi nước thu hồi tinh dầu bưởi nguyên chất.",
      "Pha chế dung dịch xịt phòng và thoa ngoài da với nồng độ tinh dầu 10% - 15% trong cồn sinh học và nước cất.",
      "Đánh giá thời gian tác dụng xua muỗi thực tế trên lồng thử nghiệm an toàn."
    ],
    expectedOutcome: "Bình xịt thảo mộc hương bưởi tự nhiên dễ chịu, an toàn 100% cho học sinh THCS, hiệu quả xua đuổi muỗi kéo dài trên 3 tiếng."
  }
];

export const INITIAL_KHKT_IDEAS = KHKT_SAMPLE_PROJECTS;

export const INITIAL_JOURNAL_ENTRIES: LabJournalEntry[] = [
  {
    id: "entry-1",
    title: "Thí nghiệm núi lửa giấm và baking soda sủi bọt",
    date: "2026-09-18",
    authorName: "Nguyễn Minh Khang (Lớp 8A2)",
    grade: "Lớp 8",
    materialsUsed: ["Giấm ăn 5% (CH3COOH)", "Baking soda (NaHCO3)", "Màu thực phẩm đỏ", "Dung dịch nước rửa chén 2 giọt", "Cốc đong thuỷ tinh"],
    procedureNotes: "Cho 2 thìa baking soda vào mô hình núi lửa đất nặn. Pha màu đỏ và nước rửa chén vào cốc giấm. Đổ nhanh giấm vào miệng núi lửa.",
    observedPhenomena: "Hỗn hợp sôi trào mãnh liệt, lớp bọt đỏ cuồn cuộn trào qua miệng núi lửa như dòng dung nham thực thụ. Đáy cốc sờ vào thấy mát lạnh.",
    chemicalExplanation: "Axit axetic tác dụng với natri hiđrocacbonat tạo khí CO2. Nước rửa chén giữ khí lại tạo bọt dày. Phản ứng thu nhiệt nhẹ.",
    equation: "CH3COOH + NaHCO3 → CH3COONa + H2O + CO2↑",
    safetyScore: 5,
    teacherFeedback: "Khang quan sát hiện tượng rất tinh tế khi nhận thấy cốc bị mát lạnh! Em đã nắm rất vững dấu hiệu sinh khí của phản ứng hoá học.",
    tags: ["Tháng 9", "Khí CO2", "Phản ứng trao đổi"]
  },
  {
    id: "entry-2",
    title: "Chế tạo giấy quỳ tím tự nhiên từ bắp cải tím",
    date: "2026-12-15",
    authorName: "Trần Lê Bảo Ngọc (Lớp 8A1)",
    grade: "Lớp 8",
    materialsUsed: ["1/4 bắp cải tím tươi", "Nước nóng 70 độ C", "Giấy lọc cắt thành dải 1x5cm", "Kẹp gắp", "Khay sấy"],
    procedureNotes: "Thái nhỏ bắp cải tím, ngâm nước ấm 20 phút cho ra nước màu tím đậm. Nhúng từng dải giấy lọc vào ngâm 5 phút rồi vớt ra phơi khô trên khay.",
    observedPhenomena: "Dải giấy sau khi khô có màu tím nhạt đẹp mắt. Thử chấm nước chanh: hoá đỏ tươi. Thử chấm nước xà phòng: hoá xanh ngọc bích.",
    chemicalExplanation: "Anthocyanin đổi cấu trúc phân tử theo nồng độ H+ trong dung dịch.",
    equation: "H-Anth (Màu đỏ - Axit) ⇄ Anth- (Màu xanh - Bazơ)",
    safetyScore: 5,
    teacherFeedback: "Bảo Ngọc làm dải giấy rất đều và đẹp! Em có thể đem bộ giấy này về chia sẻ để bố mẹ cùng thử độ chua thực phẩm trong bếp nhé.",
    tags: ["Tháng 12", "Chỉ thị pH", "Hoá học nhà bếp"]
  },
  {
    id: "entry-3",
    title: "Thử nghiệm Pin 4 quả chanh thắp sáng bóng LED",
    date: "2027-01-20",
    authorName: "Lê Quốc Bảo (Lớp 9A3)",
    grade: "Lớp 9",
    materialsUsed: ["4 quả chanh giấy nhiều nước", "4 đinh kẽm sạch", "4 đồng xu bằng đồng", "Dây điện có kẹp cá sấu", "1 bóng LED màu đỏ siêu sáng", "Đồng hồ vạn năng VOM"],
    procedureNotes: "Lăn nhẹ quả chanh cho dập tép bên trong. Cắm 1 đinh kẽm và 1 thanh đồng vào mỗi quả, cách nhau 3cm. Nối cực kẽm quả này với cực đồng quả kia (nối tiếp).",
    observedPhenomena: "Đo điện áp 1 quả chanh được 0.92V. Khi nối tiếp 4 quả chanh, vôn kế đo được 3.65V. Đấu vào bóng LED đỏ: bóng phát sáng rực rỡ trong bóng tối!",
    chemicalExplanation: "Kẽm bị oxi hoá giải phóng electron: Zn → Zn2+ + 2e. Electron chạy qua mạch ngoài sang đồng, ion H+ trong axit citric nhận e tạo H2: 2H+ + 2e → H2. Chênh lệch thế điện cực tạo dòng điện.",
    equation: "Zn + 2H+ → Zn2+ + H2↑",
    safetyScore: 5,
    teacherFeedback: "Chúc mừng Quốc Bảo! Thí nghiệm thành công mĩ mãn. Em hãy suy nghĩ xem nếu thay chanh bằng quả cam hoặc củ khoai tây thì sao nhé!",
    tags: ["Tháng 1", "Pin điện hoá", "Dãy kim loại"]
  }
];

export const EXHIBITION_BOOTHS: ExhibitionBooth[] = [
  {
    id: "booth-1",
    teamName: "Đội Khám Phá Nguyên Tử (Khối 7)",
    boothTitle: "Hành Tinh Vi Mô & Bảng Tuần Hoàn Vui",
    productName: "Mô hình nguyên tử 3D chuyển động & Bảng tuần hoàn tương tác",
    monthReference: "Tháng 10/2026",
    description: "Trưng bày các mô hình nguyên tử Heli, Carbon, Oxy, Natri làm từ quả cầu xốp từ tính xoay trên trục, giúp quan sát các lớp electron.",
    members: ["Nguyễn Hoàng Nam", "Võ Thị Mỹ Duyên", "Phan Gia Huy", "Trịnh Thảo My"],
    highlightBadge: "Giải Sáng Tạo Trẻ",
    likes: 84
  },
  {
    id: "booth-2",
    teamName: "Đội Hoá Học Gian Bếp (Khối 8)",
    boothTitle: "Phép Màu Ẩm Thực & Giấy Quỳ Tự Nhiên",
    productName: "Bộ que thử pH tự nhiên và Hũ dưa muối vi sinh chuẩn khoa học",
    monthReference: "Tháng 12/2026",
    description: "Biểu diễn đo pH tại chỗ cho khách tham quan; trưng bày mẫu nước ép tự nhiên và giải thích cơ chế muối dưa không bị váng.",
    members: ["Trần Lê Bảo Ngọc", "Nguyễn Minh Khang", "Đỗ Khánh An", "Lâm Tuấn Kiệt"],
    highlightBadge: "Ứng Dụng Thực Tiễn Nhất",
    likes: 96
  },
  {
    id: "booth-3",
    teamName: "Đội Năng Lượng & Kim Loại (Khối 9)",
    boothTitle: "Trạm Phát Điện Sinh Học & Dãy Hoá Học",
    productName: "Giàn Pin Chanh Năng Lượng & Chuỗi thí nghiệm ăn mòn kim loại",
    monthReference: "Tháng 1/2027",
    description: "Khách tham quan được tự tay cắm điện cực chanh để bật sáng đèn trang trí; quan sát các thanh sắt được bảo vệ bằng lớp sơn và dầu mỡ.",
    members: ["Lê Quốc Bảo", "Đặng Thùy Trang", "Huỳnh Văn Tuấn", "Phạm Ngọc Hân"],
    highlightBadge: "Thí Nghiệm Ấn Tượng Nhất",
    likes: 112
  },
  {
    id: "booth-4",
    teamName: "Đội Môi Trường Xanh & Tương Lai",
    boothTitle: "Nhựa Sinh Học & Công Nghệ Xanh",
    productName: "Tấm màng bọc Bioplastic từ tinh bột củ mì Tây Ninh & Thùng ủ Compost",
    monthReference: "Tháng 3 & 4/2027",
    description: "Mẫu màng bọc phân huỷ hoàn toàn sau 30 ngày trong đất; chậu cây cảnh xanh tốt từ đất mùn ủ rác hữu cơ nhà bếp.",
    members: ["Nguyễn Thị Kim Ngân", "Trần Đình Trọng", "Bùi Anh Khoa", "Lê Mai Phương"],
    highlightBadge: "Giải Nhất Toàn Đoàn KHKT",
    likes: 128
  }
];

export const FESTIVAL_BOOTHS: FestivalBoothItem[] = [
  {
    id: "booth-1",
    boothNumber: 1,
    name: "Sắc Màu Tự Nhiên & Giấy Quỳ Chỉ Thị pH",
    description: "Khám phá thế giới đổi màu kỳ diệu của dịch chiết bắp cải tím, hoa đậu biếc và nghệ vàng khi tiếp xúc với các dung dịch trong đời sống.",
    showcasedItems: ["Giấy quỳ tự nhiên làm thủ công", "Thang màu sắc Anthocyanin chuẩn", "Bộ kit đo pH nước sinh hoạt"],
    interactiveChallenge: "Thử tài phân biệt 3 cốc nước bí mật (chanh, nước suối, xà phòng) chỉ bằng 1 giọt bắp cải tím!"
  },
  {
    id: "booth-2",
    boothNumber: 2,
    name: "Gian Bếp Hoá Học & Núi Lửa Sủi Bọt",
    description: "Trải nghiệm các phản ứng hoá học gần gũi nhất trong gian bếp: Núi lửa sủi bọt khí CO2, làm xà phòng dừa Tây Ninh và kẹo đường kết tinh.",
    showcasedItems: ["Mô hình núi lửa đất nặn mini", "Bánh xà phòng thủ công hương sả", "Cây kẹo đường tinh thể lấp lánh"],
    interactiveChallenge: "Tự tay pha chế tỷ lệ giấm và baking soda để tạo cột bọt dâng cao đúng vạch mốc 15cm!"
  },
  {
    id: "booth-3",
    boothNumber: 3,
    name: "Trạm Năng Lượng & Pin Chanh Thắp Sáng LED",
    description: "Tự tay cắm các bản kim loại Kẽm - Đồng vào những tép chanh chua Tây Ninh để tạo ra dòng điện sạch thắp sáng bóng đèn LED rực rỡ.",
    showcasedItems: ["Giàn pin 4 quả chanh phát điện 3.6V", "Mô hình đồng hồ điện tử chạy bằng nước muối", "Bản đồ dãy hoạt động kim loại"],
    interactiveChallenge: "Đấu nối tiếp 3 quả chanh với dây kẹp cá sấu để làm sáng bóng đèn LED đỏ của ban tổ chức!"
  },
  {
    id: "booth-4",
    boothNumber: 4,
    name: "Vườn Ươm KHKT & Nhựa Sinh Học Bioplastic",
    description: "Trưng bày 4 đề tài nghiên cứu Khoa học Kỹ thuật tiêu biểu của học sinh CLB, nổi bật là màng bọc thực phẩm tự huỷ từ tinh bột sắn Tây Ninh.",
    showcasedItems: ["Màng bọc sinh học từ củ mì", "Bình xịt tinh dầu vỏ bưởi đuổi muỗi", "Poster đề tài nghiên cứu ViSEF"],
    interactiveChallenge: "Quan sát và kiểm tra độ bền dẻo kéo giãn của màng nhựa sinh học so với nilon thông thường!"
  },
  {
    id: "booth-5",
    boothNumber: 5,
    name: "Ảo Thuật Hoá Học & Bức Thư Tàng Hình",
    description: "Giải mã bí mật của các màn ảo thuật khoa học: Viết thư bí mật bằng nước chanh hơ nóng hiện chữ, và đấu trường đố vui nhận huy hiệu vinh danh.",
    showcasedItems: ["Bộ mực viết tàng hình bằng chanh", "Bảng tuần hoàn 3D chuyển động", "Huy hiệu Nhà Hoá Học Nhí Xuất Sắc 2026-2027"],
    interactiveChallenge: "Dùng nhiệt độ máy sấy giải mã thông điệp bí mật ẩn giấu trên bức thư chúc mừng của Cô Huỳnh Thị Thùy Dương!"
  }
];

