import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
  afterNextRender,
  DestroyRef,
  inject,
  NgZone,
} from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

@Component({
  selector: 'app-fluid-canvas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas aria-hidden="true"></canvas>`,
  styles: [
    `
      :host {
        position: absolute;
        inset: 0;
        display: block;
        pointer-events: none;
        overflow: hidden;
      }
      canvas {
        width: 100%;
        height: 100%;
        display: block;
      }
    `,
  ],
})
export class FluidCanvasComponent {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);

  private animId = 0;
  private isVisible = true;
  private particles: Particle[] = [];
  private lastX = 0;
  private lastY = 0;

  constructor() {
    afterNextRender(() => this.zone.runOutsideAngular(() => this.init()));
  }

  private init(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

      const dx = x - (this.lastX || x);
      const dy = y - (this.lastY || y);
      const speed = Math.sqrt(dx * dx + dy * dy);

      this.lastX = x;
      this.lastY = y;

      const count = Math.min(Math.floor(speed * 0.4) + 1, 6);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spread = Math.random() * 2 + 1;
        this.particles.push({
          x: x + (Math.random() - 0.5) * 16,
          y: y + (Math.random() - 0.5) * 16,
          vx: dx * 0.15 + Math.cos(angle) * spread,
          vy: dy * 0.15 + Math.sin(angle) * spread,
          size: Math.random() * 28 + 14,
          alpha: 0.35 + Math.random() * 0.25,
          life: 0,
          maxLife: 60 + Math.random() * 40,
        });
      }

      if (this.particles.length > 140) {
        this.particles.splice(0, this.particles.length - 140);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const intersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        this.isVisible = entries.some((e: IntersectionObserverEntry) => e.isIntersecting);
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    const loop = () => {
      if (!this.isVisible || document.hidden) {
        this.animId = requestAnimationFrame(loop);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Render organic liquid ripples
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.size *= 1.018;

        const progress = p.life / p.maxLife;
        const currentAlpha = p.alpha * (1 - progress);

        if (progress >= 1) {
          this.particles.splice(i, 1);
          continue;
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(255, 216, 77, ${currentAlpha * 0.8})`);
        gradient.addColorStop(0.45, `rgba(255, 216, 77, ${currentAlpha * 0.25})`);
        gradient.addColorStop(1, 'rgba(255, 216, 77, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      this.animId = requestAnimationFrame(loop);
    };

    this.animId = requestAnimationFrame(loop);

    this.destroyRef.onDestroy(() => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      if (this.animId) cancelAnimationFrame(this.animId);
    });
  }
}
