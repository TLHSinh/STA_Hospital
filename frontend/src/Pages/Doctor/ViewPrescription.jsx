import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Button } from '@mui/material';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';

const ViewPrescription = () => {
  const { appointmentId } = useParams();  // Lấy ID từ URL
  const [benhAn, setBenhAn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchBenhAn = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/mdcRecord/getmdcRecord/${appointmentId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result.success) {
          setBenhAn(result.medicalRecord); // Lưu bệnh án vào state
        } else {
          setError(result.message); // Xử lý khi có lỗi
        }
      } catch (err) {
        setError('Có lỗi xảy ra!');
      } finally {
        setLoading(false); // Đảm bảo dừng loading
      }
    };

    fetchBenhAn();
  }, [appointmentId, token]);

  if (loading) return <CircularProgress />; // Hiển thị loading nếu đang tải
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Lỗi: {error}</p>; // Hiển thị lỗi nếu có

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f8fb', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', color: '#66B5A3' }}>Thông Tin Bệnh Án</h2>
      {benhAn ? (
        <div>
          <h3>Bệnh Nhân: {benhAn.benhNhan.ten}</h3>
          <p><strong>Email:</strong> {benhAn.benhNhan.email}</p>
          <p><strong>Số Điện Thoại:</strong> {benhAn.benhNhan.soDienThoai}</p>

          <h3>Bác Sĩ: {benhAn.bacSi.ten}</h3>
          <p><strong>Email:</strong> {benhAn.bacSi.email}</p>

          <h3>Chẩn Đoán: {benhAn.chanDoan}</h3>
          <h3>Triệu Chứng: {benhAn.trieuChung}</h3>

          <h3>Phương Pháp Điều Trị:</h3>
          <p>{benhAn.phuongPhapDieuTri}</p>

          <h3>Tiền Sử Bệnh Lý:</h3>
          <p>{benhAn.tienSuBenhLy}</p>

          <h3>Kết Quả Xét Nghiệm:</h3>
          <ul>
            {benhAn.ketQuaXetNghiem.length > 0 ? (
              benhAn.ketQuaXetNghiem.map((result, index) => (
                <li key={index}>{result.tenXetNghiem}: {result.ketQua}</li>
              ))
            ) : (
              <li>Không có kết quả xét nghiệm.</li>
            )}
          </ul>

          <h3>Đơn Thuốc:</h3>
          <ul>
            {benhAn.donThuoc.length > 0 ? (
              benhAn.donThuoc.map((medicine, index) => (
                <li key={index}>{medicine.tenThuoc} - {medicine.huongDanSuDung}</li>
              ))
            ) : (
              <li>Chưa có đơn thuốc.</li>
            )}
          </ul>

          <h3>Lịch Hẹn:</h3>
          <ul>
            {benhAn.lichHen.length > 0 ? (
              benhAn.lichHen.map((lichHen, index) => (
                <li key={index}>
                  Ngày: {new Date(lichHen.ngayHen).toLocaleDateString()} - Thời gian: {lichHen.thoiGianBatDau} đến {lichHen.thoiGianKetThuc}
                </li>
              ))
            ) : (
              <li>Không có lịch hẹn.</li>
            )}
          </ul>

          <h3>Đánh Giá Quá Trình Điều Trị:</h3>
          <p>{benhAn.danhGiaDieuTri || 'Chưa có đánh giá'}</p>

          <h3>Trạng Thái:</h3>
          <p>{benhAn.trangThai}</p>
        </div>
      ) : (
        <p>Không có thông tin bệnh án cho lịch hẹn này.</p>
      )}
    </div>
  );
};

export default ViewPrescription;
