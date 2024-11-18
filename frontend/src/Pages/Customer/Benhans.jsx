import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPrint } from '@fortawesome/free-solid-svg-icons';

const DSBenhAn = () => {
  const [benhAnList, setBenhAnList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token, user } = useContext(AuthContext);
  const patientId = user._id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBenhAnData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/medicalRecord/getpatimdcRecord/${patientId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setBenhAnList(response.data.paRecord);
        } else {
          toast.warn('Không tìm thấy bệnh án nào.');
        }
      } catch (error) {
        console.error('Có lỗi khi lấy dữ liệu bệnh án: ', error);
        toast.error('Không thể tải danh sách bệnh án, vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchBenhAnData();
  }, [token, patientId]);

  const handleViewDetails = (id) => {
    // Navigate to the detailed view page with the medical record ID
    navigate(`/customer/chitietbenhans/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Danh Sách Bệnh Án</h1>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full border-collapse table-auto">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3 border text-left">MÃ SỐ</th>
              <th className="p-3 border text-left">BỆNH NHÂN</th>
              <th className="p-3 border text-left">CHẨN ĐOÁN</th>
              <th className="p-3 border text-left">NGÀY KHÁM</th>
              <th className="p-3 border text-center">HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-3 text-center">Đang tải dữ liệu...</td>
              </tr>
            ) : benhAnList.length > 0 ? (
              benhAnList.map((benhAn) => (
                <tr key={benhAn._id} className="hover:bg-blue-50">
                  {/* Last 4 characters of the ID */}
                  <td className="p-3 border">{benhAn._id.slice(-4)}</td>
                  {/* Patient's Name */}
                  <td className="p-3 border">{benhAn.benhNhan?.ten || 'N/A'}</td>
                  {/* Diagnosis */}
                  <td className="p-3 border">{benhAn.chanDoan}</td>
                  {/* Date of Diagnosis */}
                  <td className="p-3 border">{new Date(benhAn.ngayKham).toLocaleDateString()}</td>
                  {/* Actions */}
                  <td className="p-3 border text-center">
                    <button
                      className="text-blue-500 mx-1"
                      style={{ color: 'blue', background: 'none' }}
                      onClick={() => handleViewDetails(benhAn._id)}
                    >
                      <FontAwesomeIcon icon={faEye} /> {/* View */}
                    </button>
                    <button
                      className="text-green-500 mx-1"
                      style={{ background: 'none' }}
                    >
                      <FontAwesomeIcon icon={faPrint} /> {/* Print */}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center">Không có bệnh án nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DSBenhAn;
