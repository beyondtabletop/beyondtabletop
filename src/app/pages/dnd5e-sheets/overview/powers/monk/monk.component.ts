import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-power-monk',
  templateUrl: './monk.component.html',
  styleUrls: ['./monk.component.scss']
})
export class Dnd5eOverviewPowerMonkComponent {
  @Input() public self: any
  @Input() public klass: any
  constructor() { }
}
