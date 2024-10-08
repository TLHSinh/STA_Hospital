// import React from 'react'

// const Card1_trangchu = () => {
//   return (
//     <div className='card'>
//         <im
//     </div>
//   )
// }

// export default Card1_trangchu



import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Card1.css'
function Card1TrangChu() {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        
        <div className="contain">
        <div className="card">
          <div className="img-box">
          <img src="https://cdn.tuoitre.vn/thumb_w/480/471584752817336320/2023/10/25/ts-bs-tong-hai-169821904093245140264.jpg" alt=""/>
          </div>
          <div className="card-content">
          <h1 className="card-heading">Phẫu Thuật - Thẩm Mĩ</h1>
          <p className="card-text">
          Khoa Phẫu thuật Tạo hình - Thẩm mỹ tại Bệnh viện Quốc tế STA mang đến các dịch vụ làm đẹp toàn diện, giúp bạn sở hữu ngoại hình rạng ngời và cuốn hút.
          </p>
          </div>
        </div>
        </div>
        <div className="contain">
        <div className="card">
          <div className="img-box">
          <img src="https://www.verywellhealth.com/thmb/T7Kcq-UQfN4PjS25L8IGGPKliBI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/doctor-using-stethoscope-on-pregnant-patients-stomach-595348651-59932a7968e1a2001113f56d.jpg" alt=""/>
          </div>
          <div className="card-content">
          <h1 className="card-heading">Sản Phụ Khoa</h1>
          <p className="card-text">
          Tại Khoa Sản Phụ khoa, chúng tôi đồng hành cùng phụ nữ trên hành trình gìn giữ và nâng niu sức khỏe qua từng giai đoạn cuộc sống. 
          </p>
          </div>
        </div>
        </div>
        <div className="contain">
        <div className="card">
          <div className="img-box">
          <img src="https://allieddigestivehealth.com/wp-content/uploads/2022/05/Gastrointestinal-Specialist.png" alt=""/>
          </div>
          <div className="card-content">
          <h1 className="card-heading">Tiêu Hóa</h1>
          <p className="card-text">
          Tại STA, đội ngũ chuyên gia tiêu hóa và đại tràng có kinh nghiệm, kỹ năng cao luôn tận tâm mang đến dịch vụ chăm sóc toàn diện để giải quyết các vấn đề của hệ tiêu hóa.
          </p>
          </div>
        </div>
        </div>
        <div className="contain">
        <div className="card">
          <div className="img-box">
          <img src="https://tudu.com.vn/data/2017/06/21/13370085_DSC_2065_1_1.jpg" alt=""/>
          </div>
          <div className="card-content">
          <h1 className="card-heading">Hỗ Trợ Sinh Sản</h1>
          <p className="card-text">
          Trung tâm Hỗ trợ Sinh sản STA đã hỗ trợ nhiều cặp vợ chồng hiếm muộn có được niềm vui trở thành cha mẹ. 
          </p>
          </div>
        </div>
        </div>
        <div className="contain">
        <div className="card">
          <div className="img-box">
          <img src="https://login.medlatec.vn//ImagePath/images/20200817/20200817_kham-suc-khoe-cho-nguoi-lao-dong-giup-kip-thoi-phat-hien-benh-ly-nguy-hiem-va-dieu-tri-kip-thoi.jpg" alt=""/>
          </div>
          <div className="card-content">
          <h1 className="card-heading">Khám Doanh Nghiệp</h1>
          <p className="card-text">
          Kiểm tra sức khỏe định kỳ đóng vai trò quan trọng trong việc duy trì sức khỏe và tinh thần, giúp phát hiện sớm các tình trạng bệnh lý, vấn đề sức khỏe ngay từ giai đoạn đầu.
          </p>
          </div>
        </div>
        </div>
        
        <div className="contain">
        <div className="card">
          <div className="img-box">
          <img src="https://th.hopluchospital.com/wp-content/uploads/2024/03/kiem-tra-suc-khoe-tong-quat.jpg" alt=""/>
          </div>
          <div className="card-content">
          <h1 className="card-heading">Khám Tổng Quát</h1>
          <p className="card-text">
          Chương trình khám sức khỏe tổng quát dành cho doanh nhân tại Bệnh viện Quốc tế STA được thiết kế nhằm giúp đánh giá toàn diện về sức khỏe của bạn.
          </p>
          </div>
        </div>
        </div>

        <div className="contain">
        <div className="card">
          <div className="img-box">
          <img src="https://cms.jiohealth.com/content/images/2020/02/khoa_nhi_m-i-1.jpg" alt=""/>
          </div>
          <div className="card-content">
          <h1 className="card-heading">Nhi Khoa</h1>
          <p className="card-text">
          Khoa Nhi tại Bệnh viện Quốc tế STA mang đến dịch vụ chăm sóc toàn diện và chuyên sâu cho trẻ sơ sinh và trẻ em.
          </p>
          </div>
        </div>
        </div>

     
        
      </Slider>
    </div>
  );
}

export default Card1TrangChu;
