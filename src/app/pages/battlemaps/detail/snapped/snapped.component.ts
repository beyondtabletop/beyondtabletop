import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-detail-snapped',
  templateUrl: './snapped.component.html',
  styleUrls: ['./snapped.component.scss']
})
export class BattlemapDetailSnappedComponent {
  @Input() public self: any
  @Input() public item: any
  constructor() { }
}
