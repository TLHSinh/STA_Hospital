# STA Hospital

STA Hospital là ứng dụng web quản lý phòng khám/bệnh viện. Hệ thống cung cấp giao diện riêng cho bệnh nhân, bác sĩ và quản trị viên. Các chức năng chính gồm quản lý tài khoản, lịch làm việc, lịch hẹn, bệnh án, đơn thuốc, xét nghiệm, kho thuốc/vật tư, hóa đơn và thanh toán MoMo sandbox.

> **Lưu ý:** Đây là dự án học tập/đang phát triển. Phiên bản hiện tại chưa phù hợp để lưu dữ liệu y tế thật hoặc xử lý thanh toán thật. Xem phần [Giới hạn và cảnh báo](#giới-hạn-và-cảnh-báo) trước khi triển khai.

## Mục lục

- [Chức năng](#chức-năng)
- [Công nghệ](#công-nghệ)
- [Kiến trúc](#kiến-trúc)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Yêu cầu trước khi cài đặt](#yêu-cầu-trước-khi-cài-đặt)
- [Cài đặt từ đầu](#cài-đặt-từ-đầu)
- [Tạo dữ liệu thử](#tạo-dữ-liệu-thử)
- [Các lệnh thường dùng](#các-lệnh-thường-dùng)
- [API chính](#api-chính)
- [Xử lý lỗi thường gặp](#xử-lý-lỗi-thường-gặp)
- [Giới hạn và cảnh báo](#giới-hạn-và-cảnh-báo)

## Chức năng

### Bệnh nhân

- Đăng ký và đăng nhập.
- Xem danh sách, thông tin và lịch làm việc của bác sĩ.
- Đặt lịch khám theo khung giờ.
- Xem và hủy lịch hẹn.
- Xem hồ sơ cá nhân và bệnh án.

### Bác sĩ

- Xem lịch hẹn đã xác nhận.
- Tạo và cập nhật bệnh án.
- Kê đơn thuốc.
- Chỉ định và nhập kết quả xét nghiệm.
- Lập hóa đơn cho bệnh án.

### Quản trị viên

- Xem số liệu tổng quan.
- Quản lý bệnh nhân, bác sĩ và lịch hẹn.
- Quản lý thuốc, vật tư và lịch làm việc của bác sĩ.

## Công nghệ

| Phần | Công nghệ |
|---|---|
| Frontend | React 18, Create React App, React Router 6 |
| Giao diện | MUI, Bootstrap, Tailwind CSS, styled-components |
| Gọi API | Fetch API, Axios |
| Backend | Node.js, Express 4, ES modules |
| Database | MongoDB |
| ODM | Mongoose |
| Xác thực | JWT Bearer, bcryptjs |
| Lưu ảnh | Cloudinary |
| Thanh toán | MoMo sandbox |
| Tác vụ định kỳ | node-cron |

## Kiến trúc

```text
Trình duyệt
   │
   │ React SPA — http://localhost:3000
   │
   ├──────── Upload ảnh ────────> Cloudinary
   │
   ▼
Express REST API — http://localhost:5000/api/v1
   │
   ├── Routes
   ├── Authentication middleware
   ├── Controllers và business logic
   ├── MoMo sandbox
   └── node-cron
          │
          ▼
       Mongoose
          │
          ▼
        MongoDB
```

Backend hiện dùng kiến trúc route → controller → Mongoose model. Dự án chưa có service layer, repository layer hoặc request validation layer riêng.

## Cấu trúc thư mục

```text
STA_Hospital/
├── backend/
│   ├── auth/                 # JWT middleware và cron job
│   ├── controllers/          # Xử lý API và business logic
│   ├── models/               # Mongoose schemas
│   ├── routes/               # Express routes
│   ├── .env                  # Cấu hình cục bộ; không commit secret mới
│   ├── index.js              # Điểm khởi động backend
│   └── package.json
├── frontend/
│   ├── public/               # Ảnh và tài nguyên tĩnh
│   ├── src/
│   │   ├── Components/
│   │   ├── Dashboard/
│   │   ├── Layouts/
│   │   ├── Pages/
│   │   ├── Routers/
│   │   ├── context/          # AuthContext
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── config.js         # BASE_URL của backend
│   └── package.json
└── README.md
```

## Yêu cầu trước khi cài đặt

Cài các công cụ sau:

- [Node.js](https://nodejs.org/) 20 LTS hoặc phiên bản tương thích.
- npm 10 hoặc phiên bản đi kèm Node.js.
- MongoDB 6 trở lên, chạy local hoặc dùng MongoDB Atlas.
- Git.
- Kết nối Internet nếu cần upload ảnh lên Cloudinary hoặc thử MoMo sandbox.

Kiểm tra Node.js và npm:

```bash
node --version
npm --version
```

Project đã được kiểm tra với Node.js `v20.17.0` và npm `10.8.2`.

## Cài đặt từ đầu

### 1. Lấy source code

```bash
git clone <URL_REPOSITORY_CUA_BAN>
cd STA_Hospital
```

Nếu đã có source code, mở terminal tại thư mục chứa `backend` và `frontend`.

### 2. Chuẩn bị MongoDB

Bạn có thể dùng một trong hai cách:

#### Cách A — MongoDB chạy trên máy

Khởi động MongoDB và dùng connection string:

```text
mongodb://127.0.0.1:27017/sta_hospital
```

MongoDB sẽ tạo database khi ứng dụng ghi document đầu tiên.

#### Cách B — MongoDB Atlas

1. Tạo cluster trên MongoDB Atlas.
2. Tạo database user.
3. Cho phép IP của máy phát triển truy cập.
4. Sao chép connection string và thay username, password, database name.

Không đưa connection string thật vào commit, ảnh chụp màn hình hoặc log.

### 3. Cấu hình backend

Tạo hoặc cập nhật file `backend/.env`. Dùng giá trị mẫu sau và thay các placeholder:

```dotenv
PORT=5000
MONGO_URL=mongodb://127.0.0.1:27017/sta_hospital
JWT_SECRET_KEY=<CHUOI_NGAU_NHIEN_DAI_VA_BI_MAT>

# Stripe hiện chỉ xuất hiện trong phần code cũ đã comment.
STRIPE_SECRET_KEY=<STRIPE_TEST_SECRET_NEU_CAN>

CLIENT_SITE_URL=http://localhost:3000

# Chỉ dùng tài khoản và credential MoMo sandbox khi phát triển.
MOMO_ENDPOINT=https://test-payment.momo.vn/v2/gateway/api/create
MOMO_PARTNER_CODE=<MOMO_SANDBOX_PARTNER_CODE>
MOMO_ACCESS_KEY=<MOMO_SANDBOX_ACCESS_KEY>
MOMO_SECRET_KEY=<MOMO_SANDBOX_SECRET_KEY>
MOMO_REDIRECT_URL=http://localhost:3000/doctor/danhsachbenhan
MOMO_IPN_URL=https://<PUBLIC_BACKEND_HOST>/api/v1/payment/momo-ipn
```

Các điểm cần nhớ:

- Giữ `PORT=5000`. Frontend hiện gọi cố định `http://localhost:5000` trong `frontend/src/config.js`.
- `JWT_SECRET_KEY` nên là chuỗi ngẫu nhiên dài, không dùng ví dụ trong tài liệu.
- MoMo không gọi được IPN trên `localhost`. Muốn thử callback, backend cần một URL HTTPS công khai.
- Payment controller hiện còn cấu hình MoMo hardcode. Các biến MoMo trong `.env` chưa thay thế hoàn toàn giá trị trong source.

### 4. Cài và chạy backend

Mở terminal thứ nhất:

```bash
cd backend
npm install
npm run start-dev
```

Hoặc chạy không dùng nodemon:

```bash
npm start
```

Khi thành công, terminal sẽ hiển thị server chạy ở cổng `5000` và MongoDB đã kết nối.

Kiểm tra backend trong trình duyệt:

```text
http://localhost:5000/
```

Kết quả dự kiến:

```text
Api is test working
```

> Trang `/` chỉ xác nhận Express đang chạy. Nó chưa phải health check của MongoDB. Hãy kiểm tra log `mongoDB is conected` để biết database đã kết nối.

### 5. Cài và chạy frontend

Giữ backend đang chạy. Mở terminal thứ hai tại thư mục gốc:

```bash
cd frontend
npm install
npm start
```

React development server sẽ mở:

```text
http://localhost:3000
```

Trang mặc định chuyển tới:

```text
http://localhost:3000/customer/home
```

### 6. Dừng ứng dụng

Nhấn `Ctrl+C` trong từng terminal để dừng frontend và backend.

## Tạo dữ liệu thử

Repository hiện chưa có seed script hoặc admin bootstrap. Database mới sẽ không có bác sĩ, lịch làm việc, thuốc, xét nghiệm hoặc tài khoản admin.

### Tạo bệnh nhân thử bằng API

Frontend đăng ký hiện gửi giá trị giới tính không khớp schema. Trong lúc chờ sửa, có thể tạo tài khoản local bằng `curl`:

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"ten":"Nguyen Van A","email":"patient@example.com","matKhau":"ChangeMe123","gioiTinh":"Nam","role":"BenhNhan"}'
```

Nếu dùng PowerShell:

```powershell
$body = @{
  ten       = "Nguyen Van A"
  email     = "patient@example.com"
  matKhau   = "ChangeMe123"
  gioiTinh  = "Nam"
  role      = "BenhNhan"
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "http://localhost:5000/api/v1/auth/register" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

Sau đó đăng nhập tại:

```text
http://localhost:3000/login
```

Chỉ dùng password mẫu cho dữ liệu local. Không dùng lại password cá nhân.

### Tài khoản bác sĩ và admin

- Project chưa có quy trình seed an toàn cho admin.
- Public API hiện có thể tạo bác sĩ, nhưng đây là lỗ hổng đã được ghi nhận và không nên dùng làm quy trình production.
- Để thử đầy đủ các màn hình quản trị/bác sĩ, cần dataset mẫu có password đã hash bằng bcrypt. Không lưu password dạng plain text trong MongoDB.

## Các lệnh thường dùng

### Backend

Chạy development server và tự reload:

```bash
cd backend
npm run start-dev
```

Chạy server bình thường:

```bash
cd backend
npm start
```

Backend chưa có test suite. Lệnh sau hiện chủ động trả lỗi:

```bash
cd backend
npm test
```

### Frontend

Chạy development server:

```bash
cd frontend
npm start
```

Tạo production build:

```bash
cd frontend
npm run build
```

Chạy test:

```bash
cd frontend
npm test
```

Test frontend hiện chỉ là test mẫu của Create React App và cần được thay thế bằng test của dự án.

## API chính

Base URL local:

```text
http://localhost:5000/api/v1
```

| Nhóm | Prefix | Mục đích |
|---|---|---|
| Authentication | `/auth` | Đăng ký, đăng nhập |
| Bệnh nhân | `/users` | Hồ sơ và danh sách bệnh nhân |
| Bác sĩ | `/doctors` | Hồ sơ và lịch làm việc |
| Lịch hẹn | `/bookings` | Đặt, xem và cập nhật lịch hẹn |
| Bệnh án | `/medicalRecord` | Tạo, xem và cập nhật bệnh án |
| Đơn thuốc | `/prescribe` | Kê và xem đơn thuốc |
| Xét nghiệm | `/test` | Chỉ định và xem kết quả xét nghiệm |
| Kho | `/inventory` | Thuốc và vật tư |
| Thanh toán | `/payment` | Hóa đơn và MoMo |
| Thống kê | `/dashboard` | Số liệu dashboard |

Các request có xác thực dùng header:

```http
Authorization: Bearer <JWT_TOKEN>
```

Không xem việc frontend ẩn nút hoặc chặn route là cơ chế bảo mật. Backend phải kiểm tra quyền cho mọi API nhạy cảm.

## Upload ảnh

Frontend upload ảnh trực tiếp lên Cloudinary trong `frontend/src/utils/uploadCloudinary.js`.

Để dùng Cloudinary của riêng bạn:

1. Tạo Cloudinary account.
2. Tạo upload preset dành cho môi trường development.
3. Giới hạn định dạng, dung lượng, folder và loại tài nguyên.
4. Cập nhật `cloud_name` và `upload_preset` trong cấu hình frontend.

Preset hiện là unsigned preset phía client. Không dùng cấu hình không giới hạn trong production.

## Xử lý lỗi thường gặp

### Frontend báo `Failed to fetch` hoặc `Network Error`

Kiểm tra:

- Backend đang chạy ở `http://localhost:5000`.
- `PORT` trong `backend/.env` là `5000`.
- MongoDB đã khởi động.
- Không có ứng dụng khác chiếm cổng 5000.

### Backend chạy nhưng API database lỗi

Endpoint `/` vẫn có thể trả kết quả dù MongoDB kết nối thất bại. Kiểm tra:

- `MONGO_URL` đúng.
- MongoDB service đang chạy.
- MongoDB Atlas đã cho phép IP hiện tại.
- Username/password trong connection string đã URL-encode nếu chứa ký tự đặc biệt.

### Đăng ký từ giao diện trả lỗi 500

Schema nhận giới tính `Nam`, `Nữ`, `Khác`, nhưng một số form frontend đang gửi `nam`, `nu`, `khac`. Đây là lỗi contract hiện tại. Có thể dùng request mẫu trong phần [Tạo dữ liệu thử](#tạo-dữ-liệu-thử) để kiểm tra local.

### Không thêm được thuốc/vật tư

Backend nhận `loaiVatTu` là `Thuoc` hoặc `VatTu`. Form tạo mới hiện gửi giá trị có dấu nên có thể bị validation error.

### MoMo không callback về máy local

MoMo cần URL HTTPS công khai cho `MOMO_IPN_URL`. Ngoài ra, route IPN hiện còn lỗi thứ tự khai báo. Chỉ dùng sandbox và không coi trạng thái thanh toán hiện tại là bằng chứng đã nhận tiền.

### Trang bác sĩ hoặc admin bị trắng/crash

Một số route chưa được frontend bảo vệ và component đọc `user._id` trực tiếp. Hãy đăng nhập đúng role trước khi mở các URL này. Đây chỉ là cách tránh lỗi giao diện, không phải biện pháp bảo mật.

## Giới hạn và cảnh báo

Các vấn đề sau đã được xác nhận trong technical audit:

- Nhiều API bệnh án, lịch hẹn, đơn thuốc, xét nghiệm và payment chưa có authentication/authorization.
- User update có IDOR và mass assignment, có thể dẫn tới leo thang quyền.
- Public registration cho phép tạo bác sĩ.
- File môi trường và payment source từng chứa credential. Cần rotate secret trước khi triển khai.
- Backend hiện đánh dấu hóa đơn đã thanh toán ngay khi mới nhận URL thanh toán MoMo.
- MoMo IPN route hiện bị route tham số bắt trước và không hoạt động đúng.
- Booking có race condition và các workflow nhiều document chưa dùng transaction.
- Frontend và backend có một số enum, route và HTTP method không khớp.
- Dự án gần như chưa có automated tests.
- Dependency tree có các security advisory, gồm Mongoose ở mức Critical.
- Không có health check, Docker, CI/CD, monitoring hoặc production deployment config.

Trước khi dùng production, cần ưu tiên:

1. Rotate và quản lý lại toàn bộ secret.
2. Bảo vệ API bằng authentication, authorization và ownership checks.
3. Sửa payment state machine và MoMo IPN.
4. Thêm validation, transaction, unique constraint và idempotency.
5. Vá dependency có advisory.
6. Viết integration/security/E2E tests.
7. Thêm cấu hình production, health checks, logging và monitoring.

## Bảo mật repository

- Không commit `.env`, token, database URI hoặc payment key.
- Nếu secret từng được commit, thêm `.gitignore` không đủ; cần rotate secret và xử lý lịch sử Git.
- Không dùng dữ liệu bệnh nhân thật trong môi trường development.
- Chỉ dùng MoMo/Stripe test credentials khi phát triển.
- Không chia sẻ log chứa password, token hoặc payment signature.

## Trạng thái phát triển

Dự án hiện phù hợp để học tập, demo giao diện và tiếp tục hoàn thiện. Không dùng cho dữ liệu y tế hoặc giao dịch tài chính thật cho đến khi các finding Critical và High trong technical audit được xử lý và kiểm thử.
