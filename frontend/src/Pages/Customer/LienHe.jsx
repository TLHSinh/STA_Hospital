import React, { useState } from "react";
import BannerLH from '../../Components/Customer/Banner/BannerLH'
import '../../Pages/Customer/LienHe.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Card5LienHe from '../../Components/Customer/Card/Card5LienHe';




function LienHe() {
  const [selectedMap, setSelectedMap] = useState("hospital");
  const maps = {
    hospital: (
      <iframe
        title="Bệnh viện Quốc tế Hạnh Phúc"
        width="100%"
        height="400"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src="https://maps.google.com/maps?width=720&amp;height=400&amp;hl=en&amp;q=43A%20%C4%90%E1%BB%99c%20L%E1%BA%ADp+(STA%20Hospital)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      />
    ),




    clinic: (
      <iframe
        title="Phòng khám Quốc tế Hạnh Phúc"
        width="100%"
        height="400"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=161%20v%C3%B5%20nguy%C3%AAn%20gi%C3%A1p+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      />
    ),
  };

  return (
       <div>
          <BannerLH/>
      <div className='container-content'>
          <div className='intro'>
                  <p>
                  Bệnh viện STA và hệ thống phòng khám của 
                  <br/>chúng tôi mang đến trải nghiệm chăm sóc sức khỏe đẳng cấp, 
                  <br/>với tiêu chuẩn cao nhất cho người Việt.
                  </p>
          </div>
          <div className='item'>
              <h1 className='article-item'>Liên hệ</h1>
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

                {/* Card 2 */}
                <Card5LienHe
                  imageSrc="/Images/vechungtoi_banner.jpg"
                  title="Bệnh Viện STA SALA"
                  address="222 Lê Duẩn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh"
                  phone="1900 7175"
                  hours="Thứ Hai đến Chủ Nhật: 7:00 - 17:00"
                  emergency="Cấp cứu 24/24"
                />
              </div>
          </div>
          
     <div className="map">
      <h1 className='article-item'>Vị trí</h1>
        <div className="btnmap">
          <button style={{padding:'10px'}} onClick={() => setSelectedMap("hospital")}>
            Bệnh Viện STA TÂN PHÚ
          </button>
          <button style={{padding:'10px'}} onClick={() => setSelectedMap("clinic")}>
            Bệnh Viện STA SALA
          </button>
        </div>

        <div className="map-section">
          <div className="gmap-frame">
            {maps[selectedMap]}
          </div>
        </div>
      </div>
  </div>
    </div>
  );
}
export default LienHe
