import { Component, Input } from '@angular/core';
import { BattlemapLayer } from 'src/app/models/battlemap/layer';

@Component({
  selector: 'bt-battlemap-detail-damage',
  templateUrl: './damage.component.html',
  styleUrls: ['./damage.component.scss']
})
export class BattlemapDetailDamageComponent {
  @Input() public self: any
  @Input() public item: any
  @Input() public layer: BattlemapLayer
  constructor() { }
}
