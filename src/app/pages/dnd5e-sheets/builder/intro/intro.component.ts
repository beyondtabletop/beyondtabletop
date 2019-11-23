import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class Dnd5eBuilderIntroComponent {
  @Input() public self: any
  constructor() { }
}
