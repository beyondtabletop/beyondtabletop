import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-entity-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class RpgEntityStatComponent {
  @Input() public self: any
  @Input() public entity: any
  constructor() { }
}
