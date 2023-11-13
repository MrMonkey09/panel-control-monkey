import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User_ } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api/api.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { ScreensService } from 'src/app/services/screens.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  form = {
    email: '',
    pass: '',
  };
  datos: any[] = [];
  resTemp: any;

  constructor(
    public userService: UserServiceService,
    public constants: ConstantsService,
    public scrnService: ScreensService,
    public api: ApiService,
    public cookieService: CookieService
  ) {}

  ngOnInit(): void {
    console.log('Login Component Cargado');
  }

  ngAfterViewInit(): void {
    this.start();
  }

  loggIn(form: { email: string; pass: string }) {
    console.log('Iniciando sesion...');
    console.log('Loggeando...');
    if (this.constants._userConstants.usersList) {
      const findUser: any = this.constants._userConstants.usersList.find(
        (user) => user.Email.toLowerCase() === form.email.toLowerCase()
      );
      console.log({ findUser });
      if (findUser) {
        if (findUser.Password === form.pass) {
          console.log(`Usuario ${findUser.Email} encontrado...`);
          this.userService.setUserCookie(findUser);
          
        } else {
          console.log('Contraseña incorrecta');
        }
      } else {
        console.log('Usuario no encontrado');
      }
    } else {
      console.log('Sin usuarios en lista');
    }
  }

  start() {
    console.log('Obteniendo todos los departamentos...');
    this.api.apiDepartment.allDeparments().subscribe({
      next: (res) => {
        this.resTemp = res;
      },
      complete: () => {
        console.log({ deparments: this.resTemp });
        this.constants._userConstants.departmentList = this.resTemp;
        console.log('Obteniendo todos los usuarios...');
        this.api.apiUser.allUsers().subscribe({
          next: (res) => {
            this.resTemp = res;
          },
          complete: () => {
            this.constants._userConstants.usersList = this.resTemp;
            console.log({ users: this.resTemp });
            this.isLogged();
          },
        });
      },
    });
  }
  isLogged() {
    console.log('Verificando sesion iniciada...');
    if (this.cookieService.get('user-id')) {
      const findUser: any = this.constants._userConstants.usersList.find(
        (user: User_) =>
          (user.ID ? user.ID.toString() : null) ===
          this.cookieService.get('user-id')
      );
      console.log({
        findUser,
        list: this.constants._userConstants.usersList,
      });
      if (findUser) {
        this.constants._userConstants.user = findUser;
        this.constants._userConstants.depIndex =
          this.constants._userConstants.departmentList.findIndex(
            (dep) => dep.ID === findUser.DepartmentID
          );
      }
    } else {
      console.log('Ninguna sesion iniciada');
    }
  }
}
