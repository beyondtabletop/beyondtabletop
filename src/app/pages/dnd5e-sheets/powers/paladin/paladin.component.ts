import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-power-paladin',
  templateUrl: './paladin.component.html',
  styleUrls: ['./paladin.component.scss']
})
export class Dnd5ePowerPaladinComponent {
  @Input() public self: any
  @Input() public klass: any
  constructor() { }
}
