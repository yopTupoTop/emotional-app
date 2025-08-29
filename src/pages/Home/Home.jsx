import React from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import InfoSection from "../../components/InfoSection/InfoSection";

function Home() {
  return (
    <div className="home-page">
      <HeroSection />
      <InfoSection />
    </div>
  );
}

export default Home;
