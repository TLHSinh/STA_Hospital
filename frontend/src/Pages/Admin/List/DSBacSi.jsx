import React from 'react';
import { useNavigate  } from "react-router-dom";
import './DanhSach.css';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const BacSi = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/admin/thembacsi');
  };
  return (
    <div style={{ position: 'relative' }}>
      <div className='title-ad'>
        <h1>DANH SÁCH BÁC SĨ</h1>
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

export default BacSi;