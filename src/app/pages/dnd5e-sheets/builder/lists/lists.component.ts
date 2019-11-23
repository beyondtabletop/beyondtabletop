import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class Dnd5eBuilderListsComponent {
  @Input() public self: any
  constructor() { }
}
