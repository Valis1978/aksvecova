"use client";

import { Scale } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 sm:gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Scale className="h-5 w-5 text-gold" />
            <span className="font-heading text-lg font-semibold tracking-wide text-white">
              JUDr. Švecová
            </span>
          </div>

          {/* Separator */}
          <div className="h-px w-24 bg-gold/30" />

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs uppercase tracking-[0.15em] text-white/40 sm:gap-x-6">
            <a href="#sluzby" className="transition-colors hover:text-white/70">
              Právní služby
            </a>
            <a href="#o-mne" className="transition-colors hover:text-white/70">
              O mně
            </a>
            <a href="#odmena" className="transition-colors hover:text-white/70">
              Odměna
            </a>
            <a href="#kontakt" className="transition-colors hover:text-white/70">
              Kontakt
            </a>
            <a href="/gdpr" className="transition-colors hover:text-white/70">
              GDPR
            </a>
          </div>

          {/* Copyright */}
          <p className="text-center text-[11px] text-white/30 sm:text-xs">
            &copy; {currentYear} Advokátní kancelář JUDr. Michaela Švecová. Všechna práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
}
