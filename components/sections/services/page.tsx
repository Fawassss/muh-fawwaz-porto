"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const services = [
    {
        title: "Brand Identity",
        description: "Building cohesive visual languages that tell a compelling brand story. From logo design to comprehensive guidelines that define your unique market position.",
        image: "/images/services/branding.png",
    },
    {
        title: "Digital Design",
        description: "Crafting intuitive and aesthetically pleasing interfaces that prioritize user experience and business goals. We focus on creating seamless journeys that convert.",
        image: "/images/services/ui-ux.png",
    },
    {
        title: "Development",
        description: "Translating complex designs into high-performance, responsive code. Specializing in modern frameworks and creative frontend implementations.",
        image: "/images/services/development.png",
    }
];

export default function Services() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    
    // For floating cursor image
    const cursorX = useMotionValue(-1000);
    const cursorY = useMotionValue(-1000);
    
    // Tighter spring for smoother, more responsive follow
    const springX = useSpring(cursorX, { stiffness: 400, damping: 28, mass: 0.1 });
    const springY = useSpring(cursorY, { stiffness: 400, damping: 28, mass: 0.1 });
    
    const containerRef = useRef<HTMLDivElement>(null);
    const bgTextRef = useRef<HTMLHeadingElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };
        
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [cursorX, cursorY]);

    // GSAP Animations for Scroll Parallax & Entrance
    useGSAP(() => {
        if (!containerRef.current) return;

        // Background Text Parallax
        if (bgTextRef.current) {
            gsap.to(bgTextRef.current, {
                x: "-15vw", 
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });
        }

        // List elements stagger entrance
        if (listRef.current) {
            const wrappers = listRef.current.querySelectorAll('.service-row-wrapper');
            gsap.fromTo(wrappers, 
                { y: 50, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: listRef.current,
                        start: "top 85%",
                    }
                }
            );
        }
    }, { scope: containerRef });

    return (
        <section 
            id="services"
            className="relative w-full bg-white min-h-screen flex flex-col justify-center py-[15vh] overflow-hidden"
            ref={containerRef}
        >
            {/* Giant Background Outline Text */}
            <h2 
                ref={bgTextRef}
                className="absolute top-[40%] left-[10%] text-[28vw] font-bold leading-none tracking-tighter select-none pointer-events-none text-transparent font-sans whitespace-nowrap z-0 opacity-20"
                style={{ WebkitTextStroke: "1px rgba(0,0,0,0.12)" }}
            >
                <span className="font-mencken italic pr-4">S</span>ERVICES
            </h2>

            {/* Floating Cursor Image (Desktop Only) - Now placed BEHIND the text (z-10) */}
            <div className="pointer-events-none hidden md:block fixed inset-0 z-10 overflow-hidden">
                <AnimatePresence>
                    {hoveredIndex !== null && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
                            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                            style={{
                                x: springX,
                                y: springY,
                                translateX: "-50%",
                                translateY: "-50%"
                            }}
                            className="absolute top-0 left-0 w-[22vw] aspect-[4/5] overflow-hidden bg-zinc-100 shadow-2xl rounded-xl"
                        >
                            <Image
                                src={services[hoveredIndex].image}
                                alt={services[hoveredIndex].title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Header - Using mix-blend-difference and text-white */}
            <div className="relative z-20 w-full px-[4vw] md:px-[8vw] mb-[10vh] flex flex-col items-end text-right mix-blend-difference text-white pointer-events-none">
                <p className="text-[4vw] md:text-[1.3vw] text-white/70 font-normal leading-relaxed font-sans max-w-[80vw] md:max-w-[35vw]">
                    We translate strategic intent into <span className="text-white font-medium">compelling experiences</span> across a range of media, guiding you through every step.
                </p>
            </div>

            {/* Accordion List - Using mix-blend-difference and text-white */}
            <div 
                className="relative z-20 w-full px-[4vw] md:px-[8vw] flex flex-col mix-blend-difference text-white" 
                ref={listRef}
                onMouseLeave={() => setHoveredIndex(null)}
            >
                <div className="w-full border-t border-white/20">
                    {services.map((service, i) => {
                        const isHovered = hoveredIndex === i;
                        const shouldDim = hoveredIndex !== null && hoveredIndex !== i;
                        
                        return (
                            <div key={i} className="service-row-wrapper w-full">
                                <motion.div 
                                    className="w-full border-b border-white/20 py-[4vh] md:py-[6vh] cursor-pointer group"
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onClick={() => setHoveredIndex(isHovered ? null : i)}
                                    animate={{ opacity: shouldDim ? 0.3 : 1 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between w-full">
                                        <div className="flex items-start md:items-center gap-[6vw] md:gap-[4vw]">
                                            <span className="text-white/50 text-[3vw] md:text-[1vw] font-medium font-sans w-[2vw]">
                                                0{i + 1}
                                            </span>
                                            {/* Smooth Title Shift */}
                                            <motion.h3 
                                                animate={{ x: isHovered ? 15 : 0 }}
                                                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                                                className="text-white text-[8vw] md:text-[5vw] font-medium tracking-tighter font-sans uppercase leading-none"
                                            >
                                                {service.title}
                                            </motion.h3>
                                        </div>
                                        <div className="hidden md:flex items-center justify-end w-[15vw] overflow-hidden pt-[1vw]">
                                            <motion.div 
                                                initial={{ x: -10, opacity: 0 }}
                                                animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
                                                transition={{ duration: 0.4, ease: "easeOut" }}
                                                className="flex items-center gap-3 text-white"
                                            >
                                                <span className="text-[0.9vw] font-medium uppercase tracking-widest">Explore</span>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500 ease-out">
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </motion.div>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-[4vh] pl-[9vw] md:pl-[6vw] w-full md:w-[45%]">
                                                    <p className="text-white/70 text-[4vw] md:text-[1.1vw] leading-relaxed font-light">
                                                        {service.description}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
