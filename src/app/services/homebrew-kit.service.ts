import { Injectable } from '@angular/core'
import { HomebrewKitBase } from '../models/homebrew-kits/base'
import { StorageService } from './storage.service'
import { SheetService } from './sheet.service'
import { HomebrewKitDnd5eKlass } from '../models/homebrew-kits/klass'
import { Dnd5eSpell } from '../models/dnd5e/spell'
import { Dnd5eWeapon } from '../models/dnd5e/weapon'
import { Dnd5eArmor } from '../models/dnd5e/armor'
import { Dnd5eFeat } from '../models/dnd5e/feat'
import { HomebrewKitDnd5eBackground } from '../models/homebrew-kits/background'
import { PathfinderArmor } from '../models/pathfinder/armor'
import { PathfinderFeat } from '../models/pathfinder/feat'
import { PathfinderKlass } from '../models/pathfinder/klass'
import { PathfinderSpell } from '../models/pathfinder/spell'
import { PathfinderWeapon } from '../models/pathfinder/weapon'

@Injectable({
  providedIn: 'root'
})
export class HomebrewKitService {

  constructor(
    public sheetSvc: SheetService,
    public store: StorageService,
  ) { }

  public payload = (docId: string) => {
    const self: any = {}
    self.model = new HomebrewKitBase()
    self.methods = {}
    self.meta = {
      subscriptions: {},
      undefinedErrorCount: 0,
    }
    self.locals = {
      ready: false,
      document_id: docId,
      forbidden: false,
      document_failed: false,
      error: false,
      permission: {
        writer: false
      },
      temp_tool_type: 'choose',
      actives: {},
      selection: {
        toolTypes: [
          { label: 'None', value: 'choose' },
          { label: 'D&D 5E', value: 'dnd5e' },
          { label: 'Pathfinder', value: 'pathfinder' },
        ],
        schools: ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'],
        spellLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        casters: ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard'],
        abilities: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'],
        dnd5eSkills: ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival'],
        weapon: {
          type: ['--', 'Bludgeoning', 'Piercing', 'Slashing'],
          melee_or_ranged: ['Melee', 'Ranged'],
          crit_mult: ['x2', 'x3', 'x4', 'x5'],
          crit_range: ['20', '19-20', '18-20', '17-20', '16-20', '15-20'],
        },
        armor: {
          type: ['Armor', 'Shield', 'Magic', 'Other']
        },
      },
      dnd5e_collections: [
        {
          modelClass: HomebrewKitDnd5eKlass,
          dbSlug: 'klasses',
          title: 'Classes',
          switch: 'dnd5e_klass',
        },
        {
          modelClass: Dnd5eSpell,
          dbSlug: 'spells',
          title: 'Spells',
          switch: 'dnd5e_spell',
        },
        {
          modelClass: Dnd5eWeapon,
          dbSlug: 'weapons',
          title: 'Weapons',
          switch: 'dnd5e_weapon',
        },
        {
          modelClass: Dnd5eArmor,
          dbSlug: 'armors',
          title: 'Armor',
          switch: 'dnd5e_armor',
        },
        {
          modelClass: HomebrewKitDnd5eBackground,
          dbSlug: 'backgrounds',
          title: 'Backgrounds',
          switch: 'dnd5e_background',
        },
        {
          modelClass: Dnd5eFeat,
          dbSlug: 'invocations',
          title: 'Warlock Invocations',
          switch: 'dnd5e_invocation',
        },
        // each class's powers?
      ],
      pathfinder_collections: [
        {
          modelClass: PathfinderKlass,
          dbSlug: 'klasses',
          title: 'Classes',
          switch: 'pathfinder_klass',
        },
        {
          modelClass: PathfinderSpell,
          dbSlug: 'spells',
          title: 'Spells',
          switch: 'pathfinder_spell',
        },
        {
          modelClass: PathfinderWeapon,
          dbSlug: 'weapons',
          title: 'Weapons',
          switch: 'pathfinder_weapon',
        },
        {
          modelClass: PathfinderArmor,
          dbSlug: 'armors',
          title: 'Armor',
          switch: 'pathfinder_armor',
        },
        {
          modelClass: PathfinderFeat,
          dbSlug: 'feats',
          title: 'Feats',
          switch: 'pathfinder_feat',
        },
      ],
    }

    // Common
    self.methods.selectionReverseLookup = this.sheetSvc.selectionReverseLookup
    self.methods.doesArrayIncludeValue = (array: any[], value: any) => array && array.includes(value)

    self.methods.toggleValueInArray = (parent: any, slug: string, value: any): void => {
      self.touch()
      const array = parent[slug]
      if (self.methods.doesArrayIncludeValue(array, value)) {
        const index = array.indexOf(value)
        array.splice(index, 1)
      } else {
        parent[slug] = parent[slug] || []
        parent[slug].push(value)
      }
    }

    //***************************************************************************
    // Controller stuff
    //***************************************************************************

    self.methods.onModelReady = (): void => {
      self.methods.getTitle()
      finishedLoading()
    }

    self.methods.onUnfrozen = (): void => {
      finishedLoading()
    }

    self.methods.getTitle = (): void => {
      // window.document.title = `${self.model.name} | Beyond Tabletop`
    }

    self.methods.updateTitle = async (): Promise<void> => {
      await Promise.resolve()
      self.touch()
      if (self.locals.permission.writer) {
        this.store.updatePlayerToolTitle(self.locals.user.firebase_id, self.locals.document_id, self.model.name)
      }
    }

    self.methods.chooseKitType = (value: string): void => {
      self.touch()
      self.model.tool_type = value
      this.store.updatePlayerProperties(this.store.user.firebase_id, self.locals.document_id, { kit_type: value })
    }

    const finishedLoading = (): void => {
      self.locals.ready = true
    }

    /******************************************************
     * Accessor Methods
     ******************************************************/

    self.methods.$add = (parent: any, slug: string, construct: any, init: any = {}): void => {
      self.touch()
      parent[slug] = self.methods.$list(parent[slug])
      const item = new construct(init)
      parent[slug].push(item)
      self.locals.actives[slug] = item
    }

    self.methods.$remove = (array: any[], item: any, slug: string): void => {
      self.touch()
      self.locals.actives[slug] = null
      this.sheetSvc.removeByObject(array, item)
    }

    self.methods.$nestedRemove = (array: any[], item: any): void => {
      self.touch()
      this.sheetSvc.removeByObject(array, item)
    }

    self.methods.$list = (list: any[]): any[] => list || []
    self.methods.$any = (list: any[]): boolean => self.methods.$list(list).length > 0
    self.methods.$select = (slug: string, item: any): void => { self.locals.actives[slug] = item }
    self.methods.$active = (slug: string): any[] => self.locals.actives[slug] ? [self.locals.actives[slug]] : []

    self.methods.listCollections = (): any[] => {
      return self.locals[`${self.model.tool_type}_collections`] || []
    }

    return self
  }
}
