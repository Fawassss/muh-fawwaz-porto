"use client";

import React from "react";
import Image from "next/image";

const projects = [
    {
        title: "Aura",
        category: "Interior Design",
        year: "2024",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
        link: "#"
    },
    {
        title: "Vortex",
        category: "Web Experience",
        year: "2023",
        image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1200",
        link: "#"
    },
    {
        title: "Ethereal",
        category: "Identity",
        year: "2024",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200",
        link: "#"
    },
    {
        title: "Nexus",
        category: "Architecture",
        year: "2022",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
        link: "#"
    }
];

const WorkItem = ({ project, index }: { project: typeof projects[0]; index: number }) => {
    return (
        <div className="relative group border-b border-white/10 cursor-pointer overflow-hidden">
            {/* Default State - visible when not hovered */}
            <div className="flex items-center justify-between py-6 md:py-8 px-[6vw]">
                {/* Industry / Category */}
                <div className="w-1/4 text-left">
                    <span className="text-zinc-400 font-sans text-xs md:text-sm">
                        {project.category}
                    </span>
                </div>
                
                {/* Title */}
                <div className="w-2/4 text-center">
                    <h3 className="text-[12vw] md:text-[9vw] leading-none tracking-tighter text-white font-normal">
                        {project.title}
                    </h3>
                </div>

                {/* Timeline / Year */}
                <div className="w-1/4 text-right">
                    <span className="text-zinc-400 font-sans text-xs md:text-sm">
                        ({project.year})-(Present)
                    </span>
                </div>
            </div>

            {/* Hover State - The Curtain */}
            {/* It's positioned absolute to cover the item. 
                Clip-path creates the curtain effect: starting at 50% height (closed), transitioning to 0% (open). */}
            <div 
                className="absolute inset-0 bg-white z-10 flex items-center overflow-hidden transition-all duration-500 ease-in-out [clip-path:inset(50%_0_50%_0)] group-hover:[clip-path:inset(0_0_0_0)]"
            >
                {/* Marquee Wrapper */}
                <div className="flex w-max animate-marquee items-center gap-16 md:gap-24 pl-16 md:pl-24">
                    {/* Repeat the content twice to ensure seamless infinite scrolling */}
                    {[...Array(2)].map((_, i) => (
                        <React.Fragment key={i}>
                            {/* Logo / Title */}
                            <div className="flex items-center gap-4">
                                {/* SVG Logo Placeholder (Matching the reference's logo) */}
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                                <span className="text-[12vw] md:text-[9vw] text-black font-normal tracking-tighter whitespace-nowrap">
                                    {project.title.toLowerCase()}
                                </span>
                            </div>
                            
                            {/* Pill Image */}
                            <div className="relative w-48 md:w-64 lg:w-80 aspect-[2.5/1] rounded-full overflow-hidden flex-shrink-0">
                                <Image 
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Works = () => {
    return (
        <section className="bg-black relative pt-[15vh] pb-24" id="works">
            {/* Table Header Row (matches reference) */}
            <div className="px-[6vw] py-8 flex justify-between items-center border-b border-white/20">
                <div className="w-1/4 text-left">
                    <span className="text-zinc-500 text-sm tracking-wider">Industry</span>
                </div>
                <div className="w-2/4 text-center">
                    <p className="text-zinc-400 text-lg md:text-xl font-sans mx-auto max-w-md leading-relaxed">
                        Every decision, every detail is a lever, each one working to make the whole run better than before
                    </p>
                </div>
                <div className="w-1/4 text-right">
                    <span className="text-zinc-500 text-sm tracking-wider">Timeline</span>
                </div>
            </div>

            {/* Works List */}
            <div className="w-full flex flex-col border-t border-white/10 mt-0">
                {projects.map((project, i) => (
                    <WorkItem key={i} project={project} index={i} />
                ))}
            </div>
            
            {/* View All Button */}
            <div className="mt-24 px-[6vw] flex justify-center">
                <button className="group relative px-8 py-4 rounded-full border border-white/20 overflow-hidden transition-colors duration-500 hover:border-white">
                    <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"></div>
                    <span className="relative z-10 text-white group-hover:text-black transition-colors duration-500 font-medium tracking-wide">
                        View All Projects
                    </span>
                </button>
            </div>
        </section>
    );
};

export default Works;
