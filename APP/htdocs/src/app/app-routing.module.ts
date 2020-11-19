import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticatedGuard} from './lib/guards/authenticated/authenticated.guard';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthenticatedGuard]},
  {path: 'login', component: LoginComponent},
  //
  // {path: 'stal/:id/:name', component: StableComponent},
  // {path: 'account-activeren/:token', component: AccountActivateComponent},
  // {path: 'registeren', component: RegisterComponent},
  // {path: 'wachtwoord-vergeten', component: PasswordForgottenComponent},
  // {path: 'wachtwoord-resetten/:token', component: PasswordResetComponent},
  //
  // /* Guard User Routes*/
  // {path: 'profiel', component: ProfileComponent, canActivate: [AuthenticatedGuard]},
  // {path: 'beheer/stal/aanmaken', component: AddStableComponent, canActivate: [AuthenticatedGuard]},
  // {path: 'beheer/stal/:id', component: EditStableComponent, canActivate: [AuthenticatedGuard]},
  //
  // /* End Guard */
  //
  // {path: ':filters', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
