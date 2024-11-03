import mongoose from "mongoose";

const DanhMucThuocSchema = new mongoose.Schema({
  tenDanhMuc: { type: String, required: true },   // Tên của danh mục (vd: "Kháng sinh", "Giảm đau")
  moTa: { type: String },                         // Mô tả về danh mục
  loaiDanhMuc: { type: String, enum: ["Nhóm tác dụng", "Loại bệnh"], required: true },  // Phân loại danh mục
  danhSachThuoc: [{ type: mongoose.Types.ObjectId, ref: "ThuocVatTu" }] // Danh sách thuốc thuộc danh mục
}, { timestamps: true });

export default mongoose.model("DanhMucThuoc", DanhMucThuocSchema);
