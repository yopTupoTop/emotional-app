import React, { useEffect, useRef } from 'react';

function PieChart({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 90;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let currentAngle = -Math.PI / 2;

    data.forEach((segment) => {
      const sliceAngle = (segment.value / 100) * 2 * Math.PI;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fillStyle = segment.color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 40, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fill();

      const labelAngle = currentAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius + 30);
      const labelY = centerY + Math.sin(labelAngle) * (radius + 30);

      ctx.fillStyle = '#1a202c';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${segment.label}`, labelX, labelY);
      ctx.fillText(`${segment.value}%`, labelX, labelY + 15);

      currentAngle += sliceAngle;
    });

    data.forEach((segment) => {
      const sliceAngle = (segment.value / 100) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 40, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(173, 216, 230, 0.3)';
      ctx.fill();
    });
  }, [data]);

  return (
    <div className="chart-wrapper">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        style={{ display: 'block' }}
      />
    </div>
  );
}

export default PieChart;