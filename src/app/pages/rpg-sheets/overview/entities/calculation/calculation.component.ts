import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-overview-entity-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class RpgOverviewEntityCalculationComponent {
  @Input() public self: any
  @Input() public entity: any
  constructor() { }
}
