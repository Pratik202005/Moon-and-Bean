import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsapConfig';

const galleryItems = [
  {
    id: 1,
    title: 'The Obsidian Roasting Studio',
    subtitle: 'Cast-Iron Drum Roasting',
    src: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'The Slow Pour Laboratory',
    subtitle: 'Ceramic Extraction Ritual',
    src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 3,
    title: "L'Atelier Viennoiserie",
    subtitle: 'Hand-Laminated Daily',
    src: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'The Midnight Copper Bar',
    subtitle: 'Custom Extraction Machine',
    src: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'The Nocturne Velvet Lounge',
    subtitle: 'Intimate Cupping Salons',
    src: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop',
  },
];

const HomeGallery = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const imagesRef = useRef([]);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth - window.innerWidth;

    // Pin parent and translate container horizontally
    gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1.5,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true,
      },
    });

    // 3D Parallax: Translate inner images relative to outer card movement
    imagesRef.current.forEach((img) => {
      if (!img) return;
      gsap.fromTo(
        img,
        { xPercent: -15, scale: 1.15 },
        {
          xPercent: 15,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${totalWidth}`,
            scrub: 1.5,
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="relative h-screen bg-moon-black overflow-hidden border-t border-white/[0.06]"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[700px] bg-moon-gold/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating Header */}
      <div className="absolute top-12 left-6 md:left-24 z-20 space-y-1 pointer-events-none">
        <span className="font-sans text-xs uppercase tracking-[0.35em] text-moon-gold font-light">
          Sensory Impressions
        </span>
        <h2 className="font-cinzel text-3xl md:text-5xl text-moon-cream">
          Atmospheric Gallery
        </h2>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={trackRef}
        className="h-full flex items-center gap-10 px-6 md:px-24 pt-24 w-max"
      >
        {galleryItems.map((item, index) => (
          <div
            key={item.id}
            data-cursor="VIEW"
            className="relative w-[75vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] h-[65vh] rounded-2xl overflow-hidden glass-card border border-white/10 group shadow-2xl shrink-0"
          >
            {/* Parallax Inner Image Container */}
            <div className="absolute inset-0 w-[130%] h-full -left-[15%] overflow-hidden">
              <img
                ref={(el) => (imagesRef.current[index] = el)}
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </div>

            {/* Dark Amber Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-moon-black via-moon-black/30 to-transparent p-8 flex flex-col justify-end z-10">
              <span className="font-mono text-xs text-moon-gold uppercase tracking-widest">
                {item.subtitle}
              </span>
              <h3 className="font-cinzel text-2xl md:text-3xl text-moon-cream font-medium">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeGallery;
