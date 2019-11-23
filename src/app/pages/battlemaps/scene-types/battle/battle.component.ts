import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-scene-type-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattlemapSceneTypeBattleComponent{
  @Input() public self: any
  @Input() public scene: any
  constructor() { }
}
