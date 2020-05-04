import { Component, Input } from '@angular/core';
import { BattlemapLayer } from 'src/app/models/battlemap/layer';

@Component({
  selector: 'bt-battlemap-detail-combatant',
  templateUrl: './combatant.component.html',
  styleUrls: ['./combatant.component.scss']
})
export class BattlemapDetailCombatantComponent {
  @Input() public self: any
  @Input() public item: any
  @Input() public layer: BattlemapLayer

  constructor() { }
}
