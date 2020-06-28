import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/database'
import { BtUser } from '../models/common/user.model'
import { AuthService } from './auth.service'
import { Observable, Subject, of, throwError, merge, iif, Subscription, from } from 'rxjs'
import { Dnd5eCharacter } from '../models/dnd5e/base'
import { PathfinderCharacter } from '../models/pathfinder/base'
import { RpgCharacter } from '../models/rpg/base'
import { BattlemapBase } from '../models/battlemap/base'
import { CampaignBase } from '../models/campaign/base'
import { HomebrewKitBase } from '../models/homebrew-kits/base'
import { Router, NavigationStart } from '@angular/router'
import { take, map, debounceTime, filter, takeWhile, skip, tap, switchMap, mergeMap, catchError } from 'rxjs/operators'
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
import { BtError } from '../models/common/error'
import { CampaignFoe } from '../models/campaign/foe'
import { BattlemapCombatantAttack } from '../models/battlemap/combatant-attack'

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

  public createFirebasePermission$(docId: string, userId: string, permission: any): Observable<any> {
    const permRef = this.db.object(`permissions/${docId}/${userId}`)
    return permRef.valueChanges().pipe(
      filter(p => !p),
      take(1),
      switchMap(() => {
        console.log(`new permission created for document: ${docId}, for user: ${userId}`)
        return from(permRef.set(permission))
      }),
      map(() => permission)
    )
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

  private userPermissionForDocument$(docId: string, userId: string): Observable<any> {
    return this.documentPermissions$(docId).pipe(
      map(permissions => {
        const exists = permissions.length > 0
        const permission = permissions.find(x => x.id === userId)
        const owner = permissions.find(x => x.role === 'owner')

        return {
          writer: permission && (permission.role === 'owner' || permission.role === 'writer'),
          exists,
          role: permission ? permission.role : 'reader',
          owner_id: owner ? owner.id : null
        }
      }),
      take(1),
    )
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
    try {
      return this.db.object(`permissions/${docId}`).remove()
    } catch {
      return Promise.resolve()
    }
  }

  // Deletes single permission for one user for a tool
  public deleteFirebaseUserPermission = (docId: string, userId: string): Promise<any> => {
    return this.db.object(`permissions/${docId}/${userId}`).remove()
  }

  private setupToolAssociations$(toolType: string, docId: string, userId: string, permission: any, toolTitle?: string): Observable<any> {
    // After creating the permission, we have to chain adding
    // the data in /players/ which will allow the dashboard to list
    // all documents without querying
    return this.createFirebasePermission$(docId, userId, permission).pipe(
      switchMap(p => {
        return this.addNewToolToFirebasePlayer$(toolType, docId, userId, p.role, toolTitle)
      })
    )
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

  public addNewToolToFirebasePlayer$(toolType: string, docId: string, userId: string, role: string, toolTitle?: string): Observable<any> {
    const permRef = this.db.object(`players/${userId}/${docId}`)
    return permRef.valueChanges().pipe(
      take(1),
      tap(async (document: any) => {
        const now = Date.now()
        document = {}
        document.id = docId
        document.role = role
        document.title = toolTitle || this.toolPathsForSlug(toolType).title
        document.tool_type = toolType
        document.created_at = now
        document.updated_at = now
        await permRef.set(document)
      }),
    )
  }

  private createFirebaseTool$ = (toolType: string, userId: string): Observable<any> => {
    const paths = this.toolPathsForSlug(toolType)
    const newDocId = this.sheetSvc.randomSecureString(this.sheetSvc.randomNumber(28, 35))
    return this.documentPermissions$(newDocId).pipe(
      take(1),
      switchMap(permissions => {
        // This checks to see if any permissions for this tool already exist
        // If it finds the permission already, we aren't
        // creating a new tool so it rerolls the newDocId
        if (permissions.length !== 0) {
          console.log(permissions)
          return this.createFirebaseTool$(toolType, userId)
        } else {
          return of({
            role: 'owner',
            email: this.user.email,
            name: this.user.name,
          })
        }
      }),
      // This is to filter out the recursive shit
      filter(permission => !!permission),
      switchMap(permission => {
        return this.setupToolAssociations$(
          toolType,
          newDocId,
          userId,
          permission,
        )
      }),
      take(1),
      tap(() => {
        this.router.navigate([`/${paths.web_path}/${newDocId}`])
      }),
      map(() => false),
    )
  }

  public snapshotOfDocument$ = (path: string, docId: string): Observable<any> => {
    return this.db.object(`${path}/${docId}`).valueChanges().pipe(take(1))
  }

  public copyFirebaseTool$ = (sourceDocId: string, toolType: string, userId: string, toolTitle: string): Observable<any> => {
    const targetDocId = this.sheetSvc.randomSecureString(this.sheetSvc.randomNumber(28, 35))
    const paths = this.toolPathsForSlug(toolType)

    const associations$ = this.setupToolAssociations$(
      toolType,
      targetDocId,
      userId,
      {
        role: 'owner',
        email: this.user.email,
        name: this.user.name,
      },
      `Copy of ${toolTitle}`,
    ).pipe(map(x => true))

    return this.documentPermissions$(targetDocId).pipe(
      take(1),
      switchMap((list) => {
        // This checks to see if any permissions for this tool already exist
        // If it finds the permission already, we aren't
        // creating a new tool so it rerolls the id
        if (list.length !== 0) {
          return this.copyFirebaseTool$(sourceDocId, toolType, userId, toolTitle)
        }
        return associations$
      }),
      filter(x => x),
      switchMap(() => this.snapshotOfDocument$(paths.db_path, sourceDocId)),
      tap(async (source) => {
        const targetRef = this.db.object(`${paths.db_path}/${targetDocId}`)
        source.name = `Copy of ${source.name}`
        await targetRef.set(source)
      }),
      map(x => false)
    )
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

  public addCharacterAsTokenById = (docId: string): void => {
    const tool = this.tools[docId]
    if (!tool || !tool.meta.watching) { return }
    this.addCharacterAsToken(tool, tool.meta.toolType)
  }

  public addCharacterAsToken = (character: any, toolType: string): void => {
    const battlemap = this.firstOpenToolOfType('battlemap')
    if (!battlemap) { return }

    let combatant = battlemap.methods.combatantForSheetId(character.locals.document_id)
    const newCombatant = !combatant

    if (newCombatant) {
      combatant = new BattlemapCombatant({
        sheet_id: character.locals.document_id,
        type: toolType,
      })
    }

    const token = new BattlemapToken({
      combatant_id: combatant.id,
      owner_id: this.user.firebase_id,
      label: character.model.name,
      image: character.model.basic.image,
    })

    const scene = battlemap.methods.getFirstBattleScene()
    if (scene) {
      if (newCombatant) {
        battlemap.methods.addCombatant(token, combatant)
      }
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

  public addEnemyAsToken = (foe: CampaignFoe): void => {
    const battlemap = this.firstOpenToolOfType('battlemap')
    if (!battlemap) { return }

    const scene = battlemap.methods.getCurrentScene()

    const details = foe.details || []
    const abilitiesArray = details.filter(x => x.group === 'abilities')
    const abilities: any = {}

    abilitiesArray.forEach(x => abilities[x.name] = x)

    const combatant = new BattlemapCombatant({
      type: 'custom',
      name: foe.name,
      stats: {
        ac: (details.find(x => x.name === 'AC') || { value: 0 }).value,
        hp: (details.find(x => x.name === 'HP') || { value: 0 }).value,
        STR: abilities.STR.value,
        DEX: abilities.DEX.value,
        CON: abilities.CON.value,
        INT: abilities.INT.value,
        WIS: abilities.WIS.value,
        CHA: abilities.CHA.value,
        attacks: details.filter(x => x.group === 'attack').map(x => new BattlemapCombatantAttack({ name: x.name, attack: x.value, damage: x.misc })) || [],
      }
    })

    const token = new BattlemapToken({
      combatant_id: combatant.id,
      label: foe.name,
    })

    if (foe.image) {
      token.image = foe.image
      token.color = 'white'
    }

    if (scene) {
      battlemap.methods.addSceneToken(scene, token)
      battlemap.methods.addCombatant(null, combatant)
      this.interfaceSvc.showNotice(`${foe.name} added to ${battlemap.model.name}.`)
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

  public setupToolController = (self: any, toolType: string, playerPipe = [], permissionsPipe = []): Observable<any> => {
    const debounceDelay = 500
    const maxUndefined = 20
    const paths = this.toolPathsForSlug(toolType)
    self.meta.toolType = toolType
    self.meta.localSubject = new Subject()
    self.meta.combinedSubject = new Subject()
    self.meta.collectionSubject = new Subject()

    const clearChanges = (slug: string): void => {
      self.meta[slug] = {
        list: [],
        lookup: {},
        id: null,
      }
    }

    const loadingError$ = (error: BtError): Observable<any> => {
      console.error(error)

      const toolNotFoundError = `<h2 class='h20 bm-10'>Tool Not Found</h2><div class='bm-20'>We couldn't find a tool with this ID. It has either been deleted, or never existed. Sorry!</div>`

      switch (error.code) {
        case 1001: {
          this.interfaceSvc.showAlert(toolNotFoundError)
          this.router.navigate(['/dashboard'])
          return of(null)
        }
        case 666: {
          this.interfaceSvc.showAlert(toolNotFoundError)
          this.router.navigate(['/dashboard'])
          return of(null)
        }
        // future version error
        case 2077: {
          this.interfaceSvc.showAlert(error.message)
          this.router.navigate(['/dashboard'])
          return of(null)
        }
        // migration error
        case 1015: {
          this.interfaceSvc.showAlert(error.message)
          this.router.navigate(['/dashboard'])
          return of(null)
        }
        default: {
          this.interfaceSvc.showAlert(`There was an error loading this tool. Check the JavaScript Console for more details and let us know what happened <a href="https://www.reddit.com/r/beyondtabletop">on the subreddit</a>.`)
          return of(null)
        }
      }
    }

    const runtimeError$ = (error: BtError): Observable<any> => {
      console.error(error)
      this.interfaceSvc.showAlert(error.message)
      return of(null)
    }

    // STEP 4.2
    const onModelLoaded = (data: any): void => {
      console.log('%cmodel loaded', 'color: #aaa')
      data.id = self.locals.document_id
      self.model = new paths.construct(data)
      self.methods.onModelReady()
    }

    // STEP 4.1
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

    // STEP 4.0: We pass in the unwrapped value from the document here. First
    // we set the raw object as self.remote. If the value is null, it means we
    // just created the document, and we need to save default object to the db.
    // There's also an edge case where there's no document but there is a
    // permission, but we don't have permission to write to it. In this case we
    // just throw an error.
    //
    // If document version is lower than the current version, we have to
    // migrate. Each document type has its own migrations which are handled
    // in a separate service. If the migration runs successfully, we run
    // onModelLoaded and return. If the document is higher than the current
    // verison, it means that I accidentally opened a dev document on
    // production, and we return an error.
    //
    // Finally if the versions match we run onModelLoaded and return
    const firstDocumentRead = async (val): Promise<any> => {
      return new Promise(async (resolve, reject) => {
        const currentVersion = self.model.getProto().version
        self.remote = val

        // This case is unusual, it means permissions exist, but the document
        // doesn't AND the current user doesn't have write permissions
        if (val === null && !self.locals.permission.writer) {
          return reject({ code: 666, message: 'Ghost document error' })
        }

        // If remote document is undefined, we save the empty schema data
        if (val === null) {
          console.log('document data doesn\'t exist, creating it now')
          self.remote = self.model.databaseSafe()
          await saveToFirebase()
          self.methods.onModelReady()
          return resolve(true)
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
            return resolve(true)
          } catch (error) {
            console.log(error)
            return reject({ code: 1015, message: error })
          }
        }

        if (val.version > currentVersion) {
          return reject({ code: 2077, message: 'Load error: This tool is running on a future version that the site cannot support.' })
        }

        // Otherwise we just load the data
        onModelLoaded(val)
        resolve(true)
      })
    }

    // STEP 2.0a: Set defaults for changes then checks if the controller passed
    // in a document ID or not. If not, we create the document with Step 3.0a
    //
    // If we have an ID, then we grab the single permission for the document
    // for our user ID. Once we have that, we check to see if permissions
    // exist for the document, and what our access is. If permissions exist,
    // that means the document ID is valid, and we can proceed. Otherwise, it
    // means someone typed garbage into the URL to make a cool custom document.
    // In this case we return an error.
    //
    // If we're all good, then we pass the firebase valueChanges observable for
    // the document to the next step, which attempts to read the document once.
    // If successful, we return true. Otherwise throw error.
    const loadModel$ = (): Observable<any> => {
      // Initialize
      console.log('%cschema loaded', 'color: #aaa')
      clearChanges('localChanges')
      clearChanges('remoteChanges')

      // Check and create document if necessary
      if (!self.locals.document_id) {
        return this.createFirebaseTool$(
          toolType,
          this.user.firebase_id,
        )
      }

      // checking permissions/doc_id to see if the tool has a permissions file
      // the assumption is that if it's a legit create, it would have a permissions file by now
      return this.userPermissionForDocument$(
        self.locals.document_id,
        this.user.firebase_id,
      ).pipe(
        switchMap(permission => {
          // Permissions exists, which means it's legit
          if (permission.exists) {
            self.locals.permission = permission
            self.meta.remoteRef = this.db.object(`${paths.db_path}/${self.locals.document_id}`)
            self.meta.document$ = self.meta.remoteRef.valueChanges()
            return self.meta.document$.pipe(take(1))
          } else {
            // This prevents people from putting garbage into the url and making a sheet out of it
            return throwError({ code: 1001, message: 'Cannot load model from this ID' })
          }
        }),
        switchMap(async (document) => {
          const result = await firstDocumentRead(document)
          if (result === true) {
            return of(true)
          } else {
            return throwError(result)
          }
        })
      )
    }

    const zeroPad = (num) => {
      if (num < 10) {
        return `0${num}`
      }
      return num
    }

    const timestamp = () => {
      const date = new Date()
      return `${date.getHours()}:${zeroPad(date.getMinutes())}:${zeroPad(date.getSeconds())}`
    }

    const onRemoteUpdate = (val: any): void => {
      console.log(`%cremote update for ${self.locals.document_id} at ${timestamp()}`, 'color: #aaa')
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

    // STEP 5.0 or 3.0b: Handle not found error, then set watching bool to true
    // Set up unsubscribe function to be called from controller. Show notice
    // to read-only players and update tool title now that we have the document
    //
    // Stack up four observables: player, permissions, document remote, and
    // document local.
    const watchDocument$ = (): Observable<any> => {
      self.meta.watching = true

      self.unsubscribe = (): void => {
        self.meta.watching = false
        Object.values(self.meta.subscriptions).forEach((sub: Subscription) => sub.unsubscribe())
        self.meta.subscriptions = {}
      }

      if (!self.locals.permission.writer) {
        this.interfaceSvc.showNotice('This is a read-only document. Any changes you make will not be saved.')
      }
      this.updatePlayerToolTitle(this.user.firebase_id, self.locals.document_id, self.model.name)

      const remoteDocument$ = self.meta.document$.pipe(
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
        tap(val => onRemoteUpdate(val)),
      )

      // And publish local updates if we have write access
      const localDocument$ = self.meta.localSubject.pipe(
        filter(() => self.locals.permission.writer),
        tap(() => self.meta.debouncing = true),
        debounceTime(debounceDelay),
        tap(() => self.meta.debouncing = false),
        filter(() => {
          self.model.compareChanges(self.remote, self.meta.localChanges.list, self.meta.localChanges.lookup, 'base')
          // console.log('local changes: ', self.meta.localChanges.list.join('\n'))
          const shouldSave = shouldSaveLocalChanges()
          if (!shouldSave) { clearChanges('localChanges') }
          return shouldSave
        }),
        tap(() => onLocalChange()),
      )

      const player$ = of(null).pipe(mergeMap(() => iif(
        () => playerPipe instanceof Array && playerPipe.length > 0,
        this.player$.pipe(pipeFromArray(playerPipe)),
        of(null),
      )))

      const permissions$ = this.documentPermissions$(self.locals.document_id).pipe(
        pipeFromArray(permissionsPipe),
        tap(permissions => self.locals.documentPermissions = permissions),
      )

      return merge(
        player$,
        permissions$,
        remoteDocument$,
        localDocument$,
      ).pipe(
        catchError(runtimeError$),
      )
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

    // STEP 2.0b: This gets called if we're opening a document we've already
    // opened during this session. If we happen to already be watching, we know
    // there's nothing we need to do, otherwise we have to unfreeze the state
    // of the document by clearing changes, setting ready to false, calling
    // onUnfrozen for the service, and then running watchDocument$
    const riseFromYourGrave$ = (): Observable<any> => {
      if (!self.meta.watching) {
        console.log('RISING FROM THE GRAVE')
        clearChanges('localChanges')
        clearChanges('remoteChanges')
        self.locals.ready = false
        self.methods.onUnfrozen()
        return watchDocument$()
      } else {
        return of(null)
      }
    }

    // STEP 1.0: Initialize. If the document ID is stored in memory then
    // everything is set up already. Otherwise we save the self object
    // passed in along with use, tool type, set up subjects and touch func
    //
    // Then we begin watching for routing, set the sessionId for changes,
    // push our sourceKey to the stack, and depending on if we have a saved
    // documentRef, either loadModel$ or reopen model with riseFromYourGrave$
    const initialize$ = (): Observable<any> => {
      if (this.tools[self.locals.document_id]) {
        self = this.tools[self.locals.document_id]
      } else if (self.locals.document_id) {
        this.tools[self.locals.document_id] = self
        self.locals.user = this.user
        self.touch = () => {
          self.meta.localSubject.next()
          self.meta.combinedSubject.next()
        }
      }

      self.meta.sessionId = this.sheetSvc.randomSecureString(6)

      if (!!self.meta.remoteRef) {
        return riseFromYourGrave$()
      } else {
        return loadModel$().pipe(
          take(1),
          catchError(loadingError$),
          switchMap((keepGoing) => {
            if (keepGoing) {
              return watchDocument$()
            } else {
              return of(false)
            }
          }),
        )
      }
    }

    return initialize$()
  }
}
