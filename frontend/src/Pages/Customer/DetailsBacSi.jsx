import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';


const DetailsBacSi = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [workingSchedules, setWorkingSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserDetail = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/doctors/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (result.success) {
        setUser(result.data);
      } else {
        throw new Error(result.message || 'Không tìm thấy thông tin');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  // Lấy lịch làm việc
  const fetchWorkingSchedules = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/doctors/getWorkingSchedule/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (result.success) setWorkingSchedules(result.data);
      else throw new Error(result.message || 'Không tìm thấy lịch làm việc');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUserDetail();
    fetchWorkingSchedules();
  }, [id]);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex space-x-6 mb-6 w-full max-w-3xl">
        <div className="w-1/4 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={user.hinhAnh}
            alt="Doctor"
            className="w-full h-full object-cover"
            style={{ height: '100%' }}
          />
        </div>

        <div className="flex-1">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-800">
              {user.ten} <span className="text-blue-500"></span>
            </h1>
            <p className="text-gray-500 mt-1">{user.chuyenKhoa} • {/* {user.namKinhNghiem} Years */}</p>
            <p className="text-gray-700 mt-4 text-sm">
              <strong>Mô tả:</strong> {user.moTa}
            </p>
            <p className="text-gray-800 mt-4 font-semibold">
              Giá Khám: <span className="text-black font-bold">{user.giaKham} VND</span>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-800">Lịch Làm Việc</h2>
        <table className="user-table">
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {workingSchedules.length > 0 ? (
            workingSchedules.map((schedule, index) => (
              <tr key={index}>
                <td>{new Date(schedule.ngay).toLocaleDateString()}</td>
                <td>{schedule.batDau}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Không có lịch làm việc nào</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

      <div className="flex justify-end w-full max-w-3xl mt-4 space-x-4">
        <button
          onClick={() => navigate('/customer/bacsi')}
          className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400"
        >
          Quay lại
        </button>
        <button
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Đặt Lịch Hẹn
        </button>
      </div>
    </div>
  );
};

export default DetailsBacSi;






