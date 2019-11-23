import { Component, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { BattlemapCombatant } from 'src/app/models/battlemap/combatant';
import { BattlemapToken } from 'src/app/models/battlemap/token';

@Component({
  selector: 'bt-battlemap-active-card',
  templateUrl: './active-card.component.html',
  styleUrls: ['./active-card.component.scss']
})
export class BattlemapActiveCardComponent {
  @Input() public self: any
  @Input() public token: BattlemapToken
  @Input() public combatant: BattlemapCombatant

  constructor(
    public store: StorageService
  ) { }

  setCombatantType(type: string) {
    this.combatant.type = type
    this.self.touch()
  }
}
