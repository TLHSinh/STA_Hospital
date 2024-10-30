import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BASE_URL } from '../../../config';
import { AuthContext } from '../../../context/AuthContext';
import { FaChevronLeft } from 'react-icons/fa6';
import './ChiTiet.css'; // File CSS cho hiệu ứng và giao diện

const CTBacSi = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [workingSchedules, setWorkingSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('personalInfo'); // State xác định tab hiện tại
  const underlineRef = useRef(null); // Ref cho underline
  const buttonRefs = useRef([]); // Ref cho các nút

  // Lấy thông tin bác sĩ
  const fetchUserDetail = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/doctors/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (result.success) setUser(result.data);
      else throw new Error(result.message || 'Không tìm thấy thông tin');
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


  // Cập nhật vị trí của underline khi tab thay đổi
  useEffect(() => {
    const currentButton = buttonRefs.current[activeTab === 'personalInfo' ? 0 : 1];
    if (currentButton && underlineRef.current) {
      const { offsetLeft, offsetWidth } = currentButton;
      underlineRef.current.style.left = `${offsetLeft}px`;
      underlineRef.current.style.width = `${offsetWidth}px`;
    }
  }, [activeTab]);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div className="detail-container">
      <div className="title-ad">
        <div className="icon-back">
          <Link to="/admin/danhsachbacsi">
            <FaChevronLeft color="#66B5A3" />
          </Link>
        </div>
        <h1>CHI TIẾT BÁC SĨ</h1>
      </div>
      <div className="avt-name-detail">
        <img
          src={user.hinhAnh}
          alt={`Hình của ${user.ten}`}

          style={{ width: '150px', height: '150px', borderRadius: '50%' }}
        />

      </div>
      <h2 style={{ textAlign:"center" }}>{user.ten}</h2>
      <div className="button-group-details-doctor">
        <button
          className={`view-button ${activeTab === 'personalInfo' ? 'active' : ''}`}
          onClick={() => setActiveTab('personalInfo')}
          ref={(el) => (buttonRefs.current[0] = el)}
        >
          Thông tin cá nhân
        </button>
        <button
          className={`view-button ${activeTab === 'workSchedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('workSchedule')}
          ref={(el) => (buttonRefs.current[1] = el)}
        >
          Lịch làm việc
        </button>
        <div className="underline" ref={underlineRef}></div>
      </div>

      {activeTab === 'personalInfo' && user && (
        <div className="user-info">
          <div className="info-section">
            <form className="form">
              <div className="column">
                <div className="input-box">
                  <label>CCCD</label>
                  <div className="item-detail">{user.cccd}</div>
                </div>
                <div className="input-box">
                  <label>Ngày sinh</label>
                  <div className="item-detail">{user.ngaySinh}</div>
                </div>
                <div className="input-box">
                  <label>Giới tính</label>
                  <div className="item-detail">{user.gioiTinh}</div>
                </div>
              </div>
              <div className="column">
                <div className="input-box">
                  <label>Email</label>
                  <div className="item-detail">{user.email}</div>
                </div>
                <div className="input-box">
                  <label>Số điện thoại</label>
                  <div className="item-detail">{user.soDienThoai}</div>
                </div>
                <div className="input-box">
                  <label>Địa chỉ</label>
                  <div className="item-detail">{user.diaChi}</div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'workSchedule' && (
        <table className="user-table">
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Bắt đầu</th>
            <th>Kết thúc</th>
          </tr>
        </thead>
        <tbody>
          {workingSchedules.length > 0 ? (
            workingSchedules.map((schedule, index) => (
              <tr key={index}>
                <td>{new Date(schedule.ngay).toLocaleDateString()}</td>
                <td>{schedule.batDau}</td>
                <td>{schedule.ketThuc}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Không có người dùng nào</td>
            </tr>
          )}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default CTBacSi;


