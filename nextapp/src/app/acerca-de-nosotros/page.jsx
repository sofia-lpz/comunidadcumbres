import AboutText from "@/components/about/AboutText";
import AreasGrid from "@/components/about/AreasGrid";
import Transparency from "@/components/about/Transparency";

export default function AboutPage() {
  return (
    <main className="px-6 py-12 space-y-16">
      <AboutText />
      <AreasGrid />
      <Transparency />
    </main>
  );
}
