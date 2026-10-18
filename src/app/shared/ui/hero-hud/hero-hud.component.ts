import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-hero-hud',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="inline-flex flex-wrap items-center gap-3 rounded-full border border-subtle bg-surface-subtle/80 px-3.5 py-1.5 font-mono text-[11px] tracking-wider uppercase text-subtle backdrop-blur-md transition-colors"
      role="region"
      aria-label="System status telemetry">
      <!-- Live Status Pulse -->
      <span class="inline-flex items-center gap-1.5">
        <span class="relative flex h-2 w-2">
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-text opacity-75"></span>
          <span class="relative inline-flex h-2 w-2 rounded-full bg-brand-text"></span>
        </span>
        <span class="text-body font-semibold">SYS: OK</span>
      </span>

      <span class="text-subtle select-none" aria-hidden="true">&bull;</span>

      <!-- Coordinates & Location -->
      <span class="hidden sm:inline">LOC: 52.37&deg; N, 4.90&deg; E // AMS</span>
      <span class="inline sm:hidden">AMS // CET</span>

      <span class="text-subtle select-none" aria-hidden="true">&bull;</span>

      <!-- Audio Synthesizer Control -->
      <button
        type="button"
        (click)="audio.toggleMute()"
        [attr.aria-pressed]="!audio.isMuted()"
        class="inline-flex items-center gap-1 rounded-sm text-subtle hover:text-body focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-focus transition-colors cursor-pointer"
        data-cursor="Sound">
        @if (audio.isMuted()) {
          <span>AUDIO: OFF &#128263;</span>
        } @else {
          <span class="text-brand-text font-semibold">AUDIO: ON &#128266;</span>
        }
      </button>
    </div>
  `,
})
export class HeroHudComponent {
  readonly audio = inject(AudioService);
}
