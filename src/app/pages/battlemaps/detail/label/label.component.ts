import { Component, Input } from '@angular/core';
import { BattlemapLayer } from 'src/app/models/battlemap/layer';

@Component({
  selector: 'bt-battlemap-detail-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class BattlemapDetailLabelComponent {
  @Input() public self: any
  @Input() public item: any
  @Input() public layer: BattlemapLayer
  constructor() { }
}
