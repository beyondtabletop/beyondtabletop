import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-collectable-input-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class RpgCollectableInputTextComponent {
  @Input() public self: any
  @Input() public collectable: any
  @Input() public item: any
  @Input() public field: any
  constructor() { }
}
