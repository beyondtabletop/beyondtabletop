import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-rpg-overview-entity-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class RpgOverviewEntityCollectionComponent {
  @Input() public self: any
  @Input() public entity: any
  constructor() { }
}
