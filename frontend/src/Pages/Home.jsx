import React from 'react';
import BannerTrangChu from '../Components/Banner/BannerHome/BannerTrangChu'; // Import component BannerTrangChu
import Card1TrangChu from '../Components/Card/Card1TrangChu'; // Import Card1TrangChu nếu cần
import '../Pages/Home.css';
import Card2BacSi from '../Components/Card/Card2BacSi'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  return (
    <div>
      <BannerTrangChu />
      <div className='container-content'>
        <div className='intro'>
          <p>
            STA cam kết mang đến dịch vụ chăm sóc sức khỏe cao cấp, <br />
            đạt tiêu chuẩn quốc tế với các phương pháp điều 
            <br /> trị tiên tiến, hiện đại tại đa chuyên khoa.
          </p>
        </div>
      
        <div className='item'>
          <h1 className='article-item'>Chuyên Khoa</h1>
          <Card1TrangChu />
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
};

export default Home;
