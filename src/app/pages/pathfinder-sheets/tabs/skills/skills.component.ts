import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-tab-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class PathfinderTabSkillsComponent {
  @Input() public self: any
  constructor() { }
}
