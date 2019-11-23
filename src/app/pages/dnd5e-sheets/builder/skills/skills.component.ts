import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class Dnd5eBuilderSkillsComponent {
  @Input() public self: any
  constructor() { }
}
