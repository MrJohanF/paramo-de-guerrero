import React from 'react';

const PlantLoadingAnimation = () => (
  <div className="flex flex-col items-center justify-center">
    <svg width="100" height="100" viewBox="0 0 100 100" className="w-24 h-24">
      <line x1="50" y1="100" x2="50" y2="50" className="stem" />
      <path d="M50 50 Q60 40 70 50" className="leaf leaf-right-1" />
      <path d="M50 50 Q40 40 30 50" className="leaf leaf-left-1" />
      <path d="M50 60 Q65 50 80 60" className="leaf leaf-right-2" />
      <path d="M50 60 Q35 50 20 60" className="leaf leaf-left-2" />
      <path d="M50 70 Q70 60 90 70" className="leaf leaf-right-3" />
      <path d="M50 70 Q30 60 10 70" className="leaf leaf-left-3" />
    </svg>
    <style jsx>{`
      .stem {
        stroke: #4CAF50;
        stroke-width: 2;
        stroke-linecap: round;
        animation: growStem 1.5s ease-out infinite;
      }
      .leaf {
        stroke: #4CAF50;
        stroke-width: 2;
        stroke-linecap: round;
        fill: none;
        opacity: 0;
      }
      .leaf-right-1 { animation: unfoldLeaf 1.5s ease-out infinite 0.2s; }
      .leaf-left-1 { animation: unfoldLeaf 1.5s ease-out infinite 0.3s; }
      .leaf-right-2 { animation: unfoldLeaf 1.5s ease-out infinite 0.4s; }
      .leaf-left-2 { animation: unfoldLeaf 1.5s ease-out infinite 0.5s; }
      .leaf-right-3 { animation: unfoldLeaf 1.5s ease-out infinite 0.6s; }
      .leaf-left-3 { animation: unfoldLeaf 1.5s ease-out infinite 0.7s; }
      @keyframes growStem {
        0% { transform: scaleY(0); }
        30%, 100% { transform: scaleY(1); }
      }
      @keyframes unfoldLeaf {
        0%, 30% { opacity: 0; transform: scale(0); }
        50%, 100% { opacity: 1; transform: scale(1); }
      }
    `}</style>
  </div>
);

export default PlantLoadingAnimation;