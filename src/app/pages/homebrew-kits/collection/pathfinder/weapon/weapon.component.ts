import { Component, Input } from '@angular/core';
import { PathfinderWeapon } from 'src/app/models/pathfinder/weapon';

@Component({
  selector: 'bt-homebrew-kit-collection-pathfinder-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss']
})
export class HomebrewKitCollectionPathfinderWeaponComponent {
  @Input() public self: any
  @Input() public weapon: PathfinderWeapon
}
