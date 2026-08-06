import { useEffect, useState } from 'react';
import { Loader2, Camera } from 'lucide-react';

type ProductImage = { url: string; width: number; height: number };

// Local dev fallback: drop images into src/assets/gallery-preview/ to preview
// the slideshow without the Cloudinary API (which only runs on Vercel).
const LOCAL_PREVIEW_IMAGES = Object.values(
  import.meta.glob('../assets/gallery-preview/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' })
) as string[];

export default function ProductGallery() {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/product-images')
      .then((res) => res.json())
      .then((data) => {
        if (data.images && data.images.length > 0) {
          setImages(data.images);
        } else if (LOCAL_PREVIEW_IMAGES.length > 0) {
          setImages(LOCAL_PREVIEW_IMAGES.map((url) => ({ url, width: 0, height: 0 })));
        }
        setLoading(false);
      })
      .catch(() => {
        if (LOCAL_PREVIEW_IMAGES.length > 0) {
          setImages(LOCAL_PREVIEW_IMAGES.map((url) => ({ url, width: 0, height: 0 })));
        }
        setLoading(false);
      });
  }, []);

  if (!loading && images.length === 0) return null;

  return (
    <div className="py-12">
      <div className="text-center mb-8 px-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A00] text-[#FFFFCC] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-md">
          <Camera className="w-3.5 h-3.5" />
          Frisch eingefangen
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-black text-[#1A1A00] mb-3">
          Ein Blick in unsere <span className="text-[#2C2C00]">Backstube</span>
        </h2>
        <p className="text-[#1E293B]/80 font-sans font-bold text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Direkt aus der Vitrine — so sieht's bei uns wirklich aus.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-[#1A1A00] animate-spin" />
        </div>
      ) : (
        <div className="w-full overflow-hidden group">
          <div
            className="animate-marquee flex items-center gap-4 group-hover:[animation-play-state:paused]"
            style={{ animationDuration: '90s' }}
          >
            {[...images, ...images].map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-40 sm:w-48 h-56 sm:h-64 rounded-2xl overflow-hidden shadow-xl border-2 border-[#1A1A00]/10 hover:scale-105 transition-transform duration-300"
              >
                <img src={img.url} alt="Happy Beck Produkt" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
