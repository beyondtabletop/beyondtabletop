import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-builder-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class Dnd5eBuilderEquipmentComponent {
  @Input() public self: any
  constructor() { }
}
