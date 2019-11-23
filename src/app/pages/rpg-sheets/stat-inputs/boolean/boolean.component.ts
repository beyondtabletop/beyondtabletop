import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-stat-input-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.scss']
})
export class RpgStatInputBooleanComponent {
  @Input() public self: any
  @Input() public entity: any
  constructor() { }
}
