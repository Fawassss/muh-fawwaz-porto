"use client";

import React, { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const Philosophy = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    // Dummy images from Unsplash
    const images = [
        "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1000&auto=format&fit=crop",
    ];

    useGSAP(
        () => {
            if (!containerRef.current || !stickyRef.current) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                },
            });

            // 1. Text Animation (3D Swing Down - Separate ScrollTrigger for early reveal)
            gsap.fromTo(
                textRef.current,
                {
                    opacity: 0,
                    filter: "blur(20px)",
                    rotateX: -120,
                    y: -150, // Slightly higher initial position
                    transformOrigin: "top center"
                },
                {
                    opacity: 1,
                    filter: "blur(0px)",
                    rotateX: 0,
                    y: 0,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 40%", // Starts revealing before sticky
                        end: "top 20%",   // Full reveal by the time it reaches the top
                        scrub: 1,
                    }
                }
            );
            // (Note: No text out animation, it persists throughout the pinning)

            // 2. Motion Path for Dots (Scrubbed and Early Start)
            const dotSelectors = [".dot-1", ".dot-2", ".dot-3"];
            const pathSelectors = ["#circle-1", "#circle-2", "#circle-3"];

            dotSelectors.forEach((dot, i) => {
                const startOffset = Math.random();
                gsap.to(dot, {
                    motionPath: {
                        path: pathSelectors[i],
                        align: pathSelectors[i],
                        alignOrigin: [0.5, 0.5],
                        autoRotate: true,
                        start: startOffset,
                        end: startOffset + 1,
                    },
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5,
                    },
                });
            });

            // 3. Image Scattering (From Center to Sides - Smooth Zoom)
            const imageElements = gsap.utils.toArray<HTMLElement>(".floating-image");
            imageElements.forEach((img, i) => {
                const totalDuration = 2.8;
                const startDelay = (i / imageElements.length) * 1.5;

                // Random angle to ensure scattering to all directions (top-right, bottom-left, etc.)
                const angle = Math.random() * Math.PI * 2;

                // Target position far enough to leave the viewport
                const distance = 80 + Math.random() * 40; // 80-120vw/vh
                const targetX = Math.cos(angle) * distance + "vw";
                const targetY = Math.sin(angle) * distance + "vh";

                tl.fromTo(
                    img,
                    {
                        scale: 0,
                        x: 0,
                        y: 0,
                        opacity: 1,
                    },
                    {
                        scale: 1.8, // Smooth zoom effect
                        x: targetX,
                        y: targetY,
                        duration: 2.8,
                        ease: "none",
                    },
                    startDelay
                );
            });

            // 5. SVG Background (Separate opacity for paths and dots)
            gsap.set(pathSelectors, { opacity: 0.3 }); // Lingkaran Besar
            gsap.set(dotSelectors, { opacity: 1 });  // Lingkaran Kecil (Titik)
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative w-full bg-black z-10 h-[400vh]"
            id="philosophy"
        >
            <div
                ref={stickyRef}
                className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
                style={{ perspective: "2000px" }}
            > 
                {/* Background SVG Circles */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <svg
                        ref={svgRef}
                        viewBox="0 0 200 200"
                        className="w-[100vh] h-[100vh]"
                    >
                        {/* Circle Paths */}
                        <path
                            id="circle-1"
                            d="M 50,70 a 50,50 0 1,0 100,0 a 50,50 0 1,0 -100,0"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.2"
                        />
                        <path
                            id="circle-2"
                            d="M 25,120 a 50,50 0 1,0 100,0 a 50,50 0 1,0 -100,0"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.2"
                        />
                        <path
                            id="circle-3"
                            d="M 75,120 a 50,50 0 1,0 100,0 a 50,50 0 1,0 -100,0"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.2"
                        />

                        {/* Moving Dots */}
                        <circle r="0.8" fill="white" className="dot-1" />
                        <circle r="0.8" fill="white" className="dot-2" />
                        <circle r="0.8" fill="white" className="dot-3" />
                    </svg>
                </div>

                {/* Floating Images Layer */}
                <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                    {images.map((url, i) => (
                        <div
                            key={i}
                            className="floating-image absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[25vw] aspect-video rounded-lg overflow-hidden shadow-2xl"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <img
                                src={url}
                                alt={`Philosophy aspect ${i}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Central Text */}
                <div
                    className="relative z-20 text-center px-6 max-w-4xl"
                    style={{ perspective: "1500px" }}
                >
                    <h2
                        ref={textRef}
                        className="text-[4vw] md:text-[2.2vw] font-medium leading-[1.1] tracking-tight text-white select-none italic"
                        style={{ transformOrigin: "top center" }}
                    >
                        Curiosity, friction, iteration:<br />
                        <span className="not-italic opacity-80">The machinery of my design</span>
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default Philosophy;
