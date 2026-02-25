"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Check, MessageCircle } from "lucide-react";
import { SERVICES, getServiceBySlug } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  slug: string;
}

export function ServicePageClient({ slug }: Props) {
  const service = getServiceBySlug(slug)!;
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);

  const Icon = service.icon;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero reveal
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll(".hero-el"),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }

      // Sections stagger
      if (sectionsRef.current) {
        const sections = sectionsRef.current.querySelectorAll(".detail-section");
        sections.forEach((section) => {
          gsap.fromTo(
            section,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }

      // FAQ reveal
      if (faqRef.current) {
        gsap.fromTo(
          faqRef.current.querySelectorAll(".faq-item"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: faqRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // CTA reveal
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Related services
      if (relatedRef.current) {
        gsap.fromTo(
          relatedRef.current.querySelectorAll(".related-card"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: relatedRef.current,
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(
    0,
    3
  );

  return (
    <main>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative bg-navy pb-16 pt-28 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-44"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="hero-el mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/40 sm:mb-12 sm:text-sm">
            <Link
              href="/"
              className="transition-colors hover:text-white/70"
            >
              Domů
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              href="/#sluzby"
              className="transition-colors hover:text-white/70"
            >
              Právní služby
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gold">{service.title}</span>
          </nav>

          {/* Icon */}
          <div className="hero-el mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 sm:mb-8 sm:h-16 sm:w-16">
            <Icon className="h-6 w-6 text-gold sm:h-7 sm:w-7" />
          </div>

          {/* Title */}
          <h1 className="hero-el font-heading text-4xl font-light text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {service.title}
          </h1>

          {/* Gold line */}
          <div className="hero-el mt-6 h-px w-16 bg-gold sm:mt-8 sm:w-20" />

          {/* Description */}
          <p className="hero-el mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:mt-8 sm:text-lg">
            {service.heroDescription}
          </p>

          {/* CTA */}
          <div className="hero-el mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href="/#kontakt"
              className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 text-xs uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-gold-dark sm:justify-start"
            >
              Nezávazná konzultace
            </Link>
            <Link
              href="/#odmena"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-xs uppercase tracking-[0.15em] text-white/70 transition-all duration-300 hover:border-white/40 hover:text-white sm:justify-start"
            >
              Ceník služeb
            </Link>
          </div>
        </div>
      </section>

      {/* Detail sections */}
      <section
        ref={sectionsRef}
        className="bg-ivory py-16 sm:py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {service.sections.map((section) => (
              <div
                key={section.heading}
                className="detail-section rounded-xl border border-gray-light bg-white p-6 transition-all duration-500 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 sm:rounded-2xl sm:p-8"
              >
                <h2 className="mb-5 font-heading text-2xl font-medium text-navy sm:text-3xl">
                  {section.heading}
                </h2>
                <div className="h-px w-10 bg-gold" />
                <ul className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                      <span className="text-sm leading-relaxed text-gray-text">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className="bg-white py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-16">
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold sm:mb-4 sm:text-xs">
              Časté dotazy
            </p>
            <h2 className="font-heading text-3xl font-light text-navy sm:text-4xl md:text-5xl">
              {service.title} — FAQ
            </h2>
            <div className="mt-4 h-px w-12 bg-gold sm:mt-6 sm:w-16" />
          </div>

          <div className="space-y-6">
            {service.faqs.map((faq) => (
              <div
                key={faq.question}
                className="faq-item rounded-xl border border-gray-light bg-ivory p-6 transition-all duration-300 hover:border-gold/30 sm:p-8"
              >
                <h3 className="mb-3 font-heading text-lg font-medium text-navy sm:text-xl">
                  {faq.question}
                </h3>
                <p className="text-sm leading-relaxed text-gray-text">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        ref={ctaRef}
        className="bg-navy py-16 sm:py-24"
      >
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8">
          <MessageCircle className="mx-auto mb-6 h-10 w-10 text-gold" />
          <h2 className="font-heading text-3xl font-light text-white sm:text-4xl md:text-5xl">
            Řešíte podobný případ?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/50 sm:mt-6 sm:text-base">
            Neváhejte se obrátit na mou kancelář. Prvních 15 minut konzultace
            zdarma — společně posoudíme vaši situaci a najdeme nejlepší řešení.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row sm:justify-center sm:gap-6">
            <Link
              href="/#kontakt"
              className="inline-flex items-center rounded-full bg-gold px-8 py-3.5 text-xs uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-gold-dark"
            >
              Kontaktujte mě
            </Link>
            <a
              href="tel:+420777126700"
              className="inline-flex items-center rounded-full border border-white/20 px-8 py-3.5 text-xs uppercase tracking-[0.15em] text-white/70 transition-all duration-300 hover:border-white/40 hover:text-white"
            >
              +420 777 126 700
            </a>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section
        ref={relatedRef}
        className="bg-ivory py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold sm:mb-4 sm:text-xs">
            Další oblasti práva
          </p>
          <h2 className="mb-10 font-heading text-3xl font-light text-navy sm:mb-16 sm:text-4xl">
            Další právní služby
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {otherServices.map((s) => {
              const SIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/sluzby/${s.slug}`}
                  className="related-card group rounded-xl border border-gray-light bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 sm:rounded-2xl sm:p-8"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 transition-colors duration-500 group-hover:bg-gold/10">
                    <SIcon className="h-5 w-5 text-navy/60 transition-colors duration-500 group-hover:text-gold" />
                  </div>
                  <h3 className="mb-3 font-heading text-2xl font-medium text-navy">
                    {s.title}
                  </h3>
                  <p className="line-clamp-2 text-sm leading-relaxed text-gray-text">
                    {s.heroDescription}
                  </p>
                  <div className="mt-6 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
                </Link>
              );
            })}
          </div>

          {/* Back to home */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-navy/60 transition-colors hover:text-navy"
            >
              <ArrowLeft className="h-4 w-4" />
              Zpět na hlavní stránku
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
