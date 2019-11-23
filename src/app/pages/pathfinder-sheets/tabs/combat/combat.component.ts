import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-tab-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})
export class PathfinderTabCombatComponent {
  @Input() public self: any
  constructor() { }
}
