import { Component, Input } from '@angular/core';
import { Dnd5eSpell } from 'src/app/models/dnd5e/spell';

@Component({
  selector: 'bt-homebrew-kit-collection-dnd5e-spell',
  templateUrl: './spell.component.html',
  styleUrls: ['./spell.component.scss']
})
export class HomebrewKitCollectionDnd5eSpellComponent {
  @Input() public self: any
  @Input() public spell: Dnd5eSpell
  constructor() { }
}
