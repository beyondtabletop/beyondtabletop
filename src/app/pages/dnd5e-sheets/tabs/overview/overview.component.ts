import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-tab-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class Dnd5eTabOverviewComponent {
  @Input() public self: any
  constructor() { }
}
