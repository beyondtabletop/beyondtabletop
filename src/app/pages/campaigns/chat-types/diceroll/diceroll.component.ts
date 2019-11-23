import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-campaign-chat-type-diceroll',
  templateUrl: './diceroll.component.html',
  styleUrls: ['./diceroll.component.scss']
})
export class CampaignChatTypeDicerollComponent {
  @Input() public self: any
  @Input() public chat: any
  constructor() { }
}
