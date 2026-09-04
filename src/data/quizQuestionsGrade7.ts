import { QuizQuestion } from "../types";

export const QUIZ_GRADE_7: QuizQuestion[] = [
  // --- CHỦ ĐỀ 1: NGUYÊN TỬ (KNTT BÀI 2) ---
  {
    id: "q7_1",
    grade: "Lớp 7",
    topic: "KNTT Bài 2: Cấu tạo nguyên tử",
    difficulty: "Dễ",
    question: "Hạt nào sau đây mang điện tích âm và chuyển động ở lớp vỏ xung quanh hạt nhân nguyên tử?",
    options: ["Proton", "Neutron", "Electron", "Positron"],
    correctIndex: 2,
    explanation: "Vỏ nguyên tử được tạo nên bởi các hạt electron mang điện tích âm (-1). Hạt nhân nằm ở tâm gồm proton mang điện tích dương và neutron không mang điện.",
    funFact: "Khối lượng một electron nhỏ đến mức bằng khoảng 1/1836 khối lượng của một proton!",
    knttReference: "KNTT KHTN 7 - Bài 2: Nguyên tử"
  },
  {
    id: "q7_2",
    grade: "Lớp 7",
    topic: "KNTT Bài 2: Cấu tạo nguyên tử",
    difficulty: "Dễ",
    question: "Trong một nguyên tử trung hoà về điện, số lượng hạt proton trong hạt nhân luôn bằng số lượng hạt nào?",
    options: ["Số hạt neutron", "Số hạt electron", "Tổng số hạt trong hạt nhân", "Số lớp electron"],
    correctIndex: 1,
    explanation: "Vì nguyên tử trung hoà về điện nên tổng điện tích dương của proton luôn triệt tiêu với tổng điện tích âm của electron: Số proton = Số electron (p = e).",
    knttReference: "KNTT KHTN 7 - Bài 2: Nguyên tử"
  },
  {
    id: "q7_3",
    grade: "Lớp 7",
    topic: "KNTT Bài 2: Kích thước và khối lượng nguyên tử",
    difficulty: "Trung bình",
    question: "Đơn vị đo khối lượng nguyên tử theo quy ước quốc tế hiện nay là gì?",
    options: ["Kilôgam (kg)", "Gam (g)", "amu (atomic mass unit)", "Miligam (mg)"],
    correctIndex: 2,
    explanation: "Khối lượng nguyên tử vô cùng nhỏ bé nên các nhà khoa học dùng đơn vị khối lượng nguyên tử là amu (1 amu ≈ 1,6605 × 10⁻²⁴ g).",
    funFact: "1 gam nước chứa tới hơn 33 nghìn tỷ tỷ nguyên tử, nhiều hơn số hạt cát trên toàn bộ bãi biển Trái Đất!",
    knttReference: "KNTT KHTN 7 - Bài 2: Nguyên tử"
  },
  {
    id: "q7_4",
    grade: "Lớp 7",
    topic: "KNTT Bài 2: Cấu tạo hạt nhân",
    difficulty: "Dễ",
    question: "Hạt nhân nguyên tử được cấu tạo từ những loại hạt nào sau đây?",
    options: ["Proton và electron", "Proton và neutron", "Electron và neutron", "Chỉ có hạt proton"],
    correctIndex: 1,
    explanation: "Hạt nhân nguyên tử nằm ở trung tâm, cấu tạo từ hai loại hạt là proton (mang điện dương) và neutron (không mang điện), ngoại trừ nguyên tử hydrogen thông thường chỉ có 1 proton.",
    knttReference: "KNTT KHTN 7 - Bài 2: Nguyên tử"
  },
  {
    id: "q7_5",
    grade: "Lớp 7",
    topic: "KNTT Bài 2: Cấu tạo nguyên tử",
    difficulty: "Trung bình",
    question: "Nguyên tử Carbon có 6 hạt proton trong hạt nhân. Số hạt electron ở lớp vỏ của nguyên tử Carbon là bao nhiêu?",
    options: ["12 electron", "6 electron", "8 electron", "4 electron"],
    correctIndex: 1,
    explanation: "Trong nguyên tử trung hoà về điện, số electron luôn bằng số proton. Vì vậy nguyên tử Carbon có 6 electron chuyển động quanh hạt nhân.",
    knttReference: "KNTT KHTN 7 - Bài 2: Nguyên tử"
  },
  {
    id: "q7_6",
    grade: "Lớp 7",
    topic: "KNTT Bài 2: Kích thước nguyên tử",
    difficulty: "Trung bình",
    question: "Nếu phóng đại hạt nhân nguyên tử to bằng một quả bóng tennis ở giữa sân bóng đá, thì các electron sẽ chuyển động ở vị trí nào?",
    options: [
      "Ngay sát bề mặt quả bóng",
      "Cách quả bóng khoảng vài xăng-ti-mét",
      "Ở tận mép ngoài cùng của khán đài sân vận động",
      "Bên trong lòng quả bóng"
    ],
    correctIndex: 2,
    explanation: "Nguyên tử có cấu tạo gần như rỗng hoàn toàn! Đường kính nguyên tử lớn gấp khoảng 10.000 đến 100.000 lần đường kính hạt nhân.",
    funFact: "Nếu hút hết khoảng trống trong tất cả nguyên tử của toàn bộ loài người trên Trái Đất, thể tích còn lại sẽ nhỏ gọn lọt thỏm trong một viên đường!",
    knttReference: "KNTT KHTN 7 - Bài 2: Nguyên tử"
  },
  {
    id: "q7_7",
    grade: "Lớp 7",
    topic: "KNTT Bài 2: Cấu tạo vỏ nguyên tử",
    difficulty: "Thử thách",
    question: "Lớp electron thứ nhất (trong cùng, gần hạt nhân nhất) chứa tối đa bao nhiêu electron?",
    options: ["2 electron", "8 electron", "18 electron", "4 electron"],
    correctIndex: 0,
    explanation: "Theo mô hình Rutherford - Bohr, lớp electron thứ nhất (trong cùng) chỉ chứa tối đa 2 electron; lớp thứ hai chứa tối đa 8 electron.",
    knttReference: "KNTT KHTN 7 - Bài 2: Nguyên tử"
  },

  // --- CHỦ ĐỀ 2: NGUYÊN TỐ HOÁ HỌC (KNTT BÀI 3) ---
  {
    id: "q7_8",
    grade: "Lớp 7",
    topic: "KNTT Bài 3: Nguyên tố hoá học",
    difficulty: "Dễ",
    question: "Tập hợp các nguyên tử có cùng số lượng hạt nào trong hạt nhân thì thuộc cùng một nguyên tố hoá học?",
    options: ["Số hạt neutron", "Số hạt proton", "Số hạt electron ở lớp ngoài cùng", "Số lớp electron"],
    correctIndex: 1,
    explanation: "Nguyên tố hoá học là tập hợp các nguyên tử có cùng số proton trong hạt nhân. Số proton chính là 'chứng minh thư' đặc trưng của mỗi nguyên tố.",
    knttReference: "KNTT KHTN 7 - Bài 3: Nguyên tố hoá học"
  },
  {
    id: "q7_9",
    grade: "Lớp 7",
    topic: "KNTT Bài 3: Kí hiệu hoá học",
    difficulty: "Dễ",
    question: "Kí hiệu hoá học theo danh pháp quốc tế IUPAC của nguyên tố Sodium (Natri) là gì?",
    options: ["So", "Sd", "Na", "S"],
    correctIndex: 2,
    explanation: "Kí hiệu hoá học của Sodium bắt nguồn từ tiếng Latin 'Natrium', được kí hiệu là Na. Kí hiệu S là của Sulfur (Lưu huỳnh).",
    knttReference: "KNTT KHTN 7 - Bài 3: Nguyên tố hoá học"
  },
  {
    id: "q7_10",
    grade: "Lớp 7",
    topic: "KNTT Bài 3: Kí hiệu hoá học",
    difficulty: "Dễ",
    question: "Kí hiệu hoá học của nguyên tố Iron (Sắt) là gì?",
    options: ["Ir", "Fe", "In", "I"],
    correctIndex: 1,
    explanation: "Iron có kí hiệu hoá học là Fe (xuất phát từ tên tiếng Latin 'Ferrum').",
    knttReference: "KNTT KHTN 7 - Bài 3: Nguyên tố hoá học"
  },
  {
    id: "q7_11",
    grade: "Lớp 7",
    topic: "KNTT Bài 3: Kí hiệu hoá học",
    difficulty: "Dễ",
    question: "Nguyên tố Calcium (Canxi) cấu tạo nên xương và răng chắc khoẻ được kí hiệu hoá học là gì?",
    options: ["Cl", "C", "Ca", "Cu"],
    correctIndex: 2,
    explanation: "Calcium được kí hiệu là Ca. Chữ C là Carbon, Cl là Chlorine, và Cu là Copper (Đồng).",
    knttReference: "KNTT KHTN 7 - Bài 3: Nguyên tố hoá học"
  },
  {
    id: "q7_12",
    grade: "Lớp 7",
    topic: "KNTT Bài 3: Kí hiệu hoá học",
    difficulty: "Dễ",
    question: "Kí hiệu hoá học của nguyên tố Potassium (Kali) là gì?",
    options: ["P", "Po", "K", "Pt"],
    correctIndex: 2,
    explanation: "Potassium bắt nguồn từ tên tiếng Latin 'Kalium', do đó có kí hiệu hoá học là K. Kí hiệu P là Phosphorus (Phốt-pho).",
    funFact: "Trái chuối Tây Ninh chín vàng chứa hàm lượng Potassium (K) rất dồi dào, giúp điều hoà huyết áp và giảm chuột rút cơ bắp!",
    knttReference: "KNTT KHTN 7 - Bài 3: Nguyên tố hoá học"
  },
  {
    id: "q7_13",
    grade: "Lớp 7",
    topic: "KNTT Bài 3: Nguyên tố trong tự nhiên",
    difficulty: "Trung bình",
    question: "Nguyên tố hoá học nào chiếm hàm lượng phần trăm khối lượng lớn nhất trong vỏ Trái Đất?",
    options: ["Iron (Fe)", "Silicon (Si)", "Oxygen (O)", "Aluminium (Al)"],
    correctIndex: 2,
    explanation: "Oxygen chiếm gần 50% (khoảng 49.2%) khối lượng vỏ Trái Đất, tồn tại chủ yếu trong các khoáng vật silicat, oxit kim loại và nước.",
    knttReference: "KNTT KHTN 7 - Bài 3: Nguyên tố hoá học"
  },
  {
    id: "q7_14",
    grade: "Lớp 7",
    topic: "KNTT Bài 3: Kí hiệu hoá học",
    difficulty: "Trung bình",
    question: "Kí hiệu hoá học nào sau đây gồm hai chữ cái, trong đó chữ cái đầu viết hoa và chữ cái thứ hai viết thường đúng quy tắc?",
    options: ["AL", "al", "Al", "aL"],
    correctIndex: 2,
    explanation: "Quy tắc quốc tế: Kí hiệu hoá học gồm một hoặc hai chữ cái, chữ cái đầu tiên luôn phải viết hoa, nếu có chữ thứ hai thì bắt buộc viết thường (Aluminium là Al).",
    knttReference: "KNTT KHTN 7 - Bài 3: Nguyên tố hoá học"
  },
  {
    id: "q7_15",
    grade: "Lớp 7",
    topic: "KNTT Bài 3: Nguyên tố trong cơ thể người",
    difficulty: "Trung bình",
    question: "Bốn nguyên tố thiết yếu nhất chiếm khoảng 96% khối lượng cơ thể con người là bộ bốn nào sau đây?",
    options: ["C, H, O, N", "Na, K, Ca, Fe", "C, Si, O, P", "H, O, Cl, S"],
    correctIndex: 0,
    explanation: "Bốn nguyên tố C (Carbon), H (Hydrogen), O (Oxygen), N (Nitrogen) là thành phần cấu tạo nên nước, protein, lipit, gluxit và ADN trong mọi sinh vật sống.",
    knttReference: "KNTT KHTN 7 - Bài 3: Nguyên tố hoá học"
  },

  // --- CHỦ ĐỀ 3: BẢNG TUẦN HOÀN (KNTT BÀI 4) ---
  {
    id: "q7_16",
    grade: "Lớp 7",
    topic: "KNTT Bài 4: Bảng tuần hoàn Mendeleev",
    difficulty: "Dễ",
    question: "Trong Bảng tuần hoàn các nguyên tố hoá học, các nguyên tố được sắp xếp theo chiều tăng dần của đại lượng nào?",
    options: ["Khối lượng nguyên tử", "Điện tích hạt nhân (số proton)", "Số neutron", "Bán kính nguyên tử"],
    correctIndex: 1,
    explanation: "Trong Bảng tuần hoàn hiện đại, các nguyên tố được sắp xếp theo chiều tăng dần của điện tích hạt nhân nguyên tử (chính là số proton hay số hiệu nguyên tử Z).",
    knttReference: "KNTT KHTN 7 - Bài 4: Bảng tuần hoàn"
  },
  {
    id: "q7_17",
    grade: "Lớp 7",
    topic: "KNTT Bài 4: Ô nguyên tố",
    difficulty: "Dễ",
    question: "Số thứ tự của một ô nguyên tố trong Bảng tuần hoàn bằng với giá trị nào sau đây?",
    options: [
      "Số neutron trong hạt nhân",
      "Số proton (hoặc số electron) của nguyên tử",
      "Số lớp electron",
      "Số electron ở lớp ngoài cùng"
    ],
    correctIndex: 1,
    explanation: "Số thứ tự của ô nguyên tố = Số hiệu nguyên tử (Z) = Số proton = Số electron.",
    knttReference: "KNTT KHTN 7 - Bài 4: Bảng tuần hoàn"
  },
  {
    id: "q7_18",
    grade: "Lớp 7",
    topic: "KNTT Bài 4: Chu kì trong Bảng tuần hoàn",
    difficulty: "Trung bình",
    question: "Chu kì là dãy các nguyên tố mà nguyên tử của chúng có cùng đặc điểm nào sau đây?",
    options: [
      "Cùng số electron lớp ngoài cùng",
      "Cùng số lớp electron",
      "Cùng hoá trị cao nhất với oxygen",
      "Cùng số hạt neutron"
    ],
    correctIndex: 1,
    explanation: "Chu kì là dãy các nguyên tố xếp theo hàng ngang, mà nguyên tử của chúng có cùng số lớp electron (ví dụ chu kì 2 có 2 lớp e, chu kì 3 có 3 lớp e).",
    knttReference: "KNTT KHTN 7 - Bài 4: Bảng tuần hoàn"
  },
  {
    id: "q7_19",
    grade: "Lớp 7",
    topic: "KNTT Bài 4: Nhóm nguyên tố",
    difficulty: "Trung bình",
    question: "Các nguyên tố trong cùng một nhóm A thường có tính chất hoá học tương tự nhau vì nguyên tử của chúng có cùng:",
    options: [
      "Số lớp electron",
      "Khối lượng nguyên tử",
      "Số electron ở lớp ngoài cùng",
      "Số hạt proton"
    ],
    correctIndex: 2,
    explanation: "Nguyên tử của các nguyên tố trong cùng nhóm A có số electron ở lớp ngoài cùng bằng nhau (bằng số thứ tự nhóm), do đó chúng có tính chất hoá học tương tự nhau.",
    knttReference: "KNTT KHTN 7 - Bài 4: Bảng tuần hoàn"
  },
  {
    id: "q7_20",
    grade: "Lớp 7",
    topic: "KNTT Bài 4: Khí hiếm",
    difficulty: "Dễ",
    question: "Các nguyên tố khí hiếm (như Helium, Neon, Argon) nằm ở nhóm nào trong Bảng tuần hoàn?",
    options: ["Nhóm IA", "Nhóm VIIA", "Nhóm VIIIA", "Nhóm IIA"],
    correctIndex: 2,
    explanation: "Các khí hiếm nằm ở nhóm VIIIA (nhóm 18). Lớp electron ngoài cùng của chúng đã bão hoà bền vững (2e ở He, 8e ở các khí hiếm khác) nên rất trơ về mặt hoá học.",
    funFact: "Bơm khí Heli vào bong bóng bay an toàn tuyệt đối vì Heli là khí hiếm không bắt lửa, khác với khí Hidro rất dễ phát nổ!",
    knttReference: "KNTT KHTN 7 - Bài 4: Bảng tuần hoàn"
  },
  {
    id: "q7_21",
    grade: "Lớp 7",
    topic: "KNTT Bài 4: Kim loại kiềm",
    difficulty: "Trung bình",
    question: "Nhóm IA trong Bảng tuần hoàn (trừ Hydrogen) gồm các nguyên tố được gọi là gì?",
    options: ["Kim loại kiềm", "Kim loại kiềm thổ", "Halogen", "Khí hiếm"],
    correctIndex: 0,
    explanation: "Nhóm IA (Li, Na, K, Rb, Cs, Fr) là nhóm kim loại kiềm. Chúng rất mềm (dễ cắt bằng dao) và phản ứng mãnh liệt với nước tạo dung dịch kiềm.",
    knttReference: "KNTT KHTN 7 - Bài 4: Bảng tuần hoàn"
  },
  {
    id: "q7_22",
    grade: "Lớp 7",
    topic: "KNTT Bài 4: Nhóm Halogen",
    difficulty: "Trung bình",
    question: "Nhóm VIIA trong Bảng tuần hoàn gồm các nguyên tố phi kim điển hình (F, Cl, Br, I) được gọi là nhóm gì?",
    options: ["Nhóm kim loại kiềm thổ", "Nhóm Halogen", "Nhóm khí hiếm", "Nhóm kim loại chuyển tiếp"],
    correctIndex: 1,
    explanation: "Nhóm VIIA là nhóm Halogen (tiếng Hy Lạp có nghĩa là 'sinh ra muối'). Chúng dễ dàng kết hợp với kim loại để tạo thành các muối như NaCl, KBr.",
    knttReference: "KNTT KHTN 7 - Bài 4: Bảng tuần hoàn"
  },
  {
    id: "q7_23",
    grade: "Lớp 7",
    topic: "KNTT Bài 4: Phân loại nguyên tố",
    difficulty: "Dễ",
    question: "Đa số các nguyên tố hoá học trong Bảng tuần hoàn (hơn 80%) thuộc loại nguyên tố nào?",
    options: ["Phi kim", "Kim loại", "Khí hiếm", "Á kim"],
    correctIndex: 1,
    explanation: "Hơn 80% các nguyên tố đã biết trong Bảng tuần hoàn là các nguyên tố kim loại (chiếm toàn bộ nhóm IA, IIA, kim loại chuyển tiếp nhóm B và phân nửa nhóm IIIA - VIA).",
    knttReference: "KNTT KHTN 7 - Bài 4: Bảng tuần hoàn"
  },

  // --- CHỦ ĐỀ 4: PHÂN TỬ - ĐƠN CHẤT - HỢP CHẤT (KNTT BÀI 5) ---
  {
    id: "q7_24",
    grade: "Lớp 7",
    topic: "KNTT Bài 5: Đơn chất và hợp chất",
    difficulty: "Dễ",
    question: "Chất nào sau đây là một ĐƠN CHẤT?",
    options: ["Khí Oxygen (O₂)", "Nước tinh khiết (H₂O)", "Muối ăn (NaCl)", "Khí Carbon dioxide (CO₂)"],
    correctIndex: 0,
    explanation: "Đơn chất là những chất được tạo nên từ chỉ MỘT nguyên tố hoá học. Khí Oxygen chỉ tạo nên từ nguyên tố O nên là đơn chất.",
    knttReference: "KNTT KHTN 7 - Bài 5: Phân tử - Đơn chất - Hợp chất"
  },
  {
    id: "q7_25",
    grade: "Lớp 7",
    topic: "KNTT Bài 5: Đơn chất và hợp chất",
    difficulty: "Dễ",
    question: "Chất nào sau đây là một HỢP CHẤT?",
    options: ["Thỏi kim loại Nhôm (Al)", "Khí Hydrogen (H₂)", "Khí Methane (CH₄)", "Lưu huỳnh bột (S)"],
    correctIndex: 2,
    explanation: "Hợp chất là chất được tạo nên từ HAI hoặc nhiều nguyên tố hoá học khác nhau. Khí Methane (CH₄) được tạo nên từ 2 nguyên tố C và H.",
    knttReference: "KNTT KHTN 7 - Bài 5: Phân tử - Đơn chất - Hợp chất"
  },
  {
    id: "q7_26",
    grade: "Lớp 7",
    topic: "KNTT Bài 5: Khối lượng phân tử",
    difficulty: "Trung bình",
    question: "Khối lượng phân tử của nước (H₂O) là bao nhiêu amu? (Biết H = 1 amu, O = 16 amu)",
    options: ["17 amu", "18 amu", "33 amu", "16 amu"],
    correctIndex: 1,
    explanation: "Khối lượng phân tử H₂O = (2 × 1) + 16 = 18 amu.",
    knttReference: "KNTT KHTN 7 - Bài 5: Phân tử - Đơn chất - Hợp chất"
  },
  {
    id: "q7_27",
    grade: "Lớp 7",
    topic: "KNTT Bài 5: Khối lượng phân tử",
    difficulty: "Trung bình",
    question: "Khối lượng phân tử của khí Carbon dioxide (CO₂) là bao nhiêu amu? (Biết C = 12 amu, O = 16 amu)",
    options: ["28 amu", "44 amu", "32 amu", "40 amu"],
    correctIndex: 1,
    explanation: "Khối lượng phân tử CO₂ = 12 + (2 × 16) = 12 + 32 = 44 amu.",
    knttReference: "KNTT KHTN 7 - Bài 5: Phân tử - Đơn chất - Hợp chất"
  },
  {
    id: "q7_28",
    grade: "Lớp 7",
    topic: "KNTT Bài 5: Khối lượng phân tử",
    difficulty: "Trung bình",
    question: "Khối lượng phân tử của phân đạm Ure CO(NH₂)₂ là bao nhiêu amu? (Biết C = 12, O = 16, N = 14, H = 1)",
    options: ["60 amu", "58 amu", "46 amu", "64 amu"],
    correctIndex: 0,
    explanation: "Khối lượng CO(NH₂)₂ = 12 + 16 + 2 × (14 + 2) = 28 + 32 = 60 amu.",
    funFact: "Phân đạm Ure là loại phân bón cung cấp nguyên tố dinh dưỡng Nitrogen quan trọng nhất cho cây lúa và cây cao su Tây Ninh!",
    knttReference: "KNTT KHTN 7 - Bài 5: Phân tử - Đơn chất - Hợp chất"
  },
  {
    id: "q7_29",
    grade: "Lớp 7",
    topic: "KNTT Bài 5: Khái niệm phân tử",
    difficulty: "Dễ",
    question: "Hạt đại diện cho chất, gồm một số nguyên tử liên kết với nhau và thể hiện đầy đủ tính chất hoá học của chất đó được gọi là gì?",
    options: ["Nguyên tử", "Ion", "Phân tử", "Hạt nhân"],
    correctIndex: 2,
    explanation: "Phân tử là hạt đại diện cho chất, gồm một số nguyên tử liên kết với nhau và thể hiện đầy đủ tính chất hoá học của chất.",
    knttReference: "KNTT KHTN 7 - Bài 5: Phân tử - Đơn chất - Hợp chất"
  },

  // --- CHỦ ĐỀ 5: LIÊN KẾT HOÁ HỌC (KNTT BÀI 6) ---
  {
    id: "q7_30",
    grade: "Lớp 7",
    topic: "KNTT Bài 6: Quy tắc Octet",
    difficulty: "Trung bình",
    question: "Theo quy tắc Octet (bát tử), nguyên tử của các nguyên tố có xu hướng nhường, nhận hoặc dùng chung electron để đạt lớp ngoài cùng bền vững giống khí hiếm gồm mấy electron?",
    options: ["2 electron", "6 electron", "8 electron", "10 electron"],
    correctIndex: 2,
    explanation: "Quy tắc bát tử (octet rule): Các nguyên tử có xu hướng liên kết để đạt cấu hình electron bền vững với 8 electron ở lớp ngoài cùng (hoặc 2 electron như Helium).",
    knttReference: "KNTT KHTN 7 - Bài 6: Giới thiệu về liên kết hoá học"
  },
  {
    id: "q7_31",
    grade: "Lớp 7",
    topic: "KNTT Bài 6: Liên kết ion",
    difficulty: "Dễ",
    question: "Khi nguyên tử kim loại Sodium (Na) nhường đi 1 electron ở lớp ngoài cùng, nó sẽ biến thành hạt mang điện tích gì?",
    options: ["Ion dương Na⁺", "Ion âm Na⁻", "Nguyên tử trung hoà", "Phân tử"],
    correctIndex: 0,
    explanation: "Khi nhường bớt hạt mang điện âm (electron), số proton dương nhiều hơn số electron âm nên nguyên tử trở thành cation mang điện tích dương (Na⁺).",
    knttReference: "KNTT KHTN 7 - Bài 6: Giới thiệu về liên kết hoá học"
  },
  {
    id: "q7_32",
    grade: "Lớp 7",
    topic: "KNTT Bài 6: Liên kết ion",
    difficulty: "Trung bình",
    question: "Liên kết ion được hình thành do lực tương tác nào sau đây?",
    options: [
      "Lực hút tĩnh điện giữa các ion mang điện tích trái dấu",
      "Lực dùng chung các đôi electron",
      "Lực hấp dẫn giữa các hạt nhân",
      "Lực ma sát cơ học"
    ],
    correctIndex: 0,
    explanation: "Liên kết ion là liên kết được hình thành bởi lực hút tĩnh điện giữa các ion mang điện tích trái dấu (ion dương cation và ion âm anion).",
    knttReference: "KNTT KHTN 7 - Bài 6: Giới thiệu về liên kết hoá học"
  },
  {
    id: "q7_33",
    grade: "Lớp 7",
    topic: "KNTT Bài 6: Chất ion",
    difficulty: "Trung bình",
    question: "Chất nào sau đây trong phân tử có chứa LIÊN KẾT ION?",
    options: ["Nước (H₂O)", "Muối ăn (Sodium chloride, NaCl)", "Khí Methane (CH₄)", "Khí Oxygen (O₂)"],
    correctIndex: 1,
    explanation: "NaCl được hình thành do lực hút tĩnh điện giữa ion Na⁺ (kim loại điển hình) và ion Cl⁻ (phi kim điển hình), là hợp chất ion.",
    knttReference: "KNTT KHTN 7 - Bài 6: Giới thiệu về liên kết hoá học"
  },
  {
    id: "q7_34",
    grade: "Lớp 7",
    topic: "KNTT Bài 6: Liên kết cộng hoá trị",
    difficulty: "Trung bình",
    question: "Liên kết cộng hoá trị là liên kết được hình thành giữa hai nguyên tử bằng:",
    options: [
      "Lực hút giữa ion dương và ion âm",
      "Một hoặc nhiều đôi electron dùng chung",
      "Sự va chạm cơ học giữa các hạt nhân",
      "Lực từ trường của electron"
    ],
    correctIndex: 1,
    explanation: "Liên kết cộng hoá trị là liên kết được hình thành giữa hai nguyên tử bằng một hoặc nhiều cặp (đôi) electron dùng chung.",
    knttReference: "KNTT KHTN 7 - Bài 6: Giới thiệu về liên kết hoá học"
  },
  {
    id: "q7_35",
    grade: "Lớp 7",
    topic: "KNTT Bài 6: Liên kết trong phân tử nước",
    difficulty: "Trung bình",
    question: "Trong phân tử nước (H₂O), nguyên tử Oxygen liên kết với 2 nguyên tử Hydrogen bằng loại liên kết nào?",
    options: ["Liên kết kim loại", "Liên kết ion", "Liên kết cộng hoá trị", "Liên kết hydro nội phân tử"],
    correctIndex: 2,
    explanation: "Trong H₂O, nguyên tử O góp chung 1 electron với mỗi nguyên tử H để tạo thành 2 đôi electron dùng chung, đó là liên kết cộng hoá trị phân cực.",
    knttReference: "KNTT KHTN 7 - Bài 6: Giới thiệu về liên kết hoá học"
  },
  {
    id: "q7_36",
    grade: "Lớp 7",
    topic: "KNTT Bài 6: Tính chất chất ion và cộng hoá trị",
    difficulty: "Thử thách",
    question: "Các hợp chất ion (như muối ăn NaCl) thường có đặc điểm vật lý nào sau đây ở điều kiện thường?",
    options: [
      "Thể khí hoặc lỏng, nhiệt độ sôi thấp",
      "Thể rắn, nhiệt độ nóng chảy và nhiệt độ sôi rất cao",
      "Dễ bay hơi và có mùi thơm nồng",
      "Không bao giờ tan trong nước"
    ],
    correctIndex: 1,
    explanation: "Do lực hút tĩnh điện giữa các ion ngược dấu trong mạng tinh thể rất mạnh, các hợp chất ion đều là chất rắn, khó nóng chảy, nhiệt độ sôi và nóng chảy rất cao.",
    knttReference: "KNTT KHTN 7 - Bài 6: Giới thiệu về liên kết hoá học"
  },

  // --- CHỦ ĐỀ 6: HOÁ TRỊ VÀ CÔNG THỨC HOÁ HỌC (KNTT BÀI 7) ---
  {
    id: "q7_37",
    grade: "Lớp 7",
    topic: "KNTT Bài 7: Quy ước hoá trị",
    difficulty: "Dễ",
    question: "Theo quy ước hoá trị, nguyên tố nào luôn được chọn làm đơn vị và quy ước có hoá trị I?",
    options: ["Oxygen (O)", "Hydrogen (H)", "Carbon (C)", "Nitrogen (N)"],
    correctIndex: 1,
    explanation: "Người ta quy ước gán cho nguyên tố Hydrogen (H) có hoá trị bằng I. Một nguyên tử của nguyên tố khác liên kết với bao nhiêu nguyên tử H thì có hoá trị bấy nhiêu.",
    knttReference: "KNTT KHTN 7 - Bài 7: Hoá trị và công thức hoá học"
  },
  {
    id: "q7_38",
    grade: "Lớp 7",
    topic: "KNTT Bài 7: Hoá trị của Oxygen",
    difficulty: "Dễ",
    question: "Theo quy ước quốc tế, nguyên tố Oxygen (O) luôn có hoá trị là bao nhiêu trong hầu hết các hợp chất?",
    options: ["Hoá trị I", "Hoá trị II", "Hoá trị III", "Hoá trị IV"],
    correctIndex: 1,
    explanation: "Oxygen luôn được quy ước có hoá trị II trong các hợp chất hoá học phổ biến.",
    knttReference: "KNTT KHTN 7 - Bài 7: Hoá trị và công thức hoá học"
  },
  {
    id: "q7_39",
    grade: "Lớp 7",
    topic: "KNTT Bài 7: Quy tắc hoá trị",
    difficulty: "Trung bình",
    question: "Đối với hợp chất hai nguyên tố có dạng AxBy, quy tắc hoá trị được biểu diễn bởi biểu thức toán học nào? (với a, b là hoá trị của A và B)",
    options: ["x × y = a × b", "x × a = y × b", "x + a = y + b", "x / a = y / b"],
    correctIndex: 1,
    explanation: "Quy tắc hoá trị: Tích của chỉ số và hoá trị của nguyên tố này bằng tích của chỉ số và hoá trị của nguyên tố kia: x × a = y × b.",
    knttReference: "KNTT KHTN 7 - Bài 7: Hoá trị và công thức hoá học"
  },
  {
    id: "q7_40",
    grade: "Lớp 7",
    topic: "KNTT Bài 7: Xác định hoá trị",
    difficulty: "Trung bình",
    question: "Trong hợp chất Carbon dioxide (CO₂), nguyên tố Carbon (C) có hoá trị là bao nhiêu?",
    options: ["Hoá trị I", "Hoá trị II", "Hoá trị IV", "Hoá trị VI"],
    correctIndex: 2,
    explanation: "Áp dụng quy tắc hoá trị: Gọi a là hoá trị của C. Ta có 1 × a = 2 × II -> a = IV. Vậy Carbon có hoá trị IV trong CO₂.",
    knttReference: "KNTT KHTN 7 - Bài 7: Hoá trị và công thức hoá học"
  },
  {
    id: "q7_41",
    grade: "Lớp 7",
    topic: "KNTT Bài 7: Lập công thức hoá học",
    difficulty: "Trung bình",
    question: "Công thức hoá học đúng của hợp chất tạo bởi nguyên tố Aluminium (Al, hoá trị III) và nguyên tố Oxygen (O, hoá trị II) là gì?",
    options: ["AlO", "Al₂O₃", "Al₃O₂", "AlO₂"],
    correctIndex: 1,
    explanation: "Theo quy tắc hoá trị x × III = y × II -> x/y = 2/3 -> Chỉ số tối giản x = 2, y = 3 -> Công thức hoá học là Al₂O₃ (Nhôm oxit).",
    knttReference: "KNTT KHTN 7 - Bài 7: Hoá trị và công thức hoá học"
  },
  {
    id: "q7_42",
    grade: "Lớp 7",
    topic: "KNTT Bài 7: Hoá trị của nhóm nguyên tử",
    difficulty: "Trung bình",
    question: "Nhóm hydroxide (-OH) trong phân tử nước vôi trong Ca(OH)₂ và xút NaOH có hoá trị là bao nhiêu?",
    options: ["Hoá trị I", "Hoá trị II", "Hoá trị III", "Hoá trị IV"],
    correctIndex: 0,
    explanation: "Nhóm -OH (hydroxide) luôn có hoá trị I (do 1 nguyên tử O hoá trị II liên kết với 1 nguyên tử H hoá trị I, còn thừa 1 hoá trị tự do).",
    knttReference: "KNTT KHTN 7 - Bài 7: Hoá trị và công thức hoá học"
  },
  {
    id: "q7_43",
    grade: "Lớp 7",
    topic: "KNTT Bài 7: Hoá trị nhóm sulfate",
    difficulty: "Trung bình",
    question: "Nhóm sulfate (=SO₄) trong hợp chất H₂SO₄ và CuSO₄ có hoá trị là bao nhiêu?",
    options: ["Hoá trị I", "Hoá trị II", "Hoá trị III", "Hoá trị IV"],
    correctIndex: 1,
    explanation: "Nhóm =SO₄ (sulfate) có hoá trị II, liên kết với 2 nguyên tử H hoá trị I trong phân tử H₂SO₄.",
    knttReference: "KNTT KHTN 7 - Bài 7: Hoá trị và công thức hoá học"
  },
  {
    id: "q7_44",
    grade: "Lớp 7",
    topic: "KNTT Bài 7: Ý nghĩa công thức hoá học",
    difficulty: "Dễ",
    question: "Công thức hoá học H₂SO₄ cho chúng ta biết thông tin nào sau đây?",
    options: [
      "Chất này gồm 3 nguyên tố H, S, O tạo nên",
      "Trong 1 phân tử có 2 nguyên tử H, 1 nguyên tử S và 4 nguyên tử O",
      "Khối lượng phân tử của chất là 98 amu",
      "Cả 3 nhận định trên đều đúng"
    ],
    correctIndex: 3,
    explanation: "Công thức hoá học cho biết nguyên tố cấu tạo, số lượng nguyên tử mỗi nguyên tố trong 1 phân tử, và khối lượng phân tử: (2×1) + 32 + (4×16) = 98 amu.",
    knttReference: "KNTT KHTN 7 - Bài 7: Hoá trị và công thức hoá học"
  },
  {
    id: "q7_45",
    grade: "Lớp 7",
    topic: "KNTT Bài 7: Phần trăm khối lượng nguyên tố",
    difficulty: "Thử thách",
    question: "Phần trăm khối lượng của nguyên tố Hydrogen trong phân tử khí Methane (CH₄) là bao nhiêu? (C = 12 amu, H = 1 amu)",
    options: ["25%", "20%", "75%", "10%"],
    correctIndex: 0,
    explanation: "Khối lượng phân tử CH₄ = 12 + 4 = 16 amu. %H = (4 × 1 / 16) × 100% = 4/16 × 100% = 25%.",
    knttReference: "KNTT KHTN 7 - Bài 7: Hoá trị và công thức hoá học"
  },
  {
    id: "q7_46",
    grade: "Lớp 7",
    topic: "KNTT Bài 7: Phần trăm khối lượng nguyên tố",
    difficulty: "Thử thách",
    question: "Phần trăm khối lượng của nguyên tố Oxygen trong phân tử nước (H₂O) là xấp xỉ bao nhiêu?",
    options: ["50%", "88,89%", "11,11%", "33,33%"],
    correctIndex: 1,
    explanation: "Phân tử khối H₂O = 18. %O = (16 / 18) × 100% ≈ 88,89%. Hydrogen chiếm 11,11%.",
    funFact: "Mặc dù phân tử nước có tới 2 nguyên tử H và chỉ 1 nguyên tử O, nhưng do nguyên tử O nặng gấp 16 lần nguyên tử H nên Oxygen chiếm gần 90% khối lượng nước!",
    knttReference: "KNTT KHTN 7 - Bài 7: Hoá trị và công thức hoá học"
  },

  // --- KHOA HỌC THỰC NGHIỆM & TỔNG KẾT KHỐI 7 ---
  {
    id: "q7_47",
    grade: "Lớp 7",
    topic: "KNTT KHTN 7: Dụng cụ đo thể tích chất lỏng",
    difficulty: "Dễ",
    question: "Dụng cụ thuỷ tinh nào sau đây thường dùng để đo chính xác thể tích chất lỏng trong phòng thí nghiệm trường THCS Lý Tự Trọng?",
    options: ["Ống đong (hoặc bình định mức)", "Nhiệt kế rượu", "Cân đồng hồ", "Kẹp gỗ"],
    correctIndex: 0,
    explanation: "Ống đong có các vạch chia độ chính xác tính bằng mililít (mL) dùng để đong đo thể tích dung dịch.",
    knttReference: "KNTT KHTN 7 - Mở đầu: Dụng cụ và kỹ năng thực hành"
  },
  {
    id: "q7_48",
    grade: "Lớp 7",
    topic: "KNTT KHTN 7: Kỹ năng đọc thể tích",
    difficulty: "Trung bình",
    question: "Khi đọc thể tích chất lỏng trong ống đong thuỷ tinh, mắt phải đặt ở vị trí nào?",
    options: [
      "Nhìn từ trên xuống dưới",
      "Nhìn từ dưới chếch lên trên",
      "Đặt mắt ngang bằng với đáy mặt cong (mặt khum lõm) của chất lỏng",
      "Đặt mắt ở góc 45 độ tuỳ ý"
    ],
    correctIndex: 2,
    explanation: "Quy tắc chuẩn: Mắt phải nhìn ngang bằng với đáy của bề mặt cong (mặt khum) của chất lỏng để đọc kết quả chính xác nhất.",
    knttReference: "KNTT KHTN 7 - Kỹ năng đo lường"
  },
  {
    id: "q7_49",
    grade: "Lớp 7",
    topic: "KNTT Bài 3: Nguồn gốc tên gọi nguyên tố",
    difficulty: "Trung bình",
    question: "Nguyên tố Polonium (Po) trong Bảng tuần hoàn được hai nhà bác học Marie Curie và Pierre Curie đặt tên để vinh danh điều gì?",
    options: [
      "Tên trường đại học nơi họ nghiên cứu",
      "Tên đất nước Ba Lan (Poland) - quê hương của Marie Curie",
      "Tên một hành tinh trong hệ Mặt Trời",
      "Tên một loài hoa của nước Pháp"
    ],
    correctIndex: 1,
    explanation: "Marie Curie đã đặt tên nguyên tố là Polonium theo tên quê hương Ba Lan (Poland) của bà để thể hiện lòng yêu nước nồng nàn.",
    knttReference: "KNTT KHTN 7 - Bài 3: Nguyên tố hoá học"
  },
  {
    id: "q7_50",
    grade: "Lớp 7",
    topic: "KNTT Bài 4: Tính chất biến đổi tuần hoàn",
    difficulty: "Thử thách",
    question: "Trong một chu kì của Bảng tuần hoàn (đi từ trái sang phải theo chiều tăng của điện tích hạt nhân), bán kính nguyên tử có xu hướng biến đổi như thế nào?",
    options: [
      "Tăng dần đều",
      "Giảm dần",
      "Không thay đổi",
      "Tăng rồi sau đó giảm đột ngột"
    ],
    correctIndex: 1,
    explanation: "Trong cùng 1 chu kì (cùng số lớp electron), khi điện tích hạt nhân tăng dần, lực hút của hạt nhân lên các electron lớp ngoài cùng càng mạnh, kéo lớp vỏ co lại làm bán kính nguyên tử giảm dần.",
    knttReference: "KNTT KHTN 7 - Bài 4: Bảng tuần hoàn"
  }
];
