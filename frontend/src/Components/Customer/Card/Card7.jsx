import React from 'react';
import './Card7.css'; // Ensure you have the corresponding CSS file

const Card7 = () => {
  // Array data for 3 cards
  const cardData = [
    {
      image: "/cardlienhe.png", // Uncomment and set the correct path
      title: '2022',
      description: 'Bệnh viện Quốc tế Hạnh Phúc chính thức hoạt động – trở thành bệnh viện đầu tiên theo tiêu chuẩn Singapore tại Việt Nam',
    },
    {
      image: "/2023.png", // Uncomment and set the correct path
      title: '2023',
      description: ' Bệnh viện Quốc tế Hạnh Phúc nhận giải thưởng tại hạng mục Cải thiện tài chính xuất sắc nhất thuộc Giải thưởng Quản lý Bệnh viện châu Á',
    },
    {
      image: "/2024.png", // Uncomment and set the correct path
      title: '2024',
      description: 'Bệnh viện Quốc tế Hạnh Phúc đã ra mắt dịch vụ điều trị cao cấp, là điểm đến y tế và chăm sóc sức khỏe hàng đầu Việt Nam',
    },
  ];

  return (
    <div className="card7-group"> {/* Updated class name */}
      {cardData.map((card, index) => (
        <div className="card7" key={index}> {/* Updated class name */}
          <img src={card.image} alt={card.title} />
          <div className="card7-layer"></div> {/* Updated class name */}
          <div className="card7-info"> {/* Updated class name */}
            <h1>{card.title}</h1>
            <p>{card.description}</p>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card7;
