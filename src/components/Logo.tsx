export default function Logo({
  width = 40,
  height = 40,
  className = '',
  style = {},
}: {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-label="Critical Mass Games logo"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#39ff14" />
          <stop offset="50%" stopColor="#bf40ff" />
          <stop offset="100%" stopColor="#ff6a00" />
        </linearGradient>
        <filter id="logo-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Orbital rings — rendered behind D20 body */}
      <ellipse cx="100" cy="100" rx="88" ry="28"
        fill="none" stroke="url(#logo-gradient)" strokeWidth="2"
        filter="url(#logo-glow)" opacity="0.9" />
      <ellipse cx="100" cy="100" rx="88" ry="28"
        fill="none" stroke="url(#logo-gradient)" strokeWidth="2"
        filter="url(#logo-glow)" opacity="0.9"
        transform="rotate(60, 100, 100)" />
      <ellipse cx="100" cy="100" rx="88" ry="28"
        fill="none" stroke="url(#logo-gradient)" strokeWidth="2"
        filter="url(#logo-glow)" opacity="0.9"
        transform="rotate(-60, 100, 100)" />

      {/* Dice tips — small D4-style triangles at 4 orbital extremes */}
      <polygon points="56,16 51,28 61,28"
        fill="#bf40ff" stroke="none" filter="url(#logo-glow)"
        transform="rotate(30, 56, 24)" />
      <polygon points="144,16 139,28 149,28"
        fill="#ff6a00" stroke="none" filter="url(#logo-glow)"
        transform="rotate(-30, 144, 24)" />
      <polygon points="56,168 51,180 61,180"
        fill="#ff6a00" stroke="none" filter="url(#logo-glow)"
        transform="rotate(150, 56, 176)" />
      <polygon points="144,168 139,180 149,180"
        fill="#bf40ff" stroke="none" filter="url(#logo-glow)"
        transform="rotate(-150, 144, 176)" />

      {/* D20 outer decagon */}
      <polygon
        points="100,32 60,45 35,79 35,121 60,155 100,168 140,155 165,121 165,79 140,45"
        fill="none" stroke="url(#logo-gradient)" strokeWidth="2.5"
        filter="url(#logo-glow)" />

      {/* D20 internal facets */}
      <g stroke="url(#logo-gradient)" strokeWidth="1.5" fill="none" filter="url(#logo-glow)" opacity="0.75">
        <line x1="100" y1="32" x2="165" y2="79" />
        <line x1="140" y1="45" x2="165" y2="121" />
        <line x1="165" y1="79" x2="140" y2="155" />
        <line x1="165" y1="121" x2="100" y2="168" />
        <line x1="140" y1="155" x2="60" y2="155" />
        <line x1="100" y1="168" x2="35" y2="121" />
        <line x1="60" y1="155" x2="35" y2="79" />
        <line x1="35" y1="121" x2="60" y2="45" />
        <line x1="35" y1="79" x2="100" y2="32" />
        <line x1="60" y1="45" x2="140" y2="45" />
      </g>

    </svg>
  );
}
