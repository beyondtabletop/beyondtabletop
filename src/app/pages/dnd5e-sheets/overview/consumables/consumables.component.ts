import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-consumables',
  templateUrl: './consumables.component.html',
  styleUrls: ['./consumables.component.scss']
})
export class Dnd5eOverviewConsumablesComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
