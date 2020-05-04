import { Component, Input } from '@angular/core';
import { BattlemapLayer } from 'src/app/models/battlemap/layer';

@Component({
  selector: 'bt-battlemap-detail-fog',
  templateUrl: './fog.component.html',
  styleUrls: ['./fog.component.scss']
})
export class BattlemapDetailFogComponent {
  @Input() public self: any
  @Input() public item: any
  @Input() public layer: BattlemapLayer
  constructor() { }
}
