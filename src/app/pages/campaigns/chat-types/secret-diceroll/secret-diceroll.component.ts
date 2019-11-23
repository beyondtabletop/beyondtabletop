import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-campaign-chat-type-secret-diceroll',
  templateUrl: './secret-diceroll.component.html',
  styleUrls: ['./secret-diceroll.component.scss']
})
export class CampaignChatTypeSecretDicerollComponent {
  @Input() public self: any
  @Input() public chat: any
  constructor() { }
}
