import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-power-sorcerer',
  templateUrl: './sorcerer.component.html',
  styleUrls: ['./sorcerer.component.scss']
})
export class Dnd5ePowerSorcererComponent {
  @Input() public self: any
  @Input() public klass: any
  constructor() { }
}
