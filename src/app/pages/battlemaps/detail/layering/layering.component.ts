import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-detail-layering',
  templateUrl: './layering.component.html',
  styleUrls: ['./layering.component.scss']
})
export class BattlemapDetailLayeringComponent {
  @Input() public self: any
  @Input() public item: any
  constructor() { }
}
