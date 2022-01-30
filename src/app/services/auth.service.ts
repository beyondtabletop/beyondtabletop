import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BtUser } from '../models/common/user.model'
import firebase from 'firebase/compat/app'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database'

import { Observable, of } from 'rxjs'
import { switchMap, take } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AuthService {

  user$: Observable<BtUser>
  authuser$: Observable<any>

  constructor (
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.authuser$ = this.afAuth.authState
    this.user$ = this.authuser$.pipe(
      switchMap((user: any) => {
        if (user) {
          return this.db.object<BtUser>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      }),
    )
  }

  async googleSignin(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider()
    const credential = await this.afAuth.signInWithPopup(provider)
    return this.updateUserData(credential.user)
  }

  private updateUserData(user: any): Promise<void> {
    // Sets user data to firestore on login
    const userRef: AngularFireObject<BtUser> = this.db.object(`users/${user.uid}`)

    const data: BtUser = {
      firebase_id: user.uid,
      email: user.email,
      name: user.displayName,
    }

    return userRef.set(data)
  }

  public async saveUser(user: BtUser, nameChanged: boolean): Promise<void> {
    await this.db.object(`users/${user.firebase_id}`).set(user)
    // if (nameChanged) {
    //   this.db.list(`players/${user.firebase_id}`).valueChanges().pipe(take(1)).subscribe(tools => {
    //     const ids = tools.map((x: any) => x.id)
    //   })
    // }
  }

  async signOut(): Promise<void> {
    await this.afAuth.signOut()
    this.router.navigate(['/'])
  }
}
