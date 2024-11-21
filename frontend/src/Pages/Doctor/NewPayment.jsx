import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import { Modal, Button, Spinner } from "react-bootstrap";

const NewPaymentPage = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const { token } = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/payment/getpayment/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setInvoice(response.data.hoaDon);
        } else {
          toast.error("Không tìm thấy hóa đơn!");
        }
      } catch (error) {
        console.error("Error fetching invoice:", error);
        toast.error("Có lỗi xảy ra khi tải hóa đơn!");
      }
    };

    fetchInvoice();
  }, [id, token]);

  const handleMoMoPayment = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/payment/momo/${invoice._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success && response.data.payUrl) {
        window.location.href = response.data.payUrl; // Chuyển hướng đến URL thanh toán của MoMo
      } else {
        toast.error("Không thể tạo thanh toán qua MoMo.");
      }
    } catch (error) {
      console.error("Error creating MoMo payment:", error);
      toast.error("Có lỗi xảy ra khi tạo thanh toán qua MoMo.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/payment/confirmPayment/${invoice._id}`,
        { paymentMethod: invoice.loaiHoaDon },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("Thanh toán thành công!");
        setInvoice({ ...invoice, trangThaiThanhToan: "daThanhToan" });
        setShowConfirmModal(false);
      } else {
        toast.error("Thanh toán thất bại!");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      toast.error("Có lỗi xảy ra khi xác nhận thanh toán!");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!invoice) {
    return (
      <div className="text-center py-10">
        <Spinner animation="border" />
        <p className="mt-4">Đang tải hóa đơn...</p>
      </div>
    );
  }

  const {
    bacSi,
    ngayLap,
    tongTien,
    benhAn,
    trangThaiThanhToan,
    loaiHoaDon,
    danhSachThuoc = [],
    ketQuaXetNghiem = benhAn?.ketQuaXetNghiem,
  } = invoice;

  const totalXetNghiem = ketQuaXetNghiem.reduce(
    (sum, xetNghiem) => sum + (xetNghiem.xetNghiem?.giaXetNghiem || 0),
    0
  );

  const totalThuoc = danhSachThuoc.reduce(
    (sum, thuoc) => sum + (thuoc.gia || 0),
    0
  );

  return (
    <div className="bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-600 mb-2">
            Chi tiết hóa đơn
          </h1>
          <p className="text-gray-500">
            Mã hóa đơn: <span className="font-semibold">{invoice._id}</span>
          </p>
        </div>

        {/* Thông tin hóa đơn */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Thông tin hóa đơn
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <p>
              <strong>Bác sĩ:</strong> {bacSi?.ten || "Không rõ"}
            </p>
            <p>
              <strong>Chuyên khoa:</strong> {bacSi?.chuyenKhoa || "Không rõ"}
            </p>
            <p>
              <strong>Ngày lập:</strong>{" "}
              {new Date(ngayLap).toLocaleDateString()}
            </p>
            <p>
              <strong>Trạng thái:</strong>
              <span
                className={`font-bold px-2 py-1 rounded ${
                  trangThaiThanhToan === "chuaThanhToan"
                    ? "text-yellow-500 border border-yellow-500"
                    : "text-green-500 border border-green-500"
                }`}
              >
                {trangThaiThanhToan === "chuaThanhToan"
                  ? "Chưa thanh toán"
                  : "Hoàn thành"}
              </span>
            </p>
            <p>
              <strong>Loại hóa đơn:</strong> {loaiHoaDon}
            </p>
            <p>
              <strong>Tổng tiền:</strong>{" "}
              <span className="text-red-500 font-bold">{tongTien} VND</span>
            </p>
          </div>
        </section>

        {/* Thông tin bệnh nhân */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Thông tin bệnh nhân
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <p>
              <strong>Họ tên:</strong> {benhAn?.benhNhan?.ten || "Không rõ"}
            </p>
            <p>
              <strong>Ngày sinh:</strong>{" "}
              {new Date(benhAn?.benhNhan?.ngaySinh).toLocaleDateString()}
            </p>
            <p>
              <strong>Giới tính:</strong>{" "}
              {benhAn?.benhNhan?.gioiTinh === "nu" ? "Nữ" : "Nam"}
            </p>
            <p>
              <strong>Chẩn đoán:</strong> {benhAn?.chanDoan || "Không rõ"}
            </p>
            <p>
              <strong>Triệu chứng:</strong> {benhAn?.trieuChung || "Không rõ"}
            </p>
          </div>
        </section>

        {/* Thông tin xét nghiệm */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Thông tin xét nghiệm
          </h2>
          {ketQuaXetNghiem?.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">Loại xét nghiệm</th>
                  <th className="p-2 border">Kết quả</th>
                  <th className="p-2 border">Giá</th>
                </tr>
              </thead>
              <tbody>
                {ketQuaXetNghiem.map((xetNghiem, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-2 border">
                      {xetNghiem.xetNghiem?.loaiXetNghiem}
                    </td>
                    <td className="p-2 border">{xetNghiem.ketQua}</td>
                    <td className="p-2 border">
                      {xetNghiem.xetNghiem?.giaXetNghiem} VND
                    </td>
                  </tr>
                ))}
                <tr className="font-bold bg-gray-50">
                  <td className="p-2 border" colSpan="2">
                    Tổng phí xét nghiệm
                  </td>
                  <td className="p-2 border">{totalXetNghiem} VND</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Không có xét nghiệm nào trong hóa đơn.</p>
          )}
        </section>

        {/* Danh sách thuốc */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Danh sách thuốc
          </h2>
          {danhSachThuoc?.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-teal-100 text-left">
                  <th className="p-3 border">Tên thuốc</th>
                  <th className="p-3 border">Liều dùng</th>
                  <th className="p-3 border">Số lần uống</th>
                  <th className="p-3 border">Giá</th>
                  <th className="p-3 border">Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {danhSachThuoc.map((thuoc, index) => (
                  <tr key={index} className="hover:bg-teal-50">
                    <td className="p-3 border">{thuoc.tenVatTu}</td>
                    <td className="p-3 border">{thuoc.lieuDung}</td>
                    <td className="p-3 border">{thuoc.soLanUong}</td>
                    <td className="p-3 border">{thuoc.gia} VND</td>
                    <td className="p-3 border">{thuoc.ghiChu}</td>
                  </tr>
                ))}
                <tr className="font-bold bg-teal-50">
                  <td className="p-3 border" colSpan="3">
                    Tổng phí thuốc
                  </td>
                  <td className="p-3 border">{totalThuoc} VND</td>
                  <td className="p-3 border"></td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Không có thuốc trong hóa đơn.</p>
          )}
        </section>

        {/* Nút thanh toán qua MoMo */}
        {trangThaiThanhToan === "chuaThanhToan" && (
          <div className="text-center mt-8 space-x-4">
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg shadow-md"
              onClick={() => setShowConfirmModal(true)}
            >
              Xác nhận thanh toán
            </button>
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg shadow-md"
              onClick={handleMoMoPayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Thanh toán bằng MoMo"
              )}
            </button>
          </div>
        )}

        <Modal
          show={showConfirmModal}
          onHide={() => setShowConfirmModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận thanh toán</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có chắc chắn muốn thanh toán hóa đơn này với tổng số tiền là{" "}
            <strong>{tongTien} VND</strong>?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmModal(false)}
            >
              Hủy
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirmPayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Xác nhận"
              )}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="back-button"
        style={{ marginLeft: " 1100px", marginTop: "30px" }}
      >
        Quay lại
      </button>
    </div>
  );
};

export default NewPaymentPage;
