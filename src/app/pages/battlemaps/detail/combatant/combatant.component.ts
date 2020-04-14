import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-detail-combatant',
  templateUrl: './combatant.component.html',
  styleUrls: ['./combatant.component.scss']
})
export class BattlemapDetailCombatantComponent {
  @Input() public self: any
  @Input() public item: any

  constructor() { }
}
