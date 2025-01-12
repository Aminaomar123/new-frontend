import React from 'react';
import './Home.css';  // Import the styles for the component

// Sample data for the equipment
const equipmentData = [
  {
    name: 'Leddar',
    description: 'High-quality DSLR camera for photography and video.',
    price: 50000,
    imageUrl:   {
      name: 'Leddar',
      description: 'High-quality DSLR camera for photography and video.',
      price:  50000,
      imageUrl: 'https://via.placeholder.com/150'
    },
  },
  {
    name: 'Neil Gun',
    description: 'Powerful laptop for design and development.',
    price: 20000,
    imageUrl:   {
      name: 'Ladder',
      description: 'High-quality DSLR camera for photography and video.',
      price: 50000,
      imageUrl: 'https://via.placeholder.com/150'
    },
  },
  {
    name: 'WHeel Barrow',
    description: 'High-definition drone for aerial shots.',
    price: 60000,
    imageUrl: 'https://via.placeholder.com/150'
  },
];

// Home component to display individual equipment details
const Home = () => {
  return (
    <div>
      <p>These are Our Equipment</p>
      <div className="equipment-list">
        {equipmentData.map((equipment, index) => (
          <div key={index} className="equipment-card">
            {/* Uncomment the following line if you want to display images */}
            {/* <img src={equipment.imageUrl} alt={equipment.name} className="equipment-image" /> */}
            <div className="equipment-details">
              <h3 className="equipment-name">{equipment.name}</h3>
              <p className="equipment-description">{equipment.description}</p>
              <p className="equipment-price">Price: TSH/={equipment.price} per day</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
