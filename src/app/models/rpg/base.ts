import { BtBase } from '../common/base'
import { BtSheetPrefs } from '../common/prefs'
import { RpgTab } from './tab'
import { RpgStat } from './stat'
import { RpgCalculation } from './calculation'
import { RpgCollection } from './collection'
import { RpgCollectable } from './collectable'
import { RpgCondition } from './condition'
import { RpgConditionEffect } from './condition-effect';
import { RpgCollectableField } from './collectable-field';
import { RpgTabSection } from './tab-section';
import { RpgCollectionItem } from './collection-item';

export class RpgCharacter extends BtBase {
  version: number
  name: string
  change_id: string
  oversized: boolean
  campaign_id: string
  prefs: BtSheetPrefs
  tabs: RpgTab[]
  stats: RpgStat[]
  calculations: RpgCalculation[]
  collections: RpgCollection[]
  collectables: RpgCollectable[]
  conditions: RpgCondition[]

  getProto() {
    return {
      version: 1,
      name: 'New RPG Sheet',
      change_id: '0',
      oversized: false,
      campaign_id: null,
      prefs: new BtSheetPrefs({
        tab: 'content'
      }),

      tabs: [
        new RpgTab({
          name: 'Example Tab',
          sections: [
            new RpgTabSection({
              entity_ids: ['123456789012', '123456789013', '123456789014'],
              size: 6,
            }),
            new RpgTabSection({
              entity_ids: ['COLLECTION01', 'CONDITION001'],
              size: 6,
            }),
          ]
        }),
        new RpgTab({
          name: 'Battlemap',
          sections: [
            new RpgTabSection({ size: 6 }),
            new RpgTabSection({ size: 6 }),
          ]
        })
      ],

      stats: [
        new RpgStat({
          id: '123456789012',
          name: 'Total HP',
        }),
        new RpgStat({
          id: '123456789013',
          name: 'Wounds',
        }),
      ],

      calculations: [
        new RpgCalculation({
          id: '123456789014',
          name: 'Current HP',
          formula: '{Total HP} - {Wounds}',
        })
      ],

      collections: [
        new RpgCollection({
          id: 'COLLECTION01',
          name: 'Spells',
          collectable: 'ZXCQWEEUIORT',
          items: [
            new RpgCollectionItem({
              name: 'Magic Missile',
              up1: 1,
              up2: 'Shoot a bunch of magic projectiles out.'
            })
          ]
        })
      ],

      collectables: [
        new RpgCollectable({
          name: 'Spell',
          id: 'ZXCQWEEUIORT',
          fields: [
            new RpgCollectableField({
              width: 'col-6',
              space: '10',
            }),
            new RpgCollectableField({
              name: 'Level',
              field_id: 'up1',
              input_type: 'number',
              width: 'col-6',
              space: '10',
            }),
            new RpgCollectableField({
              name: 'Description',
              field_id: 'up2',
              input_type: 'text',
              width: 'col-12',
              space: '10',
            }),
          ]
        })
      ],

      conditions: [
        new RpgCondition({
          id: 'CONDITION001',
          name: 'Dead',
          effects: [
            new RpgConditionEffect({
              stat: '123456789012',
              formula: '0',
            })
          ]
        })
      ],
    }
  }
}
