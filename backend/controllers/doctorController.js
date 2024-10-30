import e from "cors";
import BenhNhan from '../models/BenhNhanSchema.js';
import BacSi from '../models/BacSiSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import LichHen from "../models/LichHenSchema.js";
import moment from 'moment';
import pkg from 'moment-range';
const { extendMoment } = pkg;
const momentRange = extendMoment(moment);




export const addDoctor = async (req, res) => {
    // Lấy thông tin từ body request
    const { email, matKhau, ten, soDienThoai, hinhAnh, gioiTinh, ngaySinh, cccd, diaChi, chuyenKhoa, giaKham, role, bangCap, kinhNghiem, gioiThieuNgan, gioiThieuChiTiet, lichLamViec, trangThai } = req.body;

    try {
        let user = null;

        // Kiểm tra xem bác sĩ có tồn tại trong cơ sở dữ liệu hay không
        user = await BacSi.findOne({ email });

        // Nếu bác sĩ đã tồn tại, trả về lỗi
        if (user) {
            return res.status(400).json({ message: "Người dùng đã tồn tại" });
        }

        // Hash mật khẩu để bảo mật
        const salt = await bcrypt.genSalt(10); // Tạo salt để hash mật khẩu
        const hashPassword = await bcrypt.hash(matKhau, salt); // Hash mật khẩu với salt

        // Tạo mới bác sĩ nếu role là "BacSi"
        if (role === "BacSi") {
            user = new BacSi({
                email,
                matKhau: hashPassword, // Lưu mật khẩu đã hash
                ten,
                soDienThoai,
                hinhAnh,
                gioiTinh,
                ngaySinh,
                cccd,
                diaChi,
                chuyenKhoa,
                giaKham,
                role,
                bangCap,
                kinhNghiem,
                gioiThieuNgan,
                gioiThieuChiTiet,
                lichLamViec
            });
        }

        // Lưu bác sĩ mới vào cơ sở dữ liệu
        await user.save();
        res.status(200).json({ message: "Đăng ký người dùng thành công" });
    } catch (err) {
        // Xử lý lỗi kết nối server
        res.status(500).json({ success: false, message: "Mất kết nối server" });
    }
};

export const updateDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        // Cập nhật thông tin bác sĩ theo ID
        const updateDoctor = await BacSi.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({ success: true, message: 'Cập nhật thành công', data: updateDoctor });
    } catch (err) {
        // Xử lý lỗi cập nhật
        res.status(500).json({ success: false, message: 'Cập nhật không thành công' });
    }
};

export const deleteDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        // Xóa bác sĩ theo ID
        await BacSi.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Xóa người dùng thành công' });
    } catch (err) {
        // Xử lý lỗi xóa người dùng
        res.status(500).json({ success: false, message: 'Xóa người dùng không thành công' });
    }
};

export const getSingleDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        // Tìm bác sĩ theo ID và loại bỏ mật khẩu khỏi kết quả trả về
        const getaDoctor = await BacSi.findById(id).select("-matKhau");

        res.status(200).json({ success: true, message: 'Tìm người dùng thành công', data: getaDoctor });
    } catch (err) {
        // Xử lý lỗi tìm người dùng
        res.status(500).json({ success: false, message: 'Tìm người dùng không thành công' });
    }
};

export const getAllDoctor = async (req, res) => {
    try {
        const { query } = req.query;
        let getDoctor;

        // Tìm kiếm bác sĩ theo query hoặc trả về tất cả bác sĩ đã được duyệt
        if (query) {
            getDoctor = await BacSi.find({
                trangThai: "duocDuyet", // Chỉ lấy các bác sĩ đã được duyệt
                $or: [
                    { ten: { $regex: query, $options: "i" } }, // Tìm theo tên
                    { chuyenKhoa: { $regex: query, $options: "i" } } // Tìm theo chuyên khoa
                ],
            }).select("-matKhau"); // Loại bỏ mật khẩu khỏi kết quả trả về
        } else {
            getDoctor = await BacSi.find({ trangThai: "duocDuyet" }).select("-matKhau"); // Chỉ lấy các bác sĩ đã được duyệt
        }

        res.status(200).json({ success: true, message: 'Tìm người dùng thành công', data: getDoctor });
    } catch (err) {
        // Xử lý lỗi tìm người dùng
        res.status(500).json({ success: false, message: 'Tìm người dùng không thành công' });
    }
};

export const getDoctorProfile = async (req, res) => {
    const userID = req.userID;

    try {
        // Tìm hồ sơ bác sĩ theo ID
        const doctor = await BacSi.findById(userID);

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy bác sĩ' });
        }

        // Loại bỏ mật khẩu khỏi kết quả trả về và lấy lịch hẹn của bác sĩ
        const { matKhau, ...rest } = doctor._doc;
        const appointment = await LichHen.find({ doctor: userID });

        res.status(200).json({ success: true, message: 'Tìm người dùng thành công', data: { ...rest, appointment } });
    } catch (err) {
        // Xử lý lỗi tìm người dùng
        res.status(500).json({ success: false, message: 'Tìm người dùng không thành công' });
    }
};

export const getMyAppointments = async (req, res) => {
    try {
        // Lấy tất cả các lịch hẹn của người dùng cụ thể
        const LichHens = await LichHen.find({ user: req.userID });

        // Lấy danh sách ID của các bác sĩ từ lịch hẹn
        const doctorIds = LichHens.map(el => el.doctor.id);

        // Lấy thông tin của các bác sĩ theo danh sách ID
        const doctors = await BacSi.find({ _id: { $in: doctorIds } }).select('-matKhau');

        res.status(200).json({ success: true, message: 'Appointments are getting', data: doctors });
    } catch (error) {
        // Xử lý lỗi lấy lịch hẹn
        res.status(500).json({ success: false, message: 'Tìm người dùng không thành công' });
    }
};

export const addWorkingSchedule = async (req, res) => {
    // Lấy thông tin từ body request
    const { ngay, batDau, ketThuc } = req.body;
    const id = req.params.id;
    const bacSiId = id;

    try {
        console.log(`Adding working schedule for doctor ID: ${bacSiId}`);
        console.log(`Working schedule details - Date: ${ngay}, Start: ${batDau}, End: ${ketThuc}`);
        const doctor = await BacSi.findById(bacSiId);
        if (!doctor) {
            console.warn(`Doctor not found with ID: ${bacSiId}`);
            return res.status(404).json({ message: "Không tìm thấy bác sĩ" });
        }

        // Tạo khoảng thời gian mới cho ca làm việc
        const newStart = moment(`${ngay} ${batDau}`, 'YYYY-MM-DD HH:mm');
        const newEnd = moment(`${ngay} ${ketThuc}`, 'YYYY-MM-DD HH:mm');
        const newRange = momentRange.range(newStart, newEnd);

        console.log('Checking for schedule conflicts...');
        // Kiểm tra xem có xung đột với bất kỳ khoảng thời gian nào trong lịch làm việc hiện tại không
        const isConflict = doctor.lichLamViec.some((slot) => {
            // Chuyển đổi thông tin lịch làm việc hiện tại thành khoảng thời gian
            const slotStart = moment(slot.ngay).set({ hour: moment(slot.batDau, 'HH:mm').hour(), minute: moment(slot.batDau, 'HH:mm').minute() });
            const slotEnd = moment(slot.ngay).set({ hour: moment(slot.ketThuc, 'HH:mm').hour(), minute: moment(slot.ketThuc, 'HH:mm').minute() });
            const slotRange = momentRange.range(slotStart, slotEnd);

            console.log(`Comparing with existing schedule - Date: ${slot.ngay}, Start: ${slot.batDau}, End: ${slot.ketThuc}`);
            // Kiểm tra xem khoảng thời gian mới có chồng lấn với bất kỳ khoảng thời gian nào hiện tại không
            return newRange.overlaps(slotRange, { adjacent: false });
        });

        if (isConflict) {
            console.warn(`Working schedule conflict for doctor ID: ${bacSiId} on ${ngay}, ${batDau} - ${ketThuc}`);
            return res.status(400).json({ message: "Khung giờ này đã tồn tại trong lịch làm việc của bác sĩ." });
        }

        // Thêm ca làm việc mới vào danh sách lịch làm việc của bác sĩ
        doctor.lichLamViec.push({
            ngay, // Ngày của ca làm việc
            batDau, // Giờ bắt đầu của ca làm việc
            ketThuc, // Giờ kết thúc của ca làm việc
            daDuocDat: false // Trạng thái mặc định là chưa được đặt
        });

        // Lưu thông tin bác sĩ sau khi thêm ca làm việc
        await doctor.save();

        console.log(`Working schedule added successfully for doctor ID: ${bacSiId}`);
        res.status(200).json({ success: true, message: "Thêm lịch làm việc thành công", data: doctor.lichLamViec });
    } catch (err) {
        console.error(`Error adding working schedule for doctor ID: ${bacSiId}`, err);
        res.status(500).json({ success: false, message: "Mất kết nối server" });
    }
};


export const getWorkingSchedule = async (req, res) => {
    const id = req.params.id;
    const bacSiId=id

    try {
        // Tìm bác sĩ theo ID
        const doctor = await BacSi.findById(bacSiId);
        if (!doctor) {
            return res.status(404).json({ message: "Không tìm thấy bác sĩ" });
        }

        // Định dạng giờ bắt đầu và kết thúc theo định dạng h:mm (vd: 09:00)
        const formattedSchedule = doctor.lichLamViec.map(slot => {
            return {
                ...slot._doc,
                batDau: moment(slot.batDau, "HH:mm").format("HH:mm"),
                ketThuc: moment(slot.ketThuc, "HH:mm").format("HH:mm")
            };
        });

        // Trả về lịch làm việc của bác sĩ
        res.status(200).json({ success: true, message: "Lấy lịch làm việc thành công", data: formattedSchedule });
    } catch (err) {
        // Xử lý lỗi kết nối server
        console.error(err); // Log lỗi chi tiết để gỡ lỗi
        res.status(500).json({ success: false, message: "Mất kết nối server" });
    }
};
