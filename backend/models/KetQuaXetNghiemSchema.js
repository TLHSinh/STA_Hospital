import mongoose from "mongoose";

const KetQuaXetNghiemSchema = new mongoose.Schema({
  ngayXetNghiem: { type: Date, required: true }, // Ngày xét nghiệm
  ketQua: { type: String, required: true }, // Kết quả
  ngayLayMau: { type: Date, required: true }, // Ngày lấy mẫu
  ngayTraKetQua: { type: Date, required: true }, // Ngày trả kết quả
  ghiChu: { type: String }, // Ghi chú
  benhAn: { type: mongoose.Types.ObjectId, ref: "BenhAn", /* required: true */ }, // Bệnh án liên quan
  xetNghiem: { type: mongoose.Types.ObjectId, ref: "XetNghiem", /* required: true */ }, // Loại Xét nghiệm 
}, { timestamps: true });

export default mongoose.model("KetQuaXetNghiem", KetQuaXetNghiemSchema);
