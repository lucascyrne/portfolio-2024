'use client';

import Lucas from '@/public/assets/images/lucas.png';
import Strength from '@/public/assets/icons/strength.png';
import Wisdom from '@/public/assets/icons/wisdom.png';
import Constitution from '@/public/assets/icons/constitution.png';
import Dexterity from '@/public/assets/icons/agility.svg';
import Charisma from '@/public/assets/icons/charisma.svg';
import Inteligence from '@/public/assets/icons/inteligence.png';
import Image from 'next/image';
import SkillItem from './SkillItem';
import { motion } from 'framer-motion';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { PiCertificateFill } from 'react-icons/pi';
import { GiStrong } from 'react-icons/gi';
import { GiRun } from 'react-icons/gi';
import { FaHeart } from 'react-icons/fa';
import { FaHatWizard } from 'react-icons/fa';
import { FaBrain } from 'react-icons/fa6';
import { FaSmile } from 'react-icons/fa';
import Link from 'next/link';

const AboutMe = () => {
  const skills = [
    {
      title: 'Frontend Mastery',
      desc: 'Ability to create modern and responsive interfaces using Next.js and Tailwind CSS.',
      image: '/assets/icons/frontend-icon.png',
    },
    {
      title: 'Backend Master',
      desc: 'Expertise in developing robust and scalable APIs with Node.js and ExpressJS.',
      image: '/assets/icons/backend-icon.png',
    },
    {
      title: 'Infrastructure Architect',
      desc: 'Advanced knowledge in infrastructure and deployment using GCP and Docker.',
      image: '/assets/icons/infrastructure-icon.png',
    },
    {
      title: 'Database Migrator',
      desc: 'Proficiency in configuring and maintaining PostgreSQL databases.',
      image: '/assets/icons/database-icon.png',
    },
    {
      title: 'Software Architecture Visionary',
      desc: 'Creates well-defined and scalable software architectures.',
      image: '/assets/icons/software-architecture-icon.png',
    },
    {
      title: 'Configuration Wizard',
      desc: 'Ability to tweak and optimize development and production environments.',
      image: '/assets/icons/configuration-icon.png',
    },
    {
      title: 'Automation Genius',
      desc: 'Skill in automating development and deployment processes.',
      image: '/assets/icons/automation-icon.png',
    },
  ];

  const recomendations = [
    {
      name: 'Ailson da Cruz',
      role: 'Software Engineer @ iFood',
      value:
        'Lucas é um profissional com uma visão inovadora, sempre unindo diferentes ideias em seu trabalho e buscando desafios para se manter atualizado. Ele dá grande importância à qualidade, o que é evidente em suas entregas. Além disso, é extremamente dedicado e tem uma visão de longo prazo. É o tipo de profissional que tem um grande potencial e conhecimento técnico que pode agregar valor a equipes de qualquer tamanho.',
    },
    {
      name: 'Lucas Zacarias de S Duarte',
      role: 'Software Engineer',
      value:
        'Lucas is a skilled full-stack developer and a friendly and competent team member. Lucas has always shown interest in contributing to other areas of the company and is good at adapting to new environments and activities.',
    },
    {
      name: 'Saulo Henrique',
      role: 'Software Engineer',
      value:
        'Lucas é um excelente profissional, com habilidades técnicas ímpares. Conhece várias linguagens e estava sempre disposto a aprender mais. Entregava muito além do que se pedia. um profissional fullstack completo',
    },
    {
      name: 'Edmilson Rodrigues',
      value:
        'Tive o prazer de trabalhar com o Lucas Cyrne e ele é um profissional dedicado e competente. Qualquer equipe de tecnologia teria sorte em tê-lo.',
    },
    {
      name: 'Kevin Talarico',
      value:
        'Working with Lucas in the creation and development of Toyoverse project was absolutely thrilling. Always enthusiastic, he would deliver multiple solutions for the same problem, while being very comprehensive with the product goals, and committing to deliver what was really more effective. He&apos;s one of the most creative minds I&apos;ve met, and, perhaps mostly importantly, one of the most unsettled ones as well, which makes Lucas someone who is always on the move to become a better professional and change things for the best.',
    },
  ];

  const extendedrecomendations = [
    ...recomendations,
    ...recomendations,
    ...recomendations,
  ];

  return (
    <section className='flex flex-col w-full h-auto shadow-md bg-white overflow-hidden'>
      <div className='flex flex-col md:flex-row flex-grow flex-wrap md:justify-between'>
        <div className='flex flex-col z-20 relative p-12 md:w-1/2 font-inria hover:bg-primary hover:text-white'>
          <div className='flex flex-col items-center justify-center gap-8 text-xl'>
            <p className='relative text-center text-shadow'>
              <span className='absolute -top-2 left-0 text-sm font-semibold'>
                Class
              </span>
              Fullstack Developer
            </p>
            <p className='relative text-center text-shadow'>
              <span className='absolute -top-[10px] left-12 md:left-[26px] lg:left-[1px] text-sm font-semibold'>
                Level
              </span>
              5yrs of professional development
            </p>

            <div className='flex flex-col items-center justify-center'>
              <div>
                <ul className='flex flex-grow flex-wrap items-center justify-center mt-4 w-72 lg:mt-0 lg:w-full gap-6 gap-y-4'>
                  <li
                    className='flex items-center gap-4 text-lg'
                    data-tooltip-id='strength-tooltip'
                  >
                    <GiStrong />
                    18
                  </li>
                  <li
                    className='flex items-center gap-4 text-lg'
                    data-tooltip-id='dexterity-tooltip'
                  >
                    <GiRun />
                    20
                  </li>
                  <li
                    className='flex items-center gap-4 text-lg'
                    data-tooltip-id='constitution-tooltip'
                  >
                    <FaHeart />
                    17
                  </li>
                  <li
                    className='flex items-center gap-4 text-lg'
                    data-tooltip-id='wisdom-tooltip'
                  >
                    <FaHatWizard />
                    24
                  </li>
                  <li
                    className='flex items-center gap-4 text-lg'
                    data-tooltip-id='intelligence-tooltip'
                  >
                    <FaBrain />
                    21
                  </li>
                  <li
                    className='flex items-center gap-4 text-lg'
                    data-tooltip-id='charisma-tooltip'
                  >
                    <FaSmile />
                    20
                  </li>
                </ul>
              </div>

              <div>
                <ul className='flex w-full gap-x-4 mt-12 lg:mt-8'>
                  <li className='flex items-center gap-2 text-[14px]'>
                    <FaGithub />
                    <Link
                      href={'https://github.com/lucascyrne'}
                      target='_blank'
                    >
                      Github
                    </Link>
                  </li>
                  <li className='flex items-center gap-2 text-[14px]'>
                    <FaLinkedin />
                    <Link
                      href={
                        'https://www.linkedin.com/in/lucas-cyrne-8b8314153/'
                      }
                      target='_blank'
                    >
                      Linkedin
                    </Link>
                  </li>
                  <li className='flex items-center gap-2 text-[14px]'>
                    <PiCertificateFill />
                    <Link href={'https://read.cv/lucascyrne'} target='_blank'>
                      Resume
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <ReactTooltip
              id='strength-tooltip'
              className='font-inter'
              style={{
                fontSize: '12px',
              }}
              place='top'
            >
              <p>Strength to face complex development challenges.</p>
              <p>Ability to solve difficult problems with robust solutions.</p>
            </ReactTooltip>
            <ReactTooltip
              id='dexterity-tooltip'
              className='font-inter'
              style={{
                fontSize: '12px',
              }}
              place='top'
            >
              <p>Ability to write clean and efficient code.</p>
              <p>Agility to adapt to new technologies and frameworks.</p>
            </ReactTooltip>
            <ReactTooltip
              id='constitution-tooltip'
              className='font-inter'
              style={{
                fontSize: '12px',
              }}
              place='top'
            >
              <p>
                Resistance to dealing with long working hours and deadlines
                tight.
              </p>
              <p>Ability to maintain quality of work under pressure.</p>
            </ReactTooltip>
            <ReactTooltip
              id='wisdom-tooltip'
              className='font-inter'
              style={{
                fontSize: '12px',
              }}
              place='top'
            >
              <p>Wisdom to make smart architectural decisions.</p>
              <p>In-depth knowledge to guide the team towards right goals.</p>
            </ReactTooltip>
            <ReactTooltip
              id='intelligence-tooltip'
              className='font-inter'
              style={{
                fontSize: '12px',
              }}
              place='top'
            >
              <p>Intelligence to learn and apply new concepts quickly.</p>
              <p>
                Ability to solve complex problems with solutions innovative.
              </p>
            </ReactTooltip>
            <ReactTooltip
              id='charisma-tooltip'
              className='font-inter'
              style={{
                fontSize: '12px',
              }}
              place='top'
            >
              <p>
                Charisma to collaborate effectively with colleagues and clients.
              </p>
              <p>Ability to influence and inspire the team development.</p>
            </ReactTooltip>
          </div>
        </div>

        <div className='flex relative min-h-72 md:w-1/2 overflow-hidden'>
          <div className='flex absolute min-h-72'>
            <Image
              src={Lucas}
              alt={'An alt caption'}
              className='relative -left-[400px] lg:-left-[620px] -top-[240px] lg:-top-[450px] min-w-[275%]'
            />
          </div>
        </div>
      </div>

      <div className='flex p-12 hover:bg-primary transition-colors'>
        <ul className='flex flex-grow flex-wrap items-center justify-center gap-y-12 md:gap-x-8 w-full'>
          {skills.map((skill, index) => (
            <SkillItem
              key={index}
              title={skill.title}
              desc={skill.desc}
              image={skill.image}
            />
          ))}
        </ul>
      </div>

      <div className='p-12 w-full hover:bg-primary'>
        <motion.ul
          className='flex items-start justify-start w-full gap-24'
          animate={{
            x: ['-420%', '-40%'],
            transition: {
              x: {
                ease: 'linear',
                repeat: Infinity,
                duration: 52,
              },
            },
          }}
        >
          {extendedrecomendations.map((recomendation, index) => (
            <li
              key={index}
              className='group flex flex-col py-3 px-6 min-w-[400px] gap-3 bg-white hover:bg-primary hover:text-white rounded-lg border border-gray-900 shadow-md hover:shadow-xl transition-colors'
              style={{
                width: `${100 / recomendations.length}%`,
              }}
            >
              <h4 className='text-lg font-inria font-semibold'>
                {recomendation.name}
              </h4>
              <p className='-mt-3 text-sm font-bold text-gray-500 group-hover:text-white'>
                {recomendation.role}
              </p>
              <p className='text-[14px]'>{recomendation.value}</p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default AboutMe;
