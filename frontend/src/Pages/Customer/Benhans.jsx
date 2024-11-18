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
  const navigate = useNavigate();
  const patientId = user._id;

  // Fetch medical records data
  const fetchBenhAnData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/medicalRecord/getpatimdcRecord/${patientId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setBenhAnList(response.data.paRecord);
      } else {
        toast.warn('Không tìm thấy bệnh án nào.');
      }
    } catch (error) {
      toast.error('Không thể tải danh sách bệnh án, vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Navigate to details page
  const handleViewDetails = (id) => navigate(`/customer/chitietbenhans/${id}`);

  useEffect(() => {
    fetchBenhAnData();
  }, [token, patientId]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">Danh Sách Bệnh Án</h1>

      <div className="overflow-hidden bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
          <tr>
            <th className="p-4 text-left uppercase text-lg tracking-wide font-semibold border-b border-gray-200">Mã số</th>
            <th className="p-4 text-left uppercase text-lg tracking-wide font-semibold border-b border-gray-200">Bệnh nhân</th>
            <th className="p-4 text-left uppercase text-lg tracking-wide font-semibold border-b border-gray-200">Chẩn đoán</th>
            <th className="p-4 text-left uppercase text-lg tracking-wide font-semibold border-b border-gray-200">Ngày khám</th>
            <th className="p-4 text-center uppercase text-lg tracking-wide font-semibold border-b border-gray-200">Hành động</th>
          </tr>
        </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
                    <span>Đang tải dữ liệu...</span>
                  </div>
                </td>
              </tr>
            ) : benhAnList.length > 0 ? (
              benhAnList.map((benhAn) => (
                <tr
                  key={benhAn._id}
                  className="hover:bg-blue-100 transition-colors"
                >
                  <td className="p-4 border">{benhAn._id.slice(-4)}</td>
                  <td className="p-4 border">{benhAn.benhNhan?.ten || 'N/A'}</td>
                  <td className="p-4 border">{benhAn.chanDoan}</td>
                  <td className="p-4 border">
                    {new Date(benhAn.ngayKham).toLocaleDateString()}
                  </td>
                  <td className="p-4 border text-center space-x-3">
                    <button
                      className="p-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                      onClick={() => handleViewDetails(benhAn._id)}
                    >
                      <FontAwesomeIcon icon={faEye} /> Xem
                    </button>
                    <button className="p-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition">
                      <FontAwesomeIcon icon={faPrint} /> In
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  Không có bệnh án nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DSBenhAn;
