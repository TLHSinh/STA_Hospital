import mongoose from "mongoose";

const LichHenSchema = new mongoose.Schema({
  bacSi: { type: mongoose.Types.ObjectId, ref: "BacSi", required: true }, // Bác sĩ
  benhNhan: { type: mongoose.Types.ObjectId, ref: "BenhNhan", required: true }, // Bệnh nhân
  ngayHen: { type: Date, required: true }, // Ngày hẹn
  trangThai: { type: String, enum: ["choDuyet", "duocDuyet", "huy"], default: "choDuyet" }, // Trạng thái
  daThanhToan: { type: Boolean, default: false }, // Đã thanh toán
  gia: { type: Number, required: true }, // Giá
}, { timestamps: true });

export default mongoose.model("LichHen", LichHenSchema);
