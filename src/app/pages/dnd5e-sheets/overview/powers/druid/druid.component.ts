import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-power-druid',
  templateUrl: './druid.component.html',
  styleUrls: ['./druid.component.scss']
})
export class Dnd5eOverviewPowerDruidComponent {
  @Input() public self: any
  @Input() public klass: any
  constructor() { }
}
