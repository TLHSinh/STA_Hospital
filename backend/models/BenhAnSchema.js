import mongoose from "mongoose";

const BenhAnSchema = new mongoose.Schema({
  benhNhan: { type: mongoose.Types.ObjectId, ref: "BenhNhan", required: true }, // Bệnh nhân
  bacSi: { type: mongoose.Types.ObjectId, ref: "BacSi", required: true }, // Bác sĩ
  chanDoan: { type: String, required: true }, // Chẩn đoán
  phuongPhapDieuTri: { type: String }, // Phương pháp điều trị
  ngayKham: { type: Date, required: true }, // Ngày khám
  donThuoc: { type: mongoose.Types.ObjectId, ref: "DonThuoc" }, // Đơn thuốc
  lichHen: { type: mongoose.Types.ObjectId, ref: "LichHen" }, // Lịch hẹn
}, { timestamps: true });

export default mongoose.model("BenhAn", BenhAnSchema);
