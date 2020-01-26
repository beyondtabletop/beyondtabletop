interface Phoneme {
  l: string
  w: number
  g?: string
}

import { Injectable } from '@angular/core';
import { BtUser } from '../models/common/user.model';

@Injectable({
  providedIn: 'root'
})

export class SheetService {
  constructor() { }

  remove = (array: any[], index: number): void => { array.splice(index, 1) }

  removeByObject = (array: any[], object: any): void => {
    const index = array.indexOf(object);
    if (index > -1) {
      this.remove(array, index);
    }
  };

  confirmOnPageExit = (e: any): string => {
    e = e || window.event;
    const message = 'Your data is saved. You can turn off this warning in the settings tab.';
    if (e) {
      e.returnValue = message;
    }
    return message;
  };

  turnOnConfirmation = (): void => { window.onbeforeunload = this.confirmOnPageExit }
  turnOffConfirmation = (): void => { window.onbeforeunload = null }

  confirmWithAlert = (confirm: Function, deny: Function = () => {}, message: string = 'Are you sure you want to do this?'): void => {
    window.confirm(message) ? confirm() : deny()
  };

  isTouchDevice = (): boolean => !!document.createTouch;

  randomSecureString = (length: number): string => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  selectionReverseLookup = (list: any[], value: any): string => (list.find(x => x.value === value) || {}).label;
  isAdmin = (user: BtUser): boolean => user && user.firebase_id === 'SIxb6YAlzadNFqKNjA5wO79sVTd2'

  reverseLookupBy = (array: any[], obj: any, goal: string): any => {
    const target = array.filter(x => Object.keys(obj).every(key => x[key] === obj[key]))[0]
    if (target !== undefined) {
      return target[goal];
    }
  };

  backgroundStyle = (url: string): any => {
    if (url) {
      return {
        'background-image': `url(${url})`
      }
    }
  }

  randomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * ((max + 1) - min)) + min
  }

  randomFromArray (array: any[]): any {
    return array[this.randomNumber(0, array.length -1)]
  }

  levelize = (input: (number|string)): string => {
    let num = input
    if (typeof num === 'string') {
      num = parseInt(num);
    }

    let level = `${num}`
    switch(num) {
      case 1 || isNaN(num):
        level = '1st'
        break;
      case 2:
        level = '2nd'
        break;
      case 3:
        level = '3rd'
        break;
      default:
        level = `${input}th`;
        break;
    }
    return level;
  }

  levelizeWithoutNum = (num: number): string => this.levelize(num).replace(/\d/gi, '');
  getRandomColor = (): string => `rgb(${this.randomNumber(0, 255)}, ${this.randomNumber(0, 255)}, ${this.randomNumber(0, 255)})`

  sizedArray = (times, offset = 0) => {
    const array = []
    for (let i = offset; i < (times + offset); i++) {
      array.push(i)
    }
    return array
  }

  isEmpty (value: any): boolean {
    return value === '' || value === null || value === undefined
  }

  lastChar (str: string): string {
    return str.slice(-1)
  }

  lastFromArray (list: any[]): any {
    return list[list.length - 1]
  }

  randomSyllableNumber () {
    return this.randomFromArray([1, 2, 2, 2, 2, 2, 3, 3, 3, 4])
  }

  randomName (syllables: number = this.randomSyllableNumber()): string {
    const wordArray = []
    const yIsVowel = this.randomNumber(1, 4) === 1
    this.sizedArray(syllables).forEach(() => this.randomSyllable(wordArray, syllables, yIsVowel))
    const word = wordArray.join('')
    return `${word[0].toUpperCase()}${word.slice(1)}`
  }

  randomSyllable(word: string[], totalSyllables: number, yIsVowel): void {
    const vowels: Phoneme[] = [
      { l: 'a', w: 1 },
      { l: 'e', w: 1 },
      { l: 'i', w: 1 },
      { l: 'o', w: 1 },
      { l: 'u', w: 1 },
    ]

    const consonants: Phoneme[] = [
      { l: 'b', w: 10, g: 'any' },
      { l: 'c', w: 10, g: 'any' },
      { l: 'ch', w: 10, g: 'any' },
      { l: 'd', w: 10, g: 'any' },
      { l: 'f', w: 6, g: 'any' },
      { l: 'g', w: 8, g: 'any' },
      { l: 'h', w: 7, g: 'any' },
      { l: 'j', w: 4, g: 'any' },
      { l: 'k', w: 7, g: 'any' },
      { l: 'l', w: 10, g: 'any' },
      { l: 'm', w: 10, g: 'any' },
      { l: 'n', w: 10, g: 'any' },
      { l: 'nm', w: 1, g: 'any' },
      { l: 'p', w: 10, g: 'any' },
      { l: 'ph', w: 4, g: 'any' },
      { l: 'q', w: 2, g: 'any' },
      { l: 'r', w: 10, g: 'any' },
      { l: 's', w: 10, g: 'any' },
      { l: 'sch', w: 5, g: 'any' },
      { l: 'sh', w: 8, g: 'any' },
      { l: 'sk', w: 7, g: 'any' },
      { l: 'sl', w: 6, g: 'any' },
      { l: 'sm', w: 6, g: 'any' },
      { l: 'sp', w: 7, g: 'any' },
      { l: 'sr', w: 1, g: 'any' },
      { l: 'st', w: 10, g: 'any' },
      { l: 'sz', w: 2, g: 'any' },
      { l: 't', w: 10, g: 'any' },
      { l: 'ts', w: 2, g: 'any' },
      { l: 'th', w: 10, g: 'any' },
      { l: 'tz', w: 1, g: 'any' },
      { l: 'v', w: 7, g: 'any' },
      { l: 'vl', w: 3, g: 'any' },
      { l: 'vr', w: 2, g: 'any' },
      { l: 'w', w: 7, g: 'any' },
      { l: 'x', w: 2, g: 'any' },
      { l: 'z', w: 2, g: 'any' },
      { l: 'br', w: 8, g: 'start' },
      { l: 'bl', w: 8, g: 'start' },
      { l: 'cl', w: 8, g: 'start' },
      { l: 'cr', w: 8, g: 'start' },
      { l: 'dr', w: 8, g: 'start' },
      { l: 'dw', w: 3, g: 'start' },
      { l: 'dj', w: 1, g: 'start' },
      { l: 'fr', w: 3, g: 'start' },
      { l: 'fl', w: 3, g: 'start' },
      { l: 'gh', w: 1, g: 'start' },
      { l: 'gr', w: 7, g: 'start' },
      { l: 'gl', w: 8, g: 'start' },
      { l: 'kr', w: 6, g: 'start' },
      { l: 'kl', w: 5, g: 'start' },
      { l: 'kv', w: 1, g: 'start' },
      { l: 'ml', w: 3, g: 'start' },
      { l: 'pl', w: 7, g: 'start' },
      { l: 'pr', w: 8, g: 'start' },
      { l: 'pw', w: 1, g: 'start' },
      { l: 'qr', w: 1, g: 'start' },
      { l: 'sc', w: 7, g: 'start' },
      { l: 'sn', w: 6, g: 'start' },
      { l: 'sv', w: 2, g: 'start' },
      { l: 'sw', w: 5, g: 'start' },
      { l: 'tw', w: 5, g: 'start' },
      { l: 'tr', w: 8, g: 'start' },
      { l: 'vh', w: 1, g: 'start' },
      { l: 'ck', w: 8, g: 'end' },
      { l: 'ft', w: 6, g: 'end' },
      { l: 'hn', w: 3, g: 'end' },
      { l: 'lt', w: 8, g: 'end' },
      { l: 'lp', w: 5, g: 'end' },
      { l: 'ln', w: 4, g: 'end' },
      { l: 'lm', w: 3, g: 'end' },
      { l: 'ldt', w: 2, g: 'end' },
      { l: 'kz', w: 1, g: 'end' },
      { l: 'kch', w: 1, g: 'end' },
      { l: 'nl', w: 1, g: 'end' },
      { l: 'nls', w: 1, g: 'end' },
      { l: 'nv', w: 2, g: 'end' },
      { l: 'nt', w: 8, g: 'end' },
      { l: 'ng', w: 8, g: 'end' },
      { l: 'nx', w: 3, g: 'end' },
      { l: 'px', w: 1, g: 'end' },
      { l: 'pv', w: 1, g: 'end' },
      { l: 'pt', w: 7, g: 'end' },
      { l: 'ps', w: 4, g: 'end' },
      { l: 'rc', w: 6, g: 'end' },
      { l: 'rk', w: 6, g: 'end' },
      { l: 'rl', w: 7, g: 'end' },
      { l: 'rt', w: 6, g: 'end' },
      { l: 'rp', w: 6, g: 'end' },
      { l: 'rf', w: 4, g: 'end' },
      { l: 'rg', w: 5, g: 'end' },
      { l: 'rn', w: 8, g: 'end' },
      { l: 'rm', w: 4, g: 'end' },
      { l: 'rx', w: 2, g: 'end' },
      { l: 'rj', w: 1, g: 'end' },
      { l: 'sx', w: 3, g: 'end' },
      { l: 'tch', w: 2, g: 'end' },
      { l: 'tn', w: 4, g: 'end' },
      { l: 'tl', w: 2, g: 'end' },
      { l: 'xn', w: 1, g: 'end' },
      { l: 'xm', w: 1, g: 'end' },
      { l: 'xl', w: 1, g: 'end' },
    ]

    // 1/4 chance to use y as a vowel instead of a consonant
    if (yIsVowel) {
      vowels.push({ l: 'y', w: 1 })
    } else {
      consonants.push({ l: 'y', w: 7, g: 'start' })
    }

    const vowelsMap = vowels.map(x => x.l)

    // Grab a random phoneme from the pool
    // If it's only one letter, chance to double it
    const samplePool = (pool: Phoneme[], lastCharIsVowel = false) => {
      const p = []
      pool.forEach(x => this.sizedArray(x.w).forEach(() => p.push(x.l)))
      let phoneme = this.randomFromArray(p)
      const tooManyVowels = vowelsMap.includes(phoneme) && lastCharIsVowel

      if (phoneme.length === 1 && word.length !== 0 && phoneme !== 'y' && this.randomNumber(1, 13) === 1 && !tooManyVowels) {
        phoneme = `${phoneme}${phoneme}`
      }

      if (phoneme === 'y' && yIsVowel) {
        vowels.splice(5, 1)
      }

      return phoneme
    }

    const lastCharVowel = () => {
      const lastChar = this.lastChar(word.join(''))
      return vowelsMap.includes(lastChar)
    }

    let sylTypes = []
    let hyphenated = false
    const hyphenateChance = this.randomNumber(1, 20) === 1
    const doubleVowelChance = this.randomNumber(1, 3) === 1
    let lastCharIsVowel = false

    if (word.length !== 0) {
      const runawayVowels = word.length > 1 && word.join('').slice(-2).split('').every(x => vowelsMap.includes(x))
      lastCharIsVowel = lastCharVowel()
      if (lastCharIsVowel || hyphenateChance) {
        sylTypes.push('zaz')
        sylTypes.push('za')
      }

      if (!runawayVowels && (!lastCharIsVowel || doubleVowelChance)) {
        sylTypes.push('az')
        if (totalSyllables > 1) {
          sylTypes.push('a')
        }
      }
    } else {
      sylTypes = ['az', 'za', 'zaz']
      if (totalSyllables > 1) {
        sylTypes.push('a')
      }
    }

    const sylType = this.randomFromArray(sylTypes)
    let syllable = ''

    switch (sylType) {
      case 'a':
        syllable = samplePool(vowels, lastCharIsVowel)
        break
      case 'az':
        syllable = `${samplePool(vowels, lastCharIsVowel)}${samplePool(consonants.filter(x => x.g !== 'start'))}`
        break
      case 'za':
        hyphenated = hyphenateChance && word.length !== 0 && !lastCharIsVowel
        syllable = `${samplePool(consonants.filter(x => x.g !== 'end'))}${samplePool(vowels, lastCharIsVowel)}`
        break
      case 'zaz':
        hyphenated = hyphenateChance && word.length !== 0 && !lastCharIsVowel
        syllable = `${samplePool(consonants.filter(x => x.g !== 'end'))}${samplePool(vowels, lastCharIsVowel)}${samplePool(consonants.filter(x => x.g !== 'start'))}`
        break
    }

    if (hyphenated) {
      word.push(this.randomFromArray(['-', "'"]))
      syllable = `${syllable[0].toUpperCase()}${syllable.slice(1)}`
    }

    word.push(syllable)
  }

}
