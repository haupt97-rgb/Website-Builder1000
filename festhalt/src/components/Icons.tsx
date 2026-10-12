import type { SVGProps } from "react";
import type { IconName } from "@/content/sheets";

type P = SVGProps<SVGSVGElement>;
const base = (p: P): P => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
  ...p,
});

/** Ordner-Symbol im Stil der Festhalt-Bildmarke (bis eine Original-Logodatei vorliegt). */
export const FolderIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 7.5V6a1.5 1.5 0 0 1 1.5-1.5h4.2l1.8 2h8.5A1.5 1.5 0 0 1 20.5 8v1" />
    <path d="M2.6 10.2A1.2 1.2 0 0 1 3.8 9h16.6a1.2 1.2 0 0 1 1.17 1.46l-1.7 7.6A1.5 1.5 0 0 1 18.4 19.2H5.4a1.5 1.5 0 0 1-1.47-1.2L2.6 10.2Z" />
  </svg>
);
export const ArrowRight = (p: P) => (
  <svg {...base({ className: "arrow", ...p })}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ArrowLeft = (p: P) => (
  <svg {...base(p)}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);
export const ExternalIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
  </svg>
);
export const EyeIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
export const PlusIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const MinusIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);
export const ExpandIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </svg>
);
export const CloseIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const CheckIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.2 4L19 7" />
  </svg>
);
export const MenuIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const PrinterIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 9V3.5h10V9M7 17H4.5A1.5 1.5 0 0 1 3 15.5v-5A1.5 1.5 0 0 1 4.5 9h15a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5H17" />
    <path d="M7 14h10v6.5H7z" />
  </svg>
);
export const DownloadIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 4v11M7 10l5 5 5-5M4 19.5h16" />
  </svg>
);
export const ClockIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
export const PagesIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M8 3.5h8.5L20 7v11.5a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 18.5V5A1.5 1.5 0 0 1 8 3.5Z" />
    <path d="M16 3.5V7h4M3.5 7v12A2 2 0 0 0 5.5 21H15" />
  </svg>
);
export const ListCheckIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="4.5" y="3.5" width="15" height="17" rx="1.5" />
    <path d="m8 9 1.5 1.5L12 8M8 14.5l1.5 1.5 2.5-2.5M14.5 9.5H16M14.5 15H16" />
  </svg>
);
export const SearchIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </svg>
);
export const SproutIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 20v-8M12 12c0-4 3-6.5 7-6.5 0 4-3 6.5-7 6.5ZM12 14c0-3-2.4-5-5.5-5 0 3 2.4 5 5.5 5Z" />
  </svg>
);
export const InfoIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);
export const LightbulbIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1.1 1.3 1.1 2.2h5c0-.9.5-1.7 1.1-2.2A6 6 0 0 0 12 3Z" />
  </svg>
);

const sheetIcons: Record<IconName, (p: P) => React.ReactElement> = {
  contacts: (p) => (
    <svg {...base(p)}>
      <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8.5Z" />
      <path d="M10 20v-5h4v5" />
    </svg>
  ),
  document: (p) => <PagesIcon {...p} />,
  heart: (p) => (
    <svg {...base(p)}>
      <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />
      <path d="M8 12h2.2l1.2-2 1.6 4 1.2-2H16" />
    </svg>
  ),
  pen: (p) => (
    <svg {...base(p)}>
      <path d="m15 5 4 4L9 19H5v-4L15 5Z" />
      <path d="M13 7l4 4" />
    </svg>
  ),
  cross: (p) => (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10 7.5h4v2.5h2.5v4H14v2.5h-4V14H7.5v-4H10z" />
    </svg>
  ),
  person: (p) => (
    <svg {...base(p)}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </svg>
  ),
  plane: (p) => (
    <svg {...base(p)}>
      <path d="m3.5 13 4.5 1 3-3-6-4 2-1.5 8 2.5 3.2-3.2a1.8 1.8 0 0 1 2.5 2.5L17.5 10.5l2.5 8-1.5 2-4-6-3 3 1 4.5-1.5 1.5-2.2-4.3L4.5 17 3.5 13Z" />
    </svg>
  ),
  coins: (p) => (
    <svg {...base(p)}>
      <ellipse cx="9" cy="7" rx="5" ry="2.2" />
      <path d="M4 7v4c0 1.2 2.2 2.2 5 2.2M4 11v4c0 1.2 2.2 2.2 5 2.2" />
      <ellipse cx="15" cy="13" rx="5" ry="2.2" />
      <path d="M10 13v4c0 1.2 2.2 2.2 5 2.2s5-1 5-2.2v-4" />
    </svg>
  ),
  shield: (p) => (
    <svg {...base(p)}>
      <path d="M12 3.5 19 6v5.5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  lock: (p) => (
    <svg {...base(p)}>
      <rect x="5" y="10.5" width="14" height="10" rx="1.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2.5" />
    </svg>
  ),
  laptop: (p) => (
    <svg {...base(p)}>
      <rect x="4.5" y="5" width="15" height="10" rx="1.2" />
      <path d="M2.5 18.5h19" />
    </svg>
  ),
  family: (p) => (
    <svg {...base(p)}>
      <circle cx="8" cy="7" r="2.6" />
      <circle cx="16" cy="7" r="2.6" />
      <path d="M3.5 19v-3.2A3.3 3.3 0 0 1 6.8 12.5h2.4a3.3 3.3 0 0 1 3.3 3.3V19M11.5 19v-3.2a3.3 3.3 0 0 1 3.3-3.3h2.4a3.3 3.3 0 0 1 3.3 3.3V19" />
    </svg>
  ),
  rings: (p) => (
    <svg {...base(p)}>
      <circle cx="9" cy="14" r="5" />
      <circle cx="15" cy="12" r="5" />
      <path d="m13.5 4 1.5 2 1.5-2" />
    </svg>
  ),
  paw: (p) => (
    <svg {...base(p)}>
      <ellipse cx="12" cy="16" rx="4" ry="3.4" />
      <circle cx="6.5" cy="11" r="1.7" />
      <circle cx="9.5" cy="6.8" r="1.7" />
      <circle cx="14.5" cy="6.8" r="1.7" />
      <circle cx="17.5" cy="11" r="1.7" />
    </svg>
  ),
  candle: (p) => (
    <svg {...base(p)}>
      <path d="M12 3v18M7.5 8h9" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  home: (p) => (
    <svg {...base(p)}>
      <path d="M4 10.5 12 4l8 6.5V20H4v-9.5Z" />
      <path d="M9.5 20v-4.5h5V20" />
    </svg>
  ),
};

export function SheetIcon({ name, ...p }: { name: IconName } & P) {
  const C = sheetIcons[name];
  return <C {...p} />;
}

export function Stroke(p: P) {
  return (
    <svg viewBox="0 0 120 10" fill="none" aria-hidden focusable={false} className="underline-stroke" {...p}>
      <path d="M2 7c22-4 52-5.5 116-3" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}
