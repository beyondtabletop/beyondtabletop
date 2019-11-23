import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-tab-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class Dnd5eTabItemsComponent {
  @Input() public self: any
  constructor() { }
}
