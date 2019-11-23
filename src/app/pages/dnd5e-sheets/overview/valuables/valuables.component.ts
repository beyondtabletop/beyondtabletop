import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-valuables',
  templateUrl: './valuables.component.html',
  styleUrls: ['./valuables.component.scss']
})
export class Dnd5eOverviewValuablesComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
