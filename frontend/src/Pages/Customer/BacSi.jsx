import React, { useState } from 'react';
import BannerBS from '../../Components/Customer/Banner/BannerBacSi/BannerBS';
import Card2BacSi from '../../Components/Customer/Card/Card2BacSi';
import '../../Pages/Customer/BacSi.css';



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

function BacSi() {
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc bác sĩ dựa trên giá trị tìm kiếm
  const filteredDoctors = doctors.filter(doctor =>
    doctor.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

       

        <section className="item">
          <div className="container text-center">
            <div className="max-w-[800px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center">
              <input
                type="search"
                className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none placeholder:text-gray-500 text-[18px]"
                placeholder="Tìm kiếm Bác Sĩ"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-[#0b8fac] text-white px-6 py-4 rounded-r-md text-[18px] h-full">
                Search
              </button>
            </div>
          </div>
        </section>

        <section>
          <div className="item">
            <div className="container">
              <h1 className="article-item text-center">Bác Sĩ</h1>
              <div className="card-grid">
                {filteredDoctors.map(doctor => (
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
  );
}

export default BacSi;
