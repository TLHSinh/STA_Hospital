import BenhNhan from '../models/BenhNhanSchema.js'
import BacSi from '../models/BacSiSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


export const addUser = async (req,res)=>{
     /*
    console.log("Request Headers: ", req.headers);  // Kiểm tra các headers
    console.log("Request Body: ", req.body);  // Kiểm tra dữ liệu body
     */
    const { email, matKhau, ten,soDienThoai, hinhAnh,ngaySinh,cccd,diaChi,role, gioiTinh,nhomMau } = req.body;

    try {
        let user = null;

        user = await BenhNhan.findOne({ email });
        

        // Kiểm tra nếu user đã tồn tại
        if (user) {
            return res.status(400).json({ message: "Người dùng đã tồn tại" });
        }

        // Hash mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(matKhau, salt);

        if (role === "benhnhan") {
            user = new BenhNhan({


                email,
                matKhau: hashPassword,
                ten,
                soDienThoai,
                hinhAnh,
                ngaySinh,
                cccd,
                diaChi,
                role,
                gioiTinh,
                nhomMau


            });
        }

        await user.save();
        res.status(200).json({ message: "Đăng ký người dùng thành công" });

    } catch (err) {
        res.status(500).json({ success: false, message: "Mất kết nối server" });
    }
}

export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updateUser = await BenhNhan.findByIdAndUpdate(id, { $set: req.body }, { new: true });

        res.status(200).json({ success: true, message: 'Cập nhật thành công', data: updateUser });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Cập nhật không thành công' });
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await BenhNhan.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Xóa người dùng thành công' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Xóa người dùng không thành công' });
    }
}

export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const getaUser = await BenhNhan.findById(id).select("-matKhau");

        res.status(200).json({ success: true, message: 'Tìm người dùng thành công', data: getaUser });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Tìm người dùng không thành công' });
    }
}

export const getAllUser = async (req, res) => {
    try {
        const getUser = await BenhNhan.find({}).select("-matKhau");

        res.status(200).json({ success: true, message: 'Tìm người dùng thành công', data: getUser });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Tìm người dùng không thành công' });
    }
}
