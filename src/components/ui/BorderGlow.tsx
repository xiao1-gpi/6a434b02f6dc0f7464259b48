import { useRef, useCallback, ReactNode } from 'react';
import './BorderGlow.css';

interface BorderGlowProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  colors?: string[];
  fillOpacity?: number;
}

function parseHSL(hslStr: string) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 0, s: 100, l: 60 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor: string, intensity: number): Record<string, string> {
  const { h, s, l } = parseHSL(glowColor);
  return {
    '--glow-color': `hsl(${h}deg ${s}% ${l}% / ${intensity * 100}%)`,
  };
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors: string[]): Record<string, string> {
  const vars: Record<string, string> = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  return vars;
}

export default function BorderGlow({
  children,
  className = '',
  glowColor = '0 100% 60%',
  backgroundColor = '#0a0a0a',
  borderRadius = 20,
  glowRadius = 20,
  glowIntensity = 1.0,
  coneSpread = 30,
  colors = ['#FF2D2D', '#FF6B35', '#7C3AED'],
  fillOpacity = 0.4,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);

  const updateGlow = useCallback((clientX: number, clientY: number) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const w = rect.width;
    const h = rect.height;

    const distLeft = x;
    const distRight = w - x;
    const distTop = y;
    const distBottom = h - y;

    const minDist = Math.min(distLeft, distRight, distTop, distBottom);
    const maxDist = Math.min(w, h) / 2;
    const edgeFactor = Math.max(0, 1 - minDist / maxDist);
    const edgeIntensity = Math.pow(edgeFactor, 1.5) * glowIntensity;

    const cx = w / 2;
    const cy = h / 2;
    const dx = x - cx;
    const dy = y - cy;
    const radians = Math.atan2(dy, dx);
    let angle = radians * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;

    card.style.setProperty('--cursor-angle', `${angle}deg`);
    card.style.setProperty('--edge-intensity', `${edgeIntensity}`);
    card.style.setProperty('--fill-opacity', `${fillOpacity * Math.min(1, edgeFactor + 0.3)}`);
  }, [glowIntensity, fillOpacity]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      pendingRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        if (pendingRef.current) {
          updateGlow(pendingRef.current.x, pendingRef.current.y);
          pendingRef.current = null;
        }
        rafRef.current = 0;
      });
    },
    [updateGlow]
  );

  const handlePointerLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    pendingRef.current = null;
    const card = cardRef.current;
    if (card) {
      card.style.setProperty('--edge-intensity', '0');
      card.style.setProperty('--fill-opacity', '0');
    }
  }, []);

  const glowVars = buildGlowVars(glowColor, glowIntensity);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`border-glow-card ${className}`}
      style={{
        ['--card-bg' as string]: backgroundColor,
        ['--border-radius' as string]: `${borderRadius}px`,
        ['--glow-radius' as string]: `${glowRadius}px`,
        ['--cone-spread' as string]: coneSpread,
        ['--edge-intensity' as string]: '0',
        ['--fill-opacity' as string]: '0',
        ...glowVars,
        ...buildGradientVars(colors),
      } as React.CSSProperties}
    >
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}
