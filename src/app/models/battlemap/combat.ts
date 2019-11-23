import { BtBase } from '../common/base'

export class BattlemapCombat extends BtBase {
  round: number
  status: string
  active: boolean

  getProto() {
    return {
      round: 1,
      status: 'preparing',
      active: null,
    }
  }
}
