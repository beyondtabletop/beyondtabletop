import { BtBase } from '../common/base'

export class Dnd5eArmor extends BtBase {
  pos: number
  name: string
  bonus: number
  type: string
  dex: number
  str: number
  stealth_disadvantage: boolean
  weight: number
  properties: string
  active: boolean

  getProto() {
    return {
      pos: 0,
      name: 'Armor Name',
      bonus: 0,
      type: 'Armor',
      dex: 20,
      str: 0,
      stealth_disadvantage: false,
      weight: 0,
      properties: null,
      active: false,
    }
  }
}
