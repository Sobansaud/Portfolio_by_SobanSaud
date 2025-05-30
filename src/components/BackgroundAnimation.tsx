
'use client';

import React from 'react';

export default function BackgroundAnimation() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: -1,
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0a0a1a, #1a1a3d)',
    }}>
      {/* SVG waves */}
      <svg
        viewBox="0 0 1440 320"
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '30vh',
          opacity: 0.5,
          animation: 'waveAnimation 10s linear infinite',
        }}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#5b4b8a"
          fillOpacity="0.6"
          d="M0,192L60,176C120,160,240,128,360,138.7C480,149,600,203,720,213.3C840,224,960,192,1080,181.3C1200,171,1320,181,1380,186.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </svg>
      <svg
        viewBox="0 0 1440 320"
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '25vh',
          opacity: 0.3,
          animation: 'waveAnimationReverse 15s linear infinite',
          animationDelay: '-5s',
        }}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#7a66b8"
          fillOpacity="0.4"
          d="M0,224L80,197.3C160,171,320,117,480,101.3C640,85,800,107,960,138.7C1120,171,1280,213,1360,234.7L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        />
      </svg>

      <style>{`
        @keyframes waveAnimation {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes waveAnimationReverse {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
      `}</style>
    </div>
  );
}
