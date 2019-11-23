import { BtBase } from '../common/base'

export class Dnd5eBuilderCreation extends BtBase {
  race: boolean
  klass: boolean
  abilities: boolean
  profile: boolean
  equipment: boolean
  skills: boolean
  powers: boolean
  spells: boolean
  lists: boolean

  getProto() {
    return {
      race: false,
      klass: false,
      abilities: false,
      profile: false,
      equipment: false,
      skills: false,
      powers: false,
      spells: false,
      lists: false,
    }
  }
}
