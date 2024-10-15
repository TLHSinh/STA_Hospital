import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Email của bệnh nhân
  password: { type: String, required: true }, // Mật khẩu của bệnh nhân
  name: { type: String, required: true }, // Tên bệnh nhân
  phone: { type: Number }, // Số điện thoại
  photo: { type: String }, // Hình ảnh bệnh nhân
  role: { 
    type: String,
    enum: ["patient", "admin"], // Vai trò: bệnh nhân hoặc quản trị viên
    default: "patient" // Mặc định là bệnh nhân
  },
  gender: { type: String, enum: ["male", "female", "other"] }, // Giới tính
  bloodType: { type: String }, // Nhóm máu
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }], // Danh sách lịch hẹn
}, { timestamps: true });


export default mongoose.model("User", UserSchema);