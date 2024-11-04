import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Box, Typography, Autocomplete } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';

const KeDonThuoc = () => {
  const { id } = useParams(); // Lấy ID bệnh án từ URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [benhNhan, setBenhNhan] = useState(null);
  const [bacSi, setBacSi] = useState(null); // Thông tin bác sĩ
  const [ketQuaXetNghiem, setKetQuaXetNghiem] = useState([]); // Danh sách kết quả xét nghiệm
  const [donThuoc, setDonThuoc] = useState([]); // Thông tin đơn thuốc
 
  const [benhAn, setBenhAn] = useState(null); // Thông tin bệnh án
  const [submitting, setSubmitting] = useState(false);
  const [bacSiId, setBacSiId] = useState('');
  const [thuocList, setThuocList] = useState([{ thuocId: '', lieuDung: '', soLanUong: '', ghiChu: '' }]);
  const [loiKhuyen, setLoiKhuyen] = useState('');
  const [availableThuocs, setAvailableThuocs] = useState([]);
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    setBacSiId(user._id);

    const fetchBenhAn = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/medicalRecord/getmdcRecord/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success && res.data.benhAn) {
          const { benhNhan, bacSi, ketQuaXetNghiem, donThuoc } = res.data.benhAn;
          setBenhNhan(benhNhan); // Lưu thông tin bệnh nhân
          setBacSi(bacSi); // Lưu thông tin bác sĩ
          setKetQuaXetNghiem(ketQuaXetNghiem); // Lưu kết quả xét nghiệm
          setDonThuoc(donThuoc); // Lưu thông tin đơn thuốc
         
          setBenhAn(res.data.benhAn); // Lưu thông tin bệnh án
        } else {
          toast.error('Không tìm thấy bệnh án');
        }
      } catch (err) {
        toast.error(`Lỗi: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    const fetchThuocs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/inventory/`, { // Lấy vật tư từ API
          headers: { Authorization: `Bearer ${token}` },
        });
        setAvailableThuocs(res.data.data || []);
      } catch (err) {
        toast.error(`Lỗi khi tải danh sách thuốc: ${err.message}`);
      }
    };

    fetchBenhAn();
    fetchThuocs();
  }, [id, token, user._id]);

  const handleThuocChange = (index, field, value) => {
    const newThuocList = [...thuocList];
    newThuocList[index][field] = value;
    setThuocList(newThuocList);
  };

  const addThuocField = () => {
    setThuocList([...thuocList, { thuocId: '', lieuDung: '', soLanUong: '', ghiChu: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/prescribe/presmdc/${id}`,
        {
          bacSiId,
          thuocList,
          loiKhuyen,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        toast.success('Kê đơn thuốc thành công');
        navigate('/doctor/danhsachlichhenBS');
      } else {
        toast.error(res.data.message || 'Kê đơn thuốc thất bại');
      }
    } catch (err) {
      toast.error(`Lỗi: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Kê Đơn Thuốc</h1>
      {benhNhan && benhAn && (
        <div style={{ marginBottom: '20px' }}>
          <Typography variant="h6">Thông tin bệnh nhân</Typography>
          <Typography><strong>Tên:</strong> {benhNhan.ten}</Typography>
          <Typography><strong>Ngày sinh:</strong> {benhNhan.ngaySinh}</Typography>
          <Typography><strong>Địa chỉ:</strong> {benhNhan.diaChi}</Typography>

          <Typography variant="h6" style={{ marginTop: '20px' }}>Thông tin bệnh án</Typography>
          <Typography><strong>Chẩn đoán:</strong> {benhAn.chanDoan}</Typography>
          <Typography><strong>Triệu chứng:</strong> {benhAn.trieuChung}</Typography>
          <Typography><strong>Phương pháp điều trị:</strong> {benhAn.phuongPhapDieuTri}</Typography>
          <Typography><strong>Tiền sử bệnh lý:</strong> {benhAn.tienSuBenhLy}</Typography>

          {bacSi && (
            <>
              <Typography variant="h6" style={{ marginTop: '20px' }}>Thông tin bác sĩ</Typography>
              <Typography><strong>Tên:</strong> {user.ten}</Typography>
              <Typography><strong>Chức vụ:</strong> {user.role}</Typography>
            </>
          )}

          {ketQuaXetNghiem.length > 0 && (
            <>
              <Typography variant="h6" style={{ marginTop: '20px' }}>Kết quả xét nghiệm</Typography>
              {ketQuaXetNghiem.map((xetNghiem, index) => (
                <Typography key={index}>
                  <strong>Ngày xét nghiệm:</strong> {xetNghiem.ngayXetNghiem}, <strong>Kết quả:</strong> {xetNghiem.ketQua}
                </Typography>
              ))}
            </>
          )}

          {donThuoc.length > 0 && (
            <>
              <Typography variant="h6" style={{ marginTop: '20px' }}>Thông tin đơn thuốc</Typography>
              {donThuoc.map((don, index) => (
                <Typography key={index}>
                  <strong>Ngày kê đơn:</strong> {don.ngayKeDon}
                </Typography>
              ))}
            </>
          )}

         
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Lời khuyên"
          value={loiKhuyen}
          onChange={(e) => setLoiKhuyen(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Typography variant="h6" style={{ marginTop: '20px' }}>Danh sách thuốc</Typography>
        {thuocList.map((thuoc, index) => (
          <Box key={index} display="flex" gap="10px" marginBottom="20px">
            <Autocomplete
              options={availableThuocs}
              getOptionLabel={(option) => option.tenVatTu}
              onChange={(e, value) => handleThuocChange(index, 'thuocId', value?._id || '')}
              renderInput={(params) => <TextField {...params} label="Chọn thuốc" required />}
              style={{ width: '200px' }}
            />
            <TextField
              label="Liều Dùng"
              value={thuoc.lieuDung}
              onChange={(e) => handleThuocChange(index, 'lieuDung', e.target.value)}
              required
            />
            <TextField
              label="Số Lần Uống"
              type="number"
              value={thuoc.soLanUong}
              onChange={(e) => handleThuocChange(index, 'soLanUong', e.target.value)}
              required
            />
            <TextField
              label="Ghi Chú"
              value={thuoc.ghiChu}
              onChange={(e) => handleThuocChange(index, 'ghiChu', e.target.value)}
            />
          </Box>
        ))}
        <Button variant="outlined" onClick={addThuocField}>Thêm thuốc</Button>
        <div style={{ marginTop: '20px' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={24} /> : 'Kê Đơn Thuốc'}
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            style={{ marginLeft: '10px' }}
            onClick={() => {
              setThuocList([{ thuocId: '', lieuDung: '', soLanUong: '', ghiChu: '' }]);
              setLoiKhuyen('');
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default KeDonThuoc;
