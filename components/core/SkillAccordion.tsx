import Image from 'next/image';
import { useState } from 'react';

const skills = [
  {
    title: 'Frontend Development',
    desc: 'Developing responsive and modern interfaces using frameworks like Next.js and React, along with styling libraries such as Tailwind CSS, ensuring usability, performance, and accessibility across various devices.',
    image: '/assets/images/front-end.webp',
  },
  {
    title: 'Backend Development',
    desc: 'Building scalable APIs and systems using technologies like .NET, NestJS, and Spring Boot, focusing on high performance, security, and robust architecture to meet diverse business needs.',
    image: '/assets/images/back-end.webp',
  },
  {
    title: 'Cloud Infrastructure',
    desc: 'Managing cloud deployments and infrastructure with tools like AWS, GCP, Docker, and Heroku, optimizing the performance, scalability, and reliability of distributed applications.',
    image: '/assets/images/cloud-infra.webp',
  },
  {
    title: 'Database Management',
    desc: 'Designing, optimizing, and maintaining relational and non-relational databases such as PostgreSQL, MongoDB, and SQL to address complex data scenarios and requirements.',
    image: '/assets/images/database.webp',
  },
  {
    title: 'Software Architecture',
    desc: 'Defining robust and flexible software architectures for applications in logistics, fintech, and gaming sectors, ensuring scalability and alignment with industry best practices.',
    image: '/assets/images/architecture.webp',
  },
  {
    title: 'CI/CD and Testing',
    desc: 'Automating integration and continuous delivery pipelines with GitHub Actions and other tools, as well as implementing efficient testing with Jest, Cypress, and frameworks that ensure code quality.',
    image: '/assets/images/tests.webp',
  },
  {
    title: 'Team Collaboration',
    desc: 'Promoting efficient collaboration in agile teams, leveraging Scrum and Agile methodologies to enhance productivity and communication while managing multiple tasks in an organized manner.',
    image: '/assets/images/design.webp',
  },
];

const SkillAccordion = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const [visibleIndex, setVisibleIndex] = useState<null | number>(null);

  return (
    <div className="flex w-full h-1/4 items-stretch justify-center overflow-hidden">
      {skills.map((skill, index) => {
        const isActive = activeIndex === index; // Determina se o elemento está expandido
        const isVisible = visibleIndex === index; // Determina se o conteúdo está visível

        return (
          <div
            key={index}
            className={`relative flex flex-col flex-1 h-full items-center justify-center transition-all duration-500
                ${isActive ? 'flex-[3]' : 'flex-1'}
                bg-black/50 cursor-pointer overflow-hidden`}
            onMouseEnter={() => {
              setActiveIndex(index); // Define o elemento como ativo
              setTimeout(() => setVisibleIndex(index), 500); // Aguarda a transição antes de exibir o conteúdo
            }}
            onMouseLeave={() => {
              setActiveIndex(null); // Inicia o colapso do elemento
              if (visibleIndex === index) setVisibleIndex(null); // Esconde o conteúdo após o colapso
            }}
          >
            {/* Imagem de fundo com overlay */}
            <div className="absolute top-0 left-0 w-full h-full">
              <Image
                src={skill.image}
                alt={skill.title}
                fill
                className={`object-cover transition-transform duration-500
                    ${isActive ? 'scale-100' : 'scale-150'}`}
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black/60 mix-blend-multiply" />
            </div>

            {/* Conteúdo com fade-in/fade-out */}
            <div
              className={`flex flex-col gap-2 relative z-10 text-center px-16 transition-opacity duration-500
                  ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              {/* Título */}
              <h3 className="font-inria text-slate-300 font-semibold text-xl">
                {skill.title}
              </h3>

              {/* Descrição */}
              <p className="text-slate-200 text-base">{skill.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillAccordion;
