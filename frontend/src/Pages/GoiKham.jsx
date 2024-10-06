import React from 'react'
import BannerGk from '../Components/Banner/BannerGoiKham/BannerGK'
import '../Pages/GoiKham.css';
import Card3GoiKham from '../Components/Card/Card3GoiKham';
import Card4GoiKham from '../Components/Card/Card4GoiKham';

function GoiKham() {
  return (
    <div>
      <BannerGk/>
      <div className='container-content'>
      <div className='item'>
          <h1 className='article-item'>Gói khám thai & Gói sinh</h1>
      </div>
      <div className='intro'>
          <p>
          Với cơ sở vật chất hiện đại và đội ngũ chuyên gia y tế giàu kinh nghiệm, Hạnh Phúc tự hào đồng <br />
          hành cùng bạn trên hành trình làm cha mẹ đầy ý nghĩa.
          </p>
      </div>
      <Card3GoiKham/>
      
        <div className='item'>
          <h1 className='article-item'>Gói tiêm chủng</h1>
          
        </div>
        <div className='intro'>
          <p>
          Hãy bảo vệ bản thân và gia đình với các gói tiêm chủng toàn diện tại STA.
          </p>
      </div>
      <Card4GoiKham/>
        
      </div>
    </div>
    
  )
}
export default GoiKham
