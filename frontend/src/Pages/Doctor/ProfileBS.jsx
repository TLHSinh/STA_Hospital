

import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';
import './Doctor.css';

const DoctorProfile = () => {
    const { user, dispatch } = useContext(AuthContext);
    const [isEdit, setIsEdit] = useState(false);
    const [userData, setUserData] = useState({
        ten: user?.ten || '',
        email: user?.email || '',
        soDienThoai: user?.soDienThoai || '',
        diaChi: user?.diaChi || '',
        gioiTinh: user?.gioiTinh || '',
        ngaySinh: user?.ngaySinh || '',
    });

    // Hàm cập nhật thông tin bác sĩ
    const handleSave = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/v1/doctors/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(userData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            // Cập nhật AuthContext với dữ liệu mới
            dispatch({ type: 'UPDATE_USER', payload: data.updatedUser });

            toast.success('Thông tin đã được cập nhật thành công');
            setIsEdit(false);
        } catch (error) {
            toast.error(`Lỗi: ${error.message}`);
        }
    };

    return (
        <div className="max-w-lg flex flex-col gap-4 p-6 text-sm">
            <img className="w-36 rounded-full mx-auto" src={user.hinhAnh} alt="Profile" />

            {isEdit ? (
                <input
                    className="bg-gray-50 text-3xl font-medium max-w-60 text-center"
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
            ) : (
                <p className="font-medium text-3xl text-center text-neutral-800">{userData.ten}</p>
            )}

            <hr className="bg-zinc-400 h-[1px] border-none" />

            <div>
                <p className="font-semibold text-gray-600">CONTACT INFORMATION</p>
                <div className="mt-2">
                    <p className="text-gray-600">Email:</p>
                    {isEdit ? (
                        <input
                            type="text"
                            className="bg-gray-50 w-full mt-1 p-1 border rounded"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                    ) : (
                        <p className="text-blue-600">{userData.email}</p>
                    )}
                </div>
                <div className="mt-2">
                    <p className="text-gray-600">Phone:</p>
                    {isEdit ? (
                        <input
                            type="text"
                            className="bg-gray-50 w-full mt-1 p-1 border rounded"
                            value={userData.soDienThoai}
                            onChange={(e) => setUserData({ ...userData, soDienThoai: e.target.value })}
                        />
                    ) : (
                        <p className="text-blue-600">{userData.soDienThoai}</p>
                    )}
                </div>
                <div className="mt-2">
                    <p className="text-gray-600">Address:</p>
                    {isEdit ? (
                        <input
                            type="text"
                            className="bg-gray-50 w-full mt-1 p-1 border rounded"
                            value={userData.diaChi}
                            onChange={(e) => setUserData({ ...userData, diaChi: e.target.value })}
                        />
                    ) : (
                        <p>{userData.diaChi}</p>
                    )}
                </div>
            </div>

            <hr className="bg-zinc-400 h-[1px] border-none" />

            <div>
                <p className="font-semibold text-gray-600">BASIC INFORMATION</p>
                <div className="mt-2">
                    <p className="text-gray-600">Giới tính:</p>
                    {isEdit ? (
                        <input
                            type="text"
                            className="bg-gray-50 w-full mt-1 p-1 border rounded"
                            value={userData.gioiTinh}
                            onChange={(e) => setUserData({ ...userData, gioiTinh: e.target.value })}
                        />
                    ) : (
                        <p>{userData.gioiTinh}</p>
                    )}
                </div>
                <div className="mt-2">
                    <p className="text-gray-600">Ngày sinh:</p>
                    {isEdit ? (
                        <input
                            type="date"
                            className="bg-gray-50 w-full mt-1 p-1 border rounded"
                            value={userData.ngaySinh}
                            onChange={(e) => setUserData({ ...userData, ngaySinh: e.target.value })}
                        />
                    ) : (
                        <p>{userData.ngaySinh}</p>
                    )}
                </div>
            </div>

            <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mt-4 mx-auto"
                onClick={isEdit ? handleSave : () => setIsEdit(true)}
            >
                {isEdit ? 'Save' : 'Edit'}
            </button>
        </div>
    );
};

export default DoctorProfile;