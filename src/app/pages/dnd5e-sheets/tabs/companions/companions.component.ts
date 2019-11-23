import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-tab-companions',
  templateUrl: './companions.component.html',
  styleUrls: ['./companions.component.scss']
})
export class Dnd5eTabCompanionsComponent {
  @Input() public self: any
  constructor() { }
}
