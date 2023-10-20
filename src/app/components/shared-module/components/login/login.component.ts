import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/components/shared-module/services/api/api.service';
import { UserServiceService } from 'src/app/components/shared-module/services/user-service.service';

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
    public api: ApiService,
    private cookieService: CookieService,
    public userService: UserServiceService
  ) {}

  ngOnInit(): void {
    console.log('Login Component Cargado');
  }
}
