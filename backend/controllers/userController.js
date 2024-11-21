import BenhNhan from '../models/BenhNhanSchema.js'
import BacSi from '../models/BacSiSchema.js'
import LichHen from '../models/LichHenSchema.js'
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

        if (role === "BenhNhan") {
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
    const { matKhau, ...rest } = req.body;

    try {
        // Nếu có trường matKhau trong dữ liệu cập nhật, tiến hành băm mật khẩu
        if (matKhau) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(matKhau, salt);
            rest.matKhau = hashedPassword;
        }

        const updatedUser = await BenhNhan.findByIdAndUpdate(id, { $set: rest }, { new: true });

        res.status(200).json({ success: true, message: 'Cập nhật thành công', data: updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Cập nhật không thành công' });
    }
};



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


// Hàm tìm kiếm bệnh nhân theo email hoặc số điện thoại
export const getUserEorP = async (req, res) => {
    const { emailOrPhone } = req.body; // Nhận email hoặc số điện thoại từ yêu cầu
  
    try {
      // Tìm bệnh nhân dựa vào email hoặc số điện thoại
      const search = await BenhNhan.findOne({
        $or: [{ email: emailOrPhone }],
      });
  
      if (!search) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy bệnh nhân' });
      }
  
      res.status(200).json({ success: true, message: 'Tìm người dùng thành công', data: search });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
    }
  };
  
    


export const getAllUser = async (req, res) => {
    try {
        const getUser = await BenhNhan.find({}).select("-matKhau");

        res.status(200).json({ success: true, message: 'Tìm người dùng thành công', data: getUser });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Tìm người dùng không thành công' });
    }
}

export const getUserProfile = async(req,res)=>{
    const userID = req.userID

    try{
        const user =await BenhNhan.findById(userID)

        if(!user){
            return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
        }

        const {matKhau, ...rest}=user._doc
        res.status(200).json({ success: true, message: 'Tìm người dùng thành công', data:{...rest}});

    }
    catch(err) {
        res.status(500).json({ success: true, message: 'Tìm người dùng Khong thành công' });
    }
};


export const getMyAppointments = async(req,res)=>{
    try {

        // step 1 :retrieve appointments from booking for specific user
        
        const LichHens = await LichHen.find({user:req.userID})


        // step 2: extract doctor ids from appointment bookings

        const doctorIds = LichHen.map(el=>el.doctor.id)

        // step 3: retrieve doctors using doctor ids

        const doctors = await BacSi.find({_id: {$in:doctorIds}}).select('-matKhau')

        res.status(200).json({ success: true, message: 'Appointments are getting', data:doctors });
        
    } catch (error) {
        res.status(500).json({ success: true, message: 'Tìm người dùng Khong thành công' });
    }
}