'use client';

import FAQ from '@/components/core/Faq';
import FooterContact from '@/components/core/FooterContact';
import RecomendationsCarousel from '@/components/core/RecomendationsCarousel';
import SkillAccordion from '@/components/core/SkillAccordion';

const Contact = () => {
  return (
    <main className="flex flex-col">
      <section className="flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 shadow-inner overflow-hidden">
        <RecomendationsCarousel />

        <SkillAccordion />

        <FAQ />

        <FooterContact />
      </section>
    </main>
  );
};

export default Contact;
