import { useState, useRef, useEffect } from 'react';
import { Keyboard60 } from './Keyboard60';

const PROMPT = 'nw@northernwest:~$ ';

export function KeyboardWithTerminal() {
  const [lines, setLines] = useState<string[]>([
    '  Northernwest v2.0.0 — Cyberpunk Peripherals',
    '  Type on the keyboard below...',
    '',
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever lines change
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, currentInput]);

  const handleKeyPress = (char: string) => {
    if (char === '\b') {
      // Backspace
      setCurrentInput((prev) => prev.slice(0, -1));
    } else if (char === '\n') {
      // Enter — commit the line
      setLines((prev) => [...prev, PROMPT + currentInput]);
      setCurrentInput('');
    } else if (char === '\t') {
      // Tab — insert spaces
      setCurrentInput((prev) => prev + '    ');
    } else {
      setCurrentInput((prev) => prev + char);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4" style={{ maxWidth: '560px' }}>
      {/* Terminal */}
      <div
        className="w-full font-mono text-xs"
        style={{
          background: '#050505',
          border: '1px solid #1f1f1f',
          borderRadius: '6px',
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0,0,0,0.7), 0 0 20px rgba(255,0,0,0.04)',
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-2"
          style={{
            background: '#0d0d0d',
            borderBottom: '1px solid #1a1a1a',
          }}
        >
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#FF0000', opacity: 0.8 }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#333' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#333' }} />
          <span
            className="ml-2"
            style={{ color: '#666', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}
          >
            northernwest — terminal
          </span>
        </div>

        {/* Output area */}
        <div
          ref={terminalRef}
          className="overflow-y-auto px-4 py-3"
          style={{ height: '140px', scrollbarWidth: 'thin', scrollbarColor: '#1a1a1a #050505' }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                color: line.startsWith('  ') ? '#666' : '#33FF33',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}
            >
              {line}
            </div>
          ))}

          {/* Active line with blinking cursor */}
          <div style={{ color: '#33FF33', lineHeight: '1.6', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#FF0000' }}>{PROMPT}</span>
            <span>{currentInput}</span>
            <span
              style={{
                display: 'inline-block',
                width: '7px',
                height: '13px',
                background: '#FF0000',
                marginLeft: '1px',
                animation: 'terminal-blink 1s step-end infinite',
              }}
            />
          </div>
        </div>
      </div>

      {/* Keyboard */}
      <Keyboard60 onKeyPress={handleKeyPress} />

      <style>{`
        @keyframes terminal-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
