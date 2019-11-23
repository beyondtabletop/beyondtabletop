import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-campaign-tab-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class CampaignTabAudioComponent {
  @Input() public self: any
  constructor() { }
}
