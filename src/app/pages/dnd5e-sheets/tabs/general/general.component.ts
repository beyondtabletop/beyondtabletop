import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-tab-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class Dnd5eTabGeneralComponent {
  @Input() public self: any
  constructor() { }
}
