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
        fill="none" stroke="#39ff14" strokeWidth="2"
        filter="url(#logo-glow)" opacity="0.9" />
      <ellipse cx="100" cy="100" rx="88" ry="28"
        fill="none" stroke="#39ff14" strokeWidth="2"
        filter="url(#logo-glow)" opacity="0.9"
        transform="rotate(60, 100, 100)" />
      <ellipse cx="100" cy="100" rx="88" ry="28"
        fill="none" stroke="#39ff14" strokeWidth="2"
        filter="url(#logo-glow)" opacity="0.9"
        transform="rotate(-60, 100, 100)" />

      {/* Dice tips — small D4-style triangles at 4 orbital extremes */}
      {/* Upper-left tip (56, 24) */}
      <polygon points="56,16 51,28 61,28"
        fill="#39ff14" stroke="none" filter="url(#logo-glow)"
        transform="rotate(30, 56, 24)" />
      {/* Upper-right tip (144, 24) */}
      <polygon points="144,16 139,28 149,28"
        fill="#39ff14" stroke="none" filter="url(#logo-glow)"
        transform="rotate(-30, 144, 24)" />
      {/* Lower-left tip (56, 176) */}
      <polygon points="56,168 51,180 61,180"
        fill="#39ff14" stroke="none" filter="url(#logo-glow)"
        transform="rotate(150, 56, 176)" />
      {/* Lower-right tip (144, 176) */}
      <polygon points="144,168 139,180 149,180"
        fill="#39ff14" stroke="none" filter="url(#logo-glow)"
        transform="rotate(-150, 144, 176)" />

      {/* D20 outer decagon — dark fill renders over orbitals */}
      <polygon
        points="100,32 60,45 35,79 35,121 60,155 100,168 140,155 165,121 165,79 140,45"
        fill="#050a05" stroke="#39ff14" strokeWidth="2.5"
        filter="url(#logo-glow)" />

      {/* D20 internal facets — pentagon A: v0-v2-v4-v6-v8 */}
      <polygon
        points="100,32 35,79 60,155 140,155 165,79"
        fill="none" stroke="#39ff14" strokeWidth="1.5"
        filter="url(#logo-glow)" opacity="0.75" />

      {/* D20 internal facets — pentagon B: v1-v3-v5-v7-v9 */}
      <polygon
        points="60,45 35,121 100,168 165,121 140,45"
        fill="none" stroke="#39ff14" strokeWidth="1.5"
        filter="url(#logo-glow)" opacity="0.75" />

      {/* "20" center text */}
      <text
        x="100" y="108"
        textAnchor="middle"
        fill="#39ff14"
        fontSize="24"
        fontWeight="bold"
        fontFamily="Courier New, monospace"
        filter="url(#logo-glow)"
      >
        20
      </text>
    </svg>
  );
}
