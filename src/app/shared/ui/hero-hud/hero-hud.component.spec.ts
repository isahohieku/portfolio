import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroHudComponent } from './hero-hud.component';
import { AudioService } from '../../services/audio.service';

describe('HeroHudComponent', () => {
  let component: HeroHudComponent;
  let fixture: ComponentFixture<HeroHudComponent>;
  let audioService: AudioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroHudComponent],
      providers: [AudioService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroHudComponent);
    component = fixture.componentInstance;
    audioService = TestBed.inject(AudioService);
    fixture.detectChanges();
  });

  it('renders system status and location indicator', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('SYS: OK');
    expect(text).toContain('AMS');
  });

  it('toggles audio service when audio button is clicked', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-pressed')).toBe('false');

    button.click();
    fixture.detectChanges();

    expect(audioService.isMuted()).toBe(false);
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });
});
