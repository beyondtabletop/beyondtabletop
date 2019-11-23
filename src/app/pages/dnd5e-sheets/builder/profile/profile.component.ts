import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class Dnd5eBuilderProfileComponent {
  @Input() public self: any
  constructor() { }
}
