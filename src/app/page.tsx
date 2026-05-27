import TopNavBar from "@/components/TopNavBar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import SellerCTA from "@/components/SellerCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopNavBar />
      <main className="pt-[72px] flex-1 flex flex-col">
        <Hero />
        <Stats />
        <FeaturedProducts />
        <Categories />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials />
        <SellerCTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
