import { Component, Input } from '@angular/core';
import { BattlemapLayer } from 'src/app/models/battlemap/layer';

@Component({
  selector: 'bt-battlemap-detail-layering',
  templateUrl: './layering.component.html',
  styleUrls: ['./layering.component.scss']
})
export class BattlemapDetailLayeringComponent {
  @Input() public self: any
  @Input() public item: any
  @Input() public layer: BattlemapLayer
  constructor() { }
}
