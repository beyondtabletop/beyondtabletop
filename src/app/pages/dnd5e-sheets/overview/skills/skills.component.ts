import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class Dnd5eOverviewSkillsComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
