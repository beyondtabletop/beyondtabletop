import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-overview-collectable-type-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.scss']
})
export class RpgOverviewCollectableTypeBooleanComponent {
  @Input() public self: any
  @Input() public collectable: any
  @Input() public item: any
  @Input() public field: any
  constructor() { }
}
