import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-tab-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss']
})
export class PathfinderTabAbilitiesComponent {
  @Input() public self: any
  constructor() { }
}
