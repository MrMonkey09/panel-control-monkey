import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../interfaces/user';
import { CookieService } from 'ngx-cookie-service';
import { users } from '../fake-data/users';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  public user?: User | undefined;
  public recharge: boolean = false;
  public isUserPanelOpened: boolean = false;
  public isBackButtonEnabled: boolean = false;
  constructor(private http: HttpClient, public cookieService: CookieService) {}

  setUser(newUser: User) {
    console.log(newUser);
    this.cookieService.set('user-id', newUser.id.toString());
    setTimeout(() => {
      this.user = users[newUser.id];
    }, 100);
  }

  loggIn(form: { email: string; pass: string }) {
    const findUser: any = users.filter(
      (user) => user.email.toLowerCase() === form.email.toLowerCase()
    );
    if (findUser.length > 0 && findUser.length < 2) {
      console.log('Usuario ' + findUser[0].email + ' encontrado...');
      if (findUser[0].password === form.pass) {
        this.setUser(findUser[0]);
      } else {
        console.log('Contraseña incorrecta');
      }
    } else {
      console.log('Usuario no encontrado');
    }
    return;
  }

  loggOut() {
    this.user = undefined;
    this.cookieService.delete('user-id');
  }

  openUserPanel() {
    console.log('panel abierto');
    setTimeout(() => {
      this.isUserPanelOpened = true;
      this.isBackButtonEnabled = true;
    }, 100);
  }
  closeUserPanel() {
    console.log('panel cerrado');
    setTimeout(() => {
      this.isUserPanelOpened = false;
      this.isBackButtonEnabled = false;
    }, 100);
  }
}
