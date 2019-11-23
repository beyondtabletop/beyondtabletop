import { BtBase } from '../common/base'

export class HomebrewKitDnd5eKlass extends BtBase {
  name: string
  spell_ability: string
  hit_die: string
  saves: string[]

  getProto() {
    return {
      name: '',
      spell_ability: 'INT',
      hit_die: 'd8',
      saves: null
    }
  }
}
