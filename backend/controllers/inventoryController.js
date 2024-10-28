import ThuocVatTu from "../models/ThuocVatTuSchema.js";

export const addInventory = async (req,res)=>{
    
   console.log("Request Headers: ", req.headers);  // Kiểm tra các headers
   console.log("Request Body: ", req.body);  // Kiểm tra dữ liệu body
    
   const { tenVatTu, loaiVatTu, soLuong,ngayNhap, khoHang,moTa,donViTinh,gia,ngaySanXuat,hanSuDung } = req.body;

   try {
       let iventory = null;

       iventory = await ThuocVatTu.findOne({ tenVatTu });
       

       // Kiểm tra nếu user đã tồn tại
       if (iventory) {
           return res.status(400).json({ message: "vật tư đã tồn tại" });
       }

 

      
       iventory = new ThuocVatTu({
            tenVatTu,
            loaiVatTu,
            soLuong,
            ngayNhap,
            khoHang,
            moTa,
            donViTinh,
            gia,
            ngaySanXuat,
            hanSuDung
           });
       

       await iventory.save();
       res.status(200).json({ message: "Đăng ký vật tư thành công" });

   } catch (err) {
       res.status(500).json({ success: false, message: "Mất kết nối server" });
   }
}

export const updateInventory = async (req, res) => {
   const id = req.params.id;

   try {
       const updateInventory = await ThuocVatTu.findByIdAndUpdate(id, { $set: req.body }, { new: true });

       res.status(200).json({ success: true, message: 'Cập nhật thành công', data: updateInventory });
   } catch (err) {
       res.status(500).json({ success: false, message: 'Cập nhật không thành công' });
   }
}

export const deleteInventory = async (req, res) => {
   const id = req.params.id;

   try {
       await ThuocVatTu.findByIdAndDelete(id);

       res.status(200).json({ success: true, message: 'Xóa Vật tư thành công' });
   } catch (err) {
       res.status(500).json({ success: false, message: 'Xóa vật tư không thành công' });
   }
}

export const getSingleInventory = async (req, res) => {
   const id = req.params.id;

   try {
       const getaInventory = await ThuocVatTu.findById(id);

       res.status(200).json({ success: true, message: 'Tìm vật tư thành công', data: getaInventory });
   } catch (err) {
       res.status(500).json({ success: false, message: 'Tìm vật tư không thành công' });
   }
}

export const getAllInventory = async (req, res) => {
   try {
       const getAllInventory = await ThuocVatTu.find({});

       res.status(200).json({ success: true, message: 'Tìm vật tư thành công', data: getAllInventory });
   } catch (err) {
       res.status(500).json({ success: false, message: 'Tìm vật tư không thành công' });
   }
}