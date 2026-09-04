import { QuizQuestion } from "../types";

export const QUIZ_GRADE_9: QuizQuestion[] = [
  // --- CHỦ ĐỀ 1: KIM LOẠI & TÍNH CHẤT (KNTT BÀI: TÍNH CHẤT KIM LOẠI) ---
  {
    id: "q9_1",
    grade: "Lớp 9",
    topic: "KNTT: Tính chất vật lý của kim loại",
    difficulty: "Dễ",
    question: "Kim loại nào sau đây có tính dẫn điện và dẫn nhiệt tốt nhất trong tất cả các kim loại?",
    options: ["Đồng (Copper, Cu)", "Bạc (Silver, Ag)", "Vàng (Gold, Au)", "Nhôm (Aluminium, Al)"],
    correctIndex: 1,
    explanation: "Bạc (Ag) là kim loại dẫn điện và dẫn nhiệt tốt nhất, tiếp theo là Đồng (Cu), Vàng (Au) và Nhôm (Al). Vì bạc đắt tiền nên người ta dùng đồng và nhôm làm dây dẫn điện phổ biến.",
    knttReference: "KNTT KHTN 9 - Bài: Tính chất của kim loại"
  },
  {
    id: "q9_2",
    grade: "Lớp 9",
    topic: "KNTT: Tính chất vật lý của kim loại",
    difficulty: "Dễ",
    question: "Kim loại duy nhất ở thể LỎNG ở nhiệt độ phòng (khoảng 25 °C) thường được dùng trong nhiệt kế y tế truyền thống là gì?",
    options: ["Chì (Pb)", "Thuỷ ngân (Mercury, Hg)", "Thiếc (Sn)", "Bromine (Br₂)"],
    correctIndex: 1,
    explanation: "Thuỷ ngân (Hg) có nhiệt độ nóng chảy rất thấp (-38,83 °C) nên ở điều kiện thường nó tồn tại ở thể lỏng. Bromine cũng là chất lỏng nhưng thuộc nhóm phi kim.",
    knttReference: "KNTT KHTN 9 - Bài: Tính chất của kim loại"
  },
  {
    id: "q9_3",
    grade: "Lớp 9",
    topic: "KNTT: Tính dẻo của kim loại",
    difficulty: "Dễ",
    question: "Kim loại nào có tính dẻo cao nhất, có thể dát mỏng đến mức ánh sáng có thể xuyên qua (dày chỉ 0,0001 mm) để dát vàng tượng Phật?",
    options: ["Sắt (Fe)", "Vàng (Gold, Au)", "Chì (Pb)", "Kẽm (Zn)"],
    correctIndex: 1,
    explanation: "Vàng (Au) là kim loại có tính dẻo nhất. Chỉ từ 1 gam vàng nguyên chất, các nghệ nhân có thể kéo thành sợi chỉ mảnh dài tới 3 km hoặc dát thành lá vàng diện tích 1 m²!",
    knttReference: "KNTT KHTN 9 - Bài: Tính chất của kim loại"
  },

  // --- CHỦ ĐỀ 2: DÃY HOẠT ĐỘNG HOÁ HỌC CỦA KIM LOẠI ---
  {
    id: "q9_4",
    grade: "Lớp 9",
    topic: "KNTT: Dãy hoạt động hoá học",
    difficulty: "Dễ",
    question: "Trong câu vè ghi nhớ dãy hoạt động hoá học: 'Khi Nào Ba Cần May Áo Záp Sắt Phải Hỏi Cửa Hàng Á Phi Âu', kim loại nào hoạt động hoá học MẠNH NHẤT?",
    options: ["Potassium (K)", "Sodium (Na)", "Iron (Fe)", "Gold (Au)"],
    correctIndex: 0,
    explanation: "Đầu dãy là Potassium (K), kim loại có tính khử mạnh nhất trong dãy, phản ứng mãnh liệt với nước ngay ở nhiệt độ thường tạo dung dịch kiềm và giải phóng H₂↑.",
    knttReference: "KNTT KHTN 9 - Bài: Dãy hoạt động hoá học của kim loại"
  },
  {
    id: "q9_5",
    grade: "Lớp 9",
    topic: "KNTT: Dãy hoạt động hoá học",
    difficulty: "Trung bình",
    question: "Kim loại nào sau đây KHÔNG THỂ đẩy được khí Hydrogen (H₂) ra khỏi dung dịch axit loãng (HCl, H₂SO₄ loãng)?",
    options: ["Magnesium (Mg)", "Zinc (Zn)", "Copper (Đồng, Cu)", "Iron (Fe)"],
    correctIndex: 2,
    explanation: "Đồng (Cu) đứng SAU Hydrogen (H) trong dãy hoạt động hoá học nên không thể tác dụng với các acid loãng như HCl, H₂SO₄ loãng để giải phóng H₂.",
    knttReference: "KNTT KHTN 9 - Bài: Dãy hoạt động hoá học của kim loại"
  },
  {
    id: "q9_6",
    grade: "Lớp 9",
    topic: "KNTT: Kim loại đẩy kim loại ra khỏi muối",
    difficulty: "Trung bình",
    question: "Nhúng một chiếc đinh sắt (Fe) sạch vào cốc đựng dung dịch đồng(II) sulfate (CuSO₄) màu xanh lam. Hiện tượng xảy ra là gì?",
    options: [
      "Không có hiện tượng gì",
      "Có lớp kim loại màu đỏ (Cu) bám ngoài đinh sắt, màu xanh lam của dung dịch nhạt dần",
      "Đinh sắt tan hoàn toàn và có khí mùi hắc thoát ra",
      "Dung dịch chuyển sang màu tím đậm"
    ],
    correctIndex: 1,
    explanation: "Phương trình: Fe + CuSO₄ → FeSO₄ + Cu↓. Sắt hoạt động mạnh hơn đồng nên đẩy đồng ra bám vào đinh sắt (màu đỏ đồng), đồng thời nồng độ ion Cu²⁺ màu xanh giảm dần.",
    knttReference: "KNTT KHTN 9 - Bài: Dãy hoạt động hoá học của kim loại"
  },

  // --- CHỦ ĐỀ 3: NHÔM & SẮT (ALUMINIUM & IRON) ---
  {
    id: "q9_7",
    grade: "Lớp 9",
    topic: "KNTT: Nhôm (Aluminium)",
    difficulty: "Trung bình",
    question: "Đồ dùng bằng nhôm (nồi xoong, chậu nhôm) rất bền trong không khí và nước là nhờ có lớp màng bảo vệ nào trên bề mặt?",
    options: [
      "Lớp màng oxit nhôm (Al₂O₃) cực mỏng, mịn và rất bền vững",
      "Lớp dầu mỡ do nhà máy bôi trơn",
      "Lớp sơn bóng trong suốt",
      "Lớp mạ kẽm"
    ],
    correctIndex: 0,
    explanation: "Nhôm phản ứng tức thì với oxy không khí tạo thành lớp màng Al₂O₃ cực mỏng (khoảng 0,0001 mm) bám khít chặt trên bề mặt, ngăn cản không khí và nước tiếp xúc với nhôm bên trong.",
    knttReference: "KNTT KHTN 9 - Bài: Nhôm"
  },
  {
    id: "q9_8",
    grade: "Lớp 9",
    topic: "KNTT: Nhôm phản ứng với kiềm",
    difficulty: "Thử thách",
    question: "Vì sao chúng ta TUYỆT ĐỐI KHÔNG NÊN dùng chậu nhôm hoặc nồi nhôm để ngâm nước vôi, xút (NaOH) hay đựng đồ ăn có tính kiềm mạnh?",
    options: [
      "Vì nhôm sẽ bị gỉ sét màu nâu",
      "Vì lớp màng Al₂O₃ và bản thân nhôm đều tan được trong dung dịch kiềm mạnh, làm thủng nồi",
      "Vì kiềm làm nhôm biến thành sắt",
      "Vì làm thức ăn bị ngọt"
    ],
    correctIndex: 1,
    explanation: "Al₂O₃ là oxit lưỡng tính và Al tan được trong dung dịch kiềm (NaOH, Ca(OH)₂) tạo muối aluminat và giải phóng H₂↑, làm đồ nhôm bị ăn mòn và thủng nhanh chóng.",
    knttReference: "KNTT KHTN 9 - Bài: Nhôm"
  },
  {
    id: "q9_9",
    grade: "Lớp 9",
    topic: "KNTT: Gang và Thép",
    difficulty: "Trung bình",
    question: "Gang và thép đều là hợp kim của sắt (Fe) với carbon (C). Điểm khác biệt cơ bản về thành phần giữa gang và thép là gì?",
    options: [
      "Gang chứa 2% đến 5% Carbon; Thép chứa dưới 2% Carbon",
      "Gang chứa dưới 2% Carbon; Thép chứa trên 5% Carbon",
      "Gang không chứa Carbon; Thép chứa rất nhiều Carbon",
      "Gang dẻo hơn thép rất nhiều"
    ],
    correctIndex: 0,
    explanation: "Gang là hợp kim của Fe với C (hàm lượng C chiếm từ 2% - 5%), cứng và giòn. Thép là hợp kim Fe với C (hàm lượng C dưới 2%), dẻo dai và chịu lực tốt hơn.",
    knttReference: "KNTT KHTN 9 - Bài: Hợp kim của sắt"
  },

  // --- CHỦ ĐỀ 4: SỰ ĂN MÒN KIM LOẠI & BẢO VỆ ---
  {
    id: "q9_10",
    grade: "Lớp 9",
    topic: "KNTT: Sự ăn mòn kim loại",
    difficulty: "Dễ",
    question: "Sự phá huỷ kim loại hoặc hợp kim do tác dụng hoá học của môi trường xung quanh được gọi là gì?",
    options: ["Sự thăng hoa", "Sự ăn mòn kim loại", "Sự tôi kim loại", "Sự ngưng tụ"],
    correctIndex: 1,
    explanation: "Sự ăn mòn kim loại là sự phá huỷ kim loại hoặc hợp kim do tác dụng hoá học hoặc điện hoá của môi trường xung quanh (như không khí ẩm, nước biển, axit...).",
    knttReference: "KNTT KHTN 9 - Bài: Sự ăn mòn kim loại và bảo vệ kim loại"
  },
  {
    id: "q9_11",
    grade: "Lớp 9",
    topic: "KNTT: Bảo vệ kim loại",
    difficulty: "Dễ",
    question: "Biện pháp nào sau đây giúp bảo vệ vỏ tàu thuỷ bằng thép khi chạy trên biển Tây Nam Bộ?",
    options: [
      "Sơn chống rỉ và gắn các tấm kẽm (Zinc, Zn) vào đuôi vỏ tàu",
      "Đổ muối lên thân tàu",
      "Ngâm tàu trong dung dịch axit",
      "Cạo sạch lớp sơn để kim loại sáng bóng"
    ],
    correctIndex: 0,
    explanation: "Gắn các tấm Kẽm (Zn) vào vỏ tàu thép là phương pháp bảo vệ điện hoá: Kẽm hoạt động mạnh hơn sắt sẽ bị ăn mòn trước (vật hy sinh), bảo vệ thép của thân tàu nguyên vẹn.",
    funFact: "Nhờ gắn các khối kẽm hy sinh, những chiếc tàu chở hàng siêu trọng tải có thể hoạt động bền bỉ 20-30 năm giữa đại dương nước mặn!",
    knttReference: "KNTT KHTN 9 - Bài: Sự ăn mòn kim loại và bảo vệ kim loại"
  },
  {
    id: "q9_12",
    grade: "Lớp 9",
    topic: "KNTT: Thép không gỉ (Inox)",
    difficulty: "Trung bình",
    question: "Để chế tạo thép không gỉ (Inox 304) dùng làm thìa đũa, xoong nồi y tế, người ta thêm những kim loại nào vào sắt?",
    options: [
      "Crom (Chromium, Cr) và Niken (Nickel, Ni)",
      "Vàng (Au) và Bạc (Ag)",
      "Đồng (Cu) và Chì (Pb)",
      "Nhôm (Al) và Magie (Mg)"
    ],
    correctIndex: 0,
    explanation: "Thêm khoảng 18% Crom và 8% Niken vào thép giúp tạo lớp màng oxit crom thụ động siêu bền ngăn cản hoàn toàn sự gỉ sét do nước và oxy.",
    knttReference: "KNTT KHTN 9 - Bài: Sự ăn mòn kim loại"
  },

  // --- CHỦ ĐỀ 5: CARBON & DẠNG THÙ HÌNH ---
  {
    id: "q9_13",
    grade: "Lớp 9",
    topic: "KNTT: Dạng thù hình của Carbon",
    difficulty: "Dễ",
    question: "Kim cương lấp lánh và than chì đen mềm dùng làm ruột bút chì đều được cấu tạo từ cùng một nguyên tố hoá học nào?",
    options: ["Silicon (Si)", "Carbon (C)", "Sulfur (S)", "Phosphorus (P)"],
    correctIndex: 1,
    explanation: "Kim cương và than chì là các dạng thù hình của cùng một nguyên tố Carbon (C), do cấu trúc tinh thể liên kết nguyên tử khác nhau nên có tính chất vật lý hoàn toàn trái ngược.",
    knttReference: "KNTT KHTN 9 - Bài: Carbon và các dạng thù hình"
  },
  {
    id: "q9_14",
    grade: "Lớp 9",
    topic: "KNTT: Than hoạt tính",
    difficulty: "Dễ",
    question: "Than hoạt tính được dùng trong lõi bình lọc nước, mặt nạ phòng độc và khử mùi tủ lạnh là nhờ tính chất đặc trưng nào?",
    options: [
      "Tính dẫn điện cực tốt",
      "Tính hấp phụ màu và mùi độc hại trên bề mặt xốp rỗng",
      "Tính dẻo dễ uốn nắn",
      "Tính phát quang trong bóng tối"
    ],
    correctIndex: 1,
    explanation: "Than hoạt tính có cấu trúc xốp rỗng với hàng triệu lỗ li ti, tạo ra diện tích bề mặt khổng lồ (1 gam than hoạt tính có diện tích bề mặt tương đương cả một sân bóng đá) giúp hấp phụ chất độc rất mạnh.",
    knttReference: "KNTT KHTN 9 - Bài: Carbon và các dạng thù hình"
  },
  {
    id: "q9_15",
    grade: "Lớp 9",
    topic: "KNTT: Nhận biết khí Carbon dioxide",
    difficulty: "Dễ",
    question: "Thuốc thử hoá học đặc trưng dùng để nhận biết khí Carbon dioxide (CO₂) làm vẩn đục màu trắng sữa là dung dịch nào?",
    options: [
      "Nước cất",
      "Nước vôi trong (dung dịch Ca(OH)₂)",
      "Dung dịch Axit clohidric (HCl)",
      "Dung dịch muối ăn (NaCl)"
    ],
    correctIndex: 1,
    explanation: "Khí CO₂ phản ứng với nước vôi trong tạo kết tủa trắng Canxi cacbonat: CO₂ + Ca(OH)₂ → CaCO₃↓ (kết tủa trắng đục) + H₂O.",
    knttReference: "KNTT KHTN 9 - Bài: Các hợp chất của Carbon"
  },

  // --- CHỦ ĐỀ 6: ĐẠI CƯƠNG HOÁ HỌC HỮU CƠ ---
  {
    id: "q9_16",
    grade: "Lớp 9",
    topic: "KNTT: Hợp chất hữu cơ",
    difficulty: "Dễ",
    question: "Hợp chất hữu cơ là hợp chất của nguyên tố nào (trừ CO, CO₂, H₂CO₃, muối cacbonat và muối cacbua)?",
    options: ["Hydrogen", "Carbon", "Oxygen", "Nitrogen"],
    correctIndex: 1,
    explanation: "Hợp chất hữu cơ là hợp chất của Carbon (trừ một số ít oxit của carbon như CO, CO₂, axit H₂CO₃ và muối cacbonat của kim loại).",
    knttReference: "KNTT KHTN 9 - Bài: Khái niệm về hợp chất hữu cơ"
  },
  {
    id: "q9_17",
    grade: "Lớp 9",
    topic: "KNTT: Phân loại hợp chất hữu cơ",
    difficulty: "Trung bình",
    question: "Chất nào sau đây thuộc loại HYDROCARBON (phân tử CHỈ GỒM hai nguyên tố là Carbon và Hydrogen)?",
    options: ["Rượu ethylic (C₂H₅OH)", "Khí Methane (CH₄)", "Axit axetic (CH₃COOH)", "Đường Glucose (C₆H₁₂O₆)"],
    correctIndex: 1,
    explanation: "Hydrocarbon là hợp chất hữu cơ mà trong phân tử chỉ chứa 2 nguyên tố Carbon và Hydrogen (như CH₄, C₂H₄, C₂H₂). Các chất còn lại là dẫn xuất của hydrocarbon.",
    knttReference: "KNTT KHTN 9 - Bài: Khái niệm về hợp chất hữu cơ"
  },
  {
    id: "q9_18",
    grade: "Lớp 9",
    topic: "KNTT: Hoá trị của Carbon trong hợp chất hữu cơ",
    difficulty: "Dễ",
    question: "Trong tất cả các phân tử hợp chất hữu cơ, nguyên tố Carbon (C) LUÔN LUÔN có hoá trị bằng bao nhiêu?",
    options: ["Hoá trị II", "Hoá trị IV", "Hoá trị I", "Hoá trị III"],
    correctIndex: 1,
    explanation: "Trong hợp chất hữu cơ, nguyên tử Carbon luôn có hoá trị IV, liên kết với các nguyên tử khác bằng 4 liên kết cộng hoá trị.",
    knttReference: "KNTT KHTN 9 - Bài: Cấu tạo phân tử hợp chất hữu cơ"
  },

  // --- CHỦ ĐỀ 7: HYDROCARBON (CH₄, C₂H₄, C₂H₂) ---
  {
    id: "q9_19",
    grade: "Lớp 9",
    topic: "KNTT: Methane (CH₄)",
    difficulty: "Dễ",
    question: "Thành phần chính chiếm tới 85–95% khí thiên nhiên và khí sinh học Biogas ở các trang trại là hydrocacbon nào?",
    options: ["Methane (CH₄)", "Ethylene (C₂H₄)", "Acetylene (C₂H₂)", "Carbon monoxide (CO)"],
    correctIndex: 0,
    explanation: "Methane (CH₄) là hydrocacbon no đơn giản nhất, là thành phần chính của khí thiên nhiên, khí mỏ dầu và khí hầm Biogas.",
    knttReference: "KNTT KHTN 9 - Bài: Methane"
  },
  {
    id: "q9_20",
    grade: "Lớp 9",
    topic: "KNTT: Phản ứng đặc trưng của Methane",
    difficulty: "Trung bình",
    question: "Trong phân tử Methane (CH₄) chỉ có 4 liên kết đơn C-H bền vững. Phản ứng hoá học ĐẶC TRƯNG của Methane với khí Clo khi có ánh sáng là phản ứng gì?",
    options: ["Phản ứng thế", "Phản ứng cộng", "Phản ứng trùng hợp", "Phản ứng este hoá"],
    correctIndex: 0,
    explanation: "Phản ứng thế: CH₄ + Cl₂ —(ánh sáng)→ CH₃Cl + HCl. Nguyên tử Clo thay thế lần lượt từng nguyên tử Hydrogen trong phân tử metan.",
    knttReference: "KNTT KHTN 9 - Bài: Methane"
  },
  {
    id: "q9_21",
    grade: "Lớp 9",
    topic: "KNTT: Ethylene (C₂H₄)",
    difficulty: "Trung bình",
    question: "Trong phân tử Ethylene (C₂H₄ hay CH₂=CH₂), giữa hai nguyên tử Carbon có chứa loại liên kết đặc biệt nào?",
    options: [
      "Một liên kết ba C≡C",
      "Một liên kết đôi C=C (gồm một liên kết bền và một liên kết kém bền dễ đứt)",
      "Bốn liên kết đơn",
      "Liên kết ion"
    ],
    correctIndex: 1,
    explanation: "C₂H₄ có một liên kết đôi C=C. Trong liên kết đôi có một liên kết kém bền, dễ bị đứt ra trong các phản ứng hoá học tạo phản ứng cộng đặc trưng.",
    knttReference: "KNTT KHTN 9 - Bài: Ethylene"
  },
  {
    id: "q9_22",
    grade: "Lớp 9",
    topic: "KNTT: Phản ứng nhận biết Ethylene",
    difficulty: "Dễ",
    question: "Để phân biệt khí Ethylene (C₂H₄) và khí Methane (CH₄), người ta dẫn từng khí qua dung dịch nào có màu da cam?",
    options: [
      "Dung dịch nước vôi trong",
      "Dung dịch Bromine (nước Brom, Br₂)",
      "Dung dịch Phenolphthalein",
      "Nước cất"
    ],
    correctIndex: 1,
    explanation: "Ethylene chứa liên kết đôi nên làm MẤT MÀU dung dịch nước Bromine màu da cam: CH₂=CH₂ + Br₂ → CH₂Br-CH₂Br (không màu). Methane không phản ứng ở điều kiện này.",
    knttReference: "KNTT KHTN 9 - Bài: Ethylene"
  },
  {
    id: "q9_23",
    grade: "Lớp 9",
    topic: "KNTT: Ethylene làm chín trái cây",
    difficulty: "Dễ",
    question: "Khí Ethylene (C₂H₄) có ứng dụng sinh học tuyệt vời nào trong đời sống thu hoạch nông sản?",
    options: [
      "Làm hoa mau héo",
      "Kích thích trái cây (chuối, mãng cầu, xoài) mau chín đều tự nhiên",
      "Làm rau củ bị đóng băng",
      "Dùng làm chất diệt cỏ dại"
    ],
    correctIndex: 1,
    explanation: "Ethylene là một phytohormone thực vật tự nhiên điều hoà quá trình chín của quả. Xếp chuối chín cạnh chuối xanh sẽ kích thích chuối xanh mau chín.",
    knttReference: "KNTT KHTN 9 - Bài: Ethylene"
  },
  {
    id: "q9_24",
    grade: "Lớp 9",
    topic: "KNTT: Trùng hợp tạo nhựa PE",
    difficulty: "Trung bình",
    question: "Khi đun nóng ở áp suất và nhiệt độ cao có chất xúc tác, các phân tử ethylene liên kết lại với nhau tạo thành chất dẻo phổ biến nào?",
    options: ["Polyethylene (nhựa PE)", "Cao su tự nhiên", "Thuỷ tinh hữu cơ", "Sợi bông"],
    correctIndex: 0,
    explanation: "Phản ứng trùng hợp: n CH₂=CH₂ —(t°, p, xt)→ (-CH₂-CH₂-)n (nhựa Polyethylene PE dùng làm túi màng nilon, bao bì thực phẩm).",
    knttReference: "KNTT KHTN 9 - Bài: Ethylene"
  },
  {
    id: "q9_25",
    grade: "Lớp 9",
    topic: "KNTT: Acetylene (C₂H₂)",
    difficulty: "Trung bình",
    question: "Trong phân tử Acetylene (C₂H₂ hay CH≡CH), giữa hai nguyên tử Carbon có chứa loại liên kết nào?",
    options: ["Liên kết đơn", "Liên kết đôi", "Liên kết ba C≡C", "Liên kết ion"],
    correctIndex: 2,
    explanation: "Acetylene có công thức cấu tạo H-C≡C-H với 1 liên kết ba C≡C (gồm 1 liên kết bền và 2 liên kết kém bền).",
    knttReference: "KNTT KHTN 9 - Bài: Acetylene"
  },
  {
    id: "q9_26",
    grade: "Lớp 9",
    topic: "KNTT: Đèn xì hàn cắt kim loại",
    difficulty: "Trung bình",
    question: "Khí Acetylene (C₂H₂) cháy trong khí Oxygen tinh khiết toả nhiệt lượng khổng lồ lên tới 3000 °C, được ứng dụng trong thiết bị nào?",
    options: ["Đèn xì oxi - axetilen dùng để hàn cắt kim loại", "Bếp từ gia đình", "Bình cứu hoả", "Bóng đèn sợi đốt"],
    correctIndex: 0,
    explanation: "Ngọn lửa đèn xì oxi - axetilen đạt nhiệt độ khoảng 3000 °C, đủ làm nóng chảy tức thì hầu hết các kim loại như thép, sắt phục vụ hàn vá và cắt phá kết cấu tàu xe.",
    knttReference: "KNTT KHTN 9 - Bài: Acetylene"
  },

  // --- CHỦ ĐỀ 8: DẦU MỎ & NHIÊN LIỆU ---
  {
    id: "q9_27",
    grade: "Lớp 9",
    topic: "KNTT: Dầu mỏ",
    difficulty: "Dễ",
    question: "Dầu mỏ thô khai thác từ dưới lòng đất đại dương là một:",
    options: [
      "Hợp chất hoá học nguyên chất",
      "Hỗn hợp tự nhiên phức tạp của nhiều loại hydrocarbon",
      "Dung dịch muối trong nước",
      "Đơn chất Carbon"
    ],
    correctIndex: 1,
    explanation: "Dầu mỏ là hỗn hợp tự nhiên phức tạp gồm hàng trăm loại hydrocarbon khác nhau (thể khí, lỏng, rắn) tan lẫn vào nhau.",
    knttReference: "KNTT KHTN 9 - Bài: Dầu mỏ và khí thiên nhiên"
  },
  {
    id: "q9_28",
    grade: "Lớp 9",
    topic: "KNTT: Chế biến dầu mỏ",
    difficulty: "Trung bình",
    question: "Phương pháp vật lý nào dựa vào sự khác nhau về nhiệt độ sôi của các chất để tách dầu mỏ thành xăng, dầu hoả, dầu diesel và nhựa đường?",
    options: ["Chưng cất phân đoạn", "Lọc ly tâm", "Kết tinh lại", "Nung chảy điện phân"],
    correctIndex: 0,
    explanation: "Chưng cất phân đoạn dầu tháp tinh luyện tận dụng nhiệt độ sôi khác nhau để thu nhận lần lượt: khí đốt, xăng (nhiệt độ sôi thấp), dầu hoả, dầu diesel và cặn mazut/nhựa đường.",
    knttReference: "KNTT KHTN 9 - Bài: Dầu mỏ và khí thiên nhiên"
  },

  // --- CHỦ ĐỀ 9: RƯỢU ETHYLIC (ETHANOL, C₂H₅OH) ---
  {
    id: "q9_29",
    grade: "Lớp 9",
    topic: "KNTT: Cấu tạo Rượu ethylic",
    difficulty: "Dễ",
    question: "Đặc điểm cấu tạo giúp phân biệt Rượu ethylic (Ethanol, C₂H₅OH) với các hydrocarbon là trong phân tử có nhóm chức nào?",
    options: ["Nhóm hydroxyl (-OH)", "Nhóm cacboxyl (-COOH)", "Nhóm amino (-NH₂)", "Nhóm cacbonyl (=C=O)"],
    correctIndex: 0,
    explanation: "Phân tử ethanol có nhóm -OH (hydroxyl) đính vào gốc ankyl C₂H₅-, chính nhóm -OH này quyết định các tính chất hoá học đặc trưng của rượu.",
    knttReference: "KNTT KHTN 9 - Bài: Rượu ethylic"
  },
  {
    id: "q9_30",
    grade: "Lớp 9",
    topic: "KNTT: Độ rượu",
    difficulty: "Trung bình",
    question: "Khái niệm 'Độ rượu' được định nghĩa là:",
    options: [
      "Số mililít rượu etylic nguyên chất có trong 100 mL dung dịch rượu",
      "Khối lượng rượu tính bằng gam có trong 1 lít nước",
      "Nhiệt độ sôi của dung dịch rượu",
      "Thời gian lên men rượu"
    ],
    correctIndex: 0,
    explanation: "Độ rượu là số mL rượu etylic nguyên chất có trong 100 mL hỗn hợp rượu với nước (ví dụ rượu 40° nghĩa là trong 100 mL rượu có 40 mL C₂H₅OH nguyên chất).",
    knttReference: "KNTT KHTN 9 - Bài: Rượu ethylic"
  },
  {
    id: "q9_31",
    grade: "Lớp 9",
    topic: "KNTT: Rượu tác dụng với kim loại",
    difficulty: "Trung bình",
    question: "Cho một mẩu kim loại Sodium (Na) vào ống nghiệm đựng cồn etylic nguyên chất, hiện tượng quan sát được là gì?",
    options: [
      "Không có hiện tượng",
      "Mẩu Na tan dần, sủi bọt khí Hydrogen (H₂↑) không màu",
      "Dung dịch chuyển sang màu đen",
      "Ống nghiệm phát nổ tức thì"
    ],
    correctIndex: 1,
    explanation: "Phản ứng: 2C₂H₅OH + 2Na → 2C₂H₅ONa (Natri etylat) + H₂↑. Nguyên tử Na thế chỗ nguyên tử H trong nhóm -OH của rượu.",
    knttReference: "KNTT KHTN 9 - Bài: Rượu ethylic"
  },
  {
    id: "q9_32",
    grade: "Lớp 9",
    topic: "KNTT: Cồn sát trùng y tế",
    difficulty: "Dễ",
    question: "Vì sao cồn y tế 70° (70% ethanol) lại diệt khuẩn hiệu quả hơn cồn nguyên chất 96° – 100°?",
    options: [
      "Vì cồn 70° thơm hơn",
      "Vì cồn 70° thẩm thấu sâu qua màng tế bào vi khuẩn trước khi làm đông tụ protein nội bào; cồn quá đặc làm đông tụ bề mặt quá nhanh tạo vỏ bọc che chở vi khuẩn",
      "Vì cồn 70° nóng hơn",
      "Vì cồn 100° không có tính sát trùng"
    ],
    correctIndex: 1,
    explanation: "Ở nồng độ 70°, ethanol thấm qua thành tế bào vi khuẩn ở tốc độ tối ưu để phá huỷ hoàn toàn cấu trúc protein bên trong. Cồn trên 90° làm vón cục màng ngoài tức thì tạo lớp khiên ngăn cồn ngấm sâu.",
    knttReference: "KNTT KHTN 9 - Bài: Rượu ethylic"
  },
  {
    id: "q9_33",
    grade: "Lớp 9",
    topic: "KNTT: Xăng sinh học E5",
    difficulty: "Trung bình",
    question: "Nhiên liệu sạch 'Xăng E5' đang được sử dụng phổ biến tại các trạm xăng Tây Ninh là hỗn hợp gồm:",
    options: [
      "95% xăng khoáng truyền thống pha với 5% cồn sinh học Ethanol (E)",
      "50% xăng và 50% dầu",
      "95% nước và 5% cồn",
      "Chỉ gồm 5 loại xăng khác nhau"
    ],
    correctIndex: 0,
    explanation: "Xăng E5 chứa 5% thể tích là cồn sinh học Ethanol (sản xuất từ quá trình lên men tinh bột sắn củ mì hoặc ngô) pha với 95% xăng khoáng, giúp giảm phát thải khí độc hại CO và HC.",
    knttReference: "KNTT KHTN 9 - Bài: Rượu ethylic"
  },

  // --- CHỦ ĐỀ 10: AXIT AXETIC (CH₃COOH) & PHẢN ỨNG ESTE HOÁ ---
  {
    id: "q9_34",
    grade: "Lớp 9",
    topic: "KNTT: Cấu tạo Axit axetic",
    difficulty: "Dễ",
    question: "Axit axetic (CH₃COOH) có tính axit là do trong phân tử có chứa nhóm nguyên tử đặc trưng nào?",
    options: ["Nhóm hydroxyl (-OH)", "Nhóm cacboxyl (-COOH)", "Nhóm amin (-NH₂)", "Gốc metyl (-CH₃)"],
    correctIndex: 1,
    explanation: "Nhóm -COOH (cacboxyl) gồm nhóm C=O liên kết với nhóm -OH làm cho nguyên tử H trong nhóm này linh động hơn, phân li ra ion H⁺ tạo nên tính acid.",
    knttReference: "KNTT KHTN 9 - Bài: Axit axetic"
  },
  {
    id: "q9_35",
    grade: "Lớp 9",
    topic: "KNTT: Phản ứng este hoá",
    difficulty: "Trung bình",
    question: "Đun nóng hỗn hợp Axit axetic (CH₃COOH) và Rượu etylic (C₂H₅OH) có axit H₂SO₄ đặc làm xúc tác thu được chất lỏng có mùi thơm dễ chịu của hoa quả là chất gì?",
    options: ["Etyl axetat (CH₃COOC₂H₅)", "Etyl clorua", "Metyl axetat", "Khí metan"],
    correctIndex: 0,
    explanation: "Phản ứng este hoá: CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ (etyl axetat) + H₂O. Este tạo thành có mùi thơm đặc trưng, nhẹ hơn nước và ít tan trong nước.",
    knttReference: "KNTT KHTN 9 - Bài: Axit axetic"
  },
  {
    id: "q9_36",
    grade: "Lớp 9",
    topic: "KNTT: Axit axetic tẩy cặn ấm nước",
    difficulty: "Dễ",
    question: "Ấm đun nước lâu ngày bị đóng một lớp cặn trắng Canxi cacbonat (CaCO₃). Dùng chất nào trong gian bếp để tẩy sạch cặn này một cách an toàn nhất?",
    options: ["Giấm ăn (chứa CH₃COOH)", "Dầu ăn", "Nước đường", "Nước xà phòng kiềm"],
    correctIndex: 0,
    explanation: "Axit axetic trong giấm ăn phản ứng hoà tan cặn vôi: 2CH₃COOH + CaCO₃ → (CH₃COO)₂Ca + CO₂↑ + H₂O. Cặn tan hết và sủi bọt khí CO₂.",
    funFact: "Đun sôi nửa bát giấm ăn pha với nước trong ấm đun siêu tốc trong 5 phút, cặn canxi dày cứng sẽ bong tróc sạch bóng như mới!",
    knttReference: "KNTT KHTN 9 - Bài: Axit axetic"
  },

  // --- CHỦ ĐỀ 11: CHẤT BÉO & PHẢN ỨNG XÀ PHÒNG HOÁ ---
  {
    id: "q9_37",
    grade: "Lớp 9",
    topic: "KNTT: Thành phần chất béo",
    difficulty: "Trung bình",
    question: "Chất béo (dầu thực vật, mỡ động vật) là hỗn hợp các trieste của axit béo với hợp chất rượu đa chức nào?",
    options: ["Rượu etylic (Ethanol)", "Glycerol (Glixerol, C₃H₅(OH)₃)", "Metanol", "Axit axetic"],
    correctIndex: 1,
    explanation: "Chất béo là trieste của glycerol với các axit béo có mạch carbon dài không phân nhánh (như axit stearic, axit oleic...), có công thức chung là (RCOO)₃C₃H₅.",
    knttReference: "KNTT KHTN 9 - Bài: Chất béo"
  },
  {
    id: "q9_38",
    grade: "Lớp 9",
    topic: "KNTT: Phản ứng xà phòng hoá",
    difficulty: "Trung bình",
    question: "Khi đun chất béo với dung dịch xút (NaOH), sản phẩm thu được sau phản ứng xà phòng hoá gồm:",
    options: [
      "Xà phòng (muối natri của axit béo) và Glycerol",
      "Rượu etylic và giấm ăn",
      "Đường glucose và nước",
      "Khí metan và dầu hoả"
    ],
    correctIndex: 0,
    explanation: "Phản ứng xà phòng hoá: (RCOO)₃C₃H₅ + 3NaOH —(t°)→ 3RCOONa (xà phòng) + C₃H₅(OH)₃ (glycerol).",
    knttReference: "KNTT KHTN 9 - Bài: Chất béo"
  },

  // --- CHỦ ĐỀ 12: GLUCOSE, SACCHAROSE, TINH BỘT & CELLULOSE ---
  {
    id: "q9_39",
    grade: "Lớp 9",
    topic: "KNTT: Glucose (C₆H₁₂O₆)",
    difficulty: "Dễ",
    question: "Đường Glucose (C₆H₁₂O₆) có nhiều trong quả nho chín nên còn được gọi là gì, và được dùng làm dịch truyền bổ sung năng lượng nhanh trong y tế?",
    options: ["Đường nho", "Đường mía", "Đường mạch nha", "Đường sữa"],
    correctIndex: 0,
    explanation: "Glucose có nhiều trong quả nho chín nên gọi là đường nho. Trong máu người bình thường, nồng độ glucose duy trì ổn định ở mức khoảng 0,1% (4,4 - 7,2 mmol/L).",
    knttReference: "KNTT KHTN 9 - Bài: Glucose"
  },
  {
    id: "q9_40",
    grade: "Lớp 9",
    topic: "KNTT: Phản ứng tráng bạc của Glucose",
    difficulty: "Trung bình",
    question: "Khi cho dung dịch Glucose vào ống nghiệm chứa thuốc thử AgNO₃ trong môi trường amoniac (NH₃) rồi đun nóng nhẹ, trên thành ống nghiệm xuất hiện lớp tráng sáng bóng như gương của chất gì?",
    options: ["Kim loại Bạc (Silver, Ag)", "Kim loại Đồng (Cu)", "Kim loại Vàng (Au)", "Kết tủa trắng nhôm"],
    correctIndex: 0,
    explanation: "Glucose có nhóm andehit (-CHO) bị oxy hoá bởi ion Ag⁺ tạo lớp kim loại bạc bám sáng bóng trên thuỷ tinh, ứng dụng để tráng gương và tráng ruột phích giữ nhiệt.",
    knttReference: "KNTT KHTN 9 - Bài: Glucose"
  },
  {
    id: "q9_41",
    grade: "Lớp 9",
    topic: "KNTT: Saccharose (C₁₂H₂₂O₁₁)",
    difficulty: "Dễ",
    question: "Đường mía (Saccharose, C₁₂H₂₂O₁₁) là thành phần chính của loại đường nào chúng ta ăn hàng ngày?",
    options: ["Đường cát trắng, đường phèn", "Đường hoá học", "Đường nho", "Cồn ngọt"],
    correctIndex: 0,
    explanation: "Saccharose có công thức C₁₂H₂₂O₁₁, có nhiều trong cây mía, củ cải đường và hoa thốt nốt, là đường ăn tinh luyện hàng ngày.",
    knttReference: "KNTT KHTN 9 - Bài: Saccharose"
  },
  {
    id: "q9_42",
    grade: "Lớp 9",
    topic: "KNTT: Thuốc thử nhận biết Tinh bột",
    difficulty: "Dễ",
    question: "Nhỏ một giọt dung dịch Iodine (thuốc thử I-ốt màu vàng nâu) lên lát cắt củ khoai mì (sắn) hoặc cơm nguội, ta thấy xuất hiện màu gì đặc trưng?",
    options: ["Màu xanh tím đặc trưng", "Màu đỏ máu", "Màu vàng tươi", "Màu hồng sen"],
    correctIndex: 0,
    explanation: "Phân tử tinh bột có cấu trúc xoắn dạng lò xo rỗng, các phân tử I-ốt chui vào bên trong tạo phức chất hấp thụ quang phổ tạo màu xanh tím đặc trưng.",
    knttReference: "KNTT KHTN 9 - Bài: Tinh bột và Cellulose"
  },
  {
    id: "q9_43",
    grade: "Lớp 9",
    topic: "KNTT: Cellulose trong tự nhiên",
    difficulty: "Dễ",
    question: "Chất nào là thành phần chính cấu tạo nên màng tế bào thực vật, tạo nên bộ khung cứng cáp cho thân cây gỗ, tre nứa và chiếm tới 95–98% trong sợi bông gòn?",
    options: ["Cellulose (Xenlulozơ)", "Tinh bột", "Đường mía", "Chất đạm"],
    correctIndex: 0,
    explanation: "Cellulose (C₆H₁₀O₅)n có cấu trúc mạch thẳng kéo dài kết chùm thành các bó sợi dai chắc, là vật liệu cấu tạo nên gỗ, tre, nứa và bông gòn tự nhiên.",
    knttReference: "KNTT KHTN 9 - Bài: Tinh bột và Cellulose"
  },
  {
    id: "q9_44",
    grade: "Lớp 9",
    topic: "KNTT: Quá trình quang hợp",
    difficulty: "Trung bình",
    question: "Cây xanh tổng hợp tinh bột và giải phóng khí Oxygen nuôi sống muôn loài nhờ phản ứng quang hợp dưới ánh sáng mặt trời theo phương trình nào?",
    options: [
      "6n CO₂ + 5n H₂O —(ánh sáng, diệp lục)→ (C₆H₁₀O₅)n + 6n O₂↑",
      "CH₄ + 2O₂ → CO₂ + 2H₂O",
      "C₂H₅OH + O₂ → CH₃COOH + H₂O",
      "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂"
    ],
    correctIndex: 0,
    explanation: "Dưới tác dụng của sắc tố diệp lục (chlorophyll) và năng lượng ánh sáng mặt trời, cây xanh hấp thụ CO₂ từ không khí và nước từ đất để tổng hợp tinh bột và nhả khí O₂.",
    knttReference: "KNTT KHTN 9 - Bài: Tinh bột và Cellulose"
  },

  // --- CHỦ ĐỀ 13: PROTEIN & POLIME (VẬT LIỆU MỚI) ---
  {
    id: "q9_45",
    grade: "Lớp 9",
    topic: "KNTT: Protein (Chất đạm)",
    difficulty: "Dễ",
    question: "Hiện tượng nào sau đây là sự ĐÔNG TỤ của Protein dưới tác dụng của nhiệt độ hoặc acid?",
    options: [
      "Lòng trắng trứng gà đông cứng lại khi luộc chín trong nước sôi",
      "Nấu riêu cua, gạch cua nổi thành từng mảng đóng bánh trên mặt nồi canh chua",
      "Vắt chanh hoặc giấm vào sữa đậu nành thấy sữa bị kết tủa vón cục làm đậu phụ",
      "Cả 3 hiện tượng trên đều đúng"
    ],
    correctIndex: 3,
    explanation: "Protein (chất đạm) trong lòng trắng trứng, thịt, sữa đậu nành và cua đồng đều bị biến tính, mất cấu trúc không gian bậc cao và đông tụ lại khi đun nóng hoặc gặp acid.",
    knttReference: "KNTT KHTN 9 - Bài: Protein"
  },
  {
    id: "q9_46",
    grade: "Lớp 9",
    topic: "KNTT: Nhận biết sợi tự nhiên và sợi hoá học",
    difficulty: "Trung bình",
    question: "Để phân biệt một mảnh vải dệt bằng tơ tằm thật (bản chất protein) với một mảnh vải dệt bằng sợi nilon tổng hợp, ta đốt mẩu sợi và ngửi mùi. Tơ tằm thật khi cháy sẽ có mùi gì?",
    options: [
      "Mùi khét như tóc hoặc móng tay bị cháy",
      "Mùi thơm của hoa hồng",
      "Không có bất kì mùi gì",
      "Mùi chua nồng của giấm"
    ],
    correctIndex: 0,
    explanation: "Tơ tằm cấu tạo từ protein chứa các nguyên tố C, H, O, N và lưu huỳnh nên khi đốt có mùi khét đặc trưng như lông tóc cháy, tàn tro xốp giòn bóp vụn được. Sợi nilon cháy vón cục nhựa cứng dẻo.",
    knttReference: "KNTT KHTN 9 - Bài: Protein và Polime"
  },
  {
    id: "q9_47",
    grade: "Lớp 9",
    topic: "KNTT: Polyme tự nhiên và tổng hợp",
    difficulty: "Dễ",
    question: "Chất nào sau đây là một polyme TỰ NHIÊN có sẵn trong đời sống?",
    options: ["Tinh bột (trong củ mì, gạo)", "Nhựa Polyvinyl chloride (nhựa ống nước PVC)", "Tơ Nilon-6,6", "Nhựa dẻo Polyethylene (PE)"],
    correctIndex: 0,
    explanation: "Tinh bột, xenlulozo, cao su thiên nhiên và tơ tằm là các polime tự nhiên do sinh vật tổng hợp. Nhựa PVC, PE và tơ nilon là các polime nhân tạo tổng hợp hoá học.",
    knttReference: "KNTT KHTN 9 - Bài: Polime"
  },
  {
    id: "q9_48",
    grade: "Lớp 9",
    topic: "KNTT: Ô nhiễm rác thải nhựa",
    difficulty: "Dễ",
    question: "Vì sao rác thải túi nilon và đồ nhựa dùng một lần được gọi là 'ô nhiễm trắng' và cực kì nguy hại cho môi trường?",
    options: [
      "Vì chúng có màu trắng sáng",
      "Vì chúng không bị phân huỷ sinh học tự nhiên, phải mất từ vài trăm đến hàng nghìn năm mới rã thành hạt vi nhựa độc hại",
      "Vì chúng làm bốc mùi thơm",
      "Vì chúng tan biến mất trong nước mưa"
    ],
    correctIndex: 1,
    explanation: "Các polyme nhân tạo như PE, PP có liên kết C-C vô cùng bền vững, vi sinh vật trong đất không thể phân huỷ, tồn tại hàng thế kỉ làm ô nhiễm đất, nguồn nước và chuỗi thức ăn đại dương.",
    knttReference: "KNTT KHTN 9 - Bài: Polime và môi trường"
  },
  {
    id: "q9_49",
    grade: "Lớp 9",
    topic: "KNTT: Nhựa sinh học Bioplastic",
    difficulty: "Trung bình",
    question: "Xu hướng khoa học xanh của học sinh CLB Hoá học THCS Lý Tự Trọng là nghiên cứu chế tạo màng nhựa sinh học (Bioplastic) từ nguyên liệu nào có thể tự phân huỷ hoàn toàn trong đất sau 30 ngày?",
    options: [
      "Từ tinh bột củ mì (sắn) Tây Ninh kết hợp glycerol thực vật",
      "Từ dầu mỏ nhập khẩu",
      "Từ kim loại chì",
      "Từ thuỷ tinh nung chảy"
    ],
    correctIndex: 0,
    explanation: "Bioplastic từ tinh bột sắn củ mì Tây Ninh là polyme sinh học có nguồn gốc carbohydrate hữu cơ, các vi khuẩn và nấm đất có thể tiêu hoá phân huỷ hoàn toàn thành CO₂ và mùn hữu cơ thân thiện với môi trường.",
    knttReference: "KHKT ViSEF & Hoá học xanh KNTT 9"
  },
  {
    id: "q9_50",
    grade: "Lớp 9",
    topic: "KNTT: Hiệu ứng nhà kính & Biến đổi khí hậu",
    difficulty: "Trung bình",
    question: "Hai chất khí nào sau đây là nguyên nhân chính gây nên 'Hiệu ứng nhà kính' làm nhiệt độ Trái Đất nóng lên toàn cầu?",
    options: [
      "Carbon dioxide (CO₂) và Methane (CH₄)",
      "Oxygen (O₂) và Nitrogen (N₂)",
      "Helium (He) và Argon (Ar)",
      "Hydrogen (H₂) và Carbon monoxide (CO)"
    ],
    correctIndex: 0,
    explanation: "Khí CO₂ (từ đốt nhiên liệu hoá thạch than đá, dầu mỏ) và khí CH₄ (từ nông nghiệp, rác thải) hấp thụ và giữ lại bức xạ nhiệt hồng ngoại của Trái Đất, gây ra hiệu ứng nhà kính và biến đổi khí hậu.",
    funFact: "Một phân tử khí Methane (CH₄) có khả năng giữ nhiệt gây hiệu ứng nhà kính mạnh gấp khoảng 28 lần so với một phân tử CO₂!",
    knttReference: "KNTT KHTN 9 - Bài: Hoá học và vấn đề môi trường"
  }
];
