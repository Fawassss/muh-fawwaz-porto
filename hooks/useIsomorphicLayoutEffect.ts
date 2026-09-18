import { useEffect, useLayoutEffect } from "react";

/**
 * useIsomorphicLayoutEffect
 * 
 * Di Next.js (SSR), menggunakan useLayoutEffect standar akan memunculkan warning
 * dan berpotensi error karena DOM belum siap di server.
 * Hook ini akan menggunakan useLayoutEffect murni di browser (penting agar 
 * perhitungan GSAP akurat & tidak flicker), dan fallback ke useEffect biasa di server.
 */
export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
