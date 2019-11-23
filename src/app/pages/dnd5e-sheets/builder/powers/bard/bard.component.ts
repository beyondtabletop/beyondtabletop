import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-power-bard',
  templateUrl: './bard.component.html',
  styleUrls: ['./bard.component.scss']
})
export class Dnd5eBuilderPowerBardComponent {
  @Input() public self: any
  constructor() { }
}
