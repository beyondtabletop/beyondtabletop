import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss']
})
export class SpellsComponent {
  @Input() public self: any
  constructor() { }
}
