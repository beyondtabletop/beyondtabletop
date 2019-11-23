import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService} from './services/auth.service'
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.authuser$.pipe(
      take(1),
      map(user => !!user && user.uid === 'SIxb6YAlzadNFqKNjA5wO79sVTd2'),
      tap(isAdmin => {
        if (!isAdmin) {
          this.router.navigate(['']);
        }
      })
    )
  }
}
