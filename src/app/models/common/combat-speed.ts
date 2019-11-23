import { BtBase } from './base'

export class BtCombatSpeed extends BtBase {
  base: number
  armor: number
  fly: number
  swim: number
  climb: number
  burrow: number
  auto: number

  getProto() {
    return {
      base: 30,
      armor: 10,
      fly: 0,
      swim: 0,
      climb: 0,
      burrow: 0,
      auto: 0,
    }
  }
}
