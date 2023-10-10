import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { CookieService } from 'ngx-cookie-service';
import { users } from '../fake-data/users';
import { Department } from '../interfaces/department';
import { departments } from '../fake-data/departments';
import { ScreensService } from './screens.service';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  user?: User | undefined;
  recharge: boolean = false;
  isUserPanelOpened: boolean = false;
  isBackButtonEnabled: boolean = false;
  isUserSelected: boolean = false;
  isCreateUserOpened: boolean = false;
  isDeleteUserOpened: boolean = false;
  isUpdateUserOpened: boolean = false;
  isPanelUsed: boolean = false;
  usersList: Array<User> = users;
  contUsers: number = 1;
  currentUser!: User | null;
  departmentList: Array<Department> = departments;
  userFormTemp = {
    name: '',
    rut: '',
    email: '',
    password: '',
    newPass: '',
    confirmPass: '',
    department: 0,
  };

  constructor(
    private http: HttpClient,
    public cookieService: CookieService,
    public scrn: ScreensService
  ) {}

  setUserCookie(user: User) {
    console.log(user);
    this.cookieService.set('user-id', user.id.toString());
    setTimeout(() => {
      this.user = users.find((userTemp) => userTemp.id === user.id);
      this.scrn.getAvalaiblescreens(user);
    }, 100);
  }

  createUser(newUser: User) {
    console.log(newUser);
    setTimeout(() => {
      this.usersList.push(newUser);
      console.log(this.usersList);
    }, 100);
  }

  getUser(user: User) {
    console.log({ user });
    this.currentUser = user;
    this.userFormTemp = {
      name: user.name,
      rut: user.rut,
      email: user.email,
      password: '',
      newPass: '',
      confirmPass: '',
      department: user.department.id + 1,
    };
    this.isUserSelected = true;
  }

  updateUser(user: any) {
    console.log({ userUpdate: { user } });
    const userSelected = this.currentUser;
    if (userSelected) {
      userSelected.name = user.name;
      userSelected.email = user.email;
      userSelected.rut = user.rut;
      const depTemp = this.departmentList.find(
        (department) => department.id === parseInt(user.department)
      );
      if (depTemp) {
        userSelected.department = depTemp;
      }
      console.log({ userSelected });
      this.usersList[userSelected.id] = userSelected;
    }
  }

  getForm(form: any, howAction: any) {
    let idTemp: any;
    if (this.currentUser) {
      idTemp = this.usersList.find(
        (user) => user.id === this.currentUser?.id
      )?.id;
    }
    console.log({ currentUser: this.currentUser });
    console.log({ form, howAction });
    console.log(this.contUsers);
    if (howAction === 'isUpdate') {
      console.log('Actualizando...');
      if (form.name !== '') {
        console.log('nombre valido');
        if (
          (form.rut !== '' &&
            !this.usersList.find((user) => user.rut === form.rut)) ||
          this.usersList.find((user) => user.rut === form.rut) ===
            this.currentUser
        ) {
          console.log('rut valido');
          if (
            (this.currentUser?.password === form.password &&
              form.newPass === form.confirmPass &&
              form.newPass !== '' &&
              form.confirmPass !== '') ||
            (form.password === '' &&
              form.newPass === '' &&
              form.confirmPass === '')
          ) {
            console.log('contraseña valida');
            if (
              (form.email !== '' &&
                !this.usersList.find((user) => user.email === form.email)) ||
              this.usersList.find((user) => user.email === form.email) ===
                this.currentUser
            ) {
              console.log('correo valido');
              console.log(form.department);
              const depTemp = this.departmentList.find(
                (department) => department.id === form.department - 1
              );
              if (depTemp) {
                console.log('departamento valido');
                const newUser: User = {
                  id: idTemp,
                  name: form.name,
                  password:
                    form.newPass !== '' &&
                    form.newPass !== this.currentUser?.password
                      ? form.newPass
                      : this.currentUser?.password,
                  email: form.email,
                  department: depTemp,
                  rut: form.rut,
                };
                const indexTemp = this.usersList.findIndex(
                  (user) => user.id === idTemp
                );
                this.usersList[indexTemp] = newUser;
                if (this.user?.id === this.usersList[indexTemp].id) {
                  this.user = newUser;
                }
                this.currentUser = newUser;
                console.log(this.usersList[indexTemp]);
                console.log('Usuario modificado');
              }
            }
          }
        }
      }
    } else if (howAction === 'isCreate') {
      console.log('Creando...');
      if (form.name !== '') {
        console.log('nombre valido');
        if (
          form.rut !== '' &&
          !this.usersList.find((user) => user.rut === form.rut)
        ) {
          console.log('rut valido');
          if (
            form.newPass === form.confirmPass &&
            form.newPass !== '' &&
            form.confirmPass !== ''
          ) {
            console.log('contraseña valida');
            if (
              form.email !== '' &&
              !this.usersList.find((user) => user.email === form.email)
            ) {
              console.log('correo valido');
              const depTemp = this.departmentList.find(
                (department) => department.id === form.department - 1
              );
              if (depTemp) {
                console.log('departamento valido');
                const newUser: User = {
                  id: this.contUsers++,
                  name: form.name,
                  password: form.newPass,
                  email: form.email,
                  department: depTemp,
                  rut: form.rut,
                };
                this.createUser(newUser);
                console.log('Usuario Creado');
              }
            }
          }
        }
      }
    }
  }

  deleteUser(user: User) {
    console.log(this.usersList.filter((userTemp) => userTemp.id !== user.id));
    this.usersList = this.usersList.filter(
      (userTemp) => userTemp.id !== user.id
    );
  }

  loggIn(form: { email: string; pass: string }) {
    const findUser: any = users.filter(
      (user) => user.email.toLowerCase() === form.email.toLowerCase()
    );
    if (findUser.length > 0 && findUser.length < 2) {
      console.log('Usuario ' + findUser[0].email + ' encontrado...');
      if (findUser[0].password === form.pass) {
        this.setUserCookie(findUser[0]);
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
    this.scrn.isActiveGroup = false;
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
      this.isPanelUsed = false;
      this.isCreateUserOpened = false;
      this.isDeleteUserOpened = false;
      this.isUpdateUserOpened = false;
      this.currentUser = null;
    }, 100);
  }

  openCreateUser() {
    console.log('Creador de usuarios abierto');
    setTimeout(() => {
      this.isPanelUsed = true;
      this.isCreateUserOpened = true;
      this.isDeleteUserOpened = false;
      this.isUpdateUserOpened = false;
      this.currentUser = null;
      this.userFormTemp = {
        name: '',
        rut: '',
        email: '',
        password: '',
        newPass: '',
        confirmPass: '',
        department: 0,
      };
    }, 100);
  }

  openUpdateUser() {
    console.log('Actualizador de usuarios abierto');
    setTimeout(() => {
      this.isPanelUsed = true;
      this.isCreateUserOpened = false;
      this.isDeleteUserOpened = false;
      this.isUpdateUserOpened = true;
      this.currentUser = null;
    }, 100);
  }

  openDeleteUser() {
    console.log('Eliminador de usuarios abierto');
    setTimeout(() => {
      this.isPanelUsed = true;
      this.isCreateUserOpened = false;
      this.isDeleteUserOpened = true;
      this.isUpdateUserOpened = false;
      this.currentUser = null;
      this.userFormTemp = {
        name: '',
        rut: '',
        email: '',
        password: '',
        newPass: '',
        confirmPass: '',
        department: 0,
      };
    }, 100);
  }
}
