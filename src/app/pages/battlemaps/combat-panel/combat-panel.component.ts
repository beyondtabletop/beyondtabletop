import { Component, Input } from '@angular/core';
import { BattlemapScene } from 'src/app/models/battlemap/scene';

@Component({
  selector: 'bt-battlemap-combat-panel',
  templateUrl: './combat-panel.component.html',
  styleUrls: ['./combat-panel.component.scss']
})
export class BattlemapCombatPanelComponent {
  @Input() public self: any
  @Input() public scene: BattlemapScene
  constructor() { }

  setCombatStatus(status: string): void {
    this.scene.combat.status = status
    this.self.touch()
  }
}
