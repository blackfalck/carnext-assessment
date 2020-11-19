import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../../../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.userService.currentUserValue;
    return user ? true : this.router.navigate(['/login']);
  }

}
