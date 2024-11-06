import React, { useContext } from 'react';
// import './ChiTiet.css'; // Tạo file CSS riêng cho chi tiết người dùng
import { AuthContext } from '../../context/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);

    if (!user) {
        return <p>Loading...</p>;  // Hoặc điều hướng nếu chưa có thông tin
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Thông Tin Khách Hàng</h2>
            <div className="bg-white shadow-md rounded-lg p-4">
                <p><strong>Tên:</strong> {user.ten}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Số điện thoại:</strong> {user.soDienThoai}</p>
                {/* Thêm các trường khác mà bạn muốn hiển thị */}
            </div>
        </div>
    );
};

export default Profile;
