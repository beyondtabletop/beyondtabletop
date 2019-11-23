import { BtBase } from '../common/base'

import { Dnd5ePowerBarbarian } from './power-barbarian'
import { Dnd5ePowerBard } from './power-bard'
import { Dnd5ePowerCleric } from './power-cleric'
import { Dnd5ePowerDruid } from './power-druid'
import { Dnd5ePowerFighter } from './power-fighter'
import { Dnd5ePowerMonk } from './power-monk'
import { Dnd5ePowerPaladin } from './power-paladin'
import { Dnd5ePowerRanger } from './power-ranger'
import { Dnd5ePowerRogue } from './power-rogue'
import { Dnd5ePowerSorcerer } from './power-sorcerer'
import { Dnd5ePowerWarlock } from './power-warlock'
import { Dnd5ePowerWizard } from './power-wizard'
import { Dnd5ePowerCustom } from './power-custom'

export class Dnd5ePowers extends BtBase {
  Barbarian: Dnd5ePowerBarbarian
  Bard: Dnd5ePowerBard
  Cleric: Dnd5ePowerCleric
  Druid: Dnd5ePowerDruid
  Fighter: Dnd5ePowerFighter
  Monk: Dnd5ePowerMonk
  Paladin: Dnd5ePowerPaladin
  Ranger: Dnd5ePowerRanger
  Rogue: Dnd5ePowerRogue
  Sorcerer: Dnd5ePowerSorcerer
  Warlock: Dnd5ePowerWarlock
  Wizard: Dnd5ePowerWizard
  custom: Dnd5ePowerCustom

  getProto() {
    return {
      Barbarian: new Dnd5ePowerBarbarian,
      Bard: new Dnd5ePowerBard,
      Cleric: new Dnd5ePowerCleric,
      Druid: new Dnd5ePowerDruid,
      Fighter: new Dnd5ePowerFighter,
      Monk: new Dnd5ePowerMonk,
      Paladin: new Dnd5ePowerPaladin,
      Ranger: new Dnd5ePowerRanger,
      Rogue: new Dnd5ePowerRogue,
      Sorcerer: new Dnd5ePowerSorcerer,
      Warlock: new Dnd5ePowerWarlock,
      Wizard: new Dnd5ePowerWizard,
      custom: new Dnd5ePowerCustom,
    }
  }
}
