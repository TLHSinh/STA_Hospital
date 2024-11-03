
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Fab, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext.jsx';
import { FaPenToSquare, FaPlus } from "react-icons/fa6";

const KeBenhAn = () => {
    const { appointmentId } = useParams();
    const navigate = useNavigate();
    const [chanDoan, setChanDoan] = useState('');
    const [trieuChung, setTrieuChung] = useState('');
    const [phuongPhapDieuTri, setPhuongPhapDieuTri] = useState('');
    const [tienSuBenhLy, setTienSuBenhLy] = useState('');
    const [danhGiaDieuTri, setDanhGiaDieuTri] = useState('');
    const { token } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const bacSiId = user._id;
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`${BASE_URL}/api/v1/medical-records/createWithAppointment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            benhNhanId: appointmentId,
            bacSiId,
            chanDoan,
            trieuChung,
            phuongPhapDieuTri,
            tienSuBenhLy,
            danhGiaDieuTri,
            lichHenId: appointmentId,
          }),
        });
  
        const result = await res.json();
        if (result.success) {
          toast.success('Kê bệnh án thành công');
          navigate('/doctor/appointments');
        } else {
          toast.error(result.message || 'Kê bệnh án thất bại');
        }
      } catch (err) {
        toast.error(`Lỗi: ${err.message}`);
      }
    };
  
    return (
      <div style={{ padding: '20px' }}>
        <h1>Kê Bệnh Án</h1>
        <form onSubmit={handleSubmit}>
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
            <Button type="submit" variant="contained" color="primary">
              Kê bệnh án
            </Button>
          </div>
        </form>
      </div>
    );
  };
  
  export default KeBenhAn;
  