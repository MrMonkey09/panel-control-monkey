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
  private user?: User;
  public recharge: boolean = false;
  constructor(private http: HttpClient, public cookieService: CookieService) {}

  setUser(newUser: User) {
    console.log(newUser);
    this.cookieService.set('user-id', newUser.id.toString());
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
}
