import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-tab-feats',
  templateUrl: './feats.component.html',
  styleUrls: ['./feats.component.scss']
})
export class PathfinderTabFeatsComponent {
  @Input() public self: any
  constructor() { }
}
