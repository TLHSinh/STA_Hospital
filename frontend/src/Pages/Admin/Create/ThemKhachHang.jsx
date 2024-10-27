import './Them.css';
import { FaChevronLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState  } from "react";
const ThemKhachHang = () => {


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "", // Thêm trường rePassword vào state
    // photo: selectedFile,
    gender: "",
    role: "patient",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const inputRef = useRef(null);
  const [image, setImage] = useState ("");

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname,{
              type: "image/png",
              lastModified: Date.now(),
            });

            console.log(file);
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  }

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

       <div className='addAvatar'>
       <div onClick={handleImageClick}>
        {image ? (
          <img src={URL.createObjectURL(image)} alt=''/>
        ) : (
              <img src='/Images/addAvatar.png' alt=''/>
        ) }
        <input 
          type='file' 
          ref={inputRef} 
          onChange={handleImageChange} 
          style={{display: 'none'}} />
       </div>
       </div>

      <form action="#" class="form">
      <div class="column">
          <div class="input-box">
            <label>Họ và tên</label>
            <input type="text" value={formData.name}  onChange={handleInputChange} required />
          </div>
          <div class="input-box">
            <label>Ngày sinh</label>
            <input type="date" required />
          </div>
      </div>
        <div class="column">
          <div class="input-box">
            <label>Số điện thoại</label>
            <input type="text" required />
          </div>
          <div class="input-box">
            <label>Email</label>
            <input type="email" required />
          </div>
        </div>
        <div class="input-box address">
        <div class="column">
          <div class="select-box">
              <select>
                <option hidden>Giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
          </div>
          <input type="text" placeholder="Nhóm máu" required />
        </div>
      </div>
        
        <button type='submit'>Tạo</button>
      </form>
    </div>
  )
}

export default ThemKhachHang