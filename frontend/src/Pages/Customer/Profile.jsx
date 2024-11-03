import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from "react-toastify";
import { BASE_URL } from '../../config';
import HashLoader from "react-spinners/HashLoader";

function Profile() {
    
  const { user, token } = useContext(AuthContext); // Lấy user và token từ context
  const [formData, setFormData] = useState({
    ten: "",
    email: "",
    soDienThoai: "",
    ngaySinh: "",
    diaChi: "",
    gioiTinh: "",
    nhomMau: "",
    cccd: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Cập nhật formData khi user thay đổi
  useEffect(() => {
    if (user) {
      setFormData({
        ten: user.ten || "",
        email: user.email || "",
        soDienThoai: user.soDienThoai || "",
        ngaySinh: user.ngaySinh || "",
        diaChi: user.diaChi || "",
        gioiTinh: user.gioiTinh || "",
        nhomMau: user.nhomMau || "",
        cccd: user.cccd || "",
      });
    }
  }, [user]);

  // Xử lý khi thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý submit form cập nhật thông tin
  const handleUpdate = async (e) => {
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
            //navigate("/profile"); // Điều hướng về trang hồ sơ của người dùng
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Thông Tin Khách Hàng</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="mb-4">
          <label><strong>Họ và tên:</strong></label>
          <input
            type="text"
            name="ten"
            value={formData.ten}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label><strong>Email:</strong></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label><strong>Số điện thoại:</strong></label>
          <input
            type="text"
            name="soDienThoai"
            value={formData.soDienThoai}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label><strong>Ngày sinh:</strong></label>
          <input
            type="date"
            name="ngaySinh"
            value={formData.ngaySinh}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label><strong>Địa chỉ:</strong></label>
          <input
            type="text"
            name="diaChi"
            value={formData.diaChi}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label><strong>Giới tính:</strong></label>
          <select
            name="gioiTinh"
            value={formData.gioiTinh}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="input-field"
          >
            <option value="">Chọn giới tính</option>
            <option value="nam">Nam</option>
            <option value="nu">Nữ</option>
            <option value="khac">Khác</option>
          </select>
        </div>
        <div className="mb-4">
          <label><strong>Nhóm máu:</strong></label>
          <input
            type="text"
            name="nhomMau"
            value={formData.nhomMau}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="input-field"
          />
        </div>
        <div className="mb-4">
          <label><strong>CCCD:</strong></label>
          <input
            type="text"
            name="cccd"
            value={formData.cccd}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className="input-field"
          />
        </div>
        
        {/* Nút chỉnh sửa và lưu */}
        {!isEditing ? (
          <button
            className="btn btn-primary mt-4"
            onClick={() => setIsEditing(true)}
          >
            Chỉnh Sửa Thông Tin
          </button>
        ) : (
          <button
            className="btn btn-primary mt-4"
            onClick={handleUpdate}
            disabled={saving}
          >
            {saving ? <HashLoader size={20} color="#fff" /> : "Lưu Thay Đổi"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;