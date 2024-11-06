import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField, Button, CircularProgress, Box, Typography, Autocomplete, Card, CardContent, Divider, Paper
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const KeDonThuoc = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [benhNhan, setBenhNhan] = useState(null);
  const [bacSi, setBacSi] = useState(null);
  const [ketQuaXetNghiem, setKetQuaXetNghiem] = useState([]);
  const [donThuoc, setDonThuoc] = useState([]);
  const [benhAn, setBenhAn] = useState(null);
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
          setBenhNhan(benhNhan);
          setBacSi(bacSi);
          setKetQuaXetNghiem(ketQuaXetNghiem);
          setDonThuoc(donThuoc);
          setBenhAn(res.data.benhAn);
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
        const res = await axios.get(`${BASE_URL}/api/v1/inventory/`, {
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
        { bacSiId, thuocList, loiKhuyen },
        { headers: { Authorization: `Bearer ${token}` } }
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
    <Box sx={{ padding: 4,
      borderRadius: 3,
      margin: '30px auto',
      maxWidth: 900,
      backgroundColor: '#ffffff',
      boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/doctor/danhsachlichhenBS')}
          sx={{ color: '#00796B', fontWeight: 'bold' }}
        >
          Quay lại
        </Button>
      </Box>

      <Typography variant="h4" align="center" gutterBottom color="primary" sx={{ fontWeight: 'bold', marginBottom: '40px'}} >
        Kê Đơn Thuốc
      </Typography>

      <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px', borderRadius: '12px', bgcolor: '#ffffff' }}>
        {benhNhan && benhAn && (
          <CardContent>
            <Typography variant="h6" color="#0b8fac" sx={{ fontWeight: 'bold' }}>Thông tin bệnh nhân</Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography><strong>Tên:</strong> {benhNhan.ten}</Typography>
            <Typography><strong>Ngày sinh:</strong> {benhNhan.ngaySinh}</Typography>
            <Typography><strong>Địa chỉ:</strong> {benhNhan.diaChi}</Typography>

            <Typography variant="h6" sx={{ marginTop: 3, fontWeight: 'bold' }} color="#0b8fac">Thông tin bệnh án</Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography><strong>Chẩn đoán:</strong> {benhAn.chanDoan}</Typography>
            <Typography><strong>Triệu chứng:</strong> {benhAn.trieuChung}</Typography>
            <Typography><strong>Phương pháp điều trị:</strong> {benhAn.phuongPhapDieuTri}</Typography>
            <Typography><strong>Tiền sử bệnh lý:</strong> {benhAn.tienSuBenhLy}</Typography>

            {bacSi && (
              <>
                <Typography variant="h6" sx={{ marginTop: 3, fontWeight: 'bold' }} color="#0b8fac">Thông tin bác sĩ</Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Typography><strong>Tên:</strong> {user.ten}</Typography>
                <Typography><strong>Chức vụ:</strong> {user.role}</Typography>
              </>
            )}
          </CardContent>
        )}
      </Paper>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Lời khuyên"
          value={loiKhuyen}
          onChange={(e) => setLoiKhuyen(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{ bgcolor: '#e8f0fe', borderRadius: '8px' }}
        />

        <Typography variant="h6" sx={{ marginTop: 3, fontWeight: 'bold' }} color="textSecondary">Danh sách thuốc</Typography>
        <Divider sx={{ marginBottom: 2 }} />
        {thuocList.map((thuoc, index) => (
          <Box key={index} display="flex" gap="10px" alignItems="center" marginBottom="20px">
            <Autocomplete
              options={availableThuocs}
              getOptionLabel={(option) => option.tenVatTu}
              onChange={(e, value) => handleThuocChange(index, 'thuocId', value?._id || '')}
              renderInput={(params) => <TextField {...params} label="Chọn thuốc" required variant="outlined" sx={{ bgcolor: '#e8f0fe', borderRadius: '8px' }} />}
              sx={{ width: '200px' }}
            />
            <TextField
              label="Liều Dùng"
              value={thuoc.lieuDung}
              onChange={(e) => handleThuocChange(index, 'lieuDung', e.target.value)}
              required
              variant="outlined"
              sx={{ bgcolor: '#e8f0fe', borderRadius: '8px' }}
            />
            <TextField
              label="Số Lần Uống"
              type="number"
              value={thuoc.soLanUong}
              onChange={(e) => handleThuocChange(index, 'soLanUong', e.target.value)}
              required
              variant="outlined"
              sx={{ bgcolor: '#e8f0fe', borderRadius: '8px' }}
            />
            <TextField
              label="Ghi Chú"
              value={thuoc.ghiChu}
              onChange={(e) => handleThuocChange(index, 'ghiChu', e.target.value)}
              variant="outlined"
              sx={{ bgcolor: '#e8f0fe', borderRadius: '8px' }}
            />
          </Box>
        ))}
        <Button variant="outlined" onClick={addThuocField} sx={{ marginBottom: 2, color: '#4a90e2', borderColor: '#4a90e2' }}>
          Thêm thuốc
        </Button>

        <Box display="flex" gap={2}>
          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            sx={{ minWidth: '150px', bgcolor: '#4a90e2', color: 'white' }}
          >
            {submitting ? <CircularProgress size={24} /> : 'Kê Đơn Thuốc'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setThuocList([{ thuocId: '', lieuDung: '', soLanUong: '', ghiChu: '' }]);
              setLoiKhuyen('');
            }}
            sx={{ color: '#ff7043', borderColor: '#ff7043' }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default KeDonThuoc;
