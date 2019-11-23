import { BtBase } from '../common/base'

export class PathfinderSave extends BtBase {
  name: string
  misc: number
  base: number
  ability: string
  auto: number
  getProto() {
    return {
      name: 'FORT',
      misc: 0,
      base: 0,
      ability: 'CON',
      auto: 0,
    }
  }
}
