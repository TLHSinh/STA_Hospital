import React from 'react'
import '../Pages/VeChungToi.css';
import Card2BacSi from '../Components/Card/Card2BacSi'; 
import BannerVCT from '../Components/Banner/BannerVeChungToi/BannerVCT';

function VeChungToi() {
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
          <h1 className='article-item'>Tầm Nhìn & Sứ Mệnh</h1>
          <div class="background-box">
                  <p>
                      Tại STA, chúng tôi hướng tới mục tiêu trở thành đơn vị tiên phong 
                      trong lĩnh vực chăm sóc sức khoẻ đa chuyên khoa cao cấp và trải nghiệm toàn diện.
                  </p>
                  <p>
                      Sứ mệnh của chúng tôi là định hình văn hóa chăm sóc sức khỏe đa chuyên khoa cao cấp tại Việt Nam
                      thông qua mạng lưới bệnh viện và phòng khám đạt tiêu chuẩn quốc tế.
                  </p>
          </div>
        </div>

        <div className='item'>
          <h1 className='article-item'>Giá Trị Cốt Lõi</h1>
          <div class="background-box">
                  <p>
                  Với mục tiêu nâng cao sức khỏe và hạnh phúc cho tất cả người dân Việt Nam, chúng tôi tận tâm chăm sóc bằng triết lý CARE, 
                  trong đó: C là Cam kết (Commitment), A là Trách nhiệm (Accountability), R là Tôn trọng (Respect), và E là Đồng cảm (Empathy).
                  </p>
          </div>
        </div>

        <div className='item'>
          <h1 className='article-item'>Đội ngũ bác sĩ nhiều năm kinh nghiệm</h1>
          <div className='card-grid'>
            <Card2BacSi 
              imgSrc="/Images/STA_BACSI/bacsi_tran-kim-duong.png"
              imgAlt="Card Image 1"
              title="BS. Trần Kim Dương"
              description="Bác Sĩ Đa Khoa"
              buttonText="Learn More"
              link="bs-tran-kim-duong"
            />
            <Card2BacSi 
              imgSrc="/Images/STA_BACSI/bacsi_le-thi-anh.png"
              imgAlt="Card Image 2"
              title="BS. Lê Thị Ánh"
              description="Bác Sĩ Đa Khoa"
              buttonText="Learn More"
              link="bs-le-thi-anh"
            />
            <Card2BacSi 
              imgSrc="/Images/STA_BACSI/bacsi_chu-minh-tuan.png"
              imgAlt="Card Image 3"
              title="BS. Chu Minh Tuấn"
              description="Bác Sĩ Đa Khoa"
              buttonText="Learn More"
              link="bs-chu-minh-tuan"
            />
            <Card2BacSi 
              imgSrc="/Images/STA_BACSI/bacsi_bui-thi-truc-my.png"
              imgAlt="Card Image 4"
              title="BS. Bùi Thị Trúc My"
              description="Bác Sĩ Đa Khoa"
              buttonText="Learn More"
              link="bs-bui-thi-truc-my"
            />
            <Card2BacSi 
              imgSrc="/Images/STA_BACSI/bacsi_nguyen-man-nhi.png"
              imgAlt="Card Image 5"
              title="BS. Nguyễn Mẫn Nhi"
              description="Bác Sĩ Đa Khoa"
              buttonText="Learn More"
              link="bs-nguyen-man-nhi"
            />
            <Card2BacSi 
              imgSrc="/Images/STA_BACSI/bacsi_nguyen-mai-huy.png"
              imgAlt="Card Image 6"
              title="BS. Nguyễn Mai Huy"
              description="Bác Sĩ Đa Khoa"
              buttonText="Learn More"
              link="bs-nguyen-mai-huy"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VeChungToi