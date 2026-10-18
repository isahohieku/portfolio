import { TestBed } from '@angular/core/testing';
import { AudioService } from './audio.service';

describe('AudioService', () => {
  let service: AudioService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [AudioService] });
    service = TestBed.inject(AudioService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('initializes muted by default', () => {
    expect(service.isMuted()).toBe(true);
  });

  it('toggles mute state and saves preference to localStorage', () => {
    service.toggleMute();
    expect(service.isMuted()).toBe(false);
    expect(localStorage.getItem('io-sound-enabled')).toBe('true');

    service.toggleMute();
    expect(service.isMuted()).toBe(true);
    expect(localStorage.getItem('io-sound-enabled')).toBe('false');
  });

  it('safely handles playClick, playScrambleTick and playHum when muted without throwing', () => {
    expect(() => {
      service.playClick();
      service.playScrambleTick();
      service.playHum();
    }).not.toThrow();
  });
});
