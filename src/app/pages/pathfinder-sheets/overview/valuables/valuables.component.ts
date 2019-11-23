import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-overview-valuables',
  templateUrl: './valuables.component.html',
  styleUrls: ['./valuables.component.scss']
})
export class PathfinderOverviewValuablesComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
