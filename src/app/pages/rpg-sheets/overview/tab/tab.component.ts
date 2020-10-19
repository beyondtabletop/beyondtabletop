import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-overview-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class RpgOverviewTabComponent {
  @Input() public self: any
  @Input() public tab: any
  constructor() { }
}
