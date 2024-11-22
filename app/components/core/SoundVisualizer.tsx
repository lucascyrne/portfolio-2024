'use client'

import { useMusic } from '@/app/context/music-context';
import { useEffect, useRef } from 'react';

const SoundVisualizer = () => {
  const { analyser, isPlaying, audioReady } = useMusic();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!analyser || !canvasRef.current || !isPlaying) {
      console.warn("SoundVisualizer: Requisitos não atendidos para iniciar visualização.");
      return;
    }
  
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
      canvas.height = window.innerHeight / 3;
    };
  
    const draw = () => {
      analyser.getByteFrequencyData(dataArray);
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      const frequencyLimit = Math.floor(bufferLength * 0.4);
      const totalBars = Math.max(canvas.width / 10, frequencyLimit);
      const barWidth = canvas.width / totalBars;
  
      for (let i = 0; i < totalBars; i++) {
        const dataIndex = Math.floor((i / totalBars) * frequencyLimit);
        const nextIndex = Math.min(dataIndex + 1, frequencyLimit - 1);
        const factor = (i / totalBars) * frequencyLimit - dataIndex;
  
        const interpolatedHeight =
          dataArray[dataIndex] * (1 - factor) +
          dataArray[nextIndex] * factor;
  
        const barHeight = interpolatedHeight / 2;
        const hue = 0 + (i / totalBars) * 20;
        ctx.fillStyle = `hsl(${hue}, 80%, 55%, .5)`;
  
        ctx.fillRect(
          i * barWidth,
          canvas.height - barHeight,
          barWidth - 2,
          barHeight
        );
      }
  
      if (isPlaying) {
        requestAnimationFrame(draw);
      }
    };
  
    resizeCanvas();
    draw();
  
    window.addEventListener("resize", resizeCanvas);
  
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [analyser, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-gray-300 via-white to-white"
    />
  );
};

  

export default SoundVisualizer;
