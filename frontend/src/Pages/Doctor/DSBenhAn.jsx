import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faPrint,
  faPrescription,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

const DSBenhAn = () => {
  const [benhAnList, setBenhAnList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token, user } = useContext(AuthContext);
  const doctorId = user._id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBenhAnData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/medicalRecord/getdocmdcRecord/${doctorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setBenhAnList(response.data.docRecord);
        } else {
          toast.warn('Không có dữ liệu bệnh án.');
        }
      } catch (error) {
        console.error('Có lỗi khi lấy dữ liệu bệnh án:', error);
        toast.error('Không thể tải danh sách bệnh án.');
      } finally {
        setLoading(false);
      }
    };

    fetchBenhAnData();
  }, [doctorId, token]);

  const handleStatusChange = async (e, id) => {
    const newStatus = e.target.value;
    setBenhAnList((prevList) =>
      prevList.map((benhAn) =>
        benhAn._id === id ? { ...benhAn, trangThai: newStatus } : benhAn
      )
    );
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/medicalRecord/updatemdcRecord/${id}`, { trangThai: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        toast.success('Cập nhật trạng thái thành công!');
      } else {
        toast.error('Cập nhật trạng thái thất bại!');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Có lỗi khi cập nhật trạng thái!');
    }
  };

  const handleViewDetails = (id) => {
    // Navigate to the detailed view page with the medical record ID
    navigate(`/customer/chitietbenhans/${id}`);
  };

  const handNewPayment = async (id) => {
    try {
      // Gọi API lập hóa đơn mới
      const response = await axios.post(`${BASE_URL}/api/v1/payment/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.success) {
        toast.success('Lập hóa đơn thành công! Chuyển hướng...');
        // Chuyển hướng đến trang NewPayment cùng với ID hóa đơn vừa tạo
        const newInvoiceId = response.data.hoaDon._id;
        navigate(`/doctor/NewPayment/${newInvoiceId}`);
      } else {
        toast.error('Không thể lập hóa đơn!');
      }
    } catch (error) {
      console.error('Error creating new payment:', error);
      toast.error('Có lỗi xảy ra khi lập hóa đơn!');
    }
  };
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">DANH SÁCH BỆNH ÁN</h1>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full border-collapse table-auto">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-3 border text-left">MÃ SỐ</th>
              <th className="p-3 border text-left">HỌ TÊN BỆNH NHÂN</th>
              <th className="p-3 border text-left">CHẨN ĐOÁN</th>
              <th className="p-3 border text-left">NGÀY KHÁM</th>
              <th className="p-3 border text-left">TRẠNG THÁI</th>
              <th className="p-3 border text-center">HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-3 text-center">Đang tải dữ liệu...</td>
              </tr>
            ) : benhAnList.length > 0 ? (
              benhAnList.map((benhAn) => (
                <tr key={benhAn._id} className="hover:bg-blue-50">
                  {/* Mã số (Last 4 characters of _id) */}
                  <td className="p-3 border">{benhAn._id.slice(-4)}</td>
                  {/* Họ tên bệnh nhân */}
                  <td className="p-3 border">{benhAn.benhNhan.ten}</td>
                  {/* Chẩn đoán */}
                  <td className="p-3 border">{benhAn.chanDoan}</td>
                  {/* Ngày khám */}
                  <td className="p-3 border">{new Date(benhAn.ngayKham).toLocaleDateString()}</td>
                  {/* Trạng thái */}
                  <td className="p-3 border">
                    <select
                      value={benhAn.trangThai}
                      onChange={(e) => handleStatusChange(e, benhAn._id)}
                      className="border rounded p-1"
                    >
                      <option value="hoanThanh">Hoàn thành</option>
                      <option value="dangDieuTri">Đang điều trị</option>
                    </select>
                  </td>
                  {/* Hành động */}
                  <td className="p-3 border text-center">
                  <button
                      className="text-blue-500 mx-1"
                      style={{ color: 'blue', background: 'none' }}
                      onClick={() => handleViewDetails(benhAn._id)}
                    >
                      <FontAwesomeIcon icon={faEye} /> {/* View */}
                    </button>

                    <button
                      className="text-blue-500 mx-1"
                      style={{ color: 'blue', background: 'none' }}
                      onClick={() => handNewPayment(benhAn._id)}
                    >
                      <FontAwesomeIcon icon={faPrint} /> {/* Print */}
                    </button>
                 
                    <button className="text-purple-500 mx-1" style={{ background:'none'}}>
                      <FontAwesomeIcon icon={faEdit} /> {/* Edit */}
                    </button>
                    
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center">Không có dữ liệu bệnh án.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DSBenhAn;
