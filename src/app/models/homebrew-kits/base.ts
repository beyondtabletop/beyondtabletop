import { BtBase } from '../common/base'
import { HomebrewKitDnd5e } from './dnd5e'
import { HomebrewKitPathfinder } from './pathfinder';

export class HomebrewKitBase extends BtBase {
  version: number
  name: string
  change_id: string
  tool_type: string
  dnd5e: HomebrewKitDnd5e
  pathfinder: HomebrewKitPathfinder

  getProto() {
    return {
      version: 0,
      name: 'New Homebrew Kit',
      change_id: '0',
      tool_type: 'choose',
      dnd5e: new HomebrewKitDnd5e(),
      pathfinder: new HomebrewKitPathfinder(),
    }
  }
}
