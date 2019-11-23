import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-detail-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class BattlemapDetailTileComponent {
  @Input() public self: any
  @Input() public item: any
  constructor() { }
}
