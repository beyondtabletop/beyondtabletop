import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-detail-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class BattlemapDetailLabelComponent {
  @Input() public self: any
  @Input() public item: any
  constructor() { }
}
