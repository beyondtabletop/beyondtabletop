import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-stat-input-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class RpgStatInputNumberComponent {
  @Input() public self: any
  @Input() public entity: any
  constructor() { }
}
