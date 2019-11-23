import { Component, Input } from '@angular/core';
import { PathfinderSpell } from 'src/app/models/pathfinder/spell';

@Component({
  selector: 'bt-homebrew-kit-collection-pathfinder-spell',
  templateUrl: './spell.component.html',
  styleUrls: ['./spell.component.scss']
})
export class HomebrewKitCollectionPathfinderSpellComponent {
  @Input() public self: any
  @Input() public spell: PathfinderSpell
}
