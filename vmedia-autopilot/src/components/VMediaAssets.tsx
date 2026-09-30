import React, { useState, useRef, useEffect, useCallback } from "react";

export function VMediaLogo({ className = "h-16" }: { className?: string }) {
  // Uses the user's provided logo graphic with blue ribbon M mark & VMedia Digital typography
  return (
    <div className="flex items-center gap-3 select-none">
      <img
        src="https://vibe.filesafe.space/1790685669090253980/attachments/2efe75cf-87ef-4153-86e9-6d4af872aa5c.png"
        alt="VMedia Digital"
        className={`${className} w-auto object-contain rounded-xl shadow-xs transition-transform hover:scale-[1.02] duration-200`}
        loading="eager"
      />
    </div>
  );
}

interface DraggableProps {
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  className?: string;
  label?: string;
}

/**
 * DraggableDoodle wraps decorative doodles allowing users to drag and flick them
 * around the screen via mouse or touch!
 */
export function DraggableDoodle({
  children,
  initialX = 0,
  initialY = 0,
  className = "",
  label,
}: DraggableProps) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dragRef = useRef<HTMLDivElement | null>(null);
  const startPointerRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef({ x: initialX, y: initialY });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    startPointerRef.current = { x: e.clientX, y: e.clientY };
    startPosRef.current = { ...pos };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - startPointerRef.current.x;
    const dy = e.clientY - startPointerRef.current.y;
    setPos({
      x: startPosRef.current.x + dx,
      y: startPosRef.current.y + dy,
    });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
  };

  return (
    <div
      ref={dragRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`touch-none select-none ${className} ${
        isDragging
          ? "cursor-grabbing scale-110 shadow-lg ring-2 ring-[#127AF7]/40 rounded-xl z-30"
          : "cursor-grab hover:scale-105 transition-transform duration-150"
      }`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        willChange: "transform",
      }}
      title={label || "Touch or drag me!"}
    >
      {children}
      {isHovered && !isDragging && (
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-[#127AF7] bg-white/90 px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap pointer-events-none opacity-90 animate-fade-in">
          drag me
        </span>
      )}
    </div>
  );
}

// Decorative doodles in Mist Blue #86BBFF with ~3.5px stroke, no fill
export function ZigzagDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="78"
      height="30"
      viewBox="0 0 78 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 7L16 23L28 7L40 23L52 7L64 23L74 7"
        stroke="#86BBFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BracketDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="46"
      height="92"
      viewBox="0 0 46 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 7C30 7 40 22 40 46C40 70 30 85 6 85"
        stroke="#86BBFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="6 8"
      />
    </svg>
  );
}

export function ChevronDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="38"
      height="62"
      viewBox="0 0 38 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M30 7L8 31L30 55"
        stroke="#86BBFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BurstDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M30 4V17M10 40L20 34M50 40L40 34"
        stroke="#86BBFF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WaveDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="68"
      height="26"
      viewBox="0 0 68 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 14C10 6 16 6 22 14C28 22 34 22 40 14C46 6 52 6 58 14C61 18 64 18 66 16"
        stroke="#86BBFF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
