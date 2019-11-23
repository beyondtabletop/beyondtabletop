import { Component, Input } from '@angular/core';
import { DiceService } from 'src/app/services/dice.service';

@Component({
  selector: 'bt-dnd5e-overview-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.scss']
})
export class Dnd5eOverviewRestComponent {
  @Input() public self: any
  @Input() public block: any
  constructor(
    public diceSvc: DiceService
  ) { }
}
