import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-entity-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss']
})
export class RpgEntityConditionComponent {
  @Input() public self: any
  @Input() public entity: any
  constructor() { }
}
