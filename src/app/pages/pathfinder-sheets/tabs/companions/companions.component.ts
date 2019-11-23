import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-tab-companions',
  templateUrl: './companions.component.html',
  styleUrls: ['./companions.component.scss']
})
export class PathfinderTabCompanionsComponent {
  @Input() public self: any
  constructor() { }
}
