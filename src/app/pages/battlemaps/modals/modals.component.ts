import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class BattlemapModalsComponent {
  @Input() public self: any
  constructor() { }
}
