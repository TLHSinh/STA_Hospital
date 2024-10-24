import BenhNhan from "../models/BenhNhanSchema.js";

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
