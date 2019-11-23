import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-entity-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class RpgEntityCollectionComponent {
  @Input() public self: any
  @Input() public entity: any
  constructor() { }
}
