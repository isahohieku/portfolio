import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  // Signal-based loading state for modern Angular
  public isLoading = signal(false);

  show() {
    this.loadingSubject.next(true);
    this.isLoading.set(true);
  }

  hide() {
    this.loadingSubject.next(false);
    this.isLoading.set(false);
  }

  toggle() {
    const current = this.loadingSubject.value;
    this.loadingSubject.next(!current);
    this.isLoading.set(!current);
  }
}
