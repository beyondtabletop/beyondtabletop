import { BtBase } from '../common/base'
import { BtList } from '../common/list'
import { BtNote } from '../common/note'
import { BtOverviewBlock } from '../common/block'
import { BtConsumable } from '../common/consumable'
import { BtStat } from '../common/stat'
import { BtCondition } from '../common/condition'
import { BtValuable } from '../common/valuable'
import { BtTreasure } from '../common/treasure'
import { BtSheetPrefs } from '../common/prefs'

import { Dnd5eArmor } from './armor'
import { Dnd5eAttack } from './attack'
import { Dnd5eFeat } from './feat'
import { Dnd5eKlass } from './klass'
import { Dnd5eSkill } from './skill'
import { Dnd5eSpell } from './spell'
import { Dnd5eWeapon } from './weapon'

import { Dnd5eAbilities } from './abilities'
import { Dnd5eBasic } from './basic'
import { Dnd5eCombat } from './combat'
import { Dnd5ePowers } from './powers'
import { Dnd5eBuilder } from './builder'
import { Dnd5eCasting } from './casting'
import { Dnd5eCompanion } from './companion'

export class Dnd5eCharacter extends BtBase {
  version: number
  name: string
  change_id: string
  oversized: boolean
  basic: Dnd5eBasic
  abilities: Dnd5eAbilities
  combat: Dnd5eCombat
  treasure: BtTreasure
  powers: Dnd5ePowers
  prefs: BtSheetPrefs
  builder: Dnd5eBuilder
  casting: Dnd5eCasting
  profile: BtNote[]
  skills: Dnd5eSkill[]
  lists: BtList[]
  blocks: BtOverviewBlock[]
  spell_slots: BtStat[]
  klasses: Dnd5eKlass[]
  weapons: Dnd5eWeapon[]
  armors: Dnd5eArmor[]
  attacks: Dnd5eAttack[]
  custom_dice: BtNote[]
  notes: BtNote[]
  consumables: BtConsumable[]
  valuables: BtValuable[]
  custom_stats: BtStat[]
  spells: Dnd5eSpell[]
  feats: Dnd5eFeat[]
  companions: Dnd5eCompanion[]
  conditions: BtCondition[]
  experiences: BtConsumable[]
  homebrew_kits: string[]
  campaign_id: string

  getProto() {
    return {
      version: 40,
      name: 'New D&D 5E Character',
      change_id: '0',
      oversized: false,
      campaign_id: null,
      basic: new Dnd5eBasic,
      abilities: new Dnd5eAbilities,
      combat: new Dnd5eCombat,
      treasure: new BtTreasure,
      powers: new Dnd5ePowers,
      prefs: new BtSheetPrefs,
      builder: new Dnd5eBuilder,
      casting: new Dnd5eCasting,

      profile: [
        new BtNote({ name: 'Gender' }),
        new BtNote({ name: 'Age' }),
        new BtNote({ name: 'Height' }),
        new BtNote({ name: 'Weight' }),
        new BtNote({ name: 'Eyes' }),
        new BtNote({ name: 'Skin' }),
        new BtNote({ name: 'Hair' }),
        new BtNote({ name: 'Deity' }),
      ],

      skills: [
        new Dnd5eSkill({ name: 'Acrobatics', ability: 'DEX' }),
        new Dnd5eSkill({ name: 'Animal Handling', ability: 'WIS' }),
        new Dnd5eSkill({ name: 'Arcana', ability: 'INT' }),
        new Dnd5eSkill({ name: 'Athletics', ability: 'STR' }),
        new Dnd5eSkill({ name: 'Deception', ability: 'CHA' }),
        new Dnd5eSkill({ name: 'History', ability: 'INT' }),
        new Dnd5eSkill({ name: 'Insight', ability: 'WIS' }),
        new Dnd5eSkill({ name: 'Intimidation', ability: 'CHA' }),
        new Dnd5eSkill({ name: 'Investigation', ability: 'INT' }),
        new Dnd5eSkill({ name: 'Medicine', ability: 'WIS' }),
        new Dnd5eSkill({ name: 'Nature', ability: 'INT' }),
        new Dnd5eSkill({ name: 'Perception', ability: 'WIS' }),
        new Dnd5eSkill({ name: 'Performance', ability: 'CHA' }),
        new Dnd5eSkill({ name: 'Persuasion', ability: 'CHA' }),
        new Dnd5eSkill({ name: 'Religion', ability: 'INT' }),
        new Dnd5eSkill({ name: 'Sleight of Hand', ability: 'DEX' }),
        new Dnd5eSkill({ name: 'Stealth', ability: 'DEX' }),
        new Dnd5eSkill({ name: 'Survival', ability: 'WIS' }),
      ],

      lists: [
        new BtList({ pos: 0, special: true, name: 'Racial Traits' }),
        new BtList({ pos: 1, special: true, name: 'Equipment' }),
        new BtList({ pos: 2, special: true, name: 'Languages' }),
        new BtList({ pos: 3, special: true, name: 'Tool Proficiencies' }),
        new BtList({ pos: 4, special: true, name: 'Allies & Organizations' }),
      ],

      blocks: [
        new BtOverviewBlock({ pos: 0, name: 'Attacks', type: 'attacks_block', column: 1 }),
        new BtOverviewBlock({ pos: 1, name: 'Vitals', type: 'vitals_block', column: 1 }),
        new BtOverviewBlock({ pos: 2, name: 'Resting', type: 'rest_block', column: 1 }),
        new BtOverviewBlock({ pos: 3, name: 'Abilities', type: 'abilities_block', column: 1 }),
        new BtOverviewBlock({ pos: 4, name: 'Skills', type: 'skills_block', column: 1 }),
        new BtOverviewBlock({ pos: 5, name: 'Lists', type: 'lists_block', column: 1 }),
        new BtOverviewBlock({ pos: 6, name: 'Consumables', type: 'consumables_block', column: 1 }),
        new BtOverviewBlock({ pos: 0, name: 'Powers', type: 'powers_block', column: 2 }),
        new BtOverviewBlock({ pos: 1, name: 'Spells', type: 'spells_block', column: 2 }),
        new BtOverviewBlock({ pos: 2, name: 'Conditions', type: 'conditions_block', column: 2 }),
      ],

      spell_slots: [
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
        new BtStat,
      ],

      klasses: [
        new Dnd5eKlass
      ],
      weapons: [
        new Dnd5eWeapon
      ],
      armors: [
        new Dnd5eArmor
      ],
      attacks: [
        new Dnd5eAttack
      ],
      custom_dice: [
        new BtNote
      ],
      notes: [
        new BtNote
      ],
      consumables: [],
      valuables: [],
      custom_stats: [],
      spells: [],
      feats: [],
      companions: [],
      conditions: [],
      experiences: [],
      homebrew_kits: null,
    }
  }
  getLookup() {
    return {
      consumables: BtConsumable,
      valuables: BtValuable,
      custom_stats: BtStat,
      spells: Dnd5eSpell,
      feats: Dnd5eFeat,
      companions: Dnd5eCompanion,
      conditions: BtCondition,
      experiences: BtConsumable,
    }
  }
}
