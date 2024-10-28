import jwt from 'jsonwebtoken'
import BacSi from '../models/BacSiSchema.js';
import BenhNhan from '../models/BenhNhanSchema.js';

/* export const authenticate=async(req,res,next)=>{
    

    //get Token from header
    const authToken=req.headers.authorization;
    

    //check token is exist
    if (!authToken || !authToken.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ success: false, message: "No token, authorization denied" });
    }


    
    try{
    
        console.log('Authorization header:', authToken);
        //console.log('Extracted token:', token);

        // Sau khi đảm bảo rằng token hợp lệ, bạn mới tách token
        const token = authToken.split(" ")[1];  // Giờ token sẽ được tách chính xác 

        //verify token
        const decoded =jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userId = decoded.userId
        req.role = decoded.role

        console.log('Extracted token:', token);
        next(); //must be call next function

    }
    catch (err){

 

        if(err.name==='TokenExpiredError'){
            return res.status(401).json({message:'Token is expired'})
        }

        return res.status(401).json({success:false, message:'Invalid token'})
    }
}; */


/* export const restrict = roles => async(req, res, next)=>{
    const userId=req.userId

    let user;

    const patient =await User.findById(userId)
    const doctor =await Doctor.findById(userId)

    if (patient){
        user=patient
    }
    if(doctor){
        user=doctor
    }
    if(!roles.includes(user.role)){
        return res.status(401).json({success:false, message:'you not authorization'})

    }

    next();
}; */


export const authenticate = async (req, res, next) => {
    // Lấy token từ header
    const authToken = req.headers.authorization;

    // Kiểm tra xem token có tồn tại và bắt đầu bằng "Bearer " không
    if (!authToken || !authToken.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ success: false, message: "Không có token, quyền truy cập bị từ chối" });
    }

    try {
        // Tách token
        // Trích xuất token từ header Authorization
        const token = authToken.split(" ")[1];

       // console.log= ("token:", token)

        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Gắn userId và role vào đối tượng yêu cầu
        req.userId = decoded.id;
        
        req.role = decoded.role;

        console.log('UserId:', req.userId); 
        console.log('Role:', req.role);     
        
        next(); 
    } catch (err) {
        console.error('Lỗi xác thực token:', err);

        // Xử lý token hết hạn
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token đã hết hạn' });
        }

        // Xử lý token không hợp lệ
        return res.status(401).json({ success: false, message: 'Token không hợp lệ' });
    }
};

export const restrict = (roles) => async (req, res, next) => {
    const userId = req.userId;  // Lấy userId từ đối tượng yêu cầu

    
    console.log("UserId:", userId);

    // Nếu userId undefined, nghĩa là có vấn đề với middleware xác thực
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'Quyền truy cập bị từ chối, không có userId'
        });
    }

    let user = null;
    try {
        // Thử tìm người dùng trong bảng User
        user = await BenhNhan.findById(userId);

        // Nếu không tìm thấy trong User, kiểm tra bảng Doctor
        if (!user) {
            user = await BacSi.findById(userId);
        }
    } catch (error) {
        console.error("Lỗi khi tìm người dùng:", error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi máy chủ khi tìm kiếm người dùng'
        });
    }

    // Nếu không tìm thấy người dùng trong cả hai bảng User và Doctor
    if (!user) {
        console.log("Không tìm thấy người dùng với ID:", userId);
        return res.status(404).json({
            success: false,
            message: 'Không tìm thấy người dùng'
        });
    }

    // Kiểm tra xem role của người dùng có nằm trong các vai trò được phép không
    if (!roles.includes(user.role)) {
        return res.status(401).json({
            success: false,
            message: 'Bạn không có quyền truy cập tài nguyên này'
        });
    }

    // Tiếp tục đến middleware tiếp theo nếu mọi thứ đều OK
    next();
};


