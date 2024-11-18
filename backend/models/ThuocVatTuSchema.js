import mongoose from "mongoose";

const ThuocVatTuSchema = new mongoose.Schema({
  tenVatTu: { type: String, required: true }, // Tên vật tư
  loaiVatTu: { type: String, enum: ["Thuốc", "Vật Tư"],  }, // Loại vật tư
  soLuong: { type: Number, }, // Số lượng
  ngayNhap: { type: Date,  }, // Ngày nhập
  khoHang: { type: mongoose.Types.ObjectId, ref: "KhoHang"}, // Kho hàng chứa
  moTa: { type: String }, // Mô tả
  donViTinh: { type: String }, // Đơn vị tính của vật tư
  gia: { type: Number }, // Giá
  ngaySanXuat: { type: Date }, // Ngày sản xuất
  hanSuDung: { type: Date }, // Hạn sử dụng
}, { timestamps: true });

export default mongoose.model("ThuocVatTu", ThuocVatTuSchema);
