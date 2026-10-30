import restaurant from '../config/restaurant';

/** Hand-drawn location illustration — deliberately not a real map embed. */
export default function LocationMap() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-hairline bg-surface">
      <svg
        viewBox="0 0 600 450"
        aria-hidden="true"
        focusable="false"
        className="h-full w-full"
      >
        <defs>
          <pattern id="map-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="rgba(245,240,232,0.045)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="600" height="450" fill="url(#map-grid)" />
        <rect x="38" y="38" width="132" height="92" fill="rgba(199,165,107,0.05)" />
        <rect x="448" y="348" width="114" height="66" fill="rgba(245,240,232,0.025)" />

        <g stroke="rgba(245,240,232,0.12)" strokeWidth="12">
          <path d="M0 165 H600" />
          <path d="M0 330 H600" />
          <path d="M170 0 V450" />
          <path d="M435 0 V450" />
        </g>
        <g stroke="rgba(245,240,232,0.06)" strokeWidth="4">
          <path d="M0 242 H600" />
          <path d="M300 0 V450" />
          <path d="M78 0 V450" />
          <path d="M524 0 V450" />
        </g>

        <g fill="none" stroke="rgba(245,240,232,0.08)">
          <rect x="196" y="190" width="76" height="32" />
          <rect x="332" y="190" width="82" height="32" />
          <rect x="196" y="270" width="76" height="40" />
          <rect x="332" y="270" width="82" height="40" />
          <rect x="196" y="58" width="76" height="70" />
          <rect x="332" y="58" width="82" height="70" />
        </g>

        <g>
          <circle cx="300" cy="242" r="48" fill="rgba(199,165,107,0.07)" />
          <circle
            cx="300"
            cy="242"
            r="27"
            fill="none"
            stroke="rgba(199,165,107,0.4)"
            strokeWidth="1"
          />
          <path d="M300 242 V198" stroke="#C7A56B" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx="300" cy="242" r="5" fill="#C7A56B" />
          <text
            x="300"
            y="302"
            textAnchor="middle"
            fill="#F5F0E8"
            fontSize="13"
            fontFamily="Georgia, 'Times New Roman', serif"
            letterSpacing="2.5"
          >
            {restaurant.name}
          </text>
          <text
            x="300"
            y="324"
            textAnchor="middle"
            fill="#C7A56B"
            fontSize="11"
            fontFamily="'Noto Serif Tamil', 'Noto Sans Tamil', 'Nirmala UI', sans-serif"
          >
            {restaurant.nameTamil}
          </text>
        </g>

        <text
          x="560"
          y="36"
          textAnchor="end"
          fill="#B5ADA0"
          fontSize="9"
          letterSpacing="4"
          fontFamily="Arial, sans-serif"
        >
          {restaurant.location.neighborhood.toUpperCase()}
        </text>

        <g transform="translate(556, 412)" stroke="#B5ADA0" strokeWidth="1" fill="none">
          <circle r="12" />
          <path d="M0 -12 V-6 M0 6 V12" />
        </g>
      </svg>

      <span className="absolute left-3 top-3 border border-hairline bg-canvas/80 px-2 py-1 text-[8px] uppercase tracking-[0.22em] text-muted">
        Illustration
      </span>
      <span className="sr-only">
        Illustrative map of the restaurant&rsquo;s {restaurant.location.neighborhood} neighborhood.
        Not an actual map.
      </span>
    </div>
  );
}
