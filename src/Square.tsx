import React from 'react';

interface SquareProps {
  size?: number; 
  color?: string; 
}

const Square: React.FC<SquareProps> = ({ size = 100, color = 'blue' }) => {
  const squareStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
  };

  return <div style={squareStyle}></div>;
};

export default Square;