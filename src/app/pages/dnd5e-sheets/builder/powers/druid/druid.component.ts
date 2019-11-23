import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-power-druid',
  templateUrl: './druid.component.html',
  styleUrls: ['./druid.component.scss']
})
export class Dnd5eBuilderPowerDruidComponent {
  @Input() public self: any
  constructor() { }
}
