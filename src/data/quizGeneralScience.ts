import { QuizQuestion } from "../types";

export const QUIZ_GENERAL_SCIENCE: QuizQuestion[] = [
  {
    id: "q_sci1",
    grade: "Chung",
    topic: "Lịch sử Khoa học & Danh nhân",
    difficulty: "Trung bình",
    question: "Nhà nữ bác học vĩ đại nào là người phụ nữ đầu tiên và duy nhất trong lịch sử đoạt hai giải Nobel ở hai lĩnh vực khoa học khác nhau (Vật lý 1903 và Hoá học 1911)?",
    options: ["Marie Curie", "Rosalind Franklin", "Ada Lovelace", "Lise Meitner"],
    correctIndex: 0,
    explanation: "Marie Curie (người Ba Lan - Pháp) đã phát hiện ra hai nguyên tố phóng xạ mới là Polonium (đặt theo tên quê hương Ba Lan của bà) và Radium, mở ra kỷ nguyên năng lượng hạt nhân và xạ trị y học.",
    funFact: "Marie Curie là thần tượng truyền cảm hứng cho hàng triệu bạn nữ đam mê nghiên cứu khoa học trên toàn thế giới!",
    knttReference: "Lịch sử phát triển các nguyên tố hoá học"
  },
  {
    id: "q_sci2",
    grade: "Chung",
    topic: "Lịch sử Khoa học & Danh nhân",
    difficulty: "Dễ",
    question: "Ai là nhà hoá học người Nga thiên tài đã sắp xếp các nguyên tố vào Bảng tuần hoàn đầu tiên năm 1869 và dự đoán chính xác sự tồn tại của những nguyên tố chưa được tìm thấy?",
    options: [
      "Dmitri Mendeleev",
      "Antoine Lavoisier",
      "John Dalton",
      "Ernest Rutherford"
    ],
    correctIndex: 0,
    explanation: "Dmitri Ivanovich Mendeleev (1834 – 1907) đã lập nên Bảng tuần hoàn đầu tiên. Ông để trống các ô và dự đoán chuẩn xác tính chất của các nguyên tố như Gallium (Ga) và Germanium (Ge) trước khi con người phát hiện ra chúng!",
    knttReference: "KNTT Lớp 7 - Bài 4: Bảng tuần hoàn Mendeleev"
  },
  {
    id: "q_safe1",
    grade: "Chung",
    topic: "An toàn phòng thí nghiệm",
    difficulty: "Dễ",
    question: "Quy tắc an toàn nào sau đây là BẮT BUỘC khi bước vào phòng thực hành Hoá học của trường THCS Lý Tự Trọng?",
    options: [
      "Được phép tự ý nếm hoặc ngửi trực tiếp hoá chất",
      "Đeo kính bảo hộ, mặc áo blouse và không ăn uống trong phòng thí nghiệm",
      "Chạy nhảy đùa giỡn quanh bàn thực hành",
      "Đổ hoá chất thừa tuỳ tiện vào bồn rửa tay mà không hỏi giáo viên"
    ],
    correctIndex: 1,
    explanation: "Quy tắc an toàn tuyệt đối: Luôn mặc áo blouse, đeo găng tay/kính bảo hộ phù hợp, tuân thủ hướng dẫn của giáo viên và tuyệt đối không ăn uống trong phòng thí nghiệm.",
    knttReference: "KNTT - Kỹ năng an toàn phòng thí nghiệm"
  },
  {
    id: "q_safe2",
    grade: "Chung",
    topic: "An toàn phòng thí nghiệm",
    difficulty: "Trung bình",
    question: "Nếu chẳng may xảy ra đám cháy do cồn (rượu) hoặc xăng dầu bị đổ trong phòng thí nghiệm, chất nào sau đây TUYỆT ĐỐI KHÔNG ĐƯỢC DÙNG để dập lửa?",
    options: [
      "Nước lọc",
      "Cát khô",
      "Bình chữa cháy khí CO₂",
      "Khăn vải nhúng ướt trùm lên ngọn lửa"
    ],
    correctIndex: 0,
    explanation: "Xăng dầu và cồn nhẹ hơn nước. Nếu dội nước vào, xăng dầu cồn sẽ nổi lên trên mặt nước, loang rộng ra xung quanh khiến đám cháy bùng phát dữ dội hơn. Phải dùng cát, bình khí CO₂ hoặc chăn ướt trùm phủ cách ly oxy!",
    knttReference: "KNTT - Kỹ năng an toàn và xử lý sự cố hoá chất"
  }
];
