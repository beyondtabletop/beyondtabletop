import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-collectable-input-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class RpgCollectableInputNumberComponent {
  @Input() public self: any
  @Input() public collectable: any
  @Input() public item: any
  @Input() public field: any
  constructor() { }
}
