import { Component, Input } from '@angular/core';
import { BattlemapScene } from 'src/app/models/battlemap/scene';
import { BattlemapToken } from 'src/app/models/battlemap/token';
import { BattlemapCombatant } from 'src/app/models/battlemap/combatant';

@Component({
  selector: 'bt-battlemap-combatant',
  templateUrl: './combatant.component.html',
  styleUrls: ['./combatant.component.scss']
})
export class BattlemapCombatantComponent {
  @Input() public self: any
  @Input() public token: BattlemapToken
  @Input() public combatant: BattlemapCombatant
  constructor() { }

  removeCombatant() {
    this.self.methods.removeByObject(this.self.model.combatants, this.combatant)
    this.self.touch()
  }
}
