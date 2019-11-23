import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss']
})
export class Dnd5eOverviewConditionsComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
