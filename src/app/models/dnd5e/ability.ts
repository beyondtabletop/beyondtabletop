import { BtBase } from '../common/base'

export class Dnd5eAbility extends BtBase {
  name: string
  misc: number
  value: number
  auto: number
  save_prof: boolean
  save_auto: number

  getProto() {
    return {
      name: 'STR',
      misc: 0,
      value: 10,
      auto: 0,
      save_prof: false,
      save_auto: 0,
    }
  }
}
