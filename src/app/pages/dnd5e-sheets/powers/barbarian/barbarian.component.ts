import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-power-barbarian',
  templateUrl: './barbarian.component.html',
  styleUrls: ['./barbarian.component.scss']
})
export class Dnd5ePowerBarbarianComponent {
  @Input() public self: any
  @Input() public klass: any
  constructor() { }
}
