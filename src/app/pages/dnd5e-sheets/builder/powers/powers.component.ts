import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-powers',
  templateUrl: './powers.component.html',
  styleUrls: ['./powers.component.scss']
})
export class Dnd5eBuilderPowersComponent {
  @Input() public self: any
  constructor() { }
}
