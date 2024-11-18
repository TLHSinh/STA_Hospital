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
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

const DSBenhAn = () => {
  const [benhAnList, setBenhAnList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState(""); // Trạng thái lọc
  const [sortOrder, setSortOrder] = useState("asc"); // Thứ tự sắp xếp A-Z
  const [sortDate, setSortDate] = useState("asc"); // Thứ tự sắp xếp ngày khám
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

  // Lọc theo trạng thái
  const filteredBenhAnList = benhAnList.filter((benhAn) => {
    if (!filterStatus) return true; // Nếu không có bộ lọc, hiển thị tất cả
    return benhAn.trangThai === filterStatus; // Lọc theo trạng thái
  });

  // Sắp xếp theo số thứ tự (ID) A-Z hoặc Z-A
  const sortedByID = [...filteredBenhAnList].sort((a, b) => {
    if (sortOrder === "asc") {
      return a._id.localeCompare(b._id); // So sánh theo ID
    } else {
      return b._id.localeCompare(a._id);
    }
  });

  // Sắp xếp theo ngày khám
  const sortedByDate = [...sortedByID].sort((a, b) => {
    const dateA = new Date(a.ngayKham);
    const dateB = new Date(b.ngayKham);
    if (sortDate === "asc") {
      return dateA - dateB; // Tăng dần theo ngày khám
    } else {
      return dateB - dateA; // Giảm dần theo ngày khám
    }
  });

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
    navigate(`/customer/chitietbenhans/${id}`);
  };

  const handNewPayment = async (id) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/payment/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success('Lập hóa đơn thành công! Chuyển hướng...');
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
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">DANH SÁCH BỆNH ÁN</h1>

      {/* Bộ lọc */}
      <div className="mb-4 flex justify-end space-x-4">
        {/* Lọc trạng thái */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow focus:outline-none"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="hoanThanh">Hoàn thành</option>
          <option value="dangDieuTri">Đang điều trị</option>
        </select>

        {/* Lọc theo số thứ tự A-Z/Z-A */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow focus:outline-none"
        >
          <option value="asc">Số thứ tự (A-Z)</option>
          <option value="desc">Số thứ tự (Z-A)</option>
        </select>

        {/* Lọc theo ngày khám */}
        <select
          value={sortDate}
          onChange={(e) => setSortDate(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow focus:outline-none"
        >
          <option value="asc">Ngày khám (Mới nhất)</option>
          <option value="desc">Ngày khám (Cũ nhất)</option>
        </select>
      </div>

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
            ) : sortedByDate.length > 0 ? (
              sortedByDate.map((benhAn) => (
                <tr key={benhAn._id} className="hover:bg-blue-50">
                  <td className="p-3 border">{benhAn._id.slice(-4)}</td>
                  <td className="p-3 border">{benhAn.benhNhan.ten}</td>
                  <td className="p-3 border">{benhAn.chanDoan}</td>
                  <td className="p-3 border">{new Date(benhAn.ngayKham).toLocaleDateString()}</td>
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
                  <td className="p-3 border text-center">
                    <buttonn
                      className="text-blue-500 mx-1"
                      onClick={() => handleViewDetails(benhAn._id)}
                    >
                      <FontAwesomeIcon icon={faEye} /> {/* View */}
                    </buttonn>

                    <buttonn
                      className="text-blue-500 mx-1"
                      onClick={() => handNewPayment(benhAn._id)}
                    >
                      <FontAwesomeIcon icon={faPrint} /> {/* Print */}
                    </buttonn>

                    <buttonn className="text-purple-500 mx-1">
                      <FontAwesomeIcon icon={faEdit} /> {/* Edit */}
                    </buttonn>
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
