import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-item-menu',
  template: `
    <nb-card [class]="type">
      <img [src]="icon" [alt]="title">

      <div class="details">
        <div class="title h5">{{ title }}</div>
      </div>
    </nb-card>
  `,
  styleUrls: ['./card-item-menu.component.scss']
})
export class CardItemMenuComponent implements OnInit {

  @Input() title: string;
  @Input() type: string;
  @Input() icon: string;

  constructor() { }

  ngOnInit(): void {
  }

}
