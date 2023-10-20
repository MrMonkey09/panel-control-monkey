import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ScreensService } from 'src/app/components/shared-module/services/screens.service';
import { UserServiceService } from 'src/app/components/shared-module/services/user-service.service';

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
    setTimeout(() => {
      this.isLogged();
    }, 300);
  }

  isLogged() {
    if (this.cookieService.get('user-id')) {
      const findUser: any = this.userService._userConstants.usersList.find(
        (user) => user.id.toString() === this.cookieService.get('user-id')
      );
      if (findUser) {
        this.userService.setUserCookie(findUser);
        this.scrn.getAvalaiblescreens(findUser);
      }
    }
  }
}
