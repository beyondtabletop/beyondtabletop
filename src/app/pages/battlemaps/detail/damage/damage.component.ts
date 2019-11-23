import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-detail-damage',
  templateUrl: './damage.component.html',
  styleUrls: ['./damage.component.scss']
})
export class BattlemapDetailDamageComponent {
  @Input() public self: any
  @Input() public item: any
  constructor() { }
}
