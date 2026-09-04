import { normalizeChemistryText } from "./chemistryFormatter";

export function getClientPedagogicalFallback(question: string, mode = "ask", grade = "8"): string {
  const q = question.toLowerCase().trim();

  if (q.includes("cân bằng") && (q.includes("phương trình") || q.includes("pt") || q.includes("hoá học") || q.includes("hóa học"))) {
    return normalizeChemistryText(`Chào em! Cân bằng phương trình hoá học là kỹ năng nền tảng quan trọng nhất của môn KHTN / Hoá học THCS (bộ sách Kết nối tri thức). Cô hướng dẫn em **phương pháp cân bằng đơn giản, dễ nhớ và nhanh nhất (Quy tắc ưu tiên & Phương pháp Chẵn - Lẻ)** nhé:

### 1. Nguyên tắc cốt lõi không được quên
- **Định luật bảo toàn khối lượng:** Tổng số nguyên tử của từng nguyên tố ở vế trái (chất phản ứng) **luôn luôn bằng** vế phải (chất sản phẩm).
- **Quy tắc bất di bất dịch:** Ta chỉ được thêm **hệ số** đặt phía trước công thức hoá học (ví dụ: **2**H₂O, **3**O₂). **Tuyệt đối không được thay đổi chỉ số chân** (chẳng hạn không được đổi Al₂O₃ thành Al₂O₄ hay H₂O thành H₂O₂)!

### 2. Thứ tự ưu tiên cân bằng nhanh (Mẹo vàng của Cô Dương)
Khi nhìn vào một phương trình, em hãy cân bằng lần lượt theo thứ tự:
1. **Kim loại** trước tiên (Al, Fe, Cu, Na, Ca, Mg, Zn...).
2. **Phi kim** tiếp theo (C, S, P, Cl, N...).
3. **Hydrogen (H)** kế tiếp.
4. **Oxygen (O)** kiểm tra cuối cùng (nếu các nguyên tố trên đã đúng thì Oxygen sẽ tự động khớp!).
*(Mẹo nhỏ: Nếu trong phương trình có nhóm nguyên tử như SO₄, NO₃, OH, PO₄ không bị vỡ sau phản ứng, em hãy xem cả nhóm đó như một đơn vị để cân bằng).*

### 3. Phương pháp Chẵn - Lẻ (Bí quyết giải nhanh)
Nếu một nguyên tố ở một vế có số nguyên tử là **số lẻ**, còn vế kia là **số chẵn**, em hãy nhân hệ số **2** vào chất chứa số lẻ đó để biến nó thành số chẵn, sau đó cân bằng các nguyên tố còn lại.

### 4. Ba ví dụ mẫu từng bước cực dễ hiểu

**Ví dụ 1: Nhôm tác dụng với Oxi**
- Sơ đồ: \`Al + O₂ ──(t°)──> Al₂O₃\`
- Phân tích: Bên phải có 3 nguyên tử O (lẻ), bên trái có 2 nguyên tử O (chẵn).
- Bước 1 (Làm chẵn O): Đặt hệ số **2** trước Al₂O₃ ──> \`Al + O₂ ──> 2Al₂O₃\` (lúc này bên phải có 2 × 3 = 6 nguyên tử O).
- Bước 2 (Khớp O bên trái): Đặt hệ số **3** trước O₂ (3 × 2 = 6 nguyên tử O).
- Bước 3 (Khớp Al): Bên phải có 2 × 2 = 4 nguyên tử Al ──> Đặt hệ số **4** trước Al ở vế trái.
- Phương trình hoàn chỉnh:
  **4Al + 3O₂ ──(t°)──> 2Al₂O₃**

**Ví dụ 2: Sắt tác dụng với Axit clohiđric**
- Sơ đồ: \`Fe + HCl ──> FeCl₂ + H₂↑\`
- Quan sát: Vế phải có 2 Cl và 2 H.
- Bước 1: Chỉ cần đặt hệ số **2** trước HCl ở vế trái là cả Cl và H đều khớp!
- Phương trình hoàn chỉnh:
  **Fe + 2HCl ──> FeCl₂ + H₂↑**

**Ví dụ 3: Đốt cháy khí gas gia đình (Metan)**
- Sơ đồ: \`CH₄ + O₂ ──(t°)──> CO₂ + H₂O\`
- Cân bằng C: 1 C = 1 C (đã bằng).
- Cân bằng H: Vế trái có 4 H, vế phải có 2 H ──> Đặt hệ số **2** trước H₂O (thành 4 H).
- Cân bằng O: Vế phải có 2 (trong CO₂) + 2 (trong 2H₂O) = 4 O ──> Đặt hệ số **2** trước O₂ ở vế trái.
- Phương trình hoàn chỉnh:
  **CH₄ + 2O₂ ──(t°)──> CO₂ + 2H₂O**

Em hãy thử áp dụng ngay với phản ứng: \`Fe + O₂ ──(t°)──> Fe₃O₄\` và cho cô biết hệ số của Fe và O₂ là bao nhiêu nhé!`);
  }

  if (q.includes("học giỏi") || q.includes("bí quyết") || q.includes("phương pháp học") || q.includes("yêu thích")) {
    return normalizeChemistryText(`Chào em! Cô rất vui khi biết em có tinh thần học hỏi và muốn chinh phục môn Hoá học. Hoá học là một môn học vô cùng kỳ diệu vì nó giải thích mọi điều diễn ra quanh ta.

Dưới đây là 5 bí quyết vàng từ Cô Dương giúp em học giỏi Hoá học KNTT:

### 1. Nắm chắc "Bảng tuần hoàn" và "Bảng hoá trị"
- Hoá trị giống như bảng cửu chương của môn Toán. Em hãy thuộc lòng bài ca hoá trị và hoá trị của các nhóm nguyên tử quen thuộc: OH (I), NO₃ (I), SO₄ (II), CO₃ (II), PO₄ (III).
- Ghi nhớ ký hiệu hoá học của 20 nguyên tố đầu tiên trong bảng tuần hoàn (H, He, Li, Be, B, C, N, O, F, Ne, Na, Mg, Al, Si, P, S, Cl, Ar, K, Ca).

### 2. Học Hoá qua thí nghiệm & liên hệ thực tế
- Đừng học vẹt phương trình! Khi học một chất, hãy tự hỏi: "Chất này có ở đâu trong nhà mình?", "Hiện tượng khi nó phản ứng ra sao?".
- Ví dụ: Giấm ăn hoà tan cặn vôi ấm nước chính là phản ứng giữa axit axetic (CH₃COOH) và đá vôi (CaCO₃).

### 3. Thành thạo kỹ năng cân bằng phương trình hoá học
- Luôn kiểm tra định luật bảo toàn khối lượng: Số nguyên tử của mỗi nguyên tố ở vế trái luôn bằng vế phải.
- Áp dụng thứ tự ưu tiên: Kim loại → Phi kim → Hydrogen → Oxygen.

### 4. Sử dụng sơ đồ tư duy (Mindmap)
- Sau mỗi bài học hoặc mỗi chương (Oxit, Axit, Bazơ, Muối, Kim loại, Phi kim), em hãy tự vẽ sơ đồ hình cây hoặc mạng nhện để tổng kết tính chất hoá học và phương trình minh hoạ.

### 5. Tích cực tham gia hoạt động CLB Hoá học
- Tự tay làm các thí nghiệm STEM an toàn, tham gia thảo luận cùng các bạn và cô giáo. Khi em tự mình làm thí nghiệm và nhìn thấy sự đổi màu, sủi bọt, kết tủa, kiến thức sẽ khắc sâu vào trí nhớ tự nhiên mà không cần gắng gượng.

Chúc em luôn tràn đầy cảm hứng khám phá khoa học nhé!`);
  }

  if (q.includes("nước sôi") || (q.includes("nước") && q.includes("sôi"))) {
    return normalizeChemistryText(`Chào em! Câu hỏi về nhiệt độ sôi của nước là một hiện tượng rất quen thuộc nhưng ẩn chứa nhiều kiến thức khoa học bổ ích:

### 1. Hiện tượng & Câu trả lời cốt lõi
* **Nhiệt độ sôi chuẩn:** Nước tinh khiết sôi ở đúng **100 °C** ở áp suất khí quyển tiêu chuẩn (**1 atm** = **101,3 kPa**, tương đương mực nước biển).
* **Nhiệt độ này có thể thay đổi:** Phụ thuộc vào áp suất bề mặt và độ tinh khiết của nước.

### 2. Bản chất hoá học & vật lí
- Phân tử nước (**H₂O**) có các **liên kết hydro liên phân tử** tương đối bền vững.
- Khi được đun nóng đến 100 °C, động năng của các phân tử nước tăng cao, áp suất hơi nước bão hoà bên trong bọt khí cân bằng với áp suất khí quyển, các phân tử bứt phá mãnh liệt chuyển thành thể hơi.
- **Trên đỉnh núi Bà Đen Tây Ninh (cao 986 m):** Càng lên cao không khí càng loãng, áp suất giảm (còn khoảng 0,9 atm), nên nước sôi ở khoảng **96–97 °C**, luộc thức ăn sẽ lâu chín hơn.
- **Nồi áp suất:** Giữ kín hơi nước làm tăng áp suất lên 1,5–2 atm, nước sôi ở **115–120 °C**, giúp thức ăn chín nhừ nhanh gấp nhiều lần và tiết kiệm năng lượng.

### 3. Ứng dụng đời sống
- Nước có hoà tan muối ăn (NaCl) sẽ sôi ở nhiệt độ cao hơn 100 °C (khoảng 101–103 °C tuỳ nồng độ).
- Khử trùng dụng cụ y tế và bình sữa bằng cách đun sôi ở 100 °C trong 10 phút để tiêu diệt vi khuẩn có hại.

### 4. Thử thách nhỏ cho em
Nếu em tiếp tục đun ấm nước đang sôi sùng sục ở 100 °C với ngọn lửa lớn hơn gấp đôi, nhiệt độ của nước lỏng có tăng lên 110 °C được không? Tại sao?`);
  }

  if (q.includes("hành") || q.includes("cay mắt") || q.includes("chảy nước mắt")) {
    return normalizeChemistryText(`Chào em! Hiện tượng cắt hành tây bị cay mắt là một phản ứng tự vệ tự nhiên của thực vật:

### 1. Hiện tượng & Câu trả lời cốt lõi
Khi dùng dao cắt hành, các tế bào thực vật bị phá vỡ giải phóng hợp chất lưu huỳnh bay vào không khí. Khi tiếp xúc với màng nước mắt, chất này tạo thành một lượng axit cực nhỏ gây kích ứng, kích hoạt tuyến lệ tiết nước mắt ào ạt để bảo vệ mắt.

### 2. Bản chất hoá học
- Trong tế bào hành còn nguyên vẹn, enzyme **alliinase** và acid amin **sulfoxide** nằm riêng biệt trong các túi tế bào.
- Khi bị dao cắt đứt màng tế bào, enzyme alliinase xúc tác phản ứng tạo ra chất khí **syn-propanethial-S-oxide** (C₃H₆OS) rất dễ bay hơi.
- Khi khí này chạm vào bề mặt giác mạc ẩm ướt, nó phản ứng với nước mắt tạo ra acid nhẹ kích thích đầu dây thần kinh cảm giác.

### 3. Mẹo hoá học trong gian bếp
- **Làm lạnh hành:** Cho hành vào ngăn mát tủ lạnh 15–30 phút trước khi cắt (nhiệt độ thấp làm giảm tốc độ phản ứng enzyme và giảm sự bay hơi của khí).
- **Dùng dao thật bén:** Giúp vết cắt gọn gàng, ít làm dập nát tế bào.
- **Cắt dưới nước hoặc gần vòi nước:** Khí sinh ra sẽ hoà tan ngay vào nước trước khi bay lên mắt.`);
  }

  if (q.includes("rỉ sét") || q.includes("gỉ") || q.includes("sắt") || q.includes("ăn mòn")) {
    return normalizeChemistryText(`Chào em! Hiện tượng rỉ sét của sắt là kiến thức trọng tâm bài Kim loại & Ăn mòn kim loại (KNTT Lớp 9):

### 1. Hiện tượng & Câu trả lời cốt lõi
Đinh sắt hoặc vật dụng bằng sắt thép để ngoài không khí ẩm sau vài ngày sẽ bị bao phủ bởi lớp vảy màu nâu đỏ, xốp và giòn, gọi là **gỉ sắt**.

### 2. Bản chất hoá học
- Sắt (Fe) bị oxi hoá chậm bởi oxygen và hơi ẩm trong không khí tạo thành iron(III) oxide ngậm nước:
  \`4Fe + 3O₂ + 2nH₂O → 2Fe₂O₃·nH₂O\`
- Khác với kim loại nhôm (Al) tạo lớp màng Al₂O₃ cực mịn bảo vệ bên trong, lớp gỉ Fe₂O₃ lại xốp rỗng, để cho hơi nước và O₂ tiếp tục ngấm sâu vào phá huỷ hoàn toàn lõi kim loại.

### 3. Biện pháp bảo vệ kim loại
- **Cách li với môi trường:** Sơn bề mặt, tra dầu mỡ định kỳ (xích xe đạp), mạ kim loại bền (mạ kẽm ở tôn, mạ crom ở ghi-đông).
- **Hợp kim không gỉ:** Chế tạo inox (thép không gỉ) bằng cách pha thêm Crôm và Niken vào sắt.`);
  }

  if (q.includes("slime") || (mode === "suggest" && q.includes("keo"))) {
    return normalizeChemistryText(`### Hướng dẫn làm Slime an toàn tuyệt đối tại nhà (Không dùng Borax)

- **Mục tiêu học tập:** Khám phá cấu trúc chất dẻo polymer và hiện tượng liên kết ngang (Cross-linking) - KNTT Lớp 9.
- **Nguyên liệu cần chuẩn bị:**
  + 1 lọ keo dán giấy trắng hoặc trong suốt dạng lỏng (chứa polymer Polyvinyl Alcohol - PVA).
  + Nước muối sinh lý NaCl 0,9% (hoặc dung dịch ngâm kính áp tròng chứa đệm borate an toàn).
  + 1/2 thìa cà phê bột baking soda (NaHCO₃).
  + Vài giọt phẩm màu thực phẩm tự nhiên hoặc nước cốt lá dứa / củ dền.
- **Các bước tiến hành:**
  1. Rót keo dán vào bát nhựa nhỏ, nhỏ 2 giọt màu thực phẩm khuấy đều.
  2. Hòa tan 1 nhúm nhỏ baking soda vào keo để tạo môi trường đệm.
  3. Nhỏ từ từ từng giọt dung dịch nước muối sinh lý vào và dùng thìa khuấy liên tục theo một chiều.
  4. Quan sát keo đặc dần, dẻo dai và tách rời khỏi thành bát. Nhào nặn bằng tay 2 phút là có một khối slime dẻo dai tuyệt đẹp!
- **Lưu ý an toàn:** Rửa sạch tay bằng xà phòng sau khi chơi, bảo quản trong hộp kín.`);
  }

  if (q.includes("chanh") || q.includes("tàng hình") || q.includes("mực")) {
    return normalizeChemistryText(`### Hướng dẫn làm Mực tàng hình bí mật bằng nước cốt chanh

- **Mục tiêu học tập:** Tìm hiểu phản ứng oxi hoá - khử và sự than hoá (carbon hoá) của hợp chất hữu cơ - KNTT Lớp 8 & 9.
- **Dụng cụ & Nguyên liệu:**
  + 1/2 quả chanh tươi vắt lấy nước cốt.
  + Tăm bông sạch hoặc cọ lông nhỏ.
  + 1 tờ giấy trắng phẳng.
  + Nguồn nhiệt nhẹ: Đèn bàn sợi đốt, bàn ủi ấm hoặc máy sấy tóc (an toàn, không dùng lửa trần).
- **Các bước tiến hành:**
  1. Nhúng đầu tăm bông vào nước cốt chanh, nắn nhẹ cho ráo bớt rồi viết lời nhắn bí mật lên tờ giấy trắng.
  2. Để giấy khô tự nhiên khoảng 10 phút. Lúc này dòng chữ hoàn toàn biến mất trong suốt, không ai nhìn thấy!
  3. Để hiện chữ: Hơ nhẹ mặt sau tờ giấy trên bóng đèn bàn hoặc máy sấy tóc ấm.
  4. Kỳ diệu thay! Các nét chữ tàng hình dần hiện lên với màu nâu vàng cổ kính rất rõ nét!
- **Giải thích khoa học:** Nước cốt chanh chứa axit citric (C₆H₈O₇) và các hợp chất carbon hữu cơ. Khi gặp nhiệt độ, axit citric làm yếu các sợi cellulose của giấy và bản thân nó bị oxi hoá, carbon hoá nhanh hơn giấy ở nhiệt độ thấp hơn, chuyển thành màu nâu vàng.`);
  }

  if (mode === "khkt" || q.includes("khkt") || q.includes("nckh") || q.includes("đề tài") || q.includes("tây ninh")) {
    return normalizeChemistryText(`### Định hướng Đề tài Nghiên cứu KHKT ViSEF dành cho học sinh THCS

1. **Tên đề tài gợi ý:** "Nghiên cứu tận dụng phụ phẩm vỏ thanh long ruột đỏ và vỏ bưởi Tây Ninh để chiết xuất chất màu tự nhiên và chế tạo màng bọc sinh học kháng khuẩn"
2. **Tính mới & Ý nghĩa địa phương:**
   - Tây Ninh có diện tích trồng cây ăn trái và nông sản lớn. Vỏ quả thường bị vứt bỏ gây ô nhiễm môi trường.
   - Chiết xuất sắc tố tự nhiên Anthocyanin/Betacyanin làm chất chỉ thị pH sinh học phục vụ thí nghiệm KHTN tại trường.
   - Tận dụng pectin trong vỏ bưởi kết hợp tinh dầu để tạo màng bọc bảo quản thực phẩm thay thế màng nilon.
3. **Phương pháp thực hiện khả thi tại trường THCS:**
   - Thu gom và xử lý sạch nguyên liệu vỏ trái cây.
   - Chiết tách bằng phương pháp ngâm chiết dung môi nước ấm và cồn y tế an toàn.
   - Thử nghiệm phản ứng đổi màu với các dung dịch pH khác nhau (chanh, giấm, xà phòng, baking soda).
   - Đánh giá khả năng phân huỷ sinh học trong đất trồng sau 2-4 tuần.`);
  }

  return normalizeChemistryText(`Chào em! Cô là Huỳnh Thị Thuỳ Dương, chủ nhiệm CLB Hoá học THCS Lý Tự Trọng (bộ sách Kết nối tri thức với cuộc sống):

### 1. Hiện tượng & Bản chất hoá học
Vấn đề "${question}" là một chủ đề gắn liền với các quy luật biến đổi chất trong tự nhiên. Trong môn Hoá học - KHTN, mỗi chất đều có thành phần cấu tạo từ các nguyên tố hoá học xác định và biến đổi qua các phản ứng hoá học tuân theo định luật bảo toàn khối lượng và năng lượng.

### 2. Liên hệ SGK Kết nối tri thức (KNTT) Lớp ${grade}
- Em có thể đối chiếu thêm bài học tương ứng trong sách giáo khoa KHTN để nắm vững phương trình phản ứng và tính chất đặc trưng.
- Chú ý quan sát hiện tượng thực tế: sự thay đổi màu sắc, xuất hiện kết tủa, giải phóng chất khí hoặc toả/thu nhiệt.

### 3. Lời khuyên từ Cô Dương
Hãy ghi lại câu hỏi này vào Sổ tay khoa học nhí của CLB. Cô rất khuyến khích em tự mình quan sát thêm các hiện tượng tương tự trong cuộc sống hàng ngày tại Tây Ninh nhé!`);
}
