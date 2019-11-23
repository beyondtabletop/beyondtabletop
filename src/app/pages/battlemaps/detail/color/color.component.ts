import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-detail-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class BattlemapDetailColorComponent {
  @Input() public self: any
  @Input() public item: any
  constructor() { }
}
