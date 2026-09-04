import { QuizQuestion } from "../types";

export const QUIZ_GRADE_8: QuizQuestion[] = [
  // --- CHỦ ĐỀ 1: PHẢN ỨNG HOÁ HỌC & BIẾN ĐỔI CHẤT (KNTT BÀI 12, 13) ---
  {
    id: "q8_1",
    grade: "Lớp 8",
    topic: "KNTT: Biến đổi vật lý và hoá học",
    difficulty: "Dễ",
    question: "Hiện tượng nào sau đây là hiện tượng biến đổi HOÁ HỌC (có sinh ra chất mới)?",
    options: [
      "Băng đá ở hai cực tan chảy thành nước lỏng",
      "Thắp sáng ngọn nến, sáp nến cháy tạo thành khí CO₂ và hơi nước",
      "Hoà tan một thìa đường cát trắng vào cốc nước ấm",
      "Cắt nhỏ một đoạn dây đồng thành nhiều mảnh ngắn"
    ],
    correctIndex: 1,
    explanation: "Khi sáp nến (paraffin) cháy đã có phản ứng hoá học với oxygen trong không khí tạo ra các chất mới là khí cacbonic (CO₂) và hơi nước (H₂O). Ba hiện tượng còn lại chỉ biến đổi về trạng thái hoặc hình dạng (biến đổi vật lý).",
    knttReference: "KNTT KHTN 8 - Bài 12: Biến đổi vật lý và biến đổi hoá học"
  },
  {
    id: "q8_2",
    grade: "Lớp 8",
    topic: "KNTT: Biến đổi vật lý và hoá học",
    difficulty: "Dễ",
    question: "Hiện tượng nào sau đây là một biến đổi VẬT LÝ?",
    options: [
      "Đinh sắt để ngoài không khí ẩm bị gỉ sét màu nâu đỏ",
      "Cơm để lâu ngày trong mùa hè bị thiu chua",
      "Nước lỏng trong nồi đun sôi bốc thành hơi nước",
      "Đốt cháy củi gỗ trong bếp sinh ra tro và khói"
    ],
    correctIndex: 2,
    explanation: "Nước lỏng bay hơi thành hơi nước chỉ là sự thay đổi trạng thái tập hợp của cùng phân tử H₂O, không có chất mới sinh ra nên là biến đổi vật lý.",
    knttReference: "KNTT KHTN 8 - Bài 12: Biến đổi vật lý và biến đổi hoá học"
  },
  {
    id: "q8_3",
    grade: "Lớp 8",
    topic: "KNTT: Dấu hiệu phản ứng hoá học",
    difficulty: "Dễ",
    question: "Dấu hiệu nào sau đây thường CHỨNG TỎ có phản ứng hoá học đã xảy ra?",
    options: [
      "Có sự thay đổi màu sắc rõ rệt của chất",
      "Có chất khí mới sinh ra (sủi bọt khí)",
      "Có chất kết tủa mới không tan xuất hiện",
      "Tất cả các dấu hiệu trên đều đúng"
    ],
    correctIndex: 3,
    explanation: "Dấu hiệu có chất mới tạo thành thường đi kèm: thay đổi màu sắc, sinh ra chất khí sủi bọt, tạo chất kết tủa không tan, toả nhiệt hoặc phát sáng.",
    knttReference: "KNTT KHTN 8 - Bài 12: Phản ứng hoá học"
  },
  {
    id: "q8_4",
    grade: "Lớp 8",
    topic: "KNTT: Phản ứng toả nhiệt và thu nhiệt",
    difficulty: "Trung bình",
    question: "Phản ứng nào giải phóng năng lượng dưới dạng nhiệt ra môi trường xung quanh làm môi trường nóng lên được gọi là gì?",
    options: ["Phản ứng toả nhiệt", "Phản ứng thu nhiệt", "Phản ứng phân huỷ", "Phản ứng thế"],
    correctIndex: 0,
    explanation: "Phản ứng toả nhiệt là phản ứng hoá học giải phóng nhiệt lượng ra môi trường xung quanh (ví dụ phản ứng cháy của than đá, gas bếp hoá lỏng).",
    knttReference: "KNTT KHTN 8 - Bài 13: Phản ứng toả nhiệt và thu nhiệt"
  },
  {
    id: "q8_5",
    grade: "Lớp 8",
    topic: "KNTT: Phản ứng toả nhiệt và thu nhiệt",
    difficulty: "Trung bình",
    question: "Quá trình nung đá vôi (CaCO₃) ở nhiệt độ cao khoảng 900 °C trong lò vôi cần cung cấp nhiệt liên tục được xếp vào loại phản ứng nào?",
    options: ["Phản ứng toả nhiệt", "Phản ứng thu nhiệt", "Phản ứng trùng hợp", "Phản ứng quang hợp"],
    correctIndex: 1,
    explanation: "Phản ứng nung đá vôi CaCO₃ → CaO + CO₂ hấp thụ nhiệt năng liên tục từ bên ngoài; nếu ngừng đun nóng phản ứng sẽ dừng lại, nên đó là phản ứng thu nhiệt.",
    knttReference: "KNTT KHTN 8 - Bài 13: Phản ứng toả nhiệt và thu nhiệt"
  },

  // --- CHỦ ĐỀ 2: ĐỊNH LUẬT BẢO TOÀN KHỐI LƯỢNG (KNTT BÀI 14) ---
  {
    id: "q8_6",
    grade: "Lớp 8",
    topic: "KNTT: Định luật bảo toàn khối lượng",
    difficulty: "Dễ",
    question: "Nội dung của Định luật bảo toàn khối lượng phát biểu rằng trong một phản ứng hoá học:",
    options: [
      "Tổng khối lượng các chất tham gia bằng tổng khối lượng các sản phẩm",
      "Khối lượng các chất sản phẩm luôn lớn hơn chất tham gia",
      "Khối lượng các chất sản phẩm luôn nhỏ hơn chất tham gia",
      "Số phân tử trước và sau phản ứng luôn bằng nhau"
    ],
    correctIndex: 0,
    explanation: "Định luật bảo toàn khối lượng (Lomonosov - Lavoisier): Trong một phản ứng hoá học, tổng khối lượng của các chất sản phẩm bằng tổng khối lượng của các chất phản ứng.",
    knttReference: "KNTT KHTN 8 - Bài 14: Định luật bảo toàn khối lượng"
  },
  {
    id: "q8_7",
    grade: "Lớp 8",
    topic: "KNTT: Tính toán theo bảo toàn khối lượng",
    difficulty: "Trung bình",
    question: "Nung 100 gam đá vôi (CaCO₃) thu được 56 gam vôi sống (CaO) và khí carbon dioxide (CO₂). Khối lượng khí CO₂ thoát ra là bao nhiêu gam?",
    options: ["44 gam", "56 gam", "100 gam", "156 gam"],
    correctIndex: 0,
    explanation: "Theo định luật bảo toàn khối lượng: m(CaCO₃) = m(CaO) + m(CO₂) -> m(CO₂) = 100 - 56 = 44 gam.",
    knttReference: "KNTT KHTN 8 - Bài 14: Định luật bảo toàn khối lượng"
  },
  {
    id: "q8_8",
    grade: "Lớp 8",
    topic: "KNTT: Bản chất của phản ứng hoá học",
    difficulty: "Trung bình",
    question: "Trong một phản ứng hoá học, yếu tố nào sau đây KHÔNG THAY ĐỔI trước và sau phản ứng?",
    options: [
      "Liên kết giữa các nguyên tử",
      "Số lượng nguyên tử của mỗi nguyên tố",
      "Số lượng phân tử",
      "Màu sắc của các chất"
    ],
    correctIndex: 1,
    explanation: "Trong phản ứng hoá học, chỉ có liên kết giữa các nguyên tử bị thay đổi làm cho phân tử này biến đổi thành phân tử khác; còn số lượng nguyên tử của mỗi nguyên tố được bảo toàn tuyệt đối.",
    knttReference: "KNTT KHTN 8 - Bài 14: Phương trình hoá học"
  },
  {
    id: "q8_9",
    grade: "Lớp 8",
    topic: "KNTT: Cân bằng phương trình hoá học",
    difficulty: "Trung bình",
    question: "Để phương trình hoá học sau được cân bằng: a Al + b O₂ → c Al₂O₃, các hệ số nguyên tối giản a, b, c lần lượt là:",
    options: ["2, 3, 1", "4, 3, 2", "1, 1, 1", "4, 2, 2"],
    correctIndex: 1,
    explanation: "Cân bằng nguyên tử Al và O: 4Al + 3O₂ → 2Al₂O₃. Tổng số nguyên tử Al ở hai vế là 4, tổng số nguyên tử O ở hai vế là 6.",
    knttReference: "KNTT KHTN 8 - Bài 14: Phương trình hoá học"
  },
  {
    id: "q8_10",
    grade: "Lớp 8",
    topic: "KNTT: Cân bằng phương trình hoá học",
    difficulty: "Trung bình",
    question: "Phương trình hoá học nào sau đây đã được cân bằng ĐÚNG hệ số?",
    options: [
      "Fe + HCl → FeCl₂ + H₂",
      "Zn + 2HCl → ZnCl₂ + H₂",
      "2H₂ + O₂ → H₂O",
      "Na + H₂O → NaOH + H₂"
    ],
    correctIndex: 1,
    explanation: "Phương trình Zn + 2HCl → ZnCl₂ + H₂ có 1 Zn, 2 H, 2 Cl ở cả 2 vế nên đã cân bằng chuẩn xác.",
    knttReference: "KNTT KHTN 8 - Bài 14: Phương trình hoá học"
  },

  // --- CHỦ ĐỀ 3: MOL & TÍNH TOÁN HOÁ HỌC (KNTT BÀI 15, 16) ---
  {
    id: "q8_11",
    grade: "Lớp 8",
    topic: "KNTT: Khái niệm Mol",
    difficulty: "Dễ",
    question: "Một mol chất chứa lượng hạt nguyên tử hoặc phân tử bằng bao nhiêu (số Avogadro, kí hiệu là N)?",
    options: [
      "6,022 × 10²³ hạt",
      "6,022 × 10²⁴ hạt",
      "3,1415 × 10²³ hạt",
      "1,66 × 10⁻²⁴ hạt"
    ],
    correctIndex: 0,
    explanation: "Mol là lượng chất có chứa N (6,022 × 10²³) nguyên tử hoặc phân tử của chất đó.",
    funFact: "Nếu có 1 mol hạt cát, bạn có thể rải đều lên toàn bộ bề mặt Trái Đất một lớp cát dày tới vài mét!",
    knttReference: "KNTT KHTN 8 - Bài 15: Mol và tỉ khối chất khí"
  },
  {
    id: "q8_12",
    grade: "Lớp 8",
    topic: "KNTT: Thể tích mol chất khí chuẩn KNTT",
    difficulty: "Trung bình",
    question: "Ở điều kiện chuẩn mới theo chương trình KNTT (nhiệt độ 25 °C và áp suất 1 bar), một mol của bất kì chất khí nào đều chiếm thể tích là bao nhiêu?",
    options: ["22,4 lít", "24,79 lít", "24,0 lít", "25,0 lít"],
    correctIndex: 1,
    explanation: "Theo quy chuẩn IUPAC và chương trình SGK mới KNTT, ở điều kiện chuẩn (25 °C, 1 bar), 1 mol chất khí bất kì chiếm thể tích chính xác là 24,79 lít.",
    knttReference: "KNTT KHTN 8 - Bài 15: Mol và tỉ khối chất khí"
  },
  {
    id: "q8_13",
    grade: "Lớp 8",
    topic: "KNTT: Tính số mol từ thể tích khí",
    difficulty: "Trung bình",
    question: "Thể tích của 0,5 mol khí Oxygen (O₂) ở điều kiện chuẩn (25 °C, 1 bar) là bao nhiêu lít?",
    options: ["11,2 L", "12,395 L", "24,79 L", "49,58 L"],
    correctIndex: 1,
    explanation: "V = n × 24,79 = 0,5 × 24,79 = 12,395 lít.",
    knttReference: "KNTT KHTN 8 - Bài 15: Mol và tỉ khối chất khí"
  },
  {
    id: "q8_14",
    grade: "Lớp 8",
    topic: "KNTT: Khối lượng mol",
    difficulty: "Dễ",
    question: "Khối lượng mol của khí Carbon dioxide (CO₂) là bao nhiêu? (C = 12, O = 16)",
    options: ["28 g/mol", "32 g/mol", "44 g/mol", "60 g/mol"],
    correctIndex: 2,
    explanation: "M(CO₂) = 12 + (2 × 16) = 44 g/mol.",
    knttReference: "KNTT KHTN 8 - Bài 15: Mol và tỉ khối chất khí"
  },
  {
    id: "q8_15",
    grade: "Lớp 8",
    topic: "KNTT: Tỉ khối của chất khí",
    difficulty: "Trung bình",
    question: "Khí thiên nhiên Methane (CH₄, M = 16 g/mol) nặng hơn hay nhẹ hơn không khí (M_kk ≈ 29 g/mol)?",
    options: [
      "Nặng hơn không khí",
      "Nhẹ hơn không khí (d ≈ 0,55)",
      "Bằng đúng khối lượng không khí",
      "Không thể so sánh được"
    ],
    correctIndex: 1,
    explanation: "Tỉ khối của CH₄ so với không khí d = 16 / 29 ≈ 0,55 < 1. Khí methane nhẹ hơn không khí nên sẽ bay lên cao.",
    funFact: "Vì khí methane nhẹ hơn không khí nên các hầm khí Biogas nông nghiệp ở Tây Ninh luôn cần lắp van thoát khí an toàn trên cao!",
    knttReference: "KNTT KHTN 8 - Bài 15: Mol và tỉ khối chất khí"
  },
  {
    id: "q8_16",
    grade: "Lớp 8",
    topic: "KNTT: Thu khí trong phòng thí nghiệm",
    difficulty: "Trung bình",
    question: "Khí Carbon dioxide (CO₂, M = 44 g/mol) nặng hơn không khí (M_kk = 29 g/mol). Để thu khí CO₂ vào bình bằng phương pháp đẩy không khí, ta phải đặt bình như thế nào?",
    options: [
      "Úp ngược miệng bình xuống dưới",
      "Đặt ngửa miệng bình lên trên",
      "Đặt nghiêng bình nằm ngang",
      "Úp bình trong chậu nước"
    ],
    correctIndex: 1,
    explanation: "Vì CO₂ nặng hơn không khí (44 > 29) nên nó sẽ chìm xuống đáy bình và đẩy không khí nhẹ hơn tràn ra miệng bình phía trên. Vì vậy phải đặt ngửa bình thu.",
    knttReference: "KNTT KHTN 8 - Bài 15: Mol và tỉ khối chất khí"
  },
  {
    id: "q8_17",
    grade: "Lớp 8",
    topic: "KNTT: Tính khối lượng từ số mol",
    difficulty: "Trung bình",
    question: "Đốt cháy hoàn toàn 2 mol khí Hydrogen (H₂) với khí Oxygen (O₂) theo phương trình: 2H₂ + O₂ → 2H₂O. Khối lượng nước thu được là bao nhiêu gam? (H = 1, O = 16)",
    options: ["18 gam", "36 gam", "2 gam", "32 gam"],
    correctIndex: 1,
    explanation: "Theo phương trình: 2 mol H₂ tạo ra 2 mol H₂O. Khối lượng nước m = n × M = 2 × 18 = 36 gam.",
    knttReference: "KNTT KHTN 8 - Bài 16: Tính theo phương trình hoá học"
  },

  // --- CHỦ ĐỀ 4: DUNG DỊCH & NỒNG ĐỘ (KNTT BÀI 17) ---
  {
    id: "q8_18",
    grade: "Lớp 8",
    topic: "KNTT: Khái niệm dung dịch",
    difficulty: "Dễ",
    question: "Dung dịch là hỗn hợp đồng nhất giữa chất nào và chất nào?",
    options: [
      "Giữa hai chất rắn không tan",
      "Giữa chất tan và dung môi",
      "Giữa dầu ăn và nước cất",
      "Giữa bùn đất và nước sông"
    ],
    correctIndex: 1,
    explanation: "Dung dịch là hỗn hợp đồng nhất của dung môi và chất tan (ví dụ nước đường là dung dịch gồm chất tan là đường và dung môi là nước).",
    knttReference: "KNTT KHTN 8 - Bài 17: Dung dịch và nồng độ"
  },
  {
    id: "q8_19",
    grade: "Lớp 8",
    topic: "KNTT: Nồng độ phần trăm C%",
    difficulty: "Trung bình",
    question: "Công thức tính nồng độ phần trăm (C%) của một dung dịch là gì?",
    options: [
      "C% = (m_ct / m_dd) × 100%",
      "C% = (m_dd / m_ct) × 100%",
      "C% = (V_ct / V_dd) × 100%",
      "C% = (n / V) × 100%"
    ],
    correctIndex: 0,
    explanation: "C% cho biết số gam chất tan có trong 100 gam dung dịch: C% = (m_ct / m_dd) × 100%.",
    knttReference: "KNTT KHTN 8 - Bài 17: Dung dịch và nồng độ"
  },
  {
    id: "q8_20",
    grade: "Lớp 8",
    topic: "KNTT: Tính nồng độ phần trăm",
    difficulty: "Trung bình",
    question: "Hoà tan 15 gam muối ăn (NaCl) vào 85 gam nước cất. Nồng độ phần trăm của dung dịch nước muối thu được là bao nhiêu?",
    options: ["15%", "17,6%", "85%", "10%"],
    correctIndex: 0,
    explanation: "Khối lượng dung dịch m_dd = m_ct + m_dm = 15 + 85 = 100 gam. C% = (15 / 100) × 100% = 15%.",
    knttReference: "KNTT KHTN 8 - Bài 17: Dung dịch và nồng độ"
  },
  {
    id: "q8_21",
    grade: "Lớp 8",
    topic: "KNTT: Nồng độ mol CM",
    difficulty: "Trung bình",
    question: "Hoà tan 0,2 mol NaOH vào nước để được 200 mL (0,2 lít) dung dịch. Nồng độ mol (CM) của dung dịch NaOH này là bao nhiêu?",
    options: ["0,1 M", "1,0 M", "2,0 M", "0,5 M"],
    correctIndex: 1,
    explanation: "CM = n / V = 0,2 mol / 0,2 L = 1,0 mol/L (hay 1,0 M).",
    knttReference: "KNTT KHTN 8 - Bài 17: Dung dịch và nồng độ"
  },
  {
    id: "q8_22",
    grade: "Lớp 8",
    topic: "KNTT: Độ tan của chất rắn trong nước",
    difficulty: "Trung bình",
    question: "Khi tăng nhiệt độ, độ tan của hầu hết các chất rắn (như đường, muối ăn, diêm tiêu) trong nước sẽ biến đổi như thế nào?",
    options: ["Tăng lên", "Giảm đi", "Không đổi", "Biến mất hoàn toàn"],
    correctIndex: 0,
    explanation: "Độ tan của hầu hết các chất rắn trong nước tăng khi nhiệt độ tăng. Đó là lý do vì sao pha đường vào nước ấm sẽ tan nhanh và nhiều hơn nước đá lạnh.",
    knttReference: "KNTT KHTN 8 - Bài 17: Dung dịch và nồng độ"
  },

  // --- CHỦ ĐỀ 5: TỐC ĐỘ PHẢN ỨNG & XÚC TÁC (KNTT BÀI 18) ---
  {
    id: "q8_23",
    grade: "Lớp 8",
    topic: "KNTT: Yếu tố ảnh hưởng tốc độ phản ứng",
    difficulty: "Dễ",
    question: "Hành động nào sau đây làm TĂNG tốc độ của phản ứng hoá học?",
    options: [
      "Hạ nhiệt độ thật thấp",
      "Nghiền nhỏ chất rắn để tăng diện tích tiếp xúc",
      "Pha loãng dung dịch giảm nồng độ",
      "Đậy kín không khuấy trộn"
    ],
    correctIndex: 1,
    explanation: "Nghiền nhỏ chất rắn làm tăng diện tích bề mặt tiếp xúc giữa các chất phản ứng, giúp các hạt va chạm hiệu quả nhiều hơn, làm tốc độ phản ứng tăng mạnh.",
    knttReference: "KNTT KHTN 8 - Bài 18: Tốc độ phản ứng và chất xúc tác"
  },
  {
    id: "q8_24",
    grade: "Lớp 8",
    topic: "KNTT: Chất xúc tác",
    difficulty: "Trung bình",
    question: "Chất xúc tác là chất có vai trò như thế nào trong một phản ứng hoá học?",
    options: [
      "Làm tăng tốc độ phản ứng và bị tiêu hao hoàn toàn sau phản ứng",
      "Làm tăng tốc độ phản ứng nhưng không bị biến đổi về lượng và chất sau phản ứng",
      "Làm chậm phản ứng và biến thành sản phẩm mới",
      "Làm thay đổi bản chất của các sản phẩm tạo thành"
    ],
    correctIndex: 1,
    explanation: "Chất xúc tác là chất làm tăng tốc độ của phản ứng hoá học, nhưng sau phản ứng khối lượng và tính chất hoá học của nó vẫn được giữ nguyên không đổi.",
    funFact: "Men nở (chứa enzyme xúc tác sinh học) giúp các mẻ bánh mì Tây Ninh nở xốp thơm lừng chỉ sau 30 phút ủ ấm!",
    knttReference: "KNTT KHTN 8 - Bài 18: Tốc độ phản ứng và chất xúc tác"
  },
  {
    id: "q8_25",
    grade: "Lớp 8",
    topic: "KNTT: Ứng dụng tốc độ phản ứng trong bảo quản",
    difficulty: "Dễ",
    question: "Bảo quản thực phẩm trong tủ lạnh giúp thức ăn lâu bị hỏng thiu là nhờ ứng dụng yếu tố nào làm giảm tốc độ phản ứng oxi hoá và ức chế vi khuẩn?",
    options: ["Nồng độ", "Diện tích tiếp xúc", "Nhiệt độ", "Áp suất"],
    correctIndex: 2,
    explanation: "Hạ nhiệt độ làm giảm tốc độ của các phản ứng hoá sinh phân huỷ thức ăn và ức chế sự sinh sôi của vi khuẩn ôi thiu.",
    knttReference: "KNTT KHTN 8 - Bài 18: Tốc độ phản ứng và chất xúc tác"
  },

  // --- CHỦ ĐỀ 6: ACID & TÍNH CHẤT (KNTT BÀI 19) ---
  {
    id: "q8_26",
    grade: "Lớp 8",
    topic: "KNTT: Tính chất hoá học của Acid",
    difficulty: "Dễ",
    question: "Dung dịch acid (như HCl, H₂SO₄ loãng) làm giấy quỳ tím chuyển sang màu gì?",
    options: ["Màu xanh", "Màu đỏ", "Màu vàng", "Mất màu"],
    correctIndex: 1,
    explanation: "Dung dịch acid làm quỳ tím đổi màu thành đỏ (hoặc hồng đối với acid yếu).",
    knttReference: "KNTT KHTN 8 - Bài 19: Acid"
  },
  {
    id: "q8_27",
    grade: "Lớp 8",
    topic: "KNTT: Phản ứng Acid với kim loại",
    difficulty: "Trung bình",
    question: "Khi nhỏ dung dịch axit clohiđric (HCl) vào mẩu kim loại kẽm (Zn), hiện tượng quan sát được là gì?",
    options: [
      "Không có hiện tượng gì",
      "Kẽm tan dần và có bọt khí Hydrogen (H₂↑) không màu thoát ra",
      "Dung dịch chuyển sang màu đỏ máu",
      "Xuất hiện kết tủa trắng đục lắng xuống đáy"
    ],
    correctIndex: 1,
    explanation: "Kim loại đứng trước H trong dãy hoạt động phản ứng với acid loãng: Zn + 2HCl → ZnCl₂ + H₂↑ (sủi bọt khí hydro không màu).",
    knttReference: "KNTT KHTN 8 - Bài 19: Acid"
  },
  {
    id: "q8_28",
    grade: "Lớp 8",
    topic: "KNTT: Acid trong đời sống",
    difficulty: "Dễ",
    question: "Chất chua trong giấm ăn dùng pha nước mắm chua ngọt ở gian bếp là dung dịch của axit hữu cơ nào?",
    options: [
      "Axit axetic (CH₃COOH) nồng độ 2–5%",
      "Axit sunfuric (H₂SO₄)",
      "Axit clohidric (HCl)",
      "Axit photphoric (H₃PO₄)"
    ],
    correctIndex: 0,
    explanation: "Giấm ăn chính là dung dịch axit axetic (CH₃COOH) có nồng độ nhẹ từ 2% đến 5%, lên men tự nhiên từ rượu gạo hoặc trái cây.",
    knttReference: "KNTT KHTN 8 - Bài 19: Acid"
  },
  {
    id: "q8_29",
    grade: "Lớp 8",
    topic: "KNTT: Acid trong dịch vị dạ dày",
    difficulty: "Trung bình",
    question: "Dịch vị trong dạ dày của con người có chứa một lượng nhỏ acid nào giúp tiêu hoá thức ăn và tiêu diệt vi khuẩn có hại?",
    options: ["Axit clohiđric (HCl)", "Axit sunfuric (H₂SO₄)", "Axit cacbonic (H₂CO₃)", "Axit nitric (HNO₃)"],
    correctIndex: 0,
    explanation: "Dạ dày tiết ra acid clohiđric (HCl) nồng độ khoảng 0,0001 - 0,001 M (pH khoảng 1,5 - 2,5) để hoạt hoá men pepsin tiêu hoá protein thức ăn.",
    funFact: "Nếu bị ợ chua do dư acid dạ dày, người ta thường uống gói thuốc muối chứa NaHCO₃ để trung hoà bớt lượng acid thừa!",
    knttReference: "KNTT KHTN 8 - Bài 19: Acid"
  },
  {
    id: "q8_30",
    grade: "Lớp 8",
    topic: "KNTT: An toàn pha acid đặc",
    difficulty: "Thử thách",
    question: "Để pha loãng axit sunfuric đặc (H₂SO₄) an toàn tuyệt đối, người làm thí nghiệm bắt buộc phải thao tác như thế nào?",
    options: [
      "Rót thật nhanh nước vào lọ đựng axit đặc",
      "Rót từ từ axit dọc theo đũa thuỷ tinh vào cốc đựng sẵn nước và khuấy đều",
      "Đổ đồng thời cả nước và axit đặc vào cùng một lúc",
      "Đun nóng axit trước rồi mới rót nước vào"
    ],
    correctIndex: 1,
    explanation: "H₂SO₄ đặc hút nước toả nhiệt cực lớn. Nếu đổ nước vào axit, nước sôi bùng lên tức thì bắn axit gây bỏng nặng. Bắt buộc phải rót từ từ AXIT VÀO NƯỚC!",
    knttReference: "KNTT KHTN 8 - Bài 19: Acid"
  },

  // --- CHỦ ĐỀ 7: BASE & THANG ĐO pH (KNTT BÀI 20) ---
  {
    id: "q8_31",
    grade: "Lớp 8",
    topic: "KNTT: Tính chất hoá học của Base",
    difficulty: "Dễ",
    question: "Dung dịch kiềm (base tan như NaOH, Ca(OH)₂) làm giấy quỳ tím đổi sang màu gì?",
    options: ["Màu đỏ", "Màu xanh", "Màu vàng", "Mất màu hoàn toàn"],
    correctIndex: 1,
    explanation: "Dung dịch kiềm làm giấy quỳ tím hoá xanh và làm dung dịch phenolphthalein không màu chuyển sang màu hồng cánh sen.",
    knttReference: "KNTT KHTN 8 - Bài 20: Base"
  },
  {
    id: "q8_32",
    grade: "Lớp 8",
    topic: "KNTT: Phân loại Base",
    difficulty: "Trung bình",
    question: "Base nào sau đây KHÔNG TAN trong nước ở nhiệt độ thường?",
    options: ["Sodium hydroxide (NaOH)", "Potassium hydroxide (KOH)", "Copper(II) hydroxide (Cu(OH)₂)", "Barium hydroxide (Ba(OH)₂)"],
    correctIndex: 2,
    explanation: "Cu(OH)₂ là kết tủa màu xanh lam không tan trong nước. Các base của kim loại kiềm (Na, K, Ba, Ca) là base tan (kiềm).",
    knttReference: "KNTT KHTN 8 - Bài 20: Base"
  },
  {
    id: "q8_33",
    grade: "Lớp 8",
    topic: "KNTT: Phản ứng trung hoà",
    difficulty: "Dễ",
    question: "Phản ứng giữa một Acid và một Base luôn tạo ra sản phẩm gồm hai loại chất nào?",
    options: ["Kim loại và nước", "Muối và nước", "Chất khí và oxide", "Chỉ tạo ra muối"],
    correctIndex: 1,
    explanation: "Phản ứng trung hoà: Acid + Base → Muối + Nước (ví dụ: HCl + NaOH → NaCl + H₂O).",
    knttReference: "KNTT KHTN 8 - Bài 20: Base"
  },
  {
    id: "q8_34",
    grade: "Lớp 8",
    topic: "KNTT: Thang đo pH",
    difficulty: "Dễ",
    question: "Nước tinh khiết ở 25 °C có môi trường trung tính với giá trị pH bằng bao nhiêu?",
    options: ["pH = 0", "pH = 7", "pH = 14", "pH = 1"],
    correctIndex: 1,
    explanation: "Dung dịch trung tính có pH = 7. Dung dịch có tính acid có pH < 7. Dung dịch có tính base có pH > 7.",
    knttReference: "KNTT KHTN 8 - Bài 20: Thang pH"
  },
  {
    id: "q8_35",
    grade: "Lớp 8",
    topic: "KNTT: Thang đo pH",
    difficulty: "Trung bình",
    question: "Nước ép quả chanh tươi có vị rất chua. Giá trị pH của nước chanh nằm trong khoảng nào sau đây?",
    options: ["pH khoảng 2–3 (môi trường acid)", "pH = 7 (trung tính)", "pH khoảng 9–10 (môi trường base)", "pH = 14"],
    correctIndex: 0,
    explanation: "Nước chanh chứa nhiều axit citric nên có tính axit mạnh, pH khoảng 2 đến 3.",
    knttReference: "KNTT KHTN 8 - Bài 20: Thang pH"
  },
  {
    id: "q8_36",
    grade: "Lớp 8",
    topic: "KNTT: Cải tạo đất chua nông nghiệp",
    difficulty: "Trung bình",
    question: "Bà con nông dân Tây Ninh thường bón vôi bột (CaO hoặc Ca(OH)₂) vào ruộng đất bị chua để làm gì?",
    options: [
      "Tăng độ chua của đất",
      "Khử chua cho đất (nâng độ pH của đất về mức thích hợp)",
      "Diệt trừ giun đất",
      "Làm đất khô cứng lại"
    ],
    correctIndex: 1,
    explanation: "Đất chua có nồng độ ion H⁺ cao (pH < 5,5). Vôi có tính base sẽ trung hoà lượng acid dư thừa, nâng pH lên mức 6,5 - 7 giúp cây trồng hấp thụ dinh dưỡng tốt nhất.",
    knttReference: "KNTT KHTN 8 - Bài 20: Ứng dụng của thang pH"
  },

  // --- CHỦ ĐỀ 8: OXIDE (KNTT BÀI 21) ---
  {
    id: "q8_37",
    grade: "Lớp 8",
    topic: "KNTT: Phân loại Oxide",
    difficulty: "Dễ",
    question: "Oxide nào sau đây thuộc loại OXIDE ACID (khi tác dụng với nước tạo thành dung dịch acid tương ứng)?",
    options: ["Carbon dioxide (CO₂)", "Calcium oxide (CaO)", "Sodium oxide (Na₂O)", "Magnesium oxide (MgO)"],
    correctIndex: 0,
    explanation: "CO₂ là oxide của phi kim, tác dụng với nước tạo acid carbonic: CO₂ + H₂O ⇌ H₂CO₃, nên CO₂ là oxide acid.",
    knttReference: "KNTT KHTN 8 - Bài 21: Oxide"
  },
  {
    id: "q8_38",
    grade: "Lớp 8",
    topic: "KNTT: Phân loại Oxide",
    difficulty: "Dễ",
    question: "Vôi sống có công thức hoá học là CaO thuộc loại oxide nào?",
    options: ["Oxide acid", "Oxide base", "Oxide trung tính", "Oxide lưỡng tính"],
    correctIndex: 1,
    explanation: "CaO là oxide của kim loại canxi, tác dụng với nước tạo dung dịch base canxi hydroxide Ca(OH)₂ nên là oxide base.",
    knttReference: "KNTT KHTN 8 - Bài 21: Oxide"
  },
  {
    id: "q8_39",
    grade: "Lớp 8",
    topic: "KNTT: Tôi vôi toả nhiệt",
    difficulty: "Trung bình",
    question: "Quá trình 'tôi vôi' khi cho nước vào vôi sống CaO toả nhiệt rất mạnh, sinh ra chất nào sau đây?",
    options: ["Vôi tôi (Calcium hydroxide, Ca(OH)₂)", "Đá vôi (CaCO₃)", "Khí Oxygen (O₂)", "Calcium chloride (CaCl₂)"],
    correctIndex: 0,
    explanation: "Phản ứng tôi vôi: CaO + H₂O → Ca(OH)₂ + Nhiệt lượng lớn.",
    knttReference: "KNTT KHTN 8 - Bài 21: Oxide"
  },
  {
    id: "q8_40",
    grade: "Lớp 8",
    topic: "KNTT: Khí độc hại trung tính",
    difficulty: "Thử thách",
    question: "Khí Carbon monoxide (CO) sinh ra khi đốt than tổ ong trong phòng kín là loại oxide nào và vì sao cực kì nguy hiểm?",
    options: [
      "Oxide base; làm ăn mòn niêm mạc phổi",
      "Oxide trung tính (không tạo muối); liên kết chặt với hemoglobin trong máu làm mất khả năng vận chuyển oxy gây ngạt thở",
      "Oxide acid; làm chua máu",
      "Chất khí hoàn toàn vô hại"
    ],
    correctIndex: 1,
    explanation: "Khí CO là oxide trung tính không tác dụng với acid hay base. CO hít vào sẽ cạnh tranh gắn chặt với sắc tố hemoglobin trong hồng cầu mạnh gấp 250 lần so với O₂, gây ngạt thở dẫn đến tử vong nhanh chóng.",
    funFact: "Tuyệt đối không đốt bếp than sưởi ấm trong phòng đóng kín cửa sổ vào mùa đông để tránh ngộ độc khí CO!",
    knttReference: "KNTT KHTN 8 - Bài 21: Oxide"
  },

  // --- CHỦ ĐỀ 9: MUỐI & PHẢN ỨNG TRAO ĐỔI (KNTT BÀI 22) ---
  {
    id: "q8_41",
    grade: "Lớp 8",
    topic: "KNTT: Khái niệm Muối",
    difficulty: "Dễ",
    question: "Phân tử muối được cấu tạo bởi thành phần nào sau đây?",
    options: [
      "Nguyên tử kim loại (hoặc nhóm NH₄⁺) liên kết với gốc acid",
      "Nguyên tử kim loại liên kết với một hay nhiều nhóm -OH",
      "Nguyên tử hydrogen liên kết với gốc acid",
      "Chỉ gồm các nguyên tử phi kim"
    ],
    correctIndex: 0,
    explanation: "Muối là hợp chất được tạo ra từ sự thay thế ion H⁺ trong acid bằng ion kim loại hoặc ion amoni (NH₄⁺) liên kết với gốc acid.",
    knttReference: "KNTT KHTN 8 - Bài 22: Muối"
  },
  {
    id: "q8_42",
    grade: "Lớp 8",
    topic: "KNTT: Phản ứng trao đổi trong dung dịch",
    difficulty: "Trung bình",
    question: "Điều kiện để phản ứng trao đổi giữa hai dung dịch muối hoặc giữa muối với acid/base xảy ra là gì?",
    options: [
      "Chỉ cần đun nóng thật sôi",
      "Sản phẩm tạo thành phải có ít nhất một chất kết tủa không tan hoặc một chất khí bay hơi",
      "Không cần bất kì điều kiện gì",
      "Cả hai chất sản phẩm đều phải tan hoàn toàn"
    ],
    correctIndex: 1,
    explanation: "Phản ứng trao đổi trong dung dịch các chất điện li chỉ xảy ra khi có ít nhất một trong các điều kiện: tạo kết tủa (chất không tan), tạo chất khí, hoặc tạo chất điện li yếu (như H₂O).",
    knttReference: "KNTT KHTN 8 - Bài 22: Muối"
  },
  {
    id: "q8_43",
    grade: "Lớp 8",
    topic: "KNTT: Nhận biết gốc sulfate",
    difficulty: "Trung bình",
    question: "Để nhận biết gốc sulfate (SO₄²⁻) trong dung dịch muối hoặc acid H₂SO₄, người ta thường dùng thuốc thử nào để tạo kết tủa trắng không tan?",
    options: ["Dung dịch chứa ion Barium (như BaCl₂, Ba(OH)₂)", "Dung dịch NaOH", "Quỳ tím", "Dung dịch AgNO₃"],
    correctIndex: 0,
    explanation: "Ion Ba²⁺ phản ứng với ion SO₄²⁻ tạo kết tủa trắng Barium sulfate (BaSO₄) cực kì bền vững, không tan trong cả nước và các acid mạnh.",
    knttReference: "KNTT KHTN 8 - Bài 22: Muối"
  },
  {
    id: "q8_44",
    grade: "Lớp 8",
    topic: "KNTT: Baking soda trong làm bánh",
    difficulty: "Dễ",
    question: "Muối nở (Baking soda) dùng làm bánh xốp phồng có công thức hoá học là gì?",
    options: ["Sodium chloride (NaCl)", "Sodium hydrogen carbonate (NaHCO₃)", "Calcium carbonate (CaCO₃)", "Copper sulfate (CuSO₄)"],
    correctIndex: 1,
    explanation: "Baking soda là Natri hiđrocacbonat (NaHCO₃). Khi nướng bánh ở nhiệt độ cao, NaHCO₃ bị nhiệt phân giải phóng khí CO₂ làm bánh nở bung xốp mịn màng.",
    knttReference: "KNTT KHTN 8 - Bài 22: Muối"
  },

  // --- CHỦ ĐỀ 10: PHÂN BÓN HOÁ HỌC (KNTT BÀI 23) ---
  {
    id: "q8_45",
    grade: "Lớp 8",
    topic: "KNTT: Phân bón hoá học",
    difficulty: "Dễ",
    question: "Phân bón hoá học nào cung cấp nguyên tố dinh dưỡng NITROGEN (N) kích thích cây trồng phát triển cành lá xanh tốt?",
    options: ["Phân đạm", "Phân lân", "Phân kali", "Phân vi lượng"],
    correctIndex: 0,
    explanation: "Phân đạm cung cấp nguyên tố dinh dưỡng Nitrogen (N), kích thích cây đâm chồi, nảy lộc và phát triển cành lá xum xuê.",
    knttReference: "KNTT KHTN 8 - Bài 23: Phân bón hoá học"
  },
  {
    id: "q8_46",
    grade: "Lớp 8",
    topic: "KNTT: Phân bón hoá học",
    difficulty: "Dễ",
    question: "Phân bón hoá học nào cung cấp nguyên tố dinh dưỡng PHOSPHORUS (P) giúp kích thích sự phát triển của bộ rễ cây?",
    options: ["Phân đạm", "Phân lân", "Phân kali", "Vôi bột"],
    correctIndex: 1,
    explanation: "Phân lân cung cấp nguyên tố Phosphorus (P) dưới dạng ion photphat, thúc đẩy sự phát triển của bộ rễ, sự ra hoa kết trái của cây trồng.",
    knttReference: "KNTT KHTN 8 - Bài 23: Phân bón hoá học"
  },
  {
    id: "q8_47",
    grade: "Lớp 8",
    topic: "KNTT: Phân bón hoá học",
    difficulty: "Dễ",
    question: "Phân bón KALI cung cấp nguyên tố nào giúp cây trồng cứng cáp, chống đổ ngã và tăng khả năng chịu hạn, chống sâu bệnh?",
    options: ["Potassium (K)", "Calcium (Ca)", "Sodium (Na)", "Iron (Fe)"],
    correctIndex: 0,
    explanation: "Phân kali cung cấp nguyên tố Potassium (K), giúp tăng cường sự tổng hợp đường bột, làm thân cây cứng cáp chịu hạn và kháng sâu bệnh tốt.",
    knttReference: "KNTT KHTN 8 - Bài 23: Phân bón hoá học"
  },
  {
    id: "q8_48",
    grade: "Lớp 8",
    topic: "KNTT: Phân bón N-P-K",
    difficulty: "Trung bình",
    question: "Trên bao bì phân hỗn hợp NPK ghi chỉ số '16-16-8'. Ba con số này biểu thị tỉ lệ phần trăm dinh dưỡng của những thành phần nào?",
    options: [
      "%N, %P₂O₅, %K₂O",
      "%N, %P, %K",
      "%Na, %P, %K",
      "%Nước, %Phân chuồng, %Khoáng chất"
    ],
    correctIndex: 0,
    explanation: "Chỉ số NPK 16-16-8 biểu thị tỷ lệ phần trăm khối lượng của %N (đạm), %P₂O₅ (lân hữu hiệu) và %K₂O (kali hữu hiệu) trong phân bón.",
    knttReference: "KNTT KHTN 8 - Bài 23: Phân bón hoá học"
  },
  {
    id: "q8_49",
    grade: "Lớp 8",
    topic: "KNTT: Bảo vệ môi trường nông nghiệp",
    difficulty: "Trung bình",
    question: "Hậu quả tiêu cực nào sẽ xảy ra nếu người nông dân bón thừa quá nhiều phân đạm hoá học cho đồng ruộng?",
    options: [
      "Gây hiện tượng phú dưỡng làm ô nhiễm nguồn nước ngầm và ao hồ",
      "Làm nông sản tích tụ nitrat dư thừa có hại cho sức khoẻ người ăn",
      "Làm đất bị chua hoá và thoái hoá bạc màu",
      "Tất cả các hậu quả tiêu cực trên"
    ],
    correctIndex: 3,
    explanation: "Lạm dụng phân bón vô cơ gây ô nhiễm nguồn nước (phú dưỡng tảo nở hoa), tích tụ nitrat độc hại trong rau củ quả và làm đất chai cứng chua hoá.",
    knttReference: "KNTT KHTN 8 - Bài 23: Phân bón hoá học"
  },
  {
    id: "q8_50",
    grade: "Lớp 8",
    topic: "KNTT: Phân đạm Ure",
    difficulty: "Thử thách",
    question: "Phân đạm Ure có công thức hoá học CO(NH₂)₂. Hàm lượng phần trăm nguyên tố dinh dưỡng Nitrogen trong phân đạm Ure nguyên chất là xấp xỉ bao nhiêu?",
    options: ["20%", "35%", "46,67%", "60%"],
    correctIndex: 2,
    explanation: "Khối lượng mol CO(NH₂)₂ = 60 g/mol. %N = (2 × 14 / 60) × 100% = (28 / 60) × 100% ≈ 46,67%. Đây là loại phân đạm có hàm lượng N cao nhất.",
    knttReference: "KNTT KHTN 8 - Bài 23: Phân bón hoá học"
  }
];
