import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-detail-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class BattlemapDetailImageComponent {
  @Input() public self: any
  @Input() public item: any
  constructor() { }
}
