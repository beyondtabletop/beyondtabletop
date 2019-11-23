import { Component, Input } from '@angular/core';
import { DiceService } from 'src/app/services/dice.service';

@Component({
  selector: 'bt-dnd5e-tab-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class Dnd5eTabDiceComponent {
  @Input() public self: any
  constructor(
    public diceSvc: DiceService
  ) { }
}
