import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../context/AuthContext';

const DSBenhAn = () => {
    const [benhAnList, setBenhAnList] = useState([]);
    const { token, user } = useContext(AuthContext);
    const patientId = user._id;

    useEffect(() => {
        const fetchBenhAnData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/medicalRecord/getpatimdcRecord/${patientId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.success) {
                    setBenhAnList(response.data.paRecord);
                }
            } catch (error) {
                console.error("Có lỗi khi lấy dữ liệu bệnh án: ", error);
                toast.error("Không thể tải danh sách bệnh án, vui lòng thử lại sau.");
            }
        };

        fetchBenhAnData();
    }, [token]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-6">
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden p-8">
                <h3 className="text-3xl font-bold text-blue-800 mb-6 text-center">Danh sách bệnh án</h3>
                
                { benhAnList.length > 0 ? (
                    <ul className="space-y-4">
                        {benhAnList.map((benhAn) => (
                            <li 
                                key={benhAn._id} 
                                className="p-6 border rounded-lg shadow-md bg-gray-50 hover:shadow-lg transition-shadow duration-200"
                            >
                                <p className="text-lg font-semibold text-gray-700"><strong>Chẩn đoán:</strong> {benhAn.chanDoan}</p>
                                <p className="text-gray-600"><strong>Triệu chứng:</strong> {benhAn.trieuChung}</p>
                                <p className="text-gray-600"><strong>Ngày khám:</strong> {new Date(benhAn.ngayKham).toLocaleDateString()}</p>
                                <p className="text-gray-600"><strong>Trạng thái:</strong> {benhAn.trangThai}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-600">Không có bệnh án nào.</p>
                )}
            </div>
        </div>
    );
};

export default DSBenhAn;
