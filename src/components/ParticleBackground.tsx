'use client';

import { useEffect } from 'react';

export default function ParticleBackground() {
  useEffect(() => {
    const container = document.getElementById('particles');
    if (!container || container.childElementCount > 0) return;

    const count = 40;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = i % 2 === 0 ? 'particle' : 'particle magical';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDelay = (Math.random() * 20) + 's';
      p.style.animationDuration = (15 + Math.random() * 10) + 's';
      container.appendChild(p);
    }
  }, []);

  return <div id="particles" />;
}
