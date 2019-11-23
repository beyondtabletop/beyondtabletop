import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-detail-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class BattlemapDetailSizeComponent {
  @Input() public self: any
  @Input() public item: any
  constructor() { }
}
