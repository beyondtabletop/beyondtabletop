import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-tab-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class Dnd5eTabBuilderComponent {
  @Input() public self: any
  constructor() { }
}
