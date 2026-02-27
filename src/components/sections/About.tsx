"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Award, BookOpen, Users, Calendar } from "lucide-react";
import { useClipReveal } from "@/hooks/useClipReveal";
import { useSplitTextReveal } from "@/hooks/useSplitTextReveal";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { icon: Calendar, value: "10+", label: "let praxe" },
  { icon: BookOpen, value: "JUDr.", label: "rigorózní zkouška" },
  { icon: Users, value: "500+", label: "spokojených klientů" },
  { icon: Award, value: "2013", label: "advokátní zkouška" },
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageClipRef = useClipReveal<HTMLDivElement>({ direction: 'left', duration: 1.2, ease: 'power3.inOut' });
  const titleRef = useSplitTextReveal<HTMLHeadingElement>({ type: 'chars', stagger: 0.03, y: 30 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image clip-path reveal
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Text content stagger
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Stats counter animation
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll(".stat-item");
        gsap.fromTo(
          statItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
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
      id="o-mne"
      className="relative bg-white py-16 sm:py-24 lg:py-32 grain-overlay"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 sm:gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Image Column with clip-path reveal */}
          <div ref={imageClipRef} className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div
              ref={imageWrapperRef}
              className="relative aspect-[3/4] w-full max-h-[450px] overflow-hidden rounded-xl sm:max-h-[600px] sm:rounded-2xl"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              <Image
                src="/images/about-portrait.png"
                alt="JUDr. Michaela Švecová"
                fill
                loading="lazy"
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative gold line — hidden on mobile */}
            <div className="absolute -bottom-4 -right-4 hidden h-full w-full max-h-[600px] rounded-2xl border border-gold/20 sm:block" />
          </div>

          {/* Text Column */}
          <div ref={textRef}>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">
              O mně
            </p>
            <h2 ref={titleRef} className="font-heading text-4xl font-light text-navy md:text-5xl">
              JUDr. Michaela Švecová
            </h2>
            <div className="mt-6 h-px w-16 bg-gold" />

            <p className="mt-8 text-base leading-relaxed text-gray-text">
              Vystudovala jsem Právnickou fakultu Masarykovy univerzity v Brně.
              Studium jsem zakončila v roce 2008 obhajobou diplomové práce na
              téma Dítě a rozvod rodičů.
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-text">
              V roce 2015 jsem úspěšně obhájila rigorózní práci na Právnické
              fakultě Univerzity Palackého v Olomouci, kde jsem získala titul
              doktorka práv.
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-text">
              Advokacii se věnuji od roku 2008. Po 4,5 letech praxe pod vedením
              zkušeného advokáta jsem v roce 2013 složila advokátní zkoušky. Od
              roku 2017 působím jako samostatná advokátka v Brně.
            </p>
            <div className="mt-6 flex items-center gap-4 rounded-xl border border-gold/20 bg-gold/5 p-4 sm:gap-5 sm:p-5">
              <Image
                src="/images/ura-logo-full.png"
                alt="Logo Unie rodinných advokátů"
                width={80}
                height={48}
                className="flex-shrink-0"
              />
              <p className="text-sm leading-relaxed text-gray-text sm:text-base">
                Jsem řádnou členkou{" "}
                <span className="font-medium text-navy">
                  Unie rodinných advokátů
                </span>
                , profesního spolku sdružujícího advokáty specializující se na
                rodinné právo.
              </p>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4"
            >
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="stat-item text-center">
                    <Icon className="mx-auto mb-2 h-5 w-5 text-gold" />
                    <div className="font-heading text-2xl font-semibold text-navy">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-wider text-gray-text">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
