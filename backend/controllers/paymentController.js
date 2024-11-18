import mongoose from "mongoose";
import axios from "axios";
import crypto from "crypto";
import HoaDon from "../models/HoaDonSchema.js";
import BenhAn from "../models/BenhAnSchema.js";
import BenhNhan from "../models/BenhNhanSchema.js";

const MOMO_ENDPOINT = "https://test-payment.momo.vn/v2/gateway/api/create";
const MOMO_PARTNER_CODE = "MOMO";
const MOMO_ACCESS_KEY = "F8BBA842ECF85";
const MOMO_SECRET_KEY = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
// const MOMO_REDIRECT_URL = "https://your-frontend.com/payment-success";
 const MOMO_REDIRECT_URL = "http://localhost:3000/doctor/danhsachbenhan"
const MOMO_IPN_URL = "https://your-backend.com/api/v1/payment/momo-ipn";

// Kiểm tra biến môi trường
if (!MOMO_ENDPOINT || !MOMO_PARTNER_CODE || !MOMO_ACCESS_KEY || !MOMO_SECRET_KEY || !MOMO_REDIRECT_URL || !MOMO_IPN_URL) {
console.log("MOMO_ENDPOINT:", process.env.MOMO_ENDPOINT);
console.log("MOMO_PARTNER_CODE:", process.env.MOMO_PARTNER_CODE);
console.log("MOMO_ACCESS_KEY:", process.env.MOMO_ACCESS_KEY);
console.log("MOMO_SECRET_KEY:", process.env.MOMO_SECRET_KEY);
console.log("MOMO_REDIRECT_URL:", process.env.MOMO_REDIRECT_URL);
console.log("MOMO_IPN_URL:", process.env.MOMO_IPN_URL);

  console.error("Thiếu cấu hình MoMo trong biến môi trường");
  process.exit(1);
}



// Tạo chữ ký
const generateSignature = (params) => {
  const rawSignature = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  console.log("Chuỗi rawSignature:", rawSignature);

  return crypto.createHmac("sha256", MOMO_SECRET_KEY).update(rawSignature).digest("hex");
};

// Tạo thanh toán qua MoMo
export const createMoMoPayment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }

  try {
    const hoaDon = await HoaDon.findById(id);
    if (!hoaDon) {
      return res.status(404).json({ message: "Hóa đơn không tồn tại" });
    }

    const orderId = `${MOMO_PARTNER_CODE}-${new Date().getTime()}`;
    const requestId = orderId;

    const params = {
      partnerCode: MOMO_PARTNER_CODE,
      accessKey: MOMO_ACCESS_KEY,
      requestId,
      amount: hoaDon.tongTien,
      orderId,
      orderInfo: `Thanh toán hóa đơn #${id}`,
      redirectUrl: MOMO_REDIRECT_URL,
      ipnUrl: MOMO_IPN_URL,
      requestType: "payWithMethod",
      extraData: "",
    };

    params.signature = generateSignature(params);

    const response = await axios.post(MOMO_ENDPOINT, params, {
      headers: { "Content-Type": "application/json" },
    });

    const { payUrl, resultCode, message } = response.data;

    if (resultCode === 0) {
      console.log("resultCode", resultCode);
      hoaDon.orderId = orderId;
      hoaDon.trangThaiThanhToan="daThanhToan"
      await hoaDon.save();
      return res.status(200).json({ success: true, payUrl });
    } else {
      return res.status(400).json({ success: false, message });
    }
  } catch (error) {
    console.error("Error creating MoMo payment:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
};

// Xử lý IPN từ MoMo
export const handleMoMoIpn = async (req, res) => {
  const { orderId, resultCode, message, signature } = req.body;

  try {
    const hoaDon = await HoaDon.findOne({ orderId });
    if (!hoaDon) {
      return res.status(404).json({ success: false, message: "Hóa đơn không tìm thấy" });
    }

    const dataToVerify = { ...req.body };
    delete dataToVerify.signature;

    const validSignature = generateSignature(dataToVerify) === signature;

    if (!validSignature) {
      return res.status(400).json({ success: false, message: "Chữ ký không hợp lệ" });
    }

    if (resultCode === 0) {
      hoaDon.trangThaiThanhToan = "daThanhToan";
      hoaDon.ngayThanhToan = new Date();
      await hoaDon.save();
      console.log(`Hóa đơn ${hoaDon._id} đã được thanh toán thành công.`);
      return res.status(200).json({ success: true, message: "Xác nhận thanh toán thành công" });
    } else {
      hoaDon.trangThaiThanhToan = "giaoDichThatBai";
      await hoaDon.save();
      console.log(`Hóa đơn ${hoaDon._id} giao dịch thất bại.`);
      return res.status(400).json({ success: false, message: "Giao dịch thất bại" });
    }
  } catch (error) {
    console.error("Error handling MoMo IPN:", error.message);
    res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
};







/////////////////////////////////////////////////////

// Tạo hóa đơn mới
export const newPayment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }

  try {
    // Kiểm tra nếu đã tồn tại hóa đơn cho bệnh án này
    let hoaDon = await HoaDon.findOne({ benhAn: id })
      .populate("bacSi")
      .populate("lichHen")
      .populate({
        path: "benhAn",
        populate: {
          path: "donThuoc",
          populate: { path: "thuoc.tenThuoc", model: "ThuocVatTu" },
        },
      })
      .populate({
        path: "benhAn",
        populate: { path: "ketQuaXetNghiem", populate: { path: "xetNghiem" } },
      });

    if (hoaDon) {
      // Nếu đã có hóa đơn, trả về hóa đơn hiện có
      return res.status(200).json({
        success: true,
        message: "Bệnh án đã có hóa đơn.",
        hoaDon,
      });
    }

    // Nếu chưa có, tạo hóa đơn mới
    const benhAn = await BenhAn.findById(id)
      .populate("bacSi")
      .populate("donThuoc")
      .populate({ path: "ketQuaXetNghiem", populate: { path: "xetNghiem" } });

    if (!benhAn) {
      return res.status(404).json({ message: "Bệnh án không tìm thấy" });
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

    hoaDon = new HoaDon({
      bacSi: benhAn.bacSi._id,
      lichHen: benhAn.lichHen?.[0],
      ngayLap: new Date(),
      tongTien,
      benhAn: benhAn._id,
      trangThaiThanhToan: "chuaThanhToan",
      loaiHoaDon: req.body.loaiHoaDon || "momo",
    });

    await hoaDon.save();

    res.status(201).json({ success: true, message: "Tạo hóa đơn thành công", hoaDon });
  } catch (error) {
    console.error("Error creating new payment:", error.message);
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