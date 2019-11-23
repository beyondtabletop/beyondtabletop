import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-detail-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})
export class BattlemapDetailCombatComponent {
  @Input() public self: any
  @Input() public item: any
  constructor() { }
}
