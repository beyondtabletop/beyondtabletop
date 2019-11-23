import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})

export class Dnd5eBuilderCharacterComponent {
  @Input() public self: any
  constructor() { }
}
