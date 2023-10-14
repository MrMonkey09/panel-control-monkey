import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit {
  constructor(public userService: UserServiceService) {}

  ngOnInit(): void {
    console.log('Home Component Cargado');
    /*     if (this.cookieService.get('user-id')) {
      const findUser: any = users.find(
        (user) => user.id.toString() === this.cookieService.get('user-id')
      );
      if (findUser) {
        this.userService.setUserCookie(findUser);
        this.scrn.getAvalaiblescreens(findUser);
      }
    } */
  }
}
