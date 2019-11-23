import { Component, Input } from '@angular/core';
import { PathfinderArmor } from 'src/app/models/pathfinder/armor';

@Component({
  selector: 'bt-homebrew-kit-collection-pathfinder-armor',
  templateUrl: './armor.component.html',
  styleUrls: ['./armor.component.scss']
})
export class HomebrewKitCollectionPathfinderArmorComponent {
  @Input() public self: any
  @Input() public armor: PathfinderArmor
}
