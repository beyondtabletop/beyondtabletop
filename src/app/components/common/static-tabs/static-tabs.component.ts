import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'bt-static-tabs',
  templateUrl: './static-tabs.component.html',
  styleUrls: ['./static-tabs.component.scss']
})
export class StaticTabsComponent implements OnInit {
  public showingNav = false
  public loggedIn: boolean

  constructor(
    public auth: AuthService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.auth.authuser$.pipe(
      take(1),
      filter(x => !!x),
    ).subscribe(user => this.loggedIn = user)
  }

  toggleNav () {
    this.showingNav = !this.showingNav
  }

  public async signIn() {
    await this.auth.googleSignin();
    this.router.navigate(['/dashboard'])
  }
}
