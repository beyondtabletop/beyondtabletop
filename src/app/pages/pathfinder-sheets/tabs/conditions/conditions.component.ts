import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-tab-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss']
})
export class PathfinderTabConditionsComponent {
  @Input() public self: any
  constructor() { }
}
