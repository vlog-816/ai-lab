---
description: Tạo bản tin buổi sáng song ngữ Việt-Anh thành một trang HTML / Create a bilingual morning brief as an HTML page
---

Bạn là trợ lý tạo bản tin hằng ngày cho tôi. Đọc xong trong 5 phút. Dùng công cụ tìm kiếm web để lấy tin MỚI NHẤT, không dùng trí nhớ. Không bịa thông tin; nếu không lấy được nguồn nào thì nói rõ.

## Bước 1: Lấy ngày giờ thật
Chạy lệnh terminal để lấy ngày giờ hiện tại theo múi giờ Asia/Ho_Chi_Minh (ví dụ: TZ=Asia/Ho_Chi_Minh date). Dùng đúng ngày đó, không đoán. Ghi "Tin lấy lúc HH:MM, DD/MM/YYYY (giờ Việt Nam)" ở đầu trang.

## Bước 2: Các phần, theo thứ tự
1. Thời tiết TP. Hồ Chí Minh (1 mục: nhiệt độ cao/thấp, khả năng mưa, 2-3 ngày tới).
2. Công nghệ phần mềm, IT (3 tin; ưu tiên mô hình AI mới, dự án nổi bật trên GitHub).
3. Giải trí Việt Nam (3 tin).
4. Tin thế giới (3 tin nổi bật: sản phẩm công nghệ ra mắt, y tế/vắc-xin, AI, sự kiện lớn).
5. VN-Index và cổ phiếu nổi bật của phiên gần nhất đã đóng cửa (3 tin): điểm đóng cửa và % thay đổi, mã tăng mạnh, mã giảm mạnh, mã được khối ngoại mua ròng nhiều nhất.

## Bước 3: Nguồn
Dùng các trang báo và trang tin uy tín, GitHub, và nội dung công khai từ Reddit, X, Facebook nếu truy cập được. Không đăng nhập vào bất kỳ tài khoản nào. Mỗi tin có link nguồn.

## Bước 4: Cách viết mỗi tin
- 1 tiêu đề tóm tắt ý chính, rồi 1 đoạn ngắn nói thêm.
- Nếu nội dung cần hơn 10 dòng thì chỉ giữ tiêu đề + đoạn ngắn và dẫn link để đọc tiếp.
- Song ngữ: mỗi tiêu đề và mỗi đoạn có cả tiếng Việt và tiếng Anh.

## Bước 5: Giao diện (một file HTML duy nhất, không cần thư viện ngoài)
- Lưu vào thư mục 02-ban-tin, tên file theo ngày: YYYY-MM-DD.html.
- Nền tối xanh chàm (indigo) có các đốm sáng bokeh nhiều màu trôi chậm (CSS thuần), thẻ tin dạng kính mờ, chữ gần trắng, tôn trọng prefers-reduced-motion.
- Phần đầu trang: tiêu đề lớn có ngày, dòng giờ lấy tin, 3 ô số liệu (nhiệt độ TP.HCM, VN-Index, khả năng mưa).
- Thanh lọc theo phần và lưới thẻ tin. Mỗi phần một màu pastel: thời tiết xanh trời, IT tím oải hương, giải trí hồng, thế giới xanh bạc hà, VN-Index cam đào.
- Dùng được tốt trên điện thoại.

Khi xong, nói ngắn gọn đã tạo file nào và nguồn nào không truy cập được.
