import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-tab-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class PathfinderTabItemsComponent {
  @Input() public self: any
  constructor() { }
}
