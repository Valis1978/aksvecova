"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HOURLY = {
  price: "2 000",
  unit: "Kč / hod",
  description:
    "Komplexní právní poradenství, zastoupení a konzultace. Sepis smluv, vymáhání pohledávek, zastoupení před soudy.",
};

const PLANS = [
  {
    name: "Paušál I",
    hours: 5,
    price: "9 400",
    overage: "1 880",
    highlighted: false,
  },
  {
    name: "Paušál II",
    hours: 10,
    price: "17 300",
    overage: "1 730",
    highlighted: true,
  },
  {
    name: "Paušál III",
    hours: 20,
    price: "31 600",
    overage: "1 580",
    highlighted: false,
  },
  {
    name: "VIP Paušál",
    hours: 30,
    price: "40 000",
    overage: "1 550",
    highlighted: false,
  },
];

export function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".pricing-card");
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
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
      id="odmena"
      className="relative bg-ivory py-24 lg:py-32 grain-overlay"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="mb-10 text-center sm:mb-16">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold sm:mb-4 sm:text-xs">
            Odměna
          </p>
          <h2 className="font-heading text-3xl font-light text-navy sm:text-4xl md:text-5xl lg:text-6xl">
            Transparentní ceník
          </h2>
          <div className="mx-auto mt-4 h-px w-12 bg-gold sm:mt-6 sm:w-16" />
          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-text sm:mt-6 sm:text-base">
            Výše odměny se stanoví dohodou. Kromě hodinové sazby nabízím
            zvýhodněné paušální balíčky pro pravidelnou spolupráci.
          </p>
        </div>

        {/* Hourly Rate — Hero Block */}
        <div ref={cardsRef}>
          <div className="pricing-card card-shine mx-auto mb-8 max-w-2xl rounded-xl border border-gray-light bg-white p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5 sm:mb-12 sm:rounded-2xl sm:p-8 md:p-10">
            <h3 className="font-heading text-2xl font-medium text-navy">
              Hodinová sazba
            </h3>
            <div className="my-4 flex items-baseline justify-center gap-1">
              <span className="font-heading text-4xl font-semibold text-navy sm:text-5xl">
                {HOURLY.price}
              </span>
              <span className="text-sm text-gray-text">{HOURLY.unit}</span>
            </div>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-text">
              {HOURLY.description}
            </p>
            <button
              onClick={() => {
                const el = document.querySelector("#kontakt");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-6 rounded-full border border-navy/20 px-8 py-3 text-sm uppercase tracking-[0.1em] text-navy transition-all duration-300 hover:border-gold hover:text-gold"
            >
              Nezávazná konzultace
            </button>
          </div>

          {/* Paušální balíčky */}
          <p className="mb-8 text-center text-xs uppercase tracking-[0.3em] text-gold">
            Paušální balíčky
          </p>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`pricing-card card-shine relative rounded-xl p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg sm:rounded-2xl sm:p-6 ${
                  plan.highlighted
                    ? "border-2 border-gold bg-white shadow-xl shadow-gold/10"
                    : "border border-gray-light bg-white hover:shadow-gold/5"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 rounded-full bg-gold px-4 py-1">
                      <Star className="h-3 w-3 text-white" />
                      <span className="text-[10px] uppercase tracking-wider text-white">
                        Oblíbené
                      </span>
                    </div>
                  </div>
                )}

                <h3 className="font-heading text-lg font-medium text-navy">
                  {plan.name}
                </h3>

                <div className="my-4 flex items-baseline gap-1">
                  <span className="font-heading text-3xl font-semibold text-navy">
                    {plan.price}
                  </span>
                  <span className="text-xs text-gray-text">Kč / měsíc</span>
                </div>

                <div className="h-px w-full bg-gray-light" />

                <ul className="mt-4 space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                    <span className="text-sm text-gray-text">
                      {plan.hours} hodin právních služeb
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                    <span className="text-sm text-gray-text">
                      Komplexní poradenství a zastoupení
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                    <span className="text-sm text-gray-text">
                      Každá další hodina {plan.overage} Kč
                    </span>
                  </li>
                </ul>

                <button
                  onClick={() => {
                    const el = document.querySelector("#kontakt");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`mt-6 w-full rounded-full py-3 text-xs uppercase tracking-[0.1em] transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-gold text-white hover:bg-gold-dark"
                      : "border border-navy/20 text-navy hover:border-gold hover:text-gold"
                  }`}
                >
                  Mám zájem
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <p className="mt-10 text-center text-sm text-gray-text">
          Odměna může být rovněž stanovena podle{" "}
          <span className="text-navy">advokátního tarifu</span> (vyhláška č.
          177/1966 Sb.) za konkrétní úkony právní služby.
        </p>
      </div>
    </section>
  );
}
