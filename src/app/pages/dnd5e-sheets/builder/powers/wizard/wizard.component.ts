import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-power-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class Dnd5eBuilderPowerWizardComponent {
  @Input() public self: any
  constructor() { }
}
