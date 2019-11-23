import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-tab-powers',
  templateUrl: './powers.component.html',
  styleUrls: ['./powers.component.scss']
})
export class Dnd5eTabPowersComponent {
  @Input() public self: any
  constructor() { }
}
