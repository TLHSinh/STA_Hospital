//import React from 'react';
import BannerTrangChu from '../../Components/Customer/Banner/BannerHome/BannerTrangChu';
import Card1TrangChu from '../../Components/Customer/Card/Card1TrangChu'; // Import Card1TrangChu nếu cần
import '../../Pages/Customer/Home.css';
import Card2BacSi from '../../Components/Customer/Card/Card2BacSi'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card5LienHe from '../../Components/Customer/Card/Card5LienHe';
import Card4GoiKham from '../../Components/Customer/Card/Card4GoiKham';
import BannerHome2 from '../../Components/Customer/Banner/BannerHome2/BannerHome2';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
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

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div>
      <BannerTrangChu/>
      <div className='container-content'>
        <div className='intro'>
          <p>
            STA cam kết mang đến dịch vụ chăm sóc sức khỏe cao cấp, <br />
            đạt tiêu chuẩn quốc tế với các phương pháp điều 
            <br /> trị tiên tiến, hiện đại tại đa chuyên khoa.
          </p>
        </div>
      
        <div className='item'>
          <h1 className='article-item'>Chuyên Khoa</h1>
          <Card1TrangChu />
        </div>

        <section>
          <div className="item">
            <div className="container">
              <h1 className="article-item text-center">Bác Sĩ</h1>
              <div className="card-grid">
                {doctors.map(doctor => (
                  <Card2BacSi
                    key={doctor._id}
                    imgSrc={doctor.hinhAnh}
                    imgAlt={`Hình của ${doctor.ten}`}
                    title={doctor.ten}
                    description={doctor.moTa}
                    buttonText="Learn More"
                    link={`${doctor._id}`} // Link dẫn đến chi tiết bác sĩ
                  />
                ))}
              </div>
            </div>
          </div>
        </section>


        

        <div className='item'>
              <h1 className='article-item'>Bệnh Viện Của Chúng Tôi</h1>
              <div className="card-container1">
                {/* Card 1 */}
                <Card5LienHe
                  imageSrc="/cardlienhe.png"
                  title="Bệnh Viện STA TÂN PHÚ"
                  address="43A Độc Lập, Phường Tân Thành, Quận Tân Phú, TP.HCM"
                  phone="1900 6765"
                  hours="Thứ Hai đến Thứ Bảy: 7:30 - 16:30"
                  emergency="Cấp cứu 24/7"
                />
              </div>
        </div>

        <div className='item'>
              <h1 className='article-item'>Gói Khám</h1>
              <Card4GoiKham/>
        </div>

        <div className='item'>
              <h1 className='article-item'></h1>
              <BannerHome2 />
        </div>
      </div>
    </div>
  );
};

export default Home;
