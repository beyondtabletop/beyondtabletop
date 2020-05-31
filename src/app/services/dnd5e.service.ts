import { Injectable } from '@angular/core'
import { Dnd5eCharacter } from '../models/dnd5e/base'
import { SheetService } from './sheet.service'
import { moveItemInArray } from '@angular/cdk/drag-drop'
import { StorageService } from './storage.service'
import { HttpService } from './http.service'
import { DiceService } from './dice.service'
import { map, takeWhile, tap } from 'rxjs/operators'
import { Dnd5eArmor } from '../models/dnd5e/armor'
import { Dnd5eAttack } from '../models/dnd5e/attack'
import { BtOverviewBlock } from '../models/common/block'
import { Dnd5eCompanion } from '../models/dnd5e/companion'
import { Dnd5eSkill } from '../models/dnd5e/skill'
import { BtNote } from '../models/common/note'
import { BtAttack } from '../models/common/attack'
import { BtCondition } from '../models/common/condition'
import { BtConditionEffect } from '../models/common/condition-effect'
import { BtConsumable } from '../models/common/consumable'
import { BtStat } from '../models/common/stat'
import { Dnd5eFeat } from '../models/dnd5e/feat'
import { Dnd5eKlass } from '../models/dnd5e/klass'
import { BtList } from '../models/common/list'
import { BtText } from '../models/common/text'
import { Dnd5eSpendable } from '../models/dnd5e/spendable'
import { Dnd5eSpell } from '../models/dnd5e/spell'
import { BtValuable } from '../models/common/valuable'
import { Dnd5eWeapon } from '../models/dnd5e/weapon'
import { DicePackage } from '../models/dice/package'
import { Dnd5eAbility } from '../models/dnd5e/ability';
import { HomebrewKitBase } from '../models/homebrew-kits/base';
import { BtPlayerTool } from '../models/common/player-tool.model';
import { CampaignService } from './campaign.service';

@Injectable({
  providedIn: 'root'
})
export class Dnd5eService {

  constructor(
    public sheetSvc: SheetService,
    public store: StorageService,
    public http: HttpService,
    private diceSvc: DiceService,
    private campaignSvc: CampaignService,
  ) { }

  public payload = (docId: string) => {
    const self: any = {}
    self.model = new Dnd5eCharacter()
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
      this_product_key: 'dnd5e',
      collaborators: [],
      tabs: { showing_nav: false, active: 'general', list: [
        { title: 'Overview', id: 'overview' },
        { title: 'General', id: 'general' },
        { title: 'Abilities', id: 'abilities' },
        { title: 'Combat', id: 'combat' },
        { title: 'Equipment', id: 'equipment' },
        { title: 'Powers', id: 'powers' },
        { title: 'Items', id: 'items' },
        { title: 'Lists', id: 'lists' },
        { title: 'Journal', id: 'journal' },
        { title: 'Spells', id: 'spells' },
        { title: 'Conditions', id: 'conditions' },
        { title: 'Companions', id: 'companions' },
        { title: 'Builder', id: 'builder' },
        { title: 'Dice', id: 'dice' },
        { title: 'Settings', id: 'settings' },
      ], hidden_list: [
        { title: 'Print', id: 'print' },
        { title: 'Find Spells', id: 'spell_list' },
      ]},
      steps: { active_step: 'intro' },
      builder: {
        list_generated: false,
        track: [],
      },
      permission: {
        writer: false,
      },
      feedback: {},

      /*
       * This is the selection object. It contains arrays and objects that help power the select elements on the page.
       */
      selection: {
        level: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        spell_levels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        abilities: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'],
        ability_words: [{ name: 'STR', word: 'Strength'}, { name: 'DEX', word: 'Dexterity'}, { name: 'CON', word: 'Constitution'}, { name: 'INT', word: 'Intelligence'}, { name: 'WIS', word: 'Wisdom'}, { name: 'CHA', word: 'Charisma'}],
        alignments: ['Lawful Good', 'Lawful Neutral', 'Lawful Evil', 'Neutral Good', 'Neutral', 'Neutral Evil', 'Chaotic Good', 'Chaotic Neutral', 'Chaotic Evil'],
        klass: ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'],
        casters: ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard'],
        races: ['Human', 'Dwarf', 'Elf', 'Halfling', 'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling'],
        // levelup_klasses: ['Barbarian'],
        levelup_klasses: [],
        subraces: {
          Dwarf: ['None', 'Hill Dwarf', 'Mountain Dwarf'],
          Elf: ['None', 'High Elf', 'Wood Elf', 'Dark Elf (Drow)'],
          Halfling: ['None', 'Lightfoot Halfling', 'Stout Halfling'],
          Gnome: ['None', 'Forest Gnome', 'Rock Gnome'],
        },
        size: ['Tiny', 'Medium', 'Small', 'Large'],
        attack_types: ['Physical', 'Spell Attack', 'Spell Save'],
        companion_types: ['Animal Companion', 'Familiar', 'Shapeshift'],
        languages: ['Common', 'Dwarvish', 'Elvish', 'Giant', 'Gnomish', 'Goblin', 'Halfing', 'Orc', 'Abyssal', 'Celestial', 'Draconic', 'Deep Speech', 'Infernal', 'Primordial', 'Sylvan', 'Undercommon', 'Druidic', 'Thieves\' Cant'],
        race: ['Human', 'Dwarf', 'Mountain Dwarf', 'Hill Dwarf', 'Elf', 'High Elf', 'Wood Elf', 'Halfling', 'Stout Halfling', 'Lightfoot Halfling'],
        background: ['Acolyte', 'Charlatan', 'Criminal', 'Entertainer', 'Folk Hero', 'Guild Artisan', 'Hermit', 'Noble', 'Outlander', 'Sage', 'Sailor', 'Soldier', 'Urchin'],
        bg_attributes: [
          { name: 'Personality Traits', singular: 'a Personality Trait', slug: 'traits', listed: false },
          { name: 'Ideals', singular: 'an Ideal', slug: 'ideals', listed: false },
          { name: 'Bonds', singular: 'a Bond', slug: 'bonds', listed: false },
          { name: 'Flaws', singular: 'a Flaw', slug: 'flaws', listed: false },
          { name: 'Specialties', singular: 'a Specialty', slug: 'specialties', listed: false },
        ],
        weapon: {
          type: ['--', 'Bludgeoning', 'Piercing', 'Slashing'],
          melee_or_ranged: ['Melee', 'Ranged'],
          crit_mult: ['x2', 'x3', 'x4', 'x5'],
          crit_range: ['20', '19-20', '18-20', '17-20', '16-20', '15-20'],
        },
        armor: {
          type: ['Armor', 'Shield', 'Magic', 'Other']
        },
        currency: [
          { name: 'CP', id: 'copper', label: 'Copper Pieces' },
          { name: 'SP', id: 'silver', label: 'Silver Pieces' },
          { name: 'EP', id: 'electrum', label: 'Electrum Pieces' },
          { name: 'GP', id: 'gold', label: 'Gold Pieces' },
          { name: 'PP', id: 'platinum', label: 'Platinum Pieces' },
        ],
        reverse_currency: {
          copper: { unit: 'CP', multiplier: 1 },
          silver: { unit: 'SP', multiplier: 10 },
          electrum: { unit: 'EP', multiplier: 50 },
          gold: { unit: 'GP', multiplier: 100 },
          platinum: { unit: 'PP', multiplier: 1000 },
        },
        barbarian_paths: ['Path of the Berserker', 'Path of the Totem Warrior'],
        barbarian_totem_beasts: ['Bear', 'Eagle', 'Wolf'],
        bard_colleges: ['College of Lore', 'College of Valor'],
        domains: ['Knowledge Domain', 'Life Domain', 'Light Domain', 'Nature Domain', 'Tempest Domain', 'Trickery Domain', 'War Domain'],
        druid_circles: ['Circle of the Land', 'Circle of the Moon'],
        martial_archetypes: ['Champion', 'Battle Master', 'Eldritch Knight'],
        fighting_styles: ['Archery', 'Defense', 'Dueling', 'Great Weapon Fighting', 'Protection', 'Two-Weapon Fighting'],
        fighter_maneuvers: ['Commander\'s Strike', 'Disarming Attack', 'Distracting Strike', 'Evasive Footwork', 'Feinting Attack', 'Goading Attack', 'Lunging Attack', 'Maneuvering Attack', 'Menacing Attack', 'Parry', 'Precision Attack', 'Pushing Attack', 'Rally', 'Riposte', 'Sweeping Attack', 'Trip Attack'],
        monastic_traditions: ['Way of the Open Hand', 'Way of Shadow', 'Way of the Four Elements'],
        monk_disciplines: ['Breath of Winter', 'Clench of the North Wind', 'Elemental Attunement', 'Eternal Mountain Defense', 'Fangs of the Fire Snake', 'Fist of Four Thunders', 'Fist of Unbroken Air', 'Flames of the Phoenix', 'Gong of the Summit', 'Mist Stance', 'Ride the Wind', 'River of Hungry Flame', 'Rush of the Gale Spirits', 'Shape of the Flowing River', 'Sweeping Cinder Strike', 'Water Whip', 'Wave of Rolling Earth'],
        paladin_fighting_styles: ['Defense', 'Dueling', 'Great Weapon Fighting', 'Protection'],
        paladin_sacred_oaths: ['Oath of Devotion', 'Oath of the Ancients', 'Oath of Vengeance'],
        ranger_fighting_styles: ['Archery', 'Defense', 'Dueling', 'Two-Weapon Fighting'],
        ranger_archetypes: ['Hunter', 'Beast Master'],
        ranger_favored_enemies: ['Aberrations', 'Beasts', 'Celestials', 'Constructs', 'Dragons', 'Elementals', 'Fey', 'Fiends', 'Giants', 'Monstrosities', 'Oozes', 'Plants', 'Undead', '--', 'Dragonborn', 'Dwarves', 'Elves', 'Gnolls', 'Gnomes', 'Halflings', 'Half-Elves', 'Half-Orcs', 'Humans', 'Orcs', 'Tieflings'],
        ranger_favored_terrains: ['Arctic', 'Coast', 'Desert', 'Forest', 'Grassland', 'Mountain', 'Swamp', 'Underdark'],
        ranger_hunter_feature_1: ['Colossus Slayer', 'Giant Killer', 'Horde Breaker'],
        ranger_hunter_feature_2: ['Escape the Horde', 'Multiattack Defense', 'Steel Will'],
        ranger_hunter_feature_3: ['Volley', 'Whirlwind Attack'],
        ranger_hunter_feature_4: ['Evasion', 'Stand Against the Tide', 'Uncanny Dodge'],
        rogue_archetypes: ['Thief', 'Assassin', 'Arcane Trickster'],
        sorcerous_origins: ['Draconic Bloodline', 'Wild Magic'],
        warlock_patrons: ['Archfey', 'Fiend', 'Great Old One'],
        warlock_pact_boons: ['Pact of the Chain', 'Pact of the Blade', 'Pact of the Tome'],
        wizard_traditions: ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'],
        block_column_ids: [1, 2],
        block_reverse_lookup: {
          attacks_block: 'Attacks',
          vitals_block: 'Vitals (HP/AC)',
          rest_block: 'Resting',
          abilities_block: 'Abilities',
          conditions_block: 'Conditions',
          skills_block: 'Skills',
          lists_block: 'Lists',
          custom_stats_block: 'Custom Stats',
          consumables_block: 'Consumables',
          valuables_block: 'Valuables',
          feats_block: 'Feats',
          spells_block: 'Spells',
          powers_block: 'Powers',
          weight_block: 'Weight',
          companions_block: 'Companions',
        },
        blocks: [
          { name: 'Attacks', type: 'attacks_block' },
          { name: 'Vitals (HP/AC)', type: 'vitals_block' },
          { name: 'Resting', type: 'rest_block' },
          { name: 'Abilities', type: 'abilities_block' },
          { name: 'Conditions', type: 'conditions_block' },
          { name: 'Skills', type: 'skills_block' },
          { name: 'Lists', type: 'lists_block' },
          { name: 'Custom Stats', type: 'custom_stats_block' },
          { name: 'Consumables', type: 'consumables_block' },
          { name: 'Valuables', type: 'valuables_block' },
          { name: 'Feats', type: 'feats_block' },
          { name: 'Spells', type: 'spells_block' },
          { name: 'Powers', type: 'powers_block' },
          { name: 'Weight', type: 'weight_block' },
          { name: 'Companions', type: 'companions_block' },
        ],
        skills: {
          'Acrobatics':      'DEX',
          'Animal Handling': 'WIS',
          'Arcana':          'INT',
          'Athletics':       'STR',
          'Deception':       'CHA',
          'History':         'INT',
          'Insight':         'WIS',
          'Intimidation':    'CHA',
          'Investigation':   'INT',
          'Medicine':        'WIS',
          'Nature':          'INT',
          'Perception':      'WIS',
          'Performance':     'CHA',
          'Persuasion':      'CHA',
          'Religion':        'INT',
          'Sleight of Hand': 'DEX',
          'Stealth':         'DEX',
          'Survival':        'WIS',
        },
        conditionStats: [
          'STR',
          'DEX',
          'CON',
          'INT',
          'WIS',
          'CHA',
          'STR Save',
          'DEX Save',
          'CON Save',
          'INT Save',
          'WIS Save',
          'CHA Save',
          'All Saves',
          'Proficiency',
          'HP',
          'Speed',
          'Initiative',
          'AC',
          'Weight',
          'All Skills',
          'Acrobatics',
          'Animal Handling',
          'Arcana',
          'Athletics',
          'Deception',
          'History',
          'Insight',
          'Intimidation',
          'Investigation',
          'Medicine',
          'Nature',
          'Perception',
          'Performance',
          'Persuasion',
          'Religion',
          'Sleight of Hand',
          'Stealth',
          'Survival',
          'Attack',
          'Melee Attack',
          'Ranged Attack',
          'Damage',
          'Melee Damage',
          'Ranged Damage',
        ],
        track_names: {
          'create-race': 'Race',
          'create-klass': 'Class',
          'create-abilities': 'Abilities',
          'create-profile': 'Profile',
          'create-equipment': 'Equipment',
          'create-skills': 'Skills',
          'create-powers': 'Powers',
          'create-spells': 'Spells',
          'create-lists': 'Lists',
        },
        xp_log: {
          amount: 0,
          text: '',
        },
        plain_dice: ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'],
        reset_options: [
          { label: 'Short Rest', value: 'short' },
          { label: 'Long Rest', value: 'long' },
          { label: 'Never', value: 'never' },
        ],
        cards: {
          spells: { left: 0 }
        },
        spell_point_costs: {
          1: 2,
          2: 3,
          3: 5,
          4: 6,
          5: 7,
          6: 9,
          7: 10,
          8: 11,
          9: 13,
        }
      },
      loaded_kits: [],
      kit_data: {},
      character_spell_slots: [{}],

      /*
       * This is the data object. It contains arrays and objects that help power calculations in the sheet.
       * This data is either loaded via JSON or it is evolving here and will eventually move to JSON.
       */
      data: {}
    }

    /******************************************************
     * Common functions across all BTT products
     ******************************************************/

    self.methods.onModelReady = async (): Promise<void> => {
      prepareKitList()
      await loadBaseData()
      loadKitData()
      checkCampaignId()

      finishedLoading()
      self.methods.onBackgroundChange(false)
      self.methods.onClassChange(true)

      if (self.model.prefs.show_confirmation) {
        this.sheetSvc.turnOnConfirmation()
      }

      self.methods.setBuilderTrack()
      self.locals.tabs.active = self.model.prefs.tab
      self.locals.steps.active_step = self.model.builder.step
      self.methods.getTitle()
      self.locals.data.is_touch_device = this.sheetSvc.isTouchDevice()
    }

    self.methods.onUnfrozen = (): void => {
      checkCampaignId()
      finishedLoading()
      self.methods.getTitle()
    }

    self.methods.getTitle = (): void => {
      // $window.document.title = `${self.model.name} | Beyond Tabletop`
    }

    self.methods.updateTitle = async (): Promise<void> => {
      await Promise.resolve()
      self.touch()
      if (self.locals.permission.writer) {
        this.store.updatePlayerToolTitle(self.locals.user.firebase_id, self.locals.document_id, self.model.name)
      }
    }

    /******************************************************
     * Tab- and nav-related functions
     ******************************************************/

    self.methods.switchTab = (id: string): void => {
      self.locals.tabs.active = id
      if (self.locals.permission.writer) {
        self.model.prefs.tab = id
        self.locals.tabs.showing_nav = false
        self.locals.data.editing_overview = false
        self.touch()
      }
    }

    self.methods.listTabs = (): any[] => self.locals.tabs.list
    self.methods.listAllTabs = (): any[] => [...self.locals.tabs.list, ...self.locals.tabs.hidden_list]
    self.methods.isTabActive = (id: string): boolean => self.locals.tabs.active === id
    self.methods.tabClass = (id: string): any => ({ active: self.methods.isTabActive(id) })

    self.methods.toggleNav = (): void => { self.locals.tabs.showing_nav = !self.locals.tabs.showing_nav }

    self.methods.getActiveNavItem = (): string => {
      const tab = self.locals.tabs.list.find(x => x.id === self.locals.tabs.active)
      return tab ? tab.title : ''
    }

    self.methods.switchStep = (slug: string): void => {
      if (self.locals.permission.writer) {
        self.locals.steps.active_step = slug
        self.model.builder.step = slug
        window.scroll(0, 0)
      }
    }

    self.methods.finishStep = (group: string, current_step: string, next_step: string): void => {
      self.model.builder[group][current_step] = true
      self.methods.switchStep(next_step)
    }

    self.methods.getStepClass = (slug: string): any => ({ active: self.locals.steps.active_step === slug })
    self.methods.toggleHelp = (): void => { self.model.prefs.help = !self.model.prefs.help }

    self.methods.getBodyClasses = (): string[] => {
      const klasses = []
      klasses.push(self.model.prefs.help ? 'help-on' : 'help-off')
      klasses.push(self.locals.permission && self.locals.permission.writer ? 'writer-mode' : 'read-mode')
      if (self.model.prefs.print_mode) {
        klasses.push('print-mode')
      }
      return klasses
    }

    const finishedLoading = (): void => {
      self.locals.ready = true
    }

    const checkCampaignId = (): void => {
      const id = this.store.getOpenCampaignId()
      if (id && id !== self.model.campaign_id) {
        self.model.campaign_id = id
      }
    }

    const loadBaseData = async (): Promise<void> => {
      self.locals.data = await this.http.getLocalAsPromise('/assets/data/dnd5e/base.json')
      transformBackgroundData()
    }

    const transformBackgroundData = (): void => {
      Object.keys(self.locals.data.background).map(key => self.locals.data.background[key]).forEach(background => {
        background.lists = Object.keys(background.lists).map(key => {
          return {
            name: key,
            items: background.lists[key].map(x => ({ text: x }))
          }
        })
        self.locals.selection.bg_attributes.filter(attr => background[attr.slug]).forEach(attr => {
          background[attr.slug] = background[attr.slug].map(x => ({ text: x }))
        })
      })
    }

    /******************************************************
     * Common/shared functions
     ******************************************************/

    self.methods.isAdmin = (): boolean => this.sheetSvc.isAdmin(self.locals.user)
    self.methods.levelize = this.sheetSvc.levelize
    self.methods.levelizeWithoutNum = this.sheetSvc.levelizeWithoutNum
    self.methods.selectionReverseLookup = this.sheetSvc.selectionReverseLookup
    self.methods.remove = this.sheetSvc.remove
    self.methods.removeByObject = (array, item) => {
      self.touch()
      this.sheetSvc.removeByObject(array, item)
    }
    self.methods.turnOnConfirmation = this.sheetSvc.turnOnConfirmation
    self.methods.turnOffConfirmation = this.sheetSvc.turnOffConfirmation
    self.methods.sizedArray = this.sheetSvc.sizedArray

    self.methods.increment = (parent: any, slug: string, dir: number): void => {
      parent[slug] += dir
      self.touch()
    }

    self.methods.incrementDamage = (dir: number): void => {
      self.touch()
      self.model.combat.hp.damage += dir
      if (!self.methods.unconscious()) {
        self.methods.resetDeathSaves()
      }
    }

    self.methods.swipeCards = (dir: number, list: any): void => {
      const card_width = 220
      list.left = list.left + (dir * card_width)

      if (list.left > 20) {
        list.left = 5
      }
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

    // Abilities
    // ---------------------------------------------------
    self.methods.listAbilities = (): Dnd5eAbility[] => self.locals.selection.abilities.map(x => self.model.abilities[x])

    // Armor
    // ---------------------------------------------------
    self.methods.listArmors = (): Dnd5eArmor[] => self.model.armors || []
    self.methods.listActiveArmors = (): Dnd5eArmor[] => self.methods.listArmors().filter(x => x.active)

    self.methods.addArmor = (name: string): void => {
      const json: Dnd5eArmor = self.methods.listAvailableArmors().find(x => x.name === name) || {}
      json.pos = self.methods.listArmors().length
      self.methods.$add(self.model, 'armors', Dnd5eArmor, json)
    }

    self.methods.clearEquipment = (): void => {
      self.model.armors = []
      self.model.weapons = []
    }

    self.methods.listAvailableArmors = (): Dnd5eArmor[] => {
      const armors = listKitDataByKey('armors')
      return [...self.locals.data.armors, ...armors]
    }

    // Attacks
    // ---------------------------------------------------
    self.methods.listAttacks = (): Dnd5eAttack[] => self.model.attacks || []
    self.methods.listFirstTwoAttacks = (): Dnd5eAttack[] => self.methods.listAttacks().slice(0, 2)

    self.methods.addAttack = (): void => {
      const weapon = self.methods.listWeapons()[0]
      self.methods.$add(self.model, 'attacks', Dnd5eAttack, {
        weapon: weapon ? weapon.id : null,
        pos: self.methods.listAttacks().length,
      })
    }

    // Blocks
    // ---------------------------------------------------
    self.methods.listBlocks = (): BtOverviewBlock[] => self.model.blocks || []

    self.methods.listBlocksForColumn = (column: number): BtOverviewBlock[] => {
      return self.methods.listBlocks().filter(x => x.column === column)
    }

    self.methods.addBlock = (column: number): void => {
      self.methods.$add(self.model, 'blocks', BtOverviewBlock, {
        name: 'Block Name',
        type: 'attacks_block',
        column,
        pos: self.methods.listBlocks().length,
      })
    }

    // Companions
    // ---------------------------------------------------
    self.methods.listCompanions = (): Dnd5eCompanion[] => self.model.companions || []

    self.methods.addCompanion = (): void => {
      self.methods.$add(self.model, 'companions', Dnd5eCompanion, {
        pos: self.methods.listCompanions().length
      })
    }

    self.methods.listCompanionSkills = (companion: Dnd5eCompanion): Dnd5eSkill[] => companion.skills || []

    self.methods.addCompanionSkill = (companion: Dnd5eCompanion): void => {
      self.methods.$add(companion, 'skills', Dnd5eSkill, {
        pos: self.methods.listCompanionSkills(companion).length,
        proficient: true,
      })
    }

    self.methods.listCompanionSpecials = (companion: Dnd5eCompanion): BtNote[] => companion.specials || []

    self.methods.addCompanionSpecial = (companion: Dnd5eCompanion): void => {
      self.methods.$add(companion, 'specials', BtNote, {
        pos: self.methods.listCompanionSpecials(companion).length
      })
    }

    self.methods.listCompanionAttacks = (companion: Dnd5eCompanion): BtAttack[] => companion.attacks || []

    self.methods.addCompanionAttack = (companion: Dnd5eCompanion): void => {
      self.methods.$add(companion, 'attacks', BtAttack, {
        pos: self.methods.listCompanionAttacks(companion).length,
      })
    }

    // Conditions
    // ---------------------------------------------------
    self.methods.listConditions = (): BtCondition[] => self.model.conditions || []

    self.methods.addCondition = (): void => {
      self.methods.$add(self.model, 'conditions', BtCondition, {
        pos: self.methods.listConditions().length
      })
    }

    self.methods.listConditionEffects = (condition: BtCondition): BtConditionEffect[] => condition.effects || []

    self.methods.addConditionEffect = (condition: BtCondition): void => {
      self.methods.$add(condition, 'effects', BtConditionEffect, {
        pos: self.methods.listConditionEffects(condition).length
      })
    }

    // Consumables
    // ---------------------------------------------------
    self.methods.listConsumables = (): BtConsumable[] => self.model.consumables || []

    self.methods.addConsumable = (json: BtConsumable = {} as BtConsumable): void => {
      json.pos = self.methods.listConsumables().length
      self.methods.$add(self.model, 'consumables', BtConsumable, json)
    }

    // Custom Dice
    // ---------------------------------------------------
    self.methods.listCustomDice = (): BtNote[] => self.model.custom_dice || []

    self.methods.addCustomDice = (): void => {
      self.methods.$add(self.model, 'custom_dice', BtNote, {
        pos: self.methods.listCustomDice().length
      })
    }

    // Custom Stats
    // ---------------------------------------------------
    self.methods.listCustomStats = (): BtStat[] => self.model.custom_stats || []

    self.methods.addCustomStat = (): void => {
      self.methods.$add(self.model, 'custom_stats', BtStat, {
        pos: self.methods.listCustomStats().length,
      })
    }

    // Experiences
    // ---------------------------------------------------
    self.methods.listExperiences = (): BtConsumable[] => self.model.experiences || []

    self.methods.addExperience = (): void => {
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
    self.methods.listFeats = (): Dnd5eFeat[] => self.model.feats || []

    self.methods.addFeat = (): void => {
      self.methods.$add(self.model, 'feats', Dnd5eFeat, {
        pos: self.methods.listFeats().length
      })
    }

    // Homebrew Kits
    // ---------------------------------------------------
    self.methods.listHomebrewKits = (): string[] => self.model.homebrew_kits || []
    self.methods.kitAdded = (kit: HomebrewKitBase): boolean => self.methods.listHomebrewKits().includes(kit.id)

    self.methods.removeKit = (id: string): void => {
      unloadKit(id)
      this.sheetSvc.removeByObject(self.model.homebrew_kits, id)
    }

    self.methods.addKit = (id: string): void => {
      self.model.homebrew_kits = self.methods.listHomebrewKits()
      self.model.homebrew_kits.push(id)
      loadKitData()
    }

    const unloadKit = (id: string): void => {
      const item = self.locals.loaded_kits.find(x => x.id === id)
      if (item) {
        item.subscription.unsubscribe()
        this.sheetSvc.removeByObject(self.locals.loaded_kits, item)
      }
    }

    const kitIsLoaded = (id: string): boolean => !!self.locals.loaded_kits.find(x => id === x.id)

    const kitSubscribe = (kit: HomebrewKitBase): void => { self.locals.kit_data[kit.id] = kit.dnd5e }

    const prepareKitList = (): void => {
      self.locals.available_kits$ = this.store.player$.pipe(
        takeWhile(() => self.meta.watching),
        map((tools: BtPlayerTool[]) => tools.filter((tool: BtPlayerTool) => {
          return tool.tool_type === 'homebrew-kit' && ['owner', 'writer'].includes(tool.role) && tool.kit_type === 'dnd5e'
        })),
      )
    }

    const loadKitData = (): void => {
      if (self.model.homebrew_kits) {
        self.model.homebrew_kits.filter(id => !kitIsLoaded(id)).forEach(id => {
          const obj: any = {
            id,
            stream$: this.store.getHomebrewKit(id).pipe(
              takeWhile(() => self.meta.watching)
            )
          }
          obj.subscription = obj.stream$.subscribe(kitSubscribe, ()=>{}, () => unloadKit(id))
          self.locals.loaded_kits.push(obj)
        })
      }
    }

    const listKitDataByKey = (collectionKey: string): any[] => {
      return Object.keys(self.locals.kit_data).reduce((acc, key) => acc.concat(self.locals.kit_data[key][collectionKey] || []), [])
    }

    // Klasses
    // ---------------------------------------------------
    self.methods.listKlasses = (): Dnd5eKlass[] => self.model.klasses || []

    self.methods.getKlassById = (id: string): Dnd5eKlass => {
      return self.methods.listKlasses().find(x => x.id === id)
    }

    self.methods.addKlass = (): void => {
      self.methods.$add(self.model, 'klasses', Dnd5eKlass, {
        pos: self.methods.listKlasses().length
      })
      self.methods.onLevelChange(false)
    }

    self.methods.removeKlass = (klass: Dnd5eKlass): void => {
      this.sheetSvc.removeByObject(self.model.klasses, klass)
      self.methods.onLevelChange(false)
    }

    self.methods.listKlassSelection = (): string[] => {
      const klasses = listKitDataByKey('klasses')
      return [...self.locals.selection.klass, klasses.map(x => x.name)]
    }

    self.methods.listSpellCasters = (): Dnd5eKlass[] => {
      return self.methods.listKlasses().filter(x => klassIsHomebrew(x.name) || self.methods.isSpellCaster(x.name))
    }

    const klassIsHomebrew = (name: string): boolean => {
      return !self.locals.selection.klass.includes(name)
    }

    // Lists
    // ---------------------------------------------------
    self.methods.listLists = (): BtList[] => self.model.lists || []
    self.methods.listListsBySpecial = (special: boolean): BtList[] => self.methods.listLists().filter(x => x.special === special)
    self.methods.listPopulatedListsBySpecial = (special: boolean): BtList[] => self.methods.listListsBySpecial(special).filter(x => self.methods.anyListItems(x))

    self.methods.addList = (name: string = null): void => {
      self.methods.$add(self.model, 'lists', BtList, {
        name,
        pos: self.methods.listLists().length
      })
    }

    self.methods.listListItems = (list: BtList): BtNote[] => list.items || []
    self.methods.anyListItems = (list: BtList) => self.methods.listListItems(list).length > 0

    self.methods.addListItem = (list: BtList, text: string = null): void => {
      self.methods.$add(list, 'items', BtNote, {
        text,
        pos: self.methods.listListItems(list).length
      })
    }

    self.methods.resetLists = (): void => {
      const proto = self.model.getProto()
      self.model.lists = proto.lists
    }

    // Notes
    // ---------------------------------------------------
    self.methods.listNotes = (): BtNote[] => self.model.notes || []

    self.methods.addNote = (): void => {
      self.methods.$add(self.model, 'notes', BtNote, {
        pos: self.methods.listNotes().length
      })
      setDefaultActiveNote()
    }

    self.methods.removeNote = (note: BtNote): void => {
      this.sheetSvc.removeByObject(self.model.notes, note)
      setDefaultActiveNote()
    }

    const setDefaultActiveNote = (): void => {
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
    self.methods.addTotemBeast = (text: string = ''): void => {
      self.methods.$add(self.model.powers.Barbarian, 'totem_beasts', BtText, { text })
    }

    self.methods.addManeuver = (): void => {
      self.methods.$add(self.model.powers.Fighter, 'maneuvers', BtText)
    }

    self.methods.addDiscipline = (): void => {
      self.methods.$add(self.model.powers.Monk, 'disciplines', BtText)
    }

    self.methods.getFavoredEnemy = (index: number): BtText => self.model.powers.Ranger.favored_enemies[index]

    self.methods.addFavoredEnemy = (): void => {
      self.methods.$add(self.model.powers.Ranger, 'favored_enemies', BtText, {
        text: "Humans",
      })
    }

    self.methods.getFavoredTerrain = (index: number): BtText => self.model.powers.Ranger.favored_terrains[index]

    self.methods.addFavoredTerrain = (): void => {
      self.methods.$add(self.model.powers.Ranger, 'favored_terrains', BtText, {
        text: "Forest",
      })
    }

    self.methods.listInvocations = (): Dnd5eFeat[] => self.model.powers.Warlock.invocations || []
    self.methods.addInvocation = (json: Dnd5eFeat = {} as Dnd5eFeat): void => self.methods.$add(self.model.powers.Warlock, 'invocations', Dnd5eFeat, json)

    self.methods.listAvailableInvocations = (): Dnd5eFeat[] => {
      const invocations = listKitDataByKey('invocations')
      return [...self.locals.data.invocations, ...invocations]
    }

    self.methods.listCustomPowerSpendables = (): Dnd5eSpendable[] => self.model.powers.custom.spendables || []

    self.methods.addCustomPowerSpendable = (): void => {
      self.methods.$add(self.model.powers.custom, 'spendables', Dnd5eSpendable, {
        pos: self.methods.listCustomPowerSpendables().length
      })
    }

    self.methods.listFighterStyles = (klass: Dnd5eKlass): BtText[] => {
      return (self.model.powers.Fighter.style || []).filter((x, i) => i === 0 || (self.model.powers.Fighter.archetype === 'Champion' && klass.level >= 10))
    }

    self.methods.listWizardPortentRolls = (klass: Dnd5eKlass): BtStat[] => {
      return (self.model.powers.Wizard.portent || []).filter((x, i) => klass.level >= 14 || i < 2)
    }

    // Profile
    // ---------------------------------------------------
    self.methods.listProfiles = (): BtNote[] => self.model.profile || []
    self.methods.listCompleteProfiles = (): BtNote[] => self.methods.listProfiles().filter(x => x)
    self.methods.addProfile = (): void => self.methods.$add(self.model, 'profile', BtNote)
    self.methods.getBackgroundAttributeList = (slug: string): BtText[] => self.model.basic.background[slug]

    // Skills
    // ---------------------------------------------------
    self.methods.listSkills = (): Dnd5eSkill[] => self.model.skills || []
    self.methods.listProficientSkills = (): Dnd5eSkill[] => self.methods.listSkills().filter(x => x.proficient)
    self.methods.listBuilderSkills = (): Dnd5eSkill[] => self.methods.listSkills().filter(x => self.methods.isSkillAvailableForBuilder(x.name))

    self.methods.addSkill = (): void => {
      self.methods.$add(self.model, 'skills', Dnd5eSkill, {
        pos: self.methods.listSkills().length
      })
    }

    // Spell Slots
    // ---------------------------------------------------
    self.methods.listSpellSlots = (): BtStat[] => self.model.spell_slots || []
    self.methods.listOverviewSpellSlots = (): BtStat[] => self.methods.listSpellSlots().filter((x, i) => i < self.locals.character_spell_slots.length)
    self.methods.listOverviewSpellPoints = (): BtStat[] => self.methods.listSpellSlots().filter((x, i) => self.model.casting.points && i < self.locals.character_spell_slots.length)
    self.methods.listPrintSpellSlots = (): BtStat[] => self.methods.listSpellSlots().filter((x, i) => self.methods.anySpellsForLevel(i + 1))
    self.methods.getSpellSlot = (index: number): BtStat => self.methods.listSpellSlots()[index]
    self.methods.addSpellSlot = (json: BtStat = {} as BtStat): void => self.methods.$add(self.model, 'spell_slots', BtStat, json)

    self.methods.toggleSpellPoints = (): void => {
      self.model.casting.points = !self.model.casting.points
      self.methods.setSpellSlots(false)
      self.touch()
    }

    self.methods.spendSpellPoints = (slot: BtStat, level: number): void => {
      const cost = self.locals.selection.spell_point_costs[level] || 0

      if (slot.remaining >= cost) {
        slot.remaining = slot.remaining - cost
      } else {
        // show you can't spend points
      }
    }

    self.methods.setSpellSlots = (should_skip_reset: boolean = false): void => {
      let value = 0

      if (self.model.casting.points) {
        const totalLevel = self.methods.getTotalLevel()
        const rawPoints = self.locals.data.spell_points[totalLevel - 1].points
        const slotLevel = self.locals.data.spell_points[totalLevel - 1].level
        self.locals.character_spell_slots = [{}]

        if (!should_skip_reset) {
          self.methods.listKlasses().forEach(x => {
            // move this if outside the list spell slots loop
            const levelPercentage = x.level / totalLevel
            const slotMod = (self.locals.data.multiclassing_spell_slot_modifier[x.name] || 1)
            value = value + (rawPoints * levelPercentage * slotMod)
          })

          value = Math.floor(value)

          const slot = self.methods.listSpellSlots()[0]
          slot.value = value
          slot.remaining = value
          slot.pos = slotLevel
        }
      } else if (self.methods.characterHasSpellSlots()) {
        const sorcKlass = self.locals.data.klass.Sorcerer.levels[self.methods.getSlotLevel()]
        const firstKlass = self.locals.data.level_data[self.methods.listKlasses()[0].id] || {}
        self.locals.character_spell_slots = (self.methods.multipleSpellcasters() ? sorcKlass : firstKlass).spell_slots || [{}]

        if (!should_skip_reset) {
          self.methods.listSpellSlots().forEach((slot, s) => {
            value = parseInt(self.locals.character_spell_slots[s]) || 0
            slot.value = value
            slot.remaining = value
          })
        }
      }
    }

    // Spells
    // ---------------------------------------------------
    self.methods.listSpells = (): Dnd5eSpell[] => self.model.spells || []

    self.methods.addCustomSpell = (): void => {
      self.methods.addSpell({ level: self.locals.data.new_spell_level } as Dnd5eSpell)
      self.methods.switchTab('spells')
      const spell: Dnd5eSpell = self.model.spells[self.model.spells.length - 1]
      spell.$state = 'showing-detail editing'
    }

    self.methods.addSpell = (spell: Dnd5eSpell): void => {
      self.methods.$add(self.model, 'spells', Dnd5eSpell, {
        ...spell,
        pos: self.methods.listSpells().length
      })
    }

    self.methods.listSpellLevelsWithContent = (): number[] => self.locals.selection.spell_levels.filter(x => self.methods.anySpellsForLevel(x))
    self.methods.listSpellsForLevel = (level: number): Dnd5eSpell[] => self.methods.listSpells().filter(x => x.level === level)
    self.methods.listOverviewSpellsForLevel = (level: number): Dnd5eSpell[] => self.methods.listSpellsForLevel(level).filter(x => !self.model.casting.prepared || x.prepared)
    self.methods.anySpellsForLevel = (level: number): boolean => self.methods.listSpells().some(x => x.level === level)

    self.methods.listAvailableSpells = (): Dnd5eSpell[] => {
      if (!self.locals.ready) { return [] }
      return [...self.locals.data.spells, ...listKitDataByKey('spells')]
    }

    self.methods.filterAvailableSpellsForLevel = (level: number): Dnd5eSpell[] => {
      return self.methods.listAvailableSpells().filter(x => x.level === level && spellIncludesFoundText(x, self.locals.data.search.spells))
    }

    const spellIncludesFoundText = (spell: Dnd5eSpell, text: string): boolean => {
      text = text.toLowerCase()
      return spell.name.toLowerCase().includes(text) || spell.text.toLowerCase().includes(text) || spell.summary.toLowerCase().includes(text) || spell.school.toLowerCase().includes(text)
    }

    self.methods.getSlotLevel = (): number => {
      return self.methods.listKlasses().filter((klass: Dnd5eKlass) => {
        return self.locals.data.multiclassing_spell_slot_modifier[klass.name] !== undefined
      }).map((klass: Dnd5eKlass) => {
        const modifier = self.locals.data.multiclassing_spell_slot_modifier[klass.name]
        return Math.floor(klass.level * modifier)
      }).reduce((acc: number, num: number) => acc + num, 0)
    }

    self.methods.spellAppearsInSpellbook = (spell: Dnd5eSpell): boolean => {
      return self.methods.listSpells(spell.level).map(x => x.name).includes(spell.name)
    }

    self.methods.removeFromSpellbook = (spell: Dnd5eSpell): void => {
      const index = self.methods.listSpells(spell.level).map(x => x.name).indexOf(spell.name)
      if (index > -1) {
        this.sheetSvc.remove(self.model.spells, index)
      }
    }

    self.methods.foundSpellClasses = (spell: Dnd5eSpell): any => {
      return {
        added: self.methods.spellAppearsInSpellbook(spell),
        [spell.$state]: true,
        'bt-hide': !self.methods.shouldShowSRDSpell(spell),
      }
    }

    self.methods.levelSchool = spell => {
      if (spell.level > 0) {
        return `${this.sheetSvc.levelize(spell.level)}-level ${spell.school}`
      } else {
        return `${spell.school} cantrip`
      }
    }

    self.methods.spellSquareSchoolClass = spell => {
      if (spell.school) {
        return `school-${spell.school.toLowerCase()}`
      }
    }

    self.methods.saveEditedSpell = spell => {
      spell.$state = 'showing-detail'
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

    self.methods.getWeapon = (index) => {
      return self.model.weapons[index]
    }

    self.methods.addWeapon = name => {
      const json = self.methods.listAvailableWeapons().find(x => x.name === name) || {}
      json.pos = self.methods.listWeapons().length
      self.methods.$add(self.model, 'weapons', Dnd5eWeapon, json)
    }

    self.methods.listAvailableWeapons = () => {
      const weapons = listKitDataByKey('weapons')
      return [...self.locals.data.weapons, ...weapons]
    }

    /******************************************************
     * Get functions
     ******************************************************/

    self.methods.getAbilityTotal = stat => {
      return stat.value + stat.misc + (stat.auto || 0)
    }

    self.methods.getProficiencyTotal = (creature = self.model) => {
      return self.methods.getAbilityTotal(creature.basic.proficiency)
    }

    self.methods.getAbilityMod = (stat) => {
      return Math.floor((self.methods.getAbilityTotal(stat) - 10) / 2)
    }

    self.methods.getSaveTotal = (stat, creature = self.model) => {
      let total = self.methods.getAbilityMod(stat) + self.model.combat.all_saves + (stat.save_auto || 0)

      if (stat.save_prof) {
        total = total + self.methods.getProficiencyTotal(creature)
      }

      return total
    }

    self.methods.getSkillTotal = (skill, creature = self.model) => {
      let unskilled_bonus = 0

      if (self.model === creature) {
        if (self.methods.isClass('Bard') && self.methods.getCurrentLevelForKlass('Bard') >= 2) {
          unskilled_bonus = skill.proficient ? 0 : self.methods.halfRoundedDown(self.methods.getProficiencyTotal(creature))
        }
      }

      let proficiency_bonus = skill.proficient ? self.methods.getProficiencyTotal(creature) : 0
      let expert_bonus = skill.proficient && skill.expert ? self.methods.getProficiencyTotal(creature) : 0
      return skill.misc + (skill.auto || 0) + self.methods.getAbilityMod(creature.abilities[skill.ability]) + proficiency_bonus + expert_bonus + unskilled_bonus
    }

    self.methods.getSkillTotalByName = (name) => {
      let skill = self.methods.listSkills().find(x => x.name === name)
      if (skill) {
        return self.methods.getSkillTotal(skill)
      }
    }

    self.methods.getListByName = (name: string): BtList => {
      return self.methods.listLists().find(x => x.name === name)
    }

    self.methods.getOrCreateList = (name) => {
      if (self.locals.ready) {
        let list = self.methods.getListByName(name)
        if (!list) {
          self.methods.addList(name)
          list = self.methods.getListByName(name)
        }
        return list
      }
    }

    self.methods.addToAndCreateList = (name, items) => {
      if (self.locals.ready) {
        let list = self.methods.getListByName(name)
        if (!list) {
          self.methods.addList(name)
          list = self.methods.getListByName(name)
        }
        items.forEach(item => {
          self.methods.addListItem(list.items, item)
        })
        self.locals.feedback[name] = true
      }
    }

    self.methods.getDieClass = (die: string): string[] => {
      return [`sw-${die}`, `sw-${die}-active`]
    }

    self.methods.getAllKlassesArray = () => {
      let result = []
      if (self.locals.ready) {
        result = self.methods.listKlasses().map(x => x.name)
      }
      return result
    }

    self.methods.getHighestLevel = () => {
      let level = 1
      if (self.locals.ready && self.model.klasses) {
        level = self.methods.listKlasses().reduce((acc, klass) => acc > klass.level ? acc : klass.level, 0)
      }
      return level
    }

    self.methods.getKlassLevelData = (klass) => {
      const data = self.locals.data.klass[klass.name]
      if (data && data.levels) {
        return data.levels[klass.level - 1]
      }
    }

    self.methods.getTotalLevel = (creature = self.model) => {
      const level = self.methods.listKlasses().reduce((sum, item) => sum + item.level, 0)
      return Math.min(Math.max(1, level), 20)
    }

    self.methods.getAllLevelsArray = () => {
      let result = []
      if (self.locals.ready) {
        result = self.methods.listKlasses().map(x => x.level)
      }
      return result
    }

    const getKitKlassByName = (name) => {
      const klasses = listKitDataByKey('klasses')
      return klasses.find(x => x.name === name)
    }

    self.methods.getLevelUpDataForKlass = (name = self.model.main_klass) => {
      if (!self.locals.ready) {
        return undefined
      }
      if (!self.locals.data.klass[name]) {
        const data = getKitKlassByName(name)
        if (data) {
          return data
        }
      }
      return self.locals.data.klass[name]
    }

    self.methods.getHighestKlass = () => {
      if (self.locals.ready && self.model.klasses) {
        self.model.main_klass = self.methods.listKlasses().reduce((acc, klass) => acc.level > klass.level ? acc : klass, { level: 0 }).name
      }
      return self.model.main_klass || ''
    }

    self.methods.getAllKlasses = () => {
      let result = self.methods.getAllKlassesArray()
      return result.join(' / ')
    }

    self.methods.getCurrentLevelForKlass = (name) => {
      let klassObj = self.methods.listKlasses().find(x => x.name === name)
      return !!klassObj ? klassObj.level : 0
    }

    self.methods.getFirstKlass = () => {
      return self.methods.listKlasses()[0] || {}
    }

    self.methods.getFirstKlassAsArray = () => {
      return [self.methods.getFirstKlass()]
    }

    self.methods.getFirstKlassData = () => {
      return self.methods.getLevelUpDataForKlass(self.methods.getFirstKlass().name)
    }

    self.methods.getClassSkillProficiencies = () => {
      let klass = self.model.main_klass
      return self.locals.ready ? `For ${klass}, choose ${self.locals.data.klass[klass].skills_number} of the following skills to be proficient in: ${self.locals.data.klass[klass].available_skills.join(', ')}. ` : ''
    }

    self.methods.isClass = (name) => {
      const klassObj = self.methods.listKlasses().find(x => x.name === name)
      return !!klassObj
    }

    self.methods.isSpellCaster = (name = self.model.main_klass) => {
      // let klass = self.model.klasses.get(0).name
      // Used to use first class but changed to highest class bc i think it applies to more situations
      return self.locals.selection.casters.includes(name) ||
        (name === 'Fighter' && self.model.powers.Fighter.archetype === 'Eldritch Knight') ||
        (name === 'Rogue' && self.model.powers.Rogue.archetype === 'Arcane Trickster')
    }

    self.methods.canCastSpellLevel = (index) => {
      if (index === 0) {
        return true
      }
      let level = self.methods.getSpellSlot(index - 1)
      return self.methods.getMiscValueAutoTotal(level) > 0
    }

    self.methods.getHPTotal = (creature = self.model) => {
      let con_hp = self.methods.getHPFromCON(creature)
      return con_hp + creature.combat.hp.value + creature.combat.hp.temporary + creature.combat.hp.misc + (creature.combat.hp.auto || 0)
    }

    self.methods.getHPFromCON = (creature = self.model) => {
      return Math.max(self.methods.getAbilityMod(creature.abilities.CON) * self.methods.getTotalLevel(creature), 0)
    }

    self.methods.getHPRemaining = (creature = self.model) => {
      return self.methods.getHPTotal(creature) - Math.abs(creature.combat.hp.damage)
    }

    self.methods.getHPRingValue = (creature = self.model) => {
      let wounds_percent = Math.min(Math.floor(Math.abs(creature.combat.hp.damage) * 100 / self.methods.getHPTotal(creature)), 100)
      return Math.max(Math.floor(wounds_percent * 6.29), 0)
    }

    self.methods.HPRingColor = (creature = self.model) => {
      let wounds_percent = Math.min(Math.floor(Math.abs(creature.combat.hp.damage) * 100 / self.methods.getHPTotal(creature)), 100)
      return wounds_percent >= 75 ? '#c61515' : '#26e265'
    }

    self.methods.getTotalInit = (creature = self.model) => {
      const init = creature.combat.init
      return init.misc + (init.auto || 0) + self.methods.getAbilityMod(creature.abilities.DEX)
    }

    self.methods.getTotalAC = (creature = self.model) => {
      let total_ac = 0
      const ac = creature.combat.ac

      let dex = 0

      if (!!creature.armors) {
        creature = self.model
        dex = self.methods.listArmors().filter(x => x.active).reduce((acc, armor) => Math.min(acc, armor.dex), self.methods.getAbilityMod(creature.abilities.DEX))

        let ability_bonus = 0
        if (creature.combat.ac.use_ability) {
          ability_bonus = self.methods.getAbilityMod(creature.abilities[creature.combat.ac.ability])
        }
        total_ac = total_ac + ac.armor + ac.shield + ac.magic + ac.other + ability_bonus
      } else {
        dex = self.methods.getAbilityMod(creature.abilities.DEX)
      }
      return total_ac + ac.natural + ac.deflection + ac.dodge + ac.misc + dex + (ac.auto || 0)
    }

    self.methods.getDexBonusToAC = (creature = self.model) => {
      let dex = self.methods.getAbilityMod(creature.abilities.DEX)
      if (self.locals.ready) {
        self.model.combat.no_armor_equipped = true

        self.locals.selection.armor.type.forEach((t: string) => {
          self.model.combat.ac[t.toLowerCase()] = 0
        })

        self.methods.listArmors().forEach(armor => {
          let type = armor.type.toLowerCase()
          if (armor.active) {
            self.model.combat.ac[type] = self.model.combat.ac[type] + armor.bonus

            if (armor.type === "Shield" || armor.type === "Armor") {
              self.model.combat.no_armor_equipped = false
            }

            if (armor.type === 'Armor' && armor.str > self.methods.getAbilityTotal(self.model.abilities.STR)) {
              self.model.combat.speed.armor_penalty = true
            }

            dex = Math.max(Math.min(dex, armor.dex), 0)
          }
        })
      }
      return dex
    }

    self.methods.getTotalSpeed = (speed = self.model.combat.speed) => {
      let current_speed = speed.base
      let monk_bonus = 0

      if (speed.armor_penalty) {
        current_speed = current_speed - Math.abs(speed.armor)
      }

      if (self.model.combat.no_armor_equipped && self.methods.isClass('Monk')) {
        monk_bonus = self.model.powers.Monk.unarmored_movement
      }

      return current_speed + monk_bonus + (speed.auto || 0)
    }

    self.methods.getMiscValueAutoTotal = (stat) => {
      return (stat.auto || 0) + stat.misc + stat.value
    }

    // ****************************************************************
    // Backgrounds stuff
    // ****************************************************************

    self.methods.backgroundListName = (attr) => {
      const data = getBackgroundData()
      if (attr.name === 'Specialties' && !!data && !!data.specialty_name) {
        return data.specialty_name
      } else {
        return attr.name
      }
    }

    const getBackgroundData = () => {
      if (!self.locals.ready) {
        return null
      }
      const kitBackground = listKitDataByKey('backgrounds').find(x => x.name === self.model.basic.background.name)
      return self.locals.data.background[self.model.basic.background.name] || kitBackground
    }

    self.methods.listBackgroundAttributes = () => {
      const data = getBackgroundData()
      return self.locals.selection.bg_attributes.filter(x => {
        return x.name !== 'Specialties' || !data || !!data.specialty_name
      })
    }

    self.methods.listBackgroundSelection = () => {
      const backgrounds = listKitDataByKey('backgrounds')
      return [...self.locals.selection.background, backgrounds.map(x => x.name)]
    }

    self.methods.getBackgroundDataLists = () => {
      const data = getBackgroundData()
      return data.lists || []
    }

    self.methods.isBackgroundListed = () => {
      const data = getBackgroundData()
      return self.locals.ready && !!data
    }

    self.methods.isBackgroundAttrListed = (item, attr) => {
      if (!self.locals.ready) {
        return false
      }

      const data = getBackgroundData()
      // BG not listed
      if (!data) {
        attr.listed = false
      // BG listed, attr has custom property
      } else if (attr.custom !== undefined) {
        attr.listed = !attr.custom
      // BG listed, attr doesn't have custom property
      } else {
        const list = data[attr.slug]
        attr.listed = !item.text || list.map(x => x.text).includes(item.text)
      }
      return attr.listed
    }

    self.methods.resetBackground = () => {
      self.locals.data.custom_background = false
      self.model.basic.background.name = 'Acolyte'
    }

    self.methods.getBackgroundGold = () => {
      const data = getBackgroundData()
      return data.gold || 0
    }

    self.methods.listBackgroundAttributeOptions = (slug) => {
      const data = getBackgroundData()
      return data[slug] || []
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
      let armorWeight = self.methods.getEquipmentWeight()
      let lootWeight = self.methods.getLootWeight()

      return armorWeight + lootWeight + weight.misc + (weight.auto || 0)
    }

    self.methods.getWeightCapacity = () => {
      let result = ''

      if (self.locals.ready) {
        let str = self.methods.getAbilityTotal(self.model.abilities.STR)
        let multiplier = self.locals.data.weight_by_size[self.model.basic.size] || 1
        let load = self.methods.getTotalWeight(self.model.combat.weight)
        if (str < 1) {
          result = 'Too weak to move'
        }
        else if (str > 100) {
          result = 'Too strong to calculate'
        }
        else {
          let encumbered_limit = str * 5 * multiplier
          let heavy_encumbered_limit = str * 10 * multiplier
          let carrying_limit = str * 15 * multiplier
          let pushing_limit = str * 30 * multiplier
          if (load < encumbered_limit) {
            result = 'Total weight can be carried'
          } else if (load < heavy_encumbered_limit) {
            result = 'Total weight can be carried, but you are encumbered'
          } else if (load < carrying_limit) {
            result = 'Total weight can be carried, but you are heavily encumbered'
          } else if (load < pushing_limit) {
            result = 'Total weight can be pushed, but is too heavy to be carried'
          } else {
            result = 'Total weight is too heavy to be pushed or carried'
          }
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

    self.methods.duelingStyleForKlass = (name) => {
      return !!self.model.powers[name] &&
        !!self.model.powers[name].style &&
        !!self.model.powers[name].style.find(x => x.value === 'Dueling')
    }

    self.methods.currentDueling = () => {
      let dueling_style = false
      if (self.locals.ready) {
        self.methods.listKlasses().forEach(klass => {
          dueling_style = dueling_style || self.methods.duelingStyleForKlass(klass.name)
        })
      }
      let no_shield = !self.methods.listArmors().find(x => x.active && x.type === 'Shield')
      return dueling_style && no_shield
    }

    self.methods.getAttackModifier = (attack) => {
      let attack_value = 0
      let ability_value = self.methods.getAbilityMod(self.model.abilities[attack.ability])

      if (attack.type === 'Physical') {
        let weapon = self.methods.getAttackWeapon(attack)
        if (!weapon) {
          return 0
        }
        let melee_or_ranged_bonus = weapon.melee_or_ranged === 'Ranged' ? self.model.combat.attack.ranged : self.model.combat.attack.melee
        let proficiency_bonus = 0
        if (weapon.is_proficient) {
          proficiency_bonus = self.methods.getProficiencyTotal()
        }
        attack_value = ability_value + self.model.combat.attack.all.auto + self.model.combat.attack.all.value + proficiency_bonus + melee_or_ranged_bonus.auto + melee_or_ranged_bonus.value + weapon.attack_bonus + attack.attack_bonus
      }

      if (attack.type === 'Spell Attack') {
        attack_value = ability_value + attack.attack_bonus + self.methods.getProficiencyTotal()
      }

      return attack_value
    }

    self.methods.printAttackRoll = (attack) => {
      if (attack.type === 'Spell Save') { return printSpellSaveAttack(attack) }
      return 'd20 + ' + self.methods.getAttackModifier(attack)
    }

    const printSpellSaveAttack = (attack) => {
      return `DC ${self.methods.getSpellSaveDCForAttack(attack)} ${attack.ability} Save`
    }

    self.methods.getDamageModifier = (attack) => {
      let damage_value = 0
      let ability_value = self.methods.getAbilityMod(self.model.abilities[attack.ability])

      if (attack.type === 'Physical') {
        const weapon = self.methods.getAttackWeapon(attack)
        if (!weapon) {
          return 0
        }
        let rage_bonus = 0
        let dueling_bonus = 0
        const melee_or_ranged_bonus = weapon.melee_or_ranged === 'Ranged' ? self.model.combat.damage.ranged : self.model.combat.damage.melee
        if (weapon.melee_or_ranged !== 'Ranged' && self.methods.isClass('Barbarian') && self.model.powers.Barbarian.rage_rounds > 0) {
          rage_bonus = self.methods.getMiscValueAutoTotal(self.model.powers.Barbarian.rage_damage)
        }
        if (self.methods.currentDueling()) {
          dueling_bonus = self.model.combat.damage.dueling.auto + self.model.combat.damage.dueling.value
        }
        if (attack.offhand) {
          ability_value = 0
        }
        damage_value = ability_value + self.model.combat.damage.all.auto + self.model.combat.damage.all.value + melee_or_ranged_bonus.value + melee_or_ranged_bonus.auto + rage_bonus + weapon.damage_bonus + attack.damage_bonus + dueling_bonus
      }

      if (attack.type === 'Spell Attack') {
        damage_value = attack.damage_bonus
      }

      return damage_value
    }

    self.methods.printDamageRoll = (attack) => {
      let damage_die = 'd6'
      if (attack.type === 'Physical') {
        let weapon = self.methods.getAttackWeapon(attack)
        if (!!weapon) {
          damage_die = weapon.damage_die
          if (self.locals.permission.writer) {
            attack.damage_die = weapon.damage_die
          }
        }
      }

      if (attack.type !== 'Physical') {
        damage_die = attack.damage_die
      }

      const mod = self.methods.getDamageModifier(attack)
      if (mod > 0) {
        damage_die = `${damage_die} + ${mod}`
      }

      return damage_die
    }

    self.methods.getSpecialLabelForStat = (weapon) => {
      return weapon.melee_or_ranged === 'Melee' ? 'Finesse?' : 'Thrown?'
    }

    self.methods.getAttackWeapon = attack => {
      return self.methods.listWeapons().find(x => x.id === attack.weapon)
    }

    self.methods.getAttackWeaponAsArray = (attack) => {
      if (attack.type !== 'Physical') {
        return []
      }
      const weapon = self.methods.getAttackWeapon(attack)
      return !!weapon && weapon.attack_bonus !== 0 ? [weapon] : []
    }

    self.methods.getAttackWeaponName = attack => {
      const weapon = self.methods.getAttackWeapon(attack)
      return weapon ? weapon.name : ''
    }

    self.methods.getAttackName = attack => {
      return attack.type === 'Physical' ? (attack.name || self.methods.getAttackWeaponName(attack)) : attack.name
    }

    self.methods.klassForAttack = (attack) => {
      return self.methods.getKlassById(attack.weapon) || self.methods.getFirstKlass()
    }

    self.methods.klassNameForAttack = (attack) => {
      return self.methods.klassForAttack(attack).name
    }

    self.methods.getSpellSaveDCForAttack = (attack) => {
      const klass = self.methods.klassForAttack(attack)
      return self.methods.getSpellSaveDC(klass.spell_ability)
    }

    self.methods.getSpellbookLevelClass = (index) => {
      return self.locals.data.spellbook && self.locals.data.spellbook[index] ? 'showing-spells' : 'hiding-spells'
    }

    self.methods.getSpellListLevelClass = (level) => {
      return {
        'bt-hide': !self.methods.canCastSpellLevel(level),
        'showing-spells': self.locals.ready && self.locals.data.spell_list[level],
        'hiding-spells': !self.locals.ready || !self.locals.data.spell_list[level],
      }
    }

    self.methods.toggleSpellbookLevel = (index) => {
      self.locals.data.spellbook[index] = !self.locals.data.spellbook[index]
    }

    self.methods.toggleSpellListLevel = (index) => {
      self.locals.data.spell_list[index] = !self.locals.data.spell_list[index]
    }

    self.methods.toggleSpellState = (spell, state) => {
      spell.$state = (spell.$state === state ? '' : state)
    }

    self.methods.getHitDie = (klass) => {
      return klass.hit_die
    }

    self.methods.getActiveNote = () => {
      if (self.locals.ready) {
        const note = self.methods.listNotes().find(x => x.id === self.model.prefs.active_note) || self.methods.listNotes()[0]
        return [note]
      }
    }

    self.methods.getTotalXP = () => {
      let xp = parseInt(self.model.basic.xp)

      if (isNaN(xp)) {
        xp = 0
      }

      if (self.locals.ready) {
        xp = self.methods.listExperiences().reduce((acc, e) => acc + e.amount, xp)
      }
      return xp
    }

    self.methods.syncXP = () => {
      let max_xp = self.locals.data.xp_by_level[self.methods.getTotalLevel()]
      let experiences_xp = 0

      if (self.locals.ready) {
        experiences_xp = self.methods.listExperiences().reduce((acc, e) => acc + e.amount, experiences_xp)
      }

      return Math.max(max_xp - experiences_xp, 0)
    }

    self.methods.firstKlassSpellAbility = () => {
      return self.methods.getFirstKlass().spell_ability || 'WIS'
    }

    self.methods.getSpellSaveDC = (abl = self.methods.firstKlassSpellAbility()) => {
      return 8 + self.methods.getProficiencyTotal() + self.methods.getAbilityMod(self.model.abilities[abl]) + (self.model.casting.dc || 0)
    }

    self.methods.getSpellAttackBonus = (abl) => {
      return self.methods.getProficiencyTotal() + self.methods.getAbilityMod(self.model.abilities[abl])
    }

    self.methods.builderCreateCharacter = () => {
      // ErrorService.trackEvent('D&D5E User', 'Builder', 'Launch Builder')

      // Remove multiclassing
      while (self.model.klasses.length > 1) {
        this.sheetSvc.remove(self.model.klasses, self.model.klasses.length - 1)
      }
      // Reset last remaining class
      let klass = self.methods.listKlasses()[0]
      const proto_klass = klass.getProto()
      klass.name = proto_klass.name
      klass.level = proto_klass.level

      // Reset race and subrace
      const proto_basic = self.model.basic.getProto()
      self.model.basic.race = proto_basic.race
      self.model.basic.subrace = proto_basic.subrace

      // Reset background
      const proto_background = self.model.basic.background.getProto()
      self.model.basic.background.name = proto_background.name

      // Reset builder
      self.methods.switchStep('create-character')

      // Reset saved builder steps
      Object.keys(self.model.builder.creation.getProto()).forEach(key => {
        self.model.builder.creation[key] = false
      })
    }

    self.methods.getRaceSummary = (race) => {
      if (self.locals.ready && self.locals.data.races[race] !== undefined) {
        // return $sce.trustAsHtml(self.locals.data.races[race].summary)
      }
    }

    self.methods.saveBuilderRace = (race) => {
      self.locals.data.builder.create_race.invalid = false

      if (!self.locals.data.builder.create_race.choices_made) {
        if (race.skill_choices !== undefined && race.skill_choices.some(choice => choice.name === '')) {
          self.locals.data.builder.create_race.invalid = true
          self.locals.data.builder.create_race.invalid_reason = "Please choose two different skills."
        }

        if (race.ability_choices !== undefined && race.ability_choices.some(choice => choice.name === '' || race.abilities[choice.name] !== undefined)) {
          self.locals.data.builder.create_race.invalid_reason = "Choose two abilities that do not already receive racial bonuses."
          self.locals.data.builder.create_race.invalid = true
        }

        if (!self.locals.data.builder.create_race.invalid) {
          race.skills = race.skills || []
          race.skill_choices = race.skill_choices || []
          race.ability_choices = race.ability_choices || []
          race.skill_choices.forEach(choice => race.skills.push(choice.name))
          race.ability_choices.forEach(choice => race.abilities[choice.name] = 1)
          self.locals.data.builder.create_race.choices_made = true
        }
      }

      if (!self.locals.data.builder.create_race.invalid) {
        self.methods.finishStep('creation', 'race', 'create-klass')
      }
    }

    self.methods.saveBuilderClass = () => {
      self.methods.clearEquipment()

      const equipment = self.methods.getFirstKlassData().equipment
      if (equipment && equipment.weapons) {
        equipment.weapons.forEach(weapon => self.methods.addWeapon(weapon))
      }

      if (equipment && equipment.armor) {
        equipment.armor.forEach(armor => self.methods.addArmor(armor))
      }

      self.methods.finishStep('creation', 'klass', 'create-abilities')
    }

    self.methods.getUnassignedAbilities = (type) => {
      const names = self.locals.data.builder.create_abilities.scores[type].map(x => x.name).filter(x => x !== 'Ability')
      return names.filter(x => !self.locals.selection.abilities.includes(x)).join(", ")
    }

    self.methods.getRemainingAbilityPoints = (scores) => {
      let remaining = 27
      let costs = {"8": 0, "9": 1, "10": 2, "11": 3, "12": 4, "13": 5, "14": 7, "15": 9}
      scores.forEach(score => {
        if (costs[score.num] !== undefined) {
          remaining = remaining - costs[score.num]
        } else {
          remaining = -1
        }
      })
      return remaining
    }

    self.methods.saveBuilderAbilityScores = (type) => {
      self.locals.data.builder.create_abilities.invalid = false

      let scores = self.locals.data.builder.create_abilities.scores[type]
      let dupes = {}

      scores.forEach(score => {
        if (dupes[score.name] === undefined && score.name !== "Ability") {
          dupes[score.name] = score.num
        } else {
          self.locals.data.builder.create_abilities.invalid = true
        }
      })

      if (type === "points" && self.methods.getRemainingAbilityPoints(scores) < 0) {
        self.locals.data.builder.create_abilities.invalid = true
      }

      if (!self.locals.data.builder.create_abilities.invalid) {
        Object.keys(dupes).forEach(d => {
          self.model.abilities[d].value = dupes[d]
        })
        self.methods.finishStep('creation', 'abilities', 'create-profile')
      }
    }

    self.methods.generateBuilderLists = () => {
      // ErrorService.trackEvent('D&D5E User', 'Builder', 'Generate Lists')

      // Gets builder data from the chosen background, race, and class (cleric knowledge domain) to generate lists
      self.methods.resetLists()
      const race_data = self.locals.data.races[self.model.basic.race]
      const background_data = getBackgroundData()
      const klass_data = self.methods.getFirstKlassData()

      if (race_data.lists !== undefined) {
        Object.keys(race_data.lists).forEach(name => {
          const list = self.methods.getListByName(name)
          race_data.lists[name].forEach(item => {
            self.methods.addListItem(list.items, item)
          })
        })
      }

      if (background_data.lists !== undefined) {
        background_data.lists.forEach(listData => {
          const list = self.methods.getListByName(listData.name)
          const items = listData.items || []
          items.forEach(item => {
            self.methods.addListItem(list.items, item)
          })
        })
      }

      if (klass_data.lists !== undefined) {
        Object.keys(klass_data.lists).forEach(name => {
          const list = self.methods.getListByName(name)
          klass_data.lists[name].forEach(item => {
            self.methods.addListItem(list.items, item)
          })
        })
      }

      if (self.methods.isClass('Cleric') && self.model.powers.Cleric.domain === 'Knowledge Domain') {
        let list = self.methods.getListByName('Languages')
        self.methods.addListItem(list.items, 'One of your choice')
        self.methods.addListItem(list.items, 'One of your choice')
      }

      self.locals.builder.list_generated = true
    }

    self.methods.applyFightingStyleBonuses = (style) => {
      let bonuses = {
        Archery: () => {
          self.model.combat.attack.ranged.value = self.model.combat.attack.ranged.value + 2
        },
        Defense: () => {
          self.model.combat.ac.misc = self.model.combat.ac.misc + 1
        },
        Dueling: () => {
          self.model.combat.damage.dueling.value = self.model.combat.damage.dueling.value + 2
        },
      }
      if (bonuses[style]) {
        bonuses[style]()
      }
    }

    self.methods.builderFinishCharacter = () => {
      let klass = self.methods.listKlasses()[0]
      // ErrorService.trackEvent('D&D5E User', 'Builder', 'Finish Character')

      self.methods.finishStep('creation', 'lists', 'create-finished')
      let race_data = self.locals.data.races[self.model.basic.race]
      let subrace_data = self.locals.data.races[self.model.basic.subrace]
      let background_data = getBackgroundData()
      let klass_data = self.methods.getFirstKlassData()

      // add racial bonuses to stats
      Object.keys(race_data.abilities).forEach(a => {
        self.model.abilities[a].value += race_data.abilities[a]
      })

      if (subrace_data !== undefined) {
        Object.keys(subrace_data.abilities).forEach(a => {
          self.model.abilities[a].value += subrace_data.abilities[a]
        })
      }

      // Set treasure based on background
      self.model.treasure.gold = background_data.gold

      if (klass_data.consumables !== undefined) {
        klass_data.consumables.forEach(consumable => {
          self.methods.addConsumable(consumable)
        })
      }

      // Handle fighting styles
      if (self.model.powers[klass.name]) {
        let styles = self.model.powers[klass.name].style
        if (!!styles && styles.length > 0) {
          self.methods.applyFightingStyleBonuses(styles[0].value)
        }
      }

      // need something to do hill dwarves hp bonus SIGH
      self.model.combat.hp.value = parseInt(self.methods.getHitDie(klass).replace('d',''))

      // some class bonuses too?
      // spells stuff from race
      self.model.prefs.show_announcement = false
    }

    self.methods.getTrackClass = (name) => {
      let klasses = []

      if (self.model.builder.creation[name.replace('create-', '')]) {
        klasses.push('track-done')
      }
      if (name === self.locals.steps.active_step) {
        klasses.push('track-current')
      }
      return klasses.join(" ")
    }

    self.methods.setBuilderTrack = () => {
      Object.keys(self.model.builder.creation.getProto()).forEach(key => {
        self.locals.builder.track.push(`create-${key}`)
      })
    }

    self.methods.shouldShowTrack = () => {
      return self.locals.builder.track.includes(self.model.builder.step)
    }

    self.methods.isTrackNodeShowing = (index) => {
      let current_index = self.locals.builder.track.indexOf(self.model.builder.step)
      if (current_index === -1) {
        current_index = -100
      }
      return index === current_index || index === current_index + 1 || index === current_index - 1
    }

    self.methods.showingTrackNodes = () => {
      return self.locals.builder.track.filter((x, i) => self.methods.isTrackNodeShowing(i))
    }

    self.methods.getRaceTraits = (race) => {
      let list = race.traits

      if (race.lists && race.lists['Racial Traits']) {
        list = list.concat(race.lists['Racial Traits'])
      }

      return list
    }

    self.methods.hasRacialBonusFor = (ability) => {
      return self.methods.getRacialBonusFor(ability) > 0
    }

    self.methods.getRacialBonusFor = (ability) => {
      let race_data = self.locals.data.races[self.model.basic.race]
      let subrace_data = self.locals.data.races[self.model.basic.subrace]
      let racial_bonus = 0

      if (!!race_data) {
        racial_bonus = race_data.abilities[ability] || 0
      }

      if (!!subrace_data) {
        racial_bonus = racial_bonus + (subrace_data.abilities[ability] || 0)
      }

      return racial_bonus
    }

    /*****
    Level Up Stuff
    ****/

    self.methods.launchLevelUp = () => {
      self.methods.switchStep("levelup-intro")
    }

    self.methods.startLevelingUp = (klass) => {
      klass.level = Math.min(klass.level + 1, 20)
      self.methods.switchStep("levelup-common")
      self.locals.data.last_dice_rolled = ""
    }

    self.methods.getHPFromHitDie = (hit_die) => {
      let die = parseInt(hit_die.replace('d', ''))
      return (die / 2) + 1
    }

    self.methods.builderAddHP = (num) => {
      if (typeof num !== 'number') {
        num = parseInt(num.replace('d', ''))
        num = this.sheetSvc.randomNumber(1, num)
      }
      self.locals.data.last_dice_rolled = num
      self.model.combat.hp.value = self.model.combat.hp.value + num
    }

    self.methods.builderAbilityIncrease = (abl) => {
      abl.num = abl.num + 1
      if (abl.num === 3) {
        abl.num = 0
      }
    }

    self.methods.builderAbilityClasses = (abl) => {
      let klass = ""
      if (abl.num === 0) {
        klass = "button-gray"
      }
      if (abl.num === 1) {
        klass = "button-secondary"
      }
      if (abl.num === 2) {
        klass = "button-green"
      }
      return klass
    }

    self.methods.builderAbilityValid = () => {
      let total = 0
      if (self.locals.ready) {
        total = self.locals.data.builder.lu_abilities.reduce((acc, item) => item.num + acc, total)
      }
      return total < 3
    }

    self.methods.builderAbilityChanges = () => {
      if (self.locals.ready) {
        const result = self.locals.data.builder.lu_abilities.filter(x => x.num > 0).map((abl) => `${abl.name}: +${abl.num}`)
        return result.join(', ')
      }
    }

    self.methods.applyBuilderAbilityChanges = () => {
      self.locals.data.builder.lu_abilities.forEach(abl => {
        self.model.abilities[abl.name].value = self.model.abilities[abl.name].value + abl.num
        abl.num = 0
      })
    }

    self.methods.builderLuSaveCommon = (klass) => {
      if (self.methods.builderAbilityValid()) {
        self.methods.applyBuilderAbilityChanges()
        self.locals.feedback.builder_abilities_error = false

        let next_step = self.methods.showKlassGuide(klass) ? 'levelup-classes' : 'levelup-finish'
        self.methods.switchStep(next_step)
      } else {
        self.locals.feedback.builder_abilities_error = true
      }
    }

    self.methods.builderLuSaveKlass = (klass) => {
      let custom = {
        Barbarian_3: () => {
          let abilities = self.methods.getKlassAbilities(klass, self.model.powers.Barbarian.path)
          if (self.model.powers.Barbarian.path === 'Path of the Totem Warrior') {
            if (this.sheetSvc.isEmpty(self.locals.feedback.totem_spirit)) {
              self.locals.feedback.totem_error = true
              return
            } else {
              self.methods.addTotemBeast(self.locals.data.klass_abilities[klass.name][klass.level][self.locals.feedback.totem_spirit])
            }
          }
          self.methods.addToAndCreateList('Class Traits', abilities)
          self.methods.switchStep('levelup-finish')
        }
      }

      let key = klass.name + "_" + klass.level
      if (custom[key] !== undefined) {
        custom[key]()
      }
    }

    self.methods.showKlassGuide = (klass) => {
      if (self.locals.ready) {
        let data = self.methods.getLevelUpDataForKlass(klass.name)
        return data.levels[klass.level - 1].guide
      }
    }

    self.methods.getKlassAbilities = (klass, key) => {
      if (self.locals.ready) {
        if (key !== undefined) {
          return self.locals.data.klass_abilities[klass.name][klass.level]
        }
        else {
          return self.locals.data.klass_abilities[klass.name][klass.level][key]
        }
      }
    }

    /*
    level increase
    HP up
    ability score on level%4
    */

    self.methods.onSortableDrop = (e) => {
      moveItemInArray(e.container.data, e.previousIndex, e.currentIndex)
      self.touch()
    }

    /******************************************************
     * Helper functions (like booleans and commonly used stuff)
     ******************************************************/

    self.methods.rerunMigration = (version) => {
      version = version || self.model.version
      self.model.version = version - 1
      window.location.reload()
    }

    self.methods.getPlayerName = () => {
      if (self.locals.ready) {
        return self.locals.data.print.player_name || this.store.user.name
      }
    }

    self.methods.printRemainingNodeClasses = () => {
      if (self.locals.ready) {
        return self.locals.data.print.hide_remaining ? 'hide-remaining' : ''
      }
    }

    self.methods.getDisplayForValue = (mod) => {
      if (mod > 0) {
        mod = '+' + mod
      }
      return mod
    }

    self.methods.twoDigitNumberStrings = (num) => {
      if (num < 10) {
        return "0" + num
      } else {
        return num + ""
      }
    }

    self.methods.halfRoundedDown = (num) => {
      return Math.floor(num/2)
    }

    self.methods.halfRoundedUp = (num) => {
      return Math.ceil(num/2)
    }

    self.methods.setSkillAbility = async (skill) => {
      await Promise.resolve()
      self.touch()
      skill.ability = self.locals.selection.skills[skill.name]
    }

    self.methods.isClassLevelable = (klass_name) => {
      return self.locals.selection.levelup_klasses.includes(klass_name)
    }

    self.methods.isClassListed = (klass_name) => {
      return self.locals.selection.klass.includes(klass_name)
    }

    self.methods.shouldShowSRDSpell = (spell: Dnd5eSpell) => {
      let classes_match = false
      let schools_match = false
      let attributes_match = true

      Object.keys(self.locals.data.filtering.by_class).forEach(name => {
        if (self.locals.data.filtering.by_class[name] && self.methods.isSpellForClass(spell, name)) {
          classes_match = true
        }
      })

      Object.keys(self.locals.data.filtering.by_school).filter(x => x === spell.school).forEach(name => {
        schools_match = self.locals.data.filtering.by_school[name]
      })

      if (
        (self.locals.data.filtering.by_attribute.only_ritual && !spell.ritual) ||
        (self.locals.data.filtering.by_attribute.no_ritual && spell.ritual) ||
        (self.locals.data.filtering.by_attribute.only_concentration && !spell.concentration) ||
        (self.locals.data.filtering.by_attribute.no_concentration && spell.concentration)
      ) { attributes_match = false }

      return schools_match && classes_match && attributes_match
    }

    self.methods.shouldShowBuilderSpell = (spell) => {
      let klass_name = self.methods.listKlasses()[0].name
      if (klass_name === "Fighter" || klass_name === "Rogue") {
        klass_name = "Wizard"
      }
      return self.methods.isSpellForClass(spell, klass_name)
    }

    self.methods.isSpellForClass = (spell, klass_name) => {
      return spell.classes && spell.classes.includes(klass_name)
    }

    self.methods.toggleSpellClass = (spell, klass_name) => {
      if (self.methods.isSpellForClass(spell, klass_name)) {
        const index = spell.classes.indexOf(klass_name)
        spell.classes.splice(index, 1)
      } else {
        spell.classes = spell.classes || []
        spell.classes.push(klass_name)
      }
    }

    self.methods.anyBattlemapsPresent = () => {
      return Object.keys(this.store.tools).some(key => this.store.tools[key].meta.toolType === 'battlemap' && this.store.tools[key].meta.watching)
    }

    self.methods.isSkillAvailableForBuilder = (name) => {
      let available = false
      let klass_data = self.methods.getFirstKlassData()

      if (klass_data) {
        let class_skills = klass_data.available_skills || []
        let auto_skills = self.methods.getAutomaticSkills() || []

        if (class_skills.includes(name) && !auto_skills.includes(name)) {
          available = true
        }
      }

      return available
    }

    self.methods.healHP = (num) => {
      self.model.combat.hp.damage = self.model.combat.hp.damage - num
      if (self.model.combat.hp.damage < 0) {
        self.model.combat.hp.damage = 0
      }
    }

    self.methods.multipleSpellcasters = () => {
      let casters = 0
      self.methods.listKlasses().forEach((klass) => {
        if (self.methods.isSpellCaster(klass)) {
          casters += 1
        }
      })
      return casters > 1
    }

    self.methods.characterHasSpellSlots = () => {
      return self.locals.ready && Array.isArray(self.locals.character_spell_slots)
    }

    /******************************************************
     * D&D Class functions
     ******************************************************/

    self.methods.onRage = () => {
      self.touch()
      self.model.powers.Barbarian.rages.remaining = self.model.powers.Barbarian.rages.remaining - 1
      self.model.powers.Barbarian.rage_rounds = 10
    }

    self.methods.onSecondWind = () => {
      self.touch()
      let roll = self.methods.rollOneDice('d10', 0, 'Second Wind')
      let heal = roll[0].result + self.methods.getCurrentLevelForKlass('Fighter')
      self.model.powers.Fighter.second_wind.remaining = 0

      self.methods.healHP(heal)

      self.locals.data.second_wind_last_heal = "Rolled a " + roll[0].result + " and healed for " + heal + " HP."
    }

    self.methods.onWholenessOfBody = () => {
      self.touch()
      self.model.powers.Monk.wholeness = 0
      let heal = 3 * self.methods.getCurrentLevelForKlass('Monk')
      self.methods.healHP(heal)
    }

    self.methods.onWildSurge = () => {
      self.touch()
      let random = this.sheetSvc.randomNumber(1, 100)
      let is_even = random % 2 === 0
      let roll = ''

      if (is_even) {
        roll = self.methods.twoDigitNumberStrings(random - 1) + '-' + self.methods.twoDigitNumberStrings(random)
      } else {
        roll = self.methods.twoDigitNumberStrings(random) + '-' + self.methods.twoDigitNumberStrings(random + 1)
      }

      let surge = self.locals.data.wild_surge.find(x => x.roll === roll)
      if (surge) {
        self.locals.data.last_magic_surge = self.methods.twoDigitNumberStrings(random) + ': ' + surge.effect
      }
    }

    self.methods.onClericDomainChange = (domain) => {
      self.touch()
      self.model.powers.Cleric.domain = domain
      self.methods.resetExpertise()
    }

    self.methods.getOrCreateFavoredEnemy = () => {
      if (self.locals.ready) {
        if (self.model.powers.Ranger.favored_enemies.length === 0) {
          self.methods.addFavoredEnemy()
        }
        return self.methods.getFavoredEnemy(0)
      }
    }

    self.methods.getOrCreateFavoredTerrain = () => {
      if (self.locals.ready) {
        if (self.model.powers.Ranger.favored_terrains.length === 0) {
          self.methods.addFavoredTerrain()
        }
        return self.methods.getFavoredTerrain(0)
      }
    }

    self.methods.getManeuverSave = () => {
      let str_mod = self.methods.getAbilityMod(self.model.abilities.STR)
      let dex_mod = self.methods.getAbilityMod(self.model.abilities.DEX)
      return 8 + self.methods.getProficiencyTotal() + Math.max(str_mod, dex_mod)
    }

    self.methods.resetSpellSlots = (level) => {
      if (typeof level === 'number') {
        let slot = self.methods.getSpellSlot(level)
        slot.remaining = self.methods.getMiscValueAutoTotal(slot)
      } else {
        self.methods.listSpellSlots().forEach(slot => {
          slot.remaining = self.methods.getMiscValueAutoTotal(slot)
        })
      }
    }

    self.methods.onShortRest = () => {
      self.touch()
      self.locals.data.second_wind_last_heal = ""
      if (self.methods.getCurrentLevelForKlass('Bard') >= 5) {
        self.model.powers.Bard.inspiration.remaining = self.methods.getAbilityMod(self.model.abilities.CHA)
      }

      self.model.powers.Cleric.divinity.remaining = self.methods.getMiscValueAutoTotal(self.model.powers.Cleric.divinity)

      self.model.powers.Druid.wild_shape.remaining = self.methods.getMiscValueAutoTotal(self.model.powers.Druid.wild_shape)

      self.model.powers.Fighter.superiority_dice.remaining = self.methods.getMiscValueAutoTotal(self.model.powers.Fighter.superiority_dice)
      self.model.powers.Fighter.second_wind.remaining = 1
      self.model.powers.Fighter.surge.remaining = self.methods.getCurrentLevelForKlass('Fighter') >= 17 ? 2 : 1

      self.model.powers.Monk.ki_points.remaining = self.methods.getMiscValueAutoTotal(self.model.powers.Monk.ki_points)

      self.model.powers.Paladin.divinity.remaining = self.methods.getMiscValueAutoTotal(self.model.powers.Paladin.divinity)

      self.model.powers.Rogue.stroke_of_luck.remaining = 1

      self.model.powers.Warlock.patron_feature_1.remaining = 1
      if (self.model.powers.Warlock.patron === "Archfey") {
        self.model.powers.Warlock.patron_feature_2.remaining = 1
      }
      self.model.powers.Warlock.patron_feature_3.remaining = 1

      if (self.model.powers.Wizard.tradition !== "Conjuration") {
        self.model.powers.Wizard.tradition_feature.remaining = 1
      }

      if (self.methods.isClass("Warlock")) {
        self.methods.resetSpellSlots(0)
      }

      /*
       * Custom Powers
       */

      let resetable = self.methods.listCustomPowerSpendables().filter(x => x.reset === "short")
      resetable.forEach(spendable => spendable.remaining = spendable.value)
    }

    self.methods.onLongRest = () => {
      self.methods.onShortRest()
      self.locals.data.hit_dice_last_heal = ""
      self.model.combat.hp.damage = 0
      // Should also heal animal companions?????
      self.methods.listKlasses().forEach((klass: Dnd5eKlass) => {
        const total = self.methods.getMiscValueAutoTotal(klass.hit_dice)
        klass.hit_dice.remaining = Math.min(klass.hit_dice.remaining + self.methods.halfRoundedUp(total), total)
      })

      self.methods.resetSpellSlots()

      /*
       * Class Specifics
       */

      self.model.powers.Barbarian.rages.remaining = self.methods.getMiscValueAutoTotal(self.model.powers.Barbarian.rages)
      self.model.powers.Barbarian.rage_rounds = 0

      self.model.powers.Bard.inspiration.remaining = self.methods.getAbilityMod(self.model.abilities.CHA)

      self.model.powers.Cleric.wisdom_points.remaining = self.methods.getAbilityMod(self.model.abilities.WIS) + self.model.powers.Cleric.wisdom_points.misc

      self.model.powers.Monk.wholeness = 1

      self.model.powers.Paladin.divine_sense.remaining = self.methods.getMiscValueAutoTotal(self.model.powers.Paladin.divine_sense)
      self.model.powers.Paladin.lay_on_hands.remaining = self.methods.getMiscValueAutoTotal(self.model.powers.Paladin.lay_on_hands)
      self.model.powers.Paladin.cleansing_touch.remaining = self.methods.getMiscValueAutoTotal(self.model.powers.Paladin.cleansing_touch)
      self.model.powers.Paladin.oath_super.remaining = 1
      self.model.powers.Paladin.undying_sentinel.remaining = 1

      self.model.powers.Rogue.spell_thief.remaining = 1

      self.model.powers.Sorcerer.sorcery_points.remaining = self.model.powers.Sorcerer.sorcery_points.value
      self.model.powers.Sorcerer.tides_of_chaos.remaining = 1

      self.model.powers.Warlock.eldritch_master.remaining = 1
      self.model.powers.Warlock.patron_feature_2.remaining = 1

      self.model.powers.Wizard.tradition_feature.remaining = 1

      /*
       * Custom Powers
       */

      let resetable = self.methods.listCustomPowerSpendables().filter(x => x.reset === 'long' || x.reset === 'short')
      resetable.forEach(spendable => spendable.remaining = spendable.value)
    }

    self.methods.setClassPowers = (name: string, level: number, klassId: string): void => {
      const levelData = self.locals.data.level_data[klassId] || {}
      let class_power_functions = {
        Barbarian: () => {
          self.model.powers.Barbarian.rages.value = levelData.rages
          self.model.powers.Barbarian.rages.remaining = self.methods.getMiscValueAutoTotal(self.model.powers.Barbarian.rages)
          self.model.powers.Barbarian.rage_damage.value = levelData.rage_damage
        }
        , Bard: () => {
          self.model.powers.Bard.inspiration.remaining = self.methods.getAbilityMod(self.model.abilities.CHA)
          self.model.powers.Bard.inspiration_die = levelData.inspiration
          self.model.powers.Bard.song_of_rest = levelData.song_of_rest
        }
        , Cleric: () => {
          /* For some of these things, it's easier to calculate the value in this function
           * Rather than putting it in the json data
           */
          let divinity = 1
          if (level >= 6) {
            divinity = 2
          }
          if (level >= 18) {
            divinity = 3
          }
          let divine_strike = "0"
          if (level >= 8) {
            divine_strike = "1d8"
          }
          if (level >= 14) {
            divine_strike = "2d8"
          }
          self.model.powers.Cleric.divinity.value = divinity
          self.model.powers.Cleric.divinity.remaining = divinity
          self.model.powers.Cleric.divine_strike = divine_strike

          self.model.powers.Cleric.wisdom_points.remaining = self.methods.getAbilityMod(self.model.abilities.WIS) + self.model.powers.Cleric.wisdom_points.misc
        }
        , Fighter: () => {
          let dice = 4
          if (level >= 7) {
            dice = 5
          }
          if (level >= 15) {
            dice = 6
          }
          self.model.powers.Fighter.superiority_dice.value = dice
          self.model.powers.Fighter.superiority_dice.remaining = dice
          let die = "d8"
          if (level >= 10) {
            die = "d10"
          }
          if (level >= 18) {
            die = "d12"
          }
          self.model.powers.Fighter.superiority_die = die
        }
        , Monk: () => {
          self.model.powers.Monk.ki_points.value = levelData.ki_points
          self.model.powers.Monk.ki_points.remaining = levelData.ki_points
          self.model.powers.Monk.unarmored_movement = levelData.unarmored_movement
          self.model.powers.Monk.martial_arts = levelData.martial_arts
        }
        , Paladin: () => {
          self.model.powers.Paladin.divinity.value = 1
          self.model.powers.Paladin.divinity.remaining = 1

          self.model.powers.Paladin.lay_on_hands.value = level * 5
          self.model.powers.Paladin.lay_on_hands.remaining = self.model.powers.Paladin.lay_on_hands.value

          self.model.powers.Paladin.cleansing_touch.value = Math.max(self.methods.getAbilityMod(self.model.abilities.CHA), 1)
          self.model.powers.Paladin.cleansing_touch.remaining = self.model.powers.Paladin.cleansing_touch.value

          self.model.powers.Paladin.divine_sense.value = self.methods.getAbilityMod(self.model.abilities.CHA) + 1
          self.model.powers.Paladin.divine_sense.remaining = self.model.powers.Paladin.divine_sense.value

          self.model.powers.Paladin.oath_super.remaining = 1
          self.model.powers.Paladin.undying_sentinel.remaining = 1
        }
        , Rogue: () => {
          self.model.powers.Rogue.sneak_attack = levelData.sneak_attack
          self.model.powers.Rogue.stroke_of_luck.remaining = 1
          self.model.powers.Rogue.spell_thief.remaining = 1
        }
        , Sorcerer: () => {
          self.model.powers.Sorcerer.sorcery_points.value = levelData.points
          self.model.powers.Sorcerer.sorcery_points.remaining = self.model.powers.Sorcerer.sorcery_points.value
          self.model.powers.Sorcerer.tides_of_chaos.remaining = 1
        }
        , Warlock: () => {
          self.model.powers.Warlock.eldritch_master.remaining = 1
          self.model.powers.Warlock.patron_feature_1.remaining = 1
          self.model.powers.Warlock.patron_feature_2.remaining = 1
          self.model.powers.Warlock.patron_feature_3.remaining = 1
        }
        , Wizard: () => {
          self.model.powers.Wizard.tradition_feature.remaining = 1
        }
      }

      if (class_power_functions[name]) {
        class_power_functions[name]()
      }
    }

    self.methods.setClericExpertise = async (skill: any) => {
      await Promise.resolve()
      self.touch()
      if (skill.expert) {
        skill.proficient = true
      }
    }

    self.methods.resetExpertise = () => {
      self.methods.listSkills().forEach(skill => skill.expert = false)
    }

    self.methods.anyActiveConditions = () => {
      return self.methods.listConditions().some(x => x.active)
    }

    self.methods.addCharacterAsToken = () => {
      this.store.addCharacterAsToken(self, 'dnd5e')
    }

    /******************************************************
     * Dice functions
     ******************************************************/

    self.methods.showRollResult = (packs: DicePackage[]) => {
      const result = this.diceSvc.printRollResult(packs, self.model.name)
      self.locals.data.last_dice_rolled = result
    }

    self.methods.rollOneDice = (sides, modifier, name, phrasing) => {
      self.touch()
      const pack = this.diceSvc.getDicePackage(sides, modifier, name, phrasing)
      self.methods.showRollResult([pack])
      this.store.addRollsToChat([pack], name)
      return [pack]
    }

    self.methods.rollIdenticalDice = (sides, modifier, amount, name, phrasing) => {
      self.touch()
      const packs = this.sheetSvc.sizedArray(amount).map(() => this.diceSvc.getDicePackage(sides, modifier, name, phrasing))
      self.methods.showRollResult(packs)
      this.store.addRollsToChat(packs, name)
      return packs
    }

    self.methods.rollSave = (abl) => {
      self.methods.rollOneDice(20, self.methods.getSaveTotal(self.model.abilities[abl]), abl, 'a # save')
    }

    self.methods.rollHitDice = (klass, modifier, amount = 1): void => {
      if (amount > klass.hit_dice.remaining) {
        self.locals.data.hit_dice_last_heal = `You don't have ${amount} hit dice available. You only have ${klass.hit_dice.remaining} remaining.`
        return
      }
      self.touch()

      const sides = self.methods.getHitDie(klass)
      const rolls = self.methods.rollIdenticalDice(sides, modifier, amount)
      const result = rolls.reduce((acc, roll) => acc + roll.result, 0)

      self.locals.data.hit_dice_last_heal = `Rolled ${amount} ${sides} and healed for ${result} HP.`
      klass.hit_dice.remaining = klass.hit_dice.remaining - amount
      self.methods.healHP(result)
    }

    self.methods.rollAttackDice = (attack) => {
      self.methods.rollOneDice('d20', self.methods.getAttackModifier(attack), attack.name, 'an attack with #')
    }

    self.methods.rollDamageDice = (attack) => {
      self.methods.rollCustomDice({
        text: `${attack.damage_die} + ${self.methods.getDamageModifier(attack)}`,
        name: attack.name,
      }, 0, 'damage for #')
    }

    self.methods.rollInitiative = () => {
      const results = self.methods.rollOneDice('d20', self.methods.getTotalInit(), 'initiative')
      self.model.combat.init.value = results[0].result
      this.store.sendInitiativeToMap(results[0].result, self.model.id)
    }

    // Only works with addition, not multiplication
    self.methods.rollCustomDice = (custom_dice, mod = 0, phrasing = '') => {
      self.touch()
      const result = this.diceSvc.rollCustomDice(custom_dice, mod, phrasing)
      self.locals.data.last_dice_rolled = self.model.name + result.text
      this.store.addCustomRollToChat(result.text)
      return result
    }

    self.methods.rollAbilityScore = () => {
      let roll_object = self.methods.rollCustomDice({name: 'Ability Score', text: '4d6'})
      let lowest_roll = Math.min.apply(Math, roll_object.rolls[0].record.list)
      return roll_object.result - lowest_roll
    }

    const getNextLifeSave = () => {
      return self.model.combat.hp.life_saves.find(x => x.value === false)
    }

    const getNextDeathSave = () => {
      const saves = self.model.combat.hp.death_saves.filter(x => x.value === false)
      if (saves.length > 0) {
        return saves[saves.length - 1]
      }
    }

    self.methods.unconscious = () => self.methods.getHPRemaining() <= 0

    self.methods.resetDeathSaves = () => {
      [...self.model.combat.hp.death_saves, ...self.model.combat.hp.life_saves].forEach(x => x.value = false)
    }

    self.methods.rollDeathSave = (): void => {
      const results = self.methods.rollOneDice('d20', 0, 'a death save')
      const save = (results[0].result >= 10 ? getNextLifeSave() : getNextDeathSave()) || {}
      save.value = true

      // push note to campaign about character dying or stable
      const dead = self.model.combat.hp.death_saves.reduce((acc, item) => acc && item.value, true)
      const stable = self.model.combat.hp.life_saves.reduce((acc, item) => acc && item.value, true)

      if (dead) {
        console.log('You dead')
      }

      if (stable) {
        console.log('You stable')
      }
    }

    self.methods.displaySpellDescription = spell => {
      return spell.text
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

    const isNumber = num => typeof num === 'number' && !isNaN(num)

    self.methods.validateAndReturnStat = (stat) => {
      const arr = stat.split(/\.|\[|\]/gi)
      let valid = true
      let schema = self.model
      let id = ''

      arr.forEach(node => {
        /*
         * If nodename is a number, it's in an array
         * If schema at node is number or null, it's the id we want
         */

        if (!isNaN(parseInt(node))) {
          node = parseInt(node)
          schema = schema
        }

        if (isNumber(schema[node]) || schema[node] === null) {
          id = node
        } else if (schema[node] !== undefined && id === '') {
          schema = schema[node]
        } else {
          valid = false
        }
      })

      return valid ? {obj: schema, key: id} : undefined
    }

    self.methods.onFormulaChange = async (effect) => {
      await Promise.resolve()
      self.touch()
      let formula = self.methods.validateAndReturnFormula(effect.formula)
      effect.valid = formula !== undefined
    }

    self.methods.validateAndReturnFormula = (formula) => {
      let valid = formula !== null && formula !== '' && formula.match(/n|l/gi) !== null

      if (valid) {
        formula = formula.replace(/n|l/gi, '0')
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

      return valid ? formula : undefined
    }

    self.methods.isModiferEffect = (name) => {
      let result = false
      if (self.locals.ready) {
        let stat = self.locals.data.conditions.find(x => x.name === name)
        result = stat.modifier !== undefined
      }
      return result
    }

    self.methods.getActiveEffectsForStat = (condition, name) => {
      condition.effects.filter(x => x.name === name).forEach(effect => self.methods.activateEffect(effect))
    }

    self.methods.isConditionValid = (condition) => {
      return condition.effects.every((effect: BtConditionEffect) => effect.valid)
    }

    self.methods.setEffectFormula = (source, target, formula, effect) => {
      if (source !== undefined && target !== undefined && formula !== undefined) {
        effect.valid = true

        // If the target already has a value, that means a previous effect is active on this
        // stat, which means we need to pull the "source" from the target and calc on that
        if (target.obj[target.key] !== null) {
          source = target
        }

        formula = effect.formula.replace('n', source.obj[source.key]).replace('l', self.methods.getTotalLevel())

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

      // if there are other active conditions whose effects have our target name as their target name
      // we need to activate those effects
      let active_conditions = self.methods.listConditions().filter(x => x.active)

      active_conditions.forEach(condition => {
        self.methods.getActiveEffectsForStat(condition, effect.name)
      })
    }

    // Returns boolean effect.valid
    self.methods.activateEffect = (effect) => {
      let source, target, formula
      let condition_data = self.locals.data.conditions.find(x => x.name === effect.name)

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
      let condition_data = self.locals.data.conditions.find(x => x.name === effect.name)

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
        self.methods.listConditionEffects(condition).forEach((effect) => {
          valid = self.methods.activateEffect(effect)
        })
      }

      if (valid && !condition.active || !valid) {
        condition.active = false
        self.methods.listConditionEffects(condition).forEach((effect) => {
          self.methods.deactivateEffect(effect)
        })
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

      self.locals.data.conditions.filter(x => x.wildcard === undefined).forEach(condition => {
        const stat = self.methods.validateAndReturnStat(condition.target)
        stat.obj[stat.key] = 0
      })
    }

    /******************************************************
     * Watcher functions
     ******************************************************/

    self.methods.onClassChange = async (should_skip_reset) => {
      await Promise.resolve()
      if (!self.locals.ready) {
        return false
      }

      self.touch()

      // Reset filtering by class
      for (let k in self.locals.data.filtering.by_class) {
        self.locals.data.filtering.by_class[k] = false
      }

      // Show spells from all classes who are listed
      self.methods.listKlasses().forEach(klass => {
        if (self.locals.data.filtering.by_class[klass.name] !== undefined) {
          self.locals.data.filtering.by_class[klass.name] = true
        }
      })

      // If no classes get spells, just show them all
      if (Object.keys(self.locals.data.filtering.by_class).every(k => !self.locals.data.filtering.by_class[k])) {
        Object.keys(self.locals.data.filtering.by_class).forEach(key => self.locals.data.filtering.by_class[key] = true)
      }

      /******************************************************************************************
       * This block is the reset block, it resets stuff that needs to be reset when you switch classes
       * But because this method fires in a few places when you don't actually change classes
       * (like on page load), we have to have a flag for skipping the reset
       ******************************************************************************************/

      if (!should_skip_reset) {
        // All this is to reset and then reload save proficiencies
        self.locals.selection.abilities.forEach(abl => {
          self.model.abilities[abl].save_prof = false
        })

        self.methods.listKlasses().forEach((klass) => {
          let name = klass.name
          let klass_data = self.methods.getLevelUpDataForKlass(name)

          if (klass_data !== undefined) {
            klass.hit_die = klass_data.hit_die
            klass.spell_ability = klass_data.spell_ability
            klass_data.saves.forEach(save => {
              self.model.abilities[save].save_prof = true
            })
          }
        })

        // Bard Expertise
        self.methods.resetExpertise()
      }

      self.methods.onLevelChange(should_skip_reset)
    }

    /*
     * I don't know if this is handling spells known and cantrips OR if it's going
     * to be automatically handle fighter and rogue spells. INVESTIGATE AND GET BACK TO ME
     */
    self.methods.onLevelChange = async (should_skip_reset) => {
      await Promise.resolve()

      if (!self.locals.ready) {
        return false
      }

      self.touch()

      // self.methods.listKlasses().forEach((klass) => {
      //   let levelData = self.locals.data.klass[klass.name].levels[klass.level - 1]
      // })
      // let highest_klass = self.methods.getHighestKlass()
      let total_level_index = self.methods.getTotalLevel() - 1

      self.model.basic.proficiency.value = self.locals.data.proficiency[total_level_index]

      self.methods.listKlasses().forEach((klass) => {
        self.locals.data.level_data[klass.id] = self.methods.getKlassLevelData(klass)
      })

      // here's some rules
      // if you're multiclassing, you get sorcerer's spell slots at your total level with respect to modifiers
      // if you're homebrewed, you don't increment spell slots

      self.methods.setSpellSlots(should_skip_reset)

      if (!should_skip_reset) {
        self.methods.listKlasses().forEach((klass: Dnd5eKlass) => {
          const data = self.locals.data.level_data[klass.id]
          self.methods.setClassPowers(klass.name, klass.level, klass.id)
          klass.hit_dice.value = klass.level
          klass.hit_dice.remaining = klass.level

          if (data) {
            klass.spells_known = data.spells_known === undefined ? null : data.spells_known
            klass.cantrips = data.cantrips === undefined ? null : data.cantrips
            klass.slot_level = data.slot_level === undefined ? null : data.slot_level
          }
        })

        self.model.basic.xp = self.methods.syncXP()
      }
    }

    self.methods.onBackgroundChange = async (should_reset_skills) => {
      await Promise.resolve()
      self.touch()
      if (self.methods.isBackgroundListed()) {
        // let background = getBackgroundData()
        // let bg_skills = background.skills || []
        if (should_reset_skills) {
          self.methods.grantAutomaticSkills()
        }
      }
    }

    self.methods.onRaceChange = async (reset_requested) => {
      await Promise.resolve()
      self.touch()
      const race_data = self.locals.data.races[self.model.basic.race]
      if (reset_requested) {
        self.model.basic.subrace = "None"
        self.locals.data.builder.create_race.choices_made = false

        if (race_data !== undefined) {
          self.model.basic.size = race_data.size
          self.model.combat.speed.base = race_data.speed.base
          self.model.combat.speed.armor = race_data.speed.armor
          // we need a method for determining skills to be called here
          self.methods.grantAutomaticSkills()
        }
      }
    }

    self.methods.onSubraceChange = () => {
      self.touch()
    }

    self.methods.resetSkills = (skillsArray) => {
      skillsArray.forEach(skill => skill.proficient = false)
    }

    self.methods.grantAutomaticSkills = () => {
      const skillsArray = self.methods.listSkills()
      const race_data = self.locals.data.races[self.model.basic.race]
      const bg_data = getBackgroundData()

      self.methods.resetSkills(skillsArray)

      if (bg_data !== undefined) {
        bg_data.skills.forEach(name => {
          const skill = skillsArray.find(x => x.name === name)
          if (skill) {
            skill.proficient = true
          }
        })
      }

      if (race_data.skills !== undefined) {
        race_data.skills.forEach(name => {
          const skill = skillsArray.find(x => x.name === name)
          if (skill) {
            skill.proficient = true
          }
        })
      }
    }

    self.methods.getAutomaticSkills = () => {
      if (self.locals.ready) {
        const skillsArray = self.methods.listSkills()
        const race_data = self.locals.data.races[self.model.basic.race]
        const bg_data = getBackgroundData()
        const auto_bg_skills = []

        if (bg_data !== undefined) {
          bg_data.skills.forEach(name => {
            auto_bg_skills.push(name)
          })
        }

        const auto_race_skills = []
        if (!!race_data && Array.isArray(race_data.skills)) {
          race_data.skills.forEach(name => {
            const skill = skillsArray.find(x => x.name === name)
            if (skill) {
              auto_race_skills.push(name)
            }
          })
        }

        // Return two arrays combined with only uniques remaining
        return auto_bg_skills.concat(auto_race_skills.filter(item => auto_bg_skills.indexOf(item) < 0))
      }
    }
    return self
  }
}
