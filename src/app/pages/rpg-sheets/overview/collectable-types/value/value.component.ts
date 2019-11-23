import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-overview-collectable-type-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.scss']
})
export class RpgOverviewCollectableTypeValueComponent {
  @Input() public self: any
  @Input() public collectable: any
  @Input() public item: any
  @Input() public field: any
  constructor() { }
}
