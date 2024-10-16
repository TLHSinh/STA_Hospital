import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faC, faA, faR, faE } from "@fortawesome/free-solid-svg-icons";
import "./Card8.css";

const Card8 = () => {
  return (
    <div className="card8-container">
      <div className="card8-row">
        <div className="card8-item">
          <FontAwesomeIcon icon={faC} className="card8-letter" />
          <p>Commitment:</p>
          <p>Cam kết</p>
        </div>
        <div className="card8-item">
          <FontAwesomeIcon icon={faA} className="card8-letter" />
          <p>Accountability:</p>
          <p>Trách nhiệm</p>
        </div>
        <div className="card8-item">
          <FontAwesomeIcon icon={faR} className="card8-letter" />
          <p>Respect:</p>
          <p>Tôn trọng</p>
        </div>
        <div className="card8-item">
          <FontAwesomeIcon icon={faE} className="card8-letter" />
          <p>Empathy:</p>
          <p>Đồng cảm</p>
        </div>
      </div>
      <div className="card8-text">
        <p>
          Vì mục tiêu nâng cao sức khỏe và hạnh phúc của tất cả người dân Việt
          Nam. <br />
          Tận tâm chăm sóc.
        </p>
      </div>
    </div>
  );
};

export default Card8;
