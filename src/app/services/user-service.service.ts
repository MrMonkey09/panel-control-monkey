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
    this.cookieService.set('user-id', user.ID ? user.ID.toString() : '');
    const userFound = this.constants._userConstants.usersList.find(
      (userTemp) => userTemp.ID === user.ID
    );
    if (userFound) {
      this.constants._userConstants.user = userFound;
      this.constants._userConstants.depIndex =
        this.constants._userConstants.departmentList.findIndex(
          (dep) => dep.ID === userFound.DepartmentID
        );
    }
  }

  createUser(newUser: User_) {
    console.log('Creando usuario...');
    console.log({ newUser, claves: Object.keys(newUser) });
    let columns,
      data: string = '';
    for (let key of Object.keys(newUser)) {
      columns = (columns ? `${columns}, ` : '') + `${key}`;
    }
    for (let value of Object.values(newUser)) {
      data =
        (data ? `${data}, ` : '') + (isNaN(value) ? `'${value}'` : `${value}`);
    }
    const body = {
      table: 'users',
      columns: columns,
      data: data,
    };
    console.log({ body });
    this.api.apiUser.createUser(body).subscribe({
      next: (res) => {
        console.log({ res });
        if (res.body) {
          newUser.ID = res.body[0].insertId;
        }
      },
      complete: () => {
        console.log({ newUser });
        if (this.constants._userConstants.usersList.length !== 0) {
          this.constants._userConstants.usersList.push(newUser);
          console.log({ usersList: this.constants._userConstants.usersList });
          console.log('Usuario creado con exito');
        } else {
          this.constants._userConstants.usersList = [newUser];
          console.log({ usersList: this.constants._userConstants.usersList });
          console.log('Usuario creado con exito');
        }
      },
    });
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
    console.log({ form, howAction });
    let idTemp: any;
    if (
      this.constants._userConstants.currentUser &&
      this.constants._userConstants.currentUser?.Name !== ''
    ) {
      idTemp = this.constants._userConstants.currentUser.ID;
    } else if (this.constants._userConstants.user) {
      idTemp = this.constants._userConstants.user.ID;
    }
    console.log({
      currentUser: this.constants._userConstants.currentUser,
      loggedUser: this.constants._userConstants.user,
    });
    console.log({ form, howAction });
    if (howAction === 'isUpdate') {
      console.log('Actualizando...');
      if (this.constants._userConstants.currentUser) {
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
              (this.constants._userConstants.currentUser.Password ===
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
                console.log({ departmentID: form.department });
                const depTemp =
                  this.constants._userConstants.departmentList.find(
                    (department) => department.ID === form.department - 1
                  );
                if (depTemp) {
                  console.log('departamento valido');
                  const newUser: User_ = {
                    ID: this.constants._userConstants.currentUser
                      ? this.constants._userConstants.currentUser.ID
                      : undefined,
                    Name: form.name,
                    Password:
                      form.newPass !== '' &&
                      form.newPass !==
                        this.constants._userConstants.currentUser.Password
                        ? form.newPass
                        : this.constants._userConstants.currentUser.Password,
                    Email: form.email,
                    DepartmentID: depTemp.ID,
                    Rut: form.rut,
                  };
                  const body = {
                    columnsData: `Name = '${newUser.Name}', Password = '${newUser.Password}', Email = '${newUser.Email}', DepartmentID = ${newUser.DepartmentID}, Rut = '${newUser.Rut}'`,
                  };
                  this.api.apiUser
                    .updateUser(body, newUser.ID ? newUser.ID : -1)
                    .subscribe({
                      next: (res) => {
                        console.log({ res });
                      },
                      complete: () => {
                        console.log({
                          userIndexListUpdated:
                            this.constants._userConstants.usersList.findIndex(
                              (user) => user.ID === idTemp
                            ),
                        });
                        const indexTemp =
                          this.constants._userConstants.usersList.findIndex(
                            (user) => user.ID === idTemp
                          );
                        this.constants._userConstants.usersList[indexTemp] =
                          newUser;
                        if (
                          this.constants._userConstants.user &&
                          this.constants._userConstants.user.ID ===
                            this.constants._userConstants.usersList[indexTemp]
                              .ID
                        ) {
                          this.constants._userConstants.user = newUser;
                        }
                        this.constants._userConstants.currentUser = newUser;
                        console.log({
                          usuarUpdated:
                            this.constants._userConstants.usersList[indexTemp],
                        });
                        console.log('Usuario modificado');
                      },
                    });
                }
              }
            }
          }
        }
      }
    } else if (howAction === 'isCreate') {
      console.log('Validando formulario de nuevo usuario...');
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
                  Name: form.name,
                  Password: form.newPass,
                  Email: form.email,
                  DepartmentID: depTemp.ID,
                  Rut: form.rut,
                };
                this.createUser(newUser);
              } else {
                console.log('Departamento invalido, intente denuevo por favor');
              }
            } else {
              console.log('Correo invalido, intente denuevo por favor');
            }
          } else {
            console.log('Contraseñas invalidas, intente denuevo por favor');
          }
        } else {
          console.log('Rut invalido, intente denuevo por favor');
        }
      } else {
        console.log('Nombre invalido, intente denuevo por favor');
      }
    }
  }
}
