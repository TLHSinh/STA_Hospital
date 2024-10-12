import React from "react";
import "./Card6.css";

export function Card6({ title, description }) {
  return (
    <div className="vision-card">
      <div className="vision-content">
        {/* Text Wrapper to contain the title and description */}
        <div className="vision-text-wrapper">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="vision-image">
        <img src="/logo_sta512.png" alt="Vision" />
      </div>
    </div>
  );
}

export default Card6;
