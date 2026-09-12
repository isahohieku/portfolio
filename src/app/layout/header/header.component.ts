import { Component, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [NgClass, RouterLink]
})
export class HeaderComponent {

  hamburgerState = false;
  openSideMenu = false;

  toggleHamburger() {
    this.hamburgerState = !this.hamburgerState;

    // Prevent body scroll when menu is open (mobile only)
    if (this.hamburgerState) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }

  setOpenSideMenu() {
    this.openSideMenu = !this.openSideMenu;
  }

  // Close menu when clicking outside or pressing escape
  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.hamburgerState) {
      this.toggleHamburger();
    }
  }

  // Close menu on window resize to prevent layout issues
  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768 && this.hamburgerState) {
      this.toggleHamburger();
    }
  }
}
