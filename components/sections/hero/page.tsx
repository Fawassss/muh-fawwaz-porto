"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current || !contentRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // 1. Core text transition (Moves up as you scroll)
      tl.to(contentRef.current, {
        y: "-120vh",
        opacity: 0,
        ease: "power2.inOut",
        duration: 10,
      });

      // 2. Seamless background switch to black for the next section
      tl.to(document.body, { backgroundColor: "#000000", duration: 0.1 }, "-=0.2");
      tl.to(document.body, { backgroundColor: "#ffffff", duration: 0.1 }, 0);

      return () => {
        gsap.to(document.body, { backgroundColor: "#ffffff", duration: 0 });
      };
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative w-full bg-white z-20"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden px-[3vw] py-[5vh] flex flex-col">

        {/* Scrollable Content Container */}
        <div ref={contentRef} className="flex h-full w-full flex-col relative z-20">
          {/* Header */}
          <header className="flex w-full items-start justify-between text-[3.5vw] font-bold leading-tight uppercase tracking-tight text-zinc-950 md:text-[0.8vw]">
            <div className="flex flex-col">
              <span>Muh Muhammad Fawwaz</span>
              <span className="font-medium  text-zinc-400">Digital Designer</span>
            </div>
            <div className="flex flex-col text-center">
              <span>Designing at</span>
              <span className="font-medium text-zinc-400">Visions Design</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="cursor-pointer hover:underline">Contact +</span>
            </div>
          </header>

          {/* Giant Typography */}
          <div className="mt-[4vh] flex w-full justify-between font-regular text-[15vw] leading-none tracking-tighter text-zinc-900">
            <span>F/</span>
            <span>/WZ</span>
          </div>

          {/* Navbar */}
          <div className="mt-[20vh] flex w-full justify-between text-[3.5vw] font-medium text-zinc-800 md:text-[1.3vw]">
            {[
              { num: "01", label: "Intro" },
              { num: "02", label: "About" },
              { num: "03", label: "Work" },
              { num: "04", label: "Contact" },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-[0.5vw]">
                <span className="text-[2.5vw] font-regular text-red-500 md:text-[0.7vw]">({item.num})</span>
                <span className="cursor-pointer text-[1.5vw] font-regular transition-opacity hover:opacity-50">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Footer Content */}
          <div className="mt-auto flex w-full items-end justify-between">
            <div className="max-w-[80vw] md:max-w-[38vw]">
              <p className="text-[5vw] font-regular leading-[1.1] tracking-tight text-zinc-950 md:text-[1.8vw]">
                I design impactful digital experiences through UI/UX, branding, interactions, and motion graphics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
