import './Them.css';
import { FaChevronLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import uploadImageToCloudinary from '../../../utils/uploadCloudinary';
import { BASE_URL } from '../../../config';

const ThemBacSi = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "", // Email bác sĩ
    matKhau: "", // Mật khẩu
    ten: "", // Tên bác sĩ
    soDienThoai: "", // Số điện thoại
    hinhAnh: "", // Hình ảnh
    gioiTinh: "", // Giới tính
    ngaySinh: "", // Ngày sinh
    cccd: "", // Căn cước công dân
    diaChi: "", // Địa chỉ
    chuyenKhoa: "", // Chuyên khoa
    giaKham: "", // Giá khám
    // bangCap: "" , // Bằng cấp
    // kinhNghiem:"" , // Kinh nghiệm
    gioiThieuNgan: "", // Giới thiệu ngắn
    // gioiThieuChiTiet: "", // Giới thiệu chi tiết
    // lichLamViec: "" , // Lịch làm việc
    trangThai: "duocDuyet", // Trạng thái phê duyệt
    role: "BacSi"
    //lichHen: [{ type: mongoose.Types.ObjectId, ref: "LichHen" }], // Lịch hẹn
  });

  const navigate = useNavigate();
  const [previewURL, setPreviewURL] = useState(""); // URL ảnh xem trước
  const [selectedFile, setSelectedFile] = useState(null); // File ảnh mới
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, hinhAnh: data.url });
  }


  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/v1/doctors/addDoctor`, {
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
      navigate("/admin/danhsachbacsi");

    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };


  return (
    <div>
      <div className='title-ad'>
        <div className='icon-back'>
          <Link to="/admin/danhsachbacsi">
            <FaChevronLeft color='#66B5A3' />
          </Link>
        </div>
        <h1>THÊM BÁC SĨ</h1>
      </div>
      <form action="#" class="form" onSubmit={submitHandler}>
        <div className="mb-4 flex items-center gap-2">
          {/* Hiển thị ảnh hiện tại hoặc ảnh mới được chọn */}
          <figure className="w-[100px] h-[100px] mt-3 rounded-full border-2 border-solid border-primaryColor flex items-center justify-center overflow-hidden">
            <img
              src={previewURL || "/Images/addAvatar.png"} // Ảnh hiện có hoặc ảnh mặc định
              alt="Hình ảnh người dùng"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="relative w-[110px] h-[40px]">
            <input
              type="file"
              name="hinhAnh"
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

        <div class="input-box">
          <label>Họ và tên</label>
          <input type="text" name="ten" value={formData.ten} onChange={handleInputChange} />
        </div>
        <div class="column">
            <div className="input-box">
              <label>Ngày sinh</label>
              <input type="date" name="ngaySinh" value={formData.ngaySinh} onChange={handleInputChange} />
            </div>
            <div className="input-box">
              <label>Căn cước công dân</label>
              <input type="text" name="cccd" value={formData.cccd} onChange={handleInputChange} />
            </div>
            <div className="input-box">
            <label>Giới tính</label>
              <div class="select-box">
                <select name="gioiTinh" value={formData.gioiTinh} onChange={handleInputChange}>
                  <option value="">Chọn</option>
                  <option value="nam">Nam</option>
                  <option value="nu">Nữ</option>
                  <option value="khac">Khác</option>
                </select>
              </div>
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
              <select name="chuyenKhoa" value={formData.chuyenKhoa} onChange={handleInputChange}>
                <option hidden>Chuyên khoa</option>
                <option value="Tiêu hoá">Tiêu hoá</option>
                <option value="Phẫu thuật Tạo hình - Thẩm mỹ">Phẫu thuật Tạo hình - Thẩm mỹ</option>
                <option value="Khám sức khoẻ tổng quát dành cho doanh nhân">Khám sức khoẻ tổng quát dành cho doanh nhân</option>
                <option value="Khám sức khoẻ Doanh nghiệp">Khám sức khoẻ Doanh nghiệp</option>
                <option value="Hỗ trợ sinh sản">Hỗ trợ sinh sản</option>
                <option value="Nhi khoa">Nhi khoa</option>
                <option value="Sản phụ khoa">Sản phụ khoa</option>
              </select>
            </div>
            <input type="password" placeholder="Mật khẩu"
              name="matKhau" value={formData.matKhau} onChange={handleInputChange} />
          </div>
          


          <div className="input-box">
            <label>Địa chỉ</label>
            <input type="text" name="diaChi" value={formData.diaChi} onChange={handleInputChange} />
          </div>
          <div className="input-box">
            <label>Giá khám</label>
            <input type="number" name="giaKham" value={formData.giaKham} onChange={handleInputChange} />
          </div>
          <div className="input-box">
            <label>Mô tả</label>
            <input type="text" name="giaKham" value={formData.gioiThieuNgan} onChange={handleInputChange} />
          </div>
          {/* <div className="input-box">
            <label>Giới thiệu ngắn</label>
            <textarea name="gioiThieuNgan" value={formData.gioiThieuNgan} onChange={handleInputChange}></textarea>
          </div>

          <div className="input-box">
            <label>Giới thiệu chi tiết</label>
            <textarea name="gioiThieuChiTiet" value={formData.gioiThieuChiTiet} onChange={handleInputChange}></textarea>
          </div> */}



        </div>


        <button type="submit" disabled={loading}>
          {loading ? <HashLoader size={35} color="#ffffff" /> : 'Tạo'}
        </button>
      </form>
    </div>
  )
}

export default ThemBacSi