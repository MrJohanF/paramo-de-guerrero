import React from 'react';

const PlantLoadingAnimation = () => (
  <div className="flex flex-col items-center justify-center">
    <svg width="100" height="100" viewBox="0 0 100 100" className="w-24 h-24">
      <circle cx="50" cy="90" r="10" className="soil" />
      <path d="M50 90 Q50 90 50 90" className="stem" />
      <path d="M50 90 Q50 90 50 90" className="leaf left-leaf" />
      <path d="M50 90 Q50 90 50 90" className="leaf right-leaf" />
      <path d="M50 90 Q50 90 50 90" className="flower-center" />
      <path d="M50 90 Q50 90 50 90" className="petal left-petal" />
      <path d="M50 90 Q50 90 50 90" className="petal right-petal" />
      <path d="M50 90 Q50 90 50 90" className="petal top-petal" />
    </svg>
    <style jsx>{`
      .soil {
        fill: #795548;
      }
      .stem {
        fill: none;
        stroke: #4CAF50;
        stroke-width: 2;
        stroke-linecap: round;
        animation: growStem 1.2s ease-out infinite;
      }
      .leaf {
        fill: #8BC34A;
        opacity: 0;
        animation: growLeaf 1.2s ease-out infinite;
      }
      .flower-center {
        fill: #FFC107;
        opacity: 0;
        animation: growFlowerCenter 1.2s ease-out infinite;
      }
      .petal {
        fill: #4CAF50;
        opacity: 0;
        animation: growPetal 1.2s ease-out infinite;
      }
      @keyframes growStem {
        0% { d: path('M50 90 Q50 90 50 90'); }
        30% { d: path('M50 90 Q50 70 50 60'); }
        100% { d: path('M50 90 Q50 60 50 40'); }
      }
      @keyframes growLeaf {
        0%, 20% { opacity: 0; d: path('M50 90 Q50 90 50 90'); }
        30%, 100% { opacity: 1; }
        50% { d: path('M50 70 Q45 65 40 70'); }
        100% { d: path('M50 60 Q40 50 30 60'); }
      }
      .right-leaf {
        animation-name: growRightLeaf;
      }
      @keyframes growRightLeaf {
        0%, 20% { opacity: 0; d: path('M50 90 Q50 90 50 90'); }
        30%, 100% { opacity: 1; }
        50% { d: path('M50 70 Q55 65 60 70'); }
        100% { d: path('M50 60 Q60 50 70 60'); }
      }
      @keyframes growFlowerCenter {
        0%, 50% { opacity: 0; d: path('M50 90 Q50 90 50 90'); }
        60%, 100% { opacity: 1; }
        100% { d: path('M50 40 Q53 37 50 34 Q47 37 50 40'); }
      }
      @keyframes growPetal {
        0%, 50% { opacity: 0; d: path('M50 90 Q50 90 50 90'); }
        60%, 100% { opacity: 1; }
        100% { d: path('M50 40 Q60 30 70 40'); }
      }
      .right-petal {
        animation-name: growRightPetal;
      }
      @keyframes growRightPetal {
        0%, 50% { opacity: 0; d: path('M50 90 Q50 90 50 90'); }
        60%, 100% { opacity: 1; }
        100% { d: path('M50 40 Q40 30 30 40'); }
      }
      .top-petal {
        animation-name: growTopPetal;
      }
      @keyframes growTopPetal {
        0%, 50% { opacity: 0; d: path('M50 90 Q50 90 50 90'); }
        60%, 100% { opacity: 1; }
        100% { d: path('M50 40 Q50 20 50 10'); }
      }
    `}</style>
  </div>
);

export default PlantLoadingAnimation;