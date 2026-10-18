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
import { AudioService } from '../../services/audio.service';
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  QuadraticBezierCurve3,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';

/**
 * The hero globe.
 *
 * Only ever reached through a dynamic import from HeroBackdropComponent, so
 * three lands in its own lazy chunk and never touches the initial bundle. The
 * capability gate lives at the call site; by the time this class is
 * constructed the decision to render has already been made.
 *
 * It is decorative and aria-hidden. The arcs are a motif for what Talk360
 * does — connect callers between continents — not a data visualisation, so
 * nothing here is labelled and nothing asserts a number.
 */
@Component({
  selector: 'app-globe',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas aria-hidden="true" data-cursor="Drag"></canvas>`,
  styles: [
    `
      :host {
        position: absolute;
        inset: 0;
        display: block;
        pointer-events: none;
      }

      canvas {
        width: 100%;
        height: 100%;
        display: block;
        /* Only the globe takes the pointer, and only where it is drawn. */
        pointer-events: auto;
        cursor: grab;
        opacity: 0;
        transition: opacity 1200ms var(--io-ease-out);
      }

      canvas.is-ready {
        opacity: 1;
      }

      canvas.is-dragging {
        cursor: grabbing;
      }
    `,
  ],
})
export class GlobeComponent {
  @ViewChild('canvas') private canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly zone = inject(NgZone);
  private readonly audio = inject(AudioService);

  private frame = 0;
  private visible = true;

  /** Auto-rotation, and the velocity a drag adds on top of it.
   *  The initial value turns the Europe-Africa corridor toward the camera,
   *  so the arcs are legible on the first frame rather than on the far side. */
  private spin = -1.75;
  private velocity = 0;
  private dragging = false;
  private lastX = 0;

  private readonly radius = 1;

  constructor() {
    afterNextRender(() => this.zone.runOutsideAngular(() => this.init()));
  }

  private init(): void {
    const canvas = this.canvasRef.nativeElement;
    const host = canvas.parentElement ?? canvas;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      // Context creation can still fail after the capability check — a
      // blocklisted driver, or too many live contexts. The CSS backdrop
      // behind this is already a complete composition, so we just stop.
      return;
    }

    // Retina is not worth 4x the fragments for a soft background object.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

    const scene = new Scene();
    const camera = new PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.28, 4.05);
    camera.lookAt(0, 0, 0);

    const world = new Group();
    // Axial tilt, so it reads as a planet rather than a spinning ball.
    world.rotation.z = 0.41;
    scene.add(world);

    const palette = this.readPalette();

    world.add(this.buildSphere(palette.dim));
    world.add(this.buildGraticule(palette.dim));

    const arcs = this.buildArcs(palette.brand);
    world.add(arcs.group);

    const lattice = this.buildLattice(palette.dim);
    scene.add(lattice.points);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) {
        return;
      }
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    // Stop rendering when scrolled away or the tab is backgrounded. A hero
    // animation running behind six screens of content is pure battery cost.
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        this.visible = entries.some((e) => e.isIntersecting);
        if (this.visible) {
          this.play(renderer, scene, camera, world, arcs, lattice);
        } else {
          this.pause();
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(host);

    const onVisibility = () => {
      if (document.hidden) {
        this.pause();
      } else {
        this.play(renderer, scene, camera, world, arcs, lattice);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    const detachDrag = this.attachDrag(canvas);
    const detachTheme = this.watchTheme(arcs, world, lattice);

    this.play(renderer, scene, camera, world, arcs, lattice);
    requestAnimationFrame(() => canvas.classList.add('is-ready'));

    this.destroyRef.onDestroy(() => {
      this.pause();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      detachDrag();
      detachTheme();
      // WebGL resources are not garbage collected with the component.
      scene.traverse((object) => {
        const any = object as unknown as {
          geometry?: { dispose(): void };
          material?: { dispose(): void };
        };
        any.geometry?.dispose();
        any.material?.dispose();
      });
      renderer.dispose();
    });
  }

  // --- Geometry -----------------------------------------------------------

  /** A Fibonacci-distributed point cloud, which avoids the pole clustering
   *  an evenly-sampled lat/lon grid produces. */
  private buildSphere(color: Color): Points {
    const count = 1400;
    const positions: number[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const ring = Math.sqrt(1 - y * y);
      const theta = golden * i;
      positions.push(
        Math.cos(theta) * ring * this.radius,
        y * this.radius,
        Math.sin(theta) * ring * this.radius
      );
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));

    return new Points(
      geometry,
      new PointsMaterial({ color, size: 0.012, transparent: true, opacity: 0.55 })
    );
  }

  /** Latitude and longitude rings — the same grid motif as the CSS backdrop. */
  private buildGraticule(color: Color): Group {
    const group = new Group();
    const material = new LineBasicMaterial({ color, transparent: true, opacity: 0.16 });

    for (let lat = -60; lat <= 60; lat += 30) {
      const points: number[] = [];
      for (let lon = -180; lon <= 180; lon += 4) {
        const v = this.toVector(lat, lon, this.radius);
        points.push(v.x, v.y, v.z);
      }
      const geometry = new BufferGeometry();
      geometry.setAttribute('position', new Float32BufferAttribute(points, 3));
      group.add(new Line(geometry, material));
    }

    for (let lon = -180; lon < 180; lon += 30) {
      const points: number[] = [];
      for (let lat = -90; lat <= 90; lat += 4) {
        const v = this.toVector(lat, lon, this.radius);
        points.push(v.x, v.y, v.z);
      }
      const geometry = new BufferGeometry();
      geometry.setAttribute('position', new Float32BufferAttribute(points, 3));
      group.add(new Line(geometry, material));
    }

    return group;
  }

  /**
   * Great-circle-ish arcs with a lit point travelling along each. Endpoints
   * are real coordinates between Europe and Africa because that is the
   * corridor Talk360 serves, but they carry no labels and claim no traffic.
   */
  private buildArcs(color: Color): {
    group: Group;
    travellers: { points: Points; curve: QuadraticBezierCurve3; offset: number; speed: number }[];
  } {
    const routes: [number, number, number, number][] = [
      [52.37, 4.9, 6.52, 3.37], // Amsterdam - Lagos
      [52.37, 4.9, -1.29, 36.82], // Amsterdam - Nairobi
      [51.51, -0.13, 5.6, -0.19], // London - Accra
      [48.86, 2.35, 14.69, -17.44], // Paris - Dakar
      [41.9, 12.5, -26.2, 28.04], // Rome - Johannesburg
      [52.37, 4.9, 30.04, 31.24], // Amsterdam - Cairo
      [40.42, -3.7, 33.57, -7.59], // Madrid - Casablanca
    ];

    const group = new Group();
    const travellers: {
      points: Points;
      curve: QuadraticBezierCurve3;
      offset: number;
      speed: number;
    }[] = [];

    const lineMaterial = new LineBasicMaterial({ color, transparent: true, opacity: 0.4 });

    routes.forEach((route, index) => {
      const [aLat, aLon, bLat, bLon] = route;
      const start = this.toVector(aLat, aLon, this.radius);
      const end = this.toVector(bLat, bLon, this.radius);

      // Lift the control point by how far apart the endpoints are, so long
      // hops bow higher than short ones.
      const lift = 1 + start.distanceTo(end) * 0.38;
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(this.radius * lift);
      const curve = new QuadraticBezierCurve3(start, mid, end);

      const samples = curve.getPoints(60);
      const geometry = new BufferGeometry().setFromPoints(samples);
      group.add(new Line(geometry, lineMaterial));

      const traveller = new Points(
        new BufferGeometry().setAttribute('position', new Float32BufferAttribute([0, 0, 0], 3)),
        new PointsMaterial({
          color,
          size: 0.045,
          transparent: true,
          opacity: 0.95,
          blending: AdditiveBlending,
          depthWrite: false,
        })
      );
      group.add(traveller);

      travellers.push({
        points: traveller,
        curve,
        offset: index / routes.length,
        speed: 0.05 + (index % 3) * 0.012,
      });
    });

    return { group, travellers };
  }

  /** Perspective coordinate lattice receding under the horizon. */
  private buildLattice(color: Color): { points: Points; initialY: Float32Array } {
    const size = 10;
    const divisions = 28;
    const step = size / divisions;
    const positions: number[] = [];

    for (let i = 0; i <= divisions; i++) {
      const z = (i - divisions / 2) * step;
      for (let j = 0; j <= divisions; j++) {
        const x = (j - divisions / 2) * step;
        positions.push(x, -1.35, z);
      }
    }

    const geometry = new BufferGeometry();
    const posAttr = new Float32BufferAttribute(positions, 3);
    geometry.setAttribute('position', posAttr);

    const initialY = new Float32Array(positions.length / 3);
    for (let k = 0; k < initialY.length; k++) {
      initialY[k] = positions[k * 3 + 1];
    }

    const material = new PointsMaterial({
      color,
      size: 0.014,
      transparent: true,
      opacity: 0.25,
    });

    const points = new Points(geometry, material);
    return { points, initialY };
  }

  private toVector(lat: number, lon: number, r: number): Vector3 {
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((lon + 180) * Math.PI) / 180;
    return new Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  }

  // --- Loop ---------------------------------------------------------------

  private play(
    renderer: WebGLRenderer,
    scene: Scene,
    camera: PerspectiveCamera,
    world: Group,
    arcs: ReturnType<GlobeComponent['buildArcs']>,
    lattice: ReturnType<GlobeComponent['buildLattice']>
  ): void {
    if (this.frame || !this.visible || document.hidden) {
      return;
    }

    let last = performance.now();
    const step = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;

      this.velocity *= 0.94;
      this.spin += (this.dragging ? 0 : 0.055) * delta + this.velocity;
      world.rotation.y = this.spin;

      for (const t of arcs.travellers) {
        t.offset = (t.offset + t.speed * delta) % 1;
        const p = t.curve.getPoint(t.offset);
        const attr = t.points.geometry.getAttribute('position');
        attr.setXYZ(0, p.x, p.y, p.z);
        attr.needsUpdate = true;
      }

      // Animate horizon coordinate lattice
      const latticeAttr = lattice.points.geometry.getAttribute('position');
      const latticeCount = latticeAttr.count;
      const time = now * 0.0012;
      for (let i = 0; i < latticeCount; i++) {
        const x = latticeAttr.getX(i);
        const z = latticeAttr.getZ(i);
        const dist = Math.sqrt(x * x + z * z);
        const wave = Math.sin(dist * 1.6 - time) * 0.035;
        latticeAttr.setY(i, lattice.initialY[i] + wave);
      }
      latticeAttr.needsUpdate = true;

      renderer.render(scene, camera);
      this.frame = requestAnimationFrame(step);
    };

    this.frame = requestAnimationFrame(step);
  }

  private pause(): void {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
      this.frame = 0;
    }
  }

  // --- Interaction --------------------------------------------------------

  private attachDrag(canvas: HTMLCanvasElement): () => void {
    const onDown = (event: PointerEvent) => {
      this.dragging = true;
      this.lastX = event.clientX;
      canvas.classList.add('is-dragging');
      canvas.setPointerCapture(event.pointerId);
      this.audio.playClick();
      this.audio.playHum(160, 0.12);
    };

    const onMove = (event: PointerEvent) => {
      if (!this.dragging) {
        return;
      }
      const dx = event.clientX - this.lastX;
      this.lastX = event.clientX;
      this.velocity = dx * 0.0022;
      this.spin += this.velocity;
    };

    const onUp = (event: PointerEvent) => {
      this.dragging = false;
      canvas.classList.remove('is-dragging');
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
      this.audio.playHum(120, 0.08);
    };

    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);

    return () => {
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
    };
  }

  // --- Theme --------------------------------------------------------------

  private readPalette(): { brand: Color; dim: Color } {
    const styles = getComputedStyle(document.documentElement);
    const read = (name: string, fallback: string) =>
      new Color((styles.getPropertyValue(name) || fallback).trim());

    return {
      brand: read('--io-color-text-brand', '#ffd84d'),
      dim: read('--io-color-text-neutral-subtle', '#b3b3b4'),
    };
  }

  /** The globe is drawn from token values, so it has to follow the toggle. */
  private watchTheme(
    arcs: ReturnType<GlobeComponent['buildArcs']>,
    world: Group,
    lattice: ReturnType<GlobeComponent['buildLattice']>
  ): () => void {
    const observer = new MutationObserver(() => {
      const palette = this.readPalette();
      world.traverse((object) => {
        const material = (object as unknown as { material?: { color?: Color } }).material;
        if (!material?.color) {
          return;
        }
        material.color.copy(arcs.group.children.includes(object as never) ? palette.brand : palette.dim);
      });
      for (const t of arcs.travellers) {
        (t.points.material as PointsMaterial).color.copy(palette.brand);
      }
      (lattice.points.material as PointsMaterial).color.copy(palette.dim);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }
}
