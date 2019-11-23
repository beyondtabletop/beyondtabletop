import { BtBase } from '../common/base'

export class CampaignQuest extends BtBase {
  pos: number
  name: string
  text: string
  origin: string
  reward: string
  started_at: string
  completed_at: string
  known: boolean

  getProto() {
    return {
      pos: 0,
      name: null,
      text: null,
      origin: null,
      reward: null,
      started_at: null,
      completed_at: null,
      known: false,
    }
  }
}
