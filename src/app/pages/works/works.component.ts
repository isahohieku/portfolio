import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';

@Component({
    selector: 'app-works',
    templateUrl: './works.component.html',
    styleUrls: ['./works.component.scss'],
    standalone: true,
    imports: [HeaderComponent]
})
export class WorksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
