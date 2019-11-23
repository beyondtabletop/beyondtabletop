import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-tab-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class Dnd5eTabEquipmentComponent {
  @Input() public self: any
  constructor() { }
}
