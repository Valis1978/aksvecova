import { Home, Heart, Briefcase, Users, Monitor, Scale } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  heroDescription: string;
  sections: {
    heading: string;
    items: string[];
  }[];
  faqs: ServiceFAQ[];
  keywords: string[];
}

export const SERVICES: ServiceDetail[] = [
  {
    slug: "rodinne-pravo",
    title: "Rodinné právo",
    shortTitle: "Rodinné",
    icon: Heart,
    heroDescription:
      "Komplexní zastoupení v rodinněprávních sporech. Citlivý a profesionální přístup v náročných životních situacích — rozvody, péče o děti, výživné, SJM.",
    sections: [
      {
        heading: "Rozvody a rozchody",
        items: [
          "Sporné i nesporné rozvody manželství",
          "Příprava rozvodových dohod a návrhů",
          "Zastoupení v řízení o rozvod",
          "Právní poradenství při rozchodu nesezdaných párů",
        ],
      },
      {
        heading: "Péče o děti a výživné",
        items: [
          "Úprava péče o nezletilé děti (výlučná, střídavá, společná)",
          "Stanovení a změna výživného",
          "Úprava styku s dětmi",
          "Výživné mezi manžely a rozvedenými manžely",
          "Výživné na zletilé děti (studující)",
        ],
      },
      {
        heading: "Společné jmění manželů (SJM)",
        items: [
          "Vypořádání společného jmění manželů dohodou",
          "Soudní vypořádání SJM",
          "Předmanželské smlouvy a modifikace SJM",
          "Zúžení a rozšíření společného jmění",
        ],
      },
      {
        heading: "Další rodinněprávní agenda",
        items: [
          "Určení a popření otcovství",
          "Osvojení a pěstounská péče",
          "Opatrovnické řízení",
          "Domácí násilí — návrhy na vykázání, předběžná opatření",
        ],
      },
    ],
    faqs: [
      {
        question: "Jak dlouho trvá rozvodové řízení?",
        answer:
          "Nesporný rozvod s dohodou o dětech a majetku trvá obvykle 2–4 měsíce. Sporný rozvod může trvat 6 měsíců až 2 roky v závislosti na složitosti.",
      },
      {
        question: "Kolik stojí rozvod?",
        answer:
          "Soudní poplatek za rozvodové řízení činí 2 000 Kč. Odměna advokáta závisí na složitosti případu — u nesporného rozvodu od 15 000 Kč, u sporného dle hodinové sazby.",
      },
      {
        question: "Jak se určuje výše výživného?",
        answer:
          "Výživné se stanoví podle potřeb oprávněného (dítěte) a možností povinného (rodiče). Soud hodnotí příjmy, majetek, životní úroveň a odůvodněné potřeby dítěte.",
      },
      {
        question: "Mohu změnit formu péče o dítě?",
        answer:
          "Ano, při podstatné změně poměrů (stěhování, změna zaměstnání, věk dítěte) lze podat návrh na změnu úpravy péče. Soud vždy rozhoduje v nejlepším zájmu dítěte.",
      },
    ],
    keywords: [
      "rodinné právo Brno",
      "rozvod Brno",
      "výživné advokát",
      "péče o děti",
      "SJM vypořádání",
      "advokát rozvod",
      "střídavá péče",
    ],
  },
  {
    slug: "obcanske-pravo",
    title: "Občanské právo",
    shortTitle: "Občanské",
    icon: Home,
    heroDescription:
      "Široké spektrum občanskoprávních služeb — od sepisování smluv přes převody nemovitostí až po zastoupení ve sporech o náhradu škody.",
    sections: [
      {
        heading: "Smluvní právo",
        items: [
          "Sepisování a revize kupních, darovacích a nájemních smluv",
          "Smlouvy o dílo a smlouvy o spolupráci",
          "Smlouvy o půjčce a zajišťovací instrumenty",
          "Kontrola smluvních podmínek před podpisem",
        ],
      },
      {
        heading: "Nemovitosti",
        items: [
          "Převody nemovitostí a advokátní úschova",
          "Věcná břemena a zástavní práva",
          "Nájemní vztahy — uzavírání, změna a ukončení nájmu",
          "Sousedské spory a ochrana vlastnictví",
        ],
      },
      {
        heading: "Náhrada škody a bezdůvodné obohacení",
        items: [
          "Uplatnění nároku na náhradu škody",
          "Ušlý zisk a nemajetková újma",
          "Pojistné události a jednání s pojišťovnami",
          "Bezdůvodné obohacení a jeho vrácení",
        ],
      },
      {
        heading: "Vymáhání pohledávek",
        items: [
          "Předžalobní výzvy a mimosoudní řešení",
          "Soudní vymáhání pohledávek",
          "Exekuční řízení a součinnost s exekutory",
          "Insolvenční řízení — přihlášky pohledávek",
        ],
      },
    ],
    faqs: [
      {
        question: "Potřebuji advokáta k převodu nemovitosti?",
        answer:
          "Zákon to nevyžaduje, ale důrazně doporučuji. Advokát zkontroluje právní stav nemovitosti, připraví smlouvu a zajistí bezpečnou úschovu kupní ceny.",
      },
      {
        question: "Jak vymáhat dlužnou částku?",
        answer:
          "Nejprve zasíláme předžalobní výzvu s lhůtou k úhradě. Pokud dlužník nezaplatí, podáme žalobu. Po právní moci rozsudku lze přistoupit k exekuci.",
      },
      {
        question: "Kolik stojí sepsání smlouvy?",
        answer:
          "Cena závisí na složitosti smlouvy. Jednoduchá kupní smlouva od 5 000 Kč, složitější smluvní dokumentace dle hodinové sazby.",
      },
      {
        question: "Jaká je promlčecí doba u náhrady škody?",
        answer:
          "Obecná promlčecí lhůta je 3 roky od okamžiku, kdy se poškozený o škodě dozví. Objektivní promlčecí lhůta je 10 let (u úmyslné škody 15 let).",
      },
    ],
    keywords: [
      "občanské právo Brno",
      "smlouvy advokát",
      "převod nemovitosti",
      "náhrada škody",
      "vymáhání pohledávek Brno",
      "nájemní smlouva",
      "advokátní úschova",
    ],
  },
  {
    slug: "obchodni-pravo",
    title: "Obchodní právo",
    shortTitle: "Obchodní",
    icon: Briefcase,
    heroDescription:
      "Právní podpora pro podnikatele a firmy — zakládání společností, obchodní smlouvy, corporate governance a řešení obchodních sporů.",
    sections: [
      {
        heading: "Zakládání a správa společností",
        items: [
          "Zakládání s.r.o., a.s. a dalších obchodních společností",
          "Zápisy změn do obchodního rejstříku",
          "Přeměny společností (fúze, rozdělení, změna právní formy)",
          "Likvidace a zrušení společností",
        ],
      },
      {
        heading: "Obchodní smlouvy",
        items: [
          "Kupní smlouvy a rámcové dohody",
          "Smlouvy o obchodním zastoupení a distribuci",
          "Licenční smlouvy a ochrana duševního vlastnictví",
          "Due diligence a transakční poradenství",
        ],
      },
      {
        heading: "Korporátní právo",
        items: [
          "Příprava valných hromad a společnických rozhodnutí",
          "Smlouvy mezi společníky (shareholders' agreements)",
          "Převody obchodních podílů a akcií",
          "Odpovědnost jednatelů a členů statutárních orgánů",
        ],
      },
      {
        heading: "Obchodní spory",
        items: [
          "Zastoupení v obchodních sporech před soudy",
          "Rozhodčí řízení (arbitráž)",
          "Mimosoudní řešení sporů (mediace)",
          "Vymáhání obchodních pohledávek",
        ],
      },
    ],
    faqs: [
      {
        question: "Kolik stojí založení s.r.o.?",
        answer:
          "Celkové náklady na založení s.r.o. se pohybují od 15 000 do 25 000 Kč včetně soudních a notářských poplatků. Odměna advokáta za přípravu dokumentů od 8 000 Kč.",
      },
      {
        question: "Jak dlouho trvá založení společnosti?",
        answer:
          "Od přípravy dokumentů po zápis do obchodního rejstříku obvykle 2–4 týdny. S využitím datové schránky pro podání na rejstříkový soud je proces rychlejší.",
      },
      {
        question: "Potřebuji advokáta pro obchodní smlouvu?",
        answer:
          "U významných transakcí rozhodně doporučuji. Profesionálně připravená smlouva chrání vaše zájmy a minimalizuje riziko budoucích sporů.",
      },
      {
        question: "Co je due diligence?",
        answer:
          "Due diligence je právní prověrka společnosti před její akvizicí nebo investicí. Zahrnuje analýzu smluv, závazků, soudních sporů a regulatorních rizik.",
      },
    ],
    keywords: [
      "obchodní právo Brno",
      "založení s.r.o.",
      "obchodní smlouvy",
      "korporátní právo",
      "advokát pro firmy Brno",
      "obchodní spory",
      "due diligence",
    ],
  },
  {
    slug: "pracovni-pravo",
    title: "Pracovní právo",
    shortTitle: "Pracovní",
    icon: Users,
    heroDescription:
      "Právní poradenství a zastoupení zaměstnanců i zaměstnavatelů. Pracovní smlouvy, výpovědi, odstupné, pracovní úrazy a ochrana práv v pracovním poměru.",
    sections: [
      {
        heading: "Pro zaměstnance",
        items: [
          "Kontrola a revize pracovních smluv",
          "Neplatnost výpovědi a okamžitého zrušení pracovního poměru",
          "Nároky z pracovních úrazů a nemocí z povolání",
          "Diskriminace a šikana na pracovišti (mobbing, bossing)",
          "Nevyplacená mzda a dlužné odstupné",
        ],
      },
      {
        heading: "Pro zaměstnavatele",
        items: [
          "Příprava pracovních smluv, DPP a DPČ",
          "Vnitřní předpisy a pracovní řád",
          "Ukončení pracovního poměru — výpovědi, dohody",
          "Ochrana obchodního tajemství a konkurenční doložky",
          "Zastoupení v pracovněprávních sporech",
        ],
      },
      {
        heading: "Pracovní úrazy a nemoci z povolání",
        items: [
          "Uplatnění nároků z pracovních úrazů",
          "Bolestné a ztížení společenského uplatnění",
          "Náhrada za ztrátu na výdělku",
          "Jednání s pojišťovnami zaměstnavatelů",
        ],
      },
      {
        heading: "Kolektivní pracovní právo",
        items: [
          "Kolektivní smlouvy a vyjednávání",
          "Hromadné propouštění a jeho podmínky",
          "Vztahy s odborovými organizacemi",
          "BOZP — bezpečnost a ochrana zdraví při práci",
        ],
      },
    ],
    faqs: [
      {
        question: "Mohu napadnout výpověď z práce?",
        answer:
          "Ano, neplatnost výpovědi lze napadnout žalobou u soudu do 2 měsíců ode dne, kdy měl pracovní poměr skončit. Je důležité jednat rychle.",
      },
      {
        question: "Na jaké odstupné mám nárok?",
        answer:
          "Při výpovědi z organizačních důvodů náleží odstupné 1–3 průměrné měsíční mzdy podle délky pracovního poměru. Při pracovním úrazu minimálně 12 průměrných mezd.",
      },
      {
        question: "Co dělat při pracovním úrazu?",
        answer:
          "Nahlaste úraz zaměstnavateli, nechte si poskytnout lékařské ošetření a vše dokumentujte. Máte nárok na bolestné, ztrátu na výdělku a další odškodnění.",
      },
      {
        question: "Může mě zaměstnavatel sledovat na pracovišti?",
        answer:
          "Zaměstnavatel může monitorovat pracoviště za podmínek stanovených zákoníkem práce. Musí o tom zaměstnance informovat a nesmí zasahovat do soukromí nad nezbytnou míru.",
      },
    ],
    keywords: [
      "pracovní právo Brno",
      "výpověď advokát",
      "pracovní smlouva",
      "pracovní úraz odškodnění",
      "odstupné",
      "diskriminace v práci",
      "advokát zaměstnanec",
    ],
  },
  {
    slug: "online-konzultace",
    title: "On-line konzultace",
    shortTitle: "Online",
    icon: Monitor,
    heroDescription:
      "Právní poradenství odkudkoli — videokonference, telefonické konzultace a e-mailová komunikace. Stejná kvalita služeb bez nutnosti osobní návštěvy.",
    sections: [
      {
        heading: "Jak online konzultace probíhá",
        items: [
          "Videokonference přes Google Meet, Zoom nebo Microsoft Teams",
          "Telefonická konzultace v domluveném termínu",
          "E-mailová komunikace pro jednodušší dotazy",
          "Sdílení dokumentů přes zabezpečený kanál",
        ],
      },
      {
        heading: "Kdy využít online konzultaci",
        items: [
          "Nemůžete se osobně dostavit do kanceláře",
          "Bydlíte mimo Brno nebo v zahraničí",
          "Potřebujete rychlou právní radu",
          "Úvodní konzultace před osobní schůzkou",
          "Průběžné konzultace v rámci probíhajícího případu",
        ],
      },
      {
        heading: "Výhody online poradenství",
        items: [
          "Úspora času — bez dojíždění do kanceláře",
          "Flexibilní termíny včetně večerních hodin",
          "Možnost konzultace z pohodlí domova",
          "Stejná kvalita a důvěrnost jako osobní schůzka",
        ],
      },
      {
        heading: "Technické požadavky",
        items: [
          "Stabilní internetové připojení",
          "Počítač, tablet nebo smartphone s kamerou a mikrofonem",
          "Klidné prostředí pro nerušenou konzultaci",
          "Dokumenty v elektronické podobě (scan, foto)",
        ],
      },
    ],
    faqs: [
      {
        question: "Je online konzultace právně závazná?",
        answer:
          "Online konzultace má stejnou právní váhu jako osobní. Advokát je vázán stejnými povinnostmi mlčenlivosti a odborné péče.",
      },
      {
        question: "Jak zabezpečíte důvěrnost online komunikace?",
        answer:
          "Používáme šifrované komunikační platformy. Dokumenty zasíláme přes zabezpečené kanály. Advokátní mlčenlivost platí bez ohledu na formu komunikace.",
      },
      {
        question: "Kolik stojí online konzultace?",
        answer:
          "Cena online konzultace je stejná jako osobní schůzky — 2 000 Kč/hod, případně v rámci paušálního balíčku. Za počáteční 15minutovou orientační konzultaci neúčtujeme.",
      },
      {
        question: "Mohu online konzultaci využít i pro soudní řízení?",
        answer:
          "Online konzultace slouží pro poradenství, přípravu strategie a komunikaci. Zastoupení před soudem vyžaduje osobní účast advokáta, kterou zajistíme.",
      },
    ],
    keywords: [
      "online právní poradenství",
      "advokát online",
      "právní konzultace video",
      "advokát na dálku",
      "online advokát Brno",
      "právní poradenství z domova",
    ],
  },
  {
    slug: "dalsi-sluzby",
    title: "Další právní služby",
    shortTitle: "Ostatní",
    icon: Scale,
    heroDescription:
      "Správní právo, zastoupení před soudy, právní rozbory a specializované poradenství v dalších oblastech práva dle individuálních potřeb klienta.",
    sections: [
      {
        heading: "Správní právo",
        items: [
          "Zastoupení ve správním řízení",
          "Správní žaloby a kasační stížnosti",
          "Stavební řízení a územní plánování",
          "Přestupkové řízení",
        ],
      },
      {
        heading: "Dědické právo",
        items: [
          "Sepisování závětí a dědických smluv",
          "Zastoupení v dědickém řízení",
          "Vydědění a jeho napadení",
          "Odmítnutí dědictví a vzdání se dědického podílu",
        ],
      },
      {
        heading: "Zastoupení před soudy",
        items: [
          "Civilní soudní řízení ve všech instancích",
          "Odvolací a dovolací řízení",
          "Ústavní stížnosti",
          "Řízení před Evropským soudem pro lidská práva",
        ],
      },
      {
        heading: "Právní rozbory a stanoviska",
        items: [
          "Komplexní právní analýzy a posudky",
          "Stanoviska pro rozhodování orgánů společností",
          "Regulatory compliance a právní audit",
          "Druhý právní názor (second opinion)",
        ],
      },
    ],
    faqs: [
      {
        question: "Zastupujete i před správními orgány?",
        answer:
          "Ano, zastupuji klienty ve správním řízení, přestupkovém řízení i před správními soudy ve všech oblastech správního práva.",
      },
      {
        question: "Mohu se bránit proti rozhodnutí úřadu?",
        answer:
          "Ano, proti rozhodnutí správního orgánu se lze odvolat, podat rozklad nebo správní žalobu. Lhůty jsou krátké (15–30 dní), proto je důležité jednat rychle.",
      },
      {
        question: "Připravujete závěti?",
        answer:
          "Ano, sepisuji závěti, listiny o vydědění a dědické smlouvy. Zajistím, aby dokument splňoval všechny zákonné náležitosti a odpovídal vaší vůli.",
      },
      {
        question: "Co je to second opinion?",
        answer:
          "Druhý právní názor je nezávislé posouzení vašeho případu jiným advokátem. Pomáhá ověřit správnost zvoleného postupu nebo objevit nové možnosti řešení.",
      },
    ],
    keywords: [
      "správní právo Brno",
      "dědické právo advokát",
      "závěť sepsání",
      "správní žaloba",
      "zastoupení před soudem",
      "právní rozbor",
      "second opinion advokát",
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}
