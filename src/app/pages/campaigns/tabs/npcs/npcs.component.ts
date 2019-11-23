import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-campaign-tab-npcs',
  templateUrl: './npcs.component.html',
  styleUrls: ['./npcs.component.scss']
})
export class CampaignTabNpcsComponent {
  @Input() public self: any
  constructor() { }
}
