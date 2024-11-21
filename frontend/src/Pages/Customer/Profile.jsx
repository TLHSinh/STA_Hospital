import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from "react-toastify";
import { BASE_URL } from '../../config';
import HashLoader from 'react-spinners/HashLoader';
import uploadImageToCloudinary from "../../utils/uploadCloudinary.js";

function Profile() {
    const { user, token, dispatch } = useContext(AuthContext);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState(user?.hinhAnh || "https://via.placeholder.com/150");

    const getInitialFormData = () => ({
        ten: user?.ten || "",
        email: user?.email || "",
        soDienThoai: user?.soDienThoai || "",
        ngaySinh: user?.ngaySinh || "",
        diaChi: user?.diaChi || "",
        gioiTinh: user?.gioiTinh || "",
        nhomMau: user?.nhomMau || "",
        cccd: user?.cccd || "",
        hinhAnh: user?.hinhAnh || "",
    });

    const [formData, setFormData] = useState(getInitialFormData());

    const fetchUserProfile = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/v1/users/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = await res.json();
            if (res.ok && result.success) {
                dispatch({ type: 'UPDATE_USER', payload: result.data });
                setFormData(result.data);
                setPreviewImage(result.data.hinhAnh || "https://via.placeholder.com/150");
            } else {
                throw new Error(result.message || "Không thể tải thông tin người dùng");
            }
        } catch (error) {
            toast.error(`Lỗi: ${error.message}`);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUserProfile();
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const data = await uploadImageToCloudinary(file);
                setPreviewImage(data.url);
                setFormData((prevData) => ({ ...prevData, hinhAnh: data.url }));
            } catch (error) {
                toast.error("Lỗi khi tải ảnh lên Cloudinary");
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`${BASE_URL}/api/v1/users/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();
            if (res.ok && result.success) {
                toast.success("Cập nhật thành công!");
                dispatch({ type: 'UPDATE_USER', payload: result.data });
                setFormData(result.data);
                setIsEditing(false);
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
    <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg overflow-hidden p-8">
        <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
                <img
                    className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover"
                    src={previewImage}
                    alt="Profile"
                />
                {isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer transition duration-300 ease-in-out hover:bg-opacity-70">
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
            <h2 className="text-3xl font-semibold text-gray-800">{formData.ten}</h2>
            <p className="text-gray-600 text-lg">{formData.email}</p>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-blue-500 mb-2">Thông tin cá nhân</h3>
        </div>

    {/* Họ và Tên */}
    <div className="flex flex-col md:col-span-2">
        <label className="block text-gray-700 font-medium mb-1">Họ và tên</label>
        <input
            type="text"
            name="ten"
            value={formData.ten}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
    </div>

    {/* Ngày sinh */}
    <div className="flex flex-col">
        <label className="block text-gray-700 font-medium mb-1">Ngày sinh</label>
        <input
            type="date"
            name="ngaySinh"
            value={formData.ngaySinh}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
    </div>

    {/* Giới tính */}
    <div className="flex flex-col">
        <label className="block text-gray-700 font-medium mb-1">Giới tính</label>
        <select
            name="gioiTinh"
            value={formData.gioiTinh}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
            <option value="">Chọn giới tính</option>
            <option value="nam">Nam</option>
            <option value="nu">Nữ</option>
            <option value="khac">Khác</option>
        </select>
    </div>

    <div className="col-span-1 md:col-span-2">
        <h3 className="text-xl font-bold text-blue-500 mb-2">Thông tin liên hệ</h3>
    </div>
    {/* Email */}
    <div className="flex flex-col">
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
    </div>

    {/* Số điện thoại */}
    <div className="flex flex-col">
        <label className="block text-gray-700 font-medium mb-1">Số điện thoại</label>
        <input
            type="text"
            name="soDienThoai"
            value={formData.soDienThoai}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
    </div>

    {/* Địa chỉ */}
    <div className="flex flex-col md:col-span-2">
        <label className="block text-gray-700 font-medium mb-1">Địa chỉ</label>
        <input
            type="text"
            name="diaChi"
            value={formData.diaChi}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
    </div>

    <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-blue-500 mb-2">Thông tin bổ sung</h3>
        </div>
    

    {/* Nhóm máu */}
    <div className="flex flex-col">
        <label className="block text-gray-700 font-medium mb-1">Nhóm máu</label>
        <input
            type="text"
            name="nhomMau"
            value={formData.nhomMau}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
    </div>

    {/* CCCD */}
    <div className="flex flex-col">
        <label className="block text-gray-700 font-medium mb-1">CCCD</label>
        <input
            type="text"
            name="cccd"
            value={formData.cccd}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
    </div>

    <div className="flex justify-center col-span-1 md:col-span-2 mt-6">
        <button
            type="button"
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            disabled={saving}
            className={`w-full py-4 rounded-lg text-white font-semibold transition duration-300 ease-in-out ${
                saving ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            } shadow-md`}
        >
            {isEditing ? (saving ? <HashLoader size={20} color="#fff" /> : "Lưu Thay Đổi") : "Chỉnh Sửa Thông Tin"}
        </button>
    </div>
</form>

    </div>
</div>
    );
}

export default Profile;
