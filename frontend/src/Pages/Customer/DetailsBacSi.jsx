import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import '../../Pages/Customer/DetailsBacSi.css';
import '../../Pages/Customer/FormBooking.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUser, faEnvelope, faPhone, faBuilding,faCalendarDays,faClock,faUserDoctor, faMoneyBill,faUserPen, faXmark} from '@fortawesome/free-solid-svg-icons';

const DetailsBacSi = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, user } = useContext(AuthContext); // Lấy thông tin token và user từ context
  const [userDetails, setUserDetails] = useState(null);
  const [workingSchedules, setWorkingSchedules] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingFormVisible, setIsBookingFormVisible] = useState(false);

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
        setUserDetails(result.data);
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
      if (result.success) {
        // Nhóm các ca làm việc theo ngày
        const groupedSchedules = result.data.reduce((acc, schedule) => {
          const date = new Date(schedule.ngay).toDateString();
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(schedule);
          return acc;
        }, {});
        setWorkingSchedules(groupedSchedules);
      } else {
        throw new Error(result.message || 'Không tìm thấy lịch làm việc');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleShowBookingForm = () => {
    setIsBookingFormVisible(true);
  };

  const handleBooking = async (e) => {
    e.preventDefault(); // Ngăn form reload trang khi submit

    if (selectedDate === null || selectedTimeSlot === null) {
      alert('Vui lòng chọn ngày và giờ muốn đặt lịch');
      return;
    }

    const schedule = workingSchedules[selectedDate].find((slot) => slot._id === selectedTimeSlot);
    const bookingData = {
      lichLamViecId: schedule._id,
      benhNhan: user?._id, // Lấy ID bệnh nhân từ context
      gia: userDetails.giaKham,
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
          <img
            src={userDetails?.hinhAnh}
            alt="Doctor"
            className="doc-image"
          />
        </div>
        <div className="doc-info-wrapper">
          <div className="doc-info-content">
            <h1 className="doc-name"> 
            <span className="font-bold">Họ tên: </span>
              {userDetails?.ten}
            </h1>
            <p className="doc-specialty">
              <span className="font-bold">Chuyên khoa:</span> {userDetails?.chuyenKhoa}
            </p>
            <p className="doc-specialty">
              <span className="font-bold">Kinh nghiệm:</span> {userDetails?.kinhNghiem} năm
            </p>
            <p className="doc-description">
              <span className="font-bold">Mô tả:</span> {userDetails?.gioiThieuNgan}
            </p>
            <p className="appointment-fee">
              Phí khám: <span className="fee-amount">${userDetails?.giaKham}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="schedule-container">
        <h2 className="schedule-title" style={{ color: '#170F49', fontSize: '34px', fontFamily: 'DM Sans', fontWeight: '700', lineHeight: '46px', wordWrap: 'break-word' }}>Lịch làm việc của bác sĩ</h2>

        {/* Ngày làm việc */}
        <div className="day-selector">
          {Object.keys(workingSchedules).map((date, index) => (
            <div
              key={index}
              className={`day-rectangle ${selectedDate === date ? 'selected' : ''}`}
              onClick={() => {
                setSelectedDate(date);
                setSelectedTimeSlot(null);
              }}
            >
              <div className="day-name">
                {new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
              </div>
              <div className="day-date">
                {new Date(date).getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Khung giờ ca làm việc */}
        <div className="time-slots">
          {selectedDate && workingSchedules[selectedDate] && (
            <>
              {workingSchedules[selectedDate].map((schedule, index) => (
                <div
                  key={index}
                  className={`time-rectangle ${selectedTimeSlot === schedule._id ? 'selected' : ''} ${selectedTimeSlot === schedule._id ? 'bg-[#0b8fac] text-white' : 'hover:bg-gray-200'}`}
                  onClick={() => setSelectedTimeSlot(schedule._id)}
                >
                  {schedule.batDau} - {schedule.ketThuc}
                </div>
              ))}
            </>
          )}
        </div>

        <div className="buttons">
          <button onClick={() => navigate('/customer/bacsi')} className="back-button">Quay lại</button>
          <button onClick={handleShowBookingForm} className="appointment-button">Đặt lịch</button>
        </div>
      </div>

      {isBookingFormVisible && (
        
        <div className="popup-dtbs">


          <div className="popup-content-dtbs" style={{ width: '60%', maxHeight: '90vh', overflowY: 'auto', borderRadius: '34px', boxShadow: '0px 5px 16px rgba(8.24, 15.25, 52.06, 0.06)', padding: '40px' }}>
            <button 
              onClick={() => setIsBookingFormVisible(false)}
              className="close-button-dtbs"
              aria-label="Close"
              style={{
               
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px',
                color: '#333',
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <h3 className="text-2xl font-semibold text-center text-gray-700 mb-8">Thông tin đặt lịch</h3>
            <form onSubmit={handleBooking} className="grid grid-cols-1 gap-6">
            <div className="personal-info improved">
      <h4 className="font-bold mb-4">Thông tin cá nhân:</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="input-wrapper">
          <label className="label">Họ và tên</label>
          <div className="input-field">
            <input type="text" value={user?.ten || ''} readOnly className="input" />
            <FontAwesomeIcon icon={faUser} className="input-icon" />
          </div>
        </div>
        
        <div className="input-wrapper">
          <label className="label">Email</label>
          <div className="input-field">
            <input type="email" value={user?.email || ''} readOnly className="input" />
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
          </div>
        </div>
        
        <div className="input-wrapper">
          <label className="label">Số điện thoại</label>
          <div className="input-field">
            <input type="text" value={user?.soDienThoai || ''} readOnly className="input" />
            <FontAwesomeIcon icon={faPhone} className="input-icon" />
          </div>
        </div>
        
        <div className="input-wrapper">
          <label className="label">Địa chỉ</label>
          <div className="input-field">
            <input type="text" value={user?.diaChi || ''} readOnly className="input" />
            <FontAwesomeIcon icon={faBuilding} className="input-icon" />
          </div>
        </div>
      </div>
    </div>

    <div className="appointment-info improved">
  <h4 className="font-bold mb-4">Thông tin lịch hẹn:</h4>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    
    <div className="input-wrapper">
      <label className="label">Ngày</label>
      <div className="input-field">
        <input 
          type="text" 
          value={selectedDate || ''} 
          readOnly 
          className="input" 
        />
        <FontAwesomeIcon icon={faCalendarDays} className="input-icon" />
      </div>
    </div>

    <div className="input-wrapper">
      <label className="label">Thời gian</label>
      <div className="input-field">
        <input 
          type="text" 
          value={`${workingSchedules[selectedDate]?.find(slot => slot._id === selectedTimeSlot)?.batDau || ''} - ${workingSchedules[selectedDate]?.find(slot => slot._id === selectedTimeSlot)?.ketThuc || ''}`} 
          readOnly 
          className="input" 
        />
        <FontAwesomeIcon icon={faClock} className="input-icon" />
        
      </div>
    </div>

    <div className="input-wrapper">
      <label className="label">Bác sĩ</label>
      <div className="input-field">
        <input 
          type="text" 
          value={userDetails?.ten || ''} 
          readOnly 
          className="input" 
        />
        <FontAwesomeIcon icon={faUserDoctor} className="input-icon" />
      </div>
    </div>

    <div className="input-wrapper">
      <label className="label">Giá</label>
      <div className="input-field">
        <input 
          type="text" 
          value={`${userDetails?.giaKham || ''}`} 
          readOnly 
          className="input" 
        />
        <FontAwesomeIcon icon={faMoneyBill} className="input-icon" />

      </div>
    </div>

    <div className="input-wrapper full-width">
      <label className="label">Lý do khám</label>
      <div className="input-field">
        <textarea 
          className="input" 
          placeholder="Vui lòng nhập lý do khám..." 
          required
        ></textarea>
      <FontAwesomeIcon icon={faUserPen} className="input-icon" />

      </div>
    </div>

  </div>

  
</div>


              <div className="confirmation mt-4">
                <label className="block">
                  <input type="checkbox" required /> Đồng ý điều khoản và chính sách bảo mật
                </label>
              </div>

              <div>
                <button 
                  type="submit" 
                  className="w-full py-3 px-6 text-lg font-semibold text-white bg-gradient-to-r from-[#0b8fac] to-[#065a71] rounded-full shadow-md hover:from-[#0a7b92] hover:to-[#05485d] transition-all duration-200"
                >
                  Xác nhận đặt lịch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsBacSi;
