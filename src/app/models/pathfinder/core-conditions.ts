import { BtBase } from '../common/base'

export class PathfinderCoreConditions extends BtBase {
  blinded: boolean
  confused: boolean
  cowering: boolean
  dazed: boolean
  dazzled: boolean
  deafened: boolean
  entangled: boolean
  exhausted: boolean
  fascinated: boolean
  fatigued: boolean
  frightened: boolean
  grappled: boolean
  haste: boolean
  nauseated: boolean
  panicked: boolean
  paralyzed: boolean
  pinned: boolean
  shaken: boolean
  sickened: boolean
  staggered: boolean
  stunned: boolean

  getProto() {
    return {
      blinded: false,
      confused: false,
      cowering: false,
      dazed: false,
      dazzled: false,
      deafened: false,
      entangled: false,
      exhausted: false,
      fascinated: false,
      fatigued: false,
      frightened: false,
      grappled: false,
      haste: false,
      nauseated: false,
      panicked: false,
      paralyzed: false,
      pinned: false,
      shaken: false,
      sickened: false,
      staggered: false,
      stunned: false,
    }
  }
}
