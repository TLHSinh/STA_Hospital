import mongoose from "mongoose";

const BenhNhanSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Email bệnh nhân
  matKhau: { type: String, required: true }, // Mật khẩu
  ten: { type: String, required: true }, // Tên bệnh nhân
  soDienThoai: { type: Number }, // Số điện thoại
  hinhAnh: { type: String }, // Hình ảnh
  ngaySinh: { type: Date}, // Ngày sinh
  cccd: { type: String }, // Căn cước công dân
  diaChi: { type: String }, // Địa chỉ
  role: { 
          type: String, 
          enum: ["benhnhan", "admin"], 
          default: "benhnhan" },                // Vai trò
  gioiTinh: { 
          type: String, 
          enum: ["nam", "nu", "khac"], 
          required: true }, // Giới tính
  nhomMau: { type: String }, // Nhóm máu
  
  lichHen: [{ type: mongoose.Types.ObjectId, ref: "LichHen" }], // Lịch hẹn
}, { timestamps: true });

export default mongoose.model("BenhNhan", BenhNhanSchema);
