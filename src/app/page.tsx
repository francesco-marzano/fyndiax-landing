'use client';

import { SmoothScroll, ScrollProgress } from './components/animations';
import { Navbar } from './components/sections/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { MissionStatementSection } from './components/sections/MissionStatementSection';
import { WhoWeAreSection } from './components/sections/WhoWeAreSection';
import { WhyNowSection } from './components/sections/WhyNowSection';
import { ModelSection } from './components/sections/ModelSection';
import { BuildersSection } from './components/sections/BuildersSection';
import { VenturesSection } from './components/sections/VenturesSection';
import { PartnersSection } from './components/sections/PartnersSection';
import { TeamSection } from './components/sections/TeamSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar />
      
      <main>
        <HeroSection />
        
        <MissionStatementSection />
        
        {/* Divider gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-border-medium to-transparent" />
        
        <WhoWeAreSection />
        
        <WhyNowSection />
        
        {/* Divider gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-border-medium to-transparent" />
        
        <ModelSection />
        
        <BuildersSection />
        
        {/* Divider gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-border-medium to-transparent" />
        
        <VenturesSection />
        
        <PartnersSection />
        
        {/* Divider gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-border-medium to-transparent" />
        
        <TeamSection />
        
        <ContactSection />
      </main>
      
      <Footer />
    </SmoothScroll>
  );
}
