"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, FileSearch, Handshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    icon: Phone,
    title: "Úvodní konzultace",
    description:
      "Kontaktujte mě prostřednictvím formuláře, telefonu nebo e-mailu. Popište svou situaci a domluvíme termín osobní nebo online schůzky.",
  },
  {
    number: "02",
    icon: FileSearch,
    title: "Analýza případu",
    description:
      "Důkladně zanalyzuji váš případ, prozkoumám relevantní dokumenty a navrhnu optimální strategii řešení s ohledem na vaše zájmy.",
  },
  {
    number: "03",
    icon: Handshake,
    title: "Řešení & zastoupení",
    description:
      "Převezmu zastoupení vašeho případu — od přípravy dokumentů přes jednání až po zastupování před soudy. Průběžně vás informuji.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Steps with connecting line
      if (stepsRef.current) {
        const steps = stepsRef.current.querySelectorAll(".process-step");
        gsap.fromTo(
          steps,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 85%",
            },
          }
        );

        // Connecting line animation
        const line = stepsRef.current.querySelector(".connecting-line");
        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: stepsRef.current,
                start: "top 80%",
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proces"
      className="relative bg-navy py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 text-center sm:mb-20">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold sm:mb-4 sm:text-xs">
            Jak spolupracujeme
          </p>
          <h2 className="font-heading text-3xl font-light text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Tři kroky ke spolupráci
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-gold sm:mt-6 sm:w-16" />
        </div>

        {/* Steps */}
        <div
          ref={stepsRef}
          className="relative mx-auto max-w-4xl"
        >
          {/* Vertical connecting line (desktop) */}
          <div
            className="connecting-line absolute left-[27px] top-8 hidden h-[calc(100%-4rem)] w-px bg-gold/30 lg:block"
            style={{ transformOrigin: "top" }}
          />

          <div className="flex flex-col gap-16">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="process-step flex gap-8 lg:gap-12"
                >
                  {/* Number circle */}
                  <div className="relative flex-shrink-0">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-navy">
                      <span className="font-heading text-lg font-medium text-gold">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <div className="mb-3 flex items-center gap-3">
                      <Icon className="h-5 w-5 text-gold/70" />
                      <h3 className="font-heading text-2xl font-medium text-white md:text-3xl">
                        {step.title}
                      </h3>
                    </div>
                    <p className="max-w-lg text-base leading-relaxed text-white/60">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
