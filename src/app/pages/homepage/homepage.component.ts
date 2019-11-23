import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public show_menu = false
  public banner_class = ''
  public loggedIn: boolean
  public year = new Date().getFullYear()

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.auth.authuser$.pipe(
      take(1),
      filter(x => !!x),
    ).subscribe(user => this.loggedIn = user)
  }

  private async signIn() {
    await this.auth.googleSignin();
    this.router.navigate(['/dashboard'])
  }

  public dashboardOrLogin() {
    this.loggedIn ? this.router.navigate(['/dashboard']) : this.signIn()
  }
}
