import e from "cors";
import BacSi from "../models/BacSiSchema.js";

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
