import { BtBase } from '../common/base'
import { Dnd5eFeat } from '../dnd5e/feat'
import { Dnd5eSpell } from '../dnd5e/spell'
import { HomebrewKitDnd5eKlass } from './klass';
import { HomebrewKitDnd5eBackground } from './background';
import { Dnd5eWeapon } from '../dnd5e/weapon';
import { Dnd5eArmor } from '../dnd5e/armor';

export class HomebrewKitDnd5e extends BtBase {
  invocations: Dnd5eFeat[]
  spells: Dnd5eSpell[]
  klasses: HomebrewKitDnd5eKlass[]
  backgrounds: HomebrewKitDnd5eBackground[]
  weapons: Dnd5eWeapon[]
  armors: Dnd5eArmor[]

  getProto() {
    return {
      invocations: [],
      spells: [],
      klasses: [],
      backgrounds: [],
      weapons: [],
      armors: [],
    }
  }
  getLookup() {
    return {
      invocations: Dnd5eFeat,
      spells: Dnd5eSpell,
      klasses: HomebrewKitDnd5eKlass,
      backgrounds: HomebrewKitDnd5eBackground,
      weapons: Dnd5eWeapon,
      armors: Dnd5eArmor,
    }
  }
}
