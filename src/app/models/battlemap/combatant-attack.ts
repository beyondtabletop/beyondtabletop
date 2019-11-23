import { BtBase } from '../common/base'

export class BattlemapCombatantAttack extends BtBase {
  name: string
  attack: string
  damage: string

  getProto() {
    return {
      name: 'Attack',
      attack: null,
      damage: null,
    }
  }
}
