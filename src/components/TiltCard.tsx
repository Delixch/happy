import { useRef, useState } from 'react';

export default function TiltCard({
  children,
  className = '',
  style = {},
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [transform, setTransform] = useState('');
  const [bgPos, setBgPos] = useState('50% 50%');

  const handleMouseEnter = () => {
    if (ref.current) rectRef.current = ref.current.getBoundingClientRect();
  };

  const handleMove = (e: React.MouseEvent) => {
    const rect = rectRef.current;
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 8;
    const rotateY = (x - 0.5) * 8;
    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
    setBgPos(`${x * 100}% ${y * 100}%`);
  };

  const reset = () => {
    rectRef.current = null;
    setTransform('');
    setBgPos('50% 50%');
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      className="h-full"
      style={{ perspective: '1000px', cursor: onClick ? 'pointer' : undefined }}
    >
      <div
        style={{ transform, willChange: 'transform', ...style }}
        className={`relative transition-transform duration-500 ease-out h-full ${className}`}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
          style={{ background: `radial-gradient(400px circle at ${bgPos}, rgba(255,255,255,0.12), transparent 40%)` }}
        />
        <div className="relative z-20 h-full">{children}</div>
      </div>
    </div>
  );
}
