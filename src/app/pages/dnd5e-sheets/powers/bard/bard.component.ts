import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-power-bard',
  templateUrl: './bard.component.html',
  styleUrls: ['./bard.component.scss']
})
export class Dnd5ePowerBardComponent {
  @Input() public self: any
  @Input() public klass: any
  constructor() { }
}
