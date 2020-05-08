import { BtBase } from '../common/base'

export class CampaignAudioCue extends BtBase {
  pos: number
  name: string
  src: string
  start_at: number
  audio_type: string
  loaded: boolean
  volume: number
  loop: boolean
  $player: any
  $volume: number
  $active: boolean

  getProto() {
    return {
      pos: 0,
      name: null,
      src: null,
      start_at: 0,
      audio_type: 'youtube',
      loaded: false,
      volume: 4,
      loop: true,
    }
  }
}
