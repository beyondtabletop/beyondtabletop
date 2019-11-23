import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-shape-resizer',
  templateUrl: './shape-resizer.component.html',
  styleUrls: ['./shape-resizer.component.scss']
})
export class BattlemapShapeResizerComponent {
  @Input() public self: any
  @Input() public shape: any
  constructor() { }
}
