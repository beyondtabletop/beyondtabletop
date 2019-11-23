import { Component, Input } from '@angular/core';
import { Dnd5eWeapon } from 'src/app/models/dnd5e/weapon';

@Component({
  selector: 'bt-homebrew-kit-collection-dnd5e-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss']
})
export class HomebrewKitCollectionDnd5eWeaponComponent {
  @Input() public self: any
  @Input() public weapon: Dnd5eWeapon
  constructor() { }

  getSpecialLabelForStat(weapon: Dnd5eWeapon) {
    return weapon.melee_or_ranged === 'Melee' ? 'Finesse?' : 'Thrown?'
  }
}
