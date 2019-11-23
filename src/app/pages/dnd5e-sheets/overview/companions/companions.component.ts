import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-companions',
  templateUrl: './companions.component.html',
  styleUrls: ['./companions.component.scss']
})
export class Dnd5eOverviewCompanionsComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
