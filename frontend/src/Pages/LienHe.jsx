import React from 'react'
import BannerLH from '../Components/Banner/BannerLienHe/BannerLH'

function LienHe() {
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
      <div className='map-section'>
          <div className='gmap-frame'>
            <iframe title="Map" width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=720&amp;height=400&amp;hl=en&amp;q=43A%20%C4%90%E1%BB%99c%20L%E1%BA%ADp+(STA%20Hospital)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">map</a></iframe>
          </div>
      </div>
    </div>
      

     
     
    </div>
  )
}

export default LienHe