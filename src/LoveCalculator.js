// LoveCalculator.js

import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import './LoveCalculator.css';

const LoveCalculator = () => {
  const [lover1, setLover1] = useState('');
  const [lover2, setLover2] = useState('');
  const [relationshipStatus, setRelationshipStatus] = useState(null);

  const fadeProps = useSpring({
    opacity: relationshipStatus !== null ? 1 : 0,
    transform: relationshipStatus !== null ? 'translateY(0)' : 'translateY(-20px)',
  });

  const heartBackgroundRef = useRef(null);

  const calculateLove = () => {
    const name1 = lover1.toUpperCase().replace(/ /g, '');
    const name2 = lover2.toUpperCase().replace(/ /g, '');

    // FLAMES algorithm
    const commonLetters = name1
      .split('')
      .filter((letter) => name2.includes(letter))
      .join('');

    const totalLetters = (name1 + name2).replace(new RegExp(`[${commonLetters}]`, 'g'), '');

    const flames = 'FLAMES';
    let flamesCount = totalLetters.length % flames.length;

    if (flamesCount === 0) {
      flamesCount = flames.length;
    }

    const relationshipStatuses = ['Friends', 'Love', 'Affection', 'Marriage', 'Enemies', 'Siblings'];
    setRelationshipStatus(relationshipStatuses[flamesCount - 1]);
  };

  const getEmoji = () => {
    switch (relationshipStatus) {
      case 'Love':
        return '😍'; // Heart eyes emoji for love
      case 'Marriage':
        return '💑'; // Couple with heart emoji for marriage
      default:
        return '😢'; // Crying face emoji for other flames
    }
  };

  const handleButtonClick = () => {
    if (relationshipStatus !== null) {
      // Reset button clicked
      setLover1('');
      setLover2('');
      setRelationshipStatus(null);
    } else {
      // Generate Flames button clicked
      calculateLove();
    }
  };

  useEffect(() => {
    // Dynamically create hearts based on viewport dimensions
    const heartBackground = heartBackgroundRef.current;

    const createHeart = () => {
      const heart = document.createElement('span');
      heart.classList.add('heart', 'heart-covering');
      heart.innerText = '❤️';
      heart.style.left = `${Math.random() * 100}vw`; // Randomize horizontal position
      heart.style.top = `${Math.random() * 100}vh`; // Randomize vertical position
      heart.style.animationDuration = `${Math.random() * 4 + 2}s`; // Randomize animation duration
      heartBackground.appendChild(heart);
    };

    // Create hearts dynamically based on viewport dimensions
    const numberOfHearts = Math.floor((window.innerWidth * window.innerHeight) / 10000); // Adjust as needed
    for (let i = 0; i < numberOfHearts; i++) {
      createHeart();
    }
  }, [heartBackgroundRef]);

  return (
    <div className="love-calculator-container">
      <div className='input-text-container-box'>
      <div ref={heartBackgroundRef} className="heart-background">
        {/* Heart background content */}
      </div>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter his name"
          value={lover1}
          onChange={(e) => setLover1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter her name"
          value={lover2}
          onChange={(e) => setLover2(e.target.value)}
        />
        <button onClick={()=>{lover1 && lover2 && handleButtonClick();}}>
          {relationshipStatus !== null ? 'Reset' : 'Generate Flames'}
        </button>
      </div>
      {lover1&&lover2&&
      <animated.div className="result-container" style={fadeProps}>
        {relationshipStatus && (
          <div>
            <p>
              Your FLAMES result: {relationshipStatus} {getEmoji()}
            </p>
          </div>
        )}
      </animated.div>
}
    </div>
  );
};

export default LoveCalculator;
