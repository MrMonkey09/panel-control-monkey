import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiFecthService } from 'src/app/services/api-fecth.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form = {
    email: '',
    pass: '',
  };
  datos: any[] = [];
  constructor(
    public api: ApiFecthService,
    private cookieService: CookieService,
    public userService: UserServiceService
  ) {}

  ngOnInit(): void {
    console.log('Login Component Cargado');
  }
}
