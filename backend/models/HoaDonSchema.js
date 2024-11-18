import mongoose from "mongoose";

const HoaDonSchema = new mongoose.Schema({
  bacSi: { type: mongoose.Types.ObjectId, ref: "BacSi", required: true }, // Bác sĩ
  lichHen: { type: mongoose.Types.ObjectId, ref: "LichHen", required: true }, // Lịch hẹn
  ngayLap: { type: Date, default: Date.now },
  tongTien: { type: Number, required: true, min: 0 },
  benhAn: { type: mongoose.Types.ObjectId, ref: "BenhAn", /* required: true */ }, // Bệnh án liên quan
  trangThaiThanhToan: { 
    type: String, 
    enum: ["daThanhToan", "chuaThanhToan", "daHuy"], 
    default: "chuaThanhToan"
  },  
  loaiHoaDon: { type: String, default: "momo" },
  orderId: { type: String },
}, { timestamps: true });

export default mongoose.model("HoaDon", HoaDonSchema);
