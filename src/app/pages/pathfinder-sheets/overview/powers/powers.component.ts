import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-overview-powers',
  templateUrl: './powers.component.html',
  styleUrls: ['./powers.component.scss']
})
export class PathfinderOverviewPowersComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
