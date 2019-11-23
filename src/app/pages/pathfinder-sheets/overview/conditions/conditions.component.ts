import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-overview-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss']
})
export class PathfinderOverviewConditionsComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
