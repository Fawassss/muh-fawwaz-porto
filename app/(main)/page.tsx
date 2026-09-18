import Hero from "@/components/sections/hero/page";
import About from "@/components/sections/about/page";
import Journey from "@/components/sections/journey/page";
import Philosophy from "@/components/sections/philosophy/page";
import Works from "@/components/sections/works/page";
import Services from "@/components/sections/services/page";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      <About />
      {/* <Journey /> */}
      <Philosophy />
      <Services />
      <Works />
    </div>
  );
}
