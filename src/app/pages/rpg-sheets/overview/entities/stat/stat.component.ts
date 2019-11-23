import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-overview-entity-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class RpgOverviewEntityStatComponent {
  @Input() public self: any
  @Input() public entity: any
  constructor() { }
}
