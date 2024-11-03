import mongoose from "mongoose";

const XetNghiemSchema = new mongoose.Schema({
  loaiXetNghiem: { type: String, required: true }, // Loại xét nghiệm
  giaXetNghiem: { type: Number, required: true }, // Giá xét nghiệm
}, { timestamps: true });


export const XetNghiem = mongoose.model("XetNghiem", XetNghiemSchema);
