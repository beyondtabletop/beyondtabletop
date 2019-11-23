import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-power-paladin',
  templateUrl: './paladin.component.html',
  styleUrls: ['./paladin.component.scss']
})
export class Dnd5eOverviewPowerPaladinComponent {
  @Input() public self: any
  @Input() public klass: any
  constructor() { }
}
