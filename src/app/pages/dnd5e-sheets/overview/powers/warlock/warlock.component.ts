import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-power-warlock',
  templateUrl: './warlock.component.html',
  styleUrls: ['./warlock.component.scss']
})
export class Dnd5eOverviewPowerWarlockComponent {
  @Input() public self: any
  @Input() public klass: any
  constructor() { }
}
