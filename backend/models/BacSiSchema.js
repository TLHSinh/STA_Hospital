import mongoose from "mongoose";

const BacSiSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Email bác sĩ
  matKhau: { type: String, required: true }, // Mật khẩu
  ten: { type: String, required: true }, // Tên bác sĩ
  soDienThoai: { type: Number }, // Số điện thoại
  hinhAnh: { type: String }, // Hình ảnh
  gioiTinh: { 
                type: String, 
                enum: ["Nam", "Nữ", "Khác"], 
                required: true }, // Giới tính
  ngaySinh: { type: Date }, // Ngày sinh
  cccd: { type: String }, // Căn cước công dân
  diaChi: { type: String }, // Địa chỉ
  chuyenKhoa: { type: String }, // Chuyên khoa
  giaKham: { type: Number }, // Giá khám
  role: { 
            type: String, 
            default: "BacSi" // Vai trò mặc định là bác sĩ
  },
  bangCap: [{ bang: String, truong: String, nam: Number }], // Bằng cấp
  kinhNghiem: [{ viTri: String, benhVien: String, soNam: Number }], // Kinh nghiệm
  gioiThieuNgan: { type: String, maxLength: 100 }, // Giới thiệu ngắn
  gioiThieuChiTiet: { type: String }, // Giới thiệu chi tiết
  lichLamViec: [{ 
              ngay: Date, 
              batDau: String, 
              ketThuc: String, 
              soLuongDaDat: { type: Number, default: 0 } // Số lượng đã đặt
  }],// Lịch làm việc
  trangThai: { 
                type: String, 
                enum: ["choDuyet", "duocDuyet", "huy"], 
                default: "duocDuyet" }, // Trạng thái phê duyệt
  lichHen: [{ type: mongoose.Types.ObjectId, ref: "LichHen" }], // Lịch hẹn
}, { timestamps: true });


export default mongoose.model("BacSi", BacSiSchema);
