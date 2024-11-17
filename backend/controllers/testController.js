import BenhAn from '../models/BenhAnSchema.js';
import BacSi from '../models/BacSiSchema.js';
import KetQuaXetNghiem from '../models/KetQuaXetNghiemSchema.js';
import XetNghiem from '../models/XetNghiemSchema.js';

// Hàm kê xét nghiệm cho bệnh nhân
export const newTest = async (req, res) => {
    const { bacSiId, xetNghiemList, ghiChu } = req.body;
    const { id } = req.params;
    const benhAnId = id;
    try {
        // Kiểm tra nếu xetNghiemList không phải là một mảng
        if (!Array.isArray(xetNghiemList)) {
            return res.status(400).json({ success: false, message: 'Danh sách xét nghiệm không hợp lệ' });
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

        // Thêm kết quả xét nghiệm mới
        for (const xetNghiemItem of xetNghiemList) {
            const { xetNghiemId, ngayLayMau, ngayTraKetQua, ketQua } = xetNghiemItem;
            const xetNghiem = await XetNghiem.findById(xetNghiemId);
            if (!xetNghiem) {
                return res.status(404).json({ success: false, message: `Không tìm thấy xét nghiệm với ID: ${xetNghiemId}` });
            }

            const newKetQuaXetNghiem = new KetQuaXetNghiem({
                ngayXetNghiem: new Date(),
                ketQua,
                ngayLayMau,
                ngayTraKetQua,
                ghiChu,
                benhAn: benhAnId,
                xetNghiem: xetNghiemId,
            });

            // Lưu kết quả xét nghiệm vào cơ sở dữ liệu
            await newKetQuaXetNghiem.save();

            // Cập nhật bệnh án với kết quả xét nghiệm mới
            benhAn.ketQuaXetNghiem.push(newKetQuaXetNghiem._id);
        }

        await benhAn.save();

        res.status(201).json({ success: true, message: 'Kê xét nghiệm thành công', benhAn });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};

// Hàm lấy kết quả xét nghiệm theo ID
export const getTestResultById = async (req, res) => {
    const { id } = req.params;

    try {
        // Tìm kết quả xét nghiệm theo ID
        const ketQuaXetNghiem = await KetQuaXetNghiem.findById(id)
            .populate('benhAn', 'ten ngaySinh diaChi')
            .populate('xetNghiem', 'loaiXetNghiem giaXetNghiem');

        if (!ketQuaXetNghiem) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy kết quả xét nghiệm' });
        }

        res.status(200).json({ success: true, ketQuaXetNghiem });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};

// Hàm lấy tất cả kết quả xét nghiệm
export const getAllTestResults = async (req, res) => {
    try {
        // Lấy tất cả các kết quả xét nghiệm
        const ketQuaXetNghiemAll = await KetQuaXetNghiem.find({})
            .populate('benhAn', 'ten ngaySinh diaChi')
            .populate('xetNghiem', 'loaiXetNghiem giaXetNghiem');

        if (!ketQuaXetNghiemAll.length) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy kết quả xét nghiệm nào' });
        }

        res.status(200).json({ success: true, ketQuaXetNghiemAll });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Lỗi server' });
    }
};

//lấy các loại xét nghiệm 
export const getAllListTest = async (req, res) => {
    try {
        const getAllListTest = await XetNghiem.find({});
 
        res.status(200).json({ success: true, message: 'Tìm xét nghiệm thành công', data: getAllListTest });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Tìm xét nghiệm không thành công' });
    }
 }