import BannerBS from '../../Components/Customer/Banner/BannerBS';
import '../../Pages/Customer/BacSi.css';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function BacSi() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.ten.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div style={{ position: 'relative' }}>
      <BannerBS />

      <div className="item">
        <div className="container">
          <h1 className="article-item text-center">Bác Sĩ</h1>

          {/* Thanh tìm kiếm căn giữa */}
          <div className="flex justify-center mb-8">  {/* Thêm margin-bottom cho khoảng cách */}
            <input
              type="text"
              placeholder="Tìm kiếm bác sĩ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-3xl px-6 py-3 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out text-lg"
            />
          </div>

          <div className="card-grid">
            {filteredDoctors.map((doctor) => (
              <div key={doctor._id}>
                <div className="card-container">
                  <img className="card-img" src={doctor.hinhAnh} alt={`Hình của ${doctor.ten}`} />
                  <h3 className="card-title">{doctor.ten}</h3>
                  <p className="card-description">{doctor.moTa}</p>
                  <div>
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
  );
}

export default BacSi;
