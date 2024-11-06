import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';

const DSBenhAn = () => {
    const [benhAnList, setBenhAnList] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchBenhAnData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/medicalRecord/getmdcRecordAll`)
                if (response.data.success) {
                    setBenhAnList(response.data.benhAnAll);
                }
            } catch (error) {
                console.error("Có lỗi khi lấy dữ liệu bệnh án: ", error);
            }
        };

        fetchBenhAnData();
    }, []);

    // Hàm để xử lý thay đổi trạng thái
    const handleStatusChange = async (e, id) => {
        const newStatus = e.target.value;
        setBenhAnList((prevList) =>
            prevList.map((benhAn) =>
                benhAn._id === id ? { ...benhAn, trangThai: newStatus } : benhAn
            )
        );
        try {
            const response = await axios.post(`${BASE_URL}/api/v1/medicalRecord/updatemdcRecord/${id}`, { trangThai: newStatus }); // Thay thế 'API_URL' bằng URL của bạn
            if (response.data.success) {
                toast.success('Cập nhật trạng thái thành công!');
            } else {
                toast.error('Cập nhật trạng thái thất bại!');
            }
        } catch (error) {
            toast.error('Có lỗi khi cập nhật trạng thái!');
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <div className='title-ad'>
                <h1>DANH SÁCH BỆNH ÁN</h1>
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>Họ tên bệnh nhân</th>
                        <th>Ngày khám</th>
                        <th>Chẩn đoán</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {benhAnList.length > 0 ? (
                        benhAnList.map((benhAn) => (
                            <tr key={benhAn._id}>
                                <td>{benhAn.benhNhan.ten}</td>
                                <td>{new Date(benhAn.ngayKham).toLocaleDateString()}</td>
                                <td>{benhAn.chanDoan}</td>
                                <td>
                                    <select
                                        value={benhAn.trangThai}
                                        onChange={(e) => handleStatusChange(e, benhAn._id)}
                                        className={
                                            benhAn.trangThai === 'hoanThanh'
                                                ? 'status-hoanThanh'
                                                : benhAn.trangThai === 'daXuatVien'
                                                    ? 'status-daXuatVien'
                                                    : 'status-dangDieuTri'
                                        }
                                    >
                                        <option value="hoanThanh">Hoàn thành</option>
                                        <option value="daXuatVien">Đã xuất viện</option>
                                        <option value="dangDieuTri">Đang điều trị</option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">Không có dữ liệu bệnh án.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DSBenhAn;
