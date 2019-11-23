import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-custom-stats',
  templateUrl: './custom-stats.component.html',
  styleUrls: ['./custom-stats.component.scss']
})
export class Dnd5eOverviewCustomStatsComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
