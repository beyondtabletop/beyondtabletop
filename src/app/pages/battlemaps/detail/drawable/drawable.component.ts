import { Component, Input } from '@angular/core';
import { BattlemapLayer } from 'src/app/models/battlemap/layer';

@Component({
  selector: 'bt-battlemap-detail-drawable',
  templateUrl: './drawable.component.html',
  styleUrls: ['./drawable.component.scss']
})
export class BattlemapDetailDrawableComponent {
  @Input() public self: any
  @Input() public item: any
  @Input() public layer: BattlemapLayer
  constructor() { }
}
