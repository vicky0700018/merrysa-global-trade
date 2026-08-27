import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useContent } from "@/lib/content-store";

const CTA_TARGETS: Record<string, "/capabilities" | "/services" | "/contact"> = {
  "Explore Our Capabilities": "/capabilities",
  "Our Services": "/services",
  "Send an Inquiry": "/contact",
};

export function Hero() {
  const { heroBanners, settings } = useContent();
  const slides = useMemo(() => heroBanners.filter((b) => b.enabled), [heroBanners]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (index > slides.length - 1) setIndex(0);
  }, [slides.length, index]);

  useEffect(() => {
    if (!settings.heroAutoplay || paused || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [settings.heroAutoplay, paused, slides.length]);

  if (slides.length === 0) {
    return (
      <section className="surface-navy">
        <div className="shell py-24 text-center">
          <h1 className="font-display text-3xl font-bold">Merrysa Exim LLP</h1>
          <p className="mt-3 text-white/70">No hero banners are currently enabled.</p>
        </div>
      </section>
    );
  }

  const active = slides[Math.min(index, slides.length - 1)];
  const target = CTA_TARGETS[active.cta] ?? "/contact";

  return (
    <section
      aria-label="Featured highlights"
      aria-roledescription="carousel"
      className="relative isolate overflow-hidden bg-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.title}
          width={1600}
          height={900}
          loading={i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 hero-overlay" />

      <div className="shell relative flex min-h-[32rem] flex-col justify-center py-20 sm:min-h-[36rem] lg:min-h-[40rem]">
        <div key={active.id} className="fade-up max-w-3xl">
          <p className="eyebrow-gold">
            Slide {index + 1} of {slides.length} • Global B2B Trade
          </p>
          <h1 className="mt-4 font-display text-3xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
            {active.title}
          </h1>
          <div className="gold-rule mt-6" />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-lg">
            {active.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={target} className="btn btn-gold">
              {active.cta}
            </Link>
            <Link to="/contact" className="btn btn-ghost-light">
              {settings.ctaText}
            </Link>
          </div>
        </div>

        <div className="relative mt-12 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
            className="btn btn-ghost-light h-10 w-10 p-0"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % slides.length)}
            aria-label="Next slide"
            className="btn btn-ghost-light h-10 w-10 p-0"
          >
            <span aria-hidden="true">›</span>
          </button>
          <div className="ml-2 flex items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-10 bg-gold" : "w-4 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
