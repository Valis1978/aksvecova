"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X, Scale } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { href: "#sluzby", label: "Právní služby" },
  { href: "#o-mne", label: "O mně" },
  { href: "#proces", label: "Spolupráce" },
  { href: "#odmena", label: "Odměna" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-gradient-to-b from-navy/30 to-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3"
          >
            <Scale
              className={`h-6 w-6 transition-colors duration-500 ${
                isScrolled ? "text-gold" : "text-white"
              }`}
            />
            <div className="flex flex-col">
              <span
                className={`font-heading text-lg font-semibold tracking-wide transition-colors duration-500 ${
                  isScrolled ? "text-navy" : "text-white"
                }`}
              >
                JUDr. Švecová
              </span>
              <span
                className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${
                  isScrolled ? "text-gold" : "text-gold-light"
                }`}
              >
                Advokátní kancelář
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`nav-link text-sm uppercase tracking-[0.15em] transition-colors duration-300 ${
                  isScrolled
                    ? "text-navy/70 hover:text-navy"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#kontakt")}
              className="rounded-full border border-gold bg-transparent px-6 py-2.5 text-xs uppercase tracking-[0.15em] text-gold transition-all duration-300 hover:bg-gold hover:text-white"
            >
              Nezávazná konzultace
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden transition-colors duration-500 ${
              isScrolled ? "text-navy" : "text-white"
            }`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-96 bg-white/95 backdrop-blur-md" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-5 py-5 sm:px-6 sm:py-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-sm uppercase tracking-[0.15em] text-navy/70 transition-colors hover:text-navy"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#kontakt")}
            className="mt-2 rounded-full border border-gold bg-gold px-6 py-3 text-center text-xs uppercase tracking-[0.15em] text-white"
          >
            Nezávazná konzultace
          </button>
        </div>
      </div>
    </nav>
  );
}
