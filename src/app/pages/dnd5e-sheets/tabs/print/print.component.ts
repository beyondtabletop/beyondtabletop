import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-tab-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class Dnd5eTabPrintComponent {
  @Input() public self: any
  constructor() { }
}
