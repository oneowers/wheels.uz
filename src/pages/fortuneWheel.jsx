// src/App.js

import React, { useState } from 'react';
import './FortuneWheel.css';

const discountOptions = [25, 20, 15, 10, 5, 0, 0, 5, 10, 15];

function App() {
  const [rotation, setRotation] = useState(0);
  const [discount, setDiscount] = useState(null);

  const spinWheel = () => {
    const randomRotation = 360 * 10 + Math.floor(Math.random() * 360);
    setRotation(randomRotation);
    const randomDiscount = discountOptions[Math.floor(Math.random() * discountOptions.length)];
    setDiscount(randomDiscount);
  };

  return (
    <div className="App">
      <div className="wheel" style={{ transform: `rotate(${rotation}deg)` }}>
        {discountOptions.map((percent, index) => (
          <div key={index} className="slice" style={{ transform: `rotate(${index * 36}deg)` }}>
            <div className="discount">{percent}%</div>
          </div>
        ))}
      </div>
      <button onClick={spinWheel}>Spin the Wheel</button>
      {discount !== null && <p>You got a {discount}% discount!</p>}
    </div>
  );
}

export default App;
