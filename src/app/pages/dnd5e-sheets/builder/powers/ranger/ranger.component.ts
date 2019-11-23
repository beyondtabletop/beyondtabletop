import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-power-ranger',
  templateUrl: './ranger.component.html',
  styleUrls: ['./ranger.component.scss']
})
export class Dnd5eBuilderPowerRangerComponent {
  @Input() public self: any
  constructor() { }
}
