import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-entity-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class RpgEntityCalculationComponent {
  @Input() public self: any
  @Input() public entity: any
  constructor() { }
}
