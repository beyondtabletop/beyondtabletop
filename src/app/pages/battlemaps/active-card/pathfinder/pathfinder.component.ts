import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-active-card-pathfinder',
  templateUrl: './pathfinder.component.html',
  styleUrls: ['./pathfinder.component.scss']
})
export class BattlemapActiveCardPathfinderComponent {
  @Input() public self: any
  @Input() public sheet: any
  constructor() { }
}
