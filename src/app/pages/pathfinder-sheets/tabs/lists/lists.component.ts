import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-tab-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class PathfinderTabListsComponent {
  @Input() public self: any
  constructor() { }
}
