import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'bt-campaign-audio-type-ogg',
  templateUrl: './ogg.component.html',
  styleUrls: ['./ogg.component.scss']
})
export class CampaignAudioTypeOggComponent implements AfterViewInit {
  @Input() public self: any
  @Input() public cue: any

  ngAfterViewInit() {
    this.cue.$player = document.getElementById(this.cue.id)
    this.cue.$player.volume = ((this.cue.volume - 1) * this.self.locals.player.audio_mult) / 100
    this.cue.$player.currentTime = this.cue.start_at
  }
}
