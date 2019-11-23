import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.scss']
})
export class Dnd5eOverviewVitalsComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
