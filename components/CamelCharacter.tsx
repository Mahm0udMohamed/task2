import React from 'react';

interface CamelCharacterProps {
  className?: string;
  isHappy?: boolean;
}

const CamelCharacter: React.FC<CamelCharacterProps> = ({ className, isHappy = false }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <style>
            {`
            .happy-eye { display: ${isHappy ? 'block' : 'none'}; }
            .normal-eye { display: ${isHappy ? 'none' : 'block'}; }
            `}
        </style>
      </defs>
      
      <g transform="translate(100, 110) scale(0.95)">
        {/* Shadow */}
        <ellipse cx="0" cy="70" rx="75" ry="15" fill="rgba(0,0,0,0.1)" />

        {/* Legs */}
        <rect x="-60" y="20" width="22" height="55" rx="11" fill="#F3D1A3" />
        <rect x="-25" y="20" width="22" height="55" rx="11" fill="#F3D1A3" />
        <rect x="10" y="20" width="22" height="55" rx="11" fill="#F3D1A3" />
        <rect x="45" y="20" width="22" height="55" rx="11" fill="#F3D1A3" />

        {/* Body */}
        <path d="M -75,30 C -85,-20 -10,-40 30,-40 C 70,-40 95,-20 85,30 Z" fill="#F9E4C5" stroke="#D4A373" strokeWidth="4" />
        
        {/* Hump */}
        <path d="M -15,-40 C -5,-80 25,-80 35,-40 Z" fill="#F3D1A3" stroke="#D4A373" strokeWidth="4" />
        
        {/* Neck and Head */}
        <path d="M 60,10 C 100,-30 110,-70 90,-90 C 70,-110 50,-100 60,-70 L 80,-40 C 70,-20 60,-10 60,10 Z" fill="#F9E4C5" stroke="#D4A373" strokeWidth="4" />
        
        {/* Eye - Normal */}
        <g className="normal-eye">
          <circle cx="85" cy="-80" r="7" fill="white" />
          <circle cx="87" cy="-82" r="4" fill="black" />
        </g>

        {/* Eye - Happy */}
        <g className="happy-eye">
            <path d="M 80 -82 Q 85 -75 90 -82" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
        
        {/* Ear */}
        <path d="M 65 -95 C 60 -105 70 -105 65 -95 L 70 -85 Z" fill="#F3D1A3" stroke="#D4A373" strokeWidth="3" />
        
        {/* Sadu Blanket */}
        <path d="M -30,-42 L 50, -42 L 55, -15 L -35, -15 Z" fill="#f56565" />
        <rect x="-33" y="-30" width="86" height="5" fill="#4fd1c5" />
        <rect x="-33" y="-22" width="86" height="5" fill="#f6e05e" />

        {/* Tail */}
        <path d="M -75,10 C -90,0 -90,-10 -80,-20" stroke="#D4A373" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="-80" cy="-25" r="5" fill="#D4A373" />
      </g>
    </svg>
  );
};

export default CamelCharacter;