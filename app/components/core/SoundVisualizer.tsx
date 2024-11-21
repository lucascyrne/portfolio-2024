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
      canvas.height = window.innerHeight;
    };
  
    const draw = () => {
      if (!isPlaying) {
        // Limpar o visualizador quando o áudio está pausado
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
  
      analyser.getByteFrequencyData(dataArray);
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;
  
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
  
        ctx.fillStyle = `hsl(${(i / bufferLength) * 360}, 100%, 50%)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
  
        x += barWidth + 1;
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
