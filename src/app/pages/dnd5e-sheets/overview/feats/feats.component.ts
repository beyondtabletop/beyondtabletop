import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-feats',
  templateUrl: './feats.component.html',
  styleUrls: ['./feats.component.scss']
})
export class Dnd5eOverviewFeatsComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
