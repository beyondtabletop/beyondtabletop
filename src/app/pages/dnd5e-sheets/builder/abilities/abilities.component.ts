import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss']
})
export class Dnd5eBuilderAbilitiesComponent {
  @Input() public self: any
  constructor() { }
}
