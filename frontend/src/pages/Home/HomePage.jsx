import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { HeroSection } from "./components/HeroSection";
import { HomeCollection } from "./components/HomeCollection";
import { Features } from "./components/Features";
import { SocialLinks } from "./components/SocialLinks";
import { TopEdge } from "../../components/TopEdge";

const HomePage = () => {
  return (
    <>
      {/* 1.1.0	Hệ thống đang ở màn hình chính (Trang chủ). */}
      {/* 1.1.1	Hệ thống khởi tạo các thành phần cần thiết cho giao diện trang chủ như navbar,… */}
      <TopEdge />
      <Navbar />
      <HeroSection />
      <HomeCollection />
      <Features />
      <SocialLinks />
      <Footer />
    </>
  );
};

export default HomePage;
