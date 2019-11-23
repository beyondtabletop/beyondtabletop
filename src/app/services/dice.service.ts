import { Injectable } from '@angular/core'
import { SheetService } from './sheet.service'
import { DiceRecord } from '../models/dice/record'
import { DicePackage } from '../models/dice/package'

@Injectable({
  providedIn: 'root'
})

export class DiceService {
  private expression = /(\d{0,4})d(\d{1,4})([acd]?)/gi
  private legalCharacters = /(\+|\-|\s|\d|\.|\%|\/|\*|\(|\))/gi

  constructor(
    private sheetSvc: SheetService
  ) { }

  private parseDice = (sidesString: string = 'd20'): any => {
    const match = sidesString.match(this.expression)
    if (!match) { return { empty: true }}

    const coefficient = parseInt(sidesString.replace(this.expression, '$1') || '1')
    const special = sidesString.replace(this.expression, '$3') || 'n'
    const sides = parseInt(sidesString.replace(this.expression, '$2'))

    return { coefficient, special, sides, empty: false }
  }

  private recordRoll = (sides: number, record: DiceRecord): number => {
    const roll = this.sheetSvc.randomNumber(1, sides)
    record.list.push(roll)
    return roll
  }

  // TODO, does anyone make use of modifier here?
  public getDicePackage(sidesString: string|number = 'd20', modifier = 0, name = '', phrasing = ''): DicePackage {
    const record: DiceRecord = { total: 0, list: [] }
    if (typeof sidesString === 'number') { sidesString = `d${sidesString}`}

    let { coefficient, special, sides, empty } = this.parseDice(sidesString)
    if (empty) { return { empty } as DicePackage}

    // normal
    if (special === 'n' || special === 'c') {
      record.total = this.sheetSvc.sizedArray(coefficient).reduce((acc, i) => acc + this.recordRoll(sides, record), record.total)
    }

    // advantage/disadvantage
    if (special === 'a' || special === 'd') {
      let a_total = 0
      let b_total = 0
      this.sheetSvc.sizedArray(coefficient).forEach(() => {
        a_total += this.recordRoll(sides, record)
        b_total += this.recordRoll(sides, record)
      })
      if (special === 'a') {
        record.total += Math.max(a_total, b_total)
      }
      if (special === 'd') {
        record.total += Math.min(a_total, b_total)
      }
    }

    // crit isn't wired up yet
    // if (special === 'c') {
    // }

    return { record, modifier, sides, name, phrasing, result: record.total + modifier }
  }

  public getDiceIconClass(die: string): string {
    const result = 'dice-icon-d'
    let sides = '20'
    die = die || ''
    if (die.match(this.expression) !== null) {
      sides = die.replace(this.expression, '$2')
    }
    return result + sides
  }

  public printRollResult = (packs: DicePackage[], name: string): string => {
    const firstDie: DicePackage = packs[0]
    let diceAction = `a d${firstDie.sides}`

    if (firstDie.empty) { return } // todo: maybe show an error?

    // If there are multiple dice
    if (firstDie.record.list.length > 1) {
      diceAction = `${firstDie.record.list.length}d${firstDie.sides}`
    }

    // If a roll name is specified, it takes precedence over the above
    if (firstDie.name) {
      diceAction = firstDie.name
    }

    // If phrasing is specified, it takes precedence over the above
    // Are we still doing phrasing? lol
    if (firstDie.phrasing) {
      diceAction = firstDie.phrasing.replace(/\#/gi, diceAction)
    }

    let result = `${name} rolled ${diceAction} and got a ${firstDie.result} (${firstDie.record.list.join(', ')})`

    // If there are more than 1 rolls, replace the above with a different syntax
    if (packs.length > 1) {
      result = `${name} rolled ${diceAction} ${packs.length} times: `
      const rollResults = packs.map(roll => roll.result).join(', ')
      const rollRecords = packs.map(roll => roll.record.list.join(', ')).join(', ')
      result = `${result}${rollResults} (${rollRecords})`
    }

    return result
  }

  public validateCustomDice = (formula: string): boolean => {
    /* Get the formula and replace all instances of d6, 2d8, etc, with 0 for validation */
    const has_any_dice = !!formula.match(this.expression)
    if (!has_any_dice) { return false }

    formula = formula.replace(this.expression, '0')

    let valid = formula.split('').reduce((acc, char) => {
      return acc && !!char.match(this.legalCharacters)
    }, true)

    if (!valid) { return false }

    try {
      eval(formula)
    } catch {
      valid = false
    }

    return valid
  }

  // Only works with addition, not multiplication
  public rollCustomDice = (custom_dice: any, mod = 0, phrasing = ''): any => {
    let formula = custom_dice.text
    custom_dice.error = false

    if (!this.validateCustomDice(formula)) {
      custom_dice.error = true
      return { text: ' Invalid Dice Expression', result: null, rolls: [] }
    }

    const rolls = formula.match(this.expression).map(die => {
      const pack: DicePackage = this.getDicePackage(die, mod, custom_dice.name, phrasing)
      formula = formula.replace(die, pack.result)
      return pack
    })

    let result: number
    try {
      result = Math.floor(eval(formula))
    } catch (err) {
      console.error(err)
      throw err
    }

    const rollsRecord = rolls.map(roll => roll.record.list.join(', '))
    let diceAction = custom_dice.name

    if (phrasing) {
      diceAction = phrasing.replace(/\#/gi, diceAction)
    }

    const text = ` rolled ${diceAction} and got: ${result} (${rollsRecord.join(', ')})`
    return { result, rolls, text }
  }

  public rollFormula = (formula: any, name = ''): any => {
    if (!this.validateCustomDice(formula)) {
      return { text: ' Invalid Dice Expression', result: null, rolls: [] }
    }

    name = name || formula

    const rolls = formula.match(this.expression).map(die => {
      const pack: DicePackage = this.getDicePackage(die, 0, name)
      formula = formula.replace(die, pack.result)
      return pack
    })

    let result: number
    try {
      result = Math.floor(eval(formula))
    } catch (err) {
      console.error(err)
      throw err
    }

    const rollsRecord = rolls.map(roll => roll.record.list.join(', '))
    const text = ` rolled ${name} and got: ${result} (${rollsRecord.join(', ')})`
    return { result, rolls, text }
  }
}
