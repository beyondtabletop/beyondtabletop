import { Component, Input } from '@angular/core';
import { BattlemapLayer } from 'src/app/models/battlemap/layer';

@Component({
  selector: 'bt-battlemap-detail-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})
export class BattlemapDetailCombatComponent {
  @Input() public self: any
  @Input() public item: any
  @Input() public layer: BattlemapLayer
  constructor() { }
}
