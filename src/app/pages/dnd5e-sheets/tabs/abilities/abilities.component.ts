import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-tab-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss']
})
export class Dnd5eTabAbilitiesComponent {
  @Input() public self: any
  constructor() { }
}
