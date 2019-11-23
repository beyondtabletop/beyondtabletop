import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-campaign-tab-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.scss']
})
export class CampaignTabAdventureComponent {
  @Input() public self: any
  constructor() { }
}
