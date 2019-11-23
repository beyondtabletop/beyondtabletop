import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-dnd5e-tab-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class Dnd5eTabJournalComponent {
  @Input() public self: any
  constructor() { }
}
