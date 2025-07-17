import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-under-construction',
    templateUrl: './under-construction.component.html',
    styleUrls: ['./under-construction.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class UnderConstructionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
