import { BtBase } from '../common/base'

export class PathfinderArmor extends BtBase {
  pos: number
  name: string
  bonus: number
  type: string
  dex: number
  penalty: number
  failure: string
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
      penalty: 0,
      failure: '--',
      weight: 0,
      properties: null,
      active: true,
    }
  }
}
