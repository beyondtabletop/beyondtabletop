import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-power-druid',
  templateUrl: './druid.component.html',
  styleUrls: ['./druid.component.scss']
})
export class Dnd5ePowerDruidComponent {
  @Input() public self: any
  @Input() public klass: any
  constructor() { }
}
