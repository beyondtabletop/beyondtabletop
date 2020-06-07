import { Component, Input } from '@angular/core';
import { CampaignAudioCue } from 'src/app/models/campaign/audio-cue';

@Component({
  selector: 'bt-campaign-audio-type-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class CampaignAudioTypeYoutubeComponent {
  @Input() public self: any
  @Input() public cue: CampaignAudioCue
  player: any

  constructor() { }

  savePlayer(player: any) {
    this.player = player
    this.cue.$player = player
    this.player.setVolume((this.cue.volume - 1) * this.self.locals.player.audio_mult)
    if (this.cue.start_at && this.cue.start_at > 0) {
      this.player.seekTo(this.cue.start_at, true)
    }
    this.player.playVideo()
  }

  onStateChange(event) {
    if (event.data === 0 && this.cue.loop) {
      if (this.cue.start_at && this.cue.start_at > 0) {
        this.player.seekTo(this.cue.start_at, true)
      }
      this.player.playVideo()
    }
  }
}
