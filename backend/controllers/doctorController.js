import e from "cors";
import BenhNhan from '../models/BenhNhanSchema.js'
import BacSi from '../models/BacSiSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'




export const addDoctor = async (req,res)=>{
    /*
   console.log("Request Headers: ", req.headers);  // Kiểm tra các headers
   console.log("Request Body: ", req.body);  // Kiểm tra dữ liệu body
    */
   const { email, matKhau, ten,soDienThoai, hinhAnh,gioiTinh,ngaySinh,cccd,diaChi,chuyenKhoa,giaKham,role,bangCap,kinhNghiem,gioiThieuNgan,gioiThieuChiTiet,lichLamViec,trangThai } = req.body;

   try {
       let user = null;

       user = await BacSi.findOne({ email });
       

       // Kiểm tra nếu user đã tồn tại
       if (user) {
           return res.status(400).json({ message: "Người dùng đã tồn tại" });
       }

       // Hash mật khẩu
       const salt = await bcrypt.genSalt(10);
       const hashPassword = await bcrypt.hash(matKhau, salt);

       if (role === "Doctor") {
           user = new BacSi({

            email,
            matKhau: hashPassword,
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

       await user.save();
       res.status(200).json({ message: "Đăng ký người dùng thành công" });

   } catch (err) {
       res.status(500).json({ success: false, message: "Mất kết nối server" });
   }
}
export const updateDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        const updateDoctor = await BacSi.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({ success: true, message: 'Cập nhật thành công', data: updateDoctor });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Cập nhật không thành công' });
    }
}

export const deleteDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        await BacSi.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Xóa người dùng thành công' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Xóa người dùng không thành công' });
    }
}

export const getSingleDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        const getaDoctor = await BacSi.findById(id).select("-matKhau");

        res.status(200).json({ success: true, message: 'Tìm người dùng thành công', data: getaDoctor });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Tìm người dùng không thành công' });
    }
}

export const getAllDoctor = async (req, res) => {
    try {
        const { query } = req.query;
        let getDoctor;

        if (query) {
            getDoctor = await BacSi.find({
                trangThai: "duocDuyet", // Thay đổi từ isApproved thành trangThai và giá trị "approved" thành "duocDuyet"
                $or: [
                    { ten: { $regex: query, $options: "i" } }, // Thay name bằng ten
                    { chuyenKhoa: { $regex: query, $options: "i" } } // Thay specialization bằng chuyenKhoa
                ],
            }).select("-matKhau"); // Thay password bằng matKhau
        } else {
            getDoctor = await BacSi.find({ trangThai: "duocDuyet" }).select("-matKhau"); // Thay password bằng matKhau
        }

        res.status(200).json({ success: true, message: 'Tìm người dùng thành công', data: getDoctor });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Tìm người dùng không thành công' });
    }
}
