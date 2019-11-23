import { BtBase } from '../common/base'

export class Dnd5eCombatAc extends BtBase {
  armor: number
  shield: number
  magic: number
  other: number
  natural: number
  dodge: number
  deflection: number
  misc: number
  auto: number
  dex_auto: number
  use_ability: boolean
  ability: string

  getProto() {
    return {
      armor: 0,
      shield: 0,
      magic: 0,
      other: 0,
      natural: 0,
      dodge: 0,
      deflection: 0,
      misc: 0,
      auto: 0,
      dex_auto: 0,
      use_ability: false,
      ability: 'WIS',
    }
  }
}
