import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-detail-obscure',
  templateUrl: './obscure.component.html',
  styleUrls: ['./obscure.component.scss']
})
export class BattlemapDetailObscureComponent {
  @Input() public self: any
  @Input() public item: any
  constructor() { }
}
