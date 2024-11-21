'use client'

import { useMusic } from '@/app/context/music-context';
import { useEffect, useRef } from 'react';

const SoundVisualizer = () => {
  const { analyser, isPlaying } = useMusic();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!analyser) {
      console.warn("SoundVisualizer: AnalyserNode não está disponível.");
      return;
    }

    if (!canvasRef.current) {
      console.warn("SoundVisualizer: Canvas não está disponível.");
      return;
    }

    console.log("SoundVisualizer: Inicializando visualizador de áudio...");

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("SoundVisualizer: Falha ao obter o contexto 2D do canvas.");
      return;
    }

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight / 4; // Metade inferior da página
    };

    const draw = () => {
      if (!isPlaying) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cortar frequências altas (mantendo 75% das frequências mais baixas)
      const frequencyLimit = Math.floor(bufferLength * 0.4);

      const totalBars = Math.max(canvas.width / 10, frequencyLimit);
      const barWidth = canvas.width / totalBars;

      for (let i = 0; i < totalBars; i++) {
        // Interpolação para preencher barras adicionais
        const dataIndex = Math.floor((i / totalBars) * frequencyLimit);
        const nextIndex = Math.min(dataIndex + 1, frequencyLimit - 1);
        const factor = (i / totalBars) * frequencyLimit - dataIndex;

        // Altura interpolada entre o ponto atual e o próximo
        const interpolatedHeight = 
          dataArray[dataIndex] * (1 - factor) + 
          dataArray[nextIndex] * factor;

        const barHeight = interpolatedHeight / 2;

        // Gradiente entre vermelho e laranja
        const hue = 0 + (i / totalBars) * 20; // Variação de tons de vermelho e laranja
        ctx.fillStyle = `hsl(${hue}, 80%, 55%, .5)`;

        // Desenhar a barra
        ctx.fillRect(
          i * barWidth, // X
          canvas.height - barHeight, // Y
          barWidth - 2, // Largura com espaçamento
          barHeight // Altura
        );
      }

      requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      console.log("SoundVisualizer: Limpando eventos e contexto...");
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [analyser, isPlaying]);

  

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-10 bg-gradient-to-b from-gray-300 via-white to-white"
    />
  );
};

  

export default SoundVisualizer;
