import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-tab-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class Dnd5eTabSettingsComponent {
  @Input() public self: any
  constructor() { }
}
