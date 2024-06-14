import React from 'react';
import HeroSection from '@/components/landingPage/pages/heroSection';
import PartnerSection from '@/components/landingPage/pages/partnerSection';
import BenefitSection from '@/components/landingPage/pages/benefitSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <PartnerSection />
      <BenefitSection />
    </>
  );
}
