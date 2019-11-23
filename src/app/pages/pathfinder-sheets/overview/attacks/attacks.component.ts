import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-overview-attacks',
  templateUrl: './attacks.component.html',
  styleUrls: ['./attacks.component.scss']
})
export class PathfinderOverviewAttacksComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
