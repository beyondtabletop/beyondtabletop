import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt-campaign-chat-type-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss']
})
export class CampaignChatTypeHtmlComponent {
  @Input() public self: any
  @Input() public chat: any
  constructor() { }
}
