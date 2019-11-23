import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-overview-entity-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss']
})
export class RpgOverviewEntityConditionComponent {
  @Input() public self: any
  @Input() public entity: any
  constructor() { }
}
