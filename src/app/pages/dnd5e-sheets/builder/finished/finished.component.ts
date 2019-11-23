import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss']
})
export class Dnd5eBuilderFinishedComponent {
  @Input() public self: any
  constructor() { }
}
