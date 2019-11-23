import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-power-cleric',
  templateUrl: './cleric.component.html',
  styleUrls: ['./cleric.component.scss']
})
export class Dnd5eOverviewPowerClericComponent {
  @Input() public self: any
  @Input() public klass: any
  constructor() { }
}
