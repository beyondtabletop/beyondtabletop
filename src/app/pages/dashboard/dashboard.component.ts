import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { switchMap, map } from 'rxjs/operators';
import { SharingService } from 'src/app/services/sharing.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'bt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showingNav = false;
  busy = false;
  ready = false;
  public APP_VERSION = '5.4.4'
  public announcementText = 'Beyond Tabletop has been rewritten from the ground up. This means faster performance, futureproofing, easier bugfixing and bug finding.'

  sortedDocuments: any[] = [];
  documents$: Observable<any>;

  constructor(
    public auth: AuthService,
    public store: StorageService,
    public sharer: SharingService,
  ) {
    this.documents$ = this.store.base$.pipe(
      switchMap(() => this.store.player$),
      map(documents => {
        documents.forEach(x => x.updated_at = x.updated_at || 0)
        documents.sort((a, b) => b.updated_at - a.updated_at)
        documents = documents.filter(x => !x.$predeleted)

        const shell = [
          [
            {
              title: 'D&D 5E Sheet',
              plural: 'D&D 5E Sheets',
              slug: 'dnd5e',
              path: 'dnd5e-sheets',
              documents: [],
            },
            {
              title: 'Pathfinder Sheet',
              plural: 'Pathfinder Sheets',
              slug: 'pathfinder',
              path: 'pathfinder-sheets',
              documents: [],
            },
            {
              title: 'RPG Sheet',
              plural: 'RPG Sheets',
              slug: 'rpg',
              path: 'rpg-sheets',
              status: 'Beta',
              documents: [],
            },
          ],
          [
            {
              title: 'Campaign',
              plural: 'Campaigns',
              slug: 'campaign',
              path: 'campaigns',
              status: 'Beta',
              documents: [],
            },
            {
              title: 'Battlemap',
              plural: 'Battlemaps',
              slug: 'battlemap',
              path: 'battlemaps',
              status: 'Beta',
              documents: [],
            },
            // {
            //   title: 'Homebrew Kit',
            //   plural: 'Homebrew Kits',
            //   slug: 'homebrew-kit',
            //   path: 'homebrew-kits',
            //   status: 'Alpha',
            //   documents: [],
            // },
          ],
        ]

        documents.forEach(doc => {
          const t = shell[0].find(x => x.slug === doc.tool_type) || shell[1].find(x => x.slug === doc.tool_type)
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
