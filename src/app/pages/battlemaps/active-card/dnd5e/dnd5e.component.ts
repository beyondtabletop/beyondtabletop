import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-active-card-dnd5e',
  templateUrl: './dnd5e.component.html',
  styleUrls: ['./dnd5e.component.scss']
})
export class BattlemapActiveCardDnd5eComponent {
  @Input() public self: any
  @Input() public sheet: any
  constructor() { }
}
