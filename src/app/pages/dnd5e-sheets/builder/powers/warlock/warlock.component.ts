import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-power-warlock',
  templateUrl: './warlock.component.html',
  styleUrls: ['./warlock.component.scss']
})
export class Dnd5eBuilderPowerWarlockComponent {
  @Input() public self: any
  constructor() { }
}
