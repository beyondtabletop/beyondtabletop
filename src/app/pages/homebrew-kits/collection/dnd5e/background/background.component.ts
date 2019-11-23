import { Component, Input } from '@angular/core';
import { HomebrewKitDnd5eBackground } from 'src/app/models/homebrew-kits/background';
import { BtText } from 'src/app/models/common/text';
import { SheetService } from 'src/app/services/sheet.service';
import { BtList } from 'src/app/models/common/list';
import { BtNote } from 'src/app/models/common/note';

@Component({
  selector: 'bt-homebrew-kit-collection-dnd5e-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class HomebrewKitCollectionDnd5eBackgroundComponent {
  @Input() public self: any
  @Input() public background: HomebrewKitDnd5eBackground
  constructor(
    private sheetSvc: SheetService
  ) { }

  public lists = [
    { db: 'traits', label: "Trait", plural: "Traits" },
    { db: 'ideals', label: "Ideal", plural: "Ideals" },
    { db: 'bonds', label: "Bond", plural: "Bonds" },
    { db: 'flaws', label: "Flaw", plural: "Flaws" },
    { db: 'specialties', label: "Specialty", plural: "Specialties" },
  ]

  addItem(slug: string) {
    this.self.methods.$add(this.background, slug, BtText)
  }

  addListItem(list: BtList) {
    this.self.methods.$add(list, 'items', BtNote)
  }

  removeItem(array: BtText[], item: BtText) {
    this.self.methods.$nestedRemove(array, item)
  }

  listItems(array: any[]) {
    return this.self.methods.$list(array)
  }
}
