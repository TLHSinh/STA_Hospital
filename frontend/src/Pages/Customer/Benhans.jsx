import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from "react-toastify";
import { BASE_URL } from '../../config';
import { HashLoader } from 'react-spinners';

function BenhAns() {
    const { user, token } = useContext(AuthContext);
    const [benhAns, setBenhAns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Gọi API để lấy dữ liệu bệnh án của bệnh nhân
        const fetchBenhAns = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${BASE_URL}/api/v1/medicalRecor/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await res.json();
                if (result.success) {
                    setBenhAns(result.data);
                } else {
                    throw new Error(result.message || "Không thể lấy dữ liệu bệnh án");
                }
            } catch (error) {
                toast.error(`Lỗi: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchBenhAns();
    }, [user._id, token]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Danh sách bệnh án</h3>
                
                {loading ? (
                    <div className="flex justify-center items-center">
                        <HashLoader size={50} color="#3498db" />
                    </div>
                ) : benhAns.length > 0 ? (
                    <ul className="space-y-4">
                        {benhAns.map((benhAn) => (
                            <li key={benhAn._id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                                <p><strong>Chẩn đoán:</strong> {benhAn.chanDoan}</p>
                                <p><strong>Triệu chứng:</strong> {benhAn.trieuChung}</p>
                                <p><strong>Ngày khám:</strong> {new Date(benhAn.ngayKham).toLocaleDateString()}</p>
                                <p><strong>Trạng thái:</strong> {benhAn.trangThai}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Không có bệnh án nào.</p>
                )}
            </div>
        </div>
    );
}

export default BenhAns;
