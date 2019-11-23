import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-overview-feats',
  templateUrl: './feats.component.html',
  styleUrls: ['./feats.component.scss']
})
export class PathfinderOverviewFeatsComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
