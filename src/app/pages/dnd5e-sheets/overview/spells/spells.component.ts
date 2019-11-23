import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss']
})
export class Dnd5eOverviewSpellsComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
