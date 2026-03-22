import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero({ title, subtitle, scriptText, location, image, imageCornerLabels, imagePortrait, dualPortraitImages, backgroundImage, backgroundLightOverlayIndices = [], imagePosition = 'object-center', children }) {
  const images = Array.isArray(backgroundImage) ? backgroundImage : (backgroundImage ? [backgroundImage] : []);
  const useBackground = images.length > 0;
  const [currentIndex, setCurrentIndex] = useState(0);
  const showLightOverlay = backgroundLightOverlayIndices.includes(currentIndex);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
    }, 10000);
    return () => clearInterval(id);
  }, [images.length]);

  const slidePercent = images.length > 0 ? 100 / images.length : 0;

  return (
    <section className={`relative overflow-hidden ${useBackground ? 'min-h-[85vh]' : 'bg-gradient-to-br from-cream-50 to-sage-50'}`}>
      {/* Full-bleed background: single image or sliding carousel */}
      {useBackground && (
        <>
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="h-full flex transition-transform duration-700 ease-in-out"
              style={{
                width: `${images.length * 100}%`,
                transform: `translateX(-${currentIndex * slidePercent}%)`,
              }}
            >
              {images.map((img, i) => (
                <div
                  key={i}
                  className="h-full flex-shrink-0 bg-cover bg-top bg-no-repeat"
                  style={{ width: `${slidePercent}%`, backgroundImage: `url(${img})` }}
                />
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent pointer-events-none" aria-hidden />
          {showLightOverlay && (
            <div className="absolute inset-0 bg-white/[0.23] pointer-events-none" aria-hidden />
          )}
        </>
      )}
      {!useBackground && (
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0U4RURFNyIgb3BhY2l0eT0iLjMiLz48L2c+PC9zdmc+')] opacity-30"></div>
      )}

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${useBackground ? 'min-h-[85vh] flex flex-col items-center justify-center' : 'pt-12 pb-20 lg:pt-16 lg:pb-28'}`}>
        <div
          className={`grid gap-12 items-center ${
            useBackground
              ? 'grid-cols-1 place-items-center'
              : image && imageCornerLabels
                ? 'grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]'
                : Array.isArray(dualPortraitImages) && dualPortraitImages.length === 2
                  ? 'grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]'
                  : image && imagePortrait
                    ? 'grid-cols-1 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]'
                    : 'grid-cols-1 lg:grid-cols-2'
          }`}
        >
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`${useBackground ? 'text-center max-w-2xl flex flex-col items-center [&_.text-gray-700]:text-[#FAF8F5] [&_.bg-white]:!bg-white/90 [&_.text-sage-800]:!text-gray-800 [&_.border-sage-200]:border-white/40 [&_a]:drop-shadow-sm [&>div]:!justify-center' : 'text-center lg:text-left'}`}
          >
            <h1 className={`font-serif font-light tracking-widest leading-tight mb-2 ${useBackground ? 'text-6xl sm:text-7xl lg:text-8xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]' : 'text-5xl sm:text-6xl lg:text-7xl text-brand'}`}>
              {title}
            </h1>
            {subtitle && (
              <p className={`mb-2 leading-relaxed italic opacity-100 ${useBackground ? 'text-2xl sm:text-3xl text-azure drop-shadow-[0_3px_8px_rgba(0,0,0,0.55)] hero-text-stroke-external' : 'text-xl sm:text-2xl text-gray-700'}`}>
                {subtitle}
              </p>
            )}
            {scriptText && (
              <p className={`font-script ${useBackground ? 'text-5xl sm:text-6xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] mb-4 hero-text-stroke' : 'text-4xl sm:text-5xl text-brand mb-8'}`}>
                {scriptText}
              </p>
            )}
            {children}
          </motion.div>

          {/* Two portrait photos side by side (e.g. After left, Before right) */}
          {!useBackground && Array.isArray(dualPortraitImages) && dualPortraitImages.length === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-2xl lg:max-w-[min(100%,40rem)] mx-auto lg:mx-0 lg:ml-auto"
            >
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {dualPortraitImages.map((item, index) => (
                  <div
                    key={index}
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-sage-100"
                  >
                    <img
                      src={item.src}
                      alt={`${title} — ${item.label}`}
                      className={`absolute inset-0 w-full h-full object-cover object-center ${imagePosition}`}
                    />
                    <span
                      className={`absolute bottom-2 bg-black/55 text-white text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm ${
                        index === 0 ? 'left-2' : 'right-2'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold-500 rounded-full opacity-20 blur-3xl pointer-events-none" aria-hidden />
            </motion.div>
          )}

          {/* Side image (only when no backgroundImage); optional corner labels (e.g. stitched before/after) */}
          {!useBackground && image && !(Array.isArray(dualPortraitImages) && dualPortraitImages.length === 2) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`relative w-full mx-auto lg:mx-0 ${
                imageCornerLabels
                  ? 'max-w-2xl lg:max-w-[min(100%,39rem)]'
                  : imagePortrait
                    ? 'max-w-[min(100%,22rem)] sm:max-w-[min(100%,26rem)] lg:max-w-[min(100%,28rem)] mx-auto lg:ml-auto lg:mr-0'
                    : 'max-w-xl'
              }`}
            >
              <div
                className={`relative rounded-2xl overflow-hidden shadow-2xl bg-sage-100 ${
                  imageCornerLabels
                    ? ''
                    : imagePortrait
                      ? 'aspect-[3/4] w-full'
                      : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={image}
                  alt={imageCornerLabels ? `${title} — before and after` : title}
                  className={
                    imageCornerLabels
                      ? `w-full h-auto max-h-[min(48vh,420px)] object-cover ${imagePosition}`
                      : imagePortrait
                        ? `absolute inset-0 w-full h-full object-cover object-center ${imagePosition}`
                        : `absolute inset-0 w-full h-full object-cover ${imagePosition}`
                  }
                />
                {imageCornerLabels?.bottomLeft && (
                  <span className="absolute bottom-2 left-2 bg-black/55 text-white text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm">
                    {imageCornerLabels.bottomLeft}
                  </span>
                )}
                {imageCornerLabels?.bottomRight && (
                  <span className="absolute bottom-2 right-2 bg-black/55 text-white text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm">
                    {imageCornerLabels.bottomRight}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold-500 rounded-full opacity-20 blur-3xl pointer-events-none" aria-hidden />
            </motion.div>
          )}
        </div>
      </div>

      <style>{`
        .bg-sage-50 { background-color: var(--sage-50); }
        .font-script { font-family: 'Jimmy Script', 'Great Vibes', cursive; font-weight: normal; font-style: normal; }
        .hero-text-stroke {
          -webkit-text-stroke: 2px rgba(0, 0, 0, 0.45);
          paint-order: stroke fill;
        }
        .hero-text-stroke-external {
          /* Dark blue on same hue as azure (#427898), slightly lighter */
          --stroke: 30, 55, 70;
          text-shadow:
            0 0 1px rgba(var(--stroke), 0.4),
            1px 0 0 rgba(var(--stroke), 0.35),
            -1px 0 0 rgba(var(--stroke), 0.35),
            0 1px 0 rgba(var(--stroke), 0.35),
            0 -1px 0 rgba(var(--stroke), 0.35),
            1px 1px 0 rgba(var(--stroke), 0.28),
            -1px -1px 0 rgba(var(--stroke), 0.28),
            1px -1px 0 rgba(var(--stroke), 0.28),
            -1px 1px 0 rgba(var(--stroke), 0.28),
            0 0 2px rgba(var(--stroke), 0.2),
            2px 0 0 rgba(var(--stroke), 0.18),
            -2px 0 0 rgba(var(--stroke), 0.18),
            0 2px 0 rgba(var(--stroke), 0.18),
            0 -2px 0 rgba(var(--stroke), 0.18);
        }
      `}</style>
    </section>
  );
}