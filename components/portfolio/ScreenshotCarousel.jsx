"use client";

import { useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ScreenshotCarousel({ screenshots = [], title }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [active, setActive] = useState(0);

  if (!screenshots.length) return null;

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden rounded-2xl border border-border">
        <div className="flex">
          {screenshots.map((src, i) => (
            <div key={i} className="relative flex-[0_0_100%] aspect-video bg-bg">
              <Image
                src={src}
                alt={`${title} screenshot ${i + 1}`}
                fill
                sizes="(max-width:1024px) 100vw, 800px"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
      {screenshots.length > 1 && (
        <>
          <button
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-bg/80 backdrop-blur border border-border flex items-center justify-center hover:bg-surface"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-bg/80 backdrop-blur border border-border flex items-center justify-center hover:bg-surface"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}
