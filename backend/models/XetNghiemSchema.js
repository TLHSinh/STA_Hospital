import mongoose from "mongoose";

const XetNghiemSchema = new mongoose.Schema({
  loaiXetNghiem: { type: String, required: true }, // Loại xét nghiệm
  giaXetNghiem: { type: Number, required: true }, // Giá xét nghiệm
  moTaXetNghiem: { type: String, required: true }, // Mô tả xét nghiệm
}, { timestamps: true });


export default mongoose.model("XetNghiem", XetNghiemSchema);
