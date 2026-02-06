import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BeforeAfterSlider({ beforeImages, afterImages }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [beforeIndex, setBeforeIndex] = useState(0);
  const [afterIndex, setAfterIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const currentBefore = beforeImages[beforeIndex];
  const currentAfter = afterImages[afterIndex];

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleMouseDown = () => setIsDragging(true);
  
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="space-y-6">
      {/* Interactive Slider */}
      <div
        ref={containerRef}
        className="relative aspect-[16/9] overflow-hidden bg-gray-100 select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Before Image (full) */}
        <img
          src={currentBefore.src}
          alt={currentBefore.alt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* After Image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={currentAfter.src}
            alt={currentAfter.alt}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={() => setIsDragging(true)}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center cursor-ew-resize">
            <div className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4 text-gray-700" />
              <ChevronRight className="h-4 w-4 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-2xl font-semibold shadow-lg pointer-events-none border border-white/30">
          Before
        </div>
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-2xl font-semibold shadow-lg pointer-events-none border border-white/30">
          After
        </div>

        {/* Navigation for multiple images */}
        {(beforeImages.length > 1 || afterImages.length > 1) && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {beforeImages.length > 1 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setBeforeIndex((prev) => (prev > 0 ? prev - 1 : beforeImages.length - 1))}
                className="bg-white/90 hover:bg-white text-xs"
              >
                ← Before
              </Button>
            )}
            {afterImages.length > 1 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setAfterIndex((prev) => (prev > 0 ? prev - 1 : afterImages.length - 1))}
                className="bg-white/90 hover:bg-white text-xs"
              >
                After →
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}