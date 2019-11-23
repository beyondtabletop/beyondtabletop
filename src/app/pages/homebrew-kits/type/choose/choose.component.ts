import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-homebrew-kit-type-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.scss']
})
export class HomebrewKitTypeChooseComponent {
  @Input() public self: any
  constructor() { }
}
