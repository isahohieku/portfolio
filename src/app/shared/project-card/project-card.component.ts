import { Component, Input, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.scss'],
    standalone: true,
    imports: [NgStyle]
})
export class ProjectCardComponent implements OnInit {

  @Input() project: any;

  constructor() { }

  ngOnInit() {
  }

}
