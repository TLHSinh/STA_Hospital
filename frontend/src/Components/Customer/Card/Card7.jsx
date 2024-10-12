import React from 'react';
import './Card7.css'; // Ensure you have the corresponding CSS file

const Card7 = () => {
  // Array data for 3 cards
  const cardData = [
    {
      image: "/cardlienhe.png", // Uncomment and set the correct path
      title: 'Dubai',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      image: "/cardlienhe.png", // Uncomment and set the correct path
      title: 'Paris',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      image: "/cardlienhe.png", // Uncomment and set the correct path
      title: 'Tokyo',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
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
