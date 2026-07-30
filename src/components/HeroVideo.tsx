import { useState } from 'react';

export default function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const [ended, setEnded] = useState(false);

  if (ended) {
    return (
      <div
        className="absolute inset-0 bg-cover bg-center brightness-90"
        style={{ backgroundImage: `url('${poster}')` }}
      />
    );
  }

  return (
    <video
      autoPlay
      muted
      playsInline
      onEnded={() => setEnded(true)}
      className="absolute inset-0 w-full h-full object-cover brightness-90"
      src={src}
    />
  );
}
