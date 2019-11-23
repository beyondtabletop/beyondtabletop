import { BtBase } from './base'

export class BtTreasure extends BtBase {
  copper: number
  silver: number
  gold: number
  electrum: number
  platinum: number

  getProto() {
    return {
      copper: 0,
      silver: 0,
      gold: 0,
      electrum: 0,
      platinum: 0,
    }
  }
}
