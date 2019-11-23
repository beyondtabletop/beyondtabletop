import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-campaign-tab-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class CampaignTabListsComponent {
  @Input() public self: any
  constructor() { }
}
