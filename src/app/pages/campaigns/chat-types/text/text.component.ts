import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-campaign-chat-type-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class CampaignChatTypeTextComponent {
  @Input() public self: any
  @Input() public chat: any
  constructor() { }
}
