import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-power-fighter',
  templateUrl: './fighter.component.html',
  styleUrls: ['./fighter.component.scss']
})
export class Dnd5eBuilderPowerFighterComponent {
  @Input() public self: any
  constructor() { }
}
