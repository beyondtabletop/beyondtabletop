import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-detail-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class BattlemapDetailRoundComponent {
  @Input() public self: any
  @Input() public item: any
  constructor() { }
}
