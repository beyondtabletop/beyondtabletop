import { Component, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'bt-campaign-tab-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.scss']
})
export class CampaignTabMonstersComponent {
  @Input() public self: any
  constructor(
    public store: StorageService
  ) { }

  monsterStyle(monster) {
    if (monster.image) {
      return {
        'background-image': `url(/assets/img/monsters/${ monster.image })`
      }
    }
  }
}
