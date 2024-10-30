import './Them.css';
import { FaChevronLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import uploadImageToCloudinary from '../../../utils/uploadCloudinary';
import { BASE_URL } from '../../../config';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
const ThemKhachHang = () => {

  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    ten: "",             // Tên bệnh nhân
    email: "",           // Email
    matKhau: "",         // Mật khẩu
    hinhAnh: "", // Hình ảnh (URL)
    gioiTinh: "",        // Giới tính
    role: "BenhNhan",    // Vai trò: mặc định là bệnh nhân
    soDienThoai: "",
    ngaySinh: "",
    cccd: "",
    diaChi: "",
    nhomMau: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, hinhAnh: data.url });
  };


  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/v1/users/addUser`, {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)  // Gửi formData lên backend
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/admin/danhsachkhachhang");

    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='title-ad'>
        <div className='icon-back'>
          <Link to="/admin/danhsachkhachhang">
            <FaChevronLeft color='#66B5A3' />
          </Link>
        </div>
        <h1>THÊM KHÁCH HÀNG</h1>
      </div>

      <form className="form" onSubmit={submitHandler}>
      <div className="mb-4 flex items-center gap-2">
          {selectedFile && (
            <figure className="w-[50px] h-[50px] mt-3 rounded-full border-2 border-solid border-primaryColor flex items-center justify-center overflow-hidden">
              <img src={previewURL} alt="" className="w-full h-full object-cover" />
            </figure>
          )}

          <div className="relative w-[110px] h-[40px]">
            <input
              type="file"
              name="hinhAnh"  // Phải là 'hinhAnh' theo schema
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[13px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              Hình ảnh
            </label>
          </div>
        </div>
      <div class="column">
          <div class="input-box">
            <label>Họ và tên</label>
            <input type="text" name="ten" value={formData.ten} onChange={handleInputChange} />
          </div>
          <div class="input-box">
            <label>Ngày sinh</label>
            <input type="date" name="ngaySinh" value={formData.ngaySinh} onChange={handleInputChange} />
          </div>
        </div>
        <div class="column">
          <div class="input-box">
            <label>Số điện thoại</label>
            <input type="text" name="soDienThoai" value={formData.soDienThoai} onChange={handleInputChange} />
          </div>
          <div class="input-box">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
          </div>
        </div>
        <div class="input-box address">
          <div class="column">
            <div class="select-box">
              <select
                name="gioiTinh"  // Phải là 'gioiTinh' theo schema
                value={formData.gioiTinh}
                onChange={handleInputChange}
              >
                <option value="">Chọn</option>
                <option value="nam">Nam</option>
                <option value="nu">Nữ</option>
                <option value="khac">Khác</option>
              </select>
            </div>
            <input type="text" name="nhomMau" value={formData.nhomMau} onChange={handleInputChange} placeholder="Nhóm máu" />
          </div>
        </div>
        <div class="column">
          <div class="input-box">
            <label>CCCD</label>
            <input type="text" name="cccd" value={formData.cccd} onChange={handleInputChange} />
          </div>
          <div class="input-box">
            <label>Mật khẩu</label>
            <input type="password" name="matKhau" value={formData.matKhau} onChange={handleInputChange} />
          </div>
        </div>
        

        <div class="input-box">
          <label>Địa chỉ</label>
          <input type="text" name="diaChi" value={formData.diaChi} onChange={handleInputChange} />
        </div>
        

        <div className="mt-6">
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-primaryColor text-white text-[14px] leading-[26px] rounded-lg px-2 py-2"
          >
            {loading ? <HashLoader size={35} color="#ffffff" /> : 'Đăng Ký'}
          </button>
        </div>
      </form>
    </div>

  )
}

export default ThemKhachHang