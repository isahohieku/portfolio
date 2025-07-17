import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [NgClass]
})
export class HeaderComponent implements OnInit {

  hamburgerState = false;
  openSideMenu = false;

  constructor() { }

  ngOnInit() {
  }

  toggleHamburger() {
    this.hamburgerState = !this.hamburgerState;
  }

  setOpenSideMenu() {
    this.openSideMenu = !this.openSideMenu;
  }

}
