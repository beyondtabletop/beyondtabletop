import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-tab-upgrade',
  templateUrl: './tab-upgrade.component.html',
  styleUrls: ['./tab-upgrade.component.scss']
})

export class TabUpgradeComponent {
  @Input() public self: any
  constructor() {}
}
