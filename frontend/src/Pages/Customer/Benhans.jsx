import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPrint } from "@fortawesome/free-solid-svg-icons";

const DSBenhAn = () => {
  const [benhAnList, setBenhAnList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState(""); // Trạng thái sắp xếp
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const patientId = user._id;

  // Fetch dữ liệu bệnh án
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
        toast.warn("Không tìm thấy bệnh án nào.");
      }
    } catch (error) {
      toast.error("Không thể tải danh sách bệnh án, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  // Hàm sắp xếp
  const sortData = (type) => {
    let sortedData = [...benhAnList];
    if (type === "sttT") {
      // Sắp xếp theo STT tăng dần
      sortedData = benhAnList.map((item, index) => ({
        ...item,
        stt: index + 1,
      }));
    } else if (type === "sttG") {
      // Sắp xếp theo STT giảm dần
      sortedData = benhAnList
        .map((item, index) => ({ ...item, stt: index + 1 }))
        .reverse();
    } else if (type === "ten") {
      // Sắp xếp theo tên bệnh nhân
      sortedData.sort((a, b) => {
        const nameA = a.benhNhan?.ten || "";
        const nameB = b.benhNhan?.ten || "";
        return nameA.localeCompare(nameB);
      });
    } else if (type === "ngayKhamC") {
      // Sắp xếp ngày khám từ cũ → mới
      sortedData.sort((a, b) => new Date(a.ngayKham) - new Date(b.ngayKham));
    } else if (type === "ngayKhamM") {
      // Sắp xếp ngày khám từ mới → cũ
      sortedData.sort((a, b) => new Date(b.ngayKham) - new Date(a.ngayKham));
    }
    setBenhAnList(sortedData);
  };

  // Xử lý thay đổi loại sắp xếp
  useEffect(() => {
    if (sortType) {
      sortData(sortType);
    }
  }, [sortType]);

  useEffect(() => {
    fetchBenhAnData();
  }, [token, patientId]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">
        Danh Sách Bệnh Án
      </h1>

      {/* Bộ chọn sắp xếp */}
      <div className="mb-4 flex justify-end space-x-4">
        <select
          className="p-2 border border-gray-300 rounded-md shadow focus:outline-none"
          onChange={(e) => setSortType(e.target.value)}
          value={sortType}
        >
          <option value="">Chọn cách sắp xếp</option>
          <option value="sttT">STT (Tăng dần)</option>
          <option value="sttG">STT (Giảm dần)</option>
          <option value="ten">Tên bệnh nhân (A-Z)</option>
          <option value="ngayKhamC">Ngày khám (Cũ → Mới)</option>
          <option value="ngayKhamM">Ngày khám (Mới → Cũ)</option>
        </select>
      </div>

      <div className="overflow-hidden bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
            <tr>
              <th className="p-4 text-left uppercase text-lg tracking-wide font-semibold border-b border-gray-200">
                STT
              </th>
              <th className="p-4 text-left uppercase text-lg tracking-wide font-semibold border-b border-gray-200">
                Mã số
              </th>
              <th className="p-4 text-left uppercase text-lg tracking-wide font-semibold border-b border-gray-200">
                Bệnh nhân
              </th>
              <th className="p-4 text-left uppercase text-lg tracking-wide font-semibold border-b border-gray-200">
                Chẩn đoán
              </th>
              <th className="p-4 text-left uppercase text-lg tracking-wide font-semibold border-b border-gray-200">
                Ngày khám
              </th>
              <th className="p-4 text-center uppercase text-lg tracking-wide font-semibold border-b border-gray-200">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
                    <span>Đang tải dữ liệu...</span>
                  </div>
                </td>
              </tr>
            ) : benhAnList.length > 0 ? (
              benhAnList.map((benhAn, index) => (
                <tr
                  key={benhAn._id}
                  className="hover:bg-blue-100 transition-colors"
                >
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{benhAn._id.slice(-4)}</td>
                  <td className="p-3 border">
                    {benhAn.benhNhan?.ten || "N/A"}
                  </td>
                  <td className="p-3 border">{benhAn.chanDoan}</td>
                  <td className="p-3 border">
                    {new Date(benhAn.ngayKham).toLocaleDateString()}
                  </td>
                  <td className="p-3 border text-center space-x-3">
                    <button
                      className="p-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                      onClick={() =>
                        navigate(`/customer/chitietbenhans/${benhAn._id}`)
                      }
                    >
                      <FontAwesomeIcon icon={faEye} /> Xem
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center">
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
