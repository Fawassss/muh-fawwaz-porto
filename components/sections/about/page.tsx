"use client";

import React, { useRef, useState, useEffect } from "react";

const About = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (textContainerRef.current) {
                const rect = textContainerRef.current.getBoundingClientRect();
                setMousePos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const text = "I learned design the hard way through curiosity that wouldn't rest, mistakes that wouldn't be ignored, and iteration that wouldn't stop. What pulled me in was never just the surface, but the machinery beneath it. The patterns, the systems, the logic that makes everything else possible.";

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full bg-black flex flex-col py-[20vw] md:py-[5.5vw] overflow-hidden z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Header Meta Info */}
            <div className="flex justify-between items-start w-full text-[2.5vw] md:text-[0.8vw] text-zinc-500 font-mono mb-[30vw] md:mb-[8.8vw] z-10">
                <div className="flex flex-col">
                    <span>(About)</span>
                    <span className="opacity-70">16°03'35" N</span>
                </div>
                <div className="flex flex-col items-center">
                    <span>(Philosophy)</span>
                </div>
                <div className="flex flex-col items-center text-zinc-400">
                    <span>Da Nang, Vietnam</span>
                </div>
                <div className="flex flex-col items-center">
                    <span>(Works)</span>
                </div>
                <div className="flex flex-col items-end">
                    <span>(Contact)</span>
                    <span className="opacity-70">108°14'33" E</span>
                </div>
            </div>

            <div
                ref={textContainerRef}
                className="relative w-full max-w-[95vw] mt-auto mb-[25vw] md:mb-[8.8vw] ml-[4vw] md:ml-[5.5vw]"
            >
                {/* Base Text (Dim) */}
                <h2
                    className="text-[6.1vw] md:text-[3.5vw] font-medium leading-[1.1] tracking-tight text-[#222] select-none text-left"
                    style={{ textIndent: "25%" }}
                >
                    {text}
                </h2>

                {/* Highlighted Text (Masked) */}
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                        WebkitMaskImage: `radial-gradient(circle 15vw at ${mousePos.x}px ${mousePos.y}px, black 0%, rgba(0,0,0,0.5) 40%, transparent 80%)`,
                        maskImage: `radial-gradient(circle 15vw at ${mousePos.x}px ${mousePos.y}px, black 0%, rgba(0,0,0,0.5) 40%, transparent 80%)`,
                        opacity: isHovered ? 1 : 0,
                    }}
                >
                    <h2
                        className="text-[6.1vw] md:text-[3.5vw] font-medium leading-[1.1] tracking-tight text-white select-none text-left"
                        style={{ textIndent: "25%" }}
                    >
                        {text}
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default About;
