import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-power-rogue',
  templateUrl: './rogue.component.html',
  styleUrls: ['./rogue.component.scss']
})
export class Dnd5eOverviewPowerRogueComponent {
  @Input() public self: any
  @Input() public klass: any
  constructor() { }
}
