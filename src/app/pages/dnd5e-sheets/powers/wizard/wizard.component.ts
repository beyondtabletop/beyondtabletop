import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-power-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class Dnd5ePowerWizardComponent {
  @Input() public self: any
  @Input() public klass: any
  constructor() { }
}
