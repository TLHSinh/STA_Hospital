import { Link } from 'react-router-dom';
import './Card2.css';

function Card({ imgSrc, imgAlt, title, description, link }) {
  return (
 
 
 <div className="card-container">
      <img className="card-img" src={imgSrc} alt={imgAlt} />
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <Link to={`/bacsi/${link}`} className="card-btn">Tìm hiểu thêm</Link>
    </div>
  
  );
}

export default Card;
