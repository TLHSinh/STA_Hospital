import React from 'react';
import { useNavigate  } from "react-router-dom";
import './DanhSach.css';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
const DSKhachHang = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/admin/themkhachhang');
  };
  return (
    <div style={{ position: 'relative' }}>
      <div className='title-ad'>
        <h1>DANH SÁCH KHÁCH HÀNG</h1>
      </div>
      {/* Nội dung của trang chính */}
      <Fab
        onClick={handleClick}
        sx={{
          backgroundColor: '#66B5A3',
          '&:hover': {
            backgroundColor: '#97c9bc',
          },
          position: 'absolute',
          bottom: -450,
          right: 30
          ,
        }}
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </div>
  )
}

export default DSKhachHang