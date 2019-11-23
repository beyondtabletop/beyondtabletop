import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-attacks',
  templateUrl: './attacks.component.html',
  styleUrls: ['./attacks.component.scss']
})
export class Dnd5eOverviewAttacksComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
