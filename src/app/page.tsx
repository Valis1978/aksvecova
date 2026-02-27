import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { Contact } from "@/components/sections/Contact";
import DrawSVGDivider from "@/components/ui/DrawSVGDivider";

export default function Home() {
  return (
    <main>
      <Hero />
      <DrawSVGDivider className="my-1" />
      <Services />
      <DrawSVGDivider className="my-1" />
      <About />
      <DrawSVGDivider className="my-1" />
      <Process />
      <DrawSVGDivider className="my-1" />
      <Pricing />
      <DrawSVGDivider className="my-1" />
      <Contact />
    </main>
  );
}
