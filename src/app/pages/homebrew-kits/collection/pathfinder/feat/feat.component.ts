import { Component, Input } from '@angular/core';
import { PathfinderFeat } from 'src/app/models/pathfinder/feat';

@Component({
  selector: 'bt-homebrew-kit-collection-pathfinder-feat',
  templateUrl: './feat.component.html',
  styleUrls: ['./feat.component.scss']
})
export class HomebrewKitCollectionPathfinderFeatComponent {
  @Input() public self: any
  @Input() public feat: PathfinderFeat
}
