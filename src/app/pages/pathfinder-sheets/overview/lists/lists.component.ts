import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-overview-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class PathfinderOverviewListsComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
