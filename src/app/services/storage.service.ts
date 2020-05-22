import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'
import { BtUser } from '../models/common/user.model'
import { AuthService } from './auth.service'
import { Observable, Subject, of } from 'rxjs'
import { Dnd5eCharacter } from '../models/dnd5e/base'
import { PathfinderCharacter } from '../models/pathfinder/base'
import { RpgCharacter } from '../models/rpg/base'
import { BattlemapBase } from '../models/battlemap/base'
import { CampaignBase } from '../models/campaign/base'
import { HomebrewKitBase } from '../models/homebrew-kits/base'
import { Router, NavigationStart } from '@angular/router'
import { take, map, debounceTime, filter, takeWhile, skip, tap, switchMap } from 'rxjs/operators'
// import { FormBuilder } from '@angular/forms'
import { MigrationService } from './migration.service'
import { InterfaceService } from './interface.service'
import { SheetService } from './sheet.service'
import { BtPermission } from '../models/common/permission.model'
import { DicePackage } from '../models/dice/package'
import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { BattlemapSize } from '../models/battlemap/size';
import { BattlemapToken } from '../models/battlemap/token';
import { BtPlayerTool } from '../models/common/player-tool.model';
import { BattlemapCombatant } from '../models/battlemap/combatant';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  playerList: any[]
  base$: Observable<any>
  player$: Observable<any>
  tools: any = {}
  permissions: any = {}
  user: BtUser
  locals: any = {}
  timeouts: any = {}

  constructor(
    public auth: AuthService,
    private db: AngularFireDatabase,
    private router: Router,
    // private fb: FormBuilder,
    private migration: MigrationService,
    public interfaceSvc: InterfaceService,
    private sheetSvc: SheetService,
  ) {
    this.base$ = of(this.user).pipe(
      switchMap((user: BtUser) => {
        if (!!user) {
          return of(user)
        } else {
          return this.auth.user$
        }
      }),
      tap((user: BtUser) => {
        this.user = user
        this.player$ = this.player$ || this.db.list(`players/${user.firebase_id}`).valueChanges()
      }),
    )
  }

  toolPaths: any = {
    dnd5e: {
      title: 'New D&D 5E Sheet',
      db_path: 'dnd5e-sheets',
      web_path: 'dnd5e-sheets',
      // pay_slug: 'dnd5e_paid',
      construct: Dnd5eCharacter,
    },
    pathfinder: {
      title: 'New Pathfinder Sheet',
      db_path: 'pathfinder-sheets',
      web_path: 'pathfinder-sheets',
      // pay_slug: 'pathfinder_paid',
      construct: PathfinderCharacter,
    },
    campaign: {
      title: 'New Campaign',
      db_path: 'campaigns',
      web_path: 'campaigns',
      construct: CampaignBase,
    },
    'homebrew-kit': {
      title: 'New Homebrew Kit',
      db_path: 'homebrew-kits',
      web_path: 'homebrew-kits',
      construct: HomebrewKitBase,
    },
    rpg: {
      title: 'New RPG Sheet',
      db_path: 'rpg-sheets',
      web_path: 'rpg-sheets',
      construct: RpgCharacter,
    },
    battlemap: {
      title: 'New Battlemap',
      db_path: 'battlemaps',
      web_path: 'battlemaps',
      construct: BattlemapBase,
    },
  }

  toolPathsForSlug(slug: string): any {
    return this.toolPaths[slug] || {}
  }

  public createFirebasePermission(docId: string, userId: string, permission: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const permRef = this.db.object(`permissions/${docId}/${userId}`)
      permRef.valueChanges().pipe(
        filter(p => !p),
        take(1),
      ).subscribe((p: any) => {
        permRef.set(permission)
        console.log(`new permission created for document: ${docId}, for user: ${userId}`)
        resolve()
      }, reject)
    })
  }

  public async listFirebasePermissions(docId): Promise<BtPermission[]> {
    return new Promise((resolve, reject) => {
      if (!this.permissions[docId]) {
        // don't use angularfire here, switch to raw firebase
        // or better yet, make the whole tool creation process an observable
        this.documentPermissions$(docId).pipe(
          take(1)
        ).subscribe((list: any[]) => {
          // Cache the permissions if there are any
          if (list.length > 0) {
            this.permissions[docId] = { array: list }
          }
          resolve(list)
        }, reject)
      } else {
        resolve(this.permissions[docId].array)
      }
    })
  }

  public documentPermissions$ = (docId): Observable<BtPermission[]> => {
    return this.db.object(`permissions/${docId}`).valueChanges().pipe(
      map(listObj => {
        listObj = listObj || {}
        return Object.keys(listObj).map(x => {
          return Object.assign({}, listObj[x], { id: x })
        })
      })
    )
  }

  public async userById(userId: string): Promise<BtUser> {
    return new Promise((resolve, reject) => {
      // don't use angularfire here, switch to raw firebase
      // or better yet, make the whole tool creation process an observable
      this.db.object(`users/${userId}`).valueChanges().pipe(
        take(1),
      ).subscribe((user: BtUser) => {
        resolve(user)
      }, reject)
    })
  }

  public async findUserByEmail(email: string): Promise<BtUser> {
    return new Promise((resolve, reject) => {
      // don't use angularfire here, switch to raw firebase
      // or better yet, make the whole tool creation process an observable
      this.db.list('users', ref => ref.orderByChild('email').equalTo(email).limitToFirst(1)).valueChanges().pipe(
        take(1),
      ).subscribe((users: BtUser[]) => {
        resolve(users[0])
      }, resolve)
    })
  }

  public async destroyUser(userId: string): Promise<void> {
    const tools: BtPlayerTool[] = await new Promise((resolve) => {
      this.db.list(`players/${userId}`).valueChanges().pipe(take(1)).subscribe((x: BtPlayerTool[]) => resolve(x))
    })
    tools.filter((tool: BtPlayerTool) => tool.role === 'owner').forEach(async (tool: BtPlayerTool) => {
      await this.deleteFirebaseTool(tool.id, tool.tool_type, userId)
    })
    tools.filter((tool: BtPlayerTool) => tool.role !== 'owner').forEach(async (tool: BtPlayerTool) => {
      await this.deleteFirebaseUserPermission(tool.id, userId)
    })
    await this.db.object(`players/${userId}`).remove()
    await this.db.object(`users/${userId}`).remove()
    console.log(`${userId} destroyed completely`)
  }

  private async checkFirebasePermissions(docId: string, userId: string): Promise<any> {
    return await this.listFirebasePermissions(docId).then(array => {
      const exists = array.length > 0
      const permission = array.find(x => x.id === userId)
      const owner = array.find(x => x.role === 'owner')

      return {
        writer: permission && (permission.role === 'owner' || permission.role === 'writer'),
        exists,
        role: permission ? permission.role : 'reader',
        owner_id: owner ? owner.id : null
      }
    })
  }

  public deleteFirebaseTool = async (docId: string, toolType: string, userId: string): Promise<any> => {
    const paths = this.toolPathsForSlug(toolType)
    const ref = this.db.object(`${paths.db_path}/${docId}`)
    try {
      await ref.remove()
    } catch {
      // if it fails, we just remove the tool from the dashboard
      return await this.deleteFirebaseToolFromPlayer(docId, userId)
    }
    await this.deleteFirebaseToolFromPlayer(docId, userId)
    return await this.deleteFirebaseToolPermissions(docId)
  }

  public deleteFirebaseToolFromPlayer = (docId: string, userId: string): Promise<any> => {
    return this.db.object(`players/${userId}/${docId}`).remove()
  }

  // Deletes all permissions for a tool
  public deleteFirebaseToolPermissions = (docId: string): Promise<any> => {
    return this.db.object(`permissions/${docId}`).remove().then(() => {
      if (this.permissions[docId]) {
        delete this.permissions[docId]
      }
    })
  }

  // Deletes single permission for one user for a tool
  public deleteFirebaseUserPermission = (docId: string, userId: string): Promise<any> => {
    return this.db.object(`permissions/${docId}/${userId}`).remove()
  }

  private async setupToolAssociations(toolType: string, docId: string, userId: string, permission: any, toolTitle?: string): Promise<any> {
    // After creating the permission, we have to chain adding
    // the data in /players/ which will allow the dashboard to list
    // all documents without querying
    await this.createFirebasePermission(docId, userId, permission)
    await this.addNewToolToFirebasePlayer(toolType, docId, userId, permission.role, toolTitle)
    return
  }

  public updatePlayerToolTitle(userId: string, docId: string, title: string): void {
    clearTimeout(this.timeouts[docId])
    this.timeouts[docId] = setTimeout(() => this.updatePlayerProperties(userId, docId, { title }), 2000)
  }

  public updatePlayerProperties(userId: string, docId: string, props: any): void {
    const docRef = this.db.object(`players/${userId}/${docId}`)
    props.updated_at = Date.now()
    docRef.update(props)
  }

  public getHomebrewKit(docId): Observable<any> {
    return this.db.object(`homebrew-kits/${docId}`).valueChanges()
  }

  public addNewToolToFirebasePlayer(toolType: string, docId: string, userId: string, role: string, toolTitle?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const permRef = this.db.object(`players/${userId}/${docId}`)
      permRef.valueChanges().pipe(
        take(1),
      ).subscribe((document: any) => {
        const now = Date.now()
        document = {}
        document.id = docId
        document.role = role
        document.title = toolTitle || this.toolPathsForSlug(toolType).title
        document.tool_type = toolType
        document.created_at = now
        document.updated_at = now
        permRef.set(document)
        resolve()
      }, reject)
    })
  }

  private createFirebaseTool = async (toolType: string, userId: string): Promise<void> => {
    const paths = this.toolPathsForSlug(toolType)
    const newDocId = this.sheetSvc.randomSecureString(this.sheetSvc.randomNumber(28, 35))
    const list = await this.listFirebasePermissions(newDocId)

    // This checks to see if any permissions for this tool already exist
    // If it finds the permission already, we aren't
    // creating a new tool so it rerolls the newDocId
    if (list.length !== 0) {
      return await this.createFirebaseTool(toolType, userId)
    }

    const permission = {
      role: 'owner',
      email: this.user.email,
      name: this.user.name,
    }

    await this.setupToolAssociations(
      toolType,
      newDocId,
      userId,
      permission,
    )
    this.router.navigate([`/${paths.web_path}/${newDocId}`])
  }

  public snapshotOfDocument = (path: string, docId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.db.object(`${path}/${docId}`).valueChanges().pipe(take(1)).subscribe(resolve, reject)
    })
  }

  public copyFirebaseTool = async (sourceDocId: string, toolType: string, userId: string, toolTitle: string): Promise<any> => {
    const targetDocId = this.sheetSvc.randomSecureString(this.sheetSvc.randomNumber(28, 35))
    const paths = this.toolPathsForSlug(toolType)
    const list = await this.listFirebasePermissions(targetDocId)

    // This checks to see if any permissions for this tool already exist
    // If it finds the permission already, we aren't
    // creating a new tool so it rerolls the id
    if (list.length !== 0) {
      return await this.copyFirebaseTool(sourceDocId, toolType, userId, toolTitle)
    }

    await this.setupToolAssociations(
      toolType,
      targetDocId,
      userId,
      {
        role: 'owner',
        email: this.user.email,
        name: this.user.name,
      },
      `Copy of ${toolTitle}`,
    )

    const source: any = await this.snapshotOfDocument(paths.db_path, sourceDocId)
    const targetRef = this.db.object(`${paths.db_path}/${targetDocId}`)
    source.name = `Copy of ${source.name}`
    return await targetRef.set(source)
  }

  // private buildFormArray = (list) => {
  //   const shell = this.fb.array([])
  //   list.forEach(item => {
  //     shell.push(this.buildFormObject(item))
  //   })
  //   return shell
  // }

  // private buildFormObject = model => {
  //   const shell = {}
  //   Object.keys(model.getProto()).forEach(key => {
  //     if (model[key] !== undefined && model[key] !== null) {
  //       if (Array.isArray(model[key]) && model[key].length > 0 && typeof model[key][0] !== 'object') {
  //         shell[key] = this.buildFormArray(model[key])
  //       } else if (typeof model[key] === 'object' && !Array.isArray(model[key])) {
  //         shell[key] = this.buildFormObject(model[key])
  //       } else {
  //         shell[key] = model[key]
  //       }
  //     }
  //   })
  //   return this.fb.group(shell)
  // }

  private firstOpenToolOfType = (toolType: string): any => {
    return Object.values(this.tools).find((tool: any) => tool.meta.toolType === toolType && tool.meta.watching)
  }

  public addCharacterAsToken = (character: any, toolType: string): void => {
    const battlemap = this.firstOpenToolOfType('battlemap')
    if (!battlemap) { return }


    const combatant = new BattlemapCombatant({
      sheet_id: character.locals.document_id,
      type: toolType,
    })

    const token = new BattlemapToken({
      combatant_id: combatant.id,
      owner_id: this.user.firebase_id,
      label: character.model.name,
      image: character.model.basic.image,
    })

    const scene = battlemap.methods.getFirstBattleScene()
    if (scene) {
      battlemap.methods.addCombatant(token, combatant)
      battlemap.methods.addSceneToken(scene, token)
    }
  }

  public addMonsterAsToken = (monster: any): void => {
    const battlemap = this.firstOpenToolOfType('battlemap')
    if (!battlemap) { return }

    const scene = battlemap.methods.getCurrentScene()

    const combatant = new BattlemapCombatant({
      type: 'custom',
      name: monster.name,
      stats: {
        ac: monster.ac,
        hp: monster.hp,
        STR: monster.abilities.STR,
        DEX: monster.abilities.DEX,
        CON: monster.abilities.CON,
        INT: monster.abilities.INT,
        WIS: monster.abilities.WIS,
        CHA: monster.abilities.CHA,
        attacks: monster.attacks || [],
      }
    })

    const token = new BattlemapToken({
      combatant_id: combatant.id,
      label: monster.name,
      size: new BattlemapSize({
        name: monster.size.toLowerCase(),
      }),
    })

    if (monster.image) {
      token.image = `/assets/img/monsters/${monster.image}`
      token.color = 'white'
    }

    if (scene) {
      const size = battlemap.locals.sizeLookups[scene.scene_type][token.size.name]
      if (size) {
        token.size.width = size.width
        token.size.height = size.height
      }
      battlemap.methods.addSceneToken(scene, token)
      battlemap.methods.addCombatant(null, combatant)
      this.interfaceSvc.showNotice(`${monster.name} added to ${battlemap.model.name}.`)
    }
  }

  public addRollsToChat = (packs: DicePackage[], name: string): void => {
    const campaign = Object.keys(this.tools).map(key => this.tools[key]).find(tool => tool.meta.toolType === 'campaign' && tool.meta.watching)
    if (!campaign) { return }

    campaign.methods.addRollToChat({
      player_id: this.user.firebase_id,
      name,
      packs,
    })
  }

  public sendInitiativeToMap = (init: number, id: string): void => {
    const battlemap = this.firstOpenToolOfType('battlemap')
    if (!battlemap) { return }

    const combatant = battlemap.methods.listCombatants().find(x => x.sheet_id === id)

    if (combatant) {
      battlemap.methods.setCombatantInit(combatant, init)
    }
  }

  public getOpenCampaignId = (): string => {
    const campaign = this.firstOpenToolOfType('campaign')
    return campaign ? campaign.model.id : null
  }

  public isToolOpen = (id: string): boolean => {
    return this.tools[id] && this.tools[id].meta.watching
  }

  public anyCampaignOpen = (): boolean => {
    return !!this.firstOpenToolOfType('campaign')
  }

  public monsterById = (id: string): any => {
    const campaign = this.firstOpenToolOfType('campaign')
    if (campaign && campaign.locals.monsters) {
      return campaign.locals.monsters.find(x => x.id === id)
    }
  }

  public addCustomRollToChat = (text: string): void => {
    const campaign = Object.keys(this.tools).map(key => this.tools[key]).find(tool => tool.meta.toolType === 'campaign' && tool.meta.watching)
    if (!campaign) { return }
    campaign.methods.addCustomRollToChat(text, this.user.firebase_id)
  }

  public setupToolController = async (self: any, toolType: string, sourceKey: string, playerPipe: any[]): Promise<void> => {
    const debounceDelay = 5000
    const maxUndefined = 20
    const paths = this.toolPathsForSlug(toolType)

    const clearChanges = (slug: string): void => {
      self.meta[slug] = {
        list: [],
        lookup: {},
        id: null,
      }
    }

    // we should split this up so one function gets run from controller
    // and others get run from elsewhere
    const loadModel = async (): Promise<any> => {
      // Initialize
      console.log('%cschema loaded', 'color: #aaa')
      clearChanges('localChanges')
      clearChanges('remoteChanges')

      // Paid Product
      self.locals.full_access = self.locals.product_is_premium ? this.user[paths.pay_slug] : true

      // Check and create document if necessary
      if (!self.locals.document_id) {
        return await this.createFirebaseTool(
          toolType,
          this.user.firebase_id,
        )
      }

      // checking permissions/doc_id to see if the tool has a permissions file
      // the assumption is that if it's a legit create, it would have a permissions file by now
      self.locals.permission = await this.checkFirebasePermissions(
        self.locals.document_id,
        this.user.firebase_id,
      )

      // Permissions exists, which means it's legit
      if (self.locals.permission.exists) {
        self.meta.remoteRef = this.db.object(`${paths.db_path}/${self.locals.document_id}`)
        self.meta.document$ = self.meta.remoteRef.valueChanges()

        try {
          await firstDocumentRead()
          onDocumentLoaded()
        } catch (error) {
          onDocumentError(error)
        }
      }

      // This prevents people from putting garbage into the url and making a sheet out of it
      if (!self.locals.permission.exists) {
        this.interfaceSvc.showAlert(`<h2 class='h20 bm-10'>Tool Not Found</h2><div class='bm-20'>We couldn't find a tool with this ID. It has either been deleted, or never existed. Sorry!</div>`)
        this.router.navigate(['/dashboard'])
      }
    }

    const onRemoteUpdate = (val: any): void => {
      console.log(`%cremote update for ${self.locals.document_id}`, 'color: #aaa')
      self.meta.combinedSubject.next()
      self.meta.collectionSubject.next(Object.keys(self.meta.remoteChanges.lookup).filter(x => !['id', 'changes'].includes(x)))
      // self.meta.remoteChanges.id = this.sheetSvc.randomSecureString(6)
      self.model.updateModel(val, self.meta.remoteChanges, self.meta.localChanges)
      self.remote = val
    }

    const onLocalChange = (): void => {
      // console.log('%cwill save local change', 'color: green')
      clearChanges('remoteChanges')
      saveToFirebase()
    }

    // don't save local changes if we just have one change and it's last editor ID
    // to avoid infinite change loops between simultanious sessions
    // we also check the last batch of remote changes
    // to see if this local change is remote changes being applied
    const shouldSaveLocalChanges = (): boolean => {
      const actualChanges = self.meta.localChanges.list.length > 0
      const moreThanChangeId = !self.meta.localChanges.list.includes('base.change_id') || self.meta.localChanges.list.length > 1
      // console.log({ actualChanges, moreThanChangeId })
      return actualChanges && moreThanChangeId
    }

    const onDocumentLoaded = (): void => {
      // Once we load or create read only data, we can subscribe to remote updates
      if (self.not_found) { return }

      self.meta.watching = true
      watchPlayer()
      watchPermissions()
      if (self.meta.remoteSub) {
        self.meta.remoteSub.unsubscribe()
      }
      self.meta.remoteSub = self.meta.document$.pipe(
        takeWhile(() => self.meta.watching),
        skip(1),
        tap(() => clearChanges('remoteChanges')),
        filter((val: any) => {
          if (self.meta.debouncing) {
            self.model.compareChanges(self.remote, self.meta.localChanges.list, self.meta.localChanges.lookup, 'base')
            // console.log('local changes: ', self.meta.localChanges.list.join('\n'))
          }
          self.remote = val
          return val.change_id !== self.meta.localChanges.id || !self.meta.localChanges.id
        }),
        filter((val: any) => {
          self.model.compareChanges(val, self.meta.remoteChanges.list, self.meta.remoteChanges.lookup, 'base', true)
          // ignore remote changes that have pending local changes
          // console.log('remote changes: ', self.meta.remoteChanges.list.join('\n'))
          return self.meta.remoteChanges.list.length > 0 && (self.meta.remoteChanges.list.length > 1)
        }),
      ).subscribe(onRemoteUpdate, () => {}, clearChanges('remoteChanges'))

      if (!self.locals.permission.writer) {
        this.interfaceSvc.showNotice('This is a read-only document. Any changes you make will not be saved.')
        return
      }

      // And publish local updates if we have write access
      if (self.meta.localSub) {
        self.meta.localSub.unsubscribe()
      }
      self.meta.localSub = self.meta.localSubject.pipe(
        filter(() => self.locals.permission.writer),
        takeWhile(() => self.meta.watching),
        tap(() => self.meta.debouncing = true),
        debounceTime(debounceDelay),
        tap(() => self.meta.debouncing = false),
        filter(() => {
          self.model.compareChanges(self.remote, self.meta.localChanges.list, self.meta.localChanges.lookup, 'base')
          // console.log('local changes: ', self.meta.localChanges.list.join('\n'))
          const shouldSave = shouldSaveLocalChanges()
          if (!shouldSave) { clearChanges('localChanges') }
          return shouldSave
        })
      ).subscribe(onLocalChange, () => {}, clearChanges('localChanges'))
      this.updatePlayerToolTitle(this.user.firebase_id, self.locals.document_id, self.model.name)
    }

    const onDocumentError = (error: any): void => {
      console.error(error)
      this.interfaceSvc.showAlert(`There was an error loading this tool. Check the JavaScript Console for more details and let us know what happened <a href="https://www.reddit.com/r/beyondtabletop">on the subreddit</a>.`)
    }

    const firstDocumentRead = async (): Promise<void> => {
      return new Promise((resolve, reject) => {
        self.meta.document$.pipe(
          take(1),
        ).subscribe(async val => {
          const currentVersion = self.model.getProto().version
          self.remote = val

          // This case is unusual, it means permissions exist, but the document
          // doesn't AND the current user doesn't have write permissions
          if (val === null && !self.locals.permission.writer) {
            self.not_found = true
            return reject('Ghost document error')
          }

          // If remote document is undefined, we save the empty schema data
          if (val === null) {
            console.log('document data doesn\'t exist, creating it now')
            self.remote = self.model.databaseSafe()
            await saveToFirebase()
            self.methods.onModelReady()
            return resolve()
          }

          // If remote version is below the model version, migrate
          if (val.version < currentVersion) {
            try {
              const data = await this.migration.migrateTool({
                toolId: self.locals.document_id,
                toolType,
                toolData: val,
                toolRef: self.meta.remoteRef,
                finalVersion: currentVersion,
                ownerId: self.locals.permission.owner_id,
              })
              onModelLoaded(data)
              return resolve()
            } catch (error) {
              return reject(error)
            }
          }

          if (val.version > currentVersion) {
            return reject(`Load error: This tool is running on a future version that the site cannot support.`)
          }

          // Otherwise we just load the data
          onModelLoaded(val)
          resolve()
        })
      })
    }

    const onModelLoaded = (data: any): void => {
      console.log('%cmodel loaded', 'color: #aaa')
      data.id = self.locals.document_id
      self.model = new paths.construct(data)
      self.methods.onModelReady()
    }

    const saveToFirebase = async (): Promise<void> => {
      if (this.locals.migration_now) {
        this.interfaceSvc.showAlert(`Your local changes cannot be saved while a migration is in process. Migrations usually take between 2-5 minutes. If you're still seeing this error after 5 minutes please refresh the page. If you still see this error after that let us know <a href="https://www.reddit.com/r/beyondtabletop">on the subreddit</a>!`)
        clearChanges('localChanges')
        return
      }
      if (self.model.getProto().version > self.model.version) {
        this.interfaceSvc.showAlert(`Looks like a background migration got reverted while you had this document open in more than one place. Close out this document on all machines and try again.`)
        clearChanges('localChanges')
        return
      }

      // Set change ID to compare remote changes to
      const preparedModel = self.model.databaseSafe()
      checkFileSize(preparedModel)
      self.meta.localChanges.id = this.sheetSvc.randomSecureString(6)
      preparedModel.change_id = self.meta.localChanges.id

      try {
        await self.meta.remoteRef.set(preparedModel)
        clearChanges('localChanges')
        console.log('%csheet saved to firebase', 'color: #aaa')
      } catch (error) {
        handleSaveError(error)
      }
    }

    const checkFileSize = (model: any): void => {
      let cache = []
      const str = JSON.stringify(model, (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1) {
            // Duplicate reference found
            try {
              // If this value does not reference a parent it can be deduped
              return JSON.parse(JSON.stringify(value))
            } catch (error) {
              // discard key if value cannot be deduped
              return
            }
          }
          // Store value in our collection
          cache.push(value)
        }
        return value
      })
      cache = null
      const file_size = str.length

      // above 500k is too high
      if (file_size > 500000 && !model.oversized) {
        const ref = this.db.object(`oversized-files/${self.locals.document_id}`)
        ref.set(file_size).then(() => model.oversized = true)
      }
    }

    const shouldAttemptToFixUndefinedError = (message: string): boolean => {
      return message.indexOf('Reference.set failed: First argument contains undefined') !== -1 && self.meta.undefinedErrorCount < maxUndefined
    }

    const handleSaveError = (error: any): void => {
      console.log('error saving sheet')
      clearChanges('localChanges')

      if (shouldAttemptToFixUndefinedError(error.message)) {
        console.log('attempting to fix undefined error')
        handleUndefinedError(error.message.replace('Reference.set failed: First argument contains undefined in property ', ''))
      } else {
        this.interfaceSvc.showAlert(`Error saving to Firebase: ${error.message}`)

        self.error = error.message
        console.log(error.message)
      }
    }

    const handleUndefinedError = (path: string): void => {
      self.meta.undefinedErrorCount += 1
      let parent = self.model
      const webPaths = path.replace(/\'/gi, '').split('.')
      const undefined_property = webPaths.pop()

      // Remove the first two segments of the path
      // which specify tool type and tool ID
      webPaths.shift()
      webPaths.shift()

      webPaths.forEach(p => parent = parent[p])

      parent[undefined_property] = null
      return
    }

    const riseFromYourGrave = (): void => {
      if (!self.meta.watching) {
        console.log('RISING FROM THE GRAVE')
        clearChanges('localChanges')
        clearChanges('remoteChanges')
        self.locals.ready = false
        self.methods.onUnfrozen()
        onDocumentLoaded()
      }
    }

    const watchRouting = (): void => {
      this.router.events.pipe(
        filter(event => event instanceof NavigationStart),
        take(1),
      ).subscribe(() => self.meta.watching = false)
    }

    const watchPlayer = (): void => {
      if (!playerPipe) { return }
      if (self.meta.playerSub) {
        self.meta.playerSub.unsubscribe()
      }

      self.meta.playerSub = this.player$.pipe(
        takeWhile(() => self.meta.watching),
        pipeFromArray(playerPipe),
      ).subscribe()
    }

    const watchPermissions = (): void => {
      if (self.meta.docPermissionsSub) {
        self.meta.docPermissionsSub.unsubscribe()
      }

      self.meta.docPermissionsSub = this.documentPermissions$(self.locals.document_id).pipe(
        takeWhile(() => self.meta.watching)
      ).subscribe(permissions => {
        self.locals.documentPermissions = permissions
      })
    }

    const initialize = async (): Promise<void> => {
      if (this.tools[self.locals.document_id]) {
        self = this.tools[self.locals.document_id]
      } else if (self.locals.document_id) {
        this.tools[self.locals.document_id] = self
        self.locals.user = this.user
        self.meta.toolType = toolType
        self.meta.localSubject = new Subject()
        self.meta.combinedSubject = new Subject()
        self.meta.collectionSubject = new Subject()
        self.touch = () => {
          self.meta.localSubject.next()
          self.meta.combinedSubject.next()
        }
      }
      watchRouting()

      self.meta.sessionId = this.sheetSvc.randomSecureString(6)
      if (!self.meta.sources.includes(sourceKey)) {
        self.meta.sources.push(sourceKey)
      }

      if (!!self.meta.remoteRef) {
        riseFromYourGrave()
      } else {
        await loadModel()
      }
    }

    await initialize()
  }
}
