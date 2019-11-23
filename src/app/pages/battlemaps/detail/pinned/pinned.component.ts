import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-detail-pinned',
  templateUrl: './pinned.component.html',
  styleUrls: ['./pinned.component.scss']
})
export class BattlemapDetailPinnedComponent {
  @Input() public self: any
  @Input() public item: any
  constructor() { }
}
