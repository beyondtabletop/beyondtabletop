import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-stat-input-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class RpgStatInputTextareaComponent {
  @Input() public self: any
  @Input() public entity: any
  constructor() { }
}
