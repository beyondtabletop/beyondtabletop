import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-power-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class Dnd5eOverviewPowerWizardComponent {
  @Input() public self: any
  @Input() public klass: any
  constructor() { }
}
