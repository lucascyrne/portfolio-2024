import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full h-full bg-transparent text-slate-200 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo e descrição */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            HORIZONTE{' '}
            <span className="font-inria text-base md:text-lg font-light">
              studios™
            </span>
          </h1>
          <p className="mt-2 text-slate-400">
            This is a portfolio showcasing skills and projects, blending
            creativity and technology to deliver innovative solutions.
          </p>
        </div>

        {/* Ícones sociais */}
        <div className="flex space-x-4 mt-6 md:mt-0">
          <a
            href="https://github.com/lucascyrne"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-slate-800 hover:bg-sky-500 transition"
          >
            <FaGithub size={20} className="text-white" />
          </a>
          <a
            href="https://www.linkedin.com/in/lucas-cyrne-8b8314153/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-slate-800 hover:bg-sky-500 transition"
          >
            <FaLinkedin size={20} className="text-white" />
          </a>
          <a
            href="https://read.cv/lucascyrne"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-slate-800 hover:bg-sky-500 transition"
          >
            <FaFileAlt size={20} className="text-white" />
          </a>
        </div>
      </div>

      {/* Direitos autorais */}
      <div className="text-center text-slate-500 mt-8 text-sm">
        © HORIZONTE studios™. All rights reserved. 2024-present.
      </div>
    </footer>
  );
};

export default Footer;
