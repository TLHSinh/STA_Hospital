import mongoose from "mongoose";

const DonThuocSchema = new mongoose.Schema({
  bacSi: { type: mongoose.Types.ObjectId, ref: "BacSi", required: true }, // Bác sĩ
  benhNhan: { type: mongoose.Types.ObjectId, ref: "BenhNhan", required: true }, // Bệnh nhân
  ngayDonThuoc: { type: Date, required: true }, // Ngày kê đơn
  thuoc: [{
    tenThuoc: { type: mongoose.Types.ObjectId, ref: "VatTu", required: true }, // Thuốc
    tenVatTu: { type: String, required: true },
    lieuDung: { type: String, required: true }, // Liều dùng
    soLanUong: { type: String, required: true }, // Số lần uống
    ghiChu: { type: String }, // Ghi chú
  }],
  loiKhuyen: { type: String }, // Lời khuyên hoặc hướng dẫn
}, { timestamps: true });

export default mongoose.model("DonThuoc", DonThuocSchema);
