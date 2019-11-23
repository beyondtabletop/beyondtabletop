import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-overview-custom-stats',
  templateUrl: './custom-stats.component.html',
  styleUrls: ['./custom-stats.component.scss']
})
export class PathfinderOverviewCustomStatsComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
