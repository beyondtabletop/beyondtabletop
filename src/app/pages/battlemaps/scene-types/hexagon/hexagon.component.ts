import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-scene-type-hexagon',
  templateUrl: './hexagon.component.html',
  styleUrls: ['./hexagon.component.scss']
})
export class BattlemapSceneTypeHexagonComponent{
  @Input() public self: any
  @Input() public scene: any
  constructor() { }
}
