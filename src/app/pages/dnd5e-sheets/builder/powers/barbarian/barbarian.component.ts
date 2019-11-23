import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-power-barbarian',
  templateUrl: './barbarian.component.html',
  styleUrls: ['./barbarian.component.scss']
})
export class Dnd5eBuilderPowerBarbarianComponent {
  @Input() public self: any
  constructor() { }
}
