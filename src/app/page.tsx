import GridMotion from "@/components/GridMotion";
import RetroTestimonial from "@/components/RetroTestimonial";
import ExpandCards from "@/components/ui/expand-cards";
import ScrollVelocity from "@/components/ScrollVelocity";
import TestimonialsColumns1 from "@/components/blocks/testimonials-columns-1";
import { Logo } from "@/components/logo";
import SplashCursor from "@/components/SplashCursor";
import HeroSearch from "@/components/HeroSearch";

export default function Home() {
  // Define items for the InfiniteMenu component
  const menuItems = [
    {
      image: "https://picsum.photos/900/900?grayscale&random=1",
      link: "/about",
      title: "About",
      description: "Learn more about our company"
    },
    {
      image: "https://picsum.photos/900/900?grayscale&random=2",
      link: "/services",
      title: "Services",
      description: "Explore our premium services"
    },
    {
      image: "https://picsum.photos/900/900?grayscale&random=3",
      link: "/portfolio",
      title: "Portfolio",
      description: "View our exceptional work"
    },
    {
      image: "https://picsum.photos/900/900?grayscale&random=4",
      link: "/team",
      title: "Team",
      description: "Meet our talented professionals"
    },
    {
      image: "https://picsum.photos/900/900?grayscale&random=5",
      link: "/contact",
      title: "Contact",
      description: "Get in touch with us"
    },
    {
      image: "https://picsum.photos/900/900?grayscale&random=6",
      link: "/blog",
      title: "Blog",
      description: "Read our latest insights"
    }
  ];

  // Define texts for the ScrollVelocity component
  const velocityTexts = [
    "EXPERIENCES ELEVATED",
    "UNFORGETTABLE MOMENTS",
    "EVENTS REIMAGINED",
    "CELEBRATION PERFECTED",
    "THRILLS UNLOCKED"
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex flex-col w-full">
        {/* Luxury Premium Hero Section with GridMotion */}
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <GridMotion
              gradientColor="#000000"
              items={[
                "/h1.jpg",
                "/h2.jpg",
                "/h3.jpg",
                "/h4.jpg",
                "/h5.jpg",
                "/h6.jpg",
                "/h7.jpg",
                "/h8.jpg",
                "/h9.jpg",
                "/h10.jpg",
                "/h1.jpg",
                "/h2.jpg",
                "/h3.jpg",
                "/h4.jpg",
                "/h5.jpg",
                "/h6.jpg",
                "/h7.jpg",
                "/h8.jpg",
                "/h9.jpg",
                "/h10.jpg",
                "/h1.jpg",
                "/h2.jpg",
                "/h3.jpg",
                "/h4.jpg",
                "/h5.jpg",
                "/h6.jpg",
                "/h7.jpg",
                "/h8.jpg"
              ]}
            />
          </div>
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 z-[5] bg-black/60"></div>

          {/* Splash Cursor Effect - Above overlay but pointer-events-none */}
          <div className="absolute inset-0 z-[6] pointer-events-none">
            <SplashCursor
              DENSITY_DISSIPATION={2.0}
              VELOCITY_DISSIPATION={1.0}
              SPLAT_RADIUS={0.4}
              SPLAT_FORCE={8000}
            />
          </div>
          {/* Logo in top left corner */}
          <div className="absolute top-6 left-6 z-20">
            <Logo />
          </div>
          {/* Menu icon in top right corner */}

          <div className="relative z-10 container-luxury py-24 sm:py-32 lg:py-40 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 drop-shadow-2xl">
              <span className="block font-extrabold">Experience the Best</span>
              <span className="block mt-2 text-white font-bold">Events Around</span>
            </h1>
            <p className="mt-8 max-w-2xl mx-auto text-xl sm:text-2xl text-white font-medium leading-relaxed drop-shadow-lg">
              Unlock access to premium concerts, festivals, and live shows designed to elevate your experience.
            </p>
            <div className="mt-12 flex justify-center">
              <HeroSearch />
            </div>
          </div>
        </section>

        {/* Retro Testimonial Section */}
        <section className="w-full py-24 bg-black border-t border-white/10">
          <div className="container-luxury">
            <RetroTestimonial />
          </div>
        </section>

        {/* Expand Cards Section */}
        <section className="w-full py-24 bg-black border-t border-white/10">
          <div className="container-luxury">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Explore Upcoming Events
              </h2>
            </div>
            <div className="w-full">
              <ExpandCards />
            </div>
          </div>
        </section>

        {/* Scroll Velocity Section */}
        <section className="w-full py-24 bg-black border-t border-white/10 overflow-hidden">
          <div className="w-full">
            <div className="py-12">
              <ScrollVelocity
                texts={velocityTexts}
                velocity={100}
                className="text-white"
                parallaxClassName="py-4"
              />
            </div>
          </div>
        </section>

        {/* Testimonials Columns Section */}
        <section className="w-full py-24 bg-black border-t border-white/10">
          <div className="container-luxury">
            <TestimonialsColumns1 />
          </div>
        </section>
      </main>
    </div>
  );
}