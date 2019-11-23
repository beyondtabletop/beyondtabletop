import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-power-ranger',
  templateUrl: './ranger.component.html',
  styleUrls: ['./ranger.component.scss']
})
export class Dnd5eOverviewPowerRangerComponent {
  @Input() public self: any
  @Input() public klass: any
  constructor() { }
}
