import { Injectable } from '@angular/core'
import { SheetService } from './sheet.service'

import { CampaignBase } from '../models/campaign/base'
import { StorageService } from './storage.service'
import { moveItemInArray } from '@angular/cdk/drag-drop'
import { SharingService } from './sharing.service'
import { DiceService } from './dice.service'
import { CampaignTool } from '../models/campaign/tool'
import { CampaignChat } from '../models/campaign/chat'
import { CampaignPlayer } from '../models/campaign/player'
import { CampaignAudioCue } from '../models/campaign/audio-cue'
import { BtList } from '../models/common/list'
import { BtNote } from '../models/common/note'
import { CampaignLog } from '../models/campaign/log'
import { CampaignQuest } from '../models/campaign/quest'
import { CampaignNpc } from '../models/campaign/npc'
import { CampaignNpcDetail } from '../models/campaign/npc-detail'
import { CampaignFoe } from '../models/campaign/foe'
import { CampaignPayload } from '../models/campaign/payload'
import { BtPlayerTool } from '../models/common/player-tool.model'
import { BtPermission } from '../models/common/permission.model'
import { format, parse } from 'date-fns'
import { CampaignCommand } from '../models/campaign/command.model'
import { BtUser } from '../models/common/user.model'
import { HttpService } from './http.service'
import { InterfaceService } from './interface.service'
import { take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class CampaignService {

  constructor(
    public sheetSvc: SheetService,
    public store: StorageService,
    public sharer: SharingService,
    private diceSvc: DiceService,
    public http: HttpService,
    public interfaceSvc: InterfaceService,
  ) { }

  public payload = (docId: string): CampaignPayload => {
    const self: CampaignPayload = {} as CampaignPayload
    self.model = new CampaignBase
    self.methods = {}
    self.meta = {
      subscriptions: {},
      undefinedErrorCount: 0,
    }
    self.locals = {
      player_nickname: {
        busy: false,
        name: '',
      },
      document_id: docId,
      ready: false,
      forbidden: false,
      model_loaded: false,
      document_failed: false,
      error: false,
      choosing_tools: false,
      tabs: { active: 'summary', showing_nav: false, list: [
        { title: 'Summary', id: 'summary', role: 'writer|owner' },
        { title: 'Adventure', id: 'adventure', role: 'owner' },
        { title: 'Lists', id: 'lists', role: 'writer|owner' },
        { title: 'NPCs', id: 'npcs', role: 'owner' },
        { title: 'Enemies', id: 'enemies', role: 'owner' },
        { title: 'Monsters', id: 'monsters', role: 'owner' },
        { title: 'Audio Cues', id: 'audio', role: 'owner' },
        { title: 'Settings', id: 'settings', role: 'writer|owner' },
      ], tools: [] },
      available_space: 'area-below-desktop',
      showing_chat: false,
      chat_minimized: false,
      mute_audio: false,
      audio_mult: 10,
      tool_owner: false,
      rolls: [],
      permissions: [],
      player_emails: {},
      collaborators: [],
      btt_files: [],
      available_tools: [],
      adding_tool_type: 'battlemap|dnd5e|pathfinder|rpg',
      readable_types: {
        'battlemap': 'Battlemap',
        'dnd5e': 'D&D 5E Sheet',
        'pathfinder': 'Pathfinder Sheet',
        'rpg': 'RPG Sheet',
      },
      empty_map: { title: 'No Map Set' },
      modals: {
        main: false,
        tools: false,
      },
      legacyDateFormat: 'MMM d, yyyy - H:mm',
      dateFormat: 'yyyy-MM-dd',
      chatbox: '',
      command_list: {
        help: (chat: CampaignChat, command: CampaignCommand): CampaignChat => {
          chat.type = 'html'
          chat.text = '/roll or /r to roll dice with a valid dice expression.\nExample: /roll 2d8 + 4\n\n/secretroll works the same way, but only you and the campaign creator (GM) can see the results\nExample: /secretroll 8d6'
          return chat
        },
        roll: (chat: CampaignChat, command: CampaignCommand): CampaignChat => {
          chat.type = 'diceroll'
          chat.text = self.methods.interpretDiceroll(command)
          return chat
        },
        secretroll: (chat: CampaignChat, command: CampaignCommand): CampaignChat => {
          chat.type = 'secret_diceroll'
          chat.text = self.methods.interpretDiceroll(command)
          return chat
        },
      },
      active_note: '',
      active_npc: '',
      selection: {
        audio_types: [
          { label: 'Youtube ID', value: 'youtube' },
          { label: 'MP3 URL', value: 'mp3' },
          { label: 'OGG URL', value: 'ogg' },
        ],
        monster_levels: [
          'Any', 'CR 1 or Less', 'CR 2', 'CR 3', 'CR 4', 'CR 5', 'CR 6', 'CR 7', 'CR 8', 'CR 9', 'CR 10', 'CR 11', 'CR 12', 'CR 13', 'CR 14', 'CR 15', 'CR 16', 'CR 17', 'CR 18', 'CR 19', 'CR 20 or More',
        ]
      },
      monster_search: '',
      monster_level: 'Any',
      user: {},
      player: {},
      monsters: [],
    }

    // Command shortcuts
    self.locals.command_list['r'] = self.locals.command_list['roll']


    //***************************************************************************
    // Controller stuff
    //***************************************************************************

    self.methods.onModelReady = (): void => {
      self.locals.model_loaded = true
      loadMonsterData()

      self.methods.getTitle()
      self.methods.doIOwnThisTool()
    }

    self.methods.onUnfrozen = (): void => {
      self.locals.model_loaded = true
      finishedLoading()
    }

    self.methods.getTitle = (): void => {
      // $window.document.title = self.model.name + ' | Beyond Tabletop'
    }

    self.methods.updateTitle = async (): Promise<void> => {
      await Promise.resolve()
      self.touch()
      if (self.locals.permission.writer) {
        this.store.updatePlayerToolTitle(self.locals.user.firebase_id, self.locals.document_id, self.model.name)
      }
    }

    const loadMonsterData = async (): Promise<void> => {
      const data = await this.http.getLocalAsPromise('/assets/data/dnd5e/monsters.json')
      self.locals.monsters = data.monsters
      finishedLoading()
    }

    const finishedLoading = (): void => {
      self.locals.ready = true
      self.methods.goToBottomOfChat()
    }

    self.methods.onPlayerUpdate = (array: BtPlayerTool[]): void => {
      self.locals.available_tools = array.filter(tool => self.methods.isValidType(tool.tool_type)).map(tool => self.methods.createTool(tool))

      // Now we check for name changes
      self.methods.listTools().forEach((savedTool: BtPlayerTool): void => {
        const title = (self.locals.available_tools.find(x => x.id === savedTool.id) || {}).title
        savedTool.title = title || savedTool.title
      })
    }

    self.methods.shareDocument = (): void => {
      this.sharer.openSharingModal({
        id: self.locals.document_id,
        role: self.locals.player.role,
        title: self.model.name,
        tool_type: 'campaign',
      }, 'campaign')
    }

    /******************************************************
     * Accessor Methods
     ******************************************************/

    self.methods.$add = (parent: any, slug: string, construct: any, init: any = {}): void => {
      self.touch()
      parent[slug] = parent[slug] || []
      const item = new construct(init)
      parent[slug].push(item)
    }

    // Tools
    // ---------------------------------------------------
    self.methods.listTools = (): CampaignTool[] => self.model.tools || []

    self.methods.addTool = (tool: BtPlayerTool): void => {
      tool.$added = true
      const match: CampaignTool = self.methods.listTools().find(x => x.id === tool.id)
      if (!match) {
        self.methods.$add(self.model, 'tools', CampaignTool, tool)
      }
    }

    self.methods.removeTool = (tool: CampaignTool): void => {
      const match: BtPlayerTool = self.locals.available_tools.find(x => x.id === tool.id)
      if (!!match) {
        match.$added = false
      }
      self.methods.removeByObject(self.model.tools, tool)
    }

    self.methods.removeToolById = (id: string): void => {
      const tool: CampaignTool = self.methods.listTools().find(x => x.id === id)
      if (!!tool) {
        self.methods.removeTool(tool)
      }
    }

    self.methods.addToolFromModal = (tool: BtPlayerTool): void => {
      self.methods.addTool(tool)
      if (typeof self.locals.modals.callback === 'function') {
        self.locals.modals.callback(tool)
      }
    }

    // Chats
    // ---------------------------------------------------
    self.methods.listChats = (): CampaignChat[] => self.model.chats || []

    self.methods.sendChat = (): void => {
      if (!self.locals.chatbox) { return }

      const chat = self.methods.interpretChat() // check for false
      if (!!chat) {
        self.methods.addChat(chat)
      }
      self.locals.chatbox = ''
    }

    self.methods.addChat = (chat: CampaignChat): void => {
      self.methods.$add(self.model, 'chats', CampaignChat, chat)
      self.methods.pruneChats()
      self.methods.goToBottomOfChat()
    }

    // keeps the chat log from getting too long. Cuts out the oldest chats
    // anything over 100 is TOO LONG
    self.methods.pruneChats = (): void => {
      const index = self.methods.listChats().length - 100
      if (index > 0) {
        self.model.chats.splice(0, index)
      }
    }

    self.methods.toggleChat = (): void => {
      self.locals.chat_minimized = !self.locals.chat_minimized
      self.locals.player.chat_minimized = self.locals.chat_minimized
      self.touch()
    }

    // Players
    // ---------------------------------------------------
    self.methods.listPlayers = (): CampaignPlayer[] => self.model.players || []
    self.methods.addPlayer = (player: CampaignPlayer): void => self.methods.$add(self.model, 'players', CampaignPlayer, player)

    self.methods.removePlayer = async (player: CampaignPlayer): Promise<void> => {
      player.$busy = true
      await this.store.deleteFirebaseToolFromPlayer(self.locals.document_id, player.id)
      await this.store.deleteFirebaseUserPermission(self.locals.document_id, player.id)
      self.methods.removeByObject(self.model.players, player)
    }

    self.methods.prunePlayerById = (id: string): void => {
      const player = self.methods.listPlayers().find(x => x.id === id)
      if (!!player) {
        self.methods.removeByObject(self.model.players, player)
      }
    }

    // Audio Cues
    // ---------------------------------------------------
    self.methods.listAudioCues = (): CampaignAudioCue[] => self.model.audio_cues || []
    self.methods.listLoadedAudioCues = (): CampaignAudioCue[] => self.methods.listAudioCues().filter(x => x.loaded)
    self.methods.listLoadedActiveAudioCues = (): CampaignAudioCue[] => self.methods.listAudioCues().filter(x => x.loaded && x.$active !== false)

    self.methods.addAudioCue = (): void => {
      self.methods.$add(self.model, 'audio_cues', CampaignAudioCue, {
        pos: self.methods.listAudioCues().length
      })
    }

    self.methods.toggleCue = async (cue: CampaignAudioCue, local = false): Promise<void> => {
      await Promise.resolve()
      if (local) {
        if (cue.$active === undefined) { cue.$active = true }
        cue.$active = !cue.$active
        return
      }
      cue.loaded = !cue.loaded
      if (cue.loaded) {
        self.methods.addChat({
          text: `♪ Now playing audio: ${cue.name} ♫`
        })
      }
      self.touch()
    }

    self.methods.toggleVolume = (cue: CampaignAudioCue, volumePropertyName = 'volume') => {
      cue[volumePropertyName] = (cue[volumePropertyName] || 4) - 1
      if (cue[volumePropertyName] < 1) {
        cue[volumePropertyName] = 4
      }

      self.methods.setCueVolume(cue)
      self.touch()
    }

    self.methods.setLocalVolume = async () => {
      await Promise.resolve()
      self.methods.listLoadedActiveAudioCues().forEach((cue: CampaignAudioCue) => self.methods.setCueVolume(cue))
    }

    self.methods.setCueVolume = (cue: CampaignAudioCue) => {
      const volumePropertyName = cue.$volume === undefined ? 'volume' : '$volume'
      if (cue.$player && cue.audio_type === 'youtube') {
        cue.$player.setVolume((cue[volumePropertyName] - 1) * self.locals.audio_mult)
      }

      if (cue.$player && cue.audio_type !== 'youtube') {
        cue.$player.volume = ((cue[volumePropertyName] - 1) * self.locals.audio_mult) / 100
      }
    }

    self.methods.volumeIcon = (cue: CampaignAudioCue, volumePropertyName = 'volume') => {
      switch (cue[volumePropertyName]) {
        case 4: return 'volume_up'
        case 3: return 'volume_down'
        case 2: return 'volume_mute'
        case 1: return 'volume_off'
        default: return 'volume_up'
      }
    }

    self.methods.toggleRepeat = (cue: CampaignAudioCue) => {
      cue.loop = !cue.loop
      self.touch()
    }

    // Lists
    // ---------------------------------------------------
    self.methods.listLists = (): BtList[] => {
      return (self.model.lists || []).filter(x => x.author_id === self.locals.user.firebase_id)
    }

    self.methods.listListsBySpecial = (special: boolean): BtList[] => {
      return self.methods.listLists().filter(x => x.special === special)
    }

    self.methods.addList = (name: string): void => {
      self.methods.$add(self.model, 'lists', BtList, {
        name: name || '',
        pos: self.methods.listListsBySpecial(false).length,
        author_id: self.locals.user.firebase_id,
      })
    }

    // List Items
    // ---------------------------------------------------
    self.methods.listListItems = (list: BtList): BtNote[] => list.items || []
    self.methods.getListItem = (list: BtList, index: number): BtNote => list.items[index]

    self.methods.addListItem = (list: BtList, text: string): void => {
      self.methods.$add(list, 'items', BtNote, {
        text: text || '',
        pos: self.methods.listListItems(list).length,
      })
    }

    self.methods.addNote = (list: BtList, text: string): void => {
      self.methods.$add(list, 'items', BtNote, {
        text: text || '',
        pos: self.methods.listListItems(list).length,
      })
      const item = this.sheetSvc.lastFromArray(self.methods.listListItems(list))
      if (item) {
        self.methods.setActiveNote(item)
      }
    }

    // Logs
    // ---------------------------------------------------
    self.methods.listLogs = (): CampaignLog[] => self.model.logs || []

    self.methods.addLog = (): void => {
      self.methods.$add(self.model, 'logs', CampaignLog, {
        created_at: self.methods.currentTime(),
        pos: self.methods.listLogs().length,
      })
    }

    self.methods.getMostRecentLogInArray = (): CampaignLog[] => {
      const log = self.methods.listLogs()[0]
      return log ? [log] : []
    }

    self.methods.getLogSummary = (log: CampaignLog): string => {
      let summary = log.summary

      if (!summary) {
        summary = (log.text || '').substr(0, 500)
      }

      const index = summary.indexOf('\n')

      if (index > -1) {
        summary = summary.substr(0, index)
      }

      return summary
    }

    // Quests
    // ---------------------------------------------------
    self.methods.listQuests = (): CampaignQuest[] => self.model.quests || []
    self.methods.listKnownQuests = (): CampaignQuest[] => self.methods.listQuests().filter(x => x.known && !x.completed_at)
    self.methods.anyKnownQuests = (): boolean => self.methods.listKnownQuests().length > 0

    self.methods.addQuest = (): void => {
      self.methods.$add(self.model, 'quests', CampaignQuest, {
        pos: self.methods.listQuests().length,
      })
    }

    self.methods.startQuest = (quest: CampaignQuest): void => {
      quest.started_at = self.methods.currentTime()
      self.touch()
    }
    self.methods.completeQuest = (quest: CampaignQuest): void => {
      quest.completed_at = self.methods.currentTime()
      self.touch()
    }
    self.methods.questIsNotStarted = (quest: CampaignQuest): boolean => !quest.started_at
    self.methods.questIsIncomplete = (quest: CampaignQuest): boolean => !!quest.started_at && !quest.completed_at

    // NPCs
    // ---------------------------------------------------
    self.methods.listNPCs = (): CampaignNpc[] => self.model.npcs || []
    self.methods.listKnownNPCs = (): CampaignNpc[] => self.methods.listNPCs().filter(x => x.known === true)
    self.methods.anyKnownNPCs = (): boolean => self.methods.listKnownNPCs().length > 0
    self.methods.isActiveNPC = (npc: CampaignNpc): boolean => npc.id === self.locals.active_npc

    self.methods.addNPC = (npc: CampaignNpc = new CampaignNpc): void => {
      npc.pos = self.methods.listNPCs().length
      npc.name = `${this.sheetSvc.randomName()} ${this.sheetSvc.randomName()}`
      self.methods.$add(self.model, 'npcs', CampaignNpc, npc)
      self.locals.active_npc = self.model.npcs[self.model.npcs.length - 1].id
    }

    self.methods.toggleActiveNPC = (npc: CampaignNpc): void => {
      self.locals.active_npc = self.methods.isActiveNPC(npc) ? null : npc.id
    }

    self.methods.getNPCClass = (npc: CampaignNpc): string => self.methods.isActiveNPC(npc) ? 'active' : 'inactive'
    self.methods.getAbilityMod = (detail: CampaignNpcDetail): number => {
      if (typeof detail.value === 'number') {
        return Math.floor((detail.value - 10) / 2)
      }
    }

    self.methods.randomName = (npc: CampaignNpc): void => {
      npc.name = `${this.sheetSvc.randomName()} ${this.sheetSvc.randomName()}`
      self.touch()
    }

    // NPC Details
    // ---------------------------------------------------
    self.methods.listNPCDetails = (npc: CampaignNpc): CampaignNpcDetail[] => npc.details || []
    self.methods.listNPCDetailsByGroup = (npc: CampaignNpc, group: string): CampaignNpcDetail[] => self.methods.listNPCDetails(npc).filter(x => x.group === group)

    self.methods.addNPCDetail = (npc: CampaignNpc, group: string): void => {
      self.methods.$add(npc, 'details', CampaignNpcDetail, {
        pos: self.methods.listNPCDetailsByGroup(npc, group).length,
        group: group,
      })
    }

    self.methods.listKnownNPCDetails = (npc: CampaignNpc, group: string): CampaignNpcDetail[] => self.methods.listNPCDetails(npc).filter(x => x.known && x.group === group)
    self.methods.anyDetailsVisible = (npc: CampaignNpc): boolean => self.methods.listNPCDetails(npc).some(d => d.known)

    // Foes
    // ---------------------------------------------------
    self.methods.listFoes = (): CampaignFoe[] => self.model.foes || []
    self.methods.listKnownFoes = (): CampaignFoe[] => self.methods.listFoes().filter(x => x.known === true)
    self.methods.anyKnownFoes = (): boolean => self.methods.listKnownFoes().length > 0

    self.methods.addFoe = (foe: CampaignFoe = new CampaignFoe): void => {
      foe.pos = self.methods.listFoes().length
      foe.name = `${this.sheetSvc.randomName()} ${this.sheetSvc.randomName()}`
      self.methods.$add(self.model, 'foes', CampaignFoe, foe)
      self.locals.active_npc = self.model.foes[self.model.foes.length - 1].id
    }

    self.methods.moveNPC = (npc: CampaignNpc, name: string): void => {
      if (name === 'foes') {
        self.methods.addFoe(npc)
        self.methods.removeByObject(self.model.npcs, npc)
      } else {
        self.methods.addNPC(npc)
        self.methods.removeByObject(self.model.foes, npc)
      }
    }

    self.methods.filteredMonsters = (): any[] => {
      return self.locals.monsters.filter(x => monsterIncludesText(x, self.locals.monster_search) && monsterWithinCR(x))
    }

    const monsterIncludesText = (monster: any, text: string): boolean => {
      text = text.toLowerCase()
      return monster.name.toLowerCase().includes(text)
    }

    const monsterWithinCR = (monster): boolean => {
      const targetNumber = parseInt(self.locals.monster_level.replace(/[^\d]*(\d+)[^\d]*/gi, '$1'))
      let monsterNumber = 0
      try {
        monsterNumber = eval(monster.challenge)
      } catch {
        monsterNumber = 0
      }

      if (targetNumber === 1 && monsterNumber <= 1) { monsterNumber = 1 }
      if (targetNumber === 20 && monsterNumber >= 20) { monsterNumber = 20 }

      return self.locals.monster_level === 'Any' || targetNumber === monsterNumber
    }

    //***************************************************************************
    // Helper methods
    //***************************************************************************

    self.methods.openChooser = (): void => { self.locals.choosing_tools = true }
    self.methods.closeChooser = (): void => { self.locals.choosing_tools = false }

    self.methods.backgroundStyle = this.sheetSvc.backgroundStyle
    self.methods.removeByObject = (array, item) => {
      self.touch()
      this.sheetSvc.removeByObject(array, item)
    }
    self.methods.selectionReverseLookup = this.sheetSvc.selectionReverseLookup
    self.methods.canDeletePlayer = (player): boolean => self.methods.isGM() && !self.methods.isGM(player)

    self.methods.shareMapWithCampaignPlayers = async (map: BtPlayerTool): Promise<void> => {
      this.store.documentPermissions$(map.id).pipe(take(1)).subscribe((permissions: BtPermission[]) => {
        const map_player_ids = permissions.map(x => x.id)
        self.methods.listPlayers().filter(player => !map_player_ids.includes(player.id)).forEach((player: CampaignPlayer) => {
          this.sharer.shareDocument(
            map.id,
            'battlemap',
            {
              firebase_id: player.id,
              email: self.locals.player_emails[player.id],
              name: player.name,
            } as BtUser,
            map.title
          )
        })
      })
    }

    self.methods.onSortableDrop = (e): void => {
      moveItemInArray(e.container.data, e.previousIndex, e.currentIndex)
      self.touch()
    }

    self.methods.truncate = (text: string, limit: number): string => text.substring(0, limit + 1)
    self.methods.currentTime = (): string => format(new Date(), self.locals.dateFormat)
    self.methods.displayDate = (str: string): string => {
      try {
        return format(parse(str, self.locals.dateFormat, new Date()), 'MMM d')
      } catch {
        try {
          return format(parse(str, self.locals.legacyDateFormat, new Date()), 'MMM d')
        } catch {
          return str
        }
      }
    }

    //***************************************************************************
    // Modal methods
    //***************************************************************************

    self.methods.openToolsModal = (callback: Function): void => {
      self.locals.modals.main = true
      self.locals.modals.tools = true
      self.locals.modals.callback = callback
    }

    self.methods.closeAllModals = (): void => {
      Object.keys(self.locals.modals).forEach((key: string) => self.locals.modals[key] = false)
    }

    self.methods.showingModal = (slug: string): boolean => self.locals.modals[slug]
    self.methods.getSiteModalClasses = (): any => ({'showing-modal': self.methods.showingModal('main')})

    //***************************************************************************
    // Tab methods
    //***************************************************************************

    self.methods.getTabById = (id: string): any => self.locals.tabs.list.find(x => x.id === id) || {title: ''}

    self.methods.switchTab = (id: string): any => {
      self.touch()
      self.locals.showing_chat = false
      self.locals.tabs.active = id
      self.locals.player.tab = id
      // $window.document.title = self.methods.getTabById(id).title + ' | ' + self.model.name + ' | Beyond Tabletop'
    }

    self.methods.listTabs = (): any[] => self.locals.tabs.list.filter(tab => !tab.role || tab.role.includes(self.locals.player.role))
    self.methods.toggleNav = (): void => { self.locals.tabs.showing_nav = !self.locals.tabs.showing_nav }
    self.methods.isTabActive = (id: string): boolean => self.locals.tabs.active === id
    self.methods.tabClass = (id: string): any => ({ active: self.methods.isTabActive(id) })

    self.methods.getActiveNavItem = (): string => {
      const tab = self.locals.tabs.list.find(x => x.id === self.locals.tabs.active) || { title: '' }
      return tab.title
    }

    self.methods.getTableTabsClass = (): any => ({ 'full-height': !self.locals.tabs.list.some(x => x.id === self.locals.tabs.active) })

    self.methods.switchTabByTool = (tool: CampaignTool): void => {
      const tab = self.locals.tabs.list.find(x => x.id === tool.id)
      !!tab ? self.methods.switchTab(tool.id) : self.methods.openTool(tool)
      // having to call openTool means the tool is saying it's open but it's really not
      // This happens when you open a table, open a tool, then navigate
      // away from the table entirely without refreshing. If you then
      // come back to the table, tools stored in locals will say they're
      // still good but they won't be.
      // ANGULAR 7 NOTE: the above comment may not be true anymore
    }

    self.methods.setPlayerLastTab = (): void => {
      if (self.locals.tabs.list.some(x => x.id === self.locals.player.tab)) {
        self.methods.switchTab(self.locals.player.tab)
      }
    }

    //***************************************************************************
    // Player methods
    //***************************************************************************

    self.methods.isGM = (player: CampaignPlayer = self.locals.player): boolean => player.role === 'owner'
    self.methods.currentPlayer = (): CampaignPlayer => self.methods.listPlayers().find(x => x.id === self.locals.user.firebase_id) || {}
    self.methods.getPlayerById = (id: string): CampaignPlayer => self.methods.listPlayers().find(x => x.id === id)

    self.methods.getPlayerName = (player: CampaignPlayer): string => {
      if (!!player) {
        return player.nickname || player.name
      }
    }

    self.methods.getPlayerNameById = (id: string): string => {
      const player = self.methods.getPlayerById(id)
      return self.methods.getPlayerName(player)
    }

    self.methods.getPlayerClasses = (player: CampaignPlayer): any => ({ busy: player.$busy })

    self.methods.canLinkPlayerSheet = (player: CampaignPlayer): boolean => {
      return (self.methods.isGM() || player.id === self.locals.player.id) && !self.methods.playerHasSheet(player)
    }

    self.methods.canOpenPlayerSheet = (player: CampaignPlayer): boolean => {
      const sheet = self.methods.getPlayerSheet(player)
      return !!sheet
    }

    self.methods.canRemovePlayerSheet = (player: CampaignPlayer): boolean => {
      const sheet = self.methods.getPlayerSheet(player)
      return !!sheet && (self.methods.doIOwnTool(sheet) || self.methods.isGM() || self.locals.player.id === player.id)
    }

    self.methods.canAddSheetAsTokenToMap = (player: CampaignPlayer): boolean => {
      return (self.methods.isGM() || player.id === self.locals.player.id) && self.methods.hasOpenCampaignMap() && self.methods.playerHasOpenSheet(player)
    }

    self.methods.addPlayerSheetAsToken = (player: CampaignPlayer): void => {
      this.store.addCharacterAsTokenById(player.sheet_id)
      this.interfaceSvc.showNotice('Token added!')
    }

    self.methods.getPlayerSheet = (player: CampaignPlayer): CampaignTool => {
      return self.methods.listTools().find(x => x.id === player.sheet_id)
    }

    self.methods.playerHasSheet = (player: CampaignPlayer): boolean => {
      const sheet = self.methods.getPlayerSheet(player)
      return !!sheet
    }

    self.methods.playerHasOpenSheet = (player: CampaignPlayer): boolean => {
      const sheet = self.methods.getPlayerSheet(player)
      return !!sheet && sheet.$disabled
    }

    self.methods.getPlayerSheetName = (player: CampaignPlayer): string => {
      const sheet = self.methods.getPlayerSheet(player) || { title: '' }
      return sheet.title
    }

    //***************************************************************************
    // Tool methods
    //***************************************************************************

    self.methods.getAvailableTools = (): BtPlayerTool => self.locals.available_tools.filter(t => !t.$added && self.locals.adding_tool_type.includes(t.tool_type))

    self.methods.openTool = (tool: CampaignTool): void => {
      tool.$disabled = true

      // Add to tabs list for nav
      self.locals.tabs.tools.push({ id: tool.id, tool_type: tool.tool_type })
      self.locals.tabs.list.push({ title: tool.title, id: tool.id, role: 'writer|owner' })
      self.methods.switchTab(tool.id)
    }

    self.methods.openToolById = (id: string): void => {
      const tool = self.methods.listTools().find(x => x.id === id)
      if (tool) {
        self.methods.openTool(tool)
      }
    }

    self.methods.doIOwnThisTool = (): void => {
      self.locals.tool_owner = self.locals.permission.role === 'owner'
    }

    self.methods.doIOwnTool = (tool: CampaignTool): boolean => {
      const matching_tool = self.locals.available_tools.find(x => x.id === tool.id)
      if (matching_tool) {
        return tool.$role === 'owner'
      }
    }

    self.methods.isToolAdded = (id: string): boolean => !!self.methods.listTools().find(x => x.id === id)
    self.methods.isValidType = (type: string): boolean => type && ['battlemap', 'dnd5e', 'pathfinder', 'rpg'].includes(type)

    self.methods.createTool = (document: BtPlayerTool): any => {
      return { tool_type: document.tool_type, id: document.id, title: document.title, $added: self.methods.isToolAdded(document.id) }
    }

    self.methods.setToolTitle = (doc_id: string, title: string): void => {
      [
        ...self.methods.listTools(),
        ...self.locals.available_tools,
        ...self.locals.tabs.list
      ].filter(x => x.id === doc_id).forEach(x => x.title = title)
    }

    const getCampaignMap = (): CampaignTool => self.methods.listTools().find((x: CampaignTool) => x.tool_type === 'battlemap')
    self.methods.canRemoveTableMap = (): boolean => self.methods.hasCampaignMap() && self.methods.isGM()
    self.methods.hasCampaignMap = (): boolean => !!getCampaignMap()
    self.methods.hasOpenCampaignMap = (): boolean => {
      const map = getCampaignMap()
      return !!map && map.$disabled
    }

    self.methods.getCampaignMapArray = (): CampaignTool[] => {
      const map = getCampaignMap()
      return map ? [map] : [self.locals.empty_map]
    }

    self.methods.onMapToolClick = (map: CampaignTool): void => {
      // messy
      if (!map.id) {
        if (self.methods.isGM()) {
          self.locals.adding_tool_type = 'battlemap'
          self.methods.openToolsModal(tool => {
            self.methods.closeAllModals()
            self.methods.shareMapWithCampaignPlayers(tool)
          })
        }
      } else if (map.$disabled) {
        self.methods.switchTabByTool(map)
      } else {
        self.methods.openTool(map)
      }
    }

    self.methods.onPlayerSheetClick = (id: string): void => {
      const tool = self.methods.listTools().find(x => x.id === id)
      if (!tool) { return }
      if (tool.$disabled) {
        self.methods.switchTabByTool(tool)
      } else {
        self.methods.openTool(tool)
      }
    }

    self.methods.addSheetToPlayer = (player: CampaignPlayer): void => {
      self.locals.adding_tool_type = 'dnd5e|pathfinder|rpg'
      self.methods.openToolsModal((tool: CampaignTool) => {
        player.sheet_id = tool.id
        self.methods.closeAllModals()
      })
    }

    self.methods.removeSheetFromPlayer = (player: CampaignPlayer): void => {
      self.methods.removeToolById(player.sheet_id)
      player.sheet_id = null
    }

    //***************************************************************************
    // Dice methods
    //***************************************************************************

    self.methods.interpretDiceroll = (command: CampaignCommand): any => {
      const formula = command.params.replace(/\s/gi, '')
      const { text } = this.diceSvc.rollCustomDice({
        text: formula,
        name: formula,
      })
      return text
    }

    self.methods.addRollToChat = ({ player_id, name, packs }): void => {
      if (!self.locals.ready) { return }
      self.methods.addChat({
        text: this.diceSvc.printRollResult(packs, ''),
        name,
        player_id,
        type: 'diceroll',
      })
    }

    self.methods.addCustomRollToChat = (result_string: string, id: string): void => {
      if (!self.locals.ready) { return }
      self.methods.addChat({
        text: result_string,
        name: self.methods.getPlayerNameById(id),
        player_id: id,
        type: 'diceroll'
      })
    }

    self.methods.rollFoeDice = (foe: CampaignFoe, attack: CampaignNpcDetail, slug: string): void => {
      const { text, result } = this.diceSvc.rollCustomDice({
        text: attack[slug],
        name: `${attack.name} (${slug === 'value' ? 'attack' : 'damage'})`,
      })

      if (result) {
        attack.$error = false
        self.methods.addChat({
          text,
          name: foe.name,
          player_id: null,
          type: 'diceroll'
        })
      } else {
        attack.$error = true
      }
    }

    //***************************************************************************
    // Chat methods
    //***************************************************************************

    self.methods.buildCommandObject = (chat: string): CampaignCommand => {
      const split = chat.split(' ')
      return {
        name: split.splice(0, 1)[0].substr(1),
        params: split.join(' ')
      } as CampaignCommand
    }

    self.methods.interpretKeypress = ($event: KeyboardEvent): void => {
      if ($event.key === 'Enter') {
        $event.preventDefault()
        self.methods.sendChat()
      }
    }

    self.methods.interpretChat = (): CampaignChat => {
      let newChat = new CampaignChat({
        text: self.locals.chatbox,
        name: self.methods.getPlayerName(self.locals.player),
        type: 'text',
        player_id: self.locals.player.id
      })

      // If the first char in chat is /, check if command exists
      if (self.locals.chatbox.charAt(0) === '/') {
        const command: CampaignCommand = self.methods.buildCommandObject(self.locals.chatbox)
        if (!!self.locals.command_list[command.name]) {
          newChat = self.locals.command_list[command.name](newChat, command)
        }
      }

      return newChat
    }

    self.methods.goToBottomOfChat = (): void => {
      setTimeout(() => {
        const elm = document.getElementById('chat-output')
        if (elm) {
          elm.scrollTop = elm.scrollHeight
        }
      }, 100)
    }

    self.methods.clearChat = (): void => { self.model.chats = [] }
    self.methods.isMyChat = (chat: CampaignChat): boolean => chat.player_id === self.locals.player.id
    self.methods.getChatClasses = (): any => ({ 'show-on-mobile': self.locals.showing_chat })
    self.methods.getChatName = (chat: CampaignChat): string => self.methods.getPlayerNameById(chat.player_id) || chat.name

    self.methods.getChatStyle = (chat: CampaignChat): any => {
      const player = self.methods.getPlayerById(chat.player_id)
      if (player) {
        return { color: player.color }
      }
    }

    self.methods.getNotesInArray = (): BtList[] => {
      if (!self.locals.ready) { return [] }
      const notes: BtList = self.methods.listListsBySpecial(true)[0]
      return notes ? [notes] : []
    }

    self.methods.getActiveNote = (): BtNote[] => {
      if (!self.locals.ready) { return [] }
      let note
      const list = self.methods.listListsBySpecial(true)[0]
      if (list) {
        note = self.methods.listListItems(list).find(x => x.id === self.locals.active_note) || self.methods.getListItem(list, 0)
      }
      return note ? [note] : []
    }

    self.methods.createNotes = (): void => {
      self.methods.$add(self.model, 'lists', BtList, {
        name: 'Notes',
        author_id: self.locals.user.firebase_id,
        special: true,
      })
    }

    const resortNotes = () => {
      const list = self.methods.listListsBySpecial(true)[0]
      if (list) {
        (list.items || []).sort((a, b) => b.opened_at - a.opened_at)
      }
    }

    self.methods.setActiveNote = (item: BtNote): void  => {
      self.locals.active_note = item.id
      item.opened_at = Date.now()
      resortNotes()
      self.touch()
    }

    return self
  }
}
