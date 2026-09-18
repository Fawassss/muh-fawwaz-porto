import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  // Daftarkan semua plugin di sini
  gsap.registerPlugin(ScrollTrigger, useGSAP, MotionPathPlugin); 
}

// Export gsap instance yang sudah diregister plugin-nya
export { gsap, ScrollTrigger };
