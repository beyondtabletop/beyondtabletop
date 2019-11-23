import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class Dnd5eBuilderRaceComponent {
  @Input() public self: any
  constructor() { }
}
