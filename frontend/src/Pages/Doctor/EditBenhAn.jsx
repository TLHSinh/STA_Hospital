import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import { AuthContext } from "../../context/AuthContext";
// import "../Customer/ChiTietBenhAn.css";
import "./EditBenhAn.css";

const EditMedicalRecord = () => {
  const [benhAn, setBenhAn] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBenhAnData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/medicalRecord/getmdcRecord/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setBenhAn(response.data.benhAn);
        } else {
          toast.error("Không thể lấy thông tin bệnh án.");
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        toast.error("Không thể tải dữ liệu, vui lòng thử lại.");
      }
    };

    fetchBenhAnData();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBenhAn({ ...benhAn, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/medicalRecord/updateMDC/${id}`,
        benhAn,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from API:", response.data); // Log phản hồi từ API
      if (response.data.success) {
        toast.success("Cập nhật bệnh án thành công!");
        navigate(-1); // Quay lại trang trước
      } else {
        toast.error("Cập nhật không thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật bệnh án:", error);
      toast.error("Lỗi khi cập nhật bệnh án, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (!benhAn) {
    return (
      <div className="record-container">
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="record-container">
      <div className="record-header">Chỉnh Sửa Bệnh Án</div>
      <form onSubmit={handleSubmit} className="record-form">
        {/* Thông tin bệnh nhân */}
        <div className="section">
          <div className="section-title">Thông tin bệnh nhân</div>
          <div className="section-content">
            <div>
              <label className="labelba">Họ Tên:</label>
              <input
                type="text"
                name="benhNhan.ten"
                value={benhAn.benhNhan.ten}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="labelba">Ngày Sinh:</label>
              <input
                type="date"
                name="benhNhan.ngaySinh"
                value={benhAn.benhNhan.ngaySinh || ""}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="labelba">Địa Chỉ:</label>
              <input
                type="text"
                name="benhNhan.diaChi"
                value={benhAn.benhNhan.diaChi}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Thông tin y tế */}
        <div className="section">
          <div className="section-title">Thông tin y tế chung</div>
          <div className="section-content">
            <div>
              <label className="labelba">Chẩn Đoán:</label>
              <input
                type="text"
                name="chanDoan"
                value={benhAn.chanDoan}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="labelba">Triệu Chứng:</label>
              <textarea
                name="trieuChung"
                value={benhAn.trieuChung}
                onChange={handleChange}
                className="input-field textarea"
              />
            </div>
            <div>
              <label className="labelba">Phương Pháp Điều Trị:</label>
              <textarea
                name="phuongPhapDieuTri"
                value={benhAn.phuongPhapDieuTri}
                onChange={handleChange}
                className="input-field textarea"
              />
            </div>
            <div>
              <label className="labelba">Tiền Sử Bệnh Lý:</label>
              <textarea
                name="tienSuBenhLy"
                value={benhAn.tienSuBenhLy}
                onChange={handleChange}
                className="input-field textarea"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${
              loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMedicalRecord;
