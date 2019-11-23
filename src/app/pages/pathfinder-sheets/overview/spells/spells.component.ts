import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-overview-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss']
})
export class PathfinderOverviewSpellsComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
