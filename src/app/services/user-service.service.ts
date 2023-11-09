import { Injectable } from '@angular/core';
import { User_ } from '../interfaces/user';
import { CookieService } from 'ngx-cookie-service';
import { ScreensService } from './screens.service';
import { ApiService } from './api/api.service';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(
    public cookieService: CookieService,
    public scrn: ScreensService,
    public api: ApiService,
    public constants: ConstantsService
  ) {
    console.log('UserService Servicio Cargado');
  }

  setUserCookie(user: User_) {
    console.log('Creando cookie de usuario...');
    console.log({ user });
    this.cookieService.set('user-id', user.ID.toString());
    const userFound = this.constants._userConstants.usersList.find(
      (userTemp) => userTemp.ID === user.ID
    );
    if (userFound) {
      this.constants._userConstants.user = userFound;
    }
  }

  createUser(newUser: User_) {
    console.log('Creando usuario...');
    /*     console.log(newUser);
    setTimeout(() => {
      this.constants._userConstants.usersList.push(newUser);
      console.log(this.constants._userConstants.usersList);
    }, 100); */
  }

  getUser(user: User_) {
    console.log('Obteniendo usuario...');
    /*     console.log({ user });
    this.constants._userConstants.currentUser = user;
    this.constants._userConstants.userFormTemp = {
      name: user.Name,
      rut: user.Rut,
      email: user.Email,
      password: '',
      newPass: '',
      confirmPass: '',
      department: user.DepartmentID + 1,
    };
    this.constants._userConstants.isUserSelected = true; */
  }

  getAllUsers() {
    console.log('Obteniendo todos los usuarios...');
    let resTemp: any;
    this.api.apiUser.allUsers().subscribe({
      next: (res) => {
        resTemp = res;
      },
      complete: () => {
        this.constants._userConstants.usersList = resTemp;
        console.log({ users: resTemp });
      },
    });
  }

  getAllDepartments() {
    console.log('Obteniendo todos los departamentos...');
    /*     let resTemp: any;
    this.api.apiDepartment.allDeparments().subscribe({
      next: (res) => {
        resTemp = res;
      },
      complete: () => {
        console.log({ deparments: resTemp });
        this.constants._userConstants.departmentList = resTemp;
      },
    }); */
  }

  updateUser(user: User_) {
    console.log('Actualizando usuario...');
    /*     console.log({ userUpdate: { user } });
    const userSelected = this.constants._userConstants.currentUser;
    if (userSelected) {
      userSelected.Name = user.Name;
      userSelected.Email = user.Email;
      userSelected.Rut = user.Rut;
      const depTemp = this.constants._userConstants.departmentList.find(
        (department) => department.ID === user.DepartmentID
      );
      if (depTemp) {
        userSelected.DepartmentID = depTemp.ID;
      }
      console.log({ userSelected });
      this.constants._userConstants.usersList[userSelected.ID] = userSelected;
    } */
  }

  getForm(form: any, howAction: any) {
    console.log('Obteniendo formulario...');
    /*     let idTemp: any;
    if (this.constants._userConstants.currentUser) {
      idTemp = this.constants._userConstants.usersList.find(
        (user) => user.ID === this.constants._userConstants.currentUser?.ID
      )?.ID;
    }
    console.log({
      currentUser: this.constants._userConstants.currentUser,
    });
    console.log({ form, howAction });
    console.log(this.constants._userConstants.contUsers);
    if (howAction === 'isUpdate') {
      console.log('Actualizando...');
      if (form.name !== '') {
        console.log('nombre valido');
        if (
          (form.rut !== '' &&
            !this.constants._userConstants.usersList.find(
              (user) => user.Rut === form.rut
            )) ||
          this.constants._userConstants.usersList.find(
            (user) => user.Rut === form.rut
          ) === this.constants._userConstants.currentUser
        ) {
          console.log('rut valido');
          if (
            (this.constants._userConstants.currentUser?.Password ===
              form.password &&
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
                !this.constants._userConstants.usersList.find(
                  (user) => user.Email === form.email
                )) ||
              this.constants._userConstants.usersList.find(
                (user) => user.Email === form.email
              ) === this.constants._userConstants.currentUser
            ) {
              console.log('correo valido');
              console.log(form.department);
              const depTemp = this.constants._userConstants.departmentList.find(
                (department) => department.ID === form.department - 1
              );
              if (depTemp) {
                console.log('departamento valido');
                const newUser: User_ = {
                  ID: idTemp,
                  Name: form.name,
                  Password:
                    form.newPass !== '' &&
                    form.newPass !==
                      this.constants._userConstants.currentUser?.Password
                      ? form.newPass
                      : this.constants._userConstants.currentUser?.Password,
                  Email: form.email,
                  DepartmentID: depTemp.ID,
                  Rut: form.rut,
                };
                const indexTemp =
                  this.constants._userConstants.usersList.findIndex(
                    (user) => user.ID === idTemp
                  );
                this.constants._userConstants.usersList[indexTemp] = newUser;
                if (
                  this.constants._userConstants.user?.ID ===
                  this.constants._userConstants.usersList[indexTemp].ID
                ) {
                  this.constants._userConstants.user = newUser;
                }
                this.constants._userConstants.currentUser = newUser;
                console.log(this.constants._userConstants.usersList[indexTemp]);
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
          !this.constants._userConstants.usersList.find(
            (user) => user.Rut === form.rut
          )
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
              !this.constants._userConstants.usersList.find(
                (user) => user.Email === form.email
              )
            ) {
              console.log('correo valido');
              const depTemp = this.constants._userConstants.departmentList.find(
                (department) => department.ID === form.department - 1
              );
              if (depTemp) {
                console.log('departamento valido');
                const newUser: User_ = {
                  ID: this.constants._userConstants.contUsers++,
                  Name: form.name,
                  Password: form.newPass,
                  Email: form.email,
                  DepartmentID: depTemp.ID,
                  Rut: form.rut,
                };
                this.createUser(newUser);
                console.log('Usuario Creado');
              }
            }
          }
        }
      }
    } */
  }

  deleteUser(user: User_) {
    console.log('Eliminando usuario...');
    /*     console.log(
      this.constants._userConstants.usersList.filter(
        (userTemp) => userTemp.ID !== user.ID
      )
    );
    this.constants._userConstants.usersList =
      this.constants._userConstants.usersList.filter(
        (userTemp) => userTemp.ID !== user.ID
      ); */
  }

  isLogged() {
    console.log('Verificando sesion iniciada...');
    if (this.cookieService.get('user-id')) {
      const findUser: any = this.constants._userConstants.usersList.find(
        (user: User_) =>
          user.ID.toString() === this.cookieService.get('user-id')
      );
      console.log({
        findUser,
        list: this.constants._userConstants.usersList,
      });
      if (findUser) {
        this.constants._userConstants.user = findUser;
      }
    } else {
      console.log('Ninguna sesion iniciada');
    }
  }

  openCreateUser() {
    console.log('Abriendo panel de creacion de usuarios...');
    /*     console.log('Creador de usuarios abierto');
    setTimeout(() => {
      this.constants._userConstants.isPanelUsed = true;
      this.constants._userConstants.isCreateUserOpened = true;
      this.constants._userConstants.isDeleteUserOpened = false;
      this.constants._userConstants.isUpdateUserOpened = false;
      this.constants._userConstants.currentUser = null;
      this.constants._userConstants.userFormTemp = {
        name: '',
        rut: '',
        email: '',
        password: '',
        newPass: '',
        confirmPass: '',
        department: 0,
      };
    }, 100); */
  }

  openUpdateUser() {
    console.log('Abriendo panel de modificacion de usuarios...');
    /*     console.log('Actualizador de usuarios abierto');
    setTimeout(() => {
      this.constants._userConstants.isPanelUsed = true;
      this.constants._userConstants.isCreateUserOpened = false;
      this.constants._userConstants.isDeleteUserOpened = false;
      this.constants._userConstants.isUpdateUserOpened = true;
      this.constants._userConstants.currentUser = null;
    }, 100); */
  }

  openDeleteUser() {
    console.log('Abriendo panel de eliminacion de usuarios...');
    /*     console.log('Eliminador de usuarios abierto');
    setTimeout(() => {
      this.constants._userConstants.isPanelUsed = true;
      this.constants._userConstants.isCreateUserOpened = false;
      this.constants._userConstants.isDeleteUserOpened = true;
      this.constants._userConstants.isUpdateUserOpened = false;
      this.constants._userConstants.currentUser = null;
      this.constants._userConstants.userFormTemp = {
        name: '',
        rut: '',
        email: '',
        password: '',
        newPass: '',
        confirmPass: '',
        department: 0,
      };
    }, 100); */
  }
}
