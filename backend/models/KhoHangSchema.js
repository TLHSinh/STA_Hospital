import mongoose from "mongoose";

const KhoHangSchema = new mongoose.Schema({
  tenKho: { type: String, required: true }, // Tên kho
  viTri: { type: String, required: true }, // Vị trí
  quanLy: { type: mongoose.Types.ObjectId, ref: "BenhNhan" }, // Quản lý kho
  vatTus: [{ type: mongoose.Types.ObjectId, ref: "VatTu" }], // Vật tư trong kho
}, { timestamps: true });

export default mongoose.model("KhoHang", KhoHangSchema);
