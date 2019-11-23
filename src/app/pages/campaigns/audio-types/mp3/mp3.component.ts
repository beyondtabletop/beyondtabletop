import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'bt-campaign-audio-type-mp3',
  templateUrl: './mp3.component.html',
  styleUrls: ['./mp3.component.scss']
})
export class CampaignAudioTypeMp3Component implements AfterViewInit {
  @Input() public self: any
  @Input() public cue: any

  ngAfterViewInit() {
    this.cue.$player = document.getElementById(this.cue.id)
    this.cue.$player.volume = ((this.cue.volume - 1) * this.self.locals.audio_mult) / 100
    this.cue.$player.currentTime = this.cue.start_at
  }
}
