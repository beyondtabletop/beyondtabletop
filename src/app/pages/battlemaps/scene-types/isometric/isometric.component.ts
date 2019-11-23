import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-scene-type-isometric',
  templateUrl: './isometric.component.html',
  styleUrls: ['./isometric.component.scss']
})
export class BattlemapSceneTypeIsometricComponent{
  @Input() public self: any
  @Input() public scene: any
  constructor() { }
}
