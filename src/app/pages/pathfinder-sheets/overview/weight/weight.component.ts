import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-overview-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class PathfinderOverviewWeightComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
