import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { switchMap, tap, map } from 'rxjs/operators';
import { SharingService } from 'src/app/services/sharing.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'bt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //\n- Adds Homebrew Kits. Homebrew Kits are an easy way to reuse homebrew data across multiple character sheets and with other players.

  showingNav = false;
  busy = false;
  ready = false;
  public APP_VERSION = '5.4.0'
  public announcementText = 'Beyond Tabletop has been rewritten from the ground up. This means faster performance, futureproofing, easier bugfixing and bug finding.'

  sortedDocuments: any[] = [];
  documents$: Observable<any>;

  documentTypes: any[] = [
    {
      title: 'D&D 5E Sheet',
      plural: 'D&D 5E Sheets',
      slug: 'dnd5e',
      path: 'dnd5e-sheets',
      is_public: true,
      column: 0,
      documents: [],
    },
    {
      title: 'Pathfinder Sheet',
      plural: 'Pathfinder Sheets',
      slug: 'pathfinder',
      path: 'pathfinder-sheets',
      is_public: true,
      column: 0,
      documents: [],
    },
    {
      title: 'RPG Sheet',
      plural: 'RPG Sheets',
      slug: 'rpg',
      path: 'rpg-sheets',
      status: 'Beta',
      is_public: true,
      column: 0,
      documents: [],
    },
    {
      title: 'Campaign',
      plural: 'Campaigns',
      slug: 'campaign',
      path: 'campaigns',
      status: 'Beta',
      is_public: true,
      column: 1,
      documents: [],
    },
    {
      title: 'Battlemap',
      plural: 'Battlemaps',
      slug: 'battlemap',
      path: 'battlemaps',
      status: 'Beta',
      is_public: true,
      column: 1,
      documents: [],
    },
    {
      title: 'Homebrew Kit',
      plural: 'Homebrew Kits',
      slug: 'homebrew-kit',
      path: 'homebrew-kits',
      status: 'Pre-Alpha',
      is_public: true,
      column: 1,
      documents: [],
    },
  ]

  constructor(
    public auth: AuthService,
    public store: StorageService,
    public sharer: SharingService,
  ) {
    this.documents$ = this.store.base$.pipe(
      switchMap(() => this.store.player$),
      tap(documents => {
        this.documentTypes.filter(t => t.status === 'Alpha').forEach(t => t.hide = !this.store.user.alpha_tester)
        this.documentTypes.filter(t => t.status === 'Pre-Alpha').forEach(t => t.hide = this.store.user.firebase_id !== 'SIxb6YAlzadNFqKNjA5wO79sVTd2')
        documents.forEach(x => x.updated_at = x.updated_at || 0)
        documents.sort((a, b) => b.updated_at - a.updated_at)
      }),
      map(documents => documents.filter(x => !x.$predeleted)),
      map(documents => {
        const shell = [
          this.documentTypes.filter(t => t.column === 0),
          this.documentTypes.filter(t => t.column === 1),
        ]
        documents.forEach(doc => {
          let t = this.documentTypes.find(x => x.slug === doc.tool_type)
          if (!t) { return }
          t = shell[t.column].find(x => x.slug === doc.tool_type)
          if (!t) { return }
          t.documents.push(doc)
        })
        return shell
      }),
    )
  }

  ngOnInit() {
    window.document.title = 'Dashboard | Beyond Tabletop';
  }

  toggleNav() {
    this.showingNav = !this.showingNav
  }

  public permissionIconForRole(doc) {
    switch (doc.role) {
      case 'owner':
        return 'certificate'
      case 'writer':
        return 'circle'
      default:
        return 'minus-circle'
    }
  };

  public async deleteDocument(doc, docSlug) {
    doc.$predeleted = true
    if (doc.role === 'owner') {
      this.store.deleteFirebaseTool(doc.id, docSlug, this.store.user.firebase_id)
    } else {
      await this.store.deleteFirebaseToolFromPlayer(doc.id, this.store.user.firebase_id)
      this.store.deleteFirebaseUserPermission(doc.id, this.store.user.firebase_id)
    }
  };

  public copyDocument(doc, docSlug) {
    this.store.copyFirebaseTool$(doc.id, docSlug, this.store.user.firebase_id, doc.title).subscribe()
  };

}
