import { BtBase } from '../common/base'

export class PathfinderSkill extends BtBase {
  pos: number
  name: string
  ability: string
  ranks: number
  misc: number
  class_skill: boolean
  auto: number

  getProto() {
    return {
      pos: 0,
      name: 'Survival',
      ability: 'WIS',
      ranks: 0,
      misc: 0,
      class_skill: false,
      auto: 0,
    }
  }
}
