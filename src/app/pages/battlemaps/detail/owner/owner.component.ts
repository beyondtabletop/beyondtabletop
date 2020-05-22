import { Component, Input } from '@angular/core';
import { BattlemapLayer } from 'src/app/models/battlemap/layer';

@Component({
  selector: 'bt-battlemap-detail-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class BattlemapDetailOwnerComponent {
  @Input() public self: any
  @Input() public item: any
  @Input() public layer: BattlemapLayer
  constructor() { }
}
