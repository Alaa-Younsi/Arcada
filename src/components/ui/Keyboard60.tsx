import { useState } from 'react';

interface KeyData {
  label: string;
  size?: number; // in units, default 1
  special?: boolean;
}

// Map key labels to the character they should type
function keyToChar(label: string): string | null {
  if (label === '' ) return ' ';          // spacebar
  if (label === '⌫') return '\b';        // backspace
  if (label === 'Enter') return '\n';
  if (label === 'Tab') return '\t';
  // Ignore modifier / special keys
  if (['Caps', 'Shift', 'Ctrl', 'Alt', 'Win', 'Fn'].includes(label)) return null;
  // Single printable characters
  if (label.length === 1) return label.toLowerCase();
  return null;
}

const ROWS: KeyData[][] = [
  // Number row — 15u total
  [
    { label: '`' }, { label: '1' }, { label: '2' }, { label: '3' },
    { label: '4' }, { label: '5' }, { label: '6' }, { label: '7' },
    { label: '8' }, { label: '9' }, { label: '0' }, { label: '-' },
    { label: '=' }, { label: '⌫', size: 2, special: true },
  ],
  // QWERTY row — 15u total
  [
    { label: 'Tab', size: 1.5, special: true },
    { label: 'Q' }, { label: 'W' }, { label: 'E' }, { label: 'R' },
    { label: 'T' }, { label: 'Y' }, { label: 'U' }, { label: 'I' },
    { label: 'O' }, { label: 'P' }, { label: '[' }, { label: ']' },
    { label: '\\', size: 1.5 },
  ],
  // Home row — 15u total
  [
    { label: 'Caps', size: 1.75, special: true },
    { label: 'A' }, { label: 'S' }, { label: 'D' }, { label: 'F' },
    { label: 'G' }, { label: 'H' }, { label: 'J' }, { label: 'K' },
    { label: 'L' }, { label: ';' }, { label: "'" },
    { label: 'Enter', size: 2.25, special: true },
  ],
  // Shift row — 15u total
  [
    { label: 'Shift', size: 2.25, special: true },
    { label: 'Z' }, { label: 'X' }, { label: 'C' }, { label: 'V' },
    { label: 'B' }, { label: 'N' }, { label: 'M' }, { label: ',' },
    { label: '.' }, { label: '/' },
    { label: 'Shift', size: 2.75, special: true },
  ],
  // Bottom row — 15u total
  [
    { label: 'Ctrl', size: 1.5, special: true },
    { label: 'Win', size: 1.25, special: true },
    { label: 'Alt', size: 1.25, special: true },
    { label: '', size: 7, special: false },   // spacebar
    { label: 'Alt', size: 1.25, special: true },
    { label: 'Fn', size: 1.25, special: true },
    { label: 'Ctrl', size: 1.5, special: true },
  ],
];

interface SingleKeyProps {
  data: KeyData;
  onKeyPress?: (char: string) => void;
}

function SingleKey({ data, onKeyPress }: SingleKeyProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const isSpace = data.label === '';
  const flexValue = data.size ?? 1;

  return (
    <div
      style={{ flex: flexValue }}
      className="px-[3px] py-[3px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => {
        setPressed(true);
        const char = keyToChar(data.label);
        if (char !== null) onKeyPress?.(char);
      }}
      onMouseUp={() => setPressed(false)}
    >
      <div
        className="w-full h-full flex items-center justify-center select-none cursor-default transition-all duration-75"
        style={{
          background: pressed
            ? 'linear-gradient(135deg, #2a0000 0%, #1a0000 100%)'
            : hovered
            ? 'linear-gradient(135deg, #1a0000 0%, #0f0000 100%)'
            : data.special
            ? 'linear-gradient(135deg, #161616 0%, #0e0e0e 100%)'
            : 'linear-gradient(135deg, #1c1c1c 0%, #121212 100%)',
          border: hovered || pressed ? '1px solid #FF0000' : '1px solid #2a2a2a',
          borderBottom: hovered || pressed ? '3px solid #cc0000' : '3px solid #111',
          borderRadius: '3px',
          boxShadow: pressed
            ? '0 0 8px rgba(255,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.02)'
            : hovered
            ? '0 0 12px rgba(255,0,0,0.35), 0 0 4px rgba(255,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)'
            : 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 0 rgba(0,0,0,0.6)',
          height: isSpace ? '100%' : undefined,
          transform: pressed ? 'translateY(2px)' : 'translateY(0)',
          minHeight: isSpace ? '100%' : undefined,
          padding: isSpace ? '0' : '5px 4px 3px',
        }}
      >
        {!isSpace && (
          <span
            className="font-mono text-center leading-none transition-colors duration-75"
            style={{
              fontSize: data.special ? 'clamp(0.35rem, 0.8vw, 0.45rem)' : 'clamp(0.38rem, 0.9vw, 0.55rem)',
              color: pressed ? '#FF4444' : hovered ? '#FF0000' : '#888888',
              textShadow: hovered || pressed ? '0 0 6px rgba(255,0,0,0.8)' : 'none',
              letterSpacing: '0.05em',
              fontWeight: data.special ? 600 : 400,
              textTransform: 'uppercase',
            }}
          >
            {data.label}
          </span>
        )}
      </div>
    </div>
  );
}

export function Keyboard60({ onKeyPress }: { onKeyPress?: (char: string) => void }) {
  return (
    <div
      className="relative w-full"
      style={{
        maxWidth: '560px',
        background: 'linear-gradient(160deg, #0e0e0e 0%, #080808 100%)',
        border: '1px solid #1f1f1f',
        borderBottom: '4px solid #0a0a0a',
        borderRadius: '6px',
        padding: 'clamp(8px, 2vw, 14px) clamp(8px, 2vw, 14px) clamp(10px, 2.5vw, 16px)',
        boxShadow: [
          '0 0 0 1px #111',
          '0 8px 32px rgba(0,0,0,0.8)',
          '0 0 40px rgba(255,0,0,0.06)',
          '0 0 80px rgba(255,0,0,0.03)',
          'inset 0 1px 0 rgba(255,255,255,0.04)',
        ].join(', '),
      }}
    >
      {/* Red LED strip glow at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: -2,
          left: '10%',
          right: '10%',
          height: '1px',
          background: 'rgba(255,0,0,0.6)',
          boxShadow: '0 0 12px 4px rgba(255,0,0,0.25)',
          borderRadius: '50%',
        }}
      />

      {/* Brand label */}
      <div
        className="font-mono text-center mb-3"
        style={{ fontSize: '0.45rem', color: '#FF0000', letterSpacing: '0.4em', opacity: 0.7 }}
      >
        NORTHERNWEST
      </div>

      {/* Key rows */}
      <div className="flex flex-col gap-[4px]">
        {ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex" style={{ height: 'clamp(26px, 6vw, 38px)' }}>
            {row.map((key, keyIdx) => (
              <SingleKey key={`${rowIdx}-${keyIdx}-${key.label}`} data={key} onKeyPress={onKeyPress} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
