import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-overview-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class Dnd5eOverviewListsComponent {
  @Input() public self: any
  @Input() public block: any
  constructor() { }
}
