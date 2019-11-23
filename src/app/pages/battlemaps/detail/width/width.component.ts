import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-detail-width',
  templateUrl: './width.component.html',
  styleUrls: ['./width.component.scss']
})
export class BattlemapDetailWidthComponent {
  @Input() public self: any
  @Input() public item: any
  constructor() { }
}
