import { Injectable } from '@angular/core'
import { BattlemapBase } from '../models/battlemap/base'
import { SheetService } from './sheet.service'
import { StorageService } from './storage.service'
import { takeWhile } from 'rxjs/operators'
import { DragRef, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop'
import { Dnd5eService } from './dnd5e.service'
import { PathfinderService } from './pathfinder.service'
import { BattlemapPosition } from '../models/battlemap/position'
import { CampaignService } from './campaign.service';
import { BattlemapScene } from '../models/battlemap/scene';
import { BattlemapShape } from '../models/battlemap/shape';
import { BattlemapToken } from '../models/battlemap/token';
import { BattlemapTile } from '../models/battlemap/tile';
import { BattlemapCombatant } from '../models/battlemap/combatant';
import { BattlemapCombatantAttack } from '../models/battlemap/combatant-attack';
import { BtText } from '../models/common/text';

@Injectable({
  providedIn: 'root'
})
export class BattlemapService {

  constructor(
    public sheetSvc: SheetService,
    public store: StorageService,
    public dnd5eSvc: Dnd5eService,
    public pathfinderSvc: PathfinderService,
    public campaignSvc: CampaignService,
  ) { }

  public payload = (docId: string) => {
    const self: any = {}
    const tsDocument: any = document
    self.model = new BattlemapBase()
    self.methods = {}
    self.meta = {
      sources: [],
      undefinedErrorCount: 0,
    }
    self.locals = {
      ready: false,
      document_id: docId,
      forbidden: false,
      permissions: [],
      collaborators: [],
      document_failed: false,
      map: {
        zoom: 1,
        base_size: 8000,
        zoomed_size: 8000,
        base_tile: 40,
        zoomed_tile: 40,
        square_bg: 80,
        hex_bg_natural_x: 172,
        hex_bg_natural_y: 100,
        hex_bg: 100,
        hex_aspect: 0.58139535,
        iso_aspect: 0.57522124,
        iso_bg_natural_x: 112,
        iso_bg_natural_y: 64,
        iso_bg: 56,
        map_owner: false,
        zooming: false,
        drag_indicator: {
          top: 0,
          left: 0,
          distance: ''
        },
        context_menu: {
          top: 0,
          left: 0,
          active: false,
          items: []
        },
        pos: {
          left: -1200,
          top: -1200,
          ref: null,
        },
        offset: {
          x: 0, y: 0
        },
        keys: {
          shift: false
        },
        mode: 'drag'
      },
      cursor: {
        x: 0, y: 0
      },
      combatPanel: {
        top: '8px',
        right: '8px',
      },
      managementPanel: {
        top: '200px',
        left: '8px',
      },
      nav: {
        main: false,
        combat: true,
        management: true,
      },
      sizeLookups: {
        battle: {
          tiny:       { width: 40, height: 40 },
          small:      { width: 40, height: 40 },
          medium:     { width: 40, height: 40 },
          large:      { width: 80, height: 80 },
          huge:       { width: 120, height: 120 },
          gargantuan: { width: 160, height: 160 },
          colossal:   { width: 240, height: 240 },
        },
        hexagon: {
          tiny:     { width: 50, height: 50 },
          medium:     { width: 50, height: 50 },
          small:     { width: 50, height: 50 },
          large:      { width: 100, height: 100 },
          huge:       { width: 150, height: 150 },
          gargantuan: { width: 200, height: 200 },
          colossal:   { width: 300, height: 300 },
        },
        isometric: {
          tiny:     { width: 35,  height: 20,  imageWidth: 40, imageHeight: 80 },
          small:     { width: 35,  height: 20,  imageWidth: 40, imageHeight: 80 },
          medium:     { width: 35,  height: 20,  imageWidth: 40, imageHeight: 80 },
          large:      { width: 70,  height: 40,  imageWidth: 80, imageHeight: 160 },
          huge:       { width: 105, height: 60,  imageWidth: 120, imageHeight: 240 },
          gargantuan: { width: 140, height: 80,  imageWidth: 160, imageHeight: 320 },
          colossal:   { width: 210, height: 120, imageWidth: 240, imageHeight: 480 },
        },
      },
      drawing: {
        width: 3,
        color: 'blue',
        active: false,
        cleared: 0
      },
      tile: {
        width: 2560,
        height: 80,
        options: [],
        bg: {
          x: 0,
          y: 0,
          angle: 0
        }
      },
      modals: {
        main: false,
        settings: false
      },
      inputs: {
        mouse: {
          interval: null,
          offset: {
            x: 0,
            y: 0
          }
        }
      },
      nav_status: 'visible',
      toolbar: {
        activeItem: null,
        activeList: [],
        selectingTokens: false,
        selectingShapes: false,
        activeDummyItem: {
          label: '',
          round: false,
          pinned: false,
          tiled: false,
          fog: false,
          color: '',
          image: '',
          moving: false,
          active: false
        }
      },
      lookup: {
        sizes: {
            medium: 1,
          large: 2,
          huge: 3,
          gargantuan: 4,
          colossal: 6
        }
      },
      selection: {
        sizes: [
          { name: 'Tiny', value: 'tiny' },
          { name: 'Small', value: 'small' },
          { name: 'Medium', value: 'medium' },
          { name: 'Large', value: 'large' },
          { name: 'Huge', value: 'huge' },
          { name: 'Gargantuan', value: 'gargantuan' },
          { name: 'Colossal', value: 'colossal' }
        ],
        scene_types: [
          { label: 'Square Battlemap', value: 'battle' },
          { label: 'Hexagon Battlemap', value: 'hexagon' },
          { label: 'Isometric Battlemap', value: 'isometric' }
          // , { label: 'Overview Map', value: 'overview' }
        ]
      },
      available_tools: []
    }

    const checkCampaignId = (): void => {
      const id = this.store.getOpenCampaignId()
      if (id && id !== self.model.campaign_id) {
        self.model.campaign_id = id
      }
    }

    const defaultScene = () => {
      self.model.details.active_scene = self.model.details.active_scene || self.methods.listScenes()[0].id
    }

    self.methods.onModelReady = (): void => {
      self.methods.getTitle()
      checkCampaignId()
      defaultScene()
      self.methods.doIOwnThisMap()
      self.methods.loadSelectTiles()
      self.methods.goToCenter()
      self.locals.ready = true
    }

    self.methods.onUnfrozen = (): void => {
      self.locals.ready = true
      checkCampaignId()
      self.methods.getTitle()
    }

    self.methods.getTitle = (): void => {
      // $window.document.title = self.methods.getCurrentScene().name + ' | Beyond Tabletop'
    }

    self.methods.updateTitle = async (): Promise<void> => {
      await Promise.resolve()
      self.touch()
      if (self.locals.permission.writer) {
        this.store.updatePlayerToolTitle(self.locals.user.firebase_id, self.locals.document_id, self.model.name)
      }
    }

    self.methods.remove = this.sheetSvc.remove
    self.methods.removeByObject = this.sheetSvc.removeByObject
    self.methods.turnOnConfirmation = this.sheetSvc.turnOnConfirmation
    self.methods.turnOffConfirmation = this.sheetSvc.turnOffConfirmation
    self.methods.selectionReverseLookup = this.sheetSvc.selectionReverseLookup

    self.methods.doIOwnThisMap = (): void => {
      self.locals.map.map_owner = self.locals.permission.role === 'owner'
    }

    self.methods.onPlayerUpdate = (list: any[]): void => {
      self.locals.available_tools = list
    }

    self.methods.setConnectedTokenDetails = async (combatant: BattlemapCombatant, token: BattlemapToken): Promise<void> => {
      await Promise.resolve()
      self.touch()
      const tool = self.locals.available_tools.find(x => x.id === combatant.sheet_id)
      self.methods.disconnectSheet(combatant)
      if (tool && tool.id) {
        token.label = tool.title
        combatant.type = tool.tool_type
        token.owner_id = self.locals.user.firebase_id
      } else {
        combatant.type = 'custom'
        token.owner_id = null
      }
    }

    self.methods.canAdvanceCombat = (): boolean => {
      const combatants = self.methods.listCombatants()
      const scene = self.methods.getCurrentScene()
      return combatants.length > 1 && self.locals.map.map_owner && scene.combat.status === 'active'
    }

    const nextInArray = (array: any[], index: number, dir: number) => {
      let result = { index: index + dir, loop: 0 }
      if (result.index === array.length) {
        result = { index: 0, loop: 1 }
      }
      if (result.index === -1) {
        result = { index: array.length - 1, loop: -1 }
      }
      return result
    }

    self.methods.advanceCombat = (dir: number): void => {
      const combatants = self.methods.listCombatants()
      const scene = self.methods.getCurrentScene()
      if (combatants.length < 2) { return }
      const index = combatants.findIndex(x => x.id === scene.combat.active)

      if (index < 0) {
        scene.combat.active = combatants[0].id
        return
      }
      const result = nextInArray(combatants, index, dir)
      const next = combatants[result.index]
      scene.combat.active = next.id
      scene.combat.round += result.loop
      self.touch()
    }

    self.methods.endCombat = () => {
      const scene = self.methods.getCurrentScene()
      scene.combat.status = 'complete'
      scene.combat.active = null
      scene.combat.round = 1
      self.methods.listCombatants().forEach(x => x.init = 0)
      self.touch()
    }

    self.methods.avaialbleSheetsByType = (type: string) => {
      return self.locals.available_tools.filter(x => x.tool_type === type)
    }

    self.methods.anyCombatantForToken = (token: BattlemapToken): boolean => {
      return self.methods.listCombatants().map(x => x.token_id).includes(token.id)
    }

    self.methods.updateConnectedCombatant = (combatant: BattlemapCombatant, sheet: any): void => {
      const token = self.methods.tokenForCombatant(combatant)
      if (token) {
        token.label = sheet.model.name
        token.image = sheet.model.basic.image
      }
      combatant.stats.damage = sheet.model.combat.hp.damage
      combatant.stats.hp = sheet.methods.getHPTotal()
      combatant.stats.init = sheet.model.combat.init.value
      // token.size = sheet.model.basic.size
    }

    self.methods.combatantConnected = (combatant: BattlemapCombatant): boolean => {
      if (!combatant) { return false }
      if (self.methods.combatantSheetConnected(combatant)) { return true }
      if (combatant.type !== 'custom') { return false }
      return self.locals.map.map_owner || combatant.known
    }

    self.methods.combatantSheetConnected = (combatant: BattlemapCombatant): boolean => {
      return !!combatant &&
        !!combatant.sheet_id &&
        !!this.store.tools[combatant.sheet_id] &&
        !!this.store.tools[combatant.sheet_id].meta.watching
    }

    self.methods.connectCombatantToSheet = (combatant: BattlemapCombatant): void => {
      if (!combatant.sheet_id || !combatant.type) { return }

      const svc = combatant.type === 'dnd5e' ? this.dnd5eSvc : this.pathfinderSvc // eventually make this into a lookup/struc
      const sheet = this.store.tools[combatant.sheet_id] || svc.payload(combatant.sheet_id)
      this.store.setupToolController(sheet, combatant.type, `${self.locals.document_id}-battlemap`, [])
      if (sheet.meta[`${combatant.sheet_id}_sub`]) {
        sheet.meta[`${combatant.sheet_id}_sub`].unsubscribe()
      }
      sheet.meta[`${combatant.sheet_id}_sub`] = sheet.meta.combinedSubject.pipe(takeWhile(() => sheet.meta.watching)).subscribe(() => self.methods.updateConnectedCombatant(combatant, sheet))
    }

    self.methods.connectCampaign = (): void => {
      const existingSelf = this.store.tools[self.model.campaign_id]
      const campaign = !!existingSelf ? existingSelf : this.campaignSvc.payload(self.model.campaign_id)
      this.store.setupToolController(campaign, 'campaign', self.model.id, [])
    }

    self.methods.connectedCombatantSheet = (combatant: BattlemapCombatant): any => self.methods.combatantSheetConnected(combatant) ? this.store.tools[combatant.sheet_id] : null
    self.methods.connectedCombatantSheetAsArray = (combatant: BattlemapCombatant): any[] => self.methods.combatantSheetConnected(combatant) ? [this.store.tools[combatant.sheet_id]] : []

    self.methods.disconnectSheet = (combatant: BattlemapCombatant): void => {
      const sheet = this.store.tools[combatant.sheet_id]
      if (!sheet) { return }

      sheet.meta.watching = false
      const key = `${self.locals.document_id}-battlemap`
      const index = sheet.meta.sources.indexOf(key)
      if (index > -1) {
        sheet.meta.sources.splice(index, 1)
      }
    }

    self.methods.openMonsterModal = (): void => {
      // todo: monster modal
    }

    self.methods.loadSelectTiles = (): void => {
      for (let y = 0; y < (self.locals.tile.height / 2); y += self.locals.map.base_tile) {
        for (let x = 0; x < (self.locals.tile.width / 2); x += self.locals.map.base_tile) {
          self.locals.tile.options.push({
            x: Math.floor(x / self.locals.map.base_tile),
            y: Math.floor(y / self.locals.map.base_tile), angle: 0
          })
        }
      }
    }

    self.methods.setCurrentMode = (mode: string): void => { self.locals.map.mode = mode }
    self.methods.currentModeIs = (mode: string): boolean => self.locals.map.mode === mode

    /******************************************************
     * Accessor Methods
     ******************************************************/

    self.methods.$add = (parent: any, slug: string, construct: any, init: any = {}): void => {
      self.touch()
      parent[slug] = parent[slug] || []
      const item: any = new construct(init)
      parent[slug].push(item)
    }

    // Scenes
    // ---------------------------------------------------
    self.methods.listScenes = (): BattlemapScene[] => self.model.scenes || []
    self.methods.getSceneById = (id: string): BattlemapScene => self.methods.listScenes().find(x => x.id === id)
    self.methods.isCurrentScene = (id: string): boolean => self.model.details.active_scene === id

    self.methods.addScene = (name: string): void => {
      self.methods.$add(self.model, 'scenes', BattlemapScene, {
        name: name || `Scene ${(self.methods.listScenes().length + 1)}`
      })
    }

    self.methods.removeScene = (scene: BattlemapScene): void => {
      self.methods.setCurrentScene(self.model.scenes[0])
      this.sheetSvc.removeByObject(self.model.scenes, scene)
    }

    self.methods.setCurrentScene = (scene: BattlemapScene): void => {
      self.model.details.active_scene = scene.id
      self.methods.setCurrentMode('drag')
      self.locals.toolbar.activeItem = null
    }

    self.methods.getCurrentScene = (): BattlemapScene => self.methods.getSceneById(self.model.details.active_scene)
    self.methods.currentSceneInArray = (): BattlemapScene[] => {
      const scene = self.methods.getCurrentScene()
      return scene ? [scene] : []
    }

    self.methods.onSceneChange = async (scene: BattlemapScene): Promise<void> => {
      await Promise.resolve()
      self.touch()
      if (scene.scene_type === 'battle' && !scene.disable_grid) {
        [...self.methods.listSceneTokens(scene), ...self.methods.listSceneShapes(scene)].filter(x => x.snapped).forEach((item: any) => {
          item.position.left = Math.round(item.position.left / self.locals.map.zoomed_tile) * self.locals.map.zoomed_tile
          item.position.top = Math.round(item.position.top / self.locals.map.zoomed_tile) * self.locals.map.zoomed_tile
        })
      }
    }

    // Combat
    // ---------------------------------------------------
    self.methods.combatPanelTitle = (scene: BattlemapScene = self.methods.getCurrentScene()) => {
      if (scene.combat.status === 'preparing') {
        return 'Not in combat'
      }

      if (scene.combat.status === 'active') {
        return `Round ${scene.combat.round}`
      }

      if (scene.combat.status === 'complete') {
        return 'Combat complete'
      }
    }

    // Combatants
    // ---------------------------------------------------
    self.methods.listCombatants = (scene: BattlemapScene = self.methods.getCurrentScene()): BattlemapCombatant[] => scene.combatants || []
    self.methods.addCombatant = (token: BattlemapToken, json: any = {}): void => {
      const scene: BattlemapScene = self.methods.getCurrentScene()
      if (!!token) { json.token_id = token.id }
      self.methods.$add(scene, 'combatants', BattlemapCombatant, json)
    }

    self.methods.addCombatantToScene = (scene: BattlemapScene, json: any) => {
      self.methods.$add(scene, 'combatants', BattlemapCombatant, json)
    }

    self.methods.sortCombatants = () => {
      self.methods.listCombatants().sort((a, b) => b.init - a.init)
    }

    self.methods.combatantIsActive = (combatant: BattlemapCombatant): boolean => {
      const scene = self.methods.getCurrentScene()
      return combatant.id === scene.combat.active
    }

    self.methods.tokenForCombatant = (combatant: BattlemapCombatant): BattlemapToken => {
      return self.methods.listSceneTokens().find(x => x.id === combatant.token_id)
    }

    self.methods.combatantForToken = (token: BattlemapToken): BattlemapCombatant => {
      return self.methods.listCombatants().find(x => x.token_id === token.id)
    }

    self.methods.listCombatantAttacks = (combatant: BattlemapCombatant): BattlemapCombatantAttack[] => combatant.stats.attacks || []
    self.methods.addCombatantAttack = (combatant: BattlemapCombatant): void => {
      self.methods.$add(combatant.stats, 'attacks', BattlemapCombatantAttack)
    }

    self.methods.listCombatantDetails = (combatant: BattlemapCombatant): BtText[] => combatant.stats.details || []
    self.methods.addCombatantDetail = (combatant: BattlemapCombatant): void => {
      self.methods.$add(combatant.stats, 'details', BtText)
    }

    self.methods.setCombatantInit = (combatant: BattlemapCombatant, init: number = combatant.init): void => {
      combatant.init = init
      self.methods.sortCombatants()
      self.touch()
    }

    // Tokens
    // ---------------------------------------------------
    self.methods.listSceneTokens = (scene: BattlemapScene = self.methods.getCurrentScene()): BattlemapToken[] => scene.tokens || []
    self.methods.getSceneToken = (index: number, scene: BattlemapScene = self.methods.getCurrentScene()): BattlemapToken => scene.tokens[index]

    self.methods.addToken = (token: BattlemapToken): void => self.methods.addSceneToken(self.methods.getCurrentScene(), token)
    self.methods.addSceneToken = (scene: BattlemapScene, token = new BattlemapToken()): void => {
      token.position = self.methods.getCurrentPosition()
      if (!token.image) {
        token.color = this.sheetSvc.getRandomColor()
      }

      self.methods.$add(scene, 'tokens', BattlemapToken, token)

      if (scene.tokens.length === 1) {
        self.methods.getSceneToken(0).active = true
      }

      self.methods.selectOne(
        self.methods.getSceneToken(self.methods.listSceneTokens(scene).length - 1)
      )
    }

    self.methods.removeToken = (scene: BattlemapScene, token: BattlemapToken): void => {
      const combatant = self.methods.listCombatants().find(x => x.token_id === token.id)
      this.sheetSvc.removeByObject(scene.tokens, token)
      if (combatant) {
        this.sheetSvc.removeByObject(scene.combatants, combatant)
        self.methods.disconnectSheet(combatant)
      }

      if (token.active && scene.tokens.length > 0) {
        self.methods.getSceneToken(0).active = true
      }
    }

    // Shapes
    // ---------------------------------------------------
    self.methods.listSceneShapes = (scene: BattlemapScene = self.methods.getCurrentScene()): BattlemapShape[] => scene.shapes || []
    self.methods.getSceneShape = (index: number, scene: BattlemapScene = self.methods.getCurrentScene()): BattlemapShape => scene.shapes[index]
    self.methods.addShape = (shape: BattlemapShape): void => self.methods.addSceneShape(self.methods.getCurrentScene(), shape)

    self.methods.addSceneShape = (scene: BattlemapScene, shape: BattlemapShape): void => {
      shape = shape || {
        color: this.sheetSvc.getRandomColor(),
        position: self.methods.getCurrentPosition(),
      } as BattlemapShape
      shape.pos = self.methods.listSceneShapes(scene).length

      self.methods.$add(scene, 'shapes', BattlemapShape, shape)

      self.methods.selectOne(
        self.methods.getSceneShape(self.methods.listSceneShapes(scene).length - 1)
      )
    }

    self.methods.addShapeLine = (shape: BattlemapShape, line: any): void => {
      self.touch()
      shape.lines = shape.lines || []
      shape.lines.push(line)
    }

    self.methods.clearShapeLines = (shape: BattlemapShape): void => {
      self.locals.drawing.cleared += 1
      shape.lines = []
    }

    // Tiles
    // ---------------------------------------------------
    self.methods.listSceneTiles = (scene: BattlemapScene = self.methods.getCurrentScene()): BattlemapTile[] => scene.tiles || []
    self.methods.getSceneTile = (index: number, scene: BattlemapScene = self.methods.getCurrentScene()): BattlemapTile => scene.tiles[index]

    self.methods.addTile = (position: BattlemapPosition): void => {
      const scene = self.methods.getCurrentScene()
      const current_tile = self.methods.getSelectedTile()

      self.methods.addSceneTile(scene, {
        position,
        bg_x: current_tile.x,
        bg_y: current_tile.y,
        angle: current_tile.angle
      })
    }

    self.methods.addSceneTile = (scene: BattlemapScene, tile: BattlemapTile): void => {
      self.methods.$add(scene, 'tiles', BattlemapTile, tile)
    }

    // Items (category for tokens/shapes/tiles)
    // ---------------------------------------------------

    self.methods.activeItemInArray = (): any[] => {
      if (self.methods.activeItemIsGroup()) {
        return [self.locals.toolbar.activeDummyItem]
      }
      return !!self.locals.toolbar.activeItem ? [self.locals.toolbar.activeItem] : []
    }

    self.methods.selectItem = (item: any): void => {
      if (!self.locals.map.keys.shift) {
        return self.methods.selectOne(item)
      }

      /* activeItem should only be null on load or after deleting items */
      if (self.locals.toolbar.activeItem === null) {
        self.locals.toolbar.activeList.push(item)
        self.locals.toolbar.selectingTokens = self.methods.ifItemIsToken(item)
        self.locals.toolbar.selectingShapes = self.methods.ifItemIsShape(item)
        return
      }

      /* check to see if we're still selectig the same type of item */
      if (self.locals.toolbar.selectingTokens !== self.methods.ifItemIsToken(item)) {
        self.methods.selectOne(item)
      }

      self.locals.toolbar.selectingTokens = self.methods.ifItemIsToken(item)
      self.locals.toolbar.selectingShapes = self.methods.ifItemIsShape(item)
      if (!!self.locals.toolbar.activeItem) {
        self.locals.toolbar.activeList.push(self.locals.toolbar.activeItem)
      }

      /* when selecting an item that is already selected, this deselects it and remove it from the array */
      if (self.locals.toolbar.activeList.includes(item)) {
        const index = self.locals.toolbar.activeList.indexOf(item)
        self.locals.toolbar.activeList.splice(index, 1)
      } else {
        self.locals.toolbar.activeList.push(item)
      }

      self.locals.toolbar.activeItem = ''
    }

    self.methods.selectOne = (item: any): void => {
      if (self.locals.toolbar.activeItem !== item) {
        self.locals.drawing.active = false
        self.locals.toolbar.activeList = []
        self.locals.toolbar.activeItem = item
        self.locals.toolbar.selectingTokens = self.methods.ifItemIsToken(item)
        self.locals.toolbar.selectingShapes = self.methods.ifItemIsShape(item)
      }
    }

    self.methods.isActiveItem = (item: any): boolean => {
      return self.locals.toolbar.activeItem === item
    }

    self.methods.rotateItem = (item: any): void => {
      if (self.locals.map.map_owner && !item.pinned) {
        item.angle = item.angle + 90

        if (item.angle === 360) {
          item.angle = 0
        }
      }
    }

    self.methods.rotateActiveItem = (): void => {
      if (self.methods.ifSingleActiveItem()) {
        self.methods.rotateItem(self.locals.toolbar.activeItem)
      }
    }

    self.methods.moveActiveItemToCenter = (): void => {
      const center = self.methods.getCurrentPosition()
      if (self.methods.ifSingleActiveItem()) {
        self.locals.toolbar.activeItem.position.top = center.top
        self.locals.toolbar.activeItem.position.left = center.left
      }
    }

    self.methods.nudgeActiveItem = (direction: string, mult: number): void => {
      if (self.methods.ifSingleActiveItem() && !self.locals.toolbar.activeItem.pinned) {
        const movement = self.locals.map.base_tile
        self.touch()

        switch (direction) {
          case 'up':
            self.locals.toolbar.activeItem.position.top -= (movement * mult)
            break
          case 'down':
            self.locals.toolbar.activeItem.position.top += (movement * mult)
            break
          case 'left':
            self.locals.toolbar.activeItem.position.left -= (movement * mult)
            break
          case 'right':
            self.locals.toolbar.activeItem.position.left += (movement * mult)
            break
        }
      }
    }

    self.methods.deleteItem = (item: any): void => {
      const scene = self.methods.getCurrentScene()

      if (self.methods.ifItemIsToken(item)) {
        self.methods.removeToken(scene, item)
      }

      if (self.methods.ifItemIsShape(item)) {
        this.sheetSvc.removeByObject(scene.shapes, item)
      }

      self.touch()
      self.methods.closeContextMenu()
      self.locals.toolbar.activeItem = null
    }

    self.methods.deleteAllActive = (): void => {
      this.sheetSvc.confirmWithAlert((): void => {
        self.locals.toolbar.activeList.forEach(list => self.methods.deleteItem(list))
        self.locals.toolbar.activeList = []
      }, () => {}, 'This will delete all selected items. Are you sure you want to proceed?')
    }

    self.methods.deleteActiveItem = (): void => {
      if (self.methods.activeItemIsGroup()) {
        self.methods.deleteAllActive()
      } else if (self.locals.toolbar.activeItem !== null && !self.locals.toolbar.activeItem.pinned) {
        !self.locals.toolbar.activeItem ? self.methods.deleteAllActive() : self.methods.deleteItem(self.locals.toolbar.activeItem)
      }
    }

    self.methods.activeItemIsGroup = (): boolean => self.locals.toolbar.activeList.length > 0
    self.methods.canEditItem = (item: any): boolean => self.locals.map.map_owner || !item.owner_id || item.owner_id === self.locals.user.firebase_id
    self.methods.canSeeHP = (item: any): boolean => self.locals.map.map_owner || item.owner_id === self.locals.user.firebase_id

    self.methods.getDetailsForActiveItem = (item: any, scene: BattlemapScene = self.methods.getCurrentScene()): string[] => {
      const details = []

      if (!self.methods.activeItemIsGroup() && self.methods.canEditItem(item)) {
        details.push('label')
      }

      if (self.methods.canEditItem(item)) {
        details.push('image')
        details.push('color')
      }

      if (!self.methods.activeItemIsGroup() && self.methods.ifItemIsToken(item)) {
        details.push('size')
      }

      if (self.methods.canEditItem(item)) {
        details.push('layer')
      }

      if (
        !self.methods.activeItemIsGroup() &&
        (self.methods.ifItemIsShape(item) || scene.scene_type === 'isometric') &&
        self.methods.canEditItem(item)
      ) {
        details.push('width')
        details.push('height')
      }

      if (self.methods.ifItemIsShape(item) && self.methods.canEditItem(item)) {
        details.push('pinned')
      }

      // if (self.methods.ifItemIsShape(item) && self.methods.canEditItem(item)) {
      //   details.push('drawable')
      // }

      if (self.locals.map.map_owner) {
        details.push('fog')
        details.push('obscure')
      }

      if (!self.methods.activeItemIsGroup() && self.methods.ifItemIsToken(item) && self.methods.canEditItem(item) && !self.methods.anyCombatantForToken(item)) {
        details.push('combat')
      }

      if (self.methods.ifItemIsShape(item) && scene.scene_type === 'battle' && self.methods.canEditItem(item)) {
        details.push('tile')
      }

      if (scene.scene_type === 'battle' && self.methods.ifItemIsShape(item) && self.methods.canEditItem(item)) {
        details.push('round')
      }

      if (self.methods.canEditItem(item) && self.methods.ifItemIsShape(item) && scene.scene_type === 'battle') {
        details.push('snapped')
      }

      if (self.methods.canEditItem(item) && self.methods.ifItemIsShape(item)) {
        details.push('layering')
      }

      return details
    }

    self.methods.activeToken = (): BattlemapToken => {
      return self.methods.activeItemInArray().find(x => self.methods.ifActiveItemIsToken())
    }

    self.methods.activeCombatant = (): BattlemapCombatant => {
      const token = self.methods.activeToken()
      if (token) {
        return self.methods.combatantForToken(token)
      }
    }

    // Draggable Map
    // **********************************************************************

    self.methods.mapDragStop = async (e: any): Promise<void> => {
      await Promise.resolve()
      self.locals.map.pos.ref = e.source._dragRef
      const pos = e.source._dragRef._passiveTransform
      self.locals.map.offset.x = pos.x
      self.locals.map.offset.y = pos.y
    }


    // Draggable Items
    // **********************************************************************

    self.methods.tokenDragStart = async (item: any, e: any): Promise<void> => {
      await Promise.resolve()
      item.moving = true
      self.touch()
      const pos = e.source._dragRef._pointerPositionAtLastDirectionChange
      self.locals.map.drag_indicator.$x = pos.x
      self.locals.map.drag_indicator.$y = pos.y
      self.locals.map.drag_indicator.left = Math.round(item.position.left / self.locals.map.zoomed_tile) * self.locals.map.zoomed_tile
      self.locals.map.drag_indicator.top = Math.round(item.position.top / self.locals.map.zoomed_tile) * self.locals.map.zoomed_tile
    }

    self.methods.itemDragStart = async (item: any, e: any): Promise<void> => {
      await Promise.resolve()
      item.moving = true
      self.touch()
    }

    self.methods.tokenDragMove = async (e: any): Promise<void> => {
      await Promise.resolve()
      const pos = e.source._dragRef._pointerPositionAtLastDirectionChange
      const xDistance = (Math.abs(self.locals.map.drag_indicator.$x - pos.x) + (self.locals.map.zoomed_tile / 2)) / self.locals.map.zoomed_tile
      const yDistance = (Math.abs(self.locals.map.drag_indicator.$y - pos.y) + (self.locals.map.zoomed_tile / 2)) / self.locals.map.zoomed_tile
      const max = Math.max(xDistance, yDistance)
      const min = Math.floor(Math.min(xDistance, yDistance) / 2)
      self.locals.map.drag_indicator.distance = Math.floor(max + min)
    }

    self.methods.dragStop = async (item: any, e: any): Promise<void> => {
      await Promise.resolve()
      item.moving = false
      const ref: DragRef = e.source._dragRef
      const pos = e.source._dragRef._passiveTransform
      item.position.left += pos.x
      item.position.top += pos.y
      ref.reset()
      self.touch()
      onItemDragStop(item)
    }

    // Resizable Items
    // **********************************************************************

    self.methods.resizeStart = async (item: any, e: any): Promise<void> => {
      await Promise.resolve()
      const pos = e.source._dragRef._pointerPositionAtLastDirectionChange
      item.size.$x = pos.x
      item.size.$y = pos.y
    }

    self.methods.resizeMove = async (item: any, e: any): Promise<void> => {
      await Promise.resolve()
      const pos = e.source._dragRef._pointerPositionAtLastDirectionChange
      item.size.$width = item.size.width + (pos.x - item.size.$x)
      item.size.$height = item.size.height + (pos.y - item.size.$y)
    }

    self.methods.resizeStop = async (item: any, e: any): Promise<void> => {
      await Promise.resolve()
      const ref: DragRef = e.source._dragRef
      const pos = e.source._dragRef._passiveTransform
      item.size.$width = null
      item.size.$height = null
      item.size.width += pos.x
      item.size.height += pos.y
      ref.reset()
      self.touch()
      onResizeItemDragStop(item)
    }

    // Draggable Helpers
    // **********************************************************************

    const onItemDragStop = (item: any): void => {
      const scene = self.methods.getCurrentScene()
      if (item.snapped !== false && !scene.disable_grid) {
        if (self.methods.ifItemIsToken(item) || scene.scene_type === 'battle') {
          snapItemToGrid(item, scene.scene_type)
        }
      }
      if (self.methods.ifItemIsToken(item)) {
        unsetDragDistance()
      }
    }

    const onResizeItemDragStop = (item: any): void => {
      const scene = self.methods.getCurrentScene()
      if (item.snapped !== false && !scene.disable_grid) {
        if (!self.methods.ifItemIsShape(item) || scene.scene_type === 'battle') {
          item.size.width = Math.round(item.size.width / self.locals.map.zoomed_tile) * self.locals.map.zoomed_tile
          item.size.height = Math.round(item.size.height / self.locals.map.zoomed_tile) * self.locals.map.zoomed_tile
        }
      }
    }

    const snapItemToGrid = (item: any, grid: string): void => {
      const x = item.position.left * self.locals.map.zoom
      const y = item.position.top * self.locals.map.zoom
      if (grid === 'battle') {
        item.position.left = Math.round(item.position.left / self.locals.map.zoomed_tile) * self.locals.map.zoomed_tile
        item.position.top = Math.round(item.position.top / self.locals.map.zoomed_tile) * self.locals.map.zoomed_tile
      }
      if (grid === 'isometric') {
        const x_tile = self.locals.map.iso_bg_natural_x / 4 * self.locals.map.zoom
        const y_tile = self.locals.map.iso_bg_natural_y / 4 * self.locals.map.zoom
        const x_result = calculateIsoAxis(item, x, x_tile)
        const y_result = calculateIsoAxis(item, y, y_tile, x_result)

        item.position.left = x_result.final
        item.position.top = y_result.final
      }
      if (grid === 'hexagon') {
        const x_tile = self.locals.map.hex_bg_natural_x * self.locals.map.hex_aspect / 2 * self.locals.map.zoom
        const y_tile = self.locals.map.hex_bg_natural_y * self.locals.map.hex_aspect / 2 * self.locals.map.zoom
        const x_result = calculateHexAxis(item, x, x_tile)
        const y_result = calculateHexAxis(item, y, y_tile, x_result)

        item.position.left = x_result.final
        item.position.top = y_result.final
      }
    }

    const calculateIsoAxis = (token: BattlemapToken, coord: number, tile?: number, previous?: any): any => {
      const size = self.locals.sizeLookups.isometric[token.size.name]
      const token_size = !!previous ? size.height : size.width
      const half_token_size = token_size * self.locals.map.zoom / 2
      const center = coord + half_token_size
      const rounded = Math.round(center / tile) * tile
      let adjusted = rounded

      // Adjust only y axis when we're not on a tile
      const index = Math.round(rounded / tile)
      if (!!previous && index % 2 !== previous.index % 2) {
        adjusted = adjusted + ((center % tile > tile / 2) ? tile : (-1 * tile))
      }

      return {
        final: (adjusted - half_token_size) / self.locals.map.zoom,
        index
      }
    }

    const calculateHexAxis = (token: BattlemapToken, coord: number, tile?: number, previous?: any): any => {
      const half_token_size = token.size.width * self.locals.map.zoom / 2
      const center = coord + half_token_size
      const rounded = Math.round(center / tile) * tile
      let adjusted = rounded

      // Adjust only y axis when we're not on a tile
      const index = Math.round(rounded / tile)
      if (!!previous && index % 2 !== previous.index % 2) {
        adjusted = adjusted + ((center % tile > tile / 2) ? tile : (-1 * tile))
      }

      return {
        final: (adjusted - half_token_size) / self.locals.map.zoom,
        index
      }
    }

    const unsetDragDistance = (): void => {
      setTimeout(() => self.locals.map.drag_indicator.distance = '', 1500)
    }

    self.methods.onSizeChange = async (token: BattlemapToken): Promise<void> => {
      await Promise.resolve()
      self.touch()
      const scene = self.methods.getCurrentScene()
      const size = self.locals.sizeLookups[scene.scene_type][token.size.name]
      console.log(size)
      token.size.width = size.width
      token.size.height = size.height
    }

    self.methods.onSortableDrop = (e: CdkDragDrop<string[]>) => {
      moveItemInArray(e.container.data, e.previousIndex, e.currentIndex)
      self.touch()
    }

    self.methods.getLabelInitial = (label: string): string => label.toUpperCase().charAt(0)

    self.methods.getCurrentPosition = (): BattlemapPosition => {
      const top = Math.abs(self.methods.roundToNearest(self.locals.map.pos.top, self.locals.map.zoomed_tile)) / self.locals.map.zoom
      const left = Math.abs(self.methods.roundToNearest(self.locals.map.pos.left, self.locals.map.zoomed_tile)) / self.locals.map.zoom

      const position = {
        top: (Math.floor(top / self.locals.map.base_tile) + (2  / self.locals.map.zoom)) * self.locals.map.base_tile,
        left: (Math.floor(left / self.locals.map.base_tile) + (12 / self.locals.map.zoom)) * self.locals.map.base_tile
      } as BattlemapPosition

      return position
    }

    self.methods.updatePosition = (item, pos) => {
      // so what we need to do is create an attribute to watch either on the item or on the controller
      // when we before update positions here we need to change that attribute
      // then it won't trigger the watch update because we'll check for that attribute there
      // also need to figure out how to make the token not deselect while clicking it to drag.........
      // console.log(pos)
      // if (_.contains(self.locals.toolbar.activeList, item)) {
      //   console.log('we in there')
      //   for (let a in self.locals.toolbar.activeList) {
      //     let newpos = {
      //       top: self.locals.toolbar.activeList[a].position.top + pos.top
      //       , left: self.locals.toolbar.activeList[a].position.left + pos.left
      //     }
      //     console.log(self.locals.toolbar.activeList[a].position)
      //     console.log(newpos)
      //     // self.locals.toolbar.activeList[a].position = newpos
      //   }
      // }
    }

    self.methods.getFontSize = (base_font: number, token: BattlemapToken): string => {
      let size_mod = 1
      if (token) {
        size_mod = self.locals.lookup.sizes[token.size.name]
      }
      return `${(base_font * size_mod * self.locals.map.zoom)}px`
    }

    self.methods.getTokenClasses = (token: BattlemapToken, scene: BattlemapScene): any => {
      return {
        round: scene.scene_type === 'isometric',
        'token-type': !token.image && scene.scene_type !== 'isometric',
        'sprite-type': !!token.image && scene.scene_type !== 'isometric',
        moving: token.moving,
        foggy: token.fog && !self.locals.map.map_owner,
        'owner-obscured': token.obscure && self.locals.map.map_owner,
        'obscured': token.obscure && !self.locals.map.map_owner,
        selected: self.methods.isActiveItem(token) || self.locals.toolbar.activeList.includes(token),
        [`rotate-${token.angle}`]: true,
        [token.size.name]: true,
      }
    }

    self.methods.getShapeClasses = (shape: BattlemapShape): any => {
      return {
        'bg-image': !!shape.image,
        moving: shape.moving,
        round: shape.round,
        square: !shape.round,
        pinned: shape.pinned,
        tiled: shape.tiled,
        foggy: shape.fog && !self.locals.map.map_owner,
        obscured: shape.obscure && !self.locals.map.map_owner,
        selected: self.methods.isActiveItem(shape) || self.locals.toolbar.activeList.includes(shape),
        [`rotate-${shape.angle}`]: true,
      }
    }

    self.methods.randomizeTile = (tile: BattlemapTile): void => {
      tile.bg_x = this.sheetSvc.randomNumber(0, 7)
      tile.bg_y = this.sheetSvc.randomNumber(0, 1)
    }

    self.methods.getTileClasses = (tile: BattlemapTile): string => `rotate-${tile.angle}`

    self.methods.getTileStyle = (tile: BattlemapTile): any => {
      // need zoom calculations in background-size, not position
      return {
        'background-position-x': tile.bg_x * self.locals.map.zoomed_tile * -1,
        'background-position-y': tile.bg_y * self.locals.map.zoomed_tile * -1,
        'background-size': (self.locals.tile.width * self.locals.map.zoom) / 2 + 'px auto',
        width: self.locals.map.zoomed_tile,
        height: self.locals.map.zoomed_tile,
        top: self.methods.getPosition(tile, 'top'),
        left: self.methods.getPosition(tile, 'left')
      }
    }

    self.methods.getSelectTileStyle = (s_tile: any): any => {
      return {
        'background-position-x': s_tile.x * -40,
        'background-position-y': s_tile.y * -40
      }
    }

    self.methods.getSelectTileClass = (s_tile: any): string => {
      const klasses = []
      klasses.push(`rotate-${s_tile.angle}`)
      if (self.methods.isSelectedTile(s_tile)) {
        klasses.push('selected')
      }
      return klasses.join(' ')
    }

    self.methods.isSelectedTile = (s_tile: any): boolean => {
      return self.locals.tile.bg.x === s_tile.x && self.locals.tile.bg.y === s_tile.y
    }

    self.methods.rotateTile = (s_tile: any): void => {
      s_tile.angle = (s_tile.angle || 0) + 90
      if (s_tile.angle > 270) {
        s_tile.angle = 0
      }
      self.locals.tile.bg.angle = s_tile.angle
    }

    self.methods.onSelectTileClick = (s_tile: any): void => {
      if (self.methods.isSelectedTile(s_tile)) {
        self.methods.rotateTile(s_tile)
      } else {
        self.methods.selectTile(s_tile)
      }
    }

    const resetMapRef = () => {
      if (self.locals.map.pos.ref) {
        self.locals.map.pos.ref.reset()
        self.locals.map.pos.ref = null
        self.locals.map.offset = { x: 0, y: 0 }
      }
    }

    self.methods.goToCenter = (): void => {
      resetMapRef()
    }

    self.methods.setCenter = (): void => {
      self.model.details.position.top = (self.locals.map.pos.top + self.locals.map.offset.y) / self.locals.map.zoom
      self.model.details.position.left = (self.locals.map.pos.left + self.locals.map.offset.x) / self.locals.map.zoom
      resetMapRef()
    }

    self.methods.getMapBackground = (scene: BattlemapScene = self.methods.getCurrentScene()): string => {
      let bg = ''
      if (scene) {
        bg = !!scene.background_image ? scene.background_image : {
          overview: '/assets/img/map/square-sprite.png',
          battle: '/assets/img/map/square-sprite.png',
          hexagon: '/assets/img/map/hex-sprite.png',
          isometric: '/assets/img/map/iso-sprite.png'
        }[scene.scene_type]
      }
      return `url(${bg})`
    }

    self.methods.getMapBackgroundSize = (scene: BattlemapScene = self.methods.getCurrentScene()): string => {
      let tile_size: number = self.locals.map.zoom * self.locals.map.square_bg
      if (scene) {
        if (scene.scene_type === 'hexagon') {
          tile_size = self.locals.map.zoom * self.locals.map.hex_bg
        }
        if (scene.scene_type === 'isometric') {
          tile_size = self.locals.map.zoom * self.locals.map.iso_bg
        }
      }
      return `${tile_size}px auto`
    }

    self.methods.openContextMenu = (item: any): void => {
      self.locals.map.context_menu.item = [item]
      self.locals.map.context_menu.top = self.methods.getPosition(item, 'top') + self.locals.map.base_tile
      self.locals.map.context_menu.left = self.methods.getPosition(item, 'left') + self.locals.map.base_tile
      self.locals.map.context_menu.active = true
      // self.locals.map.context_menu.items = [{ label: 'Sup dude' }, { label: 'Yeeeee' }]
    }

    self.methods.closeContextMenu = (): void => {
      self.locals.map.context_menu.active = false
      self.locals.map.context_menu.item = []
    }

    self.methods.onItemClick = (item: any, e: any): void => {
      if (e.which === 3) {
        self.methods.openContextMenu(item)
      }
    }

    self.methods.getMapStyle = (scene: BattlemapScene): any => {
      return {
        width: `${self.locals.map.zoomed_size}px`,
        height: `${self.locals.map.zoomed_size}px`,
        left: `${self.locals.map.pos.left}px`,
        top: `${self.locals.map.pos.top}px`,
        'background-image': self.methods.getMapBackground(scene),
        'background-size': self.methods.getMapBackgroundSize(scene)
      }
    }

    self.methods.selectTile = (s_tile: any): void => {
      self.locals.tile.bg.x = s_tile.x
      self.locals.tile.bg.y = s_tile.y
      self.locals.tile.bg.angle = s_tile.angle
    }

    self.methods.getSelectedTile = (): BattlemapTile => self.locals.tile.bg

    self.methods.setTileBG = (tile: BattlemapTile): void => {
      const current_tile = self.methods.getSelectedTile()
      tile.bg_x = current_tile.x
      tile.bg_y = current_tile.y
      tile.angle = current_tile.angle
    }

    self.methods.getContextMenuStyle = (): any => {
      return {
        top: `${self.locals.map.context_menu.top}px`,
        left: `${self.locals.map.context_menu.left}px`
      }
    }

    self.methods.getTokenDragStyle = (): any => {
      return {
        width: `${self.locals.map.zoomed_tile}px`,
        height: `${self.locals.map.zoomed_tile}px`,
        fontSize: self.methods.getFontSize(24),
        top: `${self.locals.map.drag_indicator.top}px`,
        left: `${self.locals.map.drag_indicator.left}px`,
      }
    }

    self.methods.getOuterTokenStyle = (token: BattlemapToken): any => {
      return {
        top: `${self.methods.getPosition(token, 'top')}px`,
        left: `${self.methods.getPosition(token, 'left')}px`,
      }
    }

    self.methods.getInnerTokenStyle = (token: BattlemapToken, scene: BattlemapScene): any => {
      const style = {
        backgroundColor: token.color,
      }

      if (!!token.image) {
        style['background-image'] = `url(${token.image})`
      }

      if (scene && scene.scene_type === 'isometric') {
        delete style['background-image']
      }

      return style
    }

    self.methods.getTokenImageStyle = (token: BattlemapToken): any => {
      return {
        backgroundImage: `url(${!!token.image ? token.image : ''})`,
        width: `${(token.size.width * self.locals.map.zoom)}px`,
        height: `${(token.size.height * self.locals.map.zoom)}px`,
        'margin-left': `${(token.size.width / -2 * self.locals.map.zoom)}px`,
      }
    }

    self.methods.getTokenTextStyle = (token: BattlemapToken): any => {
      return {
        fontSize: self.methods.getFontSize(26, token)
      }
    }

    self.methods.getOuterShapeStyle = (shape: BattlemapShape): any => {
      return {
        top: `${self.methods.getPosition(shape, 'top')}px`,
        left: `${self.methods.getPosition(shape, 'left')}px`,
        width: `${self.methods.getSize(shape, 'width')}px`,
        height: `${self.methods.getSize(shape, 'height')}px`,
      }
    }

    self.methods.getInnerShapeStyle = (shape: BattlemapShape): any => {
      return {
        backgroundColor: shape.color,
        backgroundImage: `url(${!!shape.image ? shape.image : ''})`,
      }
    }

    self.methods.getFirstBattleScene = (): BattlemapScene => {
      return self.methods.listScenes().find(x => x.scene_type === 'battle')
    }

    self.methods.ifItemIsToken = (item: any): boolean => !!item && item instanceof BattlemapToken
    self.methods.ifItemIsShape = (item: any): boolean => !!item && item instanceof BattlemapShape

    self.methods.ifActiveItemIsToken = (): boolean => {
      return self.methods.ifItemIsToken(self.locals.toolbar.activeItem)
    }

    self.methods.ifActiveItemIsShape = (): boolean => {
      return self.methods.ifItemIsShape(self.locals.toolbar.activeItem)
    }

    self.methods.ifSingleActiveItem = (): boolean => {
      return self.locals.toolbar.activeItem !== null && !!self.locals.toolbar.activeItem
    }

    self.methods.copyOffsetPosition = (item: any): BattlemapPosition => {
      return {
        top: item.position.top + self.locals.map.base_tile,
        left: item.position.left + self.locals.map.base_tile,
      } as BattlemapPosition
    }

    self.methods.copyItem = (item): void => {
      const clone: any = {}
      Object.keys(item.getProto()).forEach(key => clone[key] = item[key])
      clone.position = self.methods.copyOffsetPosition(item)

      self.methods.ifItemIsToken(item) ? self.methods.addToken(clone) : self.methods.addShape(clone)
      self.methods.closeContextMenu()
    }

    self.methods.copyActiveItem = (): void => {
      if (self.methods.ifSingleActiveItem()) {
        self.methods.copyItem(self.locals.toolbar.activeItem)
      }
    }

    self.methods.toggleVisibilityForActiveItem = (): void => {
      if (self.locals.map.map_owner && self.methods.ifSingleActiveItem()) {
        self.locals.toolbar.activeItem.fog = !self.locals.toolbar.activeItem.fog
      }
    }

    self.methods.togglePinForActiveItem = (): void => {
      if (self.methods.ifSingleActiveItem() && self.methods.ifActiveItemIsShape()) {
        self.locals.toolbar.activeItem.pinned = !self.locals.toolbar.activeItem.pinned
      }
    }

    self.methods.changeLayerForActiveItem = (direction: string): void => {
      if (self.methods.ifSingleActiveItem() && self.methods.ifActiveItemIsShape()) {
        self.methods.changeLayer(self.locals.toolbar.activeItem, direction)
      }
    }

    self.methods.toggleNavStatus = (): void => {
      self.locals.nav_status = self.locals.nav_status === 'collapsed' ? 'visible' : 'collapsed'
    }

    self.methods.changeActiveItemsProperty = (name: string, value: any): void => {
      self.locals.toolbar.activeList.forEach(item => item[name] = value)
    }

    self.methods.getSize = (item: any, key: string): number => {
      const size = item.size[`$${key}`] || item.size[key]
      return size * self.locals.map.zoom
    }

    self.methods.getPosition = (item: any, key: string): number => {
      return item.position[key] * self.locals.map.zoom
    }

    self.methods.roundToNearest = (num: number, increment: number): number => {
      return Math.floor(num / increment) * increment
    }

    self.methods.mapClasses = (scene: BattlemapScene = self.methods.getCurrentScene()): string => {
      const klasses = []

      if (self.locals.map.zooming) {
        klasses.push('zooming')
      }

      if (scene && scene.scene_type === 'hexagon') {
        klasses.push('hex-map')
      }

      klasses.push(`zoom-level-${self.locals.map.zoom * 10}`)

      return klasses.join(' ')
    }

    self.methods.zoom = (zoom_mult: number): void => {
      self.locals.map.zooming = true
      clearTimeout(self.locals.map.zoom_timeout)
      self.locals.map.zoom_timeout = setTimeout(() => self.locals.map.zooming = false, 200)
      const new_zoom = self.locals.map.zoom * zoom_mult
      const zoom_min = .5
      const zoom_max = 2
      if (new_zoom >= zoom_min && new_zoom <= zoom_max) {
        // Direction tells the zoom-to-center ajustment variables which way we're going, in or out.
        const direction = zoom_mult > 1 ? -1 : 1

        // Divisor tells the adjustment calculations how much we divide the calculated blocks, based on in or out.
        // 4 is a quarter of the screen, 2 is half the current screen
        const divisor = zoom_mult > 1 ? 4 : 2

        // When we move this over to spa controller we need to use .viewport.width/height
        const x_blocks_adjust = Math.floor(window.innerWidth / self.locals.map.zoomed_tile) / divisor
        const y_blocks_adjust = Math.floor(window.innerHeight / self.locals.map.zoomed_tile) / divisor

        const nearest_x = self.methods.roundToNearest(self.locals.map.pos.left, self.locals.map.zoomed_tile)
        const nearest_y = self.methods.roundToNearest(self.locals.map.pos.top, self.locals.map.zoomed_tile)

        const adjusted_x = nearest_x + (x_blocks_adjust * self.locals.map.zoomed_tile * direction)
        const adjusted_y = nearest_y + (y_blocks_adjust * self.locals.map.zoomed_tile * direction)

        self.locals.map.pos.left = adjusted_x * zoom_mult
        self.locals.map.pos.top = adjusted_y * zoom_mult

        self.locals.map.zoom = new_zoom
        self.locals.map.zoomed_size = self.locals.map.base_size * self.locals.map.zoom
        self.locals.map.zoomed_tile = self.locals.map.base_tile * self.locals.map.zoom
      }
    }

    self.methods.changeLayer = (shape: BattlemapShape, layer: string): void => {
      const shapes = self.methods.listSceneShapes(self.methods.getCurrentScene())
      const index = shapes.indexOf(shape)

      if (layer === 'front') {
        shape.pos = shapes.length + 10
      }
      if (layer === 'back') {
        shape.pos = -10
      }
      if (layer === 'up') {
        shape.pos++
        if (index + 1 < shapes.length) {
          shapes[index + 1].pos--
        }
      }
      if (layer === 'down') {
        shape.pos = shape.pos - 1
        if (index - 1 >= 0) {
          shapes[index - 1].pos++
        }
      }

      shapes.sort((a, b) => a.pos - b.pos).forEach((s: BattlemapShape, i: number) => s.pos = i)
    }

    self.methods.onKeydown = (e: any): void => {
      if (e.shiftKey) {
        self.locals.map.keys.shift = true
        // if (!self.methods.currentModeIs('drag')) {
        //   self.methods.enableMapDragging()
        // }
      }
      if (['Alt', 'Meta', 'Control'].includes(e.key)) {
        self.locals.map.keys.meta = true
      }
      if (self.model.details.hotkeys && !self.locals.map.keys.meta) {
        if (e.which === 8) {
          self.methods.deleteActiveItem()
        }
        if (e.which === 37) {
          self.methods.nudgeActiveItem('left', self.locals.map.keys.shift ? 5 : 1)
        }
        if (e.which === 38) {
          self.methods.nudgeActiveItem('up', self.locals.map.keys.shift ? 5 : 1)
        }
        if (e.which === 39) {
          self.methods.nudgeActiveItem('right', self.locals.map.keys.shift ? 5 : 1)
        }
        if (e.which === 40) {
          self.methods.nudgeActiveItem('down', self.locals.map.keys.shift ? 5 : 1)
        }
        if (e.which === 67) {
          if (self.locals.map.keys.shift) {
            self.methods.moveActiveItemToCenter()
          } else {
            self.methods.goToCenter()
          }
        }
        if (e.which === 68) {
          self.methods.copyActiveItem()
        }
        if (e.which === 73) {
          self.methods.toggleVisibilityForActiveItem()
        }
        if (e.which === 80) {
          self.methods.togglePinForActiveItem()
        }
        if (e.which === 82) {
          self.methods.rotateActiveItem()
        }
        if (e.which === 83) {
          self.methods.addShape()
        }
        if (e.which === 84) {
          self.methods.addToken()
        }
        // if (e.which === 90) {
        //   if (self.locals.map.keys.shift) {
        //     self.model.redo()
        //   } else {
        //     self.model.undo()
        //   }
        // }
        if (e.which === 189) {
          self.methods.zoom(.5)
        }
        if (e.which === 187) {
          self.methods.zoom(2)
        }
        // if (e.which === 219) {
        //   self.methods.changeLayerForActiveItem('down')
        // }
        // if (e.which === 221) {
        //   self.methods.changeLayerForActiveItem('up')
        // }
        // console.log(e.which)
      }
    }

    self.methods.onKeyup = (e: any): void => {
      if (!e.shiftKey) {
        self.locals.map.keys.shift = false
        // if (!self.methods.currentModeIs('drag')) {
        //   self.methods.disableMapDragging()
        // }
      }
      if (['Alt', 'Meta', 'Control'].includes(e.key)) {
        self.locals.map.keys.meta = false
      }
    }

    self.methods.sceneIsType = (scene: BattlemapScene, array: string[]): boolean => {
      return self.locals.ready && array.includes(scene.scene_type)
    }

    self.methods.currentSceneIsType = (array: string[]): boolean => {
      return self.locals.ready && self.methods.sceneIsType(self.methods.getCurrentScene(), array)
    }

    self.methods.sceneIsBattle = (scene: BattlemapScene): boolean => {
      return self.methods.sceneIsType(scene, ['battle', 'isometric', 'hexagon'])
    }

    self.methods.sceneIsOverview = (scene: BattlemapScene): boolean => {
      return self.methods.sceneIsType(scene, ['overview'])
    }

    self.methods.toggleMapNav = (): void => { self.locals.nav.main = !self.locals.nav.main }
    self.methods.showCombatPanel = (): void => {
      self.locals.nav.combat = true
      self.locals.nav.main = false
    }

    self.methods.hideCombatPanel = (): void => {
      self.locals.nav.combat = false
      self.locals.combatPanel.moving = false
    }

    self.methods.showManagementPanel = (): void => {
      self.locals.nav.management = true
      self.locals.nav.main = false
    }

    self.methods.hideManagementPanel = (): void => {
      self.locals.nav.management = false
      self.locals.managementPanel.moving = false
    }

    // Modals stuff
    self.methods.openSettingsModal = (): void => {
      self.locals.modals.main = true
      self.locals.modals.settings = true
      self.locals.nav.main = false
    }

    self.methods.closeAllModals = (): void => {
      Object.keys(self.locals.modals).forEach(key => self.locals.modals[key] = false)
    }

    self.methods.showingModal = (slug: string): void => {
      return self.locals.modals[slug]
    }

    self.methods.getSiteModalClasses = (): string => {
      return self.methods.showingModal('main') ? 'showing-modal' : ''
    }

    self.methods.getTilePositionForOffset = (x: number, y: number): any => {
      return {
        top: self.methods.roundToNearest((y / self.locals.map.zoom), self.locals.map.base_tile),
        left: self.methods.roundToNearest((x / self.locals.map.zoom), self.locals.map.base_tile)
      }
    }

    self.methods.getTileForPosition = (pos: BattlemapPosition): BattlemapTile => {
      return self.methods.listSceneTiles(self.methods.getCurrentScene()).filter(tile => {
        return (tile.position.top === pos.top && tile.position.left === pos.left)
      })[0]
    }

    self.methods.onTileClick = (tile: BattlemapTile): void => {
      if (self.methods.currentModeIs('tile')) {
        self.methods.setTileBG(tile)
      }
      if (self.methods.currentModeIs('eraser')) {
        this.sheetSvc.removeByObject(self.methods.getCurrentScene().tiles, tile)
      }
    }

    self.methods.onTileAdd = (position: BattlemapPosition): void => {
      if (self.methods.currentModeIs('tile')) {
        self.methods.addTile(position)
      }
    }

    // self.methods.onMapClick = (e: any): void => {
    //   self.methods.addTile(self.methods.getTilePositionForOffset(e.offsetX, e.offsetY))
    // }

    self.methods.onMouseMove = (e: any): void => {
      self.locals.inputs.mouse.offset.x = e.clientX - e.currentTarget.offsetLeft
      self.locals.inputs.mouse.offset.y = e.clientY - e.currentTarget.offsetTop
    }

    self.methods.onMapMouseDown = (e: any): void => {
      if ((self.methods.currentModeIs('tile') || self.methods.currentModeIs('eraser')) && self.locals.inputs.mouse.interval === null) {
        self.methods.whileMouseDown()
      }
    }

    self.methods.onMapMouseUp = (e: any): void => {
      if ((self.methods.currentModeIs('tile') || self.methods.currentModeIs('eraser')) && self.locals.inputs.mouse.interval !== null) {
        clearInterval(self.locals.inputs.mouse.interval)
        self.locals.inputs.mouse.interval = null
      }
    }

    self.methods.whileMouseDown = (e: any): void => {
      self.locals.inputs.mouse.interval = setInterval(() => {
        const position = self.methods.getTilePositionForOffset(self.locals.inputs.mouse.offset.x, self.locals.inputs.mouse.offset.y)
        const tile = self.methods.getTileForPosition(position)
        !tile ? self.methods.onTileAdd(position) : self.methods.onTileClick(tile)
      }, 50)
    }

    self.methods.getSceneClasses = (scene: BattlemapScene): string => {
      return scene.$deleting ? 'confirm-delete' : ''
    }

    self.methods.shouldShowFieldsForScene = (scene: BattlemapScene): boolean => {
      return self.methods.isCurrentScene(scene.id) && !scene.$deleting
    }

    self.methods.toggleFullScreen = (): void => {
      !!tsDocument.fullscreenElement ? closeFullScreen() : openFullscreen()
    }

    const openFullscreen = (): void => {
      const elm: any = document.getElementsByClassName('container battlemap-page')[0]
      if (elm.requestFullscreen) {
        elm.requestFullscreen()
      } else if (elm.mozRequestFullScreen) {
        elm.mozRequestFullScreen()
      } else if (elm.webkitRequestFullscreen) {
        elm.webkitRequestFullscreen()
      } else if (elm.msRequestFullscreen) {
        elm.msRequestFullscreen()
      }
    }

    const closeFullScreen = (): void => {
      if (tsDocument.exitFullscreen) {
        tsDocument.exitFullscreen()
      } else if (tsDocument.mozCancelFullScreen) {
        tsDocument.mozCancelFullScreen()
      } else if (tsDocument.webkitExitFullscreen) {
        tsDocument.webkitExitFullscreen()
      } else if (tsDocument.msExitFullscreen) {
        tsDocument.msExitFullscreen()
      }
    }
    return self
  }
}
