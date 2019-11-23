import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-power-paladin',
  templateUrl: './paladin.component.html',
  styleUrls: ['./paladin.component.scss']
})
export class Dnd5eBuilderPowerPaladinComponent {
  @Input() public self: any
  constructor() { }
}
