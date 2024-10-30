import axios from 'axios';
import BannerBS from '../../Components/Customer/Banner/BannerBacSi/BannerBS';
import Card2BacSi from '../../Components/Customer/Card/Card2BacSi';
import '../../Pages/Customer/BacSi.css';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function BacSi() {
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
    <div style={{ position: 'relative' }}>
      <BannerBS />

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
    </div>
  );
}

export default BacSi;
