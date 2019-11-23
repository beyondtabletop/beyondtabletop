import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-overview-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class PathfinderOverviewSkillsComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
