import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import '../../Pages/Customer/DetailsBacSi.css';
import '../../Pages/Customer/FormBooking.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const DetailsBacSi = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, user } = useContext(AuthContext); // Lấy thông tin token và user từ context
  const [userDetails, setUserDetails] = useState(null);
  const [workingSchedules, setWorkingSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
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
    
    <div className="max-w-4xl mx-auto p-6 font-sans">
      {/* <div className="bg-white shadow-lg rounded-lg p-6 flex gap-6 mb-8">
        <div className="w-1/3">
          <img src={userDetails?.hinhAnh} alt="Doctor" className="rounded-lg object-cover w-full" />
        </div>
        <div className="w-2/3 space-y-4">
          <h1 className="text-3xl font-semibold text-gray-800">{userDetails?.ten}</h1>
          <p className="text-lg text-gray-600"><span className="font-semibold">Chuyên khoa:</span> {userDetails?.chuyenKhoa}</p>
          <p className="text-lg text-gray-600"><span className="font-semibold">Kinh nghiệm:</span> {userDetails?.kinhNghiem} năm</p>
          <p className="text-lg text-gray-600"><span className="font-semibold">Mô tả:</span> {userDetails?.moTa}</p>
          <p className="text-lg text-gray-600"><span className="font-semibold">Phí khám:</span> ${userDetails?.giaKham}</p>
        </div>
      </div> */}

      <div className="bg-white shadow-2xl rounded-xl p-8 flex gap-10 mb-10">
        <div className="w-1/3">
          <img
            src={userDetails?.hinhAnh}
            alt="Doctor"
            className="rounded-xl object-cover w-full h-80 border-4 border-[#37AFE1] shadow-lg"
          />
        </div>
        <div className="w-2/3 space-y-5">
        <h1 className="text-4xl font-bold text-[#0b8fac] hover:text-[#065a71] transition-colors duration-300 border-b-2 border-gray-300 pb-2 mb-4">
          {userDetails?.ten}
        </h1>

          <p className="text-lg text-gray-700">
            <span className="font-bold text-[]">Chuyên khoa:</span> {userDetails?.chuyenKhoa}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-bold text-[]">Kinh nghiệm:</span> {userDetails?.kinhNghiem}10 năm
          </p>
          <p className="text-lg text-gray-700 text-justify">
            <span className="font-bold text-[]">Mô tả:</span> {userDetails?.gioiThieuNgan}
          </p>

          <p className="text-lg text-gray-700">
            <span className="font-bold text-[]">Phí khám:</span> ${userDetails?.giaKham}
          </p>
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
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
        <div className="bg-white p-10 rounded-3xl shadow-lg transform transition duration-300 w-full max-w-lg mx-4 relative">
          {/* Nút đóng với FontAwesome icon */}
          <button 
            onClick={() => setIsBookingFormVisible(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl bg-transparent"
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <h3 className="text-2xl font-semibold text-center text-gray-700 mb-8">Thông tin đặt lịch</h3>
          <form onSubmit={handleBooking} className="space-y-4">
            <button 
              type="submit" 
              div className="w-full py-3 px-6 text-lg font-semibold text-white bg-gradient-to-r from-[#0b8fac] to-[#065a71] rounded-full shadow-md hover:from-[#0a7b92] hover:to-[#05485d] transition-all duration-200"
            >
              Xác nhận đặt lịch
            </button>
          </form>
        </div>
      </div>
    )}

    </div>
  );
};

export default DetailsBacSi;