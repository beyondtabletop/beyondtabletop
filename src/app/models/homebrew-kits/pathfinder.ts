import { BtBase } from '../common/base'
import { PathfinderFeat } from '../pathfinder/feat';
import { PathfinderSpell } from '../pathfinder/spell';
import { PathfinderKlass } from '../pathfinder/klass';
import { PathfinderWeapon } from '../pathfinder/weapon';
import { PathfinderArmor } from '../pathfinder/armor';

export class HomebrewKitPathfinder extends BtBase {
  feats: PathfinderFeat[]
  spells: PathfinderSpell[]
  klasses: PathfinderKlass[]
  weapons: PathfinderWeapon[]
  armors: PathfinderArmor[]

  getProto() {
    return {
      feats: [],
      spells: [],
      klasses: [],
      weapons: [],
      armors: [],
    }
  }
  getLookup() {
    return {
      feats: PathfinderFeat,
      spells: PathfinderSpell,
      klasses: PathfinderKlass,
      weapons: PathfinderWeapon,
      armors: PathfinderArmor,
    }
  }
}
