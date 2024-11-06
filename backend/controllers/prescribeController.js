import BenhAn from '../models/BenhAnSchema.js';
import BenhNhan from '../models/BenhNhanSchema.js';
import BacSi from '../models/BacSiSchema.js';
import LichHen from '../models/LichHenSchema.js';
import KetQuaXetNghiem from '../models/KetQuaXetNghiemSchema.js';
import DonThuoc from '../models/DonThuocSchema.js';
import Thuoc from '../models/ThuocVatTuSchema.js';


// Hàm kê đơn thuốc
// Hàm kê đơn thuốc cho bệnh nhân

export const prescribeMedication = async (req, res) => {
    const { bacSiId, thuocList, loiKhuyen } = req.body;
    const  {id}  = req.params;
    const benhAnId=id
    try {
      // Kiểm tra nếu thuocList không phải là một mảng
      if (!Array.isArray(thuocList)) {
        return res.status(400).json({ success: false, message: 'Danh sách thuốc không hợp lệ' });
      }
  
      // Kiểm tra xem bệnh án có tồn tại không
      const benhAn = await BenhAn.findById(benhAnId);
      if (!benhAn) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy bệnh án' });
      }
  
      // Kiểm tra xem bác sĩ có tồn tại không
      const bacSi = await BacSi.findById(bacSiId);
      if (!bacSi) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy bác sĩ' });
      }
  
      // Tạo đơn thuốc mới
      const newDonThuoc = new DonThuoc({
        bacSi: bacSiId,
        benhNhan: benhAn.benhNhan,
        ngayDonThuoc: new Date(),
        thuoc: [],
        loiKhuyen,
      });
  
      console.log(newDonThuoc)
      // Thêm danh sách thuốc vào đơn thuốc
      for (const thuocItem of thuocList) {
        const { thuocId, lieuDung, soLanUong, ghiChu } = thuocItem;
        const thuoc = await Thuoc.findById(thuocId);
        if (!thuoc) {
          return res.status(404).json({ success: false, message: `Không tìm thấy thuốc với ID: ${thuocId}` });
        }
  
        newDonThuoc.thuoc.push({
          tenThuoc: thuocId,
          lieuDung,
          soLanUong,
          ghiChu,
        });
      }
  
      // Lưu đơn thuốc vào cơ sở dữ liệu
      await newDonThuoc.save();
  
      // Cập nhật bệnh án với đơn thuốc mới
      benhAn.donThuoc.push(newDonThuoc._id);
      await benhAn.save();
  
      res.status(201).json({ success: true, message: 'Kê đơn thuốc thành công', donThuoc: newDonThuoc });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Lỗi server' });
    }
  };