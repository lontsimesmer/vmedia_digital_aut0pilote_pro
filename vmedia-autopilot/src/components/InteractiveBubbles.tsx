import React, { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  speedX: number;
  speedY: number;
  maxLife: number;
  life: number;
}

const BUBBLE_COLORS = [
  "rgba(18, 122, 247, 0.45)", // Ribbon Blue
  "rgba(134, 187, 255, 0.55)", // Mist Blue
  "rgba(10, 95, 216, 0.35)", // Action Blue
  "rgba(255, 255, 255, 0.75)", // Pure white soft bubble
  "rgba(168, 222, 245, 0.5)", // Soft cyan
] as const;

const getRandomBubbleColor = () =>
  BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)] ?? BUBBLE_COLORS[0];

export function InteractiveBubbles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const bubbles: Bubble[] = [];
    let lastX = 0;
    let lastY = 0;
    let lastSpawn = 0;

    const spawnBubble = (x: number, y: number, count = 1) => {
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 18 + 6;
        const color = getRandomBubbleColor();
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 1.8 + 0.4;
        const maxLife = Math.random() * 60 + 40;

        bubbles.push({
          x: x + (Math.random() - 0.5) * 16,
          y: y + (Math.random() - 0.5) * 16,
          size,
          color,
          alpha: 1,
          speedX: Math.cos(angle) * velocity,
          speedY: Math.sin(angle) * velocity - 0.6, // gentle upward drift
          maxLife,
          life: 0,
        });
      }
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const now = performance.now();
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        const touch = e.touches.item(0);
        if (touch) {
          clientX = touch.clientX;
          clientY = touch.clientY;
        }
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const dist = Math.hypot(clientX - lastX, clientY - lastY);
      if (dist > 8 || now - lastSpawn > 60) {
        lastSpawn = now;
        lastX = clientX;
        lastY = clientY;
        const count = Math.min(Math.floor(dist / 14) + 1, 4);
        spawnBubble(clientX, clientY, count);
      }
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    // Ambient floating bubbles from the bottom periodically
    const ambientInterval = setInterval(() => {
      if (bubbles.length < 35) {
        const x = Math.random() * width;
        const y = height + 10;
        const size = Math.random() * 14 + 5;
        const color = getRandomBubbleColor();
        bubbles.push({
          x,
          y,
          size,
          color,
          alpha: 0.8,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: -Math.random() * 1.2 - 0.5,
          maxLife: Math.random() * 120 + 80,
          life: 0,
        });
      }
    }, 450);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        if (!b) continue;

        b.life++;
        b.x += b.speedX;
        b.y += b.speedY;

        // Life fading
        const progress = b.life / b.maxLife;
        const alpha = Math.max(0, 1 - progress);

        if (progress >= 1 || b.y < -20) {
          bubbles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = alpha;

        // Outer bubble ring
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();

        // Shimmer highlight inside bubble
        ctx.beginPath();
        ctx.arc(b.x - b.size * 0.35, b.y - b.size * 0.35, b.size * 0.28, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      clearInterval(ambientInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 w-full h-full"
      style={{ mixBlendMode: "normal" }}
      aria-hidden="true"
    />
  );
}
