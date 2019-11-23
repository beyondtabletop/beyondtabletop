import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-campaign-tab-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class CampaignTabSettingsComponent {
  @Input() public self: any
  constructor() { }
}
