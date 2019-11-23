import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-scene-type-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class BattlemapSceneTypeOverviewComponent{
  @Input() public self: any
  @Input() public scene: any
  constructor() { }
}
