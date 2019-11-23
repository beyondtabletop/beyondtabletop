import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-stat-input-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class RpgStatInputSelectComponent {
  @Input() public self: any
  @Input() public entity: any
  constructor() { }
}
