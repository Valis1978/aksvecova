"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  Home,
  Heart,
  Briefcase,
  Users,
  Monitor,
  Scale,
  ArrowRight,
} from "lucide-react";
import { useClipReveal } from "@/hooks/useClipReveal";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: Home,
    title: "Občanské právo",
    slug: "obcanske-pravo",
    description:
      "Sepisování smluv, převody nemovitostí, vymáhání pohledávek, zastoupení v exekučním řízení.",
  },
  {
    icon: Heart,
    title: "Rodinné právo",
    slug: "rodinne-pravo",
    description:
      "Rozvody, výživné, péče o děti, vypořádání společného jmění manželů, úprava styku s dětmi.",
  },
  {
    icon: Briefcase,
    title: "Obchodní právo",
    slug: "obchodni-pravo",
    description:
      "Zakládání a správa společností, obchodní smlouvy, vymáhání pohledávek, korporátní právo.",
  },
  {
    icon: Users,
    title: "Pracovní právo",
    slug: "pracovni-pravo",
    description:
      "Pracovní smlouvy, výpovědi, odstupné, pracovní úrazy, zastoupení zaměstnanců i zaměstnavatelů.",
  },
  {
    icon: Scale,
    title: "Ostatní služby",
    slug: "dalsi-sluzby",
    description:
      "Správní právo, zastoupení před soudy, právní rozbory a poradenství v dalších právních oblastech.",
  },
  {
    icon: Monitor,
    title: "On-line konzultace",
    slug: "online-konzultace",
    description:
      "Právní poradenství na dálku — videokonference, telefonická konzultace, e-mailová komunikace.",
  },
];

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const gridClipRef = useClipReveal<HTMLDivElement>({ direction: 'bottom', duration: 1, ease: 'power3.inOut' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
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
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Cards stagger reveal
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".service-card");
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sluzby"
      className="relative bg-ivory py-16 sm:py-24 lg:py-32 grain-overlay"
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-navy/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="mb-10 max-w-2xl sm:mb-16">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold sm:mb-4 sm:text-xs">
            Oblasti práva
          </p>
          <h2 className="font-heading text-3xl font-light text-navy sm:text-4xl md:text-5xl lg:text-6xl">
            Právní služby
          </h2>
          <div className="mt-4 h-px w-12 bg-gold sm:mt-6 sm:w-16" />
        </div>

        {/* Cards Grid with clip-path reveal */}
        <div ref={gridClipRef}>
        <div
          ref={cardsRef}
          className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={`/sluzby/${service.slug}`}
                className="service-card card-shine group cursor-pointer rounded-xl border border-gray-light bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 sm:rounded-2xl sm:p-8"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 transition-colors duration-500 group-hover:bg-gold/10">
                  <Icon className="h-5 w-5 text-navy/60 transition-colors duration-500 group-hover:text-gold" />
                </div>
                <h3 className="mb-3 font-heading text-2xl font-medium text-navy">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-text">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="h-px w-0 bg-gold transition-all duration-700 group-hover:w-3/4" />
                  <ArrowRight className="h-4 w-4 text-gold opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100" />
                </div>
              </Link>
            );
          })}
        </div>
        </div>
        </div>
    </section>
  );
}
