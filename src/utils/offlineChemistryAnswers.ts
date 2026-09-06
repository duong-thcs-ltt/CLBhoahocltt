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

  if (
    q.includes("hóa trị") ||
    q.includes("hoa tri") ||
    q.includes("nhớ hóa trị") ||
    q.includes("nho hoa tri") ||
    q.includes("bài ca hóa trị") ||
    q.includes("bai ca hoa tri") ||
    q.includes("bài thơ hóa trị") ||
    q.includes("bai tho hoa tri") ||
    q.includes("bảng hóa trị") ||
    q.includes("bang hoa tri")
  ) {
    return normalizeChemistryText(`Chào các em học sinh thân yêu của cô tại trường THCS Lý Tự Trọng!

Cô rất vui khi nhận được câu hỏi này. Hóa trị là "chìa khóa vàng" đầu tiên để các em mở cánh cửa vào thế giới Hóa học lớp 8 và 9 (SGK Kết nối tri thức). Đừng quá lo lắng, cô sẽ bật mí cho các em những "bí kíp" giúp ghi nhớ hóa trị một cách nhẹ nhàng và hiệu quả nhất nhé:

### 1. Học qua bài thơ hóa trị (Cách truyền thống nhưng cực kỳ hiệu quả)
Bài thơ hóa trị là "người bạn thân" của bao thế hệ học sinh. Nhịp điệu vần vè của bài thơ sẽ giúp các em nhớ hóa trị của các nguyên tố thường gặp một cách vô thức:

*Đoạn thơ hóa trị kinh điển dễ thuộc nhất:*
\`\`\`text
Kali (K), Natri (Na), Hydro (H), Bạc (Ag) cùng với Clo (Cl),
Một loài HÓA TRỊ I chẳng sai chút nào.
Magie (Mg), Kẽm (Zn) với Thủy ngân (Hg),
Oxy (O), Đồng (Cu), Thiếc (Sn) thêm phần Bari (Ba),
Cuối cùng thêm chú Canxi (Ca),
HÓA TRỊ II đó nhớ ghi cho tường!
Nhôm (Al) HÓA TRỊ III chớ quên,
Carbon (C), Silic (Si) tính bền IV thôi.
\`\`\`

### 2. Gom nhóm các nguyên tố theo hóa trị (Phương pháp tư duy logic)
Thay vì học thuộc lòng từng nguyên tố rời rạc, các em hãy gom chúng theo các nhóm hóa trị cố định:
- **Nhóm Hóa trị I:** H, Li, Na, K, Ag, Cl (trong muối clorua), F.
  *(Mẹo nhớ câu vui: "Học Lớp Nào Không Ai Cho Phép" ── H, Li, Na, K, Ag, Cl, F).*
- **Nhóm Hóa trị II:** O, Mg, Ca, Ba, Zn, Cu, Pb (chì).
  *(Mẹo nhớ câu vui: "Bé Mang Cây Súng Bắn Phá Cuộc Xâm Lược" ── Be, Mg, Ca, Sr, Ba, Pb, Cu, Zn).*
- **Nhóm Hóa trị III:** Al (Nhôm), Fe (Sắt khi mang hóa trị III).
  *(Mẹo nhớ: "Anh Sắt Ba" ── Al, Fe III).*
- **Nhóm nhiều hóa trị (Cần lưu ý đặc biệt):**
  + **Sắt (Fe):** Thường có hóa trị **II** (FeCl₂, FeO) và hóa trị **III** (FeCl₃, Fe₂O₃).
  + **Đồng (Cu):** Thường gặp hóa trị **II** (CuSO₄, CuO).
  + **Carbon (C):** Hóa trị **II** (CO) và **IV** (CO₂).
  + **Lưu huỳnh (S):** Hóa trị **II** (H₂S), **IV** (SO₂) và **VI** (SO₃, H₂SO₄).
  + **Nitơ (N):** Hóa trị I, II, III, IV, V (thường gặp II, IV trong khí NO, NO₂).

### 3. Hóa trị của các nhóm nguyên tử (Bắt buộc phải thuộc để viết CTHH)
Khi viết công thức axit, bazơ và muối, các em xem cả nhóm nguyên tử như một "nguyên tố lớn":
- **Nhóm Hóa trị I:** **-OH** (hiđroxit), **-NO₃** (nitrat), **-Cl** (clorua).
- **Nhóm Hóa trị II:** **=SO₄** (sunfat), **=CO₃** (cacbonat), **=SO₃** (sunfit).
- **Nhóm Hóa trị III:** **≡PO₄** (photphat).
*(Mẹo nhớ: "Nhóm Một có OH, NO₃; Nhóm Hai SO₄, CO₃ rõ ràng; Nhóm Ba duy nhất PO₄ nàng").*

### 4. Quy tắc hóa trị & Cách lập CTHH trong 5 giây
Trong hợp chất hai nguyên tố hoặc nguyên tố với nhóm nguyên tử: **AₓBᵧ** (với a là hóa trị của A, b là hóa trị của B):
$$\\text{Quy tắc:} \\quad x \\times a = y \\times b \\implies \\frac{x}{y} = \\frac{b}{a}$$
*(Em chỉ cần nghịch đảo tỉ số hóa trị rồi rút gọn về phân số tối giản là ra ngay chỉ số x, y!)*

*Ví dụ mẫu:* Lập CTHH tạo bởi Nhôm (Al hóa trị III) và Oxygen (O hóa trị II):
- Ta có tỉ lệ: $x/y = II/III = 2/3$.
- Vậy $x = 2$, $y = 3$ ──> Công thức hóa học là **Al₂O₃**.

### 5. Thử thách thực hành nhỏ cho em
Vận dụng các bí kíp trên, em hãy lập nhanh CTHH của:
1. Sắt (III) kết hợp với nhóm Sunfat (SO₄ hóa trị II).
2. Canxi (II) kết hợp với nhóm Photphat (PO₄ hóa trị III).
Hãy nhắn cho cô công thức em tìm được để cô kiểm tra xem em đã thành thạo chưa nhé!`);
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

  if (
    q.includes("sản xuất muối") ||
    q.includes("san xuat muoi") ||
    q.includes("làm muối") ||
    q.includes("lam muoi") ||
    q.includes("người ta sản xuất muối") ||
    q.includes("nguoi ta san xuat muoi") ||
    (q.includes("muối") && (q.includes("ruộng") || q.includes("bay hơi") || q.includes("kết tinh") || q.includes("tạo ra") || q.includes("như thế nào")))
  ) {
    return normalizeChemistryText(`Chào em, cô rất vui khi thấy em quan tâm đến những hiện tượng khoa học ngay trong đời sống hàng ngày! Câu hỏi của em về **"cách sản xuất muối"** rất thú vị, đặc biệt khi chúng ta liên hệ với những vùng làm muối nổi tiếng ở nước ta như Cà Ná (Ninh Thuận) hay Bạc Liêu:

### 1. Hiện tượng & Câu trả lời cốt lõi
Muối ăn (thành phần chính là **sodium chloride - NaCl**) mà chúng ta sử dụng hàng ngày chủ yếu được sản xuất từ nước biển thông qua phương pháp **kết tinh bằng cách làm bay hơi nước**.

Quy trình cơ bản là: Dẫn nước biển vào các ruộng muối (ô nề), dưới tác động của ánh nắng mặt trời và gió, nước sẽ bay hơi dần. Khi nồng độ muối trong nước biển đạt đến mức bão hòa, muối sẽ bắt đầu kết tinh thành các tinh thể rắn màu trắng trên mặt ruộng để diêm dân thu hoạch.

### 2. Quy trình 4 bước sản xuất muối truyền thống từ nước biển
1. **Lấy nước biển vào ruộng chứa (Ruộng phơi nước):** Dẫn nước biển triều cường vào các mương dẫn rồi vào các ô phơi thô để lắng bớt bùn cát và tạp chất lơ lửng.
2. **Cô đặc nước muối (Tăng độ mặn):** Nước biển được chuyển dần qua các ô phơi nông hơn (ô chịu, ô xắp). Ánh nắng mặt trời gay gắt và gió biển làm phân tử nước (**H₂O**) bay hơi liên tục, làm nồng độ muối tăng từ khoảng 3,5% lên 20–25% (nước chạt).
3. **Kết tinh muối (Ô kết tinh):** Khi nước chạt đạt độ bão hòa (khoảng 25–28 độ Bé), nước được tháo vào ô kết tinh có nền đất nện chặt hoặc lót bạt HDPE sạch. Tại đây, tinh thể **NaCl** bắt đầu lắng đọng và kết tinh thành những hạt muối trắng tinh.
4. **Thu hoạch & Tinh chế:** Diêm dân dùng bừa cào muối thành từng đống hình chóp để ráo nước chạt (chứa các muối magie, canxi đắng), sau đó vận chuyển về kho và đưa vào nhà máy tinh chế, bổ sung vi chất **Iodine (I-ốt)** chống bệnh bướu cổ trước khi đóng gói thành phẩm.

### 3. Bản chất hoá học & SGK KNTT (Lớp 8 & 9)
- **Phương pháp tách chất:** Sản xuất muối là ví dụ tiêu biểu nhất của phương pháp **cô cạn và kết tinh** dựa trên độ tan và sự bay hơi của dung môi (nước).
- **Phân tách phân đoạn:** Ở nồng độ thấp, thạch cao (CaSO₄) kết tinh trước; tiếp đến là muối ăn (NaCl) kết tinh ở độ mặn lý tưởng; cuối cùng các muối có vị đắng như MgCl₂, MgSO₄ còn lại trong nước ót được loại bỏ để hạt muối có vị mặn thanh khiết.
- **Vai trò công nghiệp:** Muối ăn NaCl là nguyên liệu đầu vào để sản xuất xút (NaOH), khí clo (Cl₂), nước Javel tẩy rửa và axit clohiđric (HCl).

### 4. Thử thách nhỏ cho em
Vì sao các cánh đồng muối lớn nhất Việt Nam lại tập trung ở Duyên hải Nam Trung Bộ (Ninh Thuận, Bình Thuận) mà không nằm ở miền Bắc? Yếu tố thời tiết nào quyết định năng suất làm muối của diêm dân?`);
  }

  if (q.includes("nước biển") || (q.includes("biển") && q.includes("mặn")) || q.includes("muối biển") || q.includes("đại dương")) {
    return normalizeChemistryText(`Chào em! Câu hỏi "Tại sao nước biển lại mặn?" là một câu hỏi khoa học kinh điển rất hay và gắn liền với chu trình tự nhiên của Trái Đất qua hàng tỷ năm:

### 1. Hiện tượng & Câu trả lời cốt lõi
Nước biển mặn là do sự hòa tan và tích tụ của **các loại muối khoáng**, chủ yếu là **muối ăn (sodium chloride - NaCl)** chiếm hơn 85% tổng lượng muối tan, cùng với các ion khoáng chất khác được nước mưa và sông ngòi bào mòn từ đất đá trên lục địa đổ dồn về đại dương suốt hơn 4 tỷ năm qua.

### 2. Bản chất hoá học & Chu trình tuần hoàn
Quá trình tạo nên độ mặn của biển diễn ra theo chu trình hoá học tự nhiên khép kín:
- **Nước mưa có tính axit nhẹ:** Trong không khí có khí carbon dioxide (CO₂), khí này hoà tan vào nước mưa tạo thành một lượng axit carbonic (H₂CO₃) rất yếu:
  \`CO₂ + H₂O ⇌ H₂CO₃\`
- **Sự phong hoá đất đá:** Khi nước mưa rơi xuống núi non đất đá, axit nhẹ này phản ứng và bào mòn khoáng chất, giải phóng các ion kim loại và phi kim:
  + Các ion dương: Na⁺ (sodium), Mg²⁺ (magnesium), Ca²⁺ (calcium), K⁺ (potassium).
  + Các ion âm: Cl⁻ (chloride), SO₄²⁻ (sulfate), HCO₃⁻ (bicarbonate).
- **Hành trình ra biển:** Nước mưa gom thành suối, chảy ra các dòng sông và cuốn theo các ion này đổ về biển cả.
- **Sự tích tụ muối:** Nước biển dưới ánh nắng mặt trời liên tục bốc hơi (chỉ có phân tử **H₂O** bay lên mây), còn toàn bộ các ion muối khoáng không thể bay hơi mà đọng lại ở đại dương. Qua hàng tỷ năm, nồng độ muối ngày càng đậm đặc (trung bình khoảng 35 g muối / 1 lít nước biển, tức độ mặn 3,5%).

### 3. Ứng dụng thực tế đời sống
- **Nghề làm muối (Diêm dân):** Tận dụng quá trình bốc hơi tự nhiên của nước biển dưới nắng gió để kết tinh muối ăn NaCl tinh khiết phục vụ ăn uống và công nghiệp hoá chất.
- **Tại sao nước sông không mặn?** Nước sông cũng chứa các ion khoáng nhưng nồng độ cực nhỏ (dưới 0,05%) vì nước sông luôn luân chuyển liên tục, không bị tích tụ bốc hơi đậm đặc như đại dương.

### 4. Thử thách nhỏ cho em
Nếu em đun sôi một cốc nước biển cho đến khi cạn kiệt đáy nồi, em sẽ thu được chất gì? Hãy thử viết kí hiệu hoá học của chất đó nhé!`);
  }

  if (q.includes("lá cây") && (q.includes("xanh") || q.includes("màu"))) {
    return normalizeChemistryText(`Chào em! Câu hỏi về màu xanh của lá cây liên quan đến sắc tố sinh hoá diệu kỳ nhất của sự sống trên Trái Đất:

### 1. Hiện tượng & Câu trả lời cốt lõi
Lá cây có màu xanh lục vì trong lục lạp của tế bào lá chứa một lượng lớn sắc tố hữu cơ tên là **diệp lục (chlorophyll)**. Phân tử diệp lục hấp thụ mạnh ánh sáng đỏ và ánh sáng xanh lam từ Mặt Trời để quang hợp, nhưng **không hấp thụ và phản xạ lại ánh sáng xanh lục** đến mắt người quan sát.

### 2. Bản chất hoá học
- Cấu tạo phân tử diệp lục (Chlorophyll a: C₅₅H₇₂O₅N₄Mg) có một ion trung tâm là **magnesium (Mg²⁺)** nằm giữa vòng porphyrin.
- Diệp lục đóng vai trò xúc tác quang hoá cho phản ứng quang hợp vĩ đại:
  \`6CO₂ + 6H₂O —(ánh sáng, diệp lục)→ C₆H₁₂O₆ (glucose) + 6O₂↑\`
- Cung cấp oxygen duy trì sự sống cho toàn bộ sinh vật và tích luỹ sinh khối tinh bột.

### 3. Điều thú vị trong đời sống
- Vào mùa thu, khi nhiệt độ giảm và ít ánh sáng, cây ngừng sản xuất diệp lục và phân huỷ nó. Lúc này các sắc tố phụ khác như **carotenoid** (màu vàng cam) và **anthocyanin** (màu đỏ tím) lộ ra, làm cho lá chuyển sang màu vàng đỏ rực rỡ!`);
  }

  if (q.includes("nước ngọt") || q.includes("có gas") || q.includes("sủi bọt") || q.includes("nước có ga")) {
    return normalizeChemistryText(`Chào em! Hiện tượng sủi bọt khi mở nắp lon nước ngọt có gas là kiến thức cực kỳ thú vị về độ tan của chất khí:

### 1. Hiện tượng & Câu trả lời cốt lõi
Khi em bật nắp lon nước ngọt, lập tức nghe tiếng "xì" và hàng ngàn bọt khí sủi tăm li ti trào lên. Đó là khí **carbon dioxide (CO₂)** đang thoát ra khỏi dung dịch lỏng.

### 2. Bản chất hoá học đằng sau
- Ở nhà máy sản xuất, người ta dùng áp suất rất cao (khoảng 3–4 atm) để ép khí CO₂ hoà tan vào nước ngọt có hương liệu và đường:
  \`CO₂ (khí) + H₂O ⇌ H₂CO₃ (axit carbonic yếu)\`
- Khi đóng kín lon, trạng thái cân bằng hoá học được duy trì.
- Khi em bật nắp, áp suất trong lon giảm đột ngột về áp suất khí quyển (1 atm). Theo **định luật Henry**, độ tan của chất khí tỉ lệ thuận với áp suất. Áp suất giảm khiến CO₂ không thể tan tiếp được nữa và nhanh chóng tách ra khỏi nước tạo thành vô số bọt khí bay lên!

### 3. Mẹo hoá học ứng dụng
- **Uống nước ngọt lạnh ngon và nhiều gas hơn:** Vì độ tan của khí CO₂ trong nước tăng lên khi nhiệt độ hạ thấp (ngược lại với chất rắn). Nước ngọt để ấm sẽ nhanh chóng mất hết gas và có vị ngọt gắt.`);
  }

  if (q.includes("pháo hoa") || (q.includes("màu") && q.includes("cháy"))) {
    return normalizeChemistryText(`Chào em! Màu sắc lung linh rực rỡ của pháo hoa trong đêm giao thừa chính là ứng dụng đỉnh cao của **quang phổ phát xạ ion kim loại**:

### 1. Hiện tượng & Câu trả lời cốt lõi
Mỗi màu sắc của pháo hoa được tạo ra từ việc đốt cháy các hợp chất muối của các kim loại khác nhau. Khi bị đốt nóng ở nhiệt độ hàng ngàn độ C, các electron của ion kim loại hấp thụ năng lượng rồi nhảy về trạng thái năng lượng thấp hơn và phát ra ánh sáng có bước sóng đặc trưng.

### 2. Bản đồ màu sắc hoá học
- **Màu vàng rực:** Hợp chất của Sodium (Na), ví dụ NaNO₃, NaCl.
- **Màu đỏ tươi:** Hợp chất của Strontium (Sr) hoặc Lithium (Li), ví dụ Sr(NO₃)₂.
- **Màu xanh lá cây (lục):** Hợp chất của Barium (Ba), ví dụ Ba(NO₃)₂, BaCl₂.
- **Màu xanh lam (dương):** Hợp chất của Đồng (Cu), ví dụ CuCl₂, CuSO₄ (đây là màu khó chế tạo nhất vì CuCl dễ bị phân huỷ ở nhiệt độ quá cao).
- **Màu tím:** Pha trộn giữa hợp chất Strontium (đỏ) và Đồng (xanh lam).
- **Ánh sáng trắng bạc lấp lánh:** Bột kim loại Magie (Mg), Nhôm (Al) hoặc Titan (Ti) cháy toả nhiệt cực lớn.`);
  }

  if (q.includes("vôi") || q.includes("nước vôi") || q.includes("đục")) {
    return normalizeChemistryText(`Chào em! Hiện tượng nước vôi trong bị hoá đục là thí nghiệm đặc trưng nhận biết khí CO₂ trong môn KHTN / Hoá học:

### 1. Hiện tượng & Bản chất hoá học
- Dung dịch nước vôi trong là **calcium hydroxide [Ca(OH)₂]**.
- Khi em thổi hơi thở (chứa nhiều khí CO₂) hoặc sục khí CO₂ vào nước vôi trong, dung dịch dần dần xuất hiện vẩn đục màu trắng sữa như nước vo gạo.
- Phương trình hoá học:
  \`Ca(OH)₂ + CO₂ → CaCO₃↓ (trắng) + H₂O\`
- Chất kết tủa màu trắng không tan chính là **canxi cacbonat (CaCO₃)** — thành phần chính của đá vôi và vỏ trứng.

### 2. Ứng dụng nông nghiệp tại Tây Ninh
- Nông dân thường rải vôi bột (CaO / Ca(OH)₂) lên đất trồng cao su, mãng cầu để **khử chua (trung hoà axit trong đất)** và tiêu diệt nấm bệnh có hại.`);
  }

  if (q.includes("cặn") || q.includes("ấm đun") || q.includes("tẩy cặn")) {
    return normalizeChemistryText(`Chào em! Hiện tượng ấm đun nước bị bám một lớp cặn cứng màu trắng ngà dưới đáy sau một thời gian sử dụng là do **nước cứng**:

### 1. Hiện tượng & Bản chất hoá học
- Nước sinh hoạt tự nhiên thường hoà tan các muối khoáng như calcium hydrogencarbonate **Ca(HCO₃)₂** và **Mg(HCO₃)₂**.
- Khi đun sôi nước, các muối này bị nhiệt phân tạo thành kết tủa canxi cacbonat bám chặt vào đáy ấm:
  \`Ca(HCO₃)₂ ──(t°)──> CaCO₃↓ + CO₂↑ + H₂O\`

### 2. Mẹo hoá học tẩy cặn ấm siêu tốc bằng gian bếp
- Canxi cacbonat (CaCO₃) là muối không tan trong nước nhưng **rất dễ tan trong axit yếu** như axit axetic (trong giấm ăn) hoặc axit citric (trong nước cốt chanh):
  \`CaCO₃ + 2CH₃COOH → (CH₃COO)₂Ca + CO₂↑ + H₂O\`
- **Cách làm:** Đổ nửa bát giấm ăn hoặc vắt 2 quả chanh vào ấm, thêm chút nước rồi đun sôi lăn tăn 5 phút. Lớp cặn cứng sẽ sủi bọt khí CO₂ và tan biến hoàn toàn, trả lại lòng ấm sáng bóng như mới!`);
  }

  if (q.includes("đá nổi") || (q.includes("nước đá") && q.includes("nổi"))) {
    return normalizeChemistryText(`Chào em! Hiện tượng nước đá (băng) nổi trên mặt nước lỏng là một đặc tính vật lí - hoá học kỳ lạ và vô cùng đặc biệt của phân tử nước (**H₂O**):

### 1. Hiện tượng & Câu trả lời cốt lõi
Hầu hết các chất trong tự nhiên khi chuyển từ thể lỏng sang thể rắn đều co lại và trở nên nặng hơn. Nhưng **nước lại nở ra khi đóng băng**, khiến khối lượng riêng của nước đá (**0,917 g/cm³**) nhỏ hơn khối lượng riêng của nước lỏng ở 4 °C (**1,000 g/cm³**). Vì nhẹ hơn nên nước đá luôn **nổi trên mặt nước**.

### 2. Bản chất cấu trúc phân tử
- Ở thể lỏng, các phân tử H₂O chuyển động tự do và trượt sát lên nhau.
- Khi nhiệt độ hạ xuống dưới 0 °C, các liên kết hydro định hướng tạo thành một **mạng tinh thể lục giác rỗng xốp** chứa nhiều khoảng trống bên trong. Chính cấu trúc rỗng này làm thể tích tăng lên khoảng 9%, khiến mật độ giảm xuống.

### 3. Ý nghĩa sinh tồn vĩ đại của Trái Đất
Nếu nước đá chìm xuống đáy như các chất khác, toàn bộ đáy biển và sông ngòi ở vùng hàn đới sẽ đóng băng từ đáy lên trên, tiêu diệt toàn bộ sinh vật biển. Nhờ nước đá nổi lên trên tạo thành lớp màng cách nhiệt giữ ấm cho tầng nước bên dưới, cá và các loài thuỷ sinh vẫn bơi lội và sống sót an toàn qua mùa đông lạnh giá!`);
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

  if (
    q.includes("dẫn điện") ||
    q.includes("dan dien") ||
    (q.includes("kim loại") && q.includes("nước")) ||
    (q.includes("kim loai") && q.includes("nuoc")) ||
    q.includes("chất dẫn điện") ||
    q.includes("chat dan dien") ||
    q.includes("cách điện")
  ) {
    return normalizeChemistryText(`Chào em! Cô Huỳnh Thị Thuỳ Dương rất khen ngợi câu hỏi mang tính bản chất vật chất và tư duy thực nghiệm của em. Cô giải đáp thắc mắc khoa học này như sau:

### 1. Hiện tượng & Câu trả lời cốt lõi
**Kim loại dẫn điện tốt hơn nước rất nhiều.**
Trong thực tế, **nước tinh khiết (nước cất)** gần như không dẫn điện (được coi là chất cách điện). Chỉ có nước có hoà tan muối khoáng hoặc axit/bazơ mới dẫn điện được, nhưng khả năng dẫn điện của dung dịch này vẫn thua xa kim loại hàng triệu lần!

### 2. Bản chất khoa học đằng sau
Dòng điện là dòng chuyển dời có hướng của các hạt mang điện tích. Sở dĩ kim loại dẫn điện vượt trội là vì:
- **Trong kim loại (đồng Cu, nhôm Al, sắt Fe, bạc Ag...):** Các nguyên tử kim loại nhường electron hoá trị để tạo thành một "biển electron tự do" di chuyển cực kỳ linh động khắp mạng tinh thể. Khi đặt vào hiệu điện thế, hàng tỷ electron này lập tức chuyển động có hướng với tốc độ cực nhanh, tạo thành dòng điện mạnh.
- **Trong nước nguyên chất (H₂O):** Nước được cấu tạo từ các phân tử trung hoà điện H₂O liên kết cộng hoá trị. Sự tự ion hoá của nước thành H⁺ và OH⁻ là vô cùng nhỏ (chỉ khoảng 10⁻⁷ mol/L), nên hầu như không có hạt mang điện tự do để dẫn điện.
- **Nước sinh hoạt và nước muối:** Nước máy hay nước sông có dẫn điện là do có hoà tan các khoáng chất (chất điện li như NaCl, Ca²⁺, Mg²⁺, Cl⁻...). Tuy nhiên, các ion này có kích thước và khối lượng lớn gấp hàng nghìn lần electron, lại bị các phân tử nước cản trở nên di chuyển chậm chạp hơn rất nhiều so với electron trong kim loại.

### 3. Ứng dụng thực tế đời sống thú vị
- **Hệ thống dây điện:** Lõi dây dẫn điện trong nhà và trường THCS Lý Tự Trọng luôn được làm bằng đồng đỏ (Cu) hoặc nhôm (Al) vì kim loại dẫn điện ưu việt; còn vỏ bọc ngoài làm bằng nhựa cách điện.
- **Quy tắc an toàn điện:** Nước sinh hoạt và mồ hôi trên tay chúng ta có lẫn muối khoáng nên dẫn điện được. Tuyệt đối KHÔNG chạm tay ướt vào công tắc, phích cắm điện vì nước sẽ làm giảm điện trở của da và truyền dòng điện nguy hiểm vào cơ thể!

### 4. Thử thách nhỏ dành cho em
Cô đố em: Theo em, giữa nước cất nguyên chất và nước chanh pha muối, nước nào sẽ làm bóng đèn trong mạch điện sáng rõ hơn? Vì sao nhỉ?`);
  }

  if (q.includes("dẫn nhiệt") || q.includes("dan nhiet")) {
    return normalizeChemistryText(`Chào em! Cô giải đáp câu hỏi về khả năng dẫn nhiệt của các chất:

### 1. Hiện tượng & Câu trả lời cốt lõi
**Kim loại là những chất dẫn nhiệt tốt nhất.** Chất lỏng (như nước) và chất khí dẫn nhiệt kém hơn kim loại rất nhiều lần.

### 2. Bản chất khoa học
- Trong kim loại, nhiệt lượng được truyền đi nhanh chóng nhờ sự va chạm của các electron tự do và dao động nhiệt của các ion dương ở nút mạng tinh thể.
- Trong nước và chất lỏng, các phân tử cách xa nhau hơn và không có electron tự do mang nhiệt, nhiệt chủ yếu truyền bằng hình thức đối lưu (dòng chất lỏng nóng nổi lên, chất lỏng lạnh chìm xuống) thay vì dẫn nhiệt trực tiếp.

### 3. Ứng dụng thực tế
- Đáy xoong, nồi, chảo làm bằng inox, nhôm hoặc gang để bắt nhiệt nhanh làm chín thức ăn.
- Quai nồi, tay cầm chảo thường bọc gỗ hoặc nhựa chịu nhiệt (vật liệu dẫn nhiệt kém) để chúng ta cầm không bị bỏng tay.`);
  }

  if (q.includes("thể tích mol") || q.includes("the tich mol") || q.includes("24,79") || q.includes("22,4") || q.includes("đkc")) {
    return normalizeChemistryText(`Chào em! Cô Dương lưu ý em điểm mới CỰC KỲ QUAN TRỌNG trong chương trình KHTN mới (bộ sách Kết nối tri thức - GDPT 2018):

### 1. Quy chuẩn chuẩn mực
- **Ở điều kiện chuẩn (đkc):** Nhiệt độ 25 °C (tương đương 298 K) và áp suất 1 bar:
  **Thể tích của 1 mol chất khí bất kì là 24,79 L.**
- Công thức tính: \`V = n × 24,79\` (với n là số mol chất khí).
- **Lưu ý đặc biệt:** Tuyệt đối không dùng con số cũ **22,4 L** nữa nhé! (22,4 L là ở 0 °C, 1 atm của chương trình cũ).

### 2. Ý nghĩa khoa học (Định luật Avogadro)
Ở cùng điều kiện nhiệt độ và áp suất, các thể tích bằng nhau của bất kỳ chất khí nào (O₂, H₂, CO₂, N₂...) đều chứa cùng số lượng phân tử.`);
  }

  if (
    (q.includes("sắt") || q.includes("fe")) &&
    (q.includes("hcl") || q.includes("fecl2") || q.includes("fecl3") || q.includes("axit clohidric") || q.includes("axit clohiđric"))
  ) {
    return normalizeChemistryText(`Chào em! Đây là câu hỏi rất kinh điển và hay gặp trong các bài kiểm tra Hoá học THCS KNTT Lớp 8 & 9. Cô Dương giải thích rõ bản chất cho em nhé:

### 1. Hiện tượng & Câu trả lời cốt lõi
Khi cho sắt (Fe) tác dụng với dung dịch axit clohiđric (HCl), phản ứng **chỉ tạo ra muối Sắt(II) clorua (FeCl₂) và giải phóng khí Hydrogen (H₂)**, tuyệt đối **không sinh ra FeCl₃**.
Phương trình hoá học:
**Fe + 2HCl → FeCl₂ + H₂↑**

### 2. Bản chất khoa học
- Axit HCl (và H₂SO₄ loãng) là những chất oxi hoá có tính oxi hoá trung bình (chính ion H⁺ thể hiện tính oxi hoá). Chúng chỉ có khả năng oxi hoá nguyên tử Fe lên mức oxi hoá +2 (muối Fe²⁺).
- Muốn tạo ra muối Sắt(III) clorua (FeCl₃), ta phải dùng chất oxi hoá rất mạnh như khí Clo (Cl₂) khô nung nóng:
  **2Fe + 3Cl₂ —(t°)→ 2FeCl₃**

### 3. Mẹo ghi nhớ của Cô Dương
- Sắt gặp **HCl, H₂SO₄ loãng**: Ra sắt **II** (Fe²⁺).
- Sắt gặp **khí Cl₂ nung nóng**: Ra sắt **III** (Fe³⁺).
- Sắt cháy trong **O₂ nung nóng**: Ra **Fe₃O₄** (oxit sắt từ, hỗn hợp FeO và Fe₂O₃).`);
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

  // Comprehensive Chemistry Knowledge Synthesizer for any other inquiries
  const cleanQ = question.replace(/^(cô ơi|cô có thể|thưa cô|cho em hỏi|giải thích giúp em|giúp em|em muốn hỏi)\s*/i, "").trim();

  return normalizeChemistryText(`Chào em! Cô Huỳnh Thị Thuỳ Dương rất vui khi nhận được câu hỏi khoa học của em:

### 1. Hiện tượng & Câu trả lời trọng tâm
Đối với thắc mắc: **"${cleanQ || question}"**:
Trong thế giới Khoa học tự nhiên và Hoá học (bộ sách Kết nối tri thức), hiện tượng này xuất phát từ bản chất cấu tạo của các chất và sự tương tác giữa các phân tử, ion hoặc năng lượng:
- **Cấu tạo vi mô:** Mọi vật chất đều được hình thành từ các nguyên tố hoá học xác định. Khi các chất tiếp xúc với nhau hoặc chịu tác động của nhiệt độ, ánh sáng hay áp suất, các liên kết hoá học hoặc liên kết vật lí sẽ biến đổi tương ứng.
- **Quy luật biến đổi:** Quá trình này tuân theo định luật bảo toàn khối lượng và năng lượng, kèm theo sự toả nhiệt hoặc thu nhiệt đặc trưng.

### 2. Bản chất hoá học & Nguyên lý khoa học
- **Nếu là hiện tượng vật lí:** Chất chỉ thay đổi trạng thái (rắn, lỏng, khí), hình dạng hoặc kích thước mà không sinh ra chất mới (ví dụ: nước đá tan, nước bay hơi, hoà tan đường vào nước).
- **Nếu là hiện tượng hoá học:** Có sự bẻ gãy liên kết cũ và hình thành liên kết mới, tạo ra chất mới với tính chất hoàn toàn khác biệt. Dấu hiệu nhận biết là:
  + Xuất hiện chất khí thoát ra (sủi bọt khí ↑).
  + Xuất hiện chất kết tủa không tan lắng xuống (↓).
  + Thay đổi màu sắc hoặc phát sáng, toả nhiệt mạnh.

### 3. Liên hệ thực tế & SGK Kết nối tri thức Lớp ${grade}
- Em hãy mở sách KHTN Lớp ${grade}, đối chiếu với bài học tương ứng về các nhóm chất (Nguyên tử - Phân tử, Kim loại, Phi kim, Axit - Bazơ - Muối) để xem các phương trình hoá học chuẩn mực.
- **Mẹo của Cô Dương:** Hãy thử liên hệ xem hiện tượng này có diễn ra trong gian bếp gia đình mình, trong nông nghiệp hay trong tự nhiên quê hương Tây Ninh không nhé!

### 4. Lời khuyên từ Cô Dương
Hãy ghi lại câu hỏi này vào **Nhật Ký Nhà Khoa Học** của CLB. Nếu em muốn tìm hiểu sâu hơn về phương trình hoá học hoặc cách làm thí nghiệm mô phỏng cụ thể, hãy tiếp tục gõ câu hỏi chi tiết cho cô nhé!`);
}
