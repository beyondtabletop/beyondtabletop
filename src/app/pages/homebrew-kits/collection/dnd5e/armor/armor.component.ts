import { Component, Input } from '@angular/core';
import { Dnd5eArmor } from 'src/app/models/dnd5e/armor';

@Component({
  selector: 'bt-homebrew-kit-collection-dnd5e-armor',
  templateUrl: './armor.component.html',
  styleUrls: ['./armor.component.scss']
})
export class HomebrewKitCollectionDnd5eArmorComponent {
  @Input() public self: any
  @Input() public armor: Dnd5eArmor
  constructor() { }
}
