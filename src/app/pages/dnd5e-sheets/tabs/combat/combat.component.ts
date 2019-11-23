import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-tab-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})
export class Dnd5eTabCombatComponent {
  @Input() public self: any
  constructor() { }
}
