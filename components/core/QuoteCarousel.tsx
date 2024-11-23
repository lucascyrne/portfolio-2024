import React, { useEffect, useState } from "react";

const quotes = [
  {
    texto:
      "As únicas pessoas que me interessam são as loucas, aquelas que são loucas por viver, loucas por falar, loucas por serem salvas; as que desejam tudo ao mesmo tempo. As que nunca bocejam ou dizem algo desinteressante, mas que queimam e brilham, brilham, brilham como luminosos fogos de artifícios cruzando o céu.",
    autor: "Jack Kerouac",
    obra: "On The Road",
  },
  {
    texto:
      "A história de todas as sociedades até agora existentes é a história das lutas de classes.",
    autor: "Karl Marx",
    obra: "Manifesto Comunista",
  },
  {
    texto:
      "Você deve viver no presente, lançar-se em cada onda, encontrar sua eternidade em cada momento.",
    autor: "Henry David Thoreau",
    obra: "Walden Lake",
  },
];

const QuoteCarousel: React.FC = () => {
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

  const { texto, autor, obra } = quotes[currentQuoteIndex];

  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 p-8 w-full md:w-1/2 md:p-0 h-full -top-[100px] z-40 opacity-90 ${
        fadeIn ? "animate-fade-in" : "animate-fade-out"
      }`}
    >
      <h1 className="font-inria text-center text-white text-shadow text-lg">
        {texto}
      </h1>
      <h4 className="font-inria text-center text-white text-shadow text-md">
        {autor} em <i className="text-primary">{obra}</i>
      </h4>
    </div>
  );
};

export default QuoteCarousel;
