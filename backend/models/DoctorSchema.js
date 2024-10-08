import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Email của bác sĩ
  password: { type: String, required: true }, // Mật khẩu của bác sĩ
  name: { type: String, required: true }, // Tên bác sĩ
  phone: { type: Number }, // Số điện thoại
  photo: { type: String }, // Hình ảnh bác sĩ
  ticketPrice: { type: Number }, // Giá khám
  role: { 
    type: String, 
    default: "doctor" // Vai trò mặc định là bác sĩ
  },
  specialization: { type: String }, // Chuyên khoa
  qualifications: { type: [Array] }, // Bằng cấp
  experiences: { type: [Array] }, // Kinh nghiệm
  bio: { type: String, maxLength: 50 }, // Thông tin ngắn về bác sĩ
  about: { type: String }, // Thông tin chi tiết về bác sĩ
  timeSlots: { type: [Array] }, // Thời gian khám

  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: { 
    type: String,
    enum: ["pending", "approved", "cancelled"], // Trạng thái phê duyệt
    default: "pending", // Mặc định là đang chờ phê duyệt
  },

  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("Doctor", DoctorSchema);