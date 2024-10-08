import React, { useState } from "react";
import BannerLH from '../Components/Banner/BannerLienHe/BannerLH'
import '../Pages/LienHe.css';
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
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=22B%20C%C3%A2y%20C%C3%A1m+(Ph%C3%B2ng%20Kh%C3%A1m%20H%E1%BA%A1nh%20Ph%C3%BAc)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      />
    ),
  };

  return (
       <div>
          <BannerLH/>
      <div className='container-content'>
        <div className='item'>
            <h1 className='article-item'>Liên hệ</h1>
        </div>
        <div className='intro'>
            <p>
            Bệnh viện Quốc tế Hạnh Phúc và hệ thống phòng khám của 
            <br/>chúng tôi mang đến trải nghiệm chăm sóc sức khỏe đẳng cấp, 
            <br/>với tiêu chuẩn cao nhất cho người Việt.
            </p>
        </div>
  
     <div className="map">
     <h1 className='article-item'>Vị trí</h1>
      <div className="btnmap">
        <button onClick={() => setSelectedMap("hospital")}>
          Bệnh viện Quốc tế STA
        </button>
        <button onClick={() => setSelectedMap("clinic")}>
          Phòng khám Quốc tế STA
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
