import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-power-bard',
  templateUrl: './bard.component.html',
  styleUrls: ['./bard.component.scss']
})
export class Dnd5eOverviewPowerBardComponent {
  @Input() public self: any
  @Input() public klass: any
  constructor() { }
}
