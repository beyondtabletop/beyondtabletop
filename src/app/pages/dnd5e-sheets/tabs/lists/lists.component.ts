import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-tab-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class Dnd5eTabListsComponent {
  @Input() public self: any
  constructor() { }
}
