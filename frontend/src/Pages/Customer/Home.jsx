import React from 'react';
import BannerTrangChu from '../../Components/Customer/Banner/BannerHome/BannerTrangChu';
import Card1TrangChu from '../../Components/Customer/Card/Card1TrangChu'; // Import Card1TrangChu nếu cần
import '../../Pages/Customer/Home.css';
import Card2BacSi from '../../Components/Customer/Card/Card2BacSi'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card5LienHe from '../../Components/Customer/Card/Card5LienHe';
import Card4GoiKham from '../../Components/Customer/Card/Card4GoiKham';
import BannerHome2 from '../../Components/Customer/Banner/BannerHome2/BannerHome2';



const Home = () => {
  const doctors = [
    { id: 1, imgSrc: "/Images/STA_BACSI/bacsi_tran-kim-duong.png", imgAlt: "Card Image 1", title: "BS. Trần Kim Dương", description: "Bác Sĩ Đa Khoa", link: "bs-tran-kim-duong" },
    { id: 2, imgSrc: "/Images/STA_BACSI/bacsi_le-thi-anh.png", imgAlt: "Card Image 2", title: "BS. Lê Thị Ánh", description: "Bác Sĩ Đa Khoa", link: "bs-le-thi-anh" },
    { id: 3, imgSrc: "/Images/STA_BACSI/bacsi_chu-minh-tuan.png", imgAlt: "Card Image 3", title: "BS. Chu Minh Tuấn", description: "Bác Sĩ Đa Khoa", link: "bs-chu-minh-tuan" },
    { id: 4, imgSrc: "/Images/STA_BACSI/bacsi_bui-thi-truc-my.png", imgAlt: "Card Image 4", title: "BS. Bùi Thị Trúc My", description: "Bác Sĩ Đa Khoa", link: "bs-bui-thi-truc-my" },
    { id: 5, imgSrc: "/Images/STA_BACSI/bacsi_nguyen-man-nhi.png", imgAlt: "Card Image 5", title: "BS. Nguyễn Mẫn Nhi", description: "Bác Sĩ Đa Khoa", link: "bs-nguyen-man-nhi" },
    { id: 6, imgSrc: "/Images/STA_BACSI/bacsi_nguyen-mai-huy.png", imgAlt: "Card Image 6", title: "BS. Nguyễn Mai Huy", description: "Bác Sĩ Đa Khoa", link: "bs-nguyen-mai-huy" },
  ];

  return (
    <div>
      <BannerTrangChu/>
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

        <section>
          <div className="item">
            <div className='container'>
              <h1 className='article-item text-center'>Bác Sĩ</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center">
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


        

        <div className='item'>
              <h1 className='article-item'>Bệnh Viện Của Chúng Tôi</h1>
              <div className="card-container1">
                {/* Card 1 */}
                <Card5LienHe
                  imageSrc="/cardlienhe.png"
                  title="Bệnh Viện STA TÂN PHÚ"
                  address="43A Độc Lập, Phường Tân Thành, Quận Tân Phú, TP.HCM"
                  phone="1900 6765"
                  hours="Thứ Hai đến Thứ Bảy: 7:30 - 16:30"
                  emergency="Cấp cứu 24/7"
                />
              </div>
        </div>

        <div className='item'>
              <h1 className='article-item'>Gói Khám</h1>
              <Card4GoiKham/>
        </div>

        <div className='item'>
              <h1 className='article-item'></h1>
              <BannerHome2 />
        </div>

      </div>
    </div>
  );
};

export default Home;
