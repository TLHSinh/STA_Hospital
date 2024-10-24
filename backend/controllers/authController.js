import BenhNhan from '../models/BenhNhanSchema.js'
import BacSi from '../models/BacSiSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const generateToken = user => {
    return jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d',
    });
}

export const register = async (req, res) => {
    /*
    console.log("Request Headers: ", req.headers);  // Kiểm tra các headers
    console.log("Request Body: ", req.body);  // Kiểm tra dữ liệu body
     */
    const { email, matKhau, ten, role, hinhAnh, gioiTinh } = req.body;

    try {
        let user = null;

        if (role === "benhnhan") {
            user = await BenhNhan.findOne({ email });
        } else if (role === "doctor") {
            user = await BacSi.findOne({ email });
        }

        // Kiểm tra nếu user đã tồn tại
        if (user) {
            return res.status(400).json({ message: "Người dùng đã tồn tại" });
        }

        // Hash mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(matKhau, salt);

        if (role === "benhnhan") {
            user = new BenhNhan({
                ten,
                email,
                matKhau: hashPassword,
                hinhAnh,
                gioiTinh,
                role
            });
        }

        if (role === "doctor") {
            user = new BacSi({
                ten,
                email,
                matKhau: hashPassword,
                hinhAnh,
                gioiTinh,
                role
            });
        }

        await user.save();
        res.status(200).json({ message: "Đăng ký người dùng thành công" });

    } catch (err) {
        res.status(500).json({ success: false, message: "Mất kết nối server" });
    }
}

export const login = async (req, res) => {
    console.log("request body:", req.body);
    const { email } = req.body;

    try {
        let user = null;
        const benhNhan = await BenhNhan.findOne({ email });
        const doctor = await BacSi.findOne({ email });

        if (benhNhan) {
            user = benhNhan;
        }
        if (doctor) {
            user = doctor;
        }

        // Kiểm tra nếu user không tồn tại
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        // Kiểm tra mật khẩu
        const isPasswordMatch = await bcrypt.compare(
            req.body.matKhau,
            user.matKhau
        );

        if (!isPasswordMatch) {
            return res.status(404).json({ message: "Thông tin xác thực không hợp lệ" });
        }

        // Lấy token
        const token = generateToken(user);

        const { matKhau, role, lichHen, ...rest } = user._doc;

        return res
            .status(200)
            .json({ status: true, message: "Đăng nhập thành công", token, data: { ...rest }, role });

    } catch (err) {
        return res
            .status(500)
            .json({ status: false, message: "Đăng nhập không thành công" });
    }
}
