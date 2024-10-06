import React from 'react';
import Card2BacSi from '../Components/Card/Card2BacSi'; 
import BannerBS from '../Components/Banner/BannerBacSi/BannerBS';

function BacSi() {
  return (
    <div>
      <BannerBS />
      <div className='container-content'>
        <div className='intro'>
          <p>
          Bệnh viện Đa khoa Quốc tế STA tự hào là đơn vị quy tụ đội ngũ bác sĩ chuyên môn cao, giàu kinh nghiệm<br />
           và luôn tâm huyết, tận tụy nghề. Các bác sĩ từng công tác và giữ vị trí quan trọng tại nhiều <br />
          bệnh viện công lập, bệnh viện thuộc tuyến TW, mang đến sự an tâm cho khách hàng khi đến thăm khám và điều trị.  
            <br /> 
          </p>
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
  );
}

export default BacSi;
