import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-collectable-input-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class RpgCollectableInputTextareaComponent {
  @Input() public self: any
  @Input() public collectable: any
  @Input() public item: any
  @Input() public field: any
  constructor() { }
}
