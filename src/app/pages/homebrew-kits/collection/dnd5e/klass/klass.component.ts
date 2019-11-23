import { Component, Input } from '@angular/core';
import { HomebrewKitDnd5eKlass } from 'src/app/models/homebrew-kits/klass';

@Component({
  selector: 'bt-homebrew-kit-collection-dnd5e-klass',
  templateUrl: './klass.component.html',
  styleUrls: ['./klass.component.scss']
})
export class HomebrewKitCollectionDnd5eKlassComponent {
  @Input() public self: any
  @Input() public klass: HomebrewKitDnd5eKlass
  constructor() { }
}
