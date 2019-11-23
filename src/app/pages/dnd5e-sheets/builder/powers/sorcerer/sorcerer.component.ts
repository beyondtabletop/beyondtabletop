import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-power-sorcerer',
  templateUrl: './sorcerer.component.html',
  styleUrls: ['./sorcerer.component.scss']
})
export class Dnd5eBuilderPowerSorcererComponent {
  @Input() public self: any
  constructor() { }
}
