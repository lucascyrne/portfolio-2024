import React, { useEffect, useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';

const quotes = [
  {
    name: 'Ailson da Cruz',
    role: 'Software Engineer',
    company: 'iFood',
    text: '"Lucas is a professional with an innovative vision, always combining different ideas in his work and seeking challenges to stay up-to-date. He places great importance on quality, which is evident in his deliveries. Moreover, he is extremely dedicated and has a long-term vision. He is the kind of professional with great potential and technical knowledge who can add value to teams of any size."',
  },
  {
    name: 'Lucas Zacarias de S Duarte',
    role: 'Software Engineer',
    company: 'Myte Design',
    text: '"Lucas is a skilled full-stack developer and a friendly and competent team member. Lucas has always shown interest in contributing to other areas of the company and is good at adapting to new environments and activities."',
    link: 'https://www.linkedin.com/in/lucaszsd/',
  },
  {
    name: 'Saulo Henrique',
    role: 'Data Engineer',
    company: 'Lee, Brock, Camargo Advogados',
    text: '"Lucas is an excellent professional with outstanding technical skills. He knows various programming languages and was always willing to learn more. He delivered far beyond what was expected. A complete full-stack professional."',
    link: 'https://www.linkedin.com/in/saulo-henrique-a428861aa/',
  },
  {
    name: 'Edmilson Rodrigues',
    role: 'COO',
    company: 'Lovepay',
    text: '"I had the pleasure of working with Lucas Cyrne, and he is a dedicated and competent professional. Any tech team would be lucky to have him."',
    link: 'https://www.linkedin.com/in/edmilsonrodrigues/',
  },
  {
    name: 'Vitória Souza',
    role: 'Illustrator',
    company: 'Freelancer',
    text: '"Lucas is an extremely creative, communicative, and organized person and professional! Always contributing ideas, feedback, and opinions that added value to the project! It was a pleasure to work on the same project with him!"',
    link: 'https://www.linkedin.com/in/vitoriasouza-ilustradora/',
  },
  {
    name: 'Smith Ramone',
    role: '3D Animator',
    company: 'Senac',
    text: '"Lucas was great to work with and fun to be around. He has a really interesting background which definitely makes his writing even more unique. It would be a pleasure to work with him again."',
    link: 'https://www.linkedin.com/in/smithramone/',
  },
  {
    name: 'Ritchie Cantuária',
    role: 'Freelance Artist/Illustrator & Designer',
    company: 'Home Estúdio',
    text: '"I had the pleasure and opportunity to be part of the same creative team as Lucas, along with other highly skilled professionals. With impeccable and creative writing, Lucas is a very competent, captivating, imaginative, and detail-oriented person. I highly recommend him for any future positions or roles he may pursue."',
    link: 'https://www.linkedin.com/in/ritchiecantuaria/',
  },
  {
    name: 'Diogo Alves de Oliveira',
    role: 'Back End Developer | Front End Developer',
    company: 'NTT DATA Business Solutions Brazil',
    text: '"Lucas is an amazing employee, always bringing fantastic ideas and showing great enthusiasm for the project, giving it life. He works very well in a team and communicates easily with everyone in the company. I recommend him without hesitation, as I am confident in the excellent professional he is!"',
    link: 'https://www.linkedin.com/in/diogo-alves-de-oliveira-217a75109/',
  },
  {
    name: 'Kevin Talarico',
    role: '"Lead Academic Ambassador | Creative Technologist | Gamification | Innovation | Producer',
    company: 'IBM',
    text: '"Working with Lucas in the creation and development of the Toyoverse project was absolutely thrilling. Always enthusiastic, he would deliver multiple solutions for the same problem while being very mindful of the product goals and committed to delivering the most effective results. He is one of the most creative minds I have met and, perhaps most importantly, one of the most restless ones, which makes Lucas someone who is always striving to become a better professional and make a positive impact."',
    link: 'https://www.linkedin.com/in/kevin-talarico/',
  },
  {
    name: 'Jhone Marra',
    role: 'Game Programmer',
    company: 'Orbit Studio',
    text: '"Lucas is an excellent professional! Always bringing new and great ideas to the team, as well as developing strong relationships with the group. He has a deep understanding of his work and delivers impeccable results!"',
    link: 'https://www.linkedin.com/in/jhonemarra/',
  },
];

const RecomendationsCarousel: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false); // Inicia fade-out
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setFadeIn(true); // Inicia fade-in
      }, 1600); // Tempo do fade-out (1.6s)
    }, 8000); // Tempo total para cada frase

    return () => clearInterval(interval);
  }, []);

  const { name, role, company, text, link } = quotes[currentQuoteIndex];

  return (
    <section className="flex relative items-center justify-center w-full h-1/2 z-10">
      <div
        className="absolute inset-0 z-0 bg-nebula-vignette bg-cover bg-center opacity-60 mix-blend-overlay"
        style={{ backgroundImage: "url('/assets/images/nebulosa.webp')" }}
      />

      <div
        className={`relative flex flex-col items-center justify-center gap-2 p-8 w-full md:w-1/2 md:p-0 h-full z-40 ${
          fadeIn ? 'animate-fade-in' : 'animate-fade-out'
        }`}
      >
        <p className="font-inria text-center text-slate-200 text-lg">{text}</p>
        <h3 className="font-inria text-center text-primary-light text-base">
          {name}
        </h3>
        <h4 className="font-inria text-center text-slate-200 text-sm">
          {role} @ <i className="text-primary-light">{company}</i>
        </h4>
        <h5>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-light cursor-pointer"
          >
            <FaLinkedin
              size={28}
              className="hover:scale-125 transition-transform duration-300"
            />
          </a>
        </h5>
      </div>
    </section>
  );
};

export default RecomendationsCarousel;
