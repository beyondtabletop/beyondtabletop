import { BtBase } from '../common/base'
import { Dnd5eAbility } from './ability'

export class Dnd5eAbilities extends BtBase {
  STR: Dnd5eAbility
  DEX: Dnd5eAbility
  CON: Dnd5eAbility
  INT: Dnd5eAbility
  WIS: Dnd5eAbility
  CHA: Dnd5eAbility

  getProto() {
    return {
      STR: new Dnd5eAbility({ name: 'STR' }),
      DEX: new Dnd5eAbility({ name: 'DEX' }),
      CON: new Dnd5eAbility({ name: 'CON' }),
      INT: new Dnd5eAbility({ name: 'INT' }),
      WIS: new Dnd5eAbility({ name: 'WIS' }),
      CHA: new Dnd5eAbility({ name: 'CHA' }),
    }
  }
}
