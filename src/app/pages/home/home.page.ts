import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { users } from 'src/app/fake-data/users';
import { ScreensService } from 'src/app/services/screens.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit {
  constructor(
    private cookieService: CookieService,
    public scrn: ScreensService,
    public userService: UserServiceService
  ) {}

  ngOnInit(): void {
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
