import { Component, Input } from '@angular/core';
import { Dnd5eFeat } from 'src/app/models/dnd5e/feat';

@Component({
  selector: 'bt-homebrew-kit-collection-dnd5e-invocation',
  templateUrl: './invocation.component.html',
  styleUrls: ['./invocation.component.scss']
})
export class HomebrewKitCollectionDnd5eInvocationComponent {
  @Input() public self: any
  @Input() public invocation: Dnd5eFeat
  constructor() { }
}
