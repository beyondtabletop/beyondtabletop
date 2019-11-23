import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-overview-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.scss']
})
export class PathfinderOverviewVitalsComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
