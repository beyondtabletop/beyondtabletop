import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-power-fighter',
  templateUrl: './fighter.component.html',
  styleUrls: ['./fighter.component.scss']
})
export class Dnd5eOverviewPowerFighterComponent {
  @Input() public self: any
  @Input() public klass: any
  constructor() { }
}
