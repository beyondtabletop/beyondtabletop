import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-detail-height',
  templateUrl: './height.component.html',
  styleUrls: ['./height.component.scss']
})
export class BattlemapDetailHeightComponent {
  @Input() public self: any
  @Input() public item: any
  constructor() { }
}
