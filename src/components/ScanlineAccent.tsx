interface ScanlineAccentProps {
  className?: string;
  color?: string;
  trackColor?: string;
  glow?: boolean;
}

export default function ScanlineAccent({
  className = 'relative w-full',
  color = '#EF4444',
  trackColor = '#1E293B',
  glow = true,
}: ScanlineAccentProps) {
  return (
    <div className={`h-[2px] overflow-hidden flex-shrink-0 ${className}`} style={{ backgroundColor: trackColor }}>
      <div
        className="absolute inset-0 animate-line-scan w-full h-full"
        style={{ backgroundColor: color, boxShadow: glow ? `0 0 12px ${color}` : undefined }}
      />
    </div>
  );
}
