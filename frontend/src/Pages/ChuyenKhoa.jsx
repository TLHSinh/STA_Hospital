import React from 'react'
import '../Pages/ChuyenKhoa.css';
import BannerCK from '../Components/Banner/BannerChuyenKhoa/BannerCK';
import Card1TrangChu from '../Components/Card/Card1TrangChu';

function ChuyenKhoa() {
  return (
    <div>
      <BannerCK />
      <div className='container-content'>
        <div className='intro'>
          <p>
          Bắt đầu hành trình chăm sóc sức khỏe của bạn tại Bệnh viện STA. Từ<br /> 
          việc chăm sóc sức khỏe phụ nữ, hiện thực hóa ước mơ làm cha mẹ, đến nuôi dưỡng<br />
          sự phát triển toàn diện cho thế hệ tương lai, Hạnh Phúc cung cấp dịch vụ y tế trọn<br />
          vẹn và uy tín. Các chuyên khoa thế mạnh của chúng tôi, bao gồm Sản Phụ khoa, Nhi<br />
          khoa, Hỗ trợ sinh sản (IVF), Phẫu thuật Thẩm mỹ và Phẫu thuật tổng quát, đều được<br />
          đầu tư trang thiết bị hiện đại, công nghệ chẩn đoán tiên tiến, cùng đội ngũ y bác sĩ<br />
          giàu kinh nghiệm nhằm mang đến chất lượng chăm sóc tốt nhất.
          </p>
        </div>

        <div className='item'>
          <h1 className='article-item'>Chuyên Khoa Của Chúng Tôi</h1>
          <Card1TrangChu />
        </div>
      </div>
    </div>
  )
}

export default ChuyenKhoa