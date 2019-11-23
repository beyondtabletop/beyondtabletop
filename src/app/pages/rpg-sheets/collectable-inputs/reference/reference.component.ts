import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-collectable-input-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss']
})
export class RpgCollectableInputReferenceComponent {
  @Input() public self: any
  @Input() public collectable: any
  @Input() public item: any
  @Input() public field: any
  constructor() { }
}
