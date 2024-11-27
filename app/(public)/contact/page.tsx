'use client';

import RecomendationsCarousel from '@/components/core/RecomendationsCarousel';
import SkillAccordion from '@/components/core/SkillAccordion';

const Contact = () => {
  return (
    <main className="flex w-full min-h-screen">
      {/* O section abaixo já cobre toda a área da tela, mas seus componentes internos não o obedecem */}
      <section className="flex flex-col w-full min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 shadow-inner overflow-hidden">
        <RecomendationsCarousel />

        <SkillAccordion />

        {/* <div className="flex flex-col z-20 relative p-12 md:w-1/2 font-inria">
          <ul className="flex items-center justify-around w-full h-full gap-x-4">
            <li className="flex flex-col items-center text-white group">
              <Link href={'https://github.com/lucascyrne'} target="_blank">
                <FaGithub
                  size={60}
                  className="group-hover:scale-125 transition-transform duration-300 ease-out"
                />
                <span className="font-inria opacity-0 transform -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  Github
                </span>
              </Link>
            </li>
            <li className="flex flex-col items-center text-white group">
              <Link
                href={'https://www.linkedin.com/in/lucas-cyrne-8b8314153/'}
                target="_blank"
              >
                <FaLinkedin
                  size={60}
                  className="group-hover:scale-125 transition-transform duration-300 ease-out"
                />
                <span className="font-inria opacity-0 transform -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  LinkedIn
                </span>
              </Link>
            </li>
            <li className="flex flex-col items-center text-white group">
              <Link href={'https://read.cv/lucascyrne'} target="_blank">
                <PiCertificateFill
                  size={60}
                  className="group-hover:scale-125 transition-transform duration-300 ease-out"
                />
                <span className="relative font-inria opacity-0 transform -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  Resume
                </span>
              </Link>
            </li>
          </ul>
        </div> */}
      </section>
    </main>
  );
};

export default Contact;
