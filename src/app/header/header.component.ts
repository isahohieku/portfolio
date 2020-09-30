import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hamburgerState = false;
  constructor() { }

  ngOnInit() {
  }

  toggleHamburger() {
    this.hamburgerState = !this.hamburgerState;
  }

}
