import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss']
})
export class Dnd5eOverviewAbilitiesComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
