import { BtBase } from '../common/base'
import { BtList } from '../common/list'
import { CampaignTool } from './tool'
import { CampaignChat } from './chat'
import { CampaignPlayer } from './player'
import { CampaignAudioCue } from './audio-cue'
import { CampaignLog } from './log'
import { CampaignQuest } from './quest'
import { CampaignNpc } from './npc'
import { CampaignFoe } from './foe'

export class CampaignBase extends BtBase {
  version: number
  name: string
  change_id: string
  lists: BtList[]
  tools: CampaignTool[]
  chats: CampaignChat[]
  players: CampaignPlayer[]
  audio_cues: CampaignAudioCue[]
  logs: CampaignLog[]
  quests: CampaignQuest[]
  npcs: CampaignNpc[]
  foes: CampaignFoe[]

  getProto() {
    return {
      version: 6,
      name: 'New Campaign',
      change_id: '0',
      oversized: false,
      lists: [],
      tools: [],
      chats: [],
      players: [],
      audio_cues: [],
      logs: [],
      quests: [],
      npcs: [],
      foes: [],
    }
  }

  getLookup() {
    return {
      lists: BtList,
      tools: CampaignTool,
      chats: CampaignChat,
      players: CampaignPlayer,
      audio_cues: CampaignAudioCue,
      logs: CampaignLog,
      quests: CampaignQuest,
      npcs: CampaignNpc,
      foes: CampaignFoe,
    }
  }
}
