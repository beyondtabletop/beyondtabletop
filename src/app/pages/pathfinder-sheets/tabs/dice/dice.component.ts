import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-tab-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class PathfinderTabDiceComponent {
  @Input() public self: any
  constructor() { }
}
