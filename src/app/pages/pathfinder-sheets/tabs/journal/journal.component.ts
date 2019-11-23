import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-pathfinder-tab-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class PathfinderTabJournalComponent {
  @Input() public self: any
  constructor() { }
}
