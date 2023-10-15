import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { users } from 'src/app/data/users';
import { ScreensService } from 'src/app/services/screens.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit {
  screenRes!: { width: number; height: number };
  constructor(
    public userService: UserServiceService,
    public cookieService: CookieService,
    public scrn: ScreensService
  ) {}

  ngOnInit(): void {
    console.log('Home Component Cargado');
    console.log({ constants: this.userService._userConstants });
    if (this.cookieService.get('user-id')) {
      const findUser: any = users.find(
        (user) => user.id.toString() === this.cookieService.get('user-id')
      );
      if (findUser) {
        this.userService.setUserCookie(findUser);
        this.scrn.getAvalaiblescreens(findUser);
      }
    }
  }
}
