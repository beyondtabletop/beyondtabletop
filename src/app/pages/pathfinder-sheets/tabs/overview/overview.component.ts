import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-tab-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class PathfinderTabOverviewComponent {
  @Input() public self: any
  constructor() { }
}
