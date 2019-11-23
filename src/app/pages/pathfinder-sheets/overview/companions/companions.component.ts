import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-overview-companions',
  templateUrl: './companions.component.html',
  styleUrls: ['./companions.component.scss']
})
export class PathfinderOverviewCompanionsComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
