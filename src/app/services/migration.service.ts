import { Injectable } from '@angular/core';
import { SheetService } from './sheet.service';
import { HttpService } from './http.service';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { BtBool } from '../models/common/bool';
import { BattlemapCombat } from '../models/battlemap/combat';

@Injectable({
  providedIn: 'root'
})
export class MigrationService {
  private migrations: any
  toolId: string
  toolType: string
  toolData: any
  toolRef: AngularFireObject<any>
  finalVersion: number
  ownerId: string

  constructor(
    private sheetSvc: SheetService,
    public db: AngularFireDatabase,
    private http: HttpService,
  ) {
    this.migrations = {
      dnd5e: {
        33: async (model: any) => {

          // Restore portent rolls
          if (!model.powers.Wizard.portent || model.powers.Wizard.portent.length < 3) {
            model.powers.Wizard.portent = [{ value: '' }, { value: '' }, { value: '' }];
          }

          // Add id/pos to Klass
          model.klasses.forEach((klass, index) => {
            klass.id = this.sheetSvc.randomSecureString(12)
            klass.pos = index
          })
        },
        34: async (model: any) => {
          // Add id/pos to experiences
          if (model.experiences) {
            model.experiences.forEach((log, index) => {
              log.id = this.sheetSvc.randomSecureString(12);
              log.pos = index;
            })
          }

          // Add id/pos to skills
          if (model.skills) {
            model.skills.forEach((skill, index) => {
              skill.id = this.sheetSvc.randomSecureString(12);
              skill.pos = index;
            })
          }

          // Add id/pos to companions
          if (model.companions) {
            model.companions.forEach((companion, i1) => {
              companion.id = this.sheetSvc.randomSecureString(12);
              companion.pos = i1;
              if (companion.skills) {
                companion.skills.forEach((skill, i2) => {
                  skill.id = this.sheetSvc.randomSecureString(12);
                  skill.pos = i2;
                })
              }
            })
          }
        },
        35: async (model: any) => {
          // Add keep to powers.custom
          model.powers.custom = model.powers.custom || {}
          model.powers.custom.keep = 1

          // Add created_at to experiences
          if (model.experiences) {
            model.experiences.forEach((log, index) => {
              log.created_at = (Date.now() + index)
            })
          }

          // Grab new spell info
          const data = await this.http.getLocalAsPromise('/assets/data/dnd5e/base.json')
          const allSpells = data.spells

          if (model.spells.spellbook && model.spells.spellbook instanceof Array) {
            model.spells.spellbook.forEach(spell => {
              // If spell name matches a found spell, use its stats instead
              const foundSpell = allSpells.find(x => x.name === spell.name)
  
              if (foundSpell) {
                spell.summary = foundSpell.summary
                spell.source = foundSpell.source
                spell.text = foundSpell.text
  
                if (spell.description !== undefined) {
                  delete spell.description
                }
  
                if (!(spell.classes instanceof Array) || !spell.classes) {
                  spell.classes = foundSpell.classes
                }
              } else {
                // Convert all spell descriptions to markdown
                if (spell.description !== undefined) {
                  spell.text = spell.description
                  delete spell.description
                }
  
                if (!(spell.classes instanceof Array) || !spell.classes) {
                  const classes_array = []
                  for (const i in spell.classes) {
                    if (spell.classes[i]) {
                      classes_array.push(i)
                    }
                  }
                  spell.classes = classes_array
                }
              }
  
              if (spell.casting_time) {
                spell.casting = spell.casting_time
                delete spell.casting_time
              }
            })
          }
        },
        36: async (model: any) => {
          // Reorganize spellbook
          if (!!model.spells && !(model.spells instanceof Array)) {
            model.casting = model.spells.info
            model.spell_slots = model.spells.slots
            const spells = model.spells.spellbook || []
            model.spells = spells
          }

          // Background arrays
          const backgroundMigration = array => {
            if (array) {
              array.forEach(x => {
                x.id = this.sheetSvc.randomSecureString(12)
                if (x.value !== undefined && x.text === undefined) {
                  x.text = x.value
                  delete x.value
                }
              })
            }
          }

          backgroundMigration(model.profile)
          backgroundMigration(model.basic.background.traits)
          backgroundMigration(model.basic.background.ideals)
          backgroundMigration(model.basic.background.bonds)
          backgroundMigration(model.basic.background.flaws)
          backgroundMigration(model.basic.background.specialties)
          backgroundMigration(model.powers.Barbarian.totem_beasts)
          backgroundMigration(model.powers.Fighter.style)
          backgroundMigration(model.powers.Fighter.maneuvers)
          backgroundMigration(model.powers.Monk.disciplines)
          backgroundMigration(model.powers.Paladin.style)
          backgroundMigration(model.powers.Ranger.favored_enemies)
          backgroundMigration(model.powers.Ranger.favored_terrains)
          backgroundMigration(model.powers.Ranger.style)

          // Lists content -> items
          if (model.lists) {
            model.lists.forEach(list => {
              if (list.content) {
                list.items = list.content
                delete list.content
              }
            })
          }

          // Klasses klass -> name
          if (model.klasses) {
            model.klasses.forEach(klass => {
              if (klass.klass !== undefined && klass.name === undefined) {
                klass.name = klass.klass
                delete klass.klass
              }
            })
          }

          // Custom Dice formula -> text
          if (model.custom_dice) {
            model.custom_dice.forEach(die => {
              if (die.formula !== undefined && die.text === undefined) {
                die.text = die.formula
                delete die.formula
              }
            })
          }
        },
        37: async (model: any) => {
          if (model.attacks && model.attacks instanceof Array) {
            model.attacks.forEach(attack => {
              const old_id = attack.weapon
              if (model.weapons && model.weapons[old_id]) {
                const weapon = model.weapons[old_id]
                attack.weapon = weapon.id
              } else {
                attack.weapon = null
              }
            })
          }
        },
        38: async (model: any) => {
          const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']

          abilities.forEach(slug => model.abilities[slug].auto = 0)
          model.skills.forEach(skill => skill.auto = 0)
          model.basic.proficiency.auto = 0
          model.combat.hp.auto = 0
          model.combat.speed.auto = 0
          model.combat.init.auto = 0
          model.combat.ac.auto = 0
          model.combat.ac.dex_auto = 0
          model.combat.weight.auto = 0
        },
        39: async (model: any) => {
          if (model.lists) {
            model.lists.forEach(list => list.special = true)
          }
        },
        40: async (model: any) => {
          if (!model.death_saves) {
            model.combat.hp.death_saves = [
              new BtBool(),
              new BtBool(),
              new BtBool(),
            ]
          }

          if (!model.life_saves) {
            model.combat.hp.life_saves = [
              new BtBool(),
              new BtBool(),
              new BtBool(),
            ]
          }
        },
      },
      pathfinder: {
        26: async (model: any) => {
          // Regen ID for all blocks
          model.blocks.forEach(block => {
            block.id = this.sheetSvc.randomSecureString(12);
          })
        },
        27: async (model: any) => {
          // Reorganize spellbook
          if (!!model.spells && !(model.spells instanceof Array)) {
            const spells = model.spells.spellbook || []
            model.casting = model.spells.info
            model.spells = spells
          }

          // Lists content -> items
          if (model.lists) {
            model.lists.forEach(list => {
              if (list.content) {
                list.items = list.content
                delete list.content
              }
            })
          }

          // Klasses klass -> name
          if (model.klasses) {
            model.klasses.forEach(klass => {
              if (klass.klass !== undefined && klass.name === undefined) {
                klass.name = klass.klass
                delete klass.klass
              }
            })
          }

          // Custom Dice formula -> text
          if (model.custom_dice) {
            model.custom_dice.forEach(die => {
              if (die.formula !== undefined && die.text === undefined) {
                die.text = die.formula
                delete die.formula
              }
            })
          }

          const valueToText = array => {
            if (array) {
              array.forEach(x => {
                if (x.value !== undefined && x.text === undefined) {
                  x.text = x.value
                  delete x.value
                }
              })
            }
          }

          valueToText(model.profile)
          valueToText([model.combat.dr])
        },
        28: async (model: any) => {
          // Spells description -> text
          if (model.spells) {
            model.spells.filter(x => x.description).forEach(spell => {
              spell.text = spell.description
              delete spell.description
            })
          }
        },
        29: async (model: any) => {
          const abilities = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']
          abilities.forEach(slug => model.abilities[slug].auto = 0)
          model.saves.forEach(save => save.auto = 0)
          model.skills.forEach(skill => skill.auto = 0)
          if (model.custom_skills) {
            model.custom_skills.forEach(skill => skill.auto = 0)
          }
          model.combat.hp.auto = 0
          model.combat.sr.auto = 0
          model.combat.cmb.auto = 0
          model.combat.cmd.auto = 0
          model.combat.speed.auto = 0
          model.combat.init.auto = 0
          model.combat.ac.auto = 0
          model.combat.ac.dex.auto = 0
          model.combat.weight.auto = 0

          // Damage Die
          if (model.weapons) {
            model.weapons.forEach(weapon => {
              weapon.dmg_s = weapon.damage_die || ''
              weapon.dmg_m = weapon.damage_die || ''
            })
          }
        },
        30: async (model: any) => {
          if (model.lists) {
            model.lists.forEach(list => list.special = true)
          }
        },
        31: async (model: any) => {
          model.prefs.tab = 'general'
          if (model.attacks && model.weapons) {
            model.attacks.forEach(attack => {
              const weapon = model.weapons[attack.weapon]
              if (weapon) {
                attack.weapon = weapon.id
              }
            })
          }
        },
      },
      rpg: {
        1: async (model: any) => {
          // Move relational ids to containers
          const tabs = (model.tabs || [])
          const sections = tabs.reduce((acc, tab) => [...acc, ...(tab.sections || [])], [])
          sections.forEach(section => section.entity_ids = [])
          const entities = [
            ...(model.stats || []),
            ...(model.calculations || []),
            ...(model.collections || []),
            ...(model.conditions || []),
          ]
          entities.forEach(entity => {
            const section = sections.find(x => x.id === entity.section)
            if (section) {
              section.entity_ids.push(entity.id)
            }
          })
        },
      },
      'homebrew-kit': {},
      battlemap: {
        15: async (model: any) => {
          // Set ID and pos for all shapes
          if (model.scenes) {
            model.scenes.forEach(scene => {
              if (scene.shapes) {
                scene.shapes.forEach((shape, index) => {
                  shape.id = this.sheetSvc.randomSecureString(12)
                  shape.pos = index
                })
              }
            })
          }
        },

        16: async (model: any) => {
          model.details.active_scene = model.scenes[0].id
        },

        17: async (model: any) => {
          const monsterData = await this.http.getLocalAsPromise('/assets/data/dnd5e/monsters.json')
          const monsters = monsterData.monsters

          if (model.scenes) {
            model.scenes.forEach((scene) => {
              if (!scene.combat) {
                scene.combat = new BattlemapCombat({ round: model.details.round })
              }

              if (scene.tokens) {
                scene.combatants = []
                scene.tokens.forEach(token => {
                  const combatant: any = {
                    sheet_id: token.sheet_id || null,
                    type: token.tool_type || 'custom',
                    token_id: token.id,
                    stats: {
                      hp: token.hp || 0,
                      damage: token.damage || 0,
                      init: token.init || 0,
                    }
                  }

                  if (token.status) {
                    combatant.stats.statuses = [{ text: token.status }]
                  }

                  if (token.monster_id) {
                    const monster = monsters.find(x => x.id === token.monster_id)
                    if (monster) {
                      combatant.type = 'custom'
                      combatant.stats.ac = monster.ac
                      combatant.stats.hp = monster.hp
                      combatant.stats.STR = monster.abilities.STR
                      combatant.stats.DEX = monster.abilities.DEX
                      combatant.stats.CON = monster.abilities.CON
                      combatant.stats.INT = monster.abilities.INT
                      combatant.stats.WIS = monster.abilities.WIS
                      combatant.stats.CHA = monster.abilities.CHA
                      combatant.stats.attacks = monster.attacks || []
                    }
                  }

                  scene.combatants.push(combatant)
                })
              }
            })
          }
          // todo: convert all tokens to combatants?
        },
        18: async (model: any) => {
          const notYetExtractedCombatants = (!model.combatants || model.combatants.length === 0)
          if (notYetExtractedCombatants) {
            model.combatants = []
          }

          if (model.scenes) {
            model.scenes.forEach(scene => {
              const tokens = scene.tokens || []
              scene.combatants = scene.combatants || []

              tokens.forEach(token => {
                const combatant = scene.combatants.find(x => token.id === x.token_id || token.combatant_id === x.id)
                if (combatant) {
                  token.combatant_id = combatant.id || null
                  combatant.name = token.label || combatant.name
                }
              })
              const matchedCombatantIds = tokens.map(x => x.combatant_id)
              scene.combatants.filter(x => !matchedCombatantIds.includes(x.id)).forEach(combatant => {
                combatant.name = combatant.name || 'New Combatant'
              })

              if (notYetExtractedCombatants) {
                model.combatants = [...model.combatants, ...scene.combatants]
              }
            })
          }
        },
      },
      campaign: {
        4: async (model: any) => {
          // Set ID for all chats
          if (model.chats) {
            model.chats.forEach(chat => {
              chat.id = this.sheetSvc.randomSecureString(12);
            })
          }
        },
        5: async (model: any) => {
          // Set author ID for all lists
          if (model.lists) {
            model.lists.forEach(list => list.author_id = this.ownerId)
          }
        },
        6: async (model: any) => {
          if (model.tools) {
            model.tools.forEach(tool => tool.tool_type = tool.type)
          }
        },
      },
    }
  }

  private backupTool = async (id: string, data: any): Promise<any> => {
    const ref = this.db.object(`backups/${id}`);
    return ref.set(data)
  };

  public migrateTool = async (opts: any): Promise<any> => {
    Object.keys(opts).forEach(x => this[x] = opts[x])
    console.log(`${this.toolId} migrating to ${this.finalVersion}`);

    try {
      await this.backupTool(this.toolId, this.toolData)
      console.log('backup complete');
    } catch (error) {
      throw new Error(`Error performing pre-migration backup: ${error}`)
    }

    await this.runMigration(this.toolData.version + 1)

    try {
      await this.toolRef.set(this.toolData)
      console.log(`${this.toolId} successfully migrated`);
    } catch (error) {
      throw new Error(`Error saving migrated data: ${error}`)
    }

    return this.toolData
  };

  private runMigration = async (nextVersion: number): Promise<any> => {
    console.log(`running migration ${nextVersion}`);
    try {
      await this.migrations[this.toolType][nextVersion](this.toolData)
    } catch (error) {
      throw new Error(`Error during migration: ${error}`)
    }

    this.toolData.version = nextVersion;

    if (this.toolData.version === this.finalVersion) {
      return
    } else {
      return await this.runMigration(nextVersion + 1)
    }
  }
}
