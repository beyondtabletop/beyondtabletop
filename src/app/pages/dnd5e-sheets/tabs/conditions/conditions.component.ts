import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-tab-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss']
})
export class Dnd5eTabConditionsComponent {
  @Input() public self: any
  constructor() { }
}
