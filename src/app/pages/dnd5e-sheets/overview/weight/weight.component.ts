import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class Dnd5eOverviewWeightComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
