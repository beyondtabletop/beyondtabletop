import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-battlemap-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class BattlemapContextMenuComponent {
  @Input() public self: any
  constructor() { }
}
