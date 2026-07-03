import { forwardRef } from 'react';

/**
 * 开场遮幕 - 全屏覆盖层，由 GSAP 控制揭开
 */
const OpeningOverlay = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0A]"
      style={{ transformOrigin: 'center center' }}
    >
      {/* 中心装饰 - 开场时可见，揭开后消失 */}
      <div className="gsap-overlay-text flex flex-col items-center gap-4">
        <div className="w-12 h-px bg-accent/60" />
        <span className="text-text-tertiary text-xs font-mono tracking-[0.4em] uppercase">
          Portfolio
        </span>
        <div className="w-12 h-px bg-accent/60" />
      </div>
    </div>
  );
});

OpeningOverlay.displayName = 'OpeningOverlay';

export default OpeningOverlay;
