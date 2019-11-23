import { BtBase } from '../common/base'
import { BtList } from '../common/list'
import { BtNote } from '../common/note'
import { BtStat } from '../common/stat'
import { BtOverviewBlock } from '../common/block'
import { BtConsumable } from '../common/consumable'
import { BtCondition } from '../common/condition'
import { BtValuable } from '../common/valuable'
import { BtTreasure } from '../common/treasure'
import { BtSheetPrefs } from '../common/prefs'

import { PathfinderArmor } from './armor'
import { PathfinderAttack } from './attack'
import { PathfinderFeat } from './feat'
import { PathfinderKlass } from './klass'
import { PathfinderSkill } from './skill'
import { PathfinderSave } from './save'
import { PathfinderSpell } from './spell'
import { PathfinderWeapon } from './weapon'

import { PathfinderAbilities } from './abilities'
import { PathfinderBasic } from './basic'
import { PathfinderCombat } from './combat'
import { Dnd5eCasting } from '../dnd5e/casting' // if this ever changes, separate
import { Dnd5eSpendable } from '../dnd5e/spendable'  // if this ever changes, separate
import { PathfinderCompanion } from './companion'
import { PathfinderCoreConditions } from './core-conditions'

export class PathfinderCharacter extends BtBase {
  version: number
  name: string
  change_id: string
  oversized: boolean
  campaign_id: string
  basic: PathfinderBasic
  abilities: PathfinderAbilities
  combat: PathfinderCombat
  treasure: BtTreasure
  casting: Dnd5eCasting
  prefs: BtSheetPrefs
  core_conditions: PathfinderCoreConditions
  profile: BtNote[]
  skills: PathfinderSkill[]
  lists: BtList[]
  blocks: BtOverviewBlock[]
  saves: PathfinderSave[]
  klasses: PathfinderKlass[]
  weapons: PathfinderWeapon[]
  armors: PathfinderArmor[]
  attacks: PathfinderAttack[]
  custom_dice: BtNote[]
  notes: BtNote[]
  consumables: BtConsumable[]
  valuables: BtValuable[]
  custom_stats: BtStat[]
  custom_skills: PathfinderSkill[]
  spells: PathfinderSpell[]
  feats: PathfinderFeat[]
  companions: PathfinderCompanion[]
  conditions: BtCondition[]
  experiences: BtConsumable[]
  powers: Dnd5eSpendable[]

  getProto() {
    return {
      version: 31,
      name: 'New Pathfinder Character',
      change_id: '0',
      oversized: false,
      campaign_id: null,

      basic: new PathfinderBasic(),
      abilities: new PathfinderAbilities(),
      combat: new PathfinderCombat(),
      treasure: new BtTreasure(),
      casting: new Dnd5eCasting(),
      prefs: new BtSheetPrefs({ tab: 'general' }),
      core_conditions: new PathfinderCoreConditions(),

      profile: [
        new BtNote({ name: 'Alignment' }),
        new BtNote({ name: 'Deity' }),
        new BtNote({ name: 'Homeland' }),
        new BtNote({ name: 'Gender' }),
        new BtNote({ name: 'Age' }),
        new BtNote({ name: 'Height' }),
        new BtNote({ name: 'Weight' }),
        new BtNote({ name: 'Hair' }),
        new BtNote({ name: 'Eyes' }),
      ],

      skills: [
        new PathfinderSkill({ ability: 'DEX', name: 'Acrobatics' }),
        new PathfinderSkill({ ability: 'INT', name: 'Appraise' }),
        new PathfinderSkill({ ability: 'CHA', name: 'Bluff' }),
        new PathfinderSkill({ ability: 'STR', name: 'Climb' }),
        new PathfinderSkill({ ability: 'INT', name: 'Craft' }),
        new PathfinderSkill({ ability: 'CHA', name: 'Diplomacy' }),
        new PathfinderSkill({ ability: 'DEX', name: 'Disable Device' }),
        new PathfinderSkill({ ability: 'CHA', name: 'Disguise' }),
        new PathfinderSkill({ ability: 'DEX', name: 'Escape Artist' }),
        new PathfinderSkill({ ability: 'DEX', name: 'Fly' }),
        new PathfinderSkill({ ability: 'CHA', name: 'Handle Animal' }),
        new PathfinderSkill({ ability: 'WIS', name: 'Heal' }),
        new PathfinderSkill({ ability: 'CHA', name: 'Intimidate' }),
        new PathfinderSkill({ ability: 'INT', name: 'Knowledge Arcana' }),
        new PathfinderSkill({ ability: 'INT', name: 'Knowledge Dungeoneering' }),
        new PathfinderSkill({ ability: 'INT', name: 'Knowledge Engineering' }),
        new PathfinderSkill({ ability: 'INT', name: 'Knowledge Geography' }),
        new PathfinderSkill({ ability: 'INT', name: 'Knowledge History' }),
        new PathfinderSkill({ ability: 'INT', name: 'Knowledge Local' }),
        new PathfinderSkill({ ability: 'INT', name: 'Knowledge Nature' }),
        new PathfinderSkill({ ability: 'INT', name: 'Knowledge Nobility' }),
        new PathfinderSkill({ ability: 'INT', name: 'Knowledge Planes' }),
        new PathfinderSkill({ ability: 'INT', name: 'Knowledge Religion' }),
        new PathfinderSkill({ ability: 'INT', name: 'Linguistics' }),
        new PathfinderSkill({ ability: 'WIS', name: 'Perception' }),
        new PathfinderSkill({ ability: 'CHA', name: 'Perform' }),
        new PathfinderSkill({ ability: 'WIS', name: 'Profession' }),
        new PathfinderSkill({ ability: 'DEX', name: 'Ride' }),
        new PathfinderSkill({ ability: 'WIS', name: 'Sense Motive' }),
        new PathfinderSkill({ ability: 'DEX', name: 'Sleight of Hand' }),
        new PathfinderSkill({ ability: 'INT', name: 'Spellcraft' }),
        new PathfinderSkill({ ability: 'DEX', name: 'Stealth' }),
        new PathfinderSkill({ ability: 'WIS', name: 'Survival' }),
        new PathfinderSkill({ ability: 'STR', name: 'Swim' }),
        new PathfinderSkill({ ability: 'CHA', name: 'Use Magic Device' }),
      ],

      lists: [
        new BtList({ pos: 0, special: true, name: 'Languages' }),
        new BtList({ pos: 1, special: true, name: 'Traits' }),
        new BtList({ pos: 2, special: true, name: 'Special Abilities' }),
      ],

      blocks: [
        new BtOverviewBlock({ pos: 0, column: 1, name: 'Attacks', type: 'attacks_block' }),
        new BtOverviewBlock({ pos: 1, column: 1, name: 'Vitals', type: 'vitals_block' }),
        new BtOverviewBlock({ pos: 2, column: 1, name: 'Abilities', type: 'abilities_block' }),
        new BtOverviewBlock({ pos: 3, column: 1, name: 'Conditions', type: 'conditions_block' }),
        new BtOverviewBlock({ pos: 4, column: 1, name: 'Skills', type: 'skills_block' }),
        new BtOverviewBlock({ pos: 5, column: 1, name: 'Lists', type: 'lists_block' }),
        new BtOverviewBlock({ pos: 6, column: 1, name: 'Consumables', type: 'consumables_block' }),
        new BtOverviewBlock({ pos: 0, column: 2, name: 'Feats', type: 'feats_block' }),
        new BtOverviewBlock({ pos: 1, column: 2, name: 'Spells', type: 'spells_block' }),
      ],

      saves: [
        new PathfinderSave({ ability: 'CON', name: 'FORT' }),
        new PathfinderSave({ ability: 'DEX', name: 'REF' }),
        new PathfinderSave({ ability: 'WIS', name: 'WILL' }),
      ],

      klasses: [
        new PathfinderKlass()
      ],
      weapons: [
        new PathfinderWeapon()
      ],
      armors: [
        new PathfinderArmor()
      ],
      attacks: [
        new PathfinderAttack()
      ],
      custom_dice: [
        new BtNote()
      ],
      notes: [
        new BtNote()
      ],
      consumables: [],
      valuables: [],
      custom_stats: [],
      custom_skills: [],
      spells: [],
      feats: [],
      companions: [],
      conditions: [],
      experiences: [],
      powers: [],
    }
  }
  getLookup() {
    return {
      consumables: BtConsumable,
      valuables: BtValuable,
      custom_stats: BtStat,
      custom_skills: PathfinderSkill,
      spells: PathfinderSpell,
      feats: PathfinderFeat,
      companions: PathfinderCompanion,
      conditions: BtCondition,
      experiences: BtConsumable,
      powers: Dnd5eSpendable,
    }
  }
}
