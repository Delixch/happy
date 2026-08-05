import HeroVideo from '../components/HeroVideo';
import SandwichBuilder from '../components/SandwichBuilder';

export default function SandwichBauen() {
  return (
    <section id="sandwich-bauen" className="pt-14 md:pt-16 min-h-screen bg-[#FFFFCC] pb-24">
      {/* Hero */}
      <div className="relative h-[35vh] min-h-[260px] overflow-hidden">
        <HeroVideo
          src="https://res.cloudinary.com/dsdsb4lqw/video/upload/v1785332690/HAPPY_OMLETT_VIDEO_xgh4nn.mov"
          poster="/default-hero.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A00]/60 via-transparent to-[#FFFFCC]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A00]/80 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 lg:px-8 h-full flex items-end pb-10">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1A1A00] text-[#FFFFCC] font-sans text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-md">
              Ganz nach deinem Geschmack
            </span>
            <div className="relative inline-block block">
              <h1 className="text-4xl md:text-5xl font-serif font-black text-white pb-3 leading-[1.15] drop-shadow-md">
                Sandwich <span className="text-[#FFFFCC] [-webkit-text-stroke:1px_#1A1A00]" style={{ paintOrder: 'stroke fill' }}>Builder</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          <SandwichBuilder />
        </div>
      </div>
    </section>
  );
}
