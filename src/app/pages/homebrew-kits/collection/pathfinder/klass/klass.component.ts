import { Component, Input } from '@angular/core';
import { PathfinderKlass } from 'src/app/models/pathfinder/klass';

@Component({
  selector: 'bt-homebrew-kit-collection-pathfinder-klass',
  templateUrl: './klass.component.html',
  styleUrls: ['./klass.component.scss']
})
export class HomebrewKitCollectionPathfinderKlassComponent {
  @Input() public self: any
  @Input() public klass: PathfinderKlass
}
