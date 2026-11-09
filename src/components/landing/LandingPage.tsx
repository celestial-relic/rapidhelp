import React from 'react';
import { HeroSection } from './HeroSection';
import { CategoryGrid } from './CategoryGrid';
import { HowItWorks } from './HowItWorks';
import { WhyChooseUs } from './WhyChooseUs';
import { ProCtaSection } from './ProCtaSection';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <CategoryGrid />
      <HowItWorks />
      <WhyChooseUs />
      <ProCtaSection />
    </div>
  );
};
