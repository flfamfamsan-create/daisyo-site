import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Works from "@/components/Works";
import Recruit from "@/components/Recruit";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import RevealSection from "@/components/RevealSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-16 md:pb-0">
        <Hero />
        <RevealSection><Services /></RevealSection>
        <RevealSection delay={50}><Features /></RevealSection>
        <RevealSection><Works /></RevealSection>
        <RevealSection delay={50}><Recruit /></RevealSection>
        <RevealSection><About /></RevealSection>
        <Faq />
        <RevealSection><Contact /></RevealSection>
        <Footer />
      </main>
      <BottomNav />
    </>
  );
}
