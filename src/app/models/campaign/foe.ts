import { BtBase } from '../common/base'
import { CampaignNpcDetail } from './npc-detail'

export class CampaignFoe extends BtBase {
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
        new CampaignNpcDetail({ pos: 0, name: 'AC', value: 10, group: 'combat_num' }),
        new CampaignNpcDetail({ pos: 1, name: 'HP', value: 0, group: 'combat_num' }),
        new CampaignNpcDetail({ pos: 2, name: 'Speed', value: 30, group: 'combat_num' }),
        new CampaignNpcDetail({ pos: 4, name: 'Skills', group: 'combat_text' }),
        new CampaignNpcDetail({ pos: 5, name: 'Senses', group: 'combat_text' }),
        new CampaignNpcDetail({ pos: 6, name: 'Languages', group: 'combat_text' }),
        new CampaignNpcDetail({ pos: 7, name: 'Challenge', group: 'combat_text' }),
        new CampaignNpcDetail({ pos: 8, name: 'Melee Attack', value: 'd20 + 5', misc: 'd6 + 3', group: 'attack' }),
        new CampaignNpcDetail({ pos: 9, name: 'Ranged Attack', value: 'd20 + 5', misc: 'd6 + 3', group: 'attack' }),
      ]
    }
  }
}
