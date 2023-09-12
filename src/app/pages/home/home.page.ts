import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { users } from 'src/app/fake-data/users';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit {
  user: any;
  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    const userId: any = this.cookieService.get('user-id');
    this.user = users[userId];
    console.log(this.user);
  }
}
