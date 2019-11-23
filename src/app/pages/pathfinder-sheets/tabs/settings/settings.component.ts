import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-tab-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class PathfinderTabSettingsComponent {
  @Input() public self: any
  constructor() { }
}
