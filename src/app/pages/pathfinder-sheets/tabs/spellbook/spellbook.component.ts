import { Component, Input } from '@angular/core';
import { SheetService } from 'src/app/services/sheet.service';

@Component({
  selector: 'bt-pathfinder-tab-spellbook',
  templateUrl: './spellbook.component.html',
  styleUrls: ['./spellbook.component.scss']
})
export class PathfinderTabSpellbookComponent {
  @Input() public self: any
  constructor(
    public sheetSvc: SheetService
  ) { }
}
