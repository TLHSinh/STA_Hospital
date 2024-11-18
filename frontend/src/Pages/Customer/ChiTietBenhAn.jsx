import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';
import './ChiTietBenhAn.css';

const ChiTietBenhAn = () => {
  const [benhAn, setBenhAn] = useState(null);
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBenhAnData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/medicalRecord/getmdcRecord/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setBenhAn(response.data.benhAn);
        } else {
          toast.error('Không thể lấy chi tiết bệnh án.');
        }
      } catch (error) {
        console.error('Có lỗi khi lấy dữ liệu bệnh án:', error);
        toast.error('Không thể tải thông tin bệnh án, vui lòng thử lại sau.');
      }
    };

    fetchBenhAnData();
  }, [id, token]);

  if (!benhAn) {
    return (
      <div className="record-container">
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="record-container">
      <div className="record-header">Hồ Sơ Y Tế Bệnh Nhân</div>
      <div className="record-content">
        {/* Left Column */}
        <div className="left-column">
          <div className="section">
            <div className="section-title">Thông tin bệnh nhân</div>
            <div className="section-content">
              <div>
                <span className="labelba">Họ Tên:</span> <span className="value">{benhAn.benhNhan.ten}</span>
              </div>
              <div>
                <span className="labelba">Ngày Sinh:</span>{" "}
                <span className="value">
                  {benhAn.benhNhan.ngaySinh
                    ? new Date(benhAn.benhNhan.ngaySinh).toLocaleDateString()
                    : 'Không xác định'}
                </span>
              </div>
              <div>
                <span className="labelba">Địa Chỉ:</span> <span className="value">{benhAn.benhNhan.diaChi}</span>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="section-title">Thông tin bác sĩ</div>
            <div className="section-content">
              <div>
                <span className="labelba">Họ Tên:</span> <span className="value">{benhAn.bacSi.ten}</span>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="section-title">Thông tin y tế chung</div>
            <div className="section-content">
              <div>
                <span className="labelba">Chẩn Đoán:</span> <span className="value">{benhAn.chanDoan}</span>
              </div>
              <div>
                <span className="labelba">Triệu Chứng:</span> <span className="value">{benhAn.trieuChung}</span>
              </div>
              <div>
                <span className="labelba">Phương Pháp Điều Trị:</span>{" "}
                <span className="value">{benhAn.phuongPhapDieuTri}</span>
              </div>
              <div>
                <span className="labelba">Tiền Sử Bệnh Lý:</span> <span className="value">{benhAn.tienSuBenhLy}</span>
              </div>
              <div>
                <span className="labelba">Đánh Giá Điều Trị:</span>{" "}
                <span className="value">{benhAn.danhGiaDieuTri}</span>
              </div>
              <div>
                <span className="labelba">Trạng Thái:</span>{" "}
                <span className="value">
                  {benhAn.trangThai === 'dangDieuTri' ? 'Đang điều trị' : 'Hoàn thành'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <div className="section">
            <div className="section-title">Kết quả xét nghiệm</div>
            <div className="xetnghiem-content">
              {benhAn.ketQuaXetNghiem.length > 0 ? (
                benhAn.ketQuaXetNghiem.map((xetNghiem, index) => (
                  <div key={index}>
                    <span className="labelba">Ngày Xét Nghiệm:</span>{" "}
                    <span className="value">{new Date(xetNghiem.ngayXetNghiem).toLocaleDateString()}</span>
                    <br />
                    <span className="labelba">Kết Quả:</span> <span className="value">{xetNghiem.ketQua}</span>
                    <br />
                    <span className="labelba">Ghi Chú:</span> <span className="value">{xetNghiem.ghiChu}</span>
                  </div>
                ))
              ) : (
                <p>Không có kết quả xét nghiệm.</p>
              )}
            </div>
          </div>

          <div className="section">
  <div className="section-title">Đơn thuốc</div>
  <div className="donthuoc-content">
    {benhAn.donThuoc.length > 0 ? (
      benhAn.donThuoc.map((don, index) => (
        <div key={index} className="prescription-card">
          <div className="prescription-header">
            <div>
              <span className="labelba">Ngày Đơn Thuốc:</span>
              <span className="value">
                {new Date(don.ngayDonThuoc).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="labelba">Lời Khuyên:</span>
              <span className="value">{don.loiKhuyen}</span>
            </div>
          </div>
          <div className="medications">
            <h4 className="medications-title">Danh sách thuốc:</h4>
            <table className="medications-table">
              <thead>
                <tr>
                  <th className="wide-column">Tên Thuốc</th>
                  <th className="small-column">Liều Dùng</th>
                  <th className="small-column">Số Lần Uống</th>
                  <th className="note-column">Ghi Chú</th>
                </tr>
              </thead>
              <tbody>
                {don.thuoc.map((thuoc, i) => (
                  <tr key={i}>
                    <td>{thuoc.tenVatTu}</td>
                    <td>{thuoc.lieuDung}</td>
                    <td>{thuoc.soLanUong}</td>
                    <td>{thuoc.ghiChu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))
    ) : (
      <p>Không có đơn thuốc.</p>
    )}
  </div>
</div>

        </div>
      </div>

      <button onClick={() => navigate(-1)} className="back-button" style={{ margin: "30px auto 0"}}>Quay lại</button>
    </div>
  );
};

export default ChiTietBenhAn;
