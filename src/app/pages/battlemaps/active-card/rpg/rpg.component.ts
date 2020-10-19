import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-active-card-rpg',
  templateUrl: './rpg.component.html',
  styleUrls: ['./rpg.component.scss']
})
export class BattlemapActiveCardRpgComponent {
  @Input() public self: any
  @Input() public sheet: any

  constructor() { }
}
