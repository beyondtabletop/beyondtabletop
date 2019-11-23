import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Dnd5eSheetsComponent } from './pages/dnd5e-sheets/dnd5e-sheets.component';
import { AuthGuard } from './auth.guard';
import { PathfinderSheetsComponent } from './pages/pathfinder-sheets/pathfinder-sheets.component';
import { RpgSheetsComponent } from './pages/rpg-sheets/rpg-sheets.component';
import { BattlemapsComponent } from './pages/battlemaps/battlemaps.component';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { DonateComponent } from './pages/donate/donate.component';
import { HomebrewKitsComponent } from './pages/homebrew-kits/homebrew-kits.component';
import { AccountComponent } from './pages/account/account.component';
import { HelpComponent } from './pages/help/help.component';
import { BlogComponent } from './pages/blog/blog.component';
import { HelpFaqComponent } from './pages/help/faq/faq.component';
import { HelpAlphaVsBetaComponent } from './pages/help/alpha-vs-beta/alpha-vs-beta.component';
import { HelpOverviewBattlemapsComponent } from './pages/help/overview-battlemaps/overview-battlemaps.component';
import { HelpOverviewCampaignsComponent } from './pages/help/overview-campaigns/overview-campaigns.component';
import { HelpOverviewDnd5eComponent } from './pages/help/overview-dnd5e/overview-dnd5e.component';
import { HelpOverviewPathfinderComponent } from './pages/help/overview-pathfinder/overview-pathfinder.component';
import { HelpOverviewRpgComponent } from './pages/help/overview-rpg/overview-rpg.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'donate', component: DonateComponent },
  { path: 'help', component: HelpComponent },
  { path: 'help/faq', component: HelpFaqComponent },
  { path: 'help/alpha-vs-beta', component: HelpAlphaVsBetaComponent },
  { path: 'help/overview-battlemaps', component: HelpOverviewBattlemapsComponent },
  { path: 'help/overview-campaigns', component: HelpOverviewCampaignsComponent },
  { path: 'help/overview-dnd5e', component: HelpOverviewDnd5eComponent },
  { path: 'help/overview-pathfinder', component: HelpOverviewPathfinderComponent },
  { path: 'help/overview-rpg', component: HelpOverviewRpgComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dnd5e-sheets', component: Dnd5eSheetsComponent, canActivate: [AuthGuard] },
  { path: 'dnd5e-sheets/:id', component: Dnd5eSheetsComponent, canActivate: [AuthGuard] },
  { path: 'pathfinder-sheets', component: PathfinderSheetsComponent, canActivate: [AuthGuard] },
  { path: 'pathfinder-sheets/:id', component: PathfinderSheetsComponent, canActivate: [AuthGuard] },
  { path: 'rpg-sheets', component: RpgSheetsComponent, canActivate: [AuthGuard] },
  { path: 'rpg-sheets/:id', component: RpgSheetsComponent, canActivate: [AuthGuard] },
  { path: 'battlemaps', component: BattlemapsComponent, canActivate: [AuthGuard] },
  { path: 'battlemaps/:id', component: BattlemapsComponent, canActivate: [AuthGuard] },
  { path: 'campaigns', component: CampaignsComponent, canActivate: [AuthGuard] },
  { path: 'campaigns/:id', component: CampaignsComponent, canActivate: [AuthGuard] },
  { path: 'homebrew-kits', component: HomebrewKitsComponent, canActivate: [AuthGuard] },
  { path: 'homebrew-kits/:id', component: HomebrewKitsComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
