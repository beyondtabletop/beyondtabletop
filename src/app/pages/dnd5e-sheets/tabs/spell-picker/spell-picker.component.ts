import { Component, Input } from '@angular/core';
import { SheetService } from 'src/app/services/sheet.service';

@Component({
  selector: 'bt-dnd5e-tab-spell-picker',
  templateUrl: './spell-picker.component.html',
  styleUrls: ['./spell-picker.component.scss']
})
export class Dnd5eTabSpellPickerComponent {
  @Input() public self: any
  constructor(
    public sheetSvc: SheetService
  ) { }
}
