import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {UserLogin} from '../../lib/interfaces/User';
import {RestService} from '../rest/rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUserSubject: BehaviorSubject<UserLogin>;

  constructor(private restService: RestService) {
    this.currentUserSubject = new BehaviorSubject<UserLogin>(JSON.parse(localStorage.getItem('currentUser')));
  }

  login(data) {
    return this.restService.post('/api/login_check', data).then((user: any) => {
      if (!user || !user.token) {
        throw new Error('Login failed');
      }
      this.storeUser(user);

      return user;
    });
  }

  storeUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
