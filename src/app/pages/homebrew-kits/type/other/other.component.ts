import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-homebrew-kit-type-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class HomebrewKitTypeOtherComponent {
  @Input() public self: any
  constructor() { }
}
