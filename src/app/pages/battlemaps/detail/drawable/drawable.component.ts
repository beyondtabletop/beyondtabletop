import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-detail-drawable',
  templateUrl: './drawable.component.html',
  styleUrls: ['./drawable.component.scss']
})
export class BattlemapDetailDrawableComponent {
  @Input() public self: any
  @Input() public item: any
  constructor() { }
}
