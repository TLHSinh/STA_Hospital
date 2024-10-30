// AppointmentHeader.jsx
import React from 'react';

const AppointmentHeader = () => {
  const appointments = [
    { id: 1, name: 'Nguyễn Văn A', email: 'a.nguyen@gmail.com', phone: '0123456789', dob: '01/01/1990', dateTime: '10:00 25/10/2024', status: 'Hoàn thành' },
    { id: 2, name: 'Trần Thị B', email: 'b.tran@gmail.com', phone: '0987654321', dob: '15/05/1995', dateTime: '14:30 25/10/2024', status: 'Đang chờ' },
    { id: 3, name: 'Lê Văn C', email: 'c.le@gmail.com', phone: '0912345678', dob: '20/10/1988', dateTime: '09:00 26/10/2024', status: 'Hủy' },
    
    // Thêm các mục khác nếu cần
  ];

  return (
    <div className='w-full max-w-7xl m-5'>
      <p className='mb-3 text-lg font-medium'>Danh Sách Lịch Hẹn</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto'>
        {/* Tiêu đề bảng với màu nền */}
        <div className="max-sm:hidden grid grid-cols-7 gap-0 py-3 px-6 border-b bg-gray-100">
          <p className="font-bold">STT</p>
          <p className="font-bold">Họ và Tên</p>
          <p className="font-bold">Email</p>
          <p className="font-bold">Số điện thoại</p>
          <p className="font-bold">Ngày sinh</p>
          <p className="font-bold">Ngày và Giờ</p>
          <p className="font-bold">Trạng thái</p>
        </div>

        {/* Hiển thị dữ liệu */}
        {appointments.map((appointment, index) => (
          <div key={appointment.id} className="grid grid-cols-7 gap-0 py-3 px-6 border-b">
            <p>{index + 1}</p>
            <p>{appointment.name}</p>
            <p>{appointment.email}</p>
            <p>{appointment.phone}</p>
            <p>{appointment.dob}</p>
            <p>{appointment.dateTime}</p>
            <p>{appointment.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentHeader;
