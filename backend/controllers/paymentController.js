import mongoose from "mongoose";
import BenhAn from '../models/BenhAnSchema.js';
import BacSi from "../models/BacSiSchema.js";
import DonThuoc from "../models/DonThuocSchema.js";
import KetQuaXetNghiem from "../models/KetQuaXetNghiemSchema.js";
import HoaDon from '../models/HoaDonSchema.js';
import BenhNhan from '../models/BenhNhanSchema.js';
import LichHen from "../models/LichHenSchema.js";

//lập hoá đơn
export const newPayment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }

  try {
    const benhAn = await BenhAn.findById(id)
      .populate("bacSi")
      .populate("donThuoc")
      .populate({ path: "ketQuaXetNghiem", populate: { path: "xetNghiem" } });

    if (!benhAn) {
      return res.status(404).json({ message: "Bệnh án không tìm thấy" });
    }

    const patient = await BenhNhan.findById(benhAn.benhNhan);
    if (!patient) {
      return res.status(404).json({ message: "Không tìm thấy bệnh nhân" });
    }

    let tongTien = 0;

    if (benhAn.bacSi?.giaKham) {
      tongTien += benhAn.bacSi.giaKham;
    }

    if (benhAn.donThuoc.length > 0) {
      const allThuocIds = benhAn.donThuoc.flatMap(don => don.thuoc.map(thuoc => thuoc.tenThuoc));
      const vatTus = await mongoose.model("ThuocVatTu").find({ _id: { $in: allThuocIds } });

      tongTien += vatTus.reduce((sum, vt) => sum + (vt.gia || 0), 0);
    }

    if (benhAn.ketQuaXetNghiem.length > 0) {
      for (const ketQua of benhAn.ketQuaXetNghiem) {
        if (ketQua.xetNghiem?.giaXetNghiem) {
          tongTien += ketQua.xetNghiem.giaXetNghiem;
        }
      }
    }

    const hoaDon = new HoaDon({
      bacSi: benhAn.bacSi._id,
      lichHen: benhAn.lichHen?.[0],
      ngayLap: new Date(),
      tongTien,
      benhAn: benhAn._id,
      trangThaiThanhToan: "chuaThanhToan",
      loaiHoaDon: req.body.loaiHoaDon || "momo",
    });

    await hoaDon.save();

    res.status(201).json({ success: true, message: "Thanh toán thành công", hoaDon });
  } catch (error) {
    console.error(`Error processing payment for benhAnId: ${id}`, error.message);
    res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
};

  
  

  //xác nhận thanh toán
export const confirmPayment = async (req, res) => {
    const { id } = req.params;
    const { paymentMethod } = req.body;
  
    try {
      console.log(`Confirming payment for bill with ID: ${id}`);
  
      // Tìm hóa đơn theo ID
      const hoaDon = await HoaDon.findById(id);
  
      // Kiểm tra nếu không tìm thấy hóa đơn
      if (!hoaDon) {
        console.warn(`Bill not found for ID: ${id}`);
        return res.status(404).json({ success: false, message: "Hóa đơn không tìm thấy" });
      }
  
      // Kiểm tra trạng thái thanh toán hiện tại
      if (hoaDon.trangThaiThanhToan === "daThanhToan") {
        return res.status(400).json({ success: false, message: "Hóa đơn đã được thanh toán trước đó" });
      }
  
      // Xác nhận thanh toán
      hoaDon.trangThaiThanhToan = "daThanhToan";
      hoaDon.ngayThanhToan = new Date();
      hoaDon.loaiHoaDon = paymentMethod || hoaDon.loaiHoaDon;
  
      // Lưu hóa đơn đã cập nhật vào cơ sở dữ liệu
      await hoaDon.save();
      console.log(`Payment confirmed for bill with ID: ${hoaDon._id}`);
  
      res.status(200).json({ success: true, message: "Xác nhận thanh toán thành công", hoaDon });
    } catch (error) {
      console.error(`Error confirming payment for bill with ID: ${id}`, error);
      res.status(500).json({ success: false, message: "Lỗi hệ thống" });
    }
  };

    // Lấy hóa đơn theo ID hóa đơn
export const getInvoiceById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID hóa đơn không hợp lệ" });
  }

  try {
    const hoaDon = await HoaDon.findById(id)
      .populate("bacSi", "ten chuyenKhoa giaKham")
      .populate("lichHen", "ngayHen gioHen")
      .populate({
        path: "benhAn",
        populate: {
          path: "benhNhan",
          select: "ten ngaySinh gioiTinh",
        },
      })
      .populate({
        path: "benhAn",
        populate: {
          path: "donThuoc",
          populate: {
            path: "thuoc.tenThuoc",
            model: "ThuocVatTu",
          },
        },
      })
      .populate({
        path: "benhAn",
        populate: {
          path: "ketQuaXetNghiem",
          select: "ketQua",
          populate: {
            path: "xetNghiem",
            select: "loaiXetNghiem giaXetNghiem",
          },
        },
        
      });

    if (!hoaDon) {
      return res.status(404).json({ message: "Hóa đơn không tìm thấy" });
    }

    // Xử lý thông tin thuốc và tổng giá
    let tongGiaThuoc = 0;
    const danhSachThuoc = [];

    if (hoaDon.benhAn && hoaDon.benhAn.donThuoc) {
      for (const donThuoc of hoaDon.benhAn.donThuoc) {
        for (const thuoc of donThuoc.thuoc) {
          if (thuoc.tenThuoc) {
            const thuocDetail = {
              tenVatTu: thuoc.tenThuoc.tenVatTu,
              gia: thuoc.tenThuoc.gia || 0,
              lieuDung: thuoc.lieuDung,
              soLanUong: thuoc.soLanUong,
              ghiChu: thuoc.ghiChu || "",
            };
            tongGiaThuoc += thuoc.tenThuoc.gia || 0;
            danhSachThuoc.push(thuocDetail);
          }
        }
      }
    }

    res.status(200).json({
      success: true,
      hoaDon: {
        ...hoaDon.toObject(),
        tongGiaThuoc,
        danhSachThuoc,
      },
    });
  } catch (error) {
    console.error(`Error fetching invoice by ID: ${id}`, error.message);
    res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
};

// Lấy hóa đơn theo ID bệnh án
export const getInvoicesByMedicalRecordId = async (req, res) => {
  const { benhAnId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(benhAnId)) {
    return res.status(400).json({ message: "ID bệnh án không hợp lệ" });
  }

  try {
    const hoaDons = await HoaDon.find({ benhAn: benhAnId })
      .populate("bacSi", "ten chuyenKhoa giaKham")
      .populate("lichHen", "ngayHen gioHen")
      .populate({
        path: "benhAn",
        populate: {
          path: "benhNhan",
          select: "ten ngaySinh gioiTinh",
        },
      })
      .populate({
        path: "benhAn",
        populate: {
          path: "donThuoc",
          populate: {
            path: "thuoc.tenThuoc",
            model: "ThuocVatTu",
          },
        },
      });

    if (!hoaDons || hoaDons.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy hóa đơn cho bệnh án này" });
    }

    const results = hoaDons.map((hoaDon) => {
      let tongGiaThuoc = 0;
      const danhSachThuoc = [];

      if (hoaDon.benhAn && hoaDon.benhAn.donThuoc) {
        for (const donThuoc of hoaDon.benhAn.donThuoc) {
          for (const thuoc of donThuoc.thuoc) {
            if (thuoc.tenThuoc) {
              const thuocDetail = {
                tenVatTu: thuoc.tenThuoc.tenVatTu,
                gia: thuoc.tenThuoc.gia || 0,
                lieuDung: thuoc.lieuDung,
                soLanUong: thuoc.soLanUong,
                ghiChu: thuoc.ghiChu || "",
              };
              tongGiaThuoc += thuoc.tenThuoc.gia || 0;
              danhSachThuoc.push(thuocDetail);
            }
          }
        }
      }

      return {
        ...hoaDon.toObject(),
        tongGiaThuoc,
        danhSachThuoc,
      };
    });

    res.status(200).json({
      success: true,
      hoaDons: results,
    });
  } catch (error) {
    console.error(`Error fetching invoices by medical record ID: ${benhAnId}`, error.message);
    res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
};
