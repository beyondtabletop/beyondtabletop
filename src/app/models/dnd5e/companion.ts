import { BtBase } from '../common/base'
import { BtNote } from '../common/note'
import { Dnd5eBasic } from './basic'
import { Dnd5eAbilities } from './abilities'
import { Dnd5eCombat } from './combat'
import { Dnd5eSkill } from './skill'
import { BtAttack } from '../common/attack'

export class Dnd5eCompanion extends BtBase {
  pos: number
  name: string
  type: string
  basic: Dnd5eBasic
  abilities: Dnd5eAbilities
  combat: Dnd5eCombat
  skills: Dnd5eSkill[]
  specials: BtNote[]
  attacks: BtAttack[]

  getProto() {
    return {
      pos: 0,
      name: 'Companion Name',
      type: 'Animal Companion',
      basic: new Dnd5eBasic,
      abilities: new Dnd5eAbilities,
      combat: new Dnd5eCombat,
      skills: [],
      specials: [],
      attacks: [],
    }
  }
  getLookup() {
    return {
      skills: Dnd5eSkill,
      specials: BtNote,
      attacks: BtAttack,
    }
  }
}
