"use client";

import React, { useState } from "react";
import Image from "next/image";

const journeyData = [
    {
        year: "2021 — 2024",
        title: "SMK NEGERI 4",
        role: "Software Engineering Student",
        description: "Membangun fondasi rekayasa perangkat lunak melalui eksplorasi mendalam pada sistem backend dan arsitektur mobile. Mengasah logika pemrograman dan kemampuan kolaborasi dalam tim.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop"
    },
    {
        year: "2023 — 2024",
        title: "PAPERPLAY STUDIO",
        role: "Backend & Mobile Developer (Intern)",
        description: "Menyelami dunia industri melalui pengembangan SaaS skala besar. Bertanggung jawab atas optimasi database, pembuatan API yang efisien, dan penerapan pipeline CI/CD.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"
    },
    {
        year: "2024 — PRESENT",
        title: "TRIVOX STUDIO",
        role: "Full-stack & Mobile Developer",
        description: "Menyatukan kreativitas dan teknik untuk menghadirkan solusi digital mutakhir. Memimpin pengembangan fitur-fitur kompleks, dari integrasi AI hingga antarmuka pengguna yang sangat interaktif.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop"
    }
];

const Journey = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section
            className="relative w-full bg-white z-10 py-[15vw] px-[4vw] md:px-[6vw]"
            id="journey"
        >
            {/* Header / Section Title */}
            <div className="mb-[10vw] md:mb-[5vw] flex justify-between items-end">
                <h2 className="text-[10vw] md:text-[5vw] font-bold text-black uppercase tracking-tighter leading-none font-sans">
                    Experience
                </h2>
                <p className="hidden md:block text-zinc-400 font-mono text-sm uppercase tracking-widest pb-2">
                    ( Professional Chronology )
                </p>
            </div>

            {/* Editorial List */}
            <div className="w-full border-t border-black/10">
                {journeyData.map((item, i) => (
                    <div
                        key={i}
                        className="group border-b border-black/10 cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Header Row */}
                        <div className="py-[6vw] md:py-[4vw] flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 transition-colors duration-500 hover:bg-[#fafafa]">
                            {/* Title with hover slide effect */}
                            <h3 className="text-[8vw] md:text-[5vw] font-bold text-black leading-none uppercase tracking-tighter transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-[2vw]">
                                {item.title}
                            </h3>

                            {/* Meta Info */}
                            <div className="flex flex-col md:text-right transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-[2vw]">
                                <span className="font-mono text-sm text-zinc-400 uppercase tracking-widest mb-1">
                                    {item.year}
                                </span>
                                <span className="text-[4vw] md:text-[1.5vw] text-zinc-800 font-light italic font-mencken">
                                    {item.role}
                                </span>
                            </div>
                        </div>

                        {/* Accordion Body (Hover Reveal) */}
                        <div
                            className="grid transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
                            style={{
                                gridTemplateRows: hoveredIndex === i ? '1fr' : '0fr',
                                opacity: hoveredIndex === i ? 1 : 0
                            }}
                        >
                            <div className="overflow-hidden">
                                <div className="pb-[6vw] md:pb-[4vw] flex flex-col md:flex-row gap-[4vw] md:gap-[6vw] items-start md:items-center px-[2vw]">
                                    {/* Reveal Image */}
                                    <div className="w-full md:w-[30vw] aspect-[16/9] relative overflow-hidden rounded-sm bg-zinc-100">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100 grayscale hover:grayscale-0"
                                        />
                                    </div>

                                    {/* Reveal Description */}
                                    <p className="w-full md:w-1/2 text-[4vw] md:text-[1.5vw] text-zinc-600 leading-relaxed font-light">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Journey;
