import React from 'react';
import './BannerHome2.css'; // Đảm bảo tạo file BannerHome2.css trong cùng thư mục

const BannerHome2 = () => {
  return (
    <div className="BannerHome2-container">
      {/* Phần bên trái (left) */}
      <div className="BannerHome2-left">
        <div className="BannerHome2-image">
          <img src="/BannerHome2.png" alt="Healthcare Team" />
        </div>
      </div>

      {/* Phần bên phải (right) */}
      <div className="BannerHome2-right">
        <div className="BannerHome2-content">
          <img src="/LOGOACHS.png" alt="ACHS Logo" className="BannerHome2-logo" />
          <h1>Chất lượng Chăm sóc theo Tiêu chuẩn Quốc tế</h1>
          <p>
            STA tự hào là bệnh viện đầu tiên tại Việt Nam được Hội đồng Úc về
            Chăm sóc Sức khỏe Quốc tế (ACHSI) công nhận về chất lượng bệnh viện.
          </p>
          <p>
            Việc đạt chứng nhận EQuIP 7 của ACHSI thể hiện sự cống hiến không
            ngừng và cải tiến liên tục của Bệnh viện Quốc tế Hạnh Phúc trong việc
            lấy người bệnh là trung tâm của sự chăm sóc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerHome2;
