import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-collectable-input-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.scss']
})
export class RpgCollectableInputBooleanComponent {
  @Input() public self: any
  @Input() public collectable: any
  @Input() public item: any
  @Input() public field: any
  constructor() { }
}
