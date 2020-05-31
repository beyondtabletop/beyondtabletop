import { Injectable } from '@angular/core'
import { PathfinderCharacter } from '../models/pathfinder/base'
import { SheetService } from './sheet.service'
import { StorageService } from './storage.service'
import { moveItemInArray } from '@angular/cdk/drag-drop'
import { HttpService } from './http.service'
import { DiceService } from './dice.service'
import { PathfinderArmor } from '../models/pathfinder/armor'
import { PathfinderAttack } from '../models/pathfinder/attack'
import { BtOverviewBlock } from '../models/common/block'
import { PathfinderCompanion } from '../models/pathfinder/companion'
import { PathfinderSkill } from '../models/pathfinder/skill'
import { BtNote } from '../models/common/note'
import { PathfinderFeat } from '../models/pathfinder/feat'
import { PathfinderSave } from '../models/pathfinder/save'
import { BtAttack } from '../models/common/attack'
import { BtCondition } from '../models/common/condition'
import { BtConditionEffect } from '../models/common/condition-effect'
import { BtConsumable } from '../models/common/consumable'
import { BtStat } from '../models/common/stat'
import { PathfinderKlass } from '../models/pathfinder/klass'
import { BtList } from '../models/common/list'
import { Dnd5eSpendable } from '../models/dnd5e/spendable'
import { PathfinderSpell } from '../models/pathfinder/spell'
import { BtValuable } from '../models/common/valuable'
import { PathfinderWeapon } from '../models/pathfinder/weapon'
import { PathfinderCoreConditions } from '../models/pathfinder/core-conditions'
import { BtPlayerTool } from '../models/common/player-tool.model';
import { CampaignService } from './campaign.service';
import { DicePackage } from '../models/dice/package'

@Injectable({
  providedIn: 'root'
})

export class PathfinderService {
  constructor(
    public sheetSvc: SheetService,
    public store: StorageService,
    private http: HttpService,
    private diceSvc: DiceService,
    private campaignSvc: CampaignService,
  ) { }

  public payload = (docId: string) => {
    const self: any = {}
    self.model = new PathfinderCharacter()
    self.methods = {}
    self.migrations = {}
    self.meta = {
      subscriptions: {},
      undefinedErrorCount: 0,
    }
    self.locals = {
      ready: false,
      document_id: docId,
      forbidden: false,
      document_failed: false,
      title_busy: false,
      beta_user: false,
      product_is_premium: false,
      this_product_key: 'pathfinder',
      collaborators: [],
      tabs: { showing_nav: false, active: 'general', list: [
        { title: 'Overview', id: 'overview' },
        { title: 'General', id: 'general' },
        { title: 'Abilities', id: 'abilities' },
        { title: 'Combat', id: 'combat' },
        { title: 'Skills', id: 'skills' },
        { title: 'Equipment', id: 'equipment' },
        { title: 'Items', id: 'items' },
        { title: 'Lists', id: 'lists' },
        { title: 'Journal', id: 'journal' },
        { title: 'Feats', id: 'feats' },
        { title: 'Spells', id: 'spells' },
        { title: 'Conditions', id: 'conditions' },
        { title: 'Companions', id: 'companions' },
        { title: 'Dice', id: 'dice' },
        { title: 'Settings', id: 'settings' }
      ], hidden_list: [
        { title: 'Find Spells', id: 'spell_list' }
      ]},
      permission: {
        writer: false
      },
      search: {
        feats: '',
        spells: '',
      },
      feedback: {},

      /*
        * This is the selection object. It contains arrays and objects that help power the select elements on the page.
        * This data is either too small to import from JSON or it needs to be on the page on load.
        */

      /* TODO: make it so that prestige classes can only be selected as a second class, not a primary class */
      selection: {
        level: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        klass: [
          'Alchemist','Antipaladin','Barbarian','Bard','Cavalier','Cleric','Druid','Fighter','Gunslinger','Inquisitor','Magus','Monk','Ninja','Oracle','Paladin','Ranger','Rogue','Samurai','Sorcerer','Summoner','Witch','Wizard',
          'Arcane Archer','Arcane Trickster','Assassin','Dragon Disciple','Duelist','Eldritch Knight','Loremaster','Mystic Theurge','Pathfinder Chronicler','Shadowdancer',
          'Arcanist','Bloodrager','Brawler','Hunter','Investigator','Shaman','Skald','Slayer','Swashbuckler','Warpriest',
          'Kineticist', 'Medium', 'Mesmerist', 'Occultist', 'Psychic', 'Spiritualist',
          'Adept','Aristocrat','Commoner','Expert','Warrior'
        ],
        race: ['Human', 'Half-Orc', 'Elf', 'Half-Elf', 'Dwarf', 'Gnome', 'Halfling'],
        size: ['Colossal', 'Gargantuan', 'Huge', 'Large', 'Medium', 'Small', 'Tiny', 'Diminutive', 'Fine'],
        size_mod: [-8, -4, -2, -1, 0, 1, 2, 4, 8],
        companion_types: ['Animal Companion', 'Familiar', 'Shapeshift'],
        progression: ['Slow', 'Medium', 'Fast'],
        advancement: {
            Slow: [0,3000,7500,14000,23000,35000,53000,77000,115000,160000,235000,330000,475000,665000,955000,1350000,1900000,2700000,3850000,5350000],
            Medium: [0,2000,5000,9000,15000,23000,35000,51000,75000,105000,155000,220000,315000,445000,635000,890000,1300000,1800000,2550000,3600000],
            Fast: [0,1300,3300,6000,10000,15000,23000,34000,50000,71000,105000,145000,210000,295000,425000,600000,850000,1200000,1700000,2400000]
          },
        'abilities': ['STR','DEX','CON','INT','WIS','CHA'],
        'weapon': {
            'type': ['--', 'Bludgeoning', 'Piercing', 'Slashing'],
          'melee_or_ranged': ['Melee', 'Ranged'],
          'crit_mult': ['x2', 'x3', 'x4', 'x5'],
          'crit_range': ['20', '19-20', '18-20', '17-20', '16-20', '15-20']
        },
        'armor': {
          'type': ['Armor', 'Shield', 'Magic', 'Other']
        },
        'babs': [0, -5, -10, -15],
        'currency': [
          { 'name': 'CP', 'id': 'copper', 'label': 'Copper Pieces' },
          { 'name': 'SP', 'id': 'silver', 'label': 'Silver Pieces' },
          { 'name': 'GP', 'id': 'gold', 'label': 'Gold Pieces' },
          { 'name': 'PP', 'id': 'platinum', 'label': 'Platinum Pieces' }
        ],
        'reverse_currency': {
            'copper': { 'unit': 'CP', 'multiplier': 1 },
          'silver': { 'unit': 'SP', 'multiplier': 10 },
          'gold': { 'unit': 'GP', 'multiplier': 100 },
          'platinum': { 'unit': 'PP', 'multiplier': 1000 }
        },
        'block_column_ids': [1, 2],
        'block_reverse_lookup': {
          'attacks_block': 'Attacks',
          'vitals_block': 'Vitals (HP/AC)',
          'abilities_block': 'Abilities',
          'conditions_block': 'Conditions',
          'skills_block': 'Skills',
          'lists_block': 'Lists',
          'custom_stats_block': 'Custom Stats',
          'consumables_block': 'Consumables',
          'valuables_block': 'Valuables',
          'feats_block': 'Feats',
          'spells_block': 'Spells',
          'weight_block': 'Weight',
          'companions_block': 'Companions',
          'powers_block': 'Powers'
        },
        'blocks': [
          { 'name': 'Attacks', 'type': 'attacks_block' },
          { 'name': 'Vitals (HP/AC)', 'type': 'vitals_block' },
          { 'name': 'Abilities', 'type': 'abilities_block' },
          { 'name': 'Conditions', 'type': 'conditions_block' },
          { 'name': 'Skills', 'type': 'skills_block' },
          { 'name': 'Lists', 'type': 'lists_block' },
          { 'name': 'Custom Stats', 'type': 'custom_stats_block' },
          { 'name': 'Consumables', 'type': 'consumables_block' },
          { 'name': 'Valuables', 'type': 'valuables_block' },
          { 'name': 'Feats', 'type': 'feats_block' },
          { 'name': 'Spells', 'type': 'spells_block' },
          { 'name': 'Weight', 'type': 'weight_block' },
          { 'name': 'Companions', 'type': 'companions_block' },
          { 'name': 'Powers', 'type': 'powers_block' }
        ],
        'skills': {
          'Acrobatics': 'DEX',
          'Appraise': 'INT',
          'Bluff': 'CHA',
          'Climb': 'STR',
          'Craft': 'INT',
          'Diplomacy': 'CHA',
          'Disable Device': 'DEX',
          'Disguise': 'CHA',
          'Escape Artist': 'DEX',
          'Fly': 'DEX',
          'Handle Animal': 'CHA',
          'Heal': 'WIS',
          'Intimidate': 'CHA',
          'Knowledge Arcana': 'INT',
          'Knowledge Dungeoneering': 'INT',
          'Knowledge Engineering': 'INT',
          'Knowledge Geography': 'INT',
          'Knowledge History': 'INT',
          'Knowledge Local': 'INT',
          'Knowledge Nature': 'INT',
          'Knowledge Nobility': 'INT',
          'Knowledge Planes': 'INT',
          'Knowledge Religion': 'INT',
          'Linguistics': 'INT',
          'Perception': 'WIS',
          'Perform': 'CHA',
          'Profession': 'WIS',
          'Ride': 'DEX',
          'Sense Motive': 'WIS',
          'Sleight of Hand': 'DEX',
          'Spellcraft': 'INT',
          'Stealth': 'DEX',
          'Survival': 'WIS',
          'Swim': 'STR',
          'Use Magic Device': 'CHA'
        },
        'styles': ['None', 'Wielding Two-Handed', 'Two-Weapon Fighting'],
        'spell_classes': [
          { 'name': 'Alchemist' },
          { 'name': 'Antipaladin' },
          { 'name': 'Bard' },
          { 'name': 'Cleric' },
          { 'name': 'Druid' },
          { 'name': 'Inquisitor' },
          { 'name': 'Magus' },
          { 'name': 'Oracle' },
          { 'name': 'Paladin' },
          { 'name': 'Ranger' },
          { 'name': 'Sorcerer' },
          { 'name': 'Summoner' },
          { 'name': 'Witch' },
          { 'name': 'Wizard' }
        ],
        'conditionStats': [
          'STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA',
          'FORT', 'REF', 'WILL', 'All Saves',
          'HP', 'SR', 'CMB', 'CMD', 'Speed', 'Initiative', 'AC', 'Dex Bonus to AC', 'Dodge Bonus to AC', 'Natural Armor Bonus', 'Weight',
          'All Skills', 'Acrobatics', 'Appraise', 'Bluff', 'Climb', 'Craft', 'Diplomacy', 'Disable Device', 'Disguise', 'Escape Artist', 'Fly', 'Handle Animal', 'Heal', 'Intimidate', 'Knowledge Arcana', 'Knowledge Dungeoneering', 'Knowledge Engineering', 'Knowledge Geography', 'Knowledge History', 'Knowledge Local', 'Knowledge Nature', 'Knowledge Nobility', 'Knowledge Planes', 'Knowledge Religion', 'Linguistics', 'Perception', 'Perform', 'Profession', 'Ride', 'Sense Motive', 'Sleight of Hand', 'Spellcraft', 'Stealth', 'Survival', 'Swim', 'Use Magic Device',
          'Attack', 'Melee Attack', 'Ranged Attack', 'Full Attack', 'Standard Attack', 'Mainhand Attack', 'Offhand Attack', 'Damage', 'Melee Damage', 'Ranged Damage', 'Full Attack Damage', 'Standard Attack Damage', 'Mainhand Damage', 'Offhand Damage'
        ],
        'spell_schools': ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'],
        'spell_levels': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        xp_log: {
          amount: 0,
          text: ''
        },
        plain_dice: ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'],
      }

      /*
        * This is the data object. It contains arrays and objects that help power calculations in the sheet.
        * This data is either loaded via JSON or it is evolving here and will eventually move to JSON.
        */

        /* TO DO: note what parts of the core conditions are calculated, what aren't. Most of the ability checks are NOT calculated */,
      data: {}

    }

    /*
      * Common functions across all BTT products
      */

    self.methods.onModelReady = async () => {
      if (self.model.prefs.show_confirmation) {
        self.methods.turnOnConfirmation()
      }
      self.locals.tabs.active = self.model.prefs.tab
      self.methods.getTitle()
      self.locals.data.is_touch_device = this.sheetSvc.isTouchDevice()
      self.methods.sanityCheck()
      checkCampaignId()
      await self.methods.loadBaseData()
      await self.methods.loadClassData()
      finishedLoading()
      await self.methods.loadSpells()
    }

    self.methods.onUnfrozen = (): void => {
      checkCampaignId()
      finishedLoading()
      self.methods.getTitle()
    }

    self.methods.getTitle = () => {
      // $window.document.title = self.model.name + ' | Beyond Tabletop'
    }

    self.methods.updateTitle = async () => {
      await Promise.resolve()
      self.touch()
      if (self.locals.permission.writer) {
        this.store.updatePlayerToolTitle(self.locals.user.firebase_id, self.locals.document_id, self.model.name)
      }
    }

    /*
      * Tab- and nav-related functions.
      */

    self.methods.switchTab = (index) => {
      self.locals.tabs.active = index
      if (self.locals.permission.writer) {
        self.model.prefs.tab = index
        self.locals.tabs.showing_nav = false
        self.locals.data.editing_overview = false
      }
    }

    self.methods.listTabs = () => {
      return self.locals.tabs.list
    }

    self.methods.isTabActive = (id) => {
      return self.locals.tabs.active === id
    }

    self.methods.tabClass = (id) => {
      return self.methods.isTabActive(id) ? 'active' : ''
    }

    self.methods.goToNextTab = () => {
      if (self.locals.data.is_touch_device) {
        let index = self.locals.tabs.active
        if (index === self.locals.tabs.list.length-1) {
          self.methods.switchTab(self.locals.tabs.list[0])
        } else {
          self.methods.switchTab(self.locals.tabs.list[index+1])
        }
      }
    }

    self.methods.goToPreviousTab = () => {
      if (self.locals.data.is_touch_device) {
        let index = self.locals.tabs.active
        if (index === 0) {
          self.methods.switchTab(self.locals.tabs.list[self.locals.tabs.list.length-1])
        } else {
          self.methods.switchTab(self.locals.tabs.list[index-1])
        }
      }
    }

    self.methods.toggleNav = () => {
      self.locals.tabs.showing_nav = ! self.locals.tabs.showing_nav
    }

    self.methods.getActiveNavItem = () => {
      return self.locals.tabs.active
    }

    self.methods.toggleHelp = () => {
      self.model.prefs.help = !self.model.prefs.help
    }

    self.methods.getBodyClasses = () => {
      let klasses = []
      klasses.push(self.model.prefs.help ? 'help-on' : 'help-off')
      return klasses.join(' ')
    }

    const finishedLoading = () => {
      self.locals.ready = true
    }

    const checkCampaignId = (): void => {
      const id = this.store.getOpenCampaignId()
      if (id && id !== self.model.campaign_id) {
        self.model.campaign_id = id
      }
    }

    /*
    * Common/shared functions
    */

    self.methods.remove = this.sheetSvc.remove
    self.methods.removeByObject = this.sheetSvc.removeByObject
    self.methods.levelize = this.sheetSvc.levelize
    self.methods.levelizeWithoutNum = this.sheetSvc.levelizeWithoutNum
    self.methods.turnOnConfirmation = this.sheetSvc.turnOnConfirmation
    self.methods.turnOffConfirmation = this.sheetSvc.turnOffConfirmation
    self.methods.isAdmin = () => this.sheetSvc.isAdmin(self.locals.user)
    self.methods.selectionReverseLookup = this.sheetSvc.selectionReverseLookup

    self.methods.increment = (parent, slug, dir) => {
      parent[slug] += dir
      self.touch()
    }

    /*
      * JSON load functions
      */

    self.methods.loadBaseData = async () => {
      self.locals.data = await this.http.getLocalAsPromise('/assets/data/pathfinder/base.json')
    }

    self.methods.loadClassData = async () => {
      self.locals.data.klass = await this.http.getLocalAsPromise('/assets/data/pathfinder/classes.json')
      self.methods.onClassChange(true)
    }

    self.methods.loadSpells = async () => {
      const data = await this.http.getLocalAsPromise('/assets/data/pathfinder/spells.json')
      self.locals.data.spells = data.spells
    }

    self.methods.displaySpellDescription = spell => {
      return spell.text
    }

    self.methods.sanityCheck = () => {
      self.methods.listKlasses().forEach(klass => klass.level = klass.level || 1)
    }

    /******************************************************
     * Accessor Methods
     ******************************************************/

    self.methods.$add = function (parent, slug, construct, init = {}) {
      self.touch()
      parent[slug] = parent[slug] || []
      const item = new construct(init)
      parent[slug].push(item)
    }

    // Armor
    // ---------------------------------------------------
    self.methods.listArmors = () => {
      return self.model.armors || []
    }

    self.methods.addArmor = name => {
      const json = self.locals.data.armors.find(x => x.name === name) || {}
      json.pos = self.methods.listArmors().length
      self.methods.$add(self.model, 'armors', PathfinderArmor, json)
    }


    // Attacks
    // ---------------------------------------------------
    self.methods.listAttacks = () => {
      return self.model.attacks || []
    }
    self.methods.listFirstTwoAttacks = () => self.methods.listAttacks().filter((x, i) => i < 2)

    self.methods.addAttack = (json: any = {}) => {
      json.pos = self.methods.listAttacks().length
      self.methods.$add(self.model, 'attacks', PathfinderAttack, json)
    }

    // Blocks
    // ---------------------------------------------------
    self.methods.listBlocks = () => {
      return self.model.blocks || []
    }

    self.methods.listBlocksForColumn = (column) => {
      return self.methods.listBlocks().filter(x => x.column === column)
    }

    self.methods.addBlock = (column_id) => {
      self.methods.$add(self.model, 'blocks', BtOverviewBlock, {
        name: 'Block Name',
        type: 'attacks_block',
        column: column_id,
        pos: self.methods.listBlocks().length
      })
    }

    // Companions
    // ---------------------------------------------------
    self.methods.listCompanions = () => {
      return self.model.companions || []
    }

    self.methods.getCompanion = (index) => {
      return self.model.companions[index]
    }

    self.methods.addCompanion = () => {
      self.methods.$add(self.model, 'companions', PathfinderCompanion)
    }

    self.methods.listCompanionSkills = (companion) => {
      return companion.skills || []
    }

    self.methods.addCompanionSkill = (companion) => {
      self.methods.$add(companion, 'skills', PathfinderSkill)
    }

    self.methods.listCompanionSpecials = (companion) => {
      return companion.specials || []
    }

    self.methods.addCompanionSpecial = (companion) => {
      self.methods.$add(companion, 'specials', BtNote)
    }

    self.methods.listCompanionFeats = (companion) => {
      return companion.feats || []
    }

    self.methods.addCompanionFeat = (companion) => {
      self.methods.$add(companion, 'feats', PathfinderFeat)
    }

    self.methods.listCompanionSaves = (companion) => {
      return companion.saves || []
    }

    self.methods.addCompanionSave = (companion) => {
      self.methods.$add(companion, 'saves', PathfinderSave)
    }

    self.methods.listCompanionAttacks = (companion) => {
      return companion.attacks || []
    }

    self.methods.addCompanionAttack = (companion) => {
      self.methods.$add(companion, 'attacks', BtAttack)
    }

    // Conditions
    // ---------------------------------------------------
    self.methods.listConditions = () => {
      return self.model.conditions || []
    }

    self.methods.listUserConditions = () => self.methods.listConditions().filter(x => x.source === 'user')

    self.methods.addCondition = () => {
      self.methods.$add(self.model, 'conditions', BtCondition, {
        pos: self.methods.listConditions().length
      })
    }

    self.methods.listConditionEffects = (condition) => {
      return condition.effects || []
    }

    self.methods.addConditionEffect = (condition) => {
      self.methods.$add(condition, 'effects', BtConditionEffect, {
        pos: self.methods.listConditionEffects(condition).length
      })
    }

    // Consumables
    // ---------------------------------------------------
    self.methods.listConsumables = () => {
      return self.model.consumables || []
    }

    self.methods.addConsumable = (json: any = {}) => {
      json.pos = self.methods.listConsumables().length
      self.methods.$add(self.model, 'consumables', BtConsumable, json)
    }

    // Custom Dice
    // ---------------------------------------------------
    self.methods.listCustomDice = () => {
      return self.model.custom_dice || []
    }

    self.methods.addCustomDice = () => {
      self.methods.$add(self.model, 'custom_dice', BtNote, {
        pos: self.methods.listCustomDice().length
      })
    }

    self.methods.getDieClass = (die: string): string[] => {
      return [`sw-${die}`, `sw-${die}-active`]
    }

    // Custom Stats
    // ---------------------------------------------------
    self.methods.listCustomStats = () => {
      return self.model.custom_stats || []
    }

    self.methods.addCustomStat = () => {
      self.methods.$add(self.model, 'custom_stats', BtStat, {
        name: '',
        pos: self.methods.listCustomStats().length,
      })
    }

    // Experiences
    // ---------------------------------------------------
    self.methods.listExperiences = () => {
      return self.model.experiences || []
    }

    self.methods.addExperience = () => {
      self.methods.$add(self.model, 'experiences', BtConsumable, {
        ...self.locals.selection.xp_log,
        created_at: Date.now(),
        pos: self.methods.listExperiences().length,
      })
      self.locals.selection.xp_log.amount = 0
      self.locals.selection.xp_log.text = ''
    }


    // Feats
    // ---------------------------------------------------
    self.methods.listFeats = () => {
      return self.model.feats || []
    }

    self.methods.addFeat = (json: any = {}) => {
      json.pos = self.methods.listFeats().length
      self.methods.$add(self.model, 'feats', PathfinderFeat, json)
    }

    self.methods.listFeatTexts = (feat) => {
      return feat.text || []
    }

    self.methods.listOverviewFeatTexts = (feat) => self.methods.listFeatTexts(feat).filter(x => x.text)
    self.methods.listFilteredSRDFeats = () => {
      const search = self.locals.search.feats.toLowerCase()
      const feats = (self.locals.data.feats || [])
      if (search) {
        return feats.filter(x => {
          return x.name.toLowerCase().includes(search) || x.summary.toLowerCase().includes(search)
        })
      }
      return feats
    }

    self.methods.getFeatText = (feat, index) => {
      return feat.text[index]
    }

    self.methods.addFeatText = (feat) => {
      self.methods.$add(feat, 'text', BtNote, {
        pos: self.methods.listFeatTexts(feat).length
      })
    }

    // Klasses
    // ---------------------------------------------------
    self.methods.listKlasses = (): PathfinderKlass[] => {
      return self.model.klasses || []
    }

    self.methods.listCasterKlasses = () => self.methods.listKlasses().filter(x => self.methods.isListedCaster(x) || self.methods.isHomebrewClass(x))

    self.methods.addKlass = () => {
      self.methods.$add(self.model, 'klasses', PathfinderKlass)
    }

    self.methods.listSpellsPerDay = (klass) => {
      return klass.spells_per_day || []
    }

    self.methods.nonNullSpellsPerDay = klass => {
      return self.methods.listSpellsPerDay(klass).filter(x => x !== null)
    }

    self.methods.nonZerothSpellsPerDay = klass => {
      return self.methods.listSpellsPerDay(klass).filter((x, i) => i > 0)
    }

    self.methods.getSpellsPerDay = (klass, index) => {
      return klass.spells_per_day[index]
    }

    self.methods.listSpellsKnown = (klass) => {
      return klass.spells_known || []
    }

    self.methods.getSpellsKnown = (klass, index) => {
      return klass.spells_known[index]
    }


    // Lists
    // ---------------------------------------------------
    self.methods.listLists = () => {
      return self.model.lists || []
    }

    self.methods.listListsBySpecial = special => {
      return self.methods.listLists().filter(x => x.special === special)
    }

    self.methods.addList = (name) => {
      self.methods.$add(self.model, 'lists', BtList, {
        name: name || '',
        pos: self.methods.listLists().length,
      })
    }

    self.methods.listListItems = (list) => {
      return list.items || []
    }

    self.methods.addListItem = (list, text) => {
      self.methods.$add(list, 'items', BtNote, {
        text: text || '',
        pos: self.methods.listListItems(list).length,
      })
    }

    // Notes
    // ---------------------------------------------------
    self.methods.listNotes = () => {
      return self.model.notes || []
    }

    self.methods.getNote = (index) => {
      return self.model.notes[index]
    }

    self.methods.addNote = () => {
      self.methods.$add(self.model, 'notes', BtNote, {
        pos: self.methods.listNotes().length
      })
      setDefaultActiveNote()
    }

    self.methods.removeNote = (note) => {
      this.sheetSvc.removeByObject(self.model.notes, note)
      setDefaultActiveNote()
    }

    const setDefaultActiveNote = () => {
      const lastNote = self.methods.listNotes()[Math.max(self.methods.listNotes().length - 1, 0)]
      if (lastNote) {
        self.methods.setActiveNote(lastNote)
      }
    }

    const resortNotes = () => {
      self.methods.listNotes().sort((a, b) => b.opened_at - a.opened_at)
    }

    self.methods.setActiveNote = (note: BtNote): void => {
      self.model.prefs.active_note = note.id
      note.opened_at = Date.now()
      resortNotes()
      self.touch()
    }

    // Powers
    // ---------------------------------------------------
    self.methods.listPowers = () => self.model.powers || []
    self.methods.getPower = index => self.model.powers[index]
    self.methods.addPower = () => {
      self.methods.$add(self.model, 'powers', Dnd5eSpendable, {
        pos: self.methods.listPowers().length
      })
    }

    // Profile
    // ---------------------------------------------------
    self.methods.listProfiles = () => {
      return self.model.profile || []
    }

    self.methods.addProfile = () => {
      self.methods.$add(self.model, 'profile', BtNote)
    }

    // Saves
    // ---------------------------------------------------
    self.methods.listSaves = () => {
      return self.model.saves || []
    }

    self.methods.getSave = (index) => {
      return self.model.saves[index]
    }

    self.methods.addSave = () => {
      self.methods.$add(self.model, 'saves', PathfinderSave)
    }

    // Skills
    // ---------------------------------------------------
    self.methods.listSkills = () => {
      return self.model.skills || []
    }

    self.methods.addSkill = () => {
      self.methods.$add(self.model, 'skills', PathfinderSkill)
    }

    self.methods.listSkillsForOverview = () => {
      return self.methods.listSkills().filter(x => self.methods.shouldShowSkillOnOverview(x))
    }

    // Custom Skills
    // ---------------------------------------------------
    self.methods.listCustomSkills = () => {
      return self.model.custom_skills || []
    }

    self.methods.getCustomSkill = (index) => {
      return self.model.custom_skills[index]
    }

    self.methods.addCustomSkill = () => {
      self.methods.$add(self.model, 'custom_skills', PathfinderSkill)
    }

    self.methods.listCustomSkillsForOverview = () => {
      return self.methods.listCustomSkills().filter(x => self.methods.shouldShowSkillOnOverview(x))
    }

    // Spells
    // ---------------------------------------------------
    self.methods.listSpells = () => {
      return self.model.spells || []
    }

    self.methods.addSpell = (json: any) => {
      const default_spell: any = { level: self.locals.data.new_spell_level }
      self.locals.selection.spell_classes.forEach(klass => default_spell[klass.name] = self.locals.data.new_spell_level)
      json = json || default_spell
      json.prepared = 0
      json.remaining = 0
      json.pos = self.methods.listSpells().length
      json.level = self.methods.getSpellLevelForKlass(json)

      self.methods.$add(self.model, 'spells', PathfinderSpell, json)
    }

    self.methods.addCustomSpell = () => {
      self.methods.addSpell()
      self.methods.switchTab('spells')
      const spell = self.model.spells[self.model.spells.length - 1]
      spell.$state = 'showing-detail editing'
    }

    self.methods.listSpellElements = (spell) => {
      return spell.elements || []
    }

    self.methods.listSpellsForLevel = (level) => {
      return self.methods.listSpells().filter(x => x.level === level)
    }

    self.methods.listOverviewSpellsForLevel = (level) => {
      return self.methods.listSpellsForLevel(level).filter(x => !self.model.casting.prepared || x.prepared > 0)
    }

    self.methods.filterAvailableSpellsForLevel = (level) => {
      if (self.locals.ready) {
        return self.locals.data.spells.filter(x => x.level === level)
      }
    }

    self.methods.spellAppearsInSpellbook = (spell) => {
      let spell_names = self.methods.listSpells(spell.level).map(x => x.name)
      return spell_names.includes(spell.name)
    }

    self.methods.removeFromSpellbook = (spell) => {
      let spell_names = self.methods.listSpells(spell.level).map(x => x.name)
      let index = spell_names.indexOf(spell.name)
      if (index > -1) {
        this.sheetSvc.remove(self.methods.spells, index)
      }
    }

    self.methods.getSpellLevelForKlass = (spell) => {
      let klass_name = self.methods.getSpellCastingKlass()
      let level = spell.level

      if (typeof spell[klass_name] === 'number') {
        level = spell[klass_name]
      }

      return level
    }

    self.methods.levelSchool = spell => {
      if (spell.level > 0) {
        return `${this.sheetSvc.levelize(spell.level)}-level ${spell.school}`
      } else {
        return `${spell.school} cantrip`
      }
    }

    // this will get spells based on the level of the last listed caster
    // for multiclass characters which is bad and needs to be fixed soon
    self.methods.getSpellCastingKlass = () => {
      let name = 'Wizard'
      const klass: any = self.methods.listKlasses().filter((klass: any) => self.methods.isClassSpellcaster(klass.name))[0]
      if (klass) {
        name = klass.name
      }
      return name
    }

    self.methods.listSRDSpells = () => {
      return (self.locals.data.spells || [])
    }

    self.methods.listSRDSpellsForLevel = (level) => {
      const spells = self.methods.listSRDSpells()
      return spells.filter(s => {
        return self.methods.shouldShowSRDSpell(s, level) && spellIncludesFoundText(s)
      })
    }

    const spellIncludesFoundText = (spell: any) => {
      const text = self.locals.search.spells.toLowerCase()
      return spell.name.toLowerCase().includes(text) || spell.text.toLowerCase().includes(text) || spell.summary.toLowerCase().includes(text) || spell.school.toLowerCase().includes(text)
    }

    self.methods.anySRDSpellsForLevel = (level) => {
      if (self.locals.ready) {
        return self.methods.listSRDSpellsForLevel(level).length > 0
      }
    }

    self.methods.listSpellsForLevel = (level) => {
      if (!self.locals.ready) { return [] }
      return self.methods.listSpells().filter(x => x.level === level)
    }

    self.methods.anySpellsForLevel = (level) => {
      if (!self.locals.ready) { return false }
      return self.methods.listSpells().some(x => x.level === level)
    }

    self.methods.spellSquareSchoolClass = spell => {
      if (spell.school) {
        return `school-${spell.school.toLowerCase()}`
      }
    }

    self.methods.saveEditedSpell = spell => {
      spell.$state = 'showing-detail'
    }

    self.methods.filteredSpellLevels = () => {
      return self.locals.selection.spell_levels.filter(level => self.methods.anySpellsForLevel(level))
    }

    self.methods.filteredSRDSpellLevels = () => {
      return self.locals.selection.spell_levels.filter(level => self.methods.anySRDSpellsForLevel(level))
    }

    // Valuables
    // ---------------------------------------------------
    self.methods.listValuables = () => {
      return self.model.valuables || []
    }

    self.methods.getValuable = (index) => {
      return self.model.valuables[index]
    }

    self.methods.addValuable = () => {
      self.methods.$add(self.model, 'valuables', BtValuable, {
        pos: self.methods.listValuables().length
      })
    }

    // Weapons
    // ---------------------------------------------------
    self.methods.listWeapons = () => {
      return self.model.weapons || []
    }

    self.methods.addWeapon = name => {
      const json = self.locals.data.weapons.find(x => x.name === name) || {}
      json.pos = self.methods.listWeapons().length
      self.methods.$add(self.model, 'weapons', PathfinderWeapon, json)
    }

    /*
      * Array Functions: Get
      */

    self.methods.getKlassData = (name) => {
      if (self.locals.ready) {
        return self.locals.data.klass[name]
      }
    }

    self.methods.getHighestLevel = () => {
      let level = 1
      if (self.locals.ready) {
        level = self.methods.listKlasses().reduce((acc, klass) => Math.max(acc, klass.level), level)
      }
      return level
    }
    self.methods.getTotalLevel = (creature = self.model) => {
      let level = 0
      if (creature instanceof PathfinderCharacter) {
        level = self.methods.listKlasses().reduce((acc, klass) => acc + klass.level, level)
      } else {
        level = (creature.level || 1)
      }
      return level
    }
    self.methods.getAllLevelsArray = () => {
      let result = []
      if (self.locals.ready) {
        result = self.methods.listKlasses().map(x => x.level)
      }
      return result
    }
    self.methods.getLevelsForKlass = (name: string): number[] => {
      if (!self.locals.ready) { return [] }
      let klass_data = self.methods.getKlassData(name)
      const levelsForKlass = !klass_data ? 20 : klass_data.levels.length
      return this.sheetSvc.sizedArray(levelsForKlass, 1)
    }

    self.methods.getAllKlassesArray = () => {
      let result = []
      if (self.locals.ready) {
        result = self.methods.listKlasses().map(x => x.name)
      }
      return result
    }
    self.methods.getAllKlasses = () => {
      let result = self.methods.getAllKlassesArray()
      return result.join(' / ')
    }

    self.methods.getAbilityTotal = (ability, include_conditions = true) => {
      let entangled_penalty = 0
      let fatigued_exhausted_penalty = 0
      let grappled_penalty = 0

      if (include_conditions && ability.name === 'DEX') {
        entangled_penalty = self.model.core_conditions.entangled ? -4 : 0
        fatigued_exhausted_penalty = self.model.core_conditions.fatigued ? -2 : 0
        fatigued_exhausted_penalty = self.model.core_conditions.exhausted ? -6 : fatigued_exhausted_penalty
        grappled_penalty = self.model.core_conditions.grappled ? -4 : 0
      }

      if (include_conditions && ability.name === 'STR') {
        fatigued_exhausted_penalty = self.model.core_conditions.fatigued ? -2 : 0
        fatigued_exhausted_penalty = self.model.core_conditions.exhausted ? -6 : fatigued_exhausted_penalty
      }

      ability.$total = ability.value + ability.misc + entangled_penalty + fatigued_exhausted_penalty + grappled_penalty + (ability.auto || 0)

      if (include_conditions && (ability.name === 'STR' || ability.name === 'DEX') && self.model.core_conditions.paralyzed) {
        ability.$total = 0
      }

      return ability.$total
    }

    self.methods.getAbilityMod = (ability, include_conditions = true) => {
      return Math.floor((self.methods.getAbilityTotal(ability, include_conditions) - 10) / 2)
    }

    self.methods.getSkillTotal = (skill, creature = self.model) => {
      let class_bonus = skill.class_skill && skill.ranks > 0 ? 3 : 0
      let armor_penalty = 0
      let blinded_penalty = self.model.core_conditions.blinded ? -4 : 0
      let frightened_penalty = self.model.core_conditions.frightened ? -2 : 0
      let panicked_penalty = self.model.core_conditions.panicked ? -2 : 0
      let shaken_penalty = self.model.core_conditions.shaken ? -2 : 0
      let sickened_penalty = self.model.core_conditions.sickened ? -2 : 0
      const isSelf = creature === self.model

      if (skill.ability === 'DEX' || skill.ability === 'STR') {
        if (self.locals.ready) {
          self.methods.listArmors().filter(armor => armor.active).forEach(armor => {
            armor_penalty = armor_penalty + armor.penalty
          })
          armor_penalty = Math.abs(armor_penalty) * -1
          self.locals.data.alterations_by_stat.skill.armor.value = armor_penalty
        }
      }
      let penalties = blinded_penalty + armor_penalty + frightened_penalty + shaken_penalty + panicked_penalty + sickened_penalty
      return skill.ranks + skill.misc + (skill.auto || 0) + self.methods.getAbilityMod(creature.abilities[skill.ability], isSelf) + class_bonus + (isSelf ? penalties : 0)
    }

    self.methods.getSkillRanksPerLevel = () => {
      let ranks_per_level = []
      if (self.locals.ready) {
        ranks_per_level = self.methods.listKlasses().map(klass => self.methods.getKlassData(klass.name)).map(data => {
          return self.methods.getAbilityMod(self.model.abilities.INT) + (!data ? 0 : parseInt(data.skill_ranks))
        })
      }
      return ranks_per_level.join(' / ')
    }

    self.methods.getTotalSkillRanks = () => {
      let total = 0

      if (self.locals.ready) {
        total = self.methods.listKlasses().reduce((acc, klass) => {
          const data = self.methods.getKlassData(klass.name)
          return acc + ((self.methods.getAbilityMod(self.model.abilities.INT) + (!data ? 0 : parseInt(data.skill_ranks)) + self.model.combat.skill_ranks.misc) * klass.level)
        }, total)
      }
      return total
    }

    self.methods.getRemainingSkillRanks = () => {
      let used = 0
      if (self.locals.ready) {
        used = self.methods.listSkills().reduce((acc, skill) => acc + skill.ranks, used)
        used = self.methods.listCustomSkills().reduce((acc, skill) => acc + skill.ranks, used)
      }
      return self.methods.getTotalSkillRanks() - used
    }

    self.methods.getShortSkillName = (name) => {
      return name.replace('Knowledge', 'K.').replace('Dungeoneering', 'Dungeon')
    }

    self.methods.getSaveTotal = (save, creature = self.model, include_conditions = true) => {
      save.$total = save.base + save.misc + (save.auto || 0) + self.methods.getAbilityMod(creature.abilities[save.ability], include_conditions) + (creature.combat.all_saves || 0)

      if (include_conditions) {
        let class_bonus = 0
        let haste_bonus = 0
        if (save.ability === 'DEX') {
          haste_bonus = self.model.core_conditions.haste ? 1 : 0
        }
        const frightened_penalty = self.model.core_conditions.frightened ? -2 : 0
        const panicked_penalty = self.model.core_conditions.panicked ? -2 : 0
        const shaken_penalty = self.model.core_conditions.shaken ? -2 : 0
        const sickened_penalty = self.model.core_conditions.sickened ? -2 : 0
        /* getting rid of this until i support all class stuff auto calculated */
        // if (self.methods.getHighestKlass() === 'Paladin' && self.methods.getHighestLevel() > 1) {
        //   class_bonus = Math.max(self.model.abilities['CHA'].mod, 0)
        //   self.locals.data.alterations_by_stat.save.divine_grace.value = class_bonus
        // } else {
        //   self.locals.data.alterations_by_stat.save.divine_grace.value = 0
        // }
        save.$total = save.$total + class_bonus + haste_bonus + frightened_penalty + shaken_penalty + panicked_penalty + sickened_penalty
      }

      return save.$total
    }

    self.methods.getSizeMod = (size) => {
      let size_mod = 0
      if (self.locals.ready) {
        size_mod = self.locals.selection.size_mod[self.locals.selection.size.indexOf(size)]
      }
      return size_mod
    }

    self.methods.getActiveNote = () => {
      if (self.locals.ready) {
        let note = self.methods.listNotes().find(x => x.id === self.model.prefs.active_note)

        if (!note) {
          note = self.methods.getNote(0)
        }
        return [note]
      }
    }

    self.methods.getTotalXP = () => {
      let xp = parseInt(self.model.basic.xp)

      if (isNaN(xp)) {
        xp = 0
      }

      if (self.locals.ready) {
        self.methods.listExperiences().reduce((acc, experience) => acc + experience.amount, xp)
      }
      return xp
    }

    self.methods.getHPFromCON = (creature = self.model) => {
      return self.methods.getAbilityMod(creature.abilities.CON) * self.methods.getTotalLevel(creature)
    }

    self.methods.getHPRemaining = (creature = self.model) => {
      return self.methods.getHPTotal(creature) - Math.abs(creature.combat.hp.damage)
    }

    self.methods.getHPTotal = (creature = self.model) => {
      return self.methods.getHPFromCON(creature) + creature.combat.hp.value + creature.combat.hp.temporary + creature.combat.hp.misc + (creature.combat.hp.auto || 0)
    }

    self.methods.getHPRingValue = (creature = self.model) => {
      let wounds_percent = Math.min(Math.floor(Math.abs(creature.combat.hp.damage) * 100 / self.methods.getHPTotal(creature)), 100)
      return Math.max(Math.floor(wounds_percent * 6.29), 0)
    }

    self.methods.HPRingColor = (creature = self.model) => {
      let wounds_percent = Math.min(Math.floor(Math.abs(creature.combat.hp.damage) * 100 / self.methods.getHPTotal(creature)), 100)
      return wounds_percent >= 75 ? '#c61515' : '#26e265'
    }

    self.methods.getTotalInit = (creature = self.model, include_conditions = true) => {
      const init = creature.combat.init
      const deafened_penalty = include_conditions && self.model.core_conditions.deafened ? -4 : 0
      init.$total = init.misc + self.methods.getAbilityMod(creature.abilities['DEX']) + deafened_penalty + (init.auto || 0)
      return init.$total
    }

    self.methods.getTotalAC = function(creature = self.model, include_conditions = true) {
      const ac = creature.combat.ac
      let dex_total = (ac.dex.auto || 0) + self.methods.getAbilityMod(creature.abilities.DEX, include_conditions)
      let subtotal = 0

      if (creature === self.model) {
        ac.armor = self.methods.listArmors().filter(armor => armor.active).reduce((acc, armor) => {
          dex_total = Math.min(dex_total, armor.dex)
          return acc + armor.bonus
        }, 0)
        subtotal = ac.armor
      }

      subtotal = subtotal + 10 + ac.natural.value + (ac.auto || 0) + ac.natural.auto + ac.deflection + ac.dodge.value + ac.dodge.auto + ac.misc + dex_total

      if (self.locals.ready && include_conditions) {
        let haste_bonus = self.model.core_conditions.haste ? 1 : 0
        let blinded_penalty = self.model.core_conditions.blinded ? -2 : 0
        let cowering_penalty = self.model.core_conditions.cowering ? -2 : 0
        let pinned_penalty = self.model.core_conditions.pinned ? -4 : 0
        let stunned_penalty = self.model.core_conditions.stunned ? -2 : 0
        if (self.methods.losesDexBonusToAC()) {
          dex_total = 0
        }
        if (dex_total < self.methods.getAbilityMod(creature.abilities.DEX)) {
          self.locals.data.alterations_by_stat.dex_to_ac.armor.value = dex_total
        } else {
          self.locals.data.alterations_by_stat.dex_to_ac.armor.value = 0
        }
        subtotal = subtotal + haste_bonus + blinded_penalty + cowering_penalty + pinned_penalty + stunned_penalty
      }
      return subtotal
    }

    self.methods.getFlatAC = (ac) => {
      let blinded_penalty = self.model.core_conditions.blinded ? -2 : 0
      let cowering_penalty = self.model.core_conditions.cowering ? -2 : 0
      let pinned_penalty = self.model.core_conditions.pinned ? -4 : 0
      let stunned_penalty = self.model.core_conditions.stunned ? -2 : 0
      return 10 + ac.armor + ac.natural.value + ac.natural.auto + ac.deflection + ac.misc + blinded_penalty + cowering_penalty + pinned_penalty + stunned_penalty
    }

    self.methods.getTouchAC = (ac) => {
      ac.dex.$total = (ac.dex.auto || 0) + self.methods.getAbilityMod(self.model.abilities.DEX)

      if (self.locals.ready) {
        self.methods.listArmors().filter(armor => armor.active).forEach(armor => {
          ac.dex.$total = Math.min(ac.dex.$total, armor.dex)
        })
      }

      let haste_bonus = self.model.core_conditions.haste ? 1 : 0
      let blinded_penalty = self.model.core_conditions.blinded ? -2 : 0
      let cowering_penalty = self.model.core_conditions.cowering ? -2 : 0
      let pinned_penalty = self.model.core_conditions.pinned ? -4 : 0
      let stunned_penalty = self.model.core_conditions.stunned ? -2 : 0
      if (self.methods.losesDexBonusToAC()) {
        ac.dex.$total = 0
      }
      return 10 + ac.misc + ac.dex.$total + ac.deflection + ac.dodge.value + ac.dodge.auto + haste_bonus + blinded_penalty + cowering_penalty + pinned_penalty + stunned_penalty
    }

    self.methods.chooseBestPath = (a, b) => {
      let paths = ['weak','medium','strong']
      let best = Math.max(paths.indexOf(a), paths.indexOf(b))
      return paths[best]
    }

    self.methods.getBABArray = (bab) => {
      const babs = [bab]
      let i = 0

      for (let b = babs[0]; b > 0; b -= 5) {
        babs[i] = b
        i = i + 1
      }

      return babs
    }

    self.methods.displayBAB = (bab) => {
      return self.methods.getBABArray(bab).join('/')
    }

    self.methods.getBABOffset = (offset) => {
      return self.model.combat.bab.value + offset
    }

    self.methods.adjustSystemAttacks = () => {
      if (self.locals.ready) {
        const babs = self.methods.getBABArray(self.model.combat.bab.value)
        const top_bab = babs[0]
        self.methods.removeSystemAttacks()
        self.locals.selection.babs = []
        babs.forEach(bab => {
          self.locals.selection.babs.push(bab - top_bab)
          self.methods.addAttack({
            attack_bonus: 0,
            weapon: self.model.combat.full_attack,
            bab: bab - top_bab,
            source: 'system'
          })
        })
      }
    }

    self.methods.removeSystemAttacks = () => {
      self.methods.listAttacks().filter(x => x.source === 'system').forEach(attack => {
        this.sheetSvc.removeByObject(self.model.attacks, attack)
      })
    }

    self.methods.getTotalCMB = (cmb, creature = self.model, include_conditions = true) => {
      cmb.$total = creature.combat.bab.value + (self.methods.getSizeMod(creature.basic.size) * -1) + self.methods.getAbilityMod(creature.abilities['STR'], include_conditions) + cmb.misc + (cmb.auto || 0)

      if (include_conditions) {
        let grappled_penalty = self.model.core_conditions.grappled ? -2 : 0
        cmb.$total = cmb.$total + grappled_penalty
      }

      return cmb.$total
    }

    self.methods.getTotalCMD = (cmd, creature = self.model, include_conditions = true) => {
      const ac = creature.combat.ac
      cmd.$total = 10 + creature.combat.bab.value + (self.methods.getSizeMod(creature.basic.size) * -1) + self.methods.getAbilityMod(creature.abilities['STR'], include_conditions) + self.methods.getAbilityMod(creature.abilities['DEX'], include_conditions) + cmd.misc + ac.deflection + ac.dodge.value + ac.dodge.auto + (cmd.auto || 0)

      if (include_conditions) {
        let grappled_penalty = self.model.core_conditions.grappled ? -2 : 0
        cmd.$total = cmd.$total + grappled_penalty
      }

      return cmd.$total
    }

    self.methods.getBothCombatScores = (CMB_stat, CMD_stat) => {
      let CMB = self.methods.getTotalCMB(CMB_stat)
      let CMD = self.methods.getTotalCMD(CMD_stat)
      let grapple_CMB = self.model.core_conditions.grappled ? ' (' + (parseInt(CMB) + 2) + ' grapple)' : ''
      let grapple_CMD = self.model.core_conditions.grappled ? ' (' + (parseInt(CMD) + 2) + ' grapple)' : ''
      return CMB + grapple_CMB + ' / ' + CMD + grapple_CMD
    }

    self.methods.getNextXPByLevel = () => {
      let next_xp = '--'
      let stat = self.methods.getTotalLevel()
      if (self.locals.ready && stat < 20) {
        next_xp = self.locals.selection.advancement[self.model.basic.progression][stat]
      }
      return next_xp
    }

    self.methods.getTotalSpeed = (speed = self.model.combat.speed) => {
      let current_speed = speed.base
      const anyArmorEquipped = self.methods.listArmors().some(armor => armor.active && armor.type === 'Armor')
      if (anyArmorEquipped) {
        current_speed = current_speed - Math.abs(speed.armor)
      }
      if (self.model.core_conditions.haste) {
        current_speed = current_speed + Math.min(30, current_speed)
      }
      if (self.model.core_conditions.entangled) {
        current_speed = Math.floor(current_speed / 2)
      }
      if (self.model.core_conditions.exhausted) {
        current_speed = Math.floor(current_speed / 2)
      }

      speed.$total = current_speed + (speed.auto || 0)
      return speed.$total
    }

    self.methods.getTotalSR = () => {
      const sr = self.model.combat.sr
      sr.$total = sr.misc + (sr.auto || 0)
      return sr.$total
    }

    self.methods.getMiscValueAutoTotal = (stat) => {
      stat.$total = stat.auto + stat.misc + stat.value
      return stat.$total
    }

    self.methods.getArmorBonus = (type) => {
      let ac_bonus = 0

      if (self.locals.ready) {
        self.methods.listArmors().filter(armor => armor.active && armor.type === type).forEach(armor => {
          ac_bonus = ac_bonus + armor.bonus
        })
        self.model.combat.ac[type.toLowerCase()] = ac_bonus
      }

      return ac_bonus
    }

    self.methods.getEquipmentWeight = () => {
      let armorWeight = 0
      let weaponWeight = 0

      if (self.locals.ready) {
        armorWeight = self.methods.listArmors().filter(armor => armor.active).reduce((acc, armor) => acc + armor.weight, armorWeight)
        weaponWeight = self.methods.listWeapons().reduce((acc, weapon) => acc + weapon.weight, weaponWeight)
      }
      return armorWeight + weaponWeight
    }

    self.methods.getLootWeight = () => {
      let lootWeight = 0
      if (self.locals.ready) {
        lootWeight = self.methods.listValuables().reduce((acc, valuable) => acc + valuable.weight * valuable.amount, lootWeight)
      }
      return lootWeight
    }

    self.methods.getTotalWeight = (weight) => {
      const armorWeight = self.methods.getEquipmentWeight()
      const lootWeight = self.methods.getLootWeight()
      weight.$total = armorWeight + lootWeight + weight.misc + (weight.auto || 0)
      return weight.$total
    }

    self.methods.getWeightCapacity = () => {
      let str = self.methods.getAbilityTotal(self.model.abilities.STR)
      let multiplier = 1
      let load = self.methods.getTotalWeight(self.model.combat.weight)
      let result = ''

      if (self.locals.ready) {
        if (str < 1) {
          return 'Too weak to move'
        }
        if (str > 100) {
          return 'Too strong to calculate'
        }
        if (str > 29) {
          let reduction = self.methods.reduceSTRForCapacity(str)
          multiplier = reduction.multiplier
          str = reduction.str
        }

        let capacity_array = self.locals.data.carrying_capacity[str].map(x => x * multiplier)

        if (load <= capacity_array[0]) {
          result = 'Light load'
        }
        if (load > capacity_array[0] && load <= capacity_array[1]) {
          result = 'Medium load'
          /* Add -3 check penalty and max dex is 3 */
        }
        if (load > capacity_array[1] && load <= capacity_array[2]) {
          result = 'Heavy load'
          /* Add -6 check penalty and max dex is 1 */
        }
        if (load > capacity_array[2]) {
          result = 'Larger than Heavy load'
        }
      }

      return result
    }

    self.methods.printWealth = (total) => {
      let gold = Math.floor(total / 100)
      let silver = Math.floor((total % 100) / 10)
      let copper = total % 10
      let result = []

      if (gold > 0) {
        result.push(gold + ' GP')
      }
      if (silver > 0) {
        result.push(silver + ' SP')
      }
      if (copper > 0) {
        result.push(copper + ' CP')
      }
      return result.join(', ')
    }

    self.methods.calculateTreasure = () => {
      let wealth = 0
      if (self.locals.ready) {
        wealth = Object.keys(self.locals.selection.reverse_currency).reduce((acc, key) => {
          return acc + (self.model.treasure[key] * self.locals.selection.reverse_currency[key].multiplier)
        }, wealth)
      }
      return wealth
    }

    self.methods.calculateValuables = () => {
      let wealth = 0
      if (self.locals.ready) {
        wealth = self.methods.listValuables().reduce((acc, valuable) => {
          return acc + (valuable.value * valuable.amount * self.locals.selection.reverse_currency[valuable.currency].multiplier)
        }, wealth)
      }
      return wealth
    }

    self.methods.calculateWealth = () => {
      return self.methods.calculateValuables() + self.methods.calculateTreasure()
    }

    self.methods.getTreasureWealth = () => {
      return self.methods.printWealth(self.methods.calculateTreasure())
    }

    self.methods.getValuablesWealth = () => {
      return self.methods.printWealth(self.methods.calculateValuables())
    }

    self.methods.getTotalWealth = () => {
      return self.methods.printWealth(self.methods.calculateWealth())
    }

    self.methods.getSpellbookLevelClass = (index) => {
      return !!self.locals.data.spellbook && self.locals.data.spellbook[index] ? 'showing-spells' : 'hiding-spells'
    }

    self.methods.getSpellListLevelClass = (index) => {
      return !!self.locals.data.spell_list && self.locals.data.spell_list[index] ? 'showing-spells' : 'hiding-spells'
    }

    self.methods.toggleSpellbookLevel = (index) => {
      self.locals.data.spellbook[index] = !self.locals.data.spellbook[index]
    }

    self.methods.toggleSpellListLevel = (index) => {
      self.locals.data.spell_list[index] = !self.locals.data.spell_list[index]
    }

    self.methods.toggleSpellState = function (spell, state) {
      spell.$state = (spell.$state === state ? '' : state)
    }

    self.methods.spellAtAGlance = spell => {
      const components = []
      const lookup = {
        subschool: 'Subschool',
        casting_time: 'Casting Time',
        components: 'Components',
        duration: 'Duration',
        effect: 'Effect',
        range: 'Rage',
        saving_throw: 'Saving Throw',
        spell_resistance: 'SR',
        targets: 'Targets'
      }
      Object.keys(lookup).forEach(key => {
        if (!!spell[key]) {
          components.push(`${lookup[key]}: ${spell[key]}`)
        }
      })
      return components.join(' / ')
    }

    self.methods.getWeaponById = (id: string) => {
      if (!self.locals.ready) { return {} }
      const weapon = self.methods.listWeapons().find(x => x.id === id) || {}
      return weapon
    }

    self.methods.getWeaponNameById = (id: string) => {
      const weapon = self.methods.listWeapons().find(x => x.id === id) || {}
      return weapon.name
    }
    self.methods.getWeaponFromAttack = (attack) => {
      if (attack === undefined) {
        return null
      }
      return self.methods.getWeaponById(attack.weapon)
    }

    self.methods.getAttackName = attack => {
      const weapon = self.methods.getWeaponFromAttack(attack)
      return weapon.name
    }

    self.methods.getAttackModifier = (weapon) => {
      if (weapon === undefined) { return null }

      let melee_or_ranged_bonus = self.model.combat.attack.melee
      let ability = 'STR'
      if (weapon.melee_or_ranged === 'Ranged' || (weapon.melee_or_ranged === 'Melee' && weapon.reverse_ability)) {
        melee_or_ranged_bonus = self.model.combat.attack.ranged
        ability = 'DEX'
      }
      let ability_value = self.methods.getAbilityMod(self.model.abilities[ability])
      let haste_bonus = self.model.core_conditions.haste ? 1 : 0
      let dazzled_penalty = self.model.core_conditions.dazzled ? -1 : 0
      let entangled_penalty = self.model.core_conditions.entangled ? -2 : 0
      let frightened_penalty = self.model.core_conditions.frightened ? -2 : 0
      let grappled_penalty = self.model.core_conditions.grappled ? -2 : 0
      let shaken_penalty = self.model.core_conditions.shaken ? -2 : 0
      let sickened_penalty = self.model.core_conditions.sickened ? -2 : 0
      let attack = ability_value + self.model.combat.attack.misc + melee_or_ranged_bonus + weapon.attack_bonus + haste_bonus + dazzled_penalty + entangled_penalty + frightened_penalty + shaken_penalty + grappled_penalty + sickened_penalty
      return attack
    }

    self.methods.getAttackRoll = (attack) => {
      let is_wielding_two_weapons = self.model.combat.style === 'Two-Weapon Fighting'
      let mainhand_or_offhand_bonus = 0
      let weapon = self.methods.getWeaponById(attack.weapon)

      if (is_wielding_two_weapons) {
        if (attack.weapon === self.model.combat.mainhand) {
          mainhand_or_offhand_bonus = self.model.combat.attack.mainhand
        }
        if (attack.weapon === self.model.combat.offhand) {
          mainhand_or_offhand_bonus = self.model.combat.attack.offhand
        }
      }
      let mod = self.methods.getAttackModifier(weapon)
      /* This assumes you have the two-weapon fighting feat and the weapon is light WHICH IS BAD */
      let two_weapon_penalty = is_wielding_two_weapons ? -2 : 0
      return mod + self.methods.getBABOffset(attack.bab) + attack.attack_bonus + two_weapon_penalty + mainhand_or_offhand_bonus + self.model.combat.attack.full
    }

    self.methods.printAttackRoll = (attack) => {
      return 'd20 + ' + self.methods.getAttackRoll(attack)
    }

    self.methods.getSingleAttackValue = (weapon) => {
      let mod = self.methods.getAttackModifier(weapon)
      return mod + self.model.combat.bab.value + self.model.combat.attack.standard
    }

    self.methods.getSingleDamageValue = (weapon) => {
      let mod = self.methods.getDamageModifier(weapon)
      return mod + self.model.combat.damage.standard
    }

    self.methods.printSingleAttackRoll = (weapon) => {
      return 'd20 + ' + self.methods.getSingleAttackValue(weapon)
    }

    self.methods.printSingleDamageRoll = (weapon) => {
      return self.methods.weaponDamageDie(weapon) + ' + ' + self.methods.getSingleDamageValue(weapon)
    }

    self.methods.weaponDamageDie = weapon => {
      return self.model.basic.size === 'Small' ? weapon.dmg_s : weapon.dmg_m
    }

    self.methods.getDamageModifier = (weapon) => {
      if (weapon === undefined) {
        return null
      }
      let str = self.methods.getAbilityMod(self.model.abilities.STR)
      const sickened_penalty = self.model.core_conditions.sickened ? -2 : 0
      if (self.model.combat.style === 'Wielding Two-Handed') {
        str = Math.floor(str * 1.5)
      }
      let melee_or_ranged_bonus = self.model.combat.damage.melee
      if (weapon.melee_or_ranged === 'Ranged' && !weapon.reverse_ability) {
        melee_or_ranged_bonus = self.model.combat.damage.ranged
        str = 0
      }
      const damage = str + weapon.damage_bonus + self.model.combat.damage.misc + melee_or_ranged_bonus + sickened_penalty
      return damage
    }

    self.methods.getDamageRoll = (attack) => {
      let is_wielding_two_weapons = self.model.combat.style === 'Two-Weapon Fighting'
      let mainhand_or_offhand_bonus = 0
      let weapon = self.methods.getWeaponById(attack.weapon)
      let offhand_modifier = 1

      if (is_wielding_two_weapons) {
        if (attack.weapon === -1) {
          weapon = self.methods.getWeaponById(self.model.combat.mainhand)
          mainhand_or_offhand_bonus = self.model.combat.damage.mainhand
        } else {
          if (attack.weapon === self.model.combat.mainhand) {
            mainhand_or_offhand_bonus = self.model.combat.damage.mainhand
          }
          if (attack.weapon === self.model.combat.offhand) {
            /* half STR */
            offhand_modifier = 2
            mainhand_or_offhand_bonus = self.model.combat.damage.offhand
          }
        }
      }
      let mod = self.methods.getDamageModifier(weapon)
      mod = Math.floor(mod / offhand_modifier)
      return mod + mainhand_or_offhand_bonus + self.model.combat.damage.full
    }

    self.methods.printDamageRoll = (attack) => {
      let weapon = self.methods.getWeaponById(attack.weapon)
      return self.methods.weaponDamageDie(weapon) + ' + ' + self.methods.getDamageRoll(attack)
    }

    self.methods.getDiceFullAttack = () => {
      return self.methods.listAttacks()
        .map(attack => self.methods.getAttackRoll(attack))
    }

    self.methods.getDiceFullAttackDamageMods = () => {
      return self.methods.listAttacks()
        .map(attack => self.methods.getDamageRoll(attack))
    }

    self.methods.getDiceFullAttackDamageSides = () => {
      return self.methods.listAttacks()
        .map(attack => self.methods.getWeaponFromAttack(attack))
        .map(weapon => self.methods.weaponDamageDie(weapon))
    }

    self.methods.companionAttackAbilityMod = (attack, companion) => {
      return self.methods.getAbilityMod(companion.abilities[attack.ability || 'STR'], false)
    }

    self.methods.getCompanionAttackBonus = (attack, companion) => {
      const multiplier = companion.attacks.length === 1 && attack.ability === 'STR' ? 1.5 : 1
      return attack.attack_bonus + Math.floor(self.methods.companionAttackAbilityMod(attack, companion) * multiplier) + companion.combat.bab.value + (self.methods.getSizeMod(companion.basic.size) * -1)
    }

    self.methods.featAppearsInFeatList = (feat) => {
      let feat_names = self.methods.listFeats().map(x => x.name)
      return feat_names.includes(feat.name)
    }

    self.methods.removeFeat = (feat) => {
      let feat_names = self.methods.listFeats().map(x => x.name)
      let index = feat_names.indexOf(feat.name)
      if (index > -1) {
        this.sheetSvc.remove(self.model.feats, index)
      }
    }

    self.methods.spellAppearsInSpellbook = (spell) => {
      let spell_names = self.methods.listSpells(parseInt(spell.level)).map(x => x.name)
      return spell_names.includes(spell.name)
    }

    self.methods.removeFromSpellbook = (spell) => {
      let spell_names = self.methods.listSpells().map(x => x.name)
      let index = spell_names.indexOf(spell.name)
      if (index > -1) {
        this.sheetSvc.remove(self.model.spells, index)
      }
    }

    self.methods.foundSpellClasses = spell => {
      return {
        added: self.methods.spellAppearsInSpellbook(spell),
        [spell.$state]: true
      }
    }

    self.methods.getCompanionAbilityTotal = (stat, name) => {
      return stat.value + stat.misc
    }
    self.methods.getCompanionAbilityMod = (name) => {
      let stat = self.model.companion.abilities[name]
      return Math.floor((self.methods.getAbilityTotal(stat) - 10) / 2)
    }
    self.methods.getCompanionSaveTotal = (stat) => {
      return stat.base + stat.misc + self.methods.getCompanionAbilityMod(stat.ability)
    }

    /*
      * Notices/Reporting
      */

    self.methods.getNoticeTypeForFull = (attack, attack_or_damage) => {
      let notices = [attack_or_damage]
      notices.push(attack_or_damage === 'Attack' ? 'Full Attack' : 'Full Attack Damage')

      let is_wielding_two_weapons = self.model.combat.style === 'Two-Weapon Fighting'
      let mainhand_or_offhand = ''
      const weapon = self.methods.getWeaponById(attack.weapon)
      if (!weapon) { return }

      if (is_wielding_two_weapons) {
        /* TODO: what if it's both the mainhand and the offhand? */
        if (attack.weapon === self.model.combat.mainhand) {
          notices.push('Mainhand ' + attack_or_damage)
        }
        if (attack.weapon === self.model.combat.offhand) {
          notices.push('Offhand ' + attack_or_damage)
        }
      }

      notices.push((weapon.melee_or_ranged === 'Ranged' ? 'Ranged ' : 'Melee ') + attack_or_damage)
      return notices
    }
    self.methods.getNoticeTypeForStandard = (weapon, attack_or_damage) => {
      let notices = [attack_or_damage]

      notices.push(attack_or_damage === 'Attack' ? 'Standard Attack' : 'Standard Attack Damage')
      notices.push((weapon.melee_or_ranged === 'Ranged' ? 'Ranged ' : 'Melee ') + attack_or_damage)
      return notices
    }

    self.methods.getCalculatedCoreConditionsArray = (name) => {
      if (!self.locals.ready) { return [] }
      let conditions = self.locals.data.conditions_by_stat[name] || {}
      return Object.keys(conditions).filter(key => self.model.core_conditions[key]).map(key => self.methods.getDisplayForValue(`${conditions[key]} from ${key}`))
    }

    self.methods.getCalculatedCoreConditions = (name) => {
      return self.methods.getCalculatedCoreConditionsArray(name).join(', ')
    }
    self.methods.getCalculatedConditionsArray = (name: any) => {
      let result = []
      let relevant_stats = [name]

      if (self.locals.ready) {
        if (typeof name === 'object') {
          relevant_stats = Object.keys(name).map(x => name[x])
        }

        self.methods.listConditions().filter(x => x.active).forEach(condition => {
          self.methods.listConditionEffects(condition).forEach(effect => {
            result = relevant_stats.filter(x => x === effect.name).map(() => `${self.methods.getModifierFromEffect(effect)} from ${condition.name}`)
          })
        })
      }
      return result
    }

    self.methods.getCalculatedConditions = (name) => {
      return self.methods.getCalculatedConditionsArray(name).join(', ')
    }

    self.methods.getCalculatedAlterationsArray = (name) => {
      let result = []
      if (self.locals.ready) {
        const alterations = self.locals.data.alterations_by_stat[name] || {}
        result = Object.keys(alterations).map(x => alterations[x]).filter(x => x.value ! == 0).map(alteration => {
          return self.methods.getDisplayForValue(alteration.value) + alteration.text
        })
      }
      return result
    }

    self.methods.getCalculatedAlterations = (name) => {
      return self.methods.getCalculatedAlterationsArray(name).join(', ')
    }

    self.methods.getCalculatedNotice = (name) => {
      return [
        ...self.methods.getCalculatedCoreConditionsArray(name),
        ...self.methods.getCalculatedConditionsArray(name),
        ...self.methods.getCalculatedAlterationsArray(name),
      ].join(', ')
    }

    self.methods.getActiveConditions = () => {
      let active_conditions = []

      if (self.locals.ready) {
        Object.keys((new PathfinderCoreConditions).getProto()).filter(key => self.model.core_conditions[key]).forEach(key => {
          active_conditions.push(key)
        })

        self.methods.listConditions().filter(x => x.active).forEach(condition => {
          active_conditions.push(condition.name)
        })

        if (active_conditions.length === 0) {
          active_conditions.push('None')
        }
      }

      return active_conditions.join(', ')
    }

    self.methods.getNameForEffectStat = (stat) => {
      const selection = self.locals.selection.conditionStats.find(x => x.path === stat)
      return selection.name
    }

    self.methods.getModifierFromEffect = (effect) => {
      let condition_data = self.locals.data.custom_conditions.find(x => x.name === effect.name)
      let result = 0
      if (condition_data) {
        if (condition_data.wildcard) {
          result = 0 // TODO FIX THIS
        } else if (condition_data.modifier) {
          result = effect.value
        } else {
          let target = self.methods.validateAndReturnStat(condition_data.target)
          result = target.obj[target.key]
        }
      }
      return result
    }
    self.methods.getSpecialLabelForStat = (weapon: any) => {
      return weapon.melee_or_ranged === 'Melee' ? 'Finesse?' : 'Thrown?'
    }

    self.methods.onSortableDrop = (e) => {
      moveItemInArray(e.container.data, e.previousIndex, e.currentIndex)
      self.touch()
    }

    /*
      * Helper functions (like booleans and commonly used stuff)
      */

    self.methods.rerunMigration = () => {
      self.model.version = self.model.version - 1
      location.reload()
    }

    self.methods.setSkillAbility = async (skill) => {
      await Promise.resolve()
      self.touch()
      skill.ability = self.locals.selection.skills[skill.name]
    }
    self.methods.losesDexBonusToAC = () => {
      return self.model.core_conditions.blinded || self.model.core_conditions.cowering || self.model.core_conditions.stunned
    }
    self.methods.isClassSpellcaster = (name) => {
      return self.locals.selection.spell_classes.some(x => x.name === name)
    }
    self.methods.shouldShowSRDSpell = (spell, level) => {
      let classes_match = Object.keys(self.locals.data.filtering.by_class).some(name => self.locals.data.filtering.by_class[name] && (typeof spell[name] === 'number') && spell[name] === level)
      // let schools_match = false
      // for (let school in self.locals.data.filtering.by_school) {
      //   if (spell.school === school) {
      //     schools_match = self.locals.data.filtering.by_school[school]
      //   }
      // }
      // return schools_match && classes_match
      return classes_match
    }
    self.methods.shouldShowTwoWeaponFighting = () => {
      return self.model.combat.style === 'Two-Weapon Fighting'
    }
    self.methods.shouldShowSkillOnOverview = (skill) => {
      return skill.class_skill || skill.ranks > 0
    }
    self.methods.anyBattlemapsPresent = () => {
      return Object.keys(this.store.tools).some(key => this.store.tools[key].meta.toolType === 'battlemap' && this.store.tools[key].meta.watching)
    }
    self.methods.getDisplayForValue = (mod) => {
      if (mod > 0) {
        mod = '+' + mod
      }
      return mod
    }

    self.methods.isHomebrewClass = (klass) => {
      return !self.methods.getKlassData(klass.name)
    }

    self.methods.isSpontaneousCaster = (klass) => {
      if (!self.locals.ready) { return true }
      let klass_data = self.methods.getKlassData(klass.name)
      return !klass_data || klass_data.levels[klass.level - 1].spells_known.length > 0
    }

    self.methods.listSpontaneousCasters = () => {
      return self.methods.listKlasses().filter(x => self.methods.isSpontaneousCaster(x))
    }

    self.methods.isListedCaster = (klass) => {
      let listed = false
      if (self.locals.ready) {
        listed = !!self.methods.getKlassData(klass.name)
      }
      return listed
    }

    self.methods.reduceSTRForCapacity = (str) => {
      let multiplier = 0
      while (str > 29) {
        str = str - 10
        multiplier = multiplier + 4
      }
      return {str: str, multiplier: multiplier}
    }

    self.methods.anyActiveConditions = () => {
      const condition_properties = Object.keys((new PathfinderCoreConditions).getProto())
      return self.locals.ready && (self.methods.listConditions().some(x => x.active) || condition_properties.some(x => self.model.core_conditions[x]))
    }

    self.methods.addCharacterAsToken = () => {
      this.store.addCharacterAsToken(self, 'pathfinder')
    }

    self.methods.getFullAttackDamageDiceIconClass = () => {
      let weapon = self.methods.getWeaponById(self.model.combat.full_attack)
      if (weapon !== null) {
        return this.diceSvc.getDiceIconClass(self.methods.weaponDamageDie(weapon))
      }
    }

    self.methods.showRollResult = (rolls) => {
      const result = this.diceSvc.printRollResult(rolls, self.model.name)
      self.locals.data.last_dice_rolled = result
    }

    self.methods.rollManyDice = (sides, modsArray, name) => {
      const packs = modsArray.map((mod, index) => {
        const text = typeof sides === 'object' ? sides[index] : sides
        return this.diceSvc.rollCustomDice({ text, name }, mod)
      }).map(result => {
        return result.rolls.reduce((acc, pack) => {
          acc.modifier += pack.modifier
          acc.name = pack.name
          acc.result += pack.result
          acc.record.list = [...acc.record.list, ...pack.record.list]
          acc.record.total += pack.record.total
          return acc
        }, {
          modifier: 0,
          result: 0,
          record: {
            list: [],
            total: 0,
          }
        }) as DicePackage
      })
      self.methods.showRollResult(packs)
      this.store.addRollsToChat(packs, name)
    }

    self.methods.rollFullAttackDamage = () => {
      self.methods.rollManyDice(self.methods.getDiceFullAttackDamageSides(), self.methods.getDiceFullAttackDamageMods(), 'full attack damage')
    }

    self.methods.rollOneDice = (sides, modifier, name, phrasing) => {
      const dice = this.diceSvc.getDicePackage(sides, modifier, name, phrasing)
      self.methods.showRollResult([dice])
      this.store.addRollsToChat([dice], name)
      return [dice]
    }

    self.methods.rollInitiative = () => {
      const results = self.methods.rollOneDice(20, self.methods.getTotalInit(), 'initiative')
      self.model.combat.init.value = results[0].result
      this.store.sendInitiativeToMap(results[0].result, self.model.id)
    }

    self.methods.rollCustomDice = (custom_dice) => {
      self.touch()
      const result = this.diceSvc.rollCustomDice(custom_dice)
      self.locals.data.last_dice_rolled = self.model.name + result.text
      this.store.addCustomRollToChat(result.text)
      return result
    }

    /******************************************************
     * Campaign Connection stuff
     ******************************************************/

    self.methods.connectedCampaignName = (): string => {
      const tool: BtPlayerTool = (self.locals.tools || []).find((x: BtPlayerTool) => x.id === self.model.campaign_id)
      return tool ? tool.title : ''
    }

    self.methods.connectCampaign = (): void => {
      const existingSelf = this.store.tools[self.model.campaign_id]
      const campaign = !!existingSelf ? existingSelf : this.campaignSvc.payload(self.model.campaign_id)
      this.store.setupToolController(campaign, 'campaign')
    }

    self.methods.campaignConnected = (): boolean => {
      return this.store.isToolOpen(self.model.campaign_id)
    }


    /******************************************************
     * Custom Conditions & Validation
     ******************************************************/

    self.methods.addBonusSpellsPerDay = (a, b) => {

      let result = null

      if (a === null || b === null || a === undefined) {
        result = null
      } else if (typeof a === 'string' || typeof b === 'string') {
        result = 0
      } else if (typeof a === 'number' && typeof b === 'number') {
        result = a + b
      }

      return result
    }

    /*
      * Custom Conditions Validation
      */

    self.methods.validateAndReturnStat = (stat) => {
      let arr = stat.split(/\.|\[|\]/gi),
        valid = true,
        schema = self.model,
        id = ''
      arr.forEach(node => {
        /*
        * If nodename is a number, it's in an array
        * If schema at node is number or null, it's the id we want
        */

        if (typeof schema[node] === 'number' || schema[node] === null) {
          id = node
        } else if (schema[node] !== undefined && id === '') {
          schema = schema[node]
        } else {
          valid = false
        }
      })
      if (valid) {
        return { obj: schema, key: id }
      } else {
        return undefined
      }
    }

    self.methods.onFormulaChange = (effect) => {
      let formula = self.methods.validateAndReturnFormula(effect.formula)
      effect.valid = formula !== undefined
    }

    self.methods.validateAndReturnFormula = (formula) => {
      let valid = formula !== null && formula !== '' && formula.match(/n|l/gi) !== null
      formula = formula.replace(/n|l/gi, '0')
      if (valid) {
        formula.split('').forEach((char: string) => {
          const isValidCharacter = char.match(/(\+|\-|\s|\d|\.|\*|\/|\%|\(|\))/gi) !== null
          if (!isValidCharacter) {
            valid = false
          }
        })
        if (valid) {
          try {
            eval(formula)
          } catch(err) {
            if (err) {
              valid = false
            }
          }
        }
      }
      if (formula === null) {
        valid = false
      }
      if (valid) {
        return formula
      } else {
        return undefined
      }
    }

    self.methods.getActiveEffectsForStat = (condition, name) => {
      let effects = self.methods.listConditionEffects(condition).filter(x => x.name === name)
      effects.forEach(effect => self.methods.activateEffect(effect))
    }

    self.methods.isConditionValid = (condition) => {
      return self.methods.listConditionEffects(condition).every(effect => effect.valid)
    }

    self.methods.setEffectFormula = (source, target, formula, effect) => {
      if (source !== undefined && target !== undefined && formula !== undefined) {
        effect.valid = true

        // If the target already has a value, that means a previous effect is active on this
        // stat, which means we need to pull the 'source' from the target and calc on that
        if (target.obj[target.key] !== null) {
          source = target
        }

        formula = effect.formula.replace('n', source.obj[source.key])

        try {
          target.obj[target.key] = Math.floor(eval(formula))
        } catch (err) {
          console.log(err)
          effect.valid = false
        }
      } else {
        effect.valid = false
      }
    }

    self.methods.unsetEffect = (target, effect, reset_value) => {
      target.obj[target.key] = reset_value
      if (self.locals.ready) {
        // if there are other active conditions whose effects have our target name as their target name
        // we need to activate those effects
        self.methods.listConditions().filter(x => x.active).forEach(condition => self.methods.getActiveEffectsForStat(condition, effect.name))
      }
    }

    // Returns boolean effect.valid
    self.methods.activateEffect = (effect) => {
      let source, target, formula
      let condition_data = self.locals.data.custom_conditions.find(x => x.name === effect.name)

      if (condition_data) {
        if (condition_data.wildcard) {
          let list = self.model[condition_data.list]

          if (list !== undefined) {
            formula = self.methods.validateAndReturnFormula(effect.formula)

            list.forEach(stat => {
              stat[condition_data.target] = stat[condition_data.target] + effect.value
            })
          } else {
            effect.valid = false
          }

        } else if (condition_data.modifier) {
          target = self.methods.validateAndReturnStat(condition_data.target)
          target.obj[target.key] = target.obj[target.key] + effect.value
        } else {
          source = self.methods.validateAndReturnStat(condition_data.source)
          target = self.methods.validateAndReturnStat(condition_data.target)
          formula = self.methods.validateAndReturnFormula(effect.formula)

          self.methods.setEffectFormula(source, target, formula, effect)
        }
      } else {
        effect.valid = false
      }

      return effect.valid
    }

    self.methods.deactivateEffect = (effect) => {
      let target
      let condition_data = self.locals.data.custom_conditions.find(x => x.name === effect.name)

      if (condition_data) {
        if (condition_data.wildcard) {
          let list = self.model[condition_data.list]
          list.forEach(stat => {
            target = { obj: stat, key: condition_data.target }
            self.methods.unsetEffect(target, effect, 0)
          })
        } else if (condition_data.modifier) {
          target = self.methods.validateAndReturnStat(condition_data.target)
          self.methods.unsetEffect(target, effect, 0)
        } else {
          target = self.methods.validateAndReturnStat(condition_data.target)
          self.methods.unsetEffect(target, effect, null)
        }
      }
    }

    self.methods.toggleCondition = async (condition) => {
      await Promise.resolve()
      self.touch()

      let valid = self.methods.isConditionValid(condition)

      if (valid && condition.active) {
        valid = self.methods.listConditionEffects(condition).every(effect => self.methods.activateEffect(effect))
      }

      if (!condition.active || !valid) {
        condition.active = false
        self.methods.listConditionEffects(condition).forEach(effect => self.methods.deactivateEffect(effect))
      }
    }

    // self.methods.reportAuto = (path) => {
    //   let stat = self.methods.validateAndReturnStat(path)
    //   console.log(path + ': ' + stat.obj[stat.key])
    // }

    self.methods.resetAutoValues = () => {
      /* this is an emergency switch to set all stat auto values to null */
      self.methods.listConditions().filter(x => x.active).forEach(condition => {
        condition.active = false
        self.methods.toggleCondition(condition)
      })

      self.locals.data.custom_conditions.filter(x => x.wildcard === undefined).forEach(condition => {
        let stat = self.methods.validateAndReturnStat(condition.target)
        stat.obj[stat.key] = 0
      })
    }

    /*
    * Watcher functions
    */

    self.methods.onClassChange = async (should_skip_reset = true) => {
      await Promise.resolve()
      self.touch()

      if (!self.locals.ready) { return false }

      // Reset filtering by class
      Object.keys(self.locals.data.filtering.by_class)
        .forEach(x => self.locals.data.filtering.by_class[x] = false)

      // Show spells from all classes who are listed
      self.methods.listKlasses().map(x => x.name).filter(name => !!self.locals.data.filtering.by_class[name]).forEach(name => self.locals.data.filtering.by_class[name] = true)

      self.methods.updateSpells(false)

      if (!should_skip_reset) {
        self.methods.enforceLevelCap()
        self.methods.updateBABAndSaves()
        self.methods.updateSkills()
      }

    }

    self.methods.onLevelChange = async () => {
      await Promise.resolve()
      self.touch()

      if (!self.locals.ready) {
        return false
      }
      self.methods.updateBABAndSaves()
      self.methods.updateSpells(true)
    }

    self.methods.enforceLevelCap = () => {
      self.methods.listKlasses().forEach(klass => {
        let data = self.methods.getKlassData(klass.name)
        klass.level = Math.min((!data ? 20 : data.levels.length), klass.level)
      })
    }

    self.methods.resetSingleValueArray = (array, reset) => {
      array.forEach(x => x.value = reset)
    }

    self.methods.updateBABAndSaves = () => {
      let fort_value = 0,
        ref_value = 0,
        will_value = 0,
        bab_value = 0

      self.methods.listKlasses().forEach(klass => {
        const data = self.methods.getKlassData(klass.name)
        if (!data) { return }
        const level_position = klass.level - 1
        bab_value = bab_value + self.locals.data.bab_types[data.bab][level_position]
        fort_value = fort_value + self.locals.data.save_types[data.fort][level_position]
        ref_value  = ref_value + self.locals.data.save_types[data.ref][level_position]
        will_value = will_value + self.locals.data.save_types[data.will][level_position]
      })

      self.model.combat.bab.value = bab_value
      self.methods.getSave(0).base = fort_value
      self.methods.getSave(1).base = ref_value
      self.methods.getSave(2).base = will_value
    }

    self.methods.updateSkills = () => {
      const skillsArray = self.methods.listSkills()
      skillsArray.forEach(skill => skill.class_skill = false)
      self.methods.listKlasses().map(klass => self.methods.getKlassData(klass.name)).filter(data => !!data).forEach(data => {
        data.skills.map(name => skillsArray.find(skill => skill.name === name)).filter(skill => !!skill).forEach(skill => skill.class_skill = true)
      })
    }

    /*
    * Gets data from locals.data for spells_known and assigns it to a temporary spot in the model
    * Gets the character's last class and loads JSON spell data for that class automatically
    */
    self.methods.updateSpells = (should_skip_new_spell_load) => {
      /* Make a note somehwere that clerics can cast 1 domain spell of each level that is not - starting with 1st level */
      let load_spells_class = null

      self.methods.listKlasses().forEach(klass => {
        let data = self.methods.getKlassData(klass.name)
        if (!data) { return }

        let ability_mod = self.methods.getAbilityMod(self.model.abilities[klass.spell_ability])
        load_spells_class = self.methods.isClassSpellcaster(klass.name) ? klass.name : null

        klass.spell_ability = data.spell_ability || 'INT'

        let spd = data.levels[klass.level - 1].spells_per_day
        let knwn = data.levels[klass.level - 1].spells_known

        self.methods.listSpellsPerDay(klass).forEach((slot: any, index: number) => {
          let bonus = Math.floor((ability_mod - index) / 4) + 1
          if (bonus < 0 || index === 0) {
            bonus = 0
          }

          slot.value = self.methods.addBonusSpellsPerDay(spd[index], bonus)
          slot.remaining = slot.value
        })

        self.methods.listSpellsKnown(klass).forEach((known: any, index: number) => {
          self.methods.getSpellsKnown(klass, index).value = (knwn[index] == undefined) ? null : knwn[index]
        })
      })
    }

    const checkWeaponAndFallback = (id) => {
      const foundWeapon = self.methods.listWeapons().find(x => x.id === id)
      const firstWeapon = self.methods.listWeapons()[0]
      return !!foundWeapon ? foundWeapon.id : firstWeapon.id
    }

    self.methods.onWeaponsChange = () => {
      if (self.methods.listWeapons().length > 0) {
        self.model.combat.mainhand = checkWeaponAndFallback(self.model.combat.mainhand)
        self.model.combat.offhand = checkWeaponAndFallback(self.model.combat.offhand)
        self.model.combat.full_attack = checkWeaponAndFallback(self.model.combat.full_attack)
        self.methods.listAttacks().forEach(attack => attack.weapon = checkWeaponAndFallback(attack.weapon))
      }
    }
    return self
  }
}
