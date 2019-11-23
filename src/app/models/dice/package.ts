import { DiceRecord } from './record';

export interface DicePackage {
  record: DiceRecord
  modifier: number
  sides: number
  name?: string
  phrasing?: string
  result: any
  empty?: boolean
}
