import React, { useEffect, useState, useContext } from 'react';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const userId = user._id;

  // Lấy danh sách lịch hẹn
  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/bookings/getpteAppoint/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (result.success && Array.isArray(result.appointments)) {
        setAppointments(result.appointments);
      } else {
        throw new Error(result.message || 'Lỗi lấy danh sách lịch hẹn');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Hủy lịch hẹn
  const handleCancelAppointment = async (appointmentId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/bookings/booking/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ trangThai: 'Huy' }),
      });

      const result = await res.json();
      if (result.success) {
        toast.success('Hủy lịch hẹn thành công!');
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === appointmentId
              ? { ...appointment, trangThai: 'Huy' }
              : appointment
          )
        );
      } else {
        throw new Error(result.message || 'Hủy lịch hẹn thất bại');
      }
    } catch (err) {
      toast.error(`Có lỗi khi hủy lịch hẹn: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Lọc danh sách lịch hẹn theo trạng thái
  const filteredAppointments = appointments.filter((appointment) => {
    if (!filterStatus) return true; // Nếu không chọn trạng thái, hiển thị tất cả
    return appointment.trangThai.toLowerCase() === filterStatus.toLowerCase();
  });

  if (loading) return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center text-red-500">Lỗi: {error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Lịch hẹn của tôi</h1>
      </div>

      {/* Bộ lọc trạng thái */}
      <div className="mb-4 flex justify-end">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow focus:outline-none"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="xacnhan">Xác Nhận</option>
          <option value="huy">Đã hủy</option>
        </select>
      </div>

      {/* Bảng lịch hẹn */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
              <th className="px-6 py-3">Tên bác sĩ</th>
              <th className="px-6 py-3">Ngày hẹn</th>
              <th className="px-6 py-3">Thời gian bắt đầu</th>
              <th className="px-6 py-3">Trạng thái</th>
              <th className="px-6 py-3">Huỷ lịch hẹn</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-gray-700">{appointment.bacSi.ten}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(appointment.ngayHen).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{appointment.thoiGianBatDau}</td>
                  <td
                    className={`px-6 py-4 font-semibold ${
                      appointment.trangThai.toLowerCase() === 'xacnhan'
                        ? 'text-green-500'
                        : appointment.trangThai.toLowerCase() === 'huy'
                        ? 'text-red-500'
                        : 'text-gray-500'
                    }`}
                  >
                    {appointment.trangThai}
                  </td>
                  <td>
                    {appointment.trangThai.toLowerCase() !== 'huy' && (
                      <button
                        onClick={() => handleCancelAppointment(appointment._id)}
                        className="px-4 py-2 flex items-center bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <HighlightOffIcon />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  Không có lịch hẹn nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointment;
