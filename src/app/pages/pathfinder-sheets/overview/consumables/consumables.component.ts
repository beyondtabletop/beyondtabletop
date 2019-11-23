import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-overview-consumables',
  templateUrl: './consumables.component.html',
  styleUrls: ['./consumables.component.scss']
})
export class PathfinderOverviewConsumablesComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
