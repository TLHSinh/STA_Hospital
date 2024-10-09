import User from "../models/UserSchema.js";

export const updateUser=async(req,res)=>{
    const id= req.params.id;

    try{

        const updateUser= await User.findByIdAndUpdate(id,{$set:req.body},{new:true});

        res.status(200).json({ success:true, message:'cap nhap thanh cong',data:updateUser});

    }catch(err){
        res.status(500).json({ success:false, message:'cap nhap khong thanh cong'});

    }
}


export const deleteUser=async(req,res)=>{
    const id= req.params.id;

    try{
        
        await User.findByIdAndDelete(id);

        res.status(200).json({ success:true, message:'xoa nguoi dung thanh cong'})

    }catch(err){
        res.status(500).json({ success:false, message:'xoa nguoi dung khong thanh cong'})

    }
}


export const getSingleUser=async(req,res)=>{
    const id= req.params.id

    try{

        const getaUser= await User.findById(id).select("-password");

        res.status(200).json({ success:true, message:'tim nguoi dung thanh cong',data:getaUser})

    }catch(err){
        res.status(500).json({ success:false, message:'tim nguoi dung khong thanh cong'})

    }
}


export const getAllUser=async(req,res)=>{

    try{

        const getUser= await User.find({}).select("-password");

        res.status(200).json({ success:true, message:'tim nguoi dung thanh cong',data:getUser})

    }catch(err){
        res.status(500).json({ success:false, message:'tim nguoi dung khong thanh cong'})

    }
}