import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-collectable-input-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.scss']
})
export class RpgCollectableInputFormulaComponent {
  @Input() public self: any
  @Input() public collectable: any
  @Input() public item: any
  @Input() public field: any
  constructor() { }
}
