import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs' 


const generateToken=user=>{
    return jwt.sign({id:user._id, role:user.role},process.env.JWT_SECET_KEY, {
        expiresIn:'15d',
    })
}


export const register = async(req,res)=>{

    console.log("Request Headers: ", req.headers);  // Kiểm tra các headers
    console.log("Request Body: ", req.body);  // Kiểm tra dữ liệu body
    const{email,password,name,role,photo,gender}=req.body;

    try{
        let user=null

        if (role==="patient"){
            user= await User.findOne ({ email })
        }
        else if(role==="doctor"){
            user= await Doctor.findOne ({ email })
        }

        //kiem tra neu user ton tai
        if(user){
            return res.status(400).json({message:"nguoi dung da ton tai"})
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword= await bcrypt.hash(password,salt);

        if(role === "patient"){
            user=new User({
                name,
                email,
                password:hashPassword,
                photo,
                gender,
                role
            })
        }

        if(role === "doctor"){
            user=new Doctor({
                name,
                email,
                password:hashPassword,
                photo,
                gender,
                role
            })
        }

        await user.save()
        res.status(200).json({message:"dang ky nguoi dung thanh cong"})


    }catch (err) {
        res.status(500).json({success:false,message:"Mat ket noi server"})

    }
}

export const login = async(req,res)=>{

    
    console.log("request body:",req.body);
    const{ email}=req.body

    try{
        let user=null
        const patient=await User.findOne({email})
        const doctor=await Doctor.findOne({email})

        if (patient){
            user=patient;
        }
        if(doctor){
            user=doctor;
        }
        //kiểm tra nếu user tồn tại hoặc không
        if(!user){
            return res.status(404).json({message:"Khong im thay user"});
        }

        //kiểm tra password
        const isPasswordmatch= await bcrypt.compare(
            req.body.password, 
            user.password
        );

        if(!isPasswordmatch){ 
            return res.status(404).json({message:"Thông tin xác thực không hợp lệ"});
        }
        //get token
        const token=generateToken(user);

        const { password, role, appoinments, ...rest } =user._doc; 

        return res
            .status(200)
            .json({status: true,message:"Dang nhap thanh cong", token,data:{...rest},role });

    }catch (err) {
        return res
            .status(500)
            .json({status: false,message:"Dang nhap khong thanh cong"});
    }
}