import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, CircularProgress, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../config.js';
import { AuthContext } from '../../../context/AuthContext.jsx';

const KeBenhAn = () => {
  const { id } = useParams(); // Lấy ID lịch hẹn từ URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Trạng thái loading khi lấy dữ liệu bệnh nhân
  const [benhNhan, setBenhNhan] = useState(null); // Thông tin bệnh nhân
  const [submitting, setSubmitting] = useState(false); // Trạng thái khi đang gửi yêu cầu kê bệnh án
  const [chanDoan, setChanDoan] = useState('');
  const [trieuChung, setTrieuChung] = useState('');
  const [phuongPhapDieuTri, setPhuongPhapDieuTri] = useState('');
  const [tienSuBenhLy, setTienSuBenhLy] = useState('');
  const [danhGiaDieuTri, setDanhGiaDieuTri] = useState('');
  const [ketQuaXetNghiem, setKetQuaXetNghiem] = useState([]); // Danh sách kết quả xét nghiệm (ID)
  const { token, user } = useContext(AuthContext); // Lấy thông tin người dùng và token từ context
  const bacSiId = user._id; // ID của bác sĩ hiện tại

  useEffect(() => {
    // Lấy thông tin bệnh nhân theo lịch hẹn
    const fetchBenhNhan = async () => {
      try {
        // Gửi yêu cầu đến API để lấy thông tin bệnh nhân dựa trên ID lịch hẹn
        const res = await fetch(`${BASE_URL}/api/v1/bookings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token để xác thực
          },
        });
        const result = await res.json();
  
        // Kiểm tra response từ API và cập nhật thông tin bệnh nhân
        if (result.success && result.booking && result.booking.benhNhan) {
          setBenhNhan(result.booking.benhNhan); // Lưu thông tin bệnh nhân vào state
        } else {
          console.error('Không tìm thấy thuộc tính benhNhan trong response');
          toast.error('Không thể lấy thông tin bệnh nhân');
        }
      } catch (err) {
        toast.error(`Lỗi: ${err.message}`); // Hiển thị lỗi nếu yêu cầu thất bại
      } finally {
        setLoading(false); // Tắt trạng thái loading sau khi hoàn tất yêu cầu
      }
    };
    fetchBenhNhan();
  }, [id, token]); // useEffect phụ thuộc vào id và token

  const handleKeBenhAn = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    const ngayKham = new Date().toISOString(); // Lấy ngày khám hiện tại
    setSubmitting(true); // Bắt đầu gửi yêu cầu kê bệnh án
    try {
      // Gửi yêu cầu POST để tạo bệnh án mới
      const res = await fetch(`${BASE_URL}/api/v1/medicalRecord//mdcRecord-appoint/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Thêm token để xác thực
        },
        body: JSON.stringify({
          benhNhanId: benhNhan._id, // ID bệnh nhân lấy từ thông tin lịch hẹn
          bacSiId, // ID bác sĩ hiện tại
          chanDoan, // Chẩn đoán từ form
          trieuChung, // Triệu chứng từ form
          phuongPhapDieuTri, // Phương pháp điều trị từ form
          tienSuBenhLy, // Tiền sử bệnh lý từ form
          danhGiaDieuTri, // Đánh giá điều trị từ form
          ngayKham, // Ngày khám hiện tại
          ketQuaXetNghiem, // Danh sách kết quả xét nghiệm (ID)
          trangThai: 'dangDieuTri', // Trạng thái bệnh án
        }),
      });

      const result = await res.json();
      if (result.success) {
        toast.success('Kê bệnh án thành công'); // Hiển thông báo thành công
        navigate('/doctor/danhsachlichhenBS'); // Chuyển hướng về trang danh sách lịch hẹn
      } else {
        toast.error(result.message || 'Kê bệnh án thất bại'); // Hiển thông báo lỗi nếu tạo bệnh án thất bại
      }
    } catch (err) {
      toast.error(`Lỗi: ${err.message}`); // Hiển thị lỗi nếu yêu cầu thất bại
    } finally {
      setSubmitting(false); // Kết thúc trạng thái gửi yêu cầu kê bệnh án
    }
  };

  const handleKeDonThuoc = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    const ngayKham = new Date().toISOString(); // Lấy ngày khám hiện tại
    setSubmitting(true); // Bắt đầu gửi yêu cầu kê bệnh án
    try {
      // Gửi yêu cầu POST để tạo bệnh án mới
      const res = await fetch(`${BASE_URL}/api/v1/medicalRecord//mdcRecord-appoint/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Thêm token để xác thực
        },
        body: JSON.stringify({
          benhNhanId: benhNhan._id, // ID bệnh nhân lấy từ thông tin lịch hẹn
          bacSiId, // ID bác sĩ hiện tại
          chanDoan, // Chẩn đoán từ form
          trieuChung, // Triệu chứng từ form
          phuongPhapDieuTri, // Phương pháp điều trị từ form
          tienSuBenhLy, // Tiền sử bệnh lý từ form
          danhGiaDieuTri, // Đánh giá điều trị từ form
          ngayKham, // Ngày khám hiện tại
          ketQuaXetNghiem, // Danh sách kết quả xét nghiệm (ID)
          trangThai: 'dangDieuTri', // Trạng thái bệnh án
        }),
      });

      const result = await res.json();
      if (result.success) {
        toast.success('Kê bệnh án thành công'); // Hiển thông báo thành công
        navigate(`/doctor/kedonthuoc/${result.benhAn._id}`); // Chuyển hướng sang trang thêm đơn thuốc
      } else {
        toast.error(result.message || 'Kê bệnh án thất bại'); // Hiển thông báo lỗi nếu tạo bệnh án thất bại
      }
    } catch (err) {
      toast.error(`Lỗi: ${err.message}`); // Hiển thị lỗi nếu yêu cầu thất bại
    } finally {
      setSubmitting(false); // Kết thúc trạng thái gửi yêu cầu kê bệnh án
    }
  };

  // Nếu đang loading, hiển thị vòng quay chờ
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Kê Bệnh Án</h1>
      {/* Hiển thị thông tin bệnh nhân nếu đã lấy được */}
      {benhNhan && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Thông tin bệnh nhân</h3>
          <Typography><strong>Tên:</strong> {benhNhan.ten}</Typography>
          <Typography><strong>Tuổi:</strong> {benhNhan.tuoi}</Typography>
          <Typography><strong>Giới tính:</strong> {benhNhan.gioiTinh}</Typography>
        </div>
      )}
      {/* Form kê bệnh án */}
      <form>
        <div>
          <TextField
            label="Chẩn đoán"
            value={chanDoan}
            onChange={(e) => setChanDoan(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        </div>
        <div>
          <TextField
            label="Triệu chứng"
            value={trieuChung}
            onChange={(e) => setTrieuChung(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        </div>
        <div>
          <TextField
            label="Phương pháp điều trị"
            value={phuongPhapDieuTri}
            onChange={(e) => setPhuongPhapDieuTri(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        </div>
        <div>
          <TextField
            label="Tiền sử bệnh lý"
            value={tienSuBenhLy}
            onChange={(e) => setTienSuBenhLy(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Đánh giá điều trị"
            value={danhGiaDieuTri}
            onChange={(e) => setDanhGiaDieuTri(e.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Kết quả xét nghiệm (ID)"
            value={ketQuaXetNghiem}
            onChange={(e) => setKetQuaXetNghiem(e.target.value.split(','))} // Chuyển giá trị nhập thành danh sách các ID
            fullWidth
            margin="normal"
          />
        </div>

        <div style={{ marginTop: '20px' }}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            disabled={submitting}
            onClick={handleKeBenhAn}
          >
            {submitting ? <CircularProgress size={24} /> : 'Kê bệnh án'}
          </Button>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            disabled={submitting}
            onClick={handleKeDonThuoc}
            style={{ marginLeft: '10px' }}
          >
            {submitting ? <CircularProgress size={24} /> : 'Kê đơn thuốc'}
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            style={{ marginLeft: '10px' }}
            onClick={() => {
              // Reset các giá trị của form về rỗng
              setChanDoan('');
              setTrieuChung('');
              setPhuongPhapDieuTri('');
              setTienSuBenhLy('');
              setDanhGiaDieuTri('');
              setKetQuaXetNghiem([]);
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default KeBenhAn;
