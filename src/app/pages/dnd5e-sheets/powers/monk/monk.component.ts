import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-power-monk',
  templateUrl: './monk.component.html',
  styleUrls: ['./monk.component.scss']
})
export class Dnd5ePowerMonkComponent {
  @Input() public self: any
  @Input() public klass: any
  constructor() { }
}
