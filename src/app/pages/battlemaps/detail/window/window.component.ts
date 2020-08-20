import { Component, Input } from '@angular/core';
import { BattlemapLayer } from 'src/app/models/battlemap/layer';

@Component({
  selector: 'bt-battlemap-detail-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class BattlemapDetailWindowComponent {
  @Input() public self: any
  @Input() public item: any
  @Input() public layer: BattlemapLayer
  constructor() { }
}
