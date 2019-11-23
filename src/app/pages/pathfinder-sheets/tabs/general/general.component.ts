import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-tab-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class PathfinderTabGeneralComponent {
  @Input() public self: any
  constructor() { }
}
