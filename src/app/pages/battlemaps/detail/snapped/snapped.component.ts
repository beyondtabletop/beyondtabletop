import { Component, Input } from '@angular/core';
import { BattlemapLayer } from 'src/app/models/battlemap/layer';

@Component({
  selector: 'bt-battlemap-detail-snapped',
  templateUrl: './snapped.component.html',
  styleUrls: ['./snapped.component.scss']
})
export class BattlemapDetailSnappedComponent {
  @Input() public self: any
  @Input() public item: any
  @Input() public layer: BattlemapLayer
  constructor() { }
}
