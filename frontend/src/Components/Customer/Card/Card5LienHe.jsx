import React from "react";
import "./Card5LienHe.css";

export function Card5LienHe({ imageSrc, title, address, phone, hours, emergency }) {
  return (
    <div className="contact-card">
      <div className="contact-card-image">
        <img
          src={imageSrc}
          alt={title}
        />
      </div>
      <div className="contact-card-info">
        <h2>{title}</h2>
        <p>
            <i className="fas fa-map-marker-alt"></i> {address}
        </p>


        <p>
          <i className="fas fa-phone"></i> {phone}
        </p>

        <p>
          <i className="fas fa-clock"></i> {hours}
        </p>

        <p>
          <i className="fas fa-ambulance"></i> {emergency}
        </p>

      </div>
    </div>
  );
}
export default Card5LienHe;
