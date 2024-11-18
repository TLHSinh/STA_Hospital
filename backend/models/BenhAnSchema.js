import mongoose from "mongoose";

const BenhAnSchema = new mongoose.Schema({
  benhNhan: { type: mongoose.Types.ObjectId, ref: "BenhNhan", required: true }, // Bệnh nhân
  bacSi: { type: mongoose.Types.ObjectId, ref: "BacSi", required: true }, // Bác sĩ
  chanDoan: { type: String, required: true }, // Chẩn đoán
  trieuChung: { type: String, required: true }, // Triệu chứng
  phuongPhapDieuTri: { type: String }, // Phương pháp điều trị
  ketQuaXetNghiem: [{ type: mongoose.Types.ObjectId, ref: "KetQuaXetNghiem" }], // Kết quả xét nghiệm
  tienSuBenhLy: { type: String }, // Tiền sử bệnh lý
  danhGiaDieuTri: { type: String }, // Đánh giá quá trình điều trị
  ngayKham: { type: Date, required: true, default: Date.now }, // Ngày khám
  donThuoc: [{ type: mongoose.Types.ObjectId, ref: "DonThuoc" }], // Đơn thuốc
  lichHen: [{ type: mongoose.Types.ObjectId, ref: "LichHen" }], // Lịch hẹn
  ngayTaiKham:{ type: Date }, // Ngày khám
  trangThai: { type: String, enum: ["dangDieuTri", "hoanThanh", "ycXetNghiem"], default: "dangDieuTri" }, // Trạng thái bệnh án
}, { timestamps: true });

export default mongoose.model("BenhAn", BenhAnSchema);
