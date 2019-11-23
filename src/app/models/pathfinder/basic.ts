import { BtBase } from '../common/base'

export class PathfinderBasic extends BtBase {
  race: string
  size: string
  xp: number
  xp_next: number
  progression: string
  image: string

  getProto() {
    return {
      race: 'Human',
      size: 'Medium',
      xp: 0,
      xp_next: 1000,
      progression: 'Medium',
      image: '',
    }
  }
}
