import e from "cors";
import Doctor from "../models/DoctorSchema.js";

export const updateDoctor=async(req,res)=>{
    const id= req.params.id;

    try{

        const updateDoctor= await Doctor.findByIdAndUpdate(
            id,
            {$set:req.body},
            {new:true}
        );

        res.status(200).json({ success:true, message:'cap nhap thanh cong',data:updateDoctor});

    }catch(err){
        res.status(500).json({ success:false, message:'cap nhap khong thanh cong'});

    }
}


export const deleteDoctor=async(req,res)=>{
    const id= req.params.id;

    try{
        
        await Doctor.findByIdAndDelete(id);

        res.status(200).json({ success:true, message:'xoa nguoi dung thanh cong'})

    }catch(err){
        res.status(500).json({ success:false, message:'xoa nguoi dung khong thanh cong'})

    }
}


export const getSingleDoctor=async(req,res)=>{
    const id= req.params.id

    try{

        const getaDoctor= await Doctor.findById(id).select("-password");

        res.status(200).json({ success:true, message:'tim nguoi dung thanh cong',data:getaDoctor})

    }catch(err){
        res.status(500).json({ success:false, message:'tim nguoi dung khong thanh cong'})

    }
}


export const getAllDoctor=async(req,res)=>{

    try{

        const {query}=req.query
        let getDoctor ;

        if(query) {
            getDoctor = await Doctor.find({
            isApproved:"approved", 
            $or:[
                {name:{$regex:query, $options:"i"}},
                {specialization:{$regex:query, $options:"i"}}
            ],
        }).select("-password");
    } else{
            getDoctor= await Doctor.find({isApproved:"approved"}).select("-password");
    }
        res.status(200).json({ success:true, message:'tim nguoi dung thanh cong',data:getDoctor})

    }catch(err){
        res.status(500).json({ success:false, message:'tim nguoi dung khong thanh cong'})

    }
}