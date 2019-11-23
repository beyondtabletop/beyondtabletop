import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-detail-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class BattlemapDetailStatusComponent {
  @Input() public self: any
  @Input() public item: any
  constructor() { }
}
