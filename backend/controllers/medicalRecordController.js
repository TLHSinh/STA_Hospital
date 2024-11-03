/*
      trường hợp 1: bệnh nhân đã có tài khoản và đã đăng ký lịch hẹn 
      khi đến khám sẽ được bác sĩ chuẩn đoán bệnh án 
      khi khám bác sĩ có thể hoặc không yêu cầu xét nghiệm và kê đơn thuốc 
      
      trường hợp 2: bệnh nhân chưa có tài khoản và chưa đăng ký lịch hẹn
      khi đến khám sẽ được bác sĩ chuẩn đoán bệnh án 
      khi khám bác sĩ có thể hoặc không yêu cầu xét nghiệm và kê đơn thuốc 
      (trong trường này khi bác sĩ chọn tạo bệnh án cho khách sẽ hiện lên from popup đăng kí nhanh tài khoản cho khách hàng và tiến hành khám kê bệnh án...)
      
      trường hợp 3: khách hàng đã có tài khoản nhưng chưa đặt lịch hẹn 
      khi đến khám sẽ được bác sĩ chuẩn đoán bệnh án 
      khi khám bác sĩ có thể hoặc không yêu cầu xét nghiệm và kê đơn thuốc 
      (trong trường này khi bác sĩ tìm kiếm người dùng dựa theo email hoặc số điện thoại mà bệnh nhân cung cấp và chọn bệnh nhân để kê bệnh án )

 */



import BenhAn from '../models/BenhAnSchema.js';
import BenhNhan from '../models/BenhNhanSchema.js';
import BacSi from '../models/BacSiSchema.js';
import LichHen from '../models/LichHenSchema.js';
import KetQuaXetNghiem from '../models/KetQuaXetNghiemSchema.js';
import bcrypt from 'bcryptjs';
import DonThuoc from '../models/DonThuocSchema.js';
import Thuoc from '../models/ThuocVatTuSchema.js';

// Trường hợp 1: Bệnh nhân đã có tài khoản và đã đăng ký lịch hẹn
export const createMedicalRecordWithAppointment = async (req, res) => {
  const {
    benhNhanId,
    bacSiId,
    chanDoan,
    trieuChung,
    phuongPhapDieuTri,
    ketQuaXetNghiemIds,
    tienSuBenhLy,
    danhGiaDieuTri,
    lichHenId,
    donThuocIds,
  } = req.body;

  try {
    // Kiểm tra xem lịch hẹn có tồn tại và hợp lệ không
    const lichHen = await LichHen.findById(lichHenId);
    if (!lichHen || lichHen.benhNhan.toString() !== benhNhanId.toString()) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy lịch hẹn hợp lệ' });
    }

    // Kiểm tra xem bác sĩ có tồn tại không
    const bacSi = await BacSi.findById(bacSiId);
    if (!bacSi) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bác sĩ' });
    }

    // Tạo bệnh án mới
    const newBenhAn = new BenhAn({
      benhNhan: benhNhanId,
      bacSi: bacSiId,
      chanDoan,
      trieuChung,
      phuongPhapDieuTri,
      ketQuaXetNghiem: ketQuaXetNghiemIds,
      tienSuBenhLy,
      danhGiaDieuTri,
      ngayKham: lichHen.ngayHen,
      donThuoc: donThuocIds,
      lichHen: [lichHenId],
      trangThai: 'dangDieuTri',
    });

    // Lưu bệnh án vào cơ sở dữ liệu
    await newBenhAn.save();
    res.status(201).json({ success: true, message: 'Tạo bệnh án thành công', benhAn: newBenhAn });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};

// Trường hợp 2: Bệnh nhân chưa có tài khoản và chưa đăng ký lịch hẹn
export const createMedicalRecordForNewPatient = async (req, res) => {
  const {
    email,
    matKhau,
    ten,
    soDienThoai,
    gioiTinh,

    bacSiId,
    chanDoan,
    trieuChung,
    phuongPhapDieuTri,
    ketQuaXetNghiemIds,
    tienSuBenhLy,
    danhGiaDieuTri,
    ngayKham,
    donThuocIds,
  } = req.body;

  try {
    // Kiểm tra nếu user đã tồn tại
    let benhNhan = await BenhNhan.findOne({ email });
    if (benhNhan) {
      return res.status(400).json({ message: 'Bệnh nhân đã tồn tại' });
    }

    // Hash mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(matKhau, salt);

    // Tạo bệnh nhân mới
    benhNhan = new BenhNhan({
      email,
      matKhau: hashPassword,
      ten,
      soDienThoai,
      gioiTinh,
     
      role: 'BenhNhan',

    });

    await benhNhan.save();

    // Kiểm tra xem bác sĩ có tồn tại không
    const bacSi = await BacSi.findById(bacSiId);
    if (!bacSi) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bác sĩ' });
    }

    // Tạo bệnh án mới
    const newBenhAn = new BenhAn({
      benhNhan: benhNhan._id,
      bacSi: bacSiId,
      chanDoan,
      trieuChung,
      phuongPhapDieuTri,
      ketQuaXetNghiem: ketQuaXetNghiemIds,
      tienSuBenhLy,
      danhGiaDieuTri,
      ngayKham,
      donThuoc: donThuocIds,
      trangThai: 'dangDieuTri',
    });

    // Lưu bệnh án vào cơ sở dữ liệu
    await newBenhAn.save();
    res.status(201).json({ success: true, message: 'Tạo bệnh án thành công', benhAn: newBenhAn });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};

// Trường hợp 3: Bệnh nhân đã có tài khoản nhưng chưa đặt lịch hẹn
export const createMedicalRecordWithoutAppointment = async (req, res) => {
  const {
    emailOrPhone,
    bacSiId,
    chanDoan,
    trieuChung,
    phuongPhapDieuTri,
    ketQuaXetNghiemIds,
    tienSuBenhLy,
    danhGiaDieuTri,
    ngayKham,
    donThuocIds,
  } = req.body;

  try {
    // Tìm bệnh nhân dựa vào email hoặc số điện thoại
    const benhNhan = await BenhNhan.findOne({
      $or: [{ email: emailOrPhone }, { soDienThoai: emailOrPhone }],
    });
    if (!benhNhan) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bệnh nhân' });
    }

    // Kiểm tra xem bác sĩ có tồn tại không
    const bacSi = await BacSi.findById(bacSiId);
    if (!bacSi) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bác sĩ' });
    }

    // Tạo bệnh án mới
    const newBenhAn = new BenhAn({
      benhNhan: benhNhan._id,
      bacSi: bacSiId,
      chanDoan,
      trieuChung,
      phuongPhapDieuTri,
      ketQuaXetNghiem: ketQuaXetNghiemIds,
      tienSuBenhLy,
      danhGiaDieuTri,
      ngayKham,
      donThuoc: donThuocIds,
      trangThai: 'dangDieuTri',
    });

    // Lưu bệnh án vào cơ sở dữ liệu
    await newBenhAn.save();
    res.status(201).json({ success: true, message: 'Tạo bệnh án thành công', benhAn: newBenhAn });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};




export const getMedicalRecordById = async (req, res) => {
  const { id } = req.params;

  try {
    // Tìm bệnh án theo ID
    const benhAn = await BenhAn.findById(id)
      .populate('benhNhan', 'hoTen ngaySinh diaChi')
      .populate('bacSi', 'hoTen chucVu')
      .populate('ketQuaXetNghiem', 'ngayXetNghiem ketQua')
      .populate('donThuoc', 'ngayKeDon')
      .populate('lichHen', 'ngayHen thoiGianBatDau');

    if (!benhAn) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bệnh án' });
    }

    res.status(200).json({ success: true, benhAn });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};

export const updateMedicalRecordStatus = async (req, res) => {
  const { id } = req.params;
  const { trangThai } = req.body;

  try {
    // Tìm bệnh án theo ID
    const benhAn = await BenhAn.findById(id);
    if (!benhAn) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bệnh án' });
    }

    // Cập nhật trạng thái bệnh án
    benhAn.trangThai = trangThai;
    await benhAn.save();

    res.status(200).json({ success: true, message: 'Cập nhật trạng thái bệnh án thành công', benhAn });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};

export const deleteMedicalRecordById = async (req, res) => {
  const { id } = req.params;

  try {
    // Xóa bệnh án theo ID
    const benhAn = await BenhAn.findByIdAndDelete(id);
    if (!benhAn) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bệnh án' });
    }

    res.status(200).json({ success: true, message: 'Xóa bệnh án thành công' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
};




// Hàm kê đơn thuốc
// Hàm kê đơn thuốc cho bệnh nhân

export const prescribeMedication = async (req, res) => {
  const { benhAnId, bacSiId, thuocList, loiKhuyen } = req.body;

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



