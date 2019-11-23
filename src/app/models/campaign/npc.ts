import { BtBase } from '../common/base'
import { CampaignNpcDetail } from './npc-detail'

export class CampaignNpc extends BtBase {
  pos: number
  name: string
  image: string
  known: boolean
  details: CampaignNpcDetail[]

  getProto() {
    return {
      pos: 0,
      name: null,
      image: null,
      known: false,
      details: [
        new CampaignNpcDetail({ pos: 0, name: 'STR', value: 10, group: 'abilities' }),
        new CampaignNpcDetail({ pos: 1, name: 'DEX', value: 10, group: 'abilities' }),
        new CampaignNpcDetail({ pos: 2, name: 'CON', value: 10, group: 'abilities' }),
        new CampaignNpcDetail({ pos: 3, name: 'INT', value: 10, group: 'abilities' }),
        new CampaignNpcDetail({ pos: 4, name: 'WIS', value: 10, group: 'abilities' }),
        new CampaignNpcDetail({ pos: 5, name: 'CHA', value: 10, group: 'abilities' }),
        new CampaignNpcDetail({ pos: 0, name: 'Appearance', group: 'basic', known: true }),
        new CampaignNpcDetail({ pos: 1, name: 'Occupation', group: 'basic', known: true }),
        new CampaignNpcDetail({ pos: 2, name: 'History', group: 'basic' }),
        new CampaignNpcDetail({ pos: 4, name: 'Talent', group: 'basic' }),
        new CampaignNpcDetail({ pos: 5, name: 'Mannerism', group: 'basic', known: true }),
        new CampaignNpcDetail({ pos: 6, name: 'Interactions', group: 'basic' }),
        new CampaignNpcDetail({ pos: 7, name: 'Knowledge', group: 'basic' }),
        new CampaignNpcDetail({ pos: 8, name: 'Ideal', group: 'basic' }),
        new CampaignNpcDetail({ pos: 9, name: 'Bond', group: 'basic' }),
        new CampaignNpcDetail({ pos: 10, name: 'Flaw', group: 'basic' }),
      ]
    }
  }
}
