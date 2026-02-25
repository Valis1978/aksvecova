"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial timeline — staggered reveal
      const tl = gsap.timeline({ delay: 0.8 });

      // Image clip-path reveal
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.4,
            ease: "power4.inOut",
          },
          0
        );
      }

      // Heading lines — split and reveal
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll(".hero-line");
        tl.fromTo(
          lines,
          { y: 80, opacity: 0, rotateX: -40 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          },
          0.4
        );
      }

      // Subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          1
        );
      }

      // CTA buttons
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          1.2
        );
      }

      // Gold separator line
      tl.fromTo(
        ".hero-gold-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
        0.8
      );

      // Scroll indicator bounce
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          1.5
        );

        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2,
        });
      }

      // Parallax on scroll — image moves slower
      if (imageRef.current && sectionRef.current) {
        gsap.to(imageRef.current, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Overlay fades in on scroll
      if (overlayRef.current && sectionRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const el = document.querySelector("#sluzby");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-navy"
    >
      {/* Background Image with Parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0"
        style={{ clipPath: "inset(100% 0 0 0)" }}
      >
        {/* Desktop: wide landscape banner */}
        <Image
          src="/images/hero-banner.jpg"
          alt="JUDr. Michaela Švecová"
          fill
          className="hidden object-cover object-[center_20%] lg:block"
          priority
          sizes="100vw"
        />
        {/* Mobile & Tablet: portrait photo — face visible */}
        <Image
          src="/images/portrait-svecova.png"
          alt="JUDr. Michaela Švecová"
          fill
          className="object-cover object-top lg:hidden"
          priority
          sizes="100vw"
        />
      </div>

      {/* Dark Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-navy/40"
        style={{ opacity: 0.35 }}
      />

      {/* Top gradient — ensures navbar text readability */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy/70 via-navy/30 to-transparent z-[1]" />

      {/* Gradient Overlay — bottom fade (stronger on mobile for portrait photo readability) */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/10 lg:from-navy lg:via-navy/20 lg:to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
        <div className="max-w-3xl">
          {/* Small label */}
          <div className="mb-4 overflow-hidden sm:mb-6">
            <p className="hero-line text-[10px] uppercase tracking-[0.3em] text-gold sm:text-xs">
              Advokátní kancelář Brno
            </p>
          </div>

          {/* Main Heading */}
          <h1
            ref={headingRef}
            className="font-heading text-4xl font-light leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ perspective: "1000px" }}
          >
            <span className="hero-line block">Právo s&nbsp;</span>
            <span className="hero-line block">
              <span className="text-gold-gradient font-medium">
                osobním přístupem
              </span>
            </span>
          </h1>

          {/* Gold Line */}
          <div
            className="hero-gold-line my-6 h-px w-16 bg-gold sm:my-8 sm:w-24"
            style={{ transformOrigin: "left", transform: "scaleX(0)" }}
          />

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
            style={{ opacity: 0 }}
          >
            Profesionální právní služby se zaměřením na občanské, rodinné,
            obchodní a pracovní právo. Každý případ řešíme individuálně s
            důrazem na vaše potřeby.
          </p>

          {/* CTA */}
          <div
            ref={ctaRef}
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
            style={{ opacity: 0 }}
          >
            <button
              onClick={() => {
                const el = document.querySelector("#kontakt");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative overflow-hidden rounded-full bg-gold px-6 py-3.5 text-xs uppercase tracking-[0.15em] text-white transition-all duration-500 hover:bg-gold-dark sm:px-8 sm:py-4 sm:text-sm"
            >
              <span className="relative z-10">Nezávazná konzultace</span>
            </button>
            <button
              onClick={() => {
                const el = document.querySelector("#sluzby");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-full border border-white/30 px-6 py-3.5 text-xs uppercase tracking-[0.15em] text-white/80 transition-all duration-300 hover:border-white/60 hover:text-white sm:px-8 sm:py-4 sm:text-sm"
            >
              Právní služby
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 cursor-pointer"
        style={{ opacity: 0 }}
        onClick={handleScrollDown}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
            Scroll
          </span>
          <ArrowDown className="h-4 w-4 text-gold" />
        </div>
      </div>
    </section>
  );
}
