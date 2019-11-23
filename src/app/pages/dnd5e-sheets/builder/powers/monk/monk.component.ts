import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-power-monk',
  templateUrl: './monk.component.html',
  styleUrls: ['./monk.component.scss']
})
export class Dnd5eBuilderPowerMonkComponent {
  @Input() public self: any
  constructor() { }
}
