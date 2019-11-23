import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-power-cleric',
  templateUrl: './cleric.component.html',
  styleUrls: ['./cleric.component.scss']
})
export class Dnd5eBuilderPowerClericComponent {
  @Input() public self: any
  constructor() { }
}
