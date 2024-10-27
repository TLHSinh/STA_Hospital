// import { FaChevronLeft } from "react-icons/fa6";
// import './Them.css';
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { BASE_URL } from "../../../config";
// import { toast } from 'react-toastify';
// import HashLoader from 'react-spinners/HashLoader';

// const ThemThuocVatTu = () => {
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     tenVatTu: "", // Tên vật tư
//     loaiVatTu: "", // Loại vật tư
//     soLuong: "", // Số lượng
//     gia: "", // Giá
//     donViTinh: "", // Đơn vị tính của vật tư
//     ngayNhap: "", // Ngày nhập
//     //khoHang: "", // Kho hàng chứa
//     moTa: "", // Mô tả
//     ngaySanXuat: "", // Ngày sản xuất
//     hanSuDung: "", // Hạn sử dụng
//   });

//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const submitHandler = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch(`${BASE_URL}/api/v1/inventory/addInventory`, {
//         method: 'post',
//         headers: {
//           'Content-type': 'application/json'
//         },
//         body: JSON.stringify(formData)  // Gửi formData lên backend
//       });

//       const { message } = await res.json();

//       if (!res.ok) {
//         throw new Error(message);
//       }

//       setLoading(false);
//       toast.success(message);
//       navigate("/admin/danhsachthuocvattu");

//     } catch (err) {
//       toast.error(err.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className='title-ad'>
//         <div className='icon-back'>
//           <Link to="/admin/danhsachkhachhang">
//             <FaChevronLeft color='#66B5A3' />
//           </Link>
//         </div>
//         <h1>THÊM THUỐC</h1>
//       </div>
//       <form onSubmit={submitHandler} class="form">
//         <div class="column">
//           <div class="input-box">
//             <label>Tên vật tư</label>
//             <input type="text" name="tenVatTu" value={formData.tenVatTu}
//               onChange={handleInputChange} required />
//           </div>
//           <div class="input-box">
//             <label>Loại thuốc</label>
//             <div class="select-box">
//               <select
//                 name="loaiVatTu"
//                 value={formData.loaiVatTu}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Chọn</option>
//                 <option value="Thuoc">Thuoc</option>
//                 <option value="VatTu">VatTu</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         <div class="column">
//           <div class="input-box">
//             <label>Số lượng</label>
//             <input type="number" name="soLuong" value={formData.soLuong} onChange={handleInputChange} />
//           </div>
//           <div class="input-box">
//             <label>Đơn vị tính</label>
//             <input type="text" name="donViTinh" value={formData.donViTinh} onChange={handleInputChange} />
//           </div>
//         </div>
//         <div class="column">
//           <div class="input-box">
//             <label>Ngày nhập</label>
//             <input type="date" name="ngayNhap" value={formData.ngayNhap} onChange={handleInputChange} />
//           </div>
//           <div class="input-box">
//             <label>Ngày sản xuất</label>
//             <input type="date" name="ngaySanXuat" value={formData.ngaySanXuat} onChange={handleInputChange} />
//           </div>
//           <div class="input-box">
//             <label>Hạn sử dụng</label>
//             <input type="date" name="hanSuDung" value={formData.hanSuDung} onChange={handleInputChange} />
//           </div>
//         </div>
//         <div class="input-box">
//           <label>Giá</label>
//           <input type="number" name="gia" value={formData.gia} onChange={handleInputChange}/>
//         </div>
//         <div class="input-box">
//           <label>Mô tả</label>
//           <input type="text"  name="moTa"  value={formData.moTa} onChange={handleInputChange}/>
//         </div>
//         <button disabled={loading} type='submit'>
//           {loading ? <HashLoader size={35} color="#ffffff" /> : 'Tạo'}
//         </button>
//       </form>
//     </div>
//   )
// }

// export default ThemThuocVatTu











import { FaChevronLeft } from "react-icons/fa6";
import './Them.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../../../config";
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const ThemThuocVatTu = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    tenVatTu: "",
    loaiVatTu: "",
    soLuong: "",
    gia: "",
    donViTinh: "",
    ngayNhap: "",
    ngaySanXuat: "",
    hanSuDung: "",
    moTa: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const formattedDate = formatDateToDDMMYYYY(selectedDate);
    setFormData({ ...formData, dateOfBirth: formattedDate });
  };

  const formatDateToDDMMYYYY = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };





  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/v1/inventory/addInventory`, {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();
      if (!res.ok) throw new Error(message);

      setLoading(false);
      toast.success(message);
      navigate("/admin/danhsachthuocvattu");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='title-ad'>
        <div className='icon-back'>
          <Link to="/admin/danhsachthuocvattu">
            <FaChevronLeft color='#66B5A3' />
          </Link>
        </div>
        <h1>THÊM THUỐC</h1>
      </div>
      
      <form onSubmit={submitHandler} className="form">
        <div className="column">
          <div className="input-box">
            <label>Tên vật tư</label>
            <input type="text" name="tenVatTu" value={formData.tenVatTu} 
              onChange={handleInputChange} required />
          </div>
          <div className="input-box">
            <label>Loại thuốc</label>
            <div className="select-box">
              <select name="loaiVatTu" value={formData.loaiVatTu} 
                onChange={handleInputChange} required>
                <option value="">Chọn</option>
                <option value="Thuoc">Thuốc</option>
                <option value="VatTu">Vật tư</option>
              </select>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="input-box">
            <label>Số lượng</label>
            <input type="number" name="soLuong" value={formData.soLuong} 
              onChange={handleInputChange} required />
          </div>
          <div className="input-box">
            <label>Đơn vị tính</label>
            <input type="text" name="donViTinh" value={formData.donViTinh} 
              onChange={handleInputChange} required />
          </div>
        </div>

        <div className="column">
          <div className="input-box">
            <label>Ngày nhập</label>
            <input type="date" name="ngayNhap" value={formData.ngayNhap} 
              onChange={handleDateChange} required />
          </div>
          <div className="input-box">
            <label>Ngày sản xuất</label>
            <input type="date" name="ngaySanXuat" value={formData.ngaySanXuat} 
              onChange={handleDateChange} required />
          </div>
          <div className="input-box">
            <label>Hạn sử dụng</label>
            <input type="date" name="hanSuDung" value={formData.hanSuDung} 
              onChange={handleDateChange} required />
          </div>
        </div>

        <div className="input-box">
          <label>Giá</label>
          <input type="number" name="gia" value={formData.gia} 
            onChange={handleInputChange} required />
        </div>

        <div className="input-box">
          <label>Mô tả</label>
          <input type="text" name="moTa" value={formData.moTa} 
            onChange={handleInputChange} required />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? <HashLoader size={35} color="#ffffff" /> : 'Tạo'}
        </button>
      </form>
    </div>
  );
};

export default ThemThuocVatTu;
