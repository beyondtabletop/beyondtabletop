import { BtBase } from '../common/base'

export class Dnd5eSkill extends BtBase {
  pos: number
  name: string
  ability: string
  proficient: boolean
  misc: number
  auto: number
  expert: boolean

  getProto() {
    return {
      pos: 0,
      name: 'Survival',
      ability: 'WIS',
      proficient: false,
      misc: 0,
      auto: 0,
      expert: false,
    }
  }
}
