import '../../Pages/Customer/VeChungToi.css';
import Card6 from '../../Components/Customer/Card/Card6';
import Card7 from '../../Components/Customer/Card/Card7';
import Card8 from '../../Components/Customer/Card/Card8';
import BannerVCT from '../../Components/Customer/Banner/BannerVCT';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import React, { useEffect, useState, useContext } from 'react';




function VeChungToi() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useContext(AuthContext);

  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/doctors`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (result.success && Array.isArray(result.data)) {
        setDoctors(result.data);
      } else {
        throw new Error(result.message || 'Lỗi lấy danh sách bác sĩ');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const detailDoctor = (id) => {
    navigate(`/customer/chitietbacsidatlich/${id}`);
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div>
      <BannerVCT />
      <div className='container-content'>
        <div className='intro'>
          <p>
            Là điểm đến thăm khám và chăm sóc sức khỏe chất lượng quốc tế hàng đầu tại<br />
            Việt Nam, Bệnh viện STA mang đến các phương pháp điều trị tiên <br />
            tiến được xây dựng theo tiêu chuẩn của Hội đồng Úc về tiêu chuẩn chăm sóc sức <br />
            khỏe (ACHSI), đáp ứng nhu cầu ngày càng tăng về dịch vụ y tế cao cấp tại Việt Nam.
          </p>
        </div>

        <div className='item'>
          <Card6
            title="Tầm nhìn & Sứ mệnh"
            description={
              <>
                Tại STA, chúng tôi hướng tới mục tiêu trở thành đơn vị tiên phong trong lĩnh vực chăm sóc sức khoẻ đa chuyên khoa cao cấp và trải nghiệm toàn diện. <br />
                Sứ mệnh của chúng tôi là định hình văn hóa chăm sóc sức khỏe đa chuyên khoa cao cấp tại Việt Nam thông qua mạng lưới bệnh viện và phòng khám đạt tiêu chuẩn quốc tế.
              </>
            }
          />
        </div>

        <div className='item'>
          <h1 className='article-item'>Giá Trị Cốt Lõi</h1>
          <Card8 />
        </div>

        <div className='item'>
          <h1 className='article-item'>Những Thành Tựu</h1>
          <Card7 />
        </div>
      <div className="item">
        <div className="container">
          <h1 className="article-item text-center">Bác Sĩ</h1>
          <div className="card-grid">
            {doctors.map((doctor) => (
              <div key={doctor._id}>
                <div className="card-container">
                  <img className="card-img" src={doctor.hinhAnh} alt={`Hình của ${doctor.ten}`} />
                  <h3 className="card-title">{doctor.ten}</h3>
                  <p className="card-description">{doctor.moTa}</p>
                  <div>
                    {/* Thêm nút hoặc liên kết để gọi hàm detailUser */}
                    <button onClick={() => detailDoctor(doctor._id)} className="card-btn">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default VeChungToi