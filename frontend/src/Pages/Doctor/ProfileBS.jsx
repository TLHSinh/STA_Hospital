import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';
import { HashLoader } from 'react-spinners';

const DoctorProfile = () => {
    const { user, dispatch, token } = useContext(AuthContext);
    const [saving, setSaving] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [previewImage, setPreviewImage] = useState(user.hinhAnh || "https://via.placeholder.com/150");

    const initialFormData = {
        ten: user.ten || '',
        email: user.email || '',
        soDienThoai: user.soDienThoai || '',
        diaChi: user.diaChi || '',
        gioiTinh: user.gioiTinh || '',
        ngaySinh: user.ngaySinh || '',
    };

    const [userData, setUserData] = useState(initialFormData);

    useEffect(() => {
        setUserData(initialFormData);
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch(`${BASE_URL}/api/v1/doctors/${user._id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            });

            const result = await res.json();
            if (result.success) {
                toast.success("Cập nhật thành công!");
                dispatch({ type: 'UPDATE_USER', payload: result.data });
                setIsEdit(false);
            } else {
                throw new Error(result.message || "Cập nhật không thành công");
            }
        } catch (error) {
            toast.error(`Lỗi: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                        <img
                            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
                            src={previewImage}
                            alt="Profile"
                        />
                        {isEdit && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer">
                                <span className="text-white text-3xl font-bold">+</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleImageChange}
                                />
                            </div>
                        )}
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">{userData.ten}</h2>
                    <p className="text-gray-600">{userData.email}</p>
                </div>

                <form onSubmit={handleSave} className="flex flex-wrap">
                    <div className="flex flex-col mb-4 w-1/2 p-2">
                        <label className="block text-gray-600 font-medium mb-1">Họ và tên</label>
                        <input
                            type="text"
                            name="ten"
                            value={userData.ten}
                            onChange={handleInputChange}
                            readOnly={!isEdit}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-1/2 p-2">
                        <label className="block text-gray-600 font-medium mb-1">Số điện thoại</label>
                        <input
                            type="text"
                            name="soDienThoai"
                            value={userData.soDienThoai}
                            onChange={handleInputChange}
                            readOnly={!isEdit}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-1/2 p-2">
                        <label className="block text-gray-600 font-medium mb-1">Ngày sinh</label>
                        <input
                            type="date"
                            name="ngaySinh"
                            value={userData.ngaySinh}
                            onChange={handleInputChange}
                            readOnly={!isEdit}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-1/2 p-2">
                        <label className="block text-gray-600 font-medium mb-1">Địa chỉ</label>
                        <input
                            type="text"
                            name="diaChi"
                            value={userData.diaChi}
                            onChange={handleInputChange}
                            readOnly={!isEdit}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col mb-4 w-1/2 p-2">
                        <label className="block text-gray-600 font-medium mb-1">Giới tính</label>
                        <select
                            name="gioiTinh"
                            value={userData.gioiTinh}
                            onChange={handleInputChange}
                            disabled={!isEdit}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="nam">Nam</option>
                            <option value="nu">Nữ</option>
                            <option value="khac">Khác</option>
                        </select>
                    </div>

                    <div className="flex justify-center col-span-2 w-full mt-6">
                        <button
                            type="button"
                            onClick={isEdit ? handleSave : () => setIsEdit(true)}
                            disabled={saving}
                            className={`w-full py-2 rounded-lg text-white font-semibold ${saving ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
                        >
                            {isEdit ? (saving ? <HashLoader size={20} color="#fff" /> : "Lưu Thay Đổi") : "Chỉnh Sửa Thông Tin"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DoctorProfile;
