import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';

const NewPaymentPage = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/payment/getpayment/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setInvoice(response.data.hoaDon);
        } else {
          toast.error('Không tìm thấy hóa đơn!');
        }
      } catch (error) {
        console.error('Error fetching invoice:', error);
        toast.error('Có lỗi xảy ra khi tải hóa đơn!');
      }
    };

    fetchInvoice();
  }, [id, token]);

  if (!invoice) {
    return <div className="loading">Đang tải hóa đơn...</div>;
  }

  const {
    bacSi,
    ngayLap,
    tongTien,
    benhAn,
    trangThaiThanhToan,
    loaiHoaDon,
    danhSachThuoc,
    ketQuaXetNghiem = benhAn?.ketQuaXetNghiem,
  } = invoice;

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-teal-600">Chi tiết hóa đơn</h1>
          <p className="text-gray-600">Mã hóa đơn: <span className="font-semibold">{invoice._id}</span></p>
        </div>

        {/* Thông tin hóa đơn */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Thông tin hóa đơn</h2>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Bác sĩ:</strong> {bacSi?.ten || 'Không rõ'}</p>
            <p><strong>Chuyên khoa:</strong> {bacSi?.chuyenKhoa || 'Không rõ'}</p>
            <p><strong>Giá khám:</strong> {bacSi?.giaKham} VND</p>
            <p><strong>Ngày lập:</strong> {new Date(ngayLap).toLocaleDateString()}</p>
            <p><strong>Trạng thái thanh toán:</strong> {trangThaiThanhToan}</p>
            <p><strong>Loại hóa đơn:</strong> {loaiHoaDon}</p>
            <p><strong>Tổng tiền:</strong> <span className="text-red-500 font-bold">{tongTien} VND</span></p>
          </div>
        </div>

        {/* Thông tin bệnh nhân */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Thông tin bệnh nhân</h2>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Họ tên:</strong> {benhAn?.benhNhan?.ten || 'Không rõ'}</p>
            <p><strong>Ngày sinh:</strong> {new Date(benhAn?.benhNhan?.ngaySinh).toLocaleDateString()}</p>
            <p><strong>Giới tính:</strong> {benhAn?.benhNhan?.gioiTinh === 'nu' ? 'Nữ' : 'Nam'}</p>
            <p><strong>Chẩn đoán:</strong> {benhAn?.chanDoan || 'Không rõ'}</p>
            <p><strong>Triệu chứng:</strong> {benhAn?.trieuChung || 'Không rõ'}</p>
            <p><strong>Phương pháp điều trị:</strong> {benhAn?.phuongPhapDieuTri || 'Không rõ'}</p>
            <p><strong>Trạng thái bệnh án:</strong> {benhAn?.trangThai || 'Không rõ'}</p>
          </div>
        </div>

        {/* Thông tin xét nghiệm */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Thông tin xét nghiệm</h2>
          {ketQuaXetNghiem?.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">Loại xét nghiệm</th>
                  <th className="p-2 border">Kết quả</th>
                  <th className="p-2 border">Giá xét nghiệm</th>
                </tr>
              </thead>
              <tbody>
                {ketQuaXetNghiem.map((xetNghiem, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-2 border">{xetNghiem.xetNghiem?.loaiXetNghiem}</td>
                    <td className="p-2 border">{xetNghiem.ketQua}</td>
                    <td className="p-2 border">{xetNghiem.xetNghiem?.giaXetNghiem} VND</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">Không có xét nghiệm nào trong hóa đơn.</p>
          )}
        </div>

        {/* Danh sách thuốc */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Danh sách thuốc</h2>
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
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">Không có thuốc trong hóa đơn.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewPaymentPage;
