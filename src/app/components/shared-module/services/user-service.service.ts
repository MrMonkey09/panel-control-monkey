import { Injectable } from '@angular/core';
import { User_ } from '../../../interfaces/user';
import { CookieService } from 'ngx-cookie-service';
import { ScreensService } from './screens.service';
import { _UserConstants } from '../../../constants/user-service.constants';
import { ApiService } from './api/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  _userConstants = new _UserConstants();
  constructor(
    public cookieService: CookieService,
    public scrn: ScreensService,
    public api: ApiService
  ) {
    this.getAllUsers();
    this.getAllDepartments();
    console.log('UserService Servicio Cargado');
  }

  setUserCookie(user: User_) {
    console.log(user);
    this.cookieService.set('user-id', user.id.toString());
    setTimeout(() => {
      this._userConstants.user = this._userConstants.usersList.find(
        (userTemp) => userTemp.id === user.id
      );
      this.scrn.getAvalaiblescreens(user);
    }, 100);
  }

  createUser(newUser: User_) {
    console.log(newUser);
    setTimeout(() => {
      this._userConstants.usersList.push(newUser);
      console.log(this._userConstants.usersList);
    }, 100);
  }

  getUser(user: User_) {
    console.log({ user });
    this._userConstants.currentUser = user;
    this._userConstants.userFormTemp = {
      name: user.name,
      rut: user.rut,
      email: user.email,
      password: '',
      newPass: '',
      confirmPass: '',
      department: user.department.id + 1,
    };
    this._userConstants.isUserSelected = true;
  }

  getAllUsers() {
    let resTemp: any;
    this.api.apiUser.allUsers().subscribe({
      next: (res) => {
        resTemp = res;
      },
      complete: () => {
        console.log({ users: resTemp.users });
        this._userConstants.usersList = resTemp.users;
      },
    });
  }
  
  getAllDepartments() {
    let resTemp: any;
    this.api.apiDepartment.allDeparments().subscribe({
      next: (res) => {
        resTemp = res;
      },
      complete: () => {
        console.log({ deparments: resTemp.departments });
        this._userConstants.departmentList = resTemp.departments;
      },
    });
  }

  updateUser(user: any) {
    console.log({ userUpdate: { user } });
    const userSelected = this._userConstants.currentUser;
    if (userSelected) {
      userSelected.name = user.name;
      userSelected.email = user.email;
      userSelected.rut = user.rut;
      const depTemp = this._userConstants.departmentList.find(
        (department) => department.id === parseInt(user.department)
      );
      if (depTemp) {
        userSelected.department = depTemp;
      }
      console.log({ userSelected });
      this._userConstants.usersList[userSelected.id] = userSelected;
    }
  }

  getForm(form: any, howAction: any) {
    let idTemp: any;
    if (this._userConstants.currentUser) {
      idTemp = this._userConstants.usersList.find(
        (user) => user.id === this._userConstants.currentUser?.id
      )?.id;
    }
    console.log({ currentUser: this._userConstants.currentUser });
    console.log({ form, howAction });
    console.log(this._userConstants.contUsers);
    if (howAction === 'isUpdate') {
      console.log('Actualizando...');
      if (form.name !== '') {
        console.log('nombre valido');
        if (
          (form.rut !== '' &&
            !this._userConstants.usersList.find(
              (user) => user.rut === form.rut
            )) ||
          this._userConstants.usersList.find(
            (user) => user.rut === form.rut
          ) === this._userConstants.currentUser
        ) {
          console.log('rut valido');
          if (
            (this._userConstants.currentUser?.password === form.password &&
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
                !this._userConstants.usersList.find(
                  (user) => user.email === form.email
                )) ||
              this._userConstants.usersList.find(
                (user) => user.email === form.email
              ) === this._userConstants.currentUser
            ) {
              console.log('correo valido');
              console.log(form.department);
              const depTemp = this._userConstants.departmentList.find(
                (department) => department.id === form.department - 1
              );
              if (depTemp) {
                console.log('departamento valido');
                const newUser: User_ = {
                  id: idTemp,
                  name: form.name,
                  password:
                    form.newPass !== '' &&
                    form.newPass !== this._userConstants.currentUser?.password
                      ? form.newPass
                      : this._userConstants.currentUser?.password,
                  email: form.email,
                  department: depTemp,
                  rut: form.rut,
                };
                const indexTemp = this._userConstants.usersList.findIndex(
                  (user) => user.id === idTemp
                );
                this._userConstants.usersList[indexTemp] = newUser;
                if (
                  this._userConstants.user?.id ===
                  this._userConstants.usersList[indexTemp].id
                ) {
                  this._userConstants.user = newUser;
                }
                this._userConstants.currentUser = newUser;
                console.log(this._userConstants.usersList[indexTemp]);
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
          !this._userConstants.usersList.find((user) => user.rut === form.rut)
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
              !this._userConstants.usersList.find(
                (user) => user.email === form.email
              )
            ) {
              console.log('correo valido');
              const depTemp = this._userConstants.departmentList.find(
                (department) => department.id === form.department - 1
              );
              if (depTemp) {
                console.log('departamento valido');
                const newUser: User_ = {
                  id: this._userConstants.contUsers++,
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

  deleteUser(user: User_) {
    console.log(
      this._userConstants.usersList.filter(
        (userTemp) => userTemp.id !== user.id
      )
    );
    this._userConstants.usersList = this._userConstants.usersList.filter(
      (userTemp) => userTemp.id !== user.id
    );
  }

  loggIn(form: { email: string; pass: string }) {
    console.log('Loggeando...');
    const findUser: any = this._userConstants.usersList.filter(
      (user) => user.email.toLowerCase() === form.email.toLowerCase()
    );
    if (findUser.length > 0 && findUser.length < 2) {
      if (findUser[0].password === form.pass) {
        console.log('Usuario ' + findUser[0].email + ' encontrado...');
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
    this._userConstants.user = undefined;
    this.cookieService.delete('user-id');
    this.scrn._constants.isActiveGroup = false;
  }

  openUserPanel() {
    console.log('panel abierto');
    setTimeout(() => {
      this._userConstants.isUserPanelOpened = true;
      this._userConstants.isBackButtonEnabled = true;
    }, 100);
  }

  closeUserPanel() {
    console.log('panel cerrado');
    setTimeout(() => {
      this._userConstants.isUserPanelOpened = false;
      this._userConstants.isBackButtonEnabled = false;
      this._userConstants.isPanelUsed = false;
      this._userConstants.isCreateUserOpened = false;
      this._userConstants.isDeleteUserOpened = false;
      this._userConstants.isUpdateUserOpened = false;
      this._userConstants.currentUser = null;
    }, 100);
  }

  openCreateUser() {
    console.log('Creador de usuarios abierto');
    setTimeout(() => {
      this._userConstants.isPanelUsed = true;
      this._userConstants.isCreateUserOpened = true;
      this._userConstants.isDeleteUserOpened = false;
      this._userConstants.isUpdateUserOpened = false;
      this._userConstants.currentUser = null;
      this._userConstants.userFormTemp = {
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
      this._userConstants.isPanelUsed = true;
      this._userConstants.isCreateUserOpened = false;
      this._userConstants.isDeleteUserOpened = false;
      this._userConstants.isUpdateUserOpened = true;
      this._userConstants.currentUser = null;
    }, 100);
  }

  openDeleteUser() {
    console.log('Eliminador de usuarios abierto');
    setTimeout(() => {
      this._userConstants.isPanelUsed = true;
      this._userConstants.isCreateUserOpened = false;
      this._userConstants.isDeleteUserOpened = true;
      this._userConstants.isUpdateUserOpened = false;
      this._userConstants.currentUser = null;
      this._userConstants.userFormTemp = {
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
