import { Injectable } from '@angular/core'
import { RpgCharacter } from '../models/rpg/base'
import { RpgTab } from '../models/rpg/tab'
import { RpgTabSection } from '../models/rpg/tab-section'
import { RpgStat } from '../models/rpg/stat'
import { RpgCalculation } from '../models/rpg/calculation'
import { RpgCollection } from '../models/rpg/collection'
import { RpgCollectionItem } from '../models/rpg/collection-item'
import { RpgCollectable } from '../models/rpg/collectable'
import { RpgCollectableField } from '../models/rpg/collectable-field'
import { RpgCondition } from '../models/rpg/condition'
import { RpgConditionEffect } from '../models/rpg/condition-effect'
import { RpgPayload } from '../models/rpg/payload'
import { SheetService } from './sheet.service'
import { moveItemInArray } from '@angular/cdk/drag-drop'
import { StorageService } from './storage.service'
import { DiceService } from './dice.service'
import { BtPlayerTool } from '../models/common/player-tool.model';
import { CampaignService } from './campaign.service';

@Injectable({
  providedIn: 'root'
})

export class RpgService {
  constructor(
    public sheetSvc: SheetService,
    public store: StorageService,
    public diceSvc: DiceService,
    public campaignSvc: CampaignService,
  ) { }

  public payload = (docId: string): RpgPayload => {
    const self: RpgPayload = {} as RpgPayload
    self.model = new RpgCharacter()
    self.methods = {}
    self.meta = {
      subscriptions: {},
      undefinedErrorCount: 0,
    }
    self.locals = {
      ready: false,
      document_id: docId,
      forbidden: false,
      read_only: false,
      document_failed: false,
      beta_user: false,
      product_is_premium: false,
      this_product_key: 'rpg',
      collaborators: [],
      tabs: { showing_nav: false, active: 'content', list: [
        { name: 'Overview', id: 'overview' },
        { name: 'Structure', id: 'structure' },
        { name: 'Content', id: 'content' },
      ]},
      only_unassigned: false,

      /*
        * This is the selection object. It contains arrays and objects that help power the select elements on the page.
        */
      selection: {
        section_sizes: [
          { label: '50%', value: 6 },
          { label: '100%', value: 12 },
          { label: '25%', value: 3 },
          { label: '75%', value: 9 },
        ],
        input_types: [
          { label: 'Number', value: 'number', init: 0 },
          { label: 'Text', value: 'text', init: '' },
          { label: 'Long Text', value: 'textarea', init: '' },
          { label: 'Yes/No', value: 'boolean', init: false },
          /*, { label: 'Dropdown List', value: 'select', init: '--' },*/
        ],
        label_types: [
          { label: 'No Labels', value: 'none'},
          { label: 'First Line', value: 'above'},
          { label: 'Inline', value: 'inline'},
        ],
        field_ids: ['name', 'up1', 'up2', 'up3', 'up4', 'up5', 'up6', 'up7', 'up8', 'up9', 'up10', 'up11', 'up12', 'up13', 'up14', 'up15', 'up16', 'up17', 'up18', 'up19'],
        field_widths: [
          { label: 'Dynamic', value: 'dynamic' },
          { label: 'Static', value: 'static' },
          { label: '100%', value: 'col-12' },
          { label: '92%', value: 'col-11' },
          { label: '84%', value: 'col-10' },
          { label: '75%', value: 'col-9' },
          { label: '67%', value: 'col-8' },
          { label: '58%', value: 'col-7' },
          { label: '50%', value: 'col-6' },
          { label: '42%', value: 'col-5' },
          { label: '33%', value: 'col-4' },
          { label: '25%', value: 'col-3' },
          { label: '16%', value: 'col-2' },
          { label: '10%', value: 'percent-10' },
          { label: '8%', value: 'col-1' }
        ],
        field_spacings: [
          { label: 'None', value: 'none' },
          { label: '5 pixels', value: '5' },
          { label: '10 pixels', value: '10' },
          { label: '15 pixels', value: '15' },
          { label: '20 pixels', value: '20' }
        ],
        collectable_input_types: [
          { label: 'Number', value: 'number', init: 0 },
          { label: 'Text', value: 'text', init: '' },
          { label: 'Long Text', value: 'textarea', init: '' },
          { label: 'Yes/No', value: 'boolean', init: false },
          { label: 'Calculation', value: 'formula', init: 0 },
          { label: 'Reference', value: 'reference', init: 0 }
        ]
        // , collectables: [
        //   { label: 'Roster', value: 'value_properties', label_type: 'none', fields: [
        //     { id: 'value', label: 'Description', input_type: 'text', css: 'flex-dynamic' }
        //   ]}
        //   , { label: 'Registry', value: 'registry_properties', label_type: 'none', fields: [
        //     { id: 'name', label: 'Name', input_type: 'text', css: 'flex-col-6 bm-5' }
        //     , { id: 'value', label: 'Description', input_type: 'textarea', css: 'flex-col-12' }
        //   ]}
        //   , { label: 'Record', value: 'record_properties', label_type: 'none', fields: [
        //     { id: 'name', label: 'Name', input_type: 'text', css: 'flex-col-4' }
        //     , { id: 'value', label: 'Description', input_type: 'text', css: 'flex-col-8' }
        //   ]}
        //   , { label: 'Ability', value: 'ability_properties', label_type: 'above', fields: [
        //     { id: 'name', label: 'Name', input_type: 'text', css: 'flex-col-4' }
        //     , { id: 'value', label: 'Score', input_type: 'number', css: 'flex-col-4' }
        //     , { id: 'mod', label: 'Mod', input_type: 'formula', css: 'flex-col-2' }
        //     , { id: 'total', label: 'Total', input_type: 'formula', css: 'flex-col-2' }
        //   ]}
        //   , { label: 'Skill', value: 'skill_properties', label_type: 'above', fields: [
        //     { id: 'proficient', label: 'Prof?', input_type: 'boolean', css: '' }
        //     , { id: 'name', label: 'Name', input_type: 'text', css: '' }
        //     , { id: 'ranks', label: 'Ranks', input_type: 'number', css: '' }
        //     , { id: 'total', label: 'Total', input_type: 'formula', css: '' }
        //   ]}
        // ]
      }

      /*
        * This is the data object. It contains arrays and objects that help power calculations in the sheet.
        * This data is either loaded via JSON or it is evolving here and will eventually move to JSON.
        */,
      data: {
        structure_tab: null,
        structure_section: null,
        active_field: null,
        import_valid: true,
        test: {
          collectables: [{id: null, name: ''}],
          section: [{id: null}]
        }
      }
    }

    /******************************************************
     * Common functions across all BTT products
     ******************************************************/

    self.methods.onModelReady = (): void => {
      // if (self.model.prefs.show_confirmation) {
      //   self.methods.turnOnConfirmation()
      // }
      self.locals.tabs.active = self.model.prefs.tab
      // self.locals.data.structure_tab = self.methods.getTab(0)
      // self.locals.data.structure_section = self.methods.getTabSection(self.locals.data.structure_tab, 0)
      self.methods.getTitle()
      self.locals.data.is_touch_device = this.sheetSvc.isTouchDevice()
      checkCampaignId()
      finishedLoading()
    }

    self.methods.onUnfrozen = (): void => {
      checkCampaignId()
      finishedLoading()
      self.methods.getTitle()
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

    /******************************************************
     * Tab- and nav-related functions
     ******************************************************/

    self.methods.switchTab = (id: string): void => {
      self.locals.tabs.active = id
      self.model.prefs.tab = id
      self.locals.tabs.showing_nav = false
    }

    self.methods.isTabActive = (id: string) => self.locals.tabs.active === id
    self.methods.toggleNav = (): void => { self.locals.tabs.showing_nav = !self.locals.tabs.showing_nav }

    self.methods.getActiveNavItem = (): string => {
      const tab = self.locals.tabs.list.find(x => x.id === self.locals.tabs.active)
      return tab ? tab.name : ''
    }

    self.methods.listAllTabs = () => {
      return [...self.locals.tabs.list, ...self.methods.listIncludedTabs()]
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

    /******************************************************
     * Common/shared functions
     ******************************************************/

    self.methods.isAdmin = () => this.sheetSvc.isAdmin(self.locals.user)
    self.methods.remove = (array: any[], index: number) => {
      this.sheetSvc.remove(array, index)
      self.touch()
    }
    self.methods.removeByObject = (array: any[], object: any) => {
      this.sheetSvc.removeByObject(array, object)
      self.touch()
    }
    self.methods.turnOnConfirmation = this.sheetSvc.turnOnConfirmation
    self.methods.turnOffConfirmation = this.sheetSvc.turnOffConfirmation
    self.methods.selectionReverseLookup = this.sheetSvc.selectionReverseLookup
    self.methods.reverseLookupBy = this.sheetSvc.reverseLookupBy
    self.methods.rerunMigration = (version = self.model.version) => {
      self.model.version = version - 1
      location.reload()
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

    self.methods.$list = (item: any): any[] => {
      return item ? [item] : []
    }

    // Tabs
    // ---------------------------------------------------
    self.methods.listTabs = (): RpgTab[] => self.model.tabs || []
    self.methods.listIncludedTabs = (): RpgTab[] => self.methods.listTabs().filter(x => x.name !== 'Battlemap')

    self.methods.addTab = (): void => {
      self.methods.$add(self.model, 'tabs', RpgTab, {
        pos: self.methods.listTabs().length
      })
    }

    self.methods.removeTab = (tab: RpgTab, e: MouseEvent): void => {
      e.stopPropagation()

      if (self.methods.anyActiveTab() && self.locals.data.structure_tab.id === tab.id) {
        self.methods.setStructureTab(null)
      }

      this.sheetSvc.removeByObject(self.model.tabs, tab)
    }

    self.methods.structureTabInArray = (): RpgTab[] => {
      return !self.locals.data.structure_tab ? [] : [self.locals.data.structure_tab]
    }

    self.methods.setStructureTab = (tab: RpgTab): void => {
      self.locals.data.structure_tab = tab
      self.locals.data.structure_section = null
    }

    self.methods.battlemapTab = () => {
      return self.methods.listTabs().find(x => x.name === 'Battlemap')
    }

    // Tab Sections
    // ---------------------------------------------------
    self.methods.listTabSections = (tab: RpgTab): RpgTabSection[] => tab.sections || []
    self.methods.listTabSectionsForOverview = (tab: RpgTab): RpgTabSection[] => self.methods.listTabSections(tab).filter(section => section.overview)

    self.methods.addTabSection = (tab: RpgTab): void => {
      self.methods.$add(tab, 'sections', RpgTabSection, {
        pos: self.methods.listTabSections(tab).length,
        size: 6,
      })
    }

    self.methods.removeTabSection = (tab: RpgTab, section: RpgTabSection, e: MouseEvent): void => {
      e.stopPropagation()

      if (self.methods.anyActiveSection() && self.locals.data.structure_section.id === tab.id) {
        self.methods.setStructureSection(null)
      }

      this.sheetSvc.removeByObject(tab.sections, section)
    }

    self.methods.getStructureSection = (): RpgTabSection[] => self.locals.data.structure_section ? [self.locals.data.structure_section] : []
    self.methods.setStructureSection = (section: RpgTabSection): void => { self.locals.data.structure_section = section }

    self.methods.listAllSections = (): RpgTabSection[] => self.methods.listTabs().reduce((acc, tab) => [...acc, ...self.methods.listTabSections(tab)], [])
    self.methods.listAllSectionEntityIds = (): string[] => self.methods.listAllSections().reduce((acc, section) => [...acc, ...(section.entity_ids || [])], [])
          
    // Stats
    // ---------------------------------------------------
    self.methods.listStats = (): RpgStat[] => self.model.stats || []

    self.methods.addStat = (): void => {
      self.methods.$add(self.model, 'stats', RpgStat, {
        pos: self.methods.listStats().length
      })
    }

    // Calculations
    // ---------------------------------------------------
    self.methods.listCalculations = (): RpgCalculation[] => self.model.calculations || []

    self.methods.addCalculation = (): void => {
      self.methods.$add(self.model, 'calculations', RpgCalculation, {
        pos: self.methods.listCalculations().length
      })
    }

    // Collections
    // ---------------------------------------------------
    self.methods.listCollections = (): RpgCollection[] => self.model.collections || []

    self.methods.addCollection = (): void => {
      self.methods.$add(self.model, 'collections', RpgCollection, {
        pos: self.methods.listCollections().length
      })
    }

    self.methods.getCollectionForReduction = (name: string): RpgCollection => {
      const names = name.split('.')
      return self.methods.listCollections().find(x => x.name === names[0])
    }

    // Collection Items
    // ---------------------------------------------------
    self.methods.listCollectionItems = (collection: RpgCollection): RpgCollectionItem[] => collection.items || []

    self.methods.addCollectionItem = (collection: RpgCollection): void => {
      self.methods.$add(collection, 'items', RpgCollectionItem, {
        pos: self.methods.listCollectionItems(collection).length
      })
    }

    // Collectable
    // ---------------------------------------------------
    self.methods.listCollectables = (): RpgCollectable[] => self.model.collectables || []
    self.methods.getCollectableById = (id: string): RpgCollectable => self.methods.listCollectables().find(x => x.id === id)

    self.methods.addCollectable = (): void => {
      self.methods.$add(self.model, 'collectables', RpgCollectable, {
        pos: self.methods.listCollectables().length
      })
    }

    // Collectable Field
    // ---------------------------------------------------
    self.methods.listCollectableFields = (collectable: RpgCollectable): RpgCollectableField[] => collectable.fields || []
    self.methods.listCollectableFieldsForOverview = (collectable: RpgCollectable): RpgCollectableField[] => self.methods.listCollectableFields(collectable).filter(x => x.overview)

    self.methods.addCollectableField = (collectable: RpgCollectable): void => {
      self.methods.$add(collectable, 'fields', RpgCollectableField, {
        pos: self.methods.listCollectableFields(collectable).length,
        field_id: self.methods.getNextFieldId(collectable),
        name: '',
      })

      self.locals.data.active_field = collectable.fields[collectable.fields.length - 1].id
      self.locals.data.active_collectable = collectable.id
    }

    // Conditions
    // ---------------------------------------------------
    self.methods.listConditions = (): RpgCondition[] => self.model.conditions || []

    self.methods.addCondition = (): void => {
      self.methods.$add(self.model, 'conditions', RpgCondition, {
        pos: self.methods.listConditions().length
      })
    }

    // Condition Effects
    // ---------------------------------------------------
    self.methods.listConditionEffects = (condition: RpgCondition): RpgConditionEffect[] => condition.effects || []

    self.methods.addConditionEffect = (condition: RpgCondition): void => {
      self.methods.$add(condition, 'effects', RpgConditionEffect, {
        pos: self.methods.listConditionEffects(condition).length,
        stat: self.methods.listStats()[0].id,
      })
    }

    // Entities, Aspects
    // Distinct groupings of Calculations, Collections, Conditions, Stats, and other elements
    // ---------------------------------------------------
    const byObjectPredicate = (item: any, object: any): boolean => Object.keys(object).every(key => item[key] === object[key])

    self.methods.listEntities = (): (RpgCalculation|RpgCondition|RpgCollection|RpgStat)[] => {
      return [
        ...self.methods.listStats(),
        ...self.methods.listCalculations(),
        ...self.methods.listCollections(),
        ...self.methods.listConditions()
      ]
    }

    self.methods.listEntitiesByObject = (object: any): (RpgCalculation|RpgCondition|RpgCollection|RpgStat)[] => {
      return self.methods.listEntities().filter(item => byObjectPredicate(item, object))
    }

    self.methods.listEntitiesBySection = (section: RpgTabSection): (RpgCalculation|RpgCondition|RpgCollection|RpgStat)[] => {
      if (!section || !section.entity_ids) { return [] }
      const entities = self.methods.listEntities()
      return section.entity_ids
        .map(entity_id => {
          const entity = entities.find(entity => entity_id === entity.id)
          return !!entity ? entity : new RpgStat({ name: 'an error has occurred with this item' })
        })
    }
    self.methods.anyEntitiesBySection = (section: RpgTabSection): boolean => self.methods.listEntitiesBySection(section).length > 0

    self.methods.listAvailableEntities = (): (RpgCalculation|RpgCondition|RpgCollection|RpgStat)[] => {
      const structureSection = self.locals.data.structure_section || {}
      const sectionIds = structureSection.entity_ids || []
      let entities = self.methods.listEntities().filter(x => !sectionIds.includes(x.id))

      if (self.locals.only_unassigned) {
        const assignedIds = self.methods.listAllSectionEntityIds()
        entities = entities.filter(x => !assignedIds.includes(x.id))
      }
      return entities
    }
    self.methods.anyAvailableEntities = (): boolean => self.methods.listAvailableEntities().length > 0

    self.methods.listEntitiesForConditionEffect = (): (RpgCalculation|RpgCondition|RpgCollection|RpgStat)[] => {
      const stats = self.methods.listStats().filter(x => x.input_type === 'number')
      const collection_items = self.methods.listCollections().reduce((acc, collection) => [...acc, ...self.methods.listCollectionItems(collection)], [])
      return [...stats, ...collection_items]
    }

    self.methods.listEntitiesForReferences = (): (RpgCalculation|RpgCondition|RpgCollection|RpgStat)[] => {
      const stats = self.methods.listStats().filter(x => x.input_type === 'number').map(item => ({ id: item.id, item: item, collectable_id: null }))
      const collection_items = self.methods.listCollections().reduce((acc, collection) => {
        return [...acc, ...self.methods.listCollectionItems(collection).map(item => ({ id: item.id, item: item, collectable_id: collection.collectable }))]
      }, [])
      return [...stats, ...collection_items]
    }

    self.methods.listAspectsByObject = (object: any): (RpgCalculation|RpgCondition|RpgCollection|RpgStat)[] => {
      let stats = []
      let calculations = []
      if (self.locals.ready) {
        stats = self.methods.listStats().filter(item => byObjectPredicate(item, object))
        calculations = self.methods.listCalculations().filter(item => byObjectPredicate(item, object))
      }
      return [...stats, calculations]
    }

    /* For this one we just get the first aspect that matches, starting in the stats array
        We don't care if we have dupes, we just wanna return something */
    self.methods.getAspectByName = (name: string): RpgStat|RpgCalculation => self.methods.listAspectsByObject({ name: name })[0]

    /* Lookup entities by name, used primarily by calculation formula validators
      * Splits the name into an array by . which allows us to make deep calls into
      * collections to reference collection items */
    self.methods.getEntityByName = (name: string): RpgCalculation|RpgCondition|RpgCollection|RpgStat => {
      const names = name.split('.')

      const entity = self.methods.listEntitiesByObject({ name: names[0] })[0]
      if (entity) {
        if (names.length > 1 && self.methods.isCollection(entity)) {
          const item = self.methods.listCollectionItems(entity).find(x => x.name === names[1])
          if (item) {
            return self.methods.getReferenceValue({ item: item, collectable_id: entity.collectable }, names[2])
          }
        } else {
          return self.methods.getEntityTotal(entity)
        }
      }
    }

    self.methods.removeEntity = (array, entity: RpgCalculation|RpgCondition|RpgCollection|RpgStat): void => {
      self.methods.listAllSections().forEach((section: RpgTabSection) => self.methods.removeEntityFromSection(section, entity))
      this.sheetSvc.removeByObject(array, entity)
      self.touch()
    }

    self.methods.removeEntityFromSection = (section: RpgTabSection, entity: RpgCalculation|RpgCondition|RpgCollection|RpgStat): void => {
      if (section.entity_ids) {
        section.entity_ids = section.entity_ids.filter(id => id !== entity.id)
        self.touch()
      }
    }

    /******************************************************
     * Directive Helpers
     ******************************************************/

    self.methods.onSortableDrop = (e): void => {
      const array = e.container.data.entity_ids
      moveItemInArray(array, e.previousIndex, e.currentIndex)
      self.touch()
    }

    self.methods.onCollectionDrop = (e): void => {
      const array = e.container.data
      moveItemInArray(array, e.previousIndex, e.currentIndex)
      self.touch()
    }

    self.methods.onMoveList = (e): void => {
      const target: RpgTabSection = e.container.data
      const entity = e.item.data
      if (target) {
        if (!target.entity_ids) {
          target.entity_ids = []
        }
        if (!target.entity_ids.includes(entity.id)) {
          target.entity_ids.push(entity.id)
        }
        self.methods.onSortableDrop(e)
        return
      }

      const origin = e.previousContainer.data as RpgTabSection
      if (origin && origin.entity_ids) {
        const index = origin.entity_ids.indexOf(entity.id)
        if (index > -1) {
          origin.entity_ids.splice(index, 1)
        }
      }
      self.touch()
    }

    /******************************************************
     * Specific Methods (GOOD NAME)
     ******************************************************/

    self.methods.getTabSectionClass = (section: RpgTabSection): any => ({
      [`flex-col-${section.size}`]: true,
      active: (self.locals.data.structure_section !== null) && section.id === self.locals.data.structure_section.id,
    })

    self.methods.getStructureTabClass = (tab: RpgTab): any => ({
      active: (self.locals.data.structure_tab !== null) && tab.id === self.locals.data.structure_tab.id
    })

    self.methods.getCollectableFieldClasses = (field: RpgCollectableField): string => `flex-${field.width} spacer-${field.space}`
    self.methods.anyActiveTab = (): boolean => self.locals.data.structure_tab !== null
    self.methods.anyActiveSection = (): boolean => self.locals.data.structure_section !== null

    self.methods.setActiveCollectableField = (field_id: string, collectable_id: string): void => {
      self.locals.data.active_field = field_id
      self.locals.data.active_collectable = collectable_id
    }

    self.methods.getCollectableFieldActiveStatus = (field_id: string, collectable_id: string): any => ({
      active: self.locals.data.active_field === field_id && self.locals.data.active_collectable === collectable_id
    })

    self.methods.getInitByValue = (array: any[], value: any): string|number => array.find(x => x.value === value).init

    self.methods.onStatInputTypeChange = async (stat: RpgStat): Promise<void> => {
      await Promise.resolve()
      self.touch()
      stat.value = self.methods.getInitByValue(self.locals.selection.input_types, stat.input_type)
    }

    self.methods.getEntityType = (entity: any): string => {
      if (entity instanceof RpgStat) { return 'RpgStat'}
      if (entity instanceof RpgCalculation) { return 'RpgCalculation' }
      if (entity instanceof RpgCondition) { return 'RpgCondition' }
      if (entity instanceof RpgCollection) { return 'RpgCollection' }
      return 'unknown'
    }

    self.methods.getEntityInfo = (entity: RpgCalculation|RpgCondition|RpgCollection|RpgStat): string => {
      if (entity instanceof RpgStat) {
        return this.sheetSvc.selectionReverseLookup(self.locals.selection.input_types, entity.input_type)
      }

      if (entity instanceof RpgCalculation) {
        return entity.formula
      }

      if (entity instanceof RpgCollection) {
        let collectable = self.methods.listCollectables().find(x => x.id === entity.collectable)
        if (collectable) { return collectable.name }
      }

      if (entity instanceof RpgCondition) {
        return entity.description
      }
    }

    self.methods.isStat = (entity: RpgCalculation|RpgCondition|RpgCollection|RpgStat): boolean => entity instanceof RpgStat
    self.methods.isCalculation = (entity: RpgCalculation|RpgCondition|RpgCollection|RpgStat): boolean => entity instanceof RpgCalculation
    self.methods.isCollection = (entity: RpgCalculation|RpgCondition|RpgCollection|RpgStat): boolean => entity instanceof RpgCollection
    self.methods.isCondition = (entity: RpgCalculation|RpgCondition|RpgCollection|RpgStat): boolean => entity instanceof RpgCondition

    self.methods.getEntityTotal = (entity: RpgCalculation|RpgCondition|RpgCollection|RpgStat): number => {
      if (entity instanceof RpgCalculation) {
        let value
        // Recursion protection block
        try {
          value = self.methods.calculateFormula(entity)
        } catch {
          value = 0
        }
        return value
      }
      if (entity instanceof RpgStat) {
        return entity.auto !== undefined && entity.auto !== null ? entity.auto : entity.value
      }
      return 0
    }

    self.methods.getNextFieldId = (collectable: RpgCollectable): string => {
      const field_ids = self.methods.listCollectableFields(collectable).map(x => x.field_id)
      // todo: make sure this works. this used to be _.difference
      return self.locals.selection.field_ids.filter(x => !field_ids.includes(x))[0]
    }

    self.methods.sanitizeAspectName = async (aspect: RpgStat|RpgCalculation): Promise<void> => {
      await Promise.resolve()
      self.touch()
      aspect.name = aspect.name.replace(/[^-_\w\s]/gi, '')
    }

    self.methods.getReferenceValue = (source: any, name: string): any => {
      // return value of reference
      if (source !== undefined) {
        let source_collectable = self.methods.getCollectableById(source.collectable_id)
        let source_field = self.methods.listCollectableFields(source_collectable).find(x => x.name === name)
        if (source_field !== undefined) {
          return source.item[source_field.field_id]
        }
      }
    }

    const handleRolls = (v, dice_array) => {
      const packs = dice_array.map(dice => this.diceSvc.getDicePackage(dice))
      packs.forEach((dice, index) => v.formula = v.formula.replace(dice_array[index], dice.result))
      const recordList = packs.map(pack => pack.record.list.join(', '))
      v.roll_result = ` rolled %ACTION% and got: %RESULT% (${recordList.join(', ')})`
    }

    // roll dice, replace result with 0, display results elsewhere
    /* Replace all instances of d6, 2d8, etc, with 0 for validation */
    const defaultDiceHandler = (v, rolls) => {
      const expression = /(\d{0,4})d\d{1,4}/gi
      v.formula = (v.formula || '').replace(expression, '0')
    }

    self.methods.rollFormula = (entity) => {
      const result = self.methods.validateFormula(entity.formula, undefined, handleRolls)
      const roll = result.roll_result.replace('%RESULT%', result.value).replace('%ACTION%', entity.name)
      this.store.addCustomRollToChat(roll)
      entity.last_result = result.value
    }

    self.methods.onCalculationChange = async (entity) => {
      await Promise.resolve()
      self.methods.calculateFormula(entity)
      self.touch()
    }

    self.methods.calculateFormula = (entity) => {
      const result = self.methods.validateFormula(entity.formula)

      if (result.value !== undefined) {
        entity.value = result.value
        entity.valid = true
      }

      if (result.error !== undefined) {
        entity.value = result.error
        entity.valid = false
      }

      entity.rolls = !!result.rolls

      return entity.value
    }

    self.methods.calculateCollectableFormula = (calculation_field, item, collectable) => {
      /* Sub function defined here to take advantage of the scoped variable item */
      const nameSearch = (name) => {
        let names = name.split('.')
        let named_field = self.methods.listCollectableFields(collectable).find(x => x.name === names[0])

        if (named_field !== undefined) {
          if (named_field.input_type === 'reference') {
            // Grabs the source the reference is pointing to, which is either a listed Stat, Calculation or Collection Item
            let source = self.methods.listEntitiesForReferences().find(x => x.id === item[named_field.field_id])
            if (names.length > 1) {
              return self.methods.getReferenceValue(source, names[1])
            } else {
              return source && source.item.value
            }
          } else {
            return item[named_field.field_id]
          }
        } else if (name === 'auto') {
          return item.auto
        } else {
          return self.methods.getEntityByName(name)
        }
      }

      let result = self.methods.validateFormula(calculation_field.formula, nameSearch)

      if (result.value !== undefined) {
        item[calculation_field.field_id] = result.value
      }

      calculation_field.rolls = !!result.rolls

      return result.value
    }

    /* This is called on collectable field calculation change
      * It doesn't do a full calculation of the formula, but a rough validation
      * it won't catch as many issues as a full calculation would, but it's close enough
      * to give our users a good idea of what is and what isn't allowed
      *
      * TODO: Improve validation for split names like Ability.Mod */
    self.methods.validateCollectableFormula = async (field, collectable) => {
      await Promise.resolve()
      self.touch()

      const nameSearch = (name) => {
        let names = name.split('.')
        let named_field = self.methods.listCollectableFields(collectable).find(x => x.name === names[0])
        if (named_field !== undefined) {
          // Grab default value for validation purposes
          return this.sheetSvc.reverseLookupBy(self.locals.selection.collectable_input_types, { value: named_field.input_type }, 'init')
        } else if (name === 'auto') {
          return null
        } else {
          return self.methods.getEntityByName(name)
        }
      }

      let result = self.methods.validateFormula(field.formula, nameSearch)

      field.valid = result.error === undefined
      field.error = result.error
    }

    /* Takes a value and returns an int if possible.
      * If null is passed, then it's an auto so we return 0 */
    self.methods.validateIntValue = (value) => {
      if (value === null) {
        return 0
      }
      if (!isNaN(parseInt(value))) {
        return parseInt(value)
      }
    }

    /* Takes a value and returns a boolean if possible.
      * Many types are accepted here so we can use the {variable?} syntax with
      * ints, strings, bools, and null */
    self.methods.validateBoolValue = (value) => {
      if (typeof value === 'boolean') {
        return value
      }
      if (value === null) {
        return false
      }
      if (typeof value === 'number') {
        return value !== 0
      }
      if (typeof value === 'string') {
        return value !== ''
      }
    }

    self.methods.validateConditionals = (v, nameSearch) => {
      let expression = /\{(!?)([-_\w\s.]+)\?(\d{1,4}:\d{1,4})?\}/gi

      /* Grab all conditionals and throw them in a list to check  */
      let conditionals = (v.formula || '').match(expression) || []

      /* For each name we need to select the name and body, checking to make sure the aspect exists
          make sure the aspect.value exists and is a boolean */
      conditionals.forEach(conditional => {
        let name = conditional.replace(expression, '$2')
        let outcomes = conditional.replace(expression, '$3')
        let reverse = conditional.replace(expression, '$1') === '!'
        outcomes = outcomes === '' ? [1, 0] : outcomes.split(':')

        let value = nameSearch(name)
        let bool = self.methods.validateBoolValue(value)
        if (bool !== undefined) {
          bool = reverse ? !bool : bool
          v.formula = v.formula.replace(conditional, bool ? outcomes[0] : outcomes[1])
        } else {
          v.valid = false
          v.error = `{${name}?} is not a valid stat or calculation`
        }
      })
      return v
    }

    const validateReductions = (v) => {
      let expression = /\{\s*(!?)=(SUM|ANY|EVERY):([-_\w\s.]+)(\?(\d{1,4}:\d{1,4})?)?\s*\}/gi

      /* Grab all conditionals and throw them in a list to check  */
      let conditionals = (v.formula || '').match(expression) || []

      /* For each name we need to select the name and body, checking to make sure the aspect exists
          make sure the aspect.value exists and is a boolean */
      conditionals.forEach(conditional => {
        let reverse = conditional.replace(expression, '$1') === '!'
        let action = conditional.replace(expression, '$2')
        let name = conditional.replace(expression, '$3')
        let anyConditional = conditional.replace(expression, '$4') || reverse
        let outcomes = conditional.replace(expression, '$5')
        outcomes = outcomes === '' ? [1, 0] : outcomes.split(':')

        if (anyConditional && action === 'SUM') {
          v.valid = false
          v.error = `{=${action}:${name}} is not a valid stat or calculation`
          return
        }

        let result = reduceCollection(name, action)
        if (result !== undefined) {
          switch(action) {
            case 'SUM':
              v.formula = v.formula.replace(conditional, result)
              break
            default:
              result = reverse ? !result : result
              v.formula = v.formula.replace(conditional, result ? outcomes[0] : outcomes[1])
              break
          }
        } else {
          v.valid = false
          v.error = `{=${action}:${name}} is not a valid stat or calculation`
        }
      })
      return v
    }

    const reduceObjectForAction = (action: string, field_id: string) => {
      switch(action) {
        case 'ANY':
          return { init: false, reduce: (acc, item) => acc || item[field_id]}
        case 'EVERY':
          return { init: true, reduce: (acc, item) => acc && item[field_id]}
        default:
          return { init: 0, reduce: (acc, item) => acc + item[field_id]}
      }
    }

    const reduceCollection = (name: string, action: string): number|boolean => {
      const names = name.split('.')
      const collection = self.methods.getCollectionForReduction(name) || {}
      const collectable = self.methods.getCollectableById(collection.collectable) || {}
      const field = self.methods.listCollectableFields(collectable).find(x => x.name === names[1])
      if (field) {
        const reduceObj = reduceObjectForAction(action, field.field_id)
        if (reduceObj)
        return self.methods.listCollectionItems(collection).reduce(reduceObj.reduce, reduceObj.init)
      }
    }

    self.methods.validateVariables = (v, nameSearch) => {
      let expression = /\{([-_\w\s.]+)\}/gi
      /* Grab all aspects and throw them in a list to check  */
      v.aspect_names = (v.formula || '').match(expression) || []
      v.aspect_values = []

      /* For each name we need to get rid of the curlies, make sure the aspect exists
          make sure the aspect has a value, and make sure that value is not NaN after parseInt */
      v.aspect_names.forEach(key => {
        let name = key.replace(expression, '$1')
        let search = nameSearch(name)
        let value = self.methods.validateIntValue(search)
        if (value !== undefined) {
          v.aspect_values.push(value)
        } else {
          v.valid = false
          v.error = `${key} is not a VALID stat or calculation`
        }
      })

      return v
    }

    self.methods.convertVariables = (v) => {
      if (v.valid) {
        /* Replace each aspect name in the formula with the number value we determined above */
        v.aspect_names.forEach((name, index) => {
          v.formula = v.formula.replace(name, v.aspect_values[index])
        })
      }
      return v
    }

    self.methods.validateDiceRolls = (v, diceHandler = defaultDiceHandler) => {
      const expression = /\d{0,4}d\d{1,4}/gi
      const rolls = (v.formula || '').match(expression)
      v.rolls = !!rolls

      diceHandler(v, rolls)
      return v
    }

    self.methods.validateStringChars = (v) => {
      if (v.valid) {
        /* Check each character of the remaining formula individually looking for bad chars */
        v.valid = v.formula.split('').reduce((acc, char) =>  acc && !!char.match(/[-+\s\d.%\/*()]/gi), v.valid)
        /* If we're good we eval, if there's a problem with the eval, we're invalid */
        if (v.valid) {
          try {
            v.result = Math.floor(eval(v.formula))
          } catch (err) {
            if (err) {
              v.valid = false
              v.error = 'Formula cannot be evaluated'
            }
          }
        } else {
          v.error = 'Formula contains illegal characters'
        }
      }
      return v
    }

    self.methods.validateFormula = (formula, nameSearch, diceHandler = defaultDiceHandler) => {
      let v: any = {
        formula: formula,
        valid: true,
        error: '',
        result: 0
      }

      if (!nameSearch) {
        nameSearch = self.methods.getEntityByName
      }

      /* Formula can't be null or blank */
      v.valid = (v.formula !== null) && Object.keys(v.formula).length > 0

      if (!v.valid) {
        v.error = 'Formula can\'t be blank'
      }

      // Make sure oyu can use the same variable twice!!!!!!!!
      v = self.methods.validateConditionals(v, nameSearch)
      v = validateReductions(v)
      v = self.methods.validateVariables(v, nameSearch)
      v = self.methods.convertVariables(v)
      v = self.methods.validateDiceRolls(v, diceHandler)
      v = self.methods.validateStringChars(v)

      return v.valid ? { value: v.result, rolls: v.rolls, roll_result: v.roll_result } : { error: v.error, rolls: v.rolls }
    }

    self.methods.onCollectionChange = async (collection) => {
      await Promise.resolve()
      self.touch()
      collection.items = []
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

    // Clicking the condition's checkbox to toggle the condition to active will trigger this
    self.methods.toggleCondition = async (condition) => {
      await Promise.resolve()
      self.touch()

      let valid = self.methods.isConditionValid(condition)
      let effects = self.methods.listConditionEffects(condition)

      if (valid && condition.active) {
        valid = effects.every(effect => self.methods.activateEffect(effect))
      }

      if (!condition.active || !valid) {
        condition.active = false
        effects.forEach(effect => self.methods.deactivateEffect(effect))
      }
    }

    // Returns boolean effect.valid
    self.methods.activateEffect = (effect) => {
      let source, target, formula
      target = self.methods.listEntitiesForConditionEffect().find(x => x.id === effect.stat)

      if (target !== undefined) {
        self.methods.setEffectFormula(target, effect)
      } else {
        effect.valid = false
        effect.value = 'No valid target found for condition\'s result to replace.'
      }

      return effect.valid
    }

    self.methods.deactivateEffect = (effect) => {
      let target = self.methods.listEntitiesForConditionEffect().find(x => x.id === effect.stat)

      if (target !== undefined) {
        self.methods.unsetEffect(target, effect)
      }
    }

    self.methods.setEffectFormula = (target, effect) => {
      effect.valid = true

      // If the target already has a value, that means a previous effect is active on this
      // stat, which means we need to pull the 'source' from the target and calc on that
      // if (target.obj[target.key] !== null) {
      //   source = target
      // }
      let value = self.methods.calculateFormula(effect)
      if (effect.valid) {
        target.auto = value
      }

    }

    self.methods.unsetEffect = (target, effect) => {
      target.auto = null

      // if there are other active conditions whose effects have our target name as their target name
      // we need to activate those effects
      self.methods.listConditions().filter(x => x.active).forEach(condition => {
        self.methods.activateEffectsForStat(condition, effect.stat)
      })
    }

    self.methods.activateEffectsForStat = (condition, stat_id) => {
      self.methods.listConditionEffects(condition).filter(x => x.stat === stat_id).forEach(effect => {
        self.methods.activateEffect(effect)
      })
    }

    self.methods.getRelevantConditions = (condition, stat_id) => {
      return self.methods.listConditionEffects(condition).filter(x => x.stat === stat_id)
    }

    self.methods.isConditionValid = (condition) => {
      return self.methods.listConditionEffects(condition).every(condition => condition.valid)
    }

    self.methods.getConditionAuto = (entity) => {
      entity.auto = null
      self.methods.listConditions().filter(x => x.active).forEach(condition => {
        self.methods.activateEffectsForStat(condition, entity.id)
      })

      return entity.auto
    }

    self.methods.showConditionAuto = (entity) => {
      if (self.methods.hasActiveConditions(entity)) {
        return 'With active conditions: ' + self.methods.getConditionAuto(entity)
      }
    }

    self.methods.hasActiveConditions = (entity) => {
      return entity.auto !== undefined && entity.auto !== null
    }

    self.methods.listActiveConditions = (entity) => {
      const relevant_conditions = self.methods.listConditions().filter(x => x.active).filter(condition => {
        return self.methods.listConditionEffects(condition).some(x => x.stat === entity.id)
      })

      return 'Affected by: ' + relevant_conditions.map(x => x.name).join(', ')
    }
    return self
  }
}
