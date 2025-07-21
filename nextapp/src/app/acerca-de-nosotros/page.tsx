import AboutText from "@/components/about/AboutText";
import AreasGrid from "@/components/about/AreasGrid";
import Transparency from "@/components/about/Transparency";

const AboutPage = () => {
  return (
    <main className="px-6 py-12 space-y-16">
      <AboutText />
      <AreasGrid />
      <Transparency />
    </main>
  );
};

export default AboutPage;
