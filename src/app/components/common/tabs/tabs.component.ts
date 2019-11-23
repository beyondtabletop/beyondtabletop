import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})

export class TabsComponent {
  @Input() public self: any
  constructor() {}
}
