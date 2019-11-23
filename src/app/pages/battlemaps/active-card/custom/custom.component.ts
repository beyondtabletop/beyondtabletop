import { Component, Input } from '@angular/core';
import { DiceService } from 'src/app/services/dice.service';
import { StorageService } from 'src/app/services/storage.service';
import { BattlemapCombatant } from 'src/app/models/battlemap/combatant';
import { BattlemapToken } from 'src/app/models/battlemap/token';
import { BattlemapCombatantAttack } from 'src/app/models/battlemap/combatant-attack';

@Component({
  selector: 'bt-battlemap-active-card-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class BattlemapActiveCardCustomComponent {
  @Input() public self: any
  @Input() public token: BattlemapToken
  @Input() public combatant: BattlemapCombatant
  public viewing = true

  constructor(
    public diceSvc: DiceService,
    public store: StorageService,
  ) {}

  public abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']

  public getAbilityMod(ability: number): number {
    return Math.floor((ability - 10) / 2)
  }

  public currentHP(hp: number, damage: number): number {
    return hp - Math.abs(damage)
  }

  public HPRingColor(hp: number, damage: number): string {
    const wounds_percent = Math.min(Math.floor(Math.abs(damage) * 100 / hp), 100)
    return wounds_percent >= 75 ? '#c61515' : '#26e265'
  }

  public getHPRingValue(hp: number, damage: number): number {
    const wounds_percent = Math.min(Math.floor(Math.abs(damage) * 100 / hp), 100)
    return Math.max(Math.floor(wounds_percent * 6.29), 0)
  }

  public incrementDamage(combatant: BattlemapCombatant, dir: number): void {
    combatant.stats.damage += dir
  }

  public rollOneDice(sides, modifier, name, phrasing?): any[] {
    this.self.touch()
    const pack = this.diceSvc.getDicePackage(sides, modifier, name, phrasing)
    this.store.addRollsToChat([pack], name)
    return [pack]
  }

  public rollFormula(formula: string, name: string): void {
    this.self.touch()
    const { text } = this.diceSvc.rollFormula(formula, name)
    this.store.addCustomRollToChat(text)
  }

  public rollInitiative(): void {
    const results = this.rollOneDice(20, this.getAbilityMod(this.combatant.stats.DEX), 'initiative')
    this.self.methods.setCombatantInit(this.combatant, results[0].result)
  }

  public toggleEditing(): void {
    this.viewing = !this.viewing
  }

  public async validateRoll(attack: BattlemapCombatantAttack, slug: string): Promise<void> {
    await Promise.resolve()
    this.self.touch()
    const formula = attack[slug]
    const valid = this.diceSvc.validateCustomDice(formula)
    attack[`$${slug}Error`] = !valid
  }

  public randomizeAbility(abl: string): void {
    const { rolls } = this.diceSvc.rollFormula('4d6')
    const list = rolls[0].record.list
    list.sort().shift()
    const ability = list.reduce((acc, x) => x + acc, 0)
    this.combatant.stats[abl] = ability
  }
}
