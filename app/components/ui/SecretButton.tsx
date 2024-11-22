import { useMusic } from "@/app/context/music-context";
import { useState } from "react";
import { TfiWorld } from "react-icons/tfi";

interface SecretButtonProps {
  onClick: () => void;
}

const SecretButton: React.FC<SecretButtonProps> = ({ onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <button
      className={`relative group border border-primary rounded-full h-12 flex items-center
        bg-transparent overflow-hidden transition-all duration-500 ease-in-out
        ${isExpanded ? "pl-4 w-48" : "w-12"} bg-transparent shadow-lg
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={onClick}
    >
      {/* Ícone centralizado no estado colapsado */}
      <span
        className={`flex items-center justify-center transition-all duration-500 ease-in-out
          ${isExpanded ? "translate-x-0 mr-2" : "translate-x-[12px]"} text-primary
        `}
      >
        <TfiWorld className="text-lg" />
      </span>

      {/* Texto exibido ao expandir */}
      <span
        className={`flex items-center justify-center whitespace-nowrap font-medium
          transition-opacity duration-300 ease-in-out
          ${isExpanded ? "opacity-100" : "opacity-0"} text-primary
        `}
      >
        A bit about me
      </span>

      {/* Animação ao clicar */}
      <span
        className="absolute inset-0 bg-[#ffe7eb] opacity-30 scale-0 group-active:scale-100 rounded-full transition-transform duration-50 ease-in-out z-10"
      />
    </button>
  );
};

export default SecretButton;
