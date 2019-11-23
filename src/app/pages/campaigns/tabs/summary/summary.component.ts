import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-campaign-tab-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class CampaignTabSummaryComponent {
  @Input() public self: any
  constructor() { }
}
