import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-klass',
  templateUrl: './klass.component.html',
  styleUrls: ['./klass.component.scss']
})
export class Dnd5eBuilderKlassComponent {
  @Input() public self: any
  constructor() { }
}
