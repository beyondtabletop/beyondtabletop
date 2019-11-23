import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-powers',
  templateUrl: './powers.component.html',
  styleUrls: ['./powers.component.scss']
})
export class Dnd5eOverviewPowersComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
