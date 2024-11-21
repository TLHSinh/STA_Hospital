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
  const { id } = req.params;
  const benhAnId = id;

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

    // Lấy thông tin tất cả các thuốc từ danh sách thuocList
    const thuocIds = thuocList.map(item => item.thuocId);
    const thuocs = await Thuoc.find({ '_id': { $in: thuocIds }, loaiVatTu: 'Thuoc' });

    // Kiểm tra xem tất cả thuốc trong danh sách có tồn tại không
    if (thuocs.length !== thuocIds.length) {
      return res.status(404).json({ success: false, message: 'Một hoặc nhiều thuốc không tồn tại trong cơ sở dữ liệu' });
    }

    // Thêm danh sách thuốc vào đơn thuốc
    thuocList.forEach((thuocItem) => {
      const thuoc = thuocs.find(t => t._id.toString() === thuocItem.thuocId);
      if (thuoc) {
        newDonThuoc.thuoc.push({
          tenThuoc: thuoc._id,
          tenVatTu: thuoc.tenVatTu,  // Lưu tên thuốc vào trường tenVatTu
          lieuDung: thuocItem.lieuDung,
          soLanUong: thuocItem.soLanUong,
          ghiChu: thuocItem.ghiChu,
        });
      }
    });

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


  export const getPrescibeById = async (req, res) => {
    const { id } = req.params;

    try {
        // Tìm đơn thuốc theo ID
        const donThuoc = await DonThuoc.findById(id)
            .populate('benhNhan', 'ten ngaySinh diaChi')
            .populate('bacSi', 'ten chucVu')


        if (!donThuoc) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy đơn thuốc' });
        }

        res.status(200).json({ success: true, donThuoc });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};

export const getPrescibeAll = async (req, res) => {
    try {
        // Lấy tất cả các đơn thuốc
        const donThuocAll = await DonThuoc.find({})
            .populate('benhNhan', 'ten ngaySinh diaChi')
            .populate('bacSi', 'ten chucVu');

        if (!donThuocAll.length) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy đơn thuốc nào' });
        }

        res.status(200).json({ success: true, donThuocAll });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};