import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-tab-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class PathfinderTabEquipmentComponent {
  @Input() public self: any
  constructor() { }
}
