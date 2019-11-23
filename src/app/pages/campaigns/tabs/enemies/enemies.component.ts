import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-campaign-tab-enemies',
  templateUrl: './enemies.component.html',
  styleUrls: ['./enemies.component.scss']
})
export class CampaignTabEnemiesComponent {
  @Input() public self: any
  constructor() { }
}
