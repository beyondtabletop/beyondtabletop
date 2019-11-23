import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-detail-fog',
  templateUrl: './fog.component.html',
  styleUrls: ['./fog.component.scss']
})
export class BattlemapDetailFogComponent {
  @Input() public self: any
  @Input() public item: any
  constructor() { }
}
