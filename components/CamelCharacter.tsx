
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
        <radialGradient id="camel-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: '#f8d085' }} />
          <stop offset="100%" style={{ stopColor: '#eab308' }} />
        </radialGradient>
        <style>
            {`
            .camel-body { transition: all 0.3s ease-in-out; }
            .happy-eye { display: ${isHappy ? 'block' : 'none'}; }
            .normal-eye { display: ${isHappy ? 'none' : 'block'}; }
            `}
        </style>
      </defs>
      
      <g transform="translate(100, 100) scale(0.9)">
        {/* Shadow */}
        <ellipse cx="0" cy="85" rx="70" ry="15" fill="rgba(0,0,0,0.15)" />

        {/* Legs */}
        <rect x="-55" y="30" width="20" height="60" rx="10" fill="#d69e2e" />
        <rect x="-25" y="30" width="20" height="60" rx="10" fill="#d69e2e" />
        <rect x="15" y="30" width="20" height="60" rx="10" fill="#d69e2e" />
        <rect x="45" y="30" width="20" height="60" rx="10" fill="#d69e2e" />
        
        {/* Body */}
        <path className="camel-body" d="M -70,40 C -80,-20 0,-30 20,-30 C 40,-30 80,-20 70,40 Z" fill="url(#camel-grad)" />
        
        {/* Hump */}
        <path d="M -20,-30 C -10,-70 10,-70 20,-30 Z" fill="url(#camel-grad)" />
        
        {/* Neck and Head */}
        <path d="M 50,20 C 90,-20 100,-60 80,-80 C 60,-100 40,-90 50,-60 L 70,-30 C 60,-10 50,0 50,20 Z" fill="url(#camel-grad)" />
        
        {/* Eye - Normal */}
        <g className="normal-eye">
          <circle cx="75" cy="-70" r="5" fill="black" />
          <circle cx="77" cy="-72" r="1.5" fill="white" />
        </g>

        {/* Eye - Happy */}
        <g className="happy-eye">
            <path d="M 70 -72 Q 75 -65 80 -72" stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
        
        {/* Ear */}
        <path d="M 55 -85 C 50 -95 60 -95 55 -85 L 60 -75 Z" fill="#d69e2e" />
        
        {/* Mouth */}
        <path d="M 85 -55 Q 80 -50 75 -55" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" />
        
        {/* Tail */}
        <path d="M -70,20 C -80,10 -80,0 -75,-10" stroke="#d69e2e" strokeWidth="8" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
};

export default CamelCharacter;
