import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-power-rogue',
  templateUrl: './rogue.component.html',
  styleUrls: ['./rogue.component.scss']
})
export class Dnd5ePowerRogueComponent {
  @Input() public self: any
  @Input() public klass: any
  constructor() { }
}
