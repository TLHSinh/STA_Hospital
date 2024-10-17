import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { TextField, Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers'; 

const PopupLichHen = ({ open, handleClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null); 
    const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    handleClose(); // Đóng popup sau khi submit
  };

  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md" // Điều chỉnh kích thước của popup
      fullWidth
    >
      <DialogTitle>
      
      <Typography variant="h4" style={{ textAlign: 'center', color: '#0b8fac', fontWeight:'bold' }}>
  Đặt Lịch Hẹn
</Typography>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}o
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers
      sx={{
        border: 'none',       
        boxShadow: 'none',    
      }}>
        <Grid container spacing={2}>
          {/* Cột Thông tin khách hàng */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6"  style={{color: '#0b8fac'}}  gutterBottom>
              Thông tin khách hàng
            </Typography>

            {/* Họ và Tên */}
            <TextField
              fullWidth
              label="Họ và Tên"
              variant="outlined"
              margin="normal"
            />

            {/* Email */}
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
            />

            {/* Số điện thoại */}
            <TextField
              fullWidth
              label="Số điện thoại"
              variant="outlined"
              margin="normal"
            />

            {/* Ngày sinh */}
            <div className='MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth MuiTextField-root css-1ecvrk3-MuiFormControl-root-MuiTextField-root'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Ngày sinh"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <IconButton>
                          <CalendarTodayIcon />
                        </IconButton>
                      ),
                    }}
                  />
                )}
              />
            </LocalizationProvider>
            </div>
            
          </Grid>

          {/* Cột Chuyên khoa */}
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" style={{color: '#0b8fac'}} gutterBottom>
              Chuyên khoa
            </Typography>

            {/* Bệnh viện hay Phòng khám */}
            <TextField
              fullWidth
              label="Bệnh viện hay Phòng khám"
              variant="outlined"
              margin="normal"
            />

            {/* Chuyên khoa */}
            <TextField
              fullWidth
              label="Chuyên khoa"
              variant="outlined"
              margin="normal"
            />

            {/* Thông tin bổ sung */}
            <TextField
              fullWidth
              label="Thông tin bổ sung"
              variant="outlined"
              margin="normal"
            />

            {/* Ngày giờ ưu tiên */}
            <div className='MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth MuiTextField-root css-1ecvrk3-MuiFormControl-root-MuiTextField-root'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Chọn Ngày và Giờ"
                value={selectedDateTime}
                onChange={(newValue) => setSelectedDateTime(newValue)}  // Cập nhật ngày giờ
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      endAdornment: (
                        <IconButton>
                          <CalendarTodayIcon />
                        </IconButton>
                      ),
                    }}
                  />
                )}
              />
            </LocalizationProvider>
            </div>
            
          </Grid>
        </Grid>


        {/* Nút đăng ký */}
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          color="primary"
          sx={{ marginTop: 2, display: 'flex', float: 'right', color: 'white', background:'#0b8fac' }}>
            Đăng Ký
            </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PopupLichHen;
