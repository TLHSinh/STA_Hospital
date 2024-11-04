import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from "react-toastify";
import { BASE_URL } from '../../config';
import { HashLoader } from 'react-spinners'; 

function Profile() {
    const { user, token, dispatch } = useContext(AuthContext);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState(user.hinhAnh || "https://via.placeholder.com/150");

    // Dữ liệu ban đầu của formData từ localStorage hoặc từ user
    const initialFormData = JSON.parse(localStorage.getItem('formData')) || {
        ten: user.ten || "",
        email: user.email || "",
        soDienThoai: user.soDienThoai || "",
        ngaySinh: user.ngaySinh || "",
        diaChi: user.diaChi || "",
        gioiTinh: user.gioiTinh || "",
        nhomMau: user.nhomMau || "",
        cccd: user.cccd || "",
        hinhAnh: user.hinhAnh || "",
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            setFormData({ ...formData, hinhAnh: file });
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
            if (result.success) {
                toast.success("Cập nhật thành công!");
                dispatch({ type: 'UPDATE_USER', payload: result.data });
                
                // Lưu thông tin người dùng vào localStorage
                localStorage.setItem('formData', JSON.stringify(formData));

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

    useEffect(() => {
        // Đọc dữ liệu từ localStorage khi component mount
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

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
                      {isEditing && (
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
                  <h2 className="text-2xl font-semibold text-gray-800">{formData.ten}</h2>
                  <p className="text-gray-600">{formData.email}</p>
              </div>

              <form onSubmit={handleSave} className="flex flex-wrap">
                  <div className="flex flex-col mb-4 w-1/2 p-2">
                      <label className="block text-gray-600 font-medium mb-1">Họ và tên</label>
                      <input
                          type="text"
                          name="ten"
                          value={formData.ten}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>
                  <div className="flex flex-col mb-4 w-1/2 p-2">
                      <label className="block text-gray-600 font-medium mb-1">Số điện thoại</label>
                      <input
                          type="text"
                          name="soDienThoai"
                          value={formData.soDienThoai}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>
                  <div className="flex flex-col mb-4 w-1/2 p-2">
                      <label className="block text-gray-600 font-medium mb-1">Ngày sinh</label>
                      <input
                          type="date"
                          name="ngaySinh"
                          value={formData.ngaySinh}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>
                  <div className="flex flex-col mb-4 w-1/2 p-2">
                      <label className="block text-gray-600 font-medium mb-1">Địa chỉ</label>
                      <input
                          type="text"
                          name="diaChi"
                          value={formData.diaChi}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>
                  <div className="flex flex-col mb-4 w-1/2 p-2">
                      <label className="block text-gray-600 font-medium mb-1">Giới tính</label>
                      <select
                          name="gioiTinh"
                          value={formData.gioiTinh}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                          <option value="">Chọn giới tính</option>
                          <option value="nam">Nam</option>
                          <option value="nu">Nữ</option>
                          <option value="khac">Khác</option>
                      </select>
                  </div>
                  <div className="flex flex-col mb-4 w-1/2 p-2">
                      <label className="block text-gray-600 font-medium mb-1">Nhóm máu</label>
                      <input
                          type="text"
                          name="nhomMau"
                          value={formData.nhomMau}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>
                  <div className="flex flex-col mb-4 w-1/2 p-2">
                      <label className="block text-gray-600 font-medium mb-1">CCCD</label>
                      <input
                          type="text"
                          name="cccd"
                          value={formData.cccd}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>
                  <div className="flex justify-center col-span-2 w-full mt-6">
                      <button
                          type="button"
                          onClick={isEditing ? handleSave : () => setIsEditing(true)}
                          disabled={saving}
                          className={`w-full py-2 rounded-lg text-white font-semibold ${
                              saving ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                          }`}
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
