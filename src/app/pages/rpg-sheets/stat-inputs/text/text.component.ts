import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-stat-input-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class RpgStatInputTextComponent {
  @Input() public self: any
  @Input() public entity: any
  constructor() { }
}
