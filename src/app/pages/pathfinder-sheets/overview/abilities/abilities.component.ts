import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-overview-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss']
})
export class PathfinderOverviewAbilitiesComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
