import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-power-rogue',
  templateUrl: './rogue.component.html',
  styleUrls: ['./rogue.component.scss']
})
export class Dnd5eBuilderPowerRogueComponent {
  @Input() public self: any
  constructor() { }
}
