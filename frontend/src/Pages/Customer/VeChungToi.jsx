import React from 'react'
import '../../Pages/Customer/VeChungToi.css';
import Card2BacSi from '../../Components/Customer/Card/Card2BacSi'; 
import Card6 from '../../Components/Customer/Card/Card6'; 
import Card7 from '../../Components/Customer/Card/Card7'; 
import Card8 from '../../Components/Customer/Card/Card8'; 
import BannerVCT from '../../Components/Customer/Banner/BannerVeChungToi/BannerVCT';

function VeChungToi() {
  const doctors = [
    { id: 1, imgSrc: "/Images/STA_BACSI/bacsi_tran-kim-duong.png", imgAlt: "Card Image 1", title: "BS. Trần Kim Dương", description: "Bác Sĩ Đa Khoa", link: "bs-tran-kim-duong" },
    { id: 2, imgSrc: "/Images/STA_BACSI/bacsi_le-thi-anh.png", imgAlt: "Card Image 2", title: "BS. Lê Thị Ánh", description: "Bác Sĩ Đa Khoa", link: "bs-le-thi-anh" },
    { id: 3, imgSrc: "/Images/STA_BACSI/bacsi_chu-minh-tuan.png", imgAlt: "Card Image 3", title: "BS. Chu Minh Tuấn", description: "Bác Sĩ Đa Khoa", link: "bs-chu-minh-tuan" },
    { id: 4, imgSrc: "/Images/STA_BACSI/bacsi_bui-thi-truc-my.png", imgAlt: "Card Image 4", title: "BS. Bùi Thị Trúc My", description: "Bác Sĩ Đa Khoa", link: "bs-bui-thi-truc-my" },
    { id: 5, imgSrc: "/Images/STA_BACSI/bacsi_nguyen-man-nhi.png", imgAlt: "Card Image 5", title: "BS. Nguyễn Mẫn Nhi", description: "Bác Sĩ Đa Khoa", link: "bs-nguyen-man-nhi" },
    { id: 6, imgSrc: "/Images/STA_BACSI/bacsi_nguyen-mai-huy.png", imgAlt: "Card Image 6", title: "BS. Nguyễn Mai Huy", description: "Bác Sĩ Đa Khoa", link: "bs-nguyen-mai-huy" },
    { id: 7, imgSrc: "/Images/STA_BACSI/bacsi_nguyen-man-nhi.png", imgAlt: "Card Image 5", title: "BS. Nguyễn Mẫn Nhi", description: "Bác Sĩ Đa Khoa", link: "bs-nguyen-man-nhi" },
    { id: 8, imgSrc: "/Images/STA_BACSI/bacsi_nguyen-mai-huy.png", imgAlt: "Card Image 6", title: "BS. Nguyễn Mai Huy", description: "Bác Sĩ Đa Khoa", link: "bs-nguyen-mai-huy" },
    
  ];
  return (
    <div>
      <BannerVCT />
      <div className='container-content'>
        <div className='intro'>
          <p>
          Là điểm đến thăm khám và chăm sóc sức khỏe chất lượng quốc tế hàng đầu tại<br /> 
          Việt Nam, Bệnh viện STA mang đến các phương pháp điều trị tiên <br /> 
          tiến được xây dựng theo tiêu chuẩn của Hội đồng Úc về tiêu chuẩn chăm sóc sức <br /> 
          khỏe (ACHSI), đáp ứng nhu cầu ngày càng tăng về dịch vụ y tế cao cấp tại Việt Nam.
          </p>
        </div>
        
        <div className='item'>
          <h1 className='article-item'></h1>
          <Card6
            title="Tầm nhìn & Sứ mệnh"
            description={
              <>
                Tại STA, chúng tôi hướng tới mục tiêu trở thành đơn vị tiên phong trong lĩnh vực chăm sóc sức khoẻ đa chuyên khoa cao cấp và trải nghiệm toàn diện. <br />
                Sứ mệnh của chúng tôi là định hình văn hóa chăm sóc sức khỏe đa chuyên khoa cao cấp tại Việt Nam thông qua mạng lưới bệnh viện và phòng khám đạt tiêu chuẩn quốc tế.
              </>
            }
          />
        </div>

        <div className='item'>
          <h1 className='article-item'>Giá Trị Cốt Lõi</h1>
          <Card8 />  
        </div>

        <div className='item'>
          <h1 className='article-item'>Những Thành Tựu</h1>
          <Card7 />
        </div>
        
        <section>
          <div className="item">
            <div className="container">
              <h1 className="article-item text-center">Bác Sĩ</h1>
              <div className="card-grid">
                {doctors.map(doctor => (
                  <Card2BacSi
                    key={doctor.id}
                    imgSrc={doctor.imgSrc}
                    imgAlt={doctor.imgAlt}
                    title={doctor.title}
                    description={doctor.description}
                    buttonText="Learn More"
                    link={doctor.link}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default VeChungToi