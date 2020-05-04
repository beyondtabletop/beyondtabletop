import { Component, Input } from '@angular/core';
import { BattlemapLayer } from 'src/app/models/battlemap/layer';

@Component({
  selector: 'bt-battlemap-detail-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class BattlemapDetailImageComponent {
  @Input() public self: any
  @Input() public item: any
  @Input() public layer: BattlemapLayer
  constructor() { }
}
