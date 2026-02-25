"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Home,
  Heart,
  Briefcase,
  Users,
  Scale,
  Monitor,
  Clock,
  AlertCircle,
  CalendarClock,
  ArrowRight,
  ArrowLeft,
  Check,
  Send,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

// ========== WIZARD DATA ==========

const AREAS = [
  { id: "obcanske", label: "Občanské právo", icon: Home, sub: ["Smlouvy", "Nemovitosti", "Pohledávky", "Dědictví", "Jiné"] },
  { id: "rodinne", label: "Rodinné právo", icon: Heart, sub: ["Rozvod", "Výživné", "Péče o děti", "SJM", "Jiné"] },
  { id: "obchodni", label: "Obchodní právo", icon: Briefcase, sub: ["Založení firmy", "Obchodní smlouvy", "Pohledávky", "Jiné"] },
  { id: "pracovni", label: "Pracovní právo", icon: Users, sub: ["Pracovní smlouva", "Výpověď", "Odstupné", "Pracovní úraz", "Jiné"] },
  { id: "spravni", label: "Ostatní právo", icon: Scale, sub: ["Správní právo", "Soudní zastoupení", "Právní rozbor", "Jiné"] },
  { id: "online", label: "On-line konzultace", icon: Monitor, sub: ["Videokonference", "Telefonicky", "E-mailem"] },
];

const URGENCY = [
  { id: "urgent", label: "Co nejdříve", icon: AlertCircle, description: "Potřebuji řešit akutní situaci" },
  { id: "weeks", label: "V nejbližších týdnech", icon: CalendarClock, description: "Není to urgentní, ale chci to řešit" },
  { id: "info", label: "Jen se orientuji", icon: Clock, description: "Zatím hledám informace" },
];

const TOTAL_STEPS = 4;

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(1);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferContact: "phone" as "phone" | "email",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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
            scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
          }
        );
      }
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: formRef.current, start: "top 85%" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate step transition
  useEffect(() => {
    const stepContent = document.querySelector(".wizard-step-content");
    if (stepContent) {
      gsap.fromTo(
        stepContent,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [step]);

  const canProceed = () => {
    switch (step) {
      case 1: return !!selectedArea;
      case 2: return !!selectedSub;
      case 3: return !!selectedUrgency;
      case 4: return formData.name.trim() !== "" && (formData.email.trim() !== "" || formData.phone.trim() !== "");
      default: return false;
    }
  };

  const handleSubmit = () => {
    // TODO: POST to /api/contact → Supabase + email
    console.log("Submit:", { selectedArea, selectedSub, selectedUrgency, ...formData });
    setIsSubmitted(true);

    gsap.fromTo(
      ".success-animation",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
    );
  };

  const currentArea = AREAS.find((a) => a.id === selectedArea);

  if (isSubmitted) {
    return (
      <section ref={sectionRef} id="kontakt" className="relative bg-white py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-6 lg:px-8">
          <div className="success-animation">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
              <Check className="h-10 w-10 text-gold" />
            </div>
            <h2 className="font-heading text-3xl font-light text-navy md:text-4xl">
              Děkujeme za váš dotaz
            </h2>
            <p className="mt-4 text-base text-gray-text">
              Ozveme se vám nejpozději do 24 hodin. Pokud je váš případ urgentní,
              neváhejte zavolat na{" "}
              <a href="tel:+420777126700" className="text-gold hover:underline">
                +420 777 126 700
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="kontakt" className="relative bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:gap-16 lg:grid-cols-[1fr_400px]">
          {/* Wizard Column */}
          <div>
            {/* Heading */}
            <div ref={headingRef} className="mb-8 sm:mb-10">
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold sm:mb-4 sm:text-xs">
                Kontakt
              </p>
              <h2 className="font-heading text-3xl font-light text-navy sm:text-4xl md:text-5xl">
                Popište svou situaci
              </h2>
              <div className="mt-4 h-px w-12 bg-gold sm:mt-6 sm:w-16" />
            </div>

            {/* Progress Bar */}
            <div className="mb-8 flex items-center gap-2">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  className={clsx(
                    "h-1 flex-1 rounded-full transition-all duration-500",
                    i < step ? "bg-gold" : "bg-gray-light"
                  )}
                />
              ))}
              <span className="ml-3 text-xs text-gray-text">
                {step}/{TOTAL_STEPS}
              </span>
            </div>

            {/* Wizard Content */}
            <div ref={formRef} className="wizard-step-content min-h-[320px]">
              {/* STEP 1: Oblast práva */}
              {step === 1 && (
                <div>
                  <h3 className="mb-6 text-lg font-medium text-navy">
                    V jaké oblasti potřebujete pomoc?
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {AREAS.map((area) => {
                      const Icon = area.icon;
                      return (
                        <button
                          key={area.id}
                          onClick={() => { setSelectedArea(area.id); setSelectedSub(null); }}
                          className={clsx("wizard-card flex items-center gap-4 text-left", selectedArea === area.id && "selected")}
                        >
                          <Icon className={clsx("h-5 w-5 flex-shrink-0", selectedArea === area.id ? "text-gold" : "text-gray-text")} />
                          <span className={clsx("text-sm font-medium", selectedArea === area.id ? "text-navy" : "text-gray-text")}>
                            {area.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Upřesnění */}
              {step === 2 && currentArea && (
                <div>
                  <h3 className="mb-6 text-lg font-medium text-navy">
                    Upřesněte prosím oblast — {currentArea.label}
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {currentArea.sub.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSelectedSub(sub)}
                        className={clsx("wizard-card text-left", selectedSub === sub && "selected")}
                      >
                        <span className={clsx("text-sm font-medium", selectedSub === sub ? "text-navy" : "text-gray-text")}>
                          {sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Urgence */}
              {step === 3 && (
                <div>
                  <h3 className="mb-6 text-lg font-medium text-navy">
                    Jak naléhavá je vaše situace?
                  </h3>
                  <div className="flex flex-col gap-3">
                    {URGENCY.map((urg) => {
                      const Icon = urg.icon;
                      return (
                        <button
                          key={urg.id}
                          onClick={() => setSelectedUrgency(urg.id)}
                          className={clsx("wizard-card flex items-center gap-4 text-left", selectedUrgency === urg.id && "selected")}
                        >
                          <Icon className={clsx("h-5 w-5 flex-shrink-0", selectedUrgency === urg.id ? "text-gold" : "text-gray-text")} />
                          <div>
                            <span className={clsx("text-sm font-medium", selectedUrgency === urg.id ? "text-navy" : "text-gray-text")}>
                              {urg.label}
                            </span>
                            <p className="text-xs text-gray-text">{urg.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: Kontaktní údaje */}
              {step === 4 && (
                <div>
                  <h3 className="mb-6 text-lg font-medium text-navy">
                    Vaše kontaktní údaje
                  </h3>
                  <div className="space-y-5">
                    <div className="relative">
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Jméno a příjmení *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <input
                        type="email"
                        className="form-input"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="Telefon"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    {/* Preferred contact */}
                    <div className="flex gap-4">
                      <span className="text-sm text-gray-text">Preferuji:</span>
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          name="preferContact"
                          checked={formData.preferContact === "phone"}
                          onChange={() => setFormData({ ...formData, preferContact: "phone" })}
                          className="accent-gold"
                        />
                        <span className="text-sm text-navy">Telefon</span>
                      </label>
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          name="preferContact"
                          checked={formData.preferContact === "email"}
                          onChange={() => setFormData({ ...formData, preferContact: "email" })}
                          className="accent-gold"
                        />
                        <span className="text-sm text-navy">E-mail</span>
                      </label>
                    </div>

                    <textarea
                      className="form-input min-h-[100px] resize-none"
                      placeholder="Pokud chcete, popište svou situaci podrobněji... (volitelné)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 text-sm text-gray-text transition-colors hover:text-navy"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Zpět
                </button>
              ) : (
                <div />
              )}

              {step < TOTAL_STEPS ? (
                <button
                  onClick={() => canProceed() && setStep(step + 1)}
                  disabled={!canProceed()}
                  className={clsx(
                    "flex items-center gap-2 rounded-full px-8 py-3 text-sm uppercase tracking-[0.1em] transition-all duration-300",
                    canProceed()
                      ? "bg-gold text-white hover:bg-gold-dark"
                      : "cursor-not-allowed bg-gray-light text-gray-text"
                  )}
                >
                  Pokračovat
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => canProceed() && handleSubmit()}
                  disabled={!canProceed()}
                  className={clsx(
                    "flex items-center gap-2 rounded-full px-8 py-3 text-sm uppercase tracking-[0.1em] transition-all duration-300",
                    canProceed()
                      ? "bg-gold text-white hover:bg-gold-dark"
                      : "cursor-not-allowed bg-gray-light text-gray-text"
                  )}
                >
                  Odeslat
                  <Send className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* GDPR note */}
            <p className="mt-6 text-xs text-gray-text">
              Odesláním formuláře souhlasíte se{" "}
              <a href="/gdpr" className="text-gold underline hover:text-gold-dark">
                zpracováním osobních údajů
              </a>
              . Vaše údaje použijeme výhradně pro zodpovězení vašeho dotazu.
            </p>
          </div>

          {/* Contact Info Sidebar */}
          <div className="flex flex-col gap-6 sm:gap-8 lg:pt-20">
            <div className="rounded-xl border border-gray-light bg-ivory p-6 sm:rounded-2xl sm:p-8">
              <h3 className="mb-6 font-heading text-xl font-medium text-navy">
                Kontaktní údaje
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                  <div>
                    <p className="text-sm font-medium text-navy">Sídlo kanceláře</p>
                    <p className="text-sm text-gray-text">
                      Martina Ševčíka 4<br />
                      625 00 Brno
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                  <div>
                    <p className="text-sm font-medium text-navy">Telefon</p>
                    <a href="tel:+420777126700" className="text-sm text-gray-text transition-colors hover:text-gold">
                      +420 777 126 700
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                  <div>
                    <p className="text-sm font-medium text-navy">E-mail</p>
                    <a href="mailto:svecova@aksvecova.cz" className="text-sm text-gray-text transition-colors hover:text-gold">
                      svecova@aksvecova.cz
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                  <div>
                    <p className="text-sm font-medium text-navy">Provozní doba</p>
                    <p className="text-sm text-gray-text">
                      Dle předchozí telefonní domluvy
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 h-px w-full bg-gray-light" />

              <p className="mt-4 text-xs text-gray-text">
                IČO: 05508681
              </p>
            </div>

            {/* Map Link */}
            <a
              href="https://mapy.cz/s/huzavopake"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-40 items-center justify-center overflow-hidden rounded-xl border border-gray-light bg-navy-light transition-all duration-300 hover:border-gold/40 sm:h-48 sm:rounded-2xl"
            >
              <div className="text-center">
                <MapPin className="mx-auto mb-2 h-8 w-8 text-gold transition-transform duration-300 group-hover:scale-110" />
                <p className="text-sm font-medium text-white">
                  Martina Ševčíka 4, Brno
                </p>
                <p className="mt-1 text-xs text-white/50 transition-colors group-hover:text-gold">
                  Otevřít na Mapy.cz &rarr;
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
