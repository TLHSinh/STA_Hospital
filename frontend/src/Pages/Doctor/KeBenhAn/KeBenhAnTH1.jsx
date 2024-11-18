import React, { useEffect, useState, useContext } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,


  
} from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';
import { BASE_URL } from '../../../config.js';
import { AuthContext } from '../../../context/AuthContext.jsx';

const KeBenhAn = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [benhNhan, setBenhNhan] = useState(null);
  const [formData, setFormData] = useState({
    chanDoan: '',
    trieuChung: '',
    phuongPhapDieuTri: '',
    tienSuBenhLy: '',
    danhGiaDieuTri: '',
    ketQuaXetNghiem: [],
    ngayTaiKham: '',
  });
  const { token, user } = useContext(AuthContext);
  const bacSiId = user._id;

  // State cho lịch sử bệnh án
  const [openHistoryDialog, setOpenHistoryDialog] = useState(false);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchBenhNhan = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();

        if (result.success && result.booking && result.booking.benhNhan) {
          setBenhNhan(result.booking.benhNhan);
        } else {
          toast.error('Không thể lấy thông tin bệnh nhân');
        }
      } catch (err) {
        toast.error(`Lỗi: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchBenhNhan();
  }, [id, token]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (type) => {
    setSubmitting(true);
    const payload = {
      ...formData,
      benhNhanId: benhNhan._id,
      bacSiId,
      ngayKham: new Date().toISOString(),
      trangThai: 'dangDieuTri',
    };

    try {
      const res = await fetch(`${BASE_URL}/api/v1/medicalRecord/mdcRecord-appoint/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success) {
        toast.success('Kê bệnh án thành công');
        if (type === 'donThuoc') {
          navigate(`/doctor/kedonthuoc/${result.benhAn._id}`);
        } else if (type === 'xetNghiem') {
          navigate(`/doctor/newTest/${result.benhAn._id}`);
        } else {
          navigate('/doctor/danhsachlichhenBS');
        }
      } else {
        toast.error(result.message || 'Kê bệnh án thất bại');
      }
    } catch (err) {
      toast.error(`Lỗi: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenHistory = async () => {
    setOpenHistoryDialog(true);
    setLoadingHistory(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/medicalRecord/getpatimdcRecord/${benhNhan._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        setMedicalRecords(result.paRecord || []);
      } else {
        toast.warn('Không tìm thấy bệnh án nào.');
      }
    } catch (err) {
      toast.error('Lỗi khi tải lịch sử bệnh án.');
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleCloseHistory = () => {
    setOpenHistoryDialog(false);
    setSelectedRecord(null);
  };

  const resetForm = () => {
    setFormData({
      chanDoan: '',
      trieuChung: '',
      phuongPhapDieuTri: '',
      tienSuBenhLy: '',
      danhGiaDieuTri: '',
      ketQuaXetNghiem: [],
      ngayTaiKham: '', // Reset ngày tái khám
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f4f6f8">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={6} sx={{ padding: 5, borderRadius: 3, margin: '30px auto', maxWidth: 1000 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/doctor/danhsachlichhenBS')}
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          Quay lại
        </Button>
      </Box>
      <Typography variant="h4" textAlign="center" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
        Kê Bệnh Án
      </Typography>
      <Divider sx={{ marginY: 3 }} />
      <Button
        variant="outlined"
        onClick={handleOpenHistory}
        sx={{ marginBottom: 3, color: theme.palette.info.main, borderColor: theme.palette.info.main }}
      >
        Xem lịch sử bệnh án
      </Button>
      {benhNhan && (
        <Box
          sx={{
            marginBottom: 4,
            padding: 2,
            border: `1px solid ${theme.palette.primary.light}`,
            borderRadius: 2,
            backgroundColor: '#f0f4fa',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
            Thông Tin Bệnh Nhân
          </Typography>
          <Typography>
            <strong>Tên:</strong> {benhNhan.ten}
          </Typography>
          <Typography>
            <strong>Tuổi:</strong> {benhNhan.ngaySinh}
          </Typography>
          <Typography>
            <strong>Giới tính:</strong> {benhNhan.gioiTinh}
          </Typography>
        </Box>
      )}
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Chẩn đoán"
              placeholder="Nhập chẩn đoán bệnh"
              variant="outlined"
              value={formData.chanDoan}
              onChange={(e) => handleInputChange('chanDoan', e.target.value)}
              fullWidth
              required
              sx={{ backgroundColor: '#e8f0fe', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Triệu chứng"
              placeholder="Nhập triệu chứng"
              variant="outlined"
              value={formData.trieuChung}
              onChange={(e) => handleInputChange('trieuChung', e.target.value)}
              fullWidth
              required
              sx={{ backgroundColor: '#e8f0fe', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phương pháp điều trị"
              placeholder="Nhập phương pháp điều trị"
              variant="outlined"
              value={formData.phuongPhapDieuTri}
              onChange={(e) => handleInputChange('phuongPhapDieuTri', e.target.value)}
              fullWidth
              required
              sx={{ backgroundColor: '#e8f0fe', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Tiền sử bệnh lý"
              placeholder="Nhập tiền sử bệnh lý"
              variant="outlined"
              value={formData.tienSuBenhLy}
              onChange={(e) => handleInputChange('tienSuBenhLy', e.target.value)}
              fullWidth
              sx={{ backgroundColor: '#e8f0fe', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Đánh giá điều trị"
              placeholder="Nhập đánh giá điều trị"
              variant="outlined"
              value={formData.danhGiaDieuTri}
              onChange={(e) => handleInputChange('danhGiaDieuTri', e.target.value)}
              fullWidth
              sx={{ backgroundColor: '#e8f0fe', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Ngày tái khám"
              type="date"
              variant="outlined"
              value={formData.ngayTaiKham}
              onChange={(e) => handleInputChange('ngayTaiKham', e.target.value)}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: '#e8f0fe', borderRadius: 1 }}
            />
          </Grid>
        </Grid>
        <Box mt={4} display="flex" justifyContent="space-between" flexWrap="wrap">
          <Tooltip title="Reset toàn bộ biểu mẫu">
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={resetForm}
              sx={{
                borderColor: theme.palette.error.main,
                color: theme.palette.error.main,
                marginY: 1,
              }}
            >
              Reset
            </Button>
          </Tooltip>
          <Button
            variant="outlined"
            onClick={() => handleSubmit('donThuoc')}
            sx={{
              paddingX: 4,
              borderColor: theme.palette.success.main,
              color: theme.palette.success.main,
              marginY: 1,
            }}
          >
            Kê đơn thuốc
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleSubmit('xetNghiem')}
            sx={{
              paddingX: 4,
              borderColor: theme.palette.warning.main,
              color: theme.palette.warning.main,
              marginY: 1,
            }}
          >
            Yêu cầu xét nghiệm
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
            disabled={submitting}
            sx={{
              paddingX: 4,
              marginY: 1,
            }}
          >
            {submitting ? <CircularProgress size={24} color="inherit" /> : 'Hoàn tất'}
          </Button>
        </Box>
      </form>

      {/* Dialog Lịch sử bệnh án */}
      <Dialog open={openHistoryDialog} onClose={handleCloseHistory} maxWidth="lg" fullWidth>
  <DialogTitle>
    Lịch sử bệnh án
    <IconButton
      aria-label="close"
      onClick={handleCloseHistory}
      sx={{ position: 'absolute', right: 8, top: 8, color: theme.palette.grey[500] }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  <DialogContent dividers>
    {loadingHistory ? (
      <Box display="flex" justifyContent="center" alignItems="center" height={200}>
        <CircularProgress />
      </Box>
    ) : selectedRecord ? (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          Chi tiết bệnh án
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Thông tin bệnh nhân
            </Typography>
            <Typography variant="body2">
              <strong>Họ tên:</strong> {benhNhan.ten}
            </Typography>
            <Typography variant="body2">
              <strong>Ngày sinh:</strong>{' '}
              {benhNhan.ngaySinh ? new Date(benhNhan.ngaySinh).toLocaleDateString() : 'Không xác định'}
            </Typography>
            <Typography variant="body2">
              <strong>Giới tính:</strong> {benhNhan.gioiTinh}
            </Typography>
          </Box>
          <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Thông tin bác sĩ
            </Typography>
            <Typography variant="body2">
              <strong>Tên bác sĩ:</strong> {selectedRecord.bacSi?.ten || 'Không xác định'}
            </Typography>
          </Box>
          <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Chi tiết bệnh án
            </Typography>
            <Typography variant="body2">
              <strong>Chẩn đoán:</strong> {selectedRecord.chanDoan}
            </Typography>
            <Typography variant="body2">
              <strong>Triệu chứng:</strong> {selectedRecord.trieuChung}
            </Typography>
            <Typography variant="body2">
              <strong>Phương pháp điều trị:</strong> {selectedRecord.phuongPhapDieuTri}
            </Typography>
            <Typography variant="body2">
              <strong>Trạng thái:</strong>{' '}
              {selectedRecord.trangThai === 'dangDieuTri' ? 'Đang điều trị' : 'Hoàn thành'}
            </Typography>
            <Typography variant="body2">
              <strong>Ngày tái khám:</strong>{' '}
              {selectedRecord.ngayTaiKham
                ? new Date(selectedRecord.ngayTaiKham).toLocaleDateString()
                : 'Không xác định'}
            </Typography>
          </Box>
        </Box>
        <Button
          onClick={() => setSelectedRecord(null)}
          sx={{ marginTop: 3 }}
          variant="outlined"
        >
          Quay lại danh sách
        </Button>
      </Box>
    ) : (
      <Box>
        <Typography variant="h6" gutterBottom>
          Danh sách bệnh án
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: theme.palette.primary.light }}>
              <TableRow>
                <TableCell><strong>Ngày khám</strong></TableCell>
                <TableCell><strong>Chẩn đoán</strong></TableCell>
                <TableCell><strong>Trạng thái</strong></TableCell>
                <TableCell><strong>Hành động</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicalRecords.length > 0 ? (
                medicalRecords.map((record) => (
                  <TableRow key={record._id} hover>
                    <TableCell>{new Date(record.ngayKham).toLocaleDateString()}</TableCell>
                    <TableCell>{record.chanDoan}</TableCell>
                    <TableCell>
                      {record.trangThai === 'dangDieuTri' ? 'Đang điều trị' : 'Hoàn thành'}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => setSelectedRecord(record)}
                        size="small"
                      >
                        Xem chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Không có lịch sử bệnh án.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseHistory} color="primary" variant="contained">
      Đóng
    </Button>
  </DialogActions>
</Dialog>

    </Paper>
  );
};

export default KeBenhAn;
