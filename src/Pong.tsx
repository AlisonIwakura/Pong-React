import React, { useState, useEffect, useRef } from 'react';

const Pong: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [paddleY, setPaddleY] = useState(200); 
  const [ball, setBall] = useState({ x: 250, y: 250, dx: 2, dy: 2 });

  const paddleHeight = 100;
  const paddleWidth = 10;
  const ballRadius = 10;
  const canvasWidth = 500;
  const canvasHeight = 400;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas?.getBoundingClientRect();
      if (rect) setPaddleY(event.clientY - rect.top - paddleHeight / 2);
    };

    canvas?.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      updateGame(ctx);
    }, 10);

    return () => {
      clearInterval(interval);
      canvas?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [paddleY, ball]);

  const updateGame = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = 'blue';
    ctx.fillRect(0, paddleY, paddleWidth, paddleHeight);

    
    let newBall = { ...ball };
    newBall.x += newBall.dx;
    newBall.y += newBall.dy;

    
    if (newBall.y + ballRadius > canvasHeight || newBall.y - ballRadius < 0) {
      newBall.dy *= -1;
    }

    
    if (
      newBall.x - ballRadius < paddleWidth &&
      newBall.y > paddleY &&
      newBall.y < paddleY + paddleHeight
    ) {
      newBall.dx *= -1;
    }

    
    if (newBall.x + ballRadius > canvasWidth) {
      newBall.dx *= -1; 
    }

    
    if (newBall.x < 0) {
      alert('Game Over!'); 
      newBall = { x: 250, y: 250, dx: 2, dy: 2 }; 
    }

    setBall(newBall);

    
    ctx.beginPath();
    ctx.arc(newBall.x, newBall.y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: '1px solid black' }}
      />
      <p>Use o mouse para mover a barra e rebater a bola!</p>
    </div>
  );
};

export default Pong;
