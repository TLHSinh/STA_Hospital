import './Them.css';
import { FaChevronLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useRef, useState  } from "react";

const ThemBacSi = () => {
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
            <Link to="/admin/danhsachbacsi">
              <FaChevronLeft color='#66B5A3'/>
            </Link>
        </div>
        <h1>THÊM BÁC SĨ</h1>
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
        <div class="input-box">
            <label>Họ và tên</label>
            <input type="text" required />
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
          <input type="text" placeholder="Nhóm máu" required />
        </div>
        </div>
        
        <button type='submit'>Tạo</button>
      </form>
    </div>
  )
}

export default ThemBacSi