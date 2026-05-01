import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const defaults: IconProps = { fill: 'none', viewBox: '0 0 24 24', 'aria-hidden': true };

// ── Category icons ─────────────────────────────────────────────────────────

export function MouseIcon({ size = 24, ...p }: IconProps) {
  return (
    <svg width={size} height={size} {...defaults} {...p}>
      <path
        d="M12 2C9.24 2 7 4.24 7 7v10c0 2.76 2.24 5 5 5s5-2.24 5-5V7c0-2.76-2.24-5-5-5z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
      <path d="M12 2v8M7 10h10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="6.5" r="1.2" fill="currentColor" />
      {/* Side buttons */}
      <path d="M7 8.5C5.8 9 5 10 5 11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="9.5" y="13.5" width="5" height="2.5" rx="1.25" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function HeadphonesIcon({ size = 24, ...p }: IconProps) {
  return (
    <svg width={size} height={size} {...defaults} {...p}>
      <path
        d="M4 14v-2a8 8 0 0 1 16 0v2"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
      <rect x="2" y="14" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="18" y="14" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 21v1a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function KeyboardIcon({ size = 24, ...p }: IconProps) {
  return (
    <svg width={size} height={size} {...defaults} {...p}>
      <rect x="2" y="6" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      {/* Keys row 1 */}
      <rect x="4.5" y="9" width="2" height="2" rx="0.4" fill="currentColor" />
      <rect x="8" y="9" width="2" height="2" rx="0.4" fill="currentColor" />
      <rect x="11.5" y="9" width="2" height="2" rx="0.4" fill="currentColor" />
      <rect x="15" y="9" width="2" height="2" rx="0.4" fill="currentColor" />
      {/* Keys row 2 */}
      <rect x="4.5" y="13" width="2" height="2" rx="0.4" fill="currentColor" />
      <rect x="8" y="13" width="2" height="2" rx="0.4" fill="currentColor" />
      {/* Spacebar */}
      <rect x="11.5" y="13" width="6" height="2" rx="0.4" fill="currentColor" />
      {/* Extra key */}
      <rect x="17.5" y="9" width="2" height="2" rx="0.4" fill="currentColor" />
    </svg>
  );
}

// ── Social icons ────────────────────────────────────────────────────────────

export function XIcon({ size = 16, ...p }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function DiscordIcon({ size = 16, ...p }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
    </svg>
  );
}

export function InstagramIcon({ size = 16, ...p }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

export function FacebookIcon({ size = 16, ...p }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function TikTokIcon({ size = 16, ...p }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.89a8.27 8.27 0 0 0 4.83 1.54V7.01a4.85 4.85 0 0 1-1.06-.32z" />
    </svg>
  );
}

export function TwitchIcon({ size = 16, ...p }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
    </svg>
  );
}

// ── Nav/UI icons ────────────────────────────────────────────────────────────

export function CartIcon({ size = 22, ...p }: IconProps) {
  return (
    <svg width={size} height={size} {...defaults} {...p}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
