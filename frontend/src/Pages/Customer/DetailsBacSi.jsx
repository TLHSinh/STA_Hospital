import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import '../../Pages/Customer/DetailsBacSi.css';
import '../../Pages/Customer/FormBooking.css';

const DetailsBacSi = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [workingSchedules, setWorkingSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingFormVisible, setIsBookingFormVisible] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    benhNhan: '',
  });

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

  const handleShowBookingForm = () => {
    setIsBookingFormVisible(true);
  };

  const handleBooking = async (e) => {
    e.preventDefault(); // Ngăn form reload trang khi submit

    if (selectedDate === null) {
      alert('Vui lòng chọn ngày và giờ muốn đặt lịch');
      return;
    }

    const schedule = workingSchedules[selectedDate];
    const bookingData = {
      lichLamViecId: schedule._id,
      benhNhan: bookingFormData.benhNhan,
      gia: bookingFormData.gia,
    };

    try {
      const res = await fetch(`${BASE_URL}/api/v1/bookings/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();
      if (result.success) {
        alert('Đặt lịch hẹn thành công');
        setIsBookingFormVisible(false);
        navigate('/customer/bacsi');
      } else {
        alert(result.message || 'Không thể đặt lịch hẹn');
      }
    } catch (err) {
      console.error('Lỗi khi đặt lịch hẹn:', err);
      alert('Có lỗi xảy ra khi đặt lịch hẹn. Vui lòng thử lại sau.');
    }
  };

  useEffect(() => {
    fetchUserDetail();
    fetchWorkingSchedules();
  }, [id]);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    
    <div className="prescripto">
      <div className="doc-details-container">
        <div className="doc-image-wrapper">
          <img src={user?.hinhAnh} alt="Doctor" className="doc-image" />
        </div>

        <div className="doc-info-wrapper">
          <div className="doc-info-content">
            <h1 className="doc-name">{user?.ten}</h1>
            <div className="experience-badge">{user?.chuyenKhoa} Chuyên khoa: 
              <p className="doc-specialty">{user?.chuyenKhoa}</p>
            </div>
            
            <div className="experience-badge">{user?.kinhNghiem} Kinh ngiệm: </div>

            <div className="about-title">Mô tả: 
              <p className="doc-description">{user?.moTa}</p>
            </div>
            
            <p className="appointment-fee">
              Appointment fee: <span className="fee-amount">${user?.giaKham}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="schedule-container">
        <h2>Lịch làm việc của bác sĩ </h2>

        {/* ngày làm việc */}
        <div className="day-selector">
          {workingSchedules.map((schedule, index) => (
            <div
              key={index}
              className={`day-rectangle ${selectedDate === index ? 'selected' : ''}`}
              onClick={() => setSelectedDate(index)}
            >
              <div className="day-name">
                {new Date(schedule.ngay).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
              </div>
              <div className="day-date">
                {new Date(schedule.ngay).getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Khung giờ ca làm việc */}
        <div className="time-slots">
          {selectedDate !== null && (
            <>
              <div className="time-rectangle">
                {workingSchedules[selectedDate].batDau} - {workingSchedules[selectedDate].ketThuc}
              </div>
            </>
          )}
        </div>

        <div className="buttons">
          <button onClick={() => navigate('/customer/bacsi')} className="back-button">Quay lại</button>
          <button onClick={handleShowBookingForm} className="appointment-button">Đặt lịch</button>
        </div>
      </div>

      {isBookingFormVisible && (
        <div className="booking-form-container">
        <div className="booking-form">
          <h3 className="form-title">Thông tin đặt lịch</h3>
          <form onSubmit={handleBooking}>
            <div className="form-group">
              <label htmlFor="benhNhan" className="form-label">Mã bệnh nhân:</label>
              <input
                type="text"
                id="benhNhan"
                className="form-input"
                value={bookingFormData.benhNhan}
                onChange={(e) => setBookingFormData({ ...bookingFormData, benhNhan: e.target.value })}
                required
              />
            </div>
    
            <button type="submit" className="confirm-button">Xác nhận đặt lịch</button>
          </form>
        </div>
      </div>
      )}
    </div>
  );
};

export default DetailsBacSi;