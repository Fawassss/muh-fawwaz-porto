"use client"

import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

/**
 * SmoothScroll component using Lenis and synced with GSAP.
 * This provides a butter-smooth scrolling experience for premium portfolios.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null)

  // Integrate Lenis with GSAP's ticker for perfect sync with ScrollTrigger
  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => {
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <ReactLenis 
      root 
      ref={lenisRef} 
      autoRaf={false}
      options={{
        lerp: 0.1,         // Smoothness intensity (0.1 is standard for premium sites)
        duration: 1.5,     // Scroll animation duration
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
