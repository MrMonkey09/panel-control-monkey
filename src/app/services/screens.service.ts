import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { SocketioService } from './socketio.service';
import { Screen_ } from '../interfaces/screen';
import { GroupScreen_ } from '../interfaces/group-screen';
import { User_ } from '../interfaces/user';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root',
})
export class ScreensService {
  constructor(
    public constants: ConstantsService,
    private sw: SocketioService,
    private api: ApiService
  ) {
    console.log('Screens Servicio Cargado');
  }

  // Logica de la seleccion y despliegue de pantallas
  addScreen(screenSelected: Screen_) {
    console.log('Agregando pantalla...');
    const newList = this.constants._scrnConstants.screenList.filter(
      (screen) => screen != screenSelected
    );
    screenSelected.CurrentGroupID =
      this.constants._scrnConstants.currentGroup.ID;
    console.log({
      screenSelected,
      currentGroup: this.constants._scrnConstants.currentGroup,
      newList: newList,
    });
    const columns = Object.keys(screenSelected);
    const data = Object.values(screenSelected);
    const columnsData = `${columns[1]} = '${data[1]}', ${columns[2]} = '${data[2]}', ${columns[3]} = ${data[3]}, ${columns[4]} = ${data[4]}, ${columns[5]} = ${data[5]}`;
    const body = {
      columnsData: columnsData,
      criterion: `WHERE ID = ${screenSelected.ID}`,
    };
    console.log({ body });
    this.api.apiScreen.updateScreen(body, screenSelected.ID).subscribe({
      next: (res) => {
        console.log({ res });
      },
      complete: () => {
        const body = {
          columns: 'ScreenID, GroupScreenID',
          data: `${screenSelected.ID},${screenSelected.CurrentGroupID}`,
        };
        this.api.apiScreen.addScreenToList(body, screenSelected.ID).subscribe({
          next: (res) => {
            console.log({ res });
          },
          complete: () => {
            this.constants._scrnConstants.screenList = newList;
            const indexGroup =
              this.constants._scrnConstants.groupsScreen.findIndex(
                (group) => group.ID === screenSelected.CurrentGroupID
              );
            if (
              this.constants._scrnConstants.groupsScreen[indexGroup]
                .ScreenList &&
              this.constants._scrnConstants.groupsScreen[indexGroup].ScreenList
                .length !== 0
            ) {
              this.constants._scrnConstants.groupsScreen[
                indexGroup
              ].ScreenList.push(screenSelected);
            } else {
              this.constants._scrnConstants.groupsScreen[
                indexGroup
              ].ScreenList = [screenSelected];
            }
            console.log({
              newGroupList: this.constants._scrnConstants.groupsScreen,
            });
            console.log({
              newGroup: this.constants._scrnConstants.currentGroup,
            });
            this.constants._scrnConstants.avalaibles =
              this.constants._scrnConstants.screenList.filter(
                (screen) => !screen.CurrentGroupID
              );
            this.constants._scrnConstants.selected =
              this.constants._scrnConstants.avalaibles.filter(
                (screen) =>
                  screen.DepartmentID ===
                  this.constants._userConstants.user.DepartmentID
              );
            this.constants._scrnConstants.activeGroupScreens =
              this.constants._scrnConstants.groupsScreen.filter(
                (group) =>
                  group.DepartmentID ===
                  this.constants._userConstants.user.DepartmentID
              );
            console.log({
              activeGroups: this.constants._scrnConstants.activeGroupScreens,
            });
          },
        });
        /* this.sw.emitEvento('screen', {
            newAvalaibles: newListAvalaibles,
            screen: screenSelected,
            group: this.constants._scrnConstants.currentGroup,
          }); */
      },
    });
  }

  removeScreen(screenSelected: Screen_) {
    console.log('Eliminando pantalla...');
    const currentIndexGroup =
      this.constants._scrnConstants.groupsScreen.findIndex(
        (groupTemp) =>
          groupTemp.ID === this.constants._scrnConstants.currentGroup.ID
      );
    const newList =
      this.constants._scrnConstants.currentGroup.ScreenList.filter(
        (screen) => screen != screenSelected
      );
    screenSelected.CurrentGroupID = undefined;
    console.log({
      screenSelected,
      currentGroup: this.constants._scrnConstants.currentGroup,
      newList: newList,
    });
    this.api.apiScreen.removeScreenOfList(screenSelected.ID).subscribe({
      next: (res) => {
        console.log({ res });
      },
      complete: () => {
        screenSelected.CurrentGroupID = undefined;
        const columns = Object.keys(screenSelected);
        const data = Object.values(screenSelected);
        const columnsData = `${columns[1]} = '${data[1]}', ${columns[2]} = '${data[2]}', ${columns[3]} = NULL, ${columns[4]} = ${data[4]}, ${columns[5]} = ${data[5]}`;
        const body = {
          columnsData: columnsData,
          criterion: `WHERE ID = ${screenSelected.ID}`,
        };
        console.log({ body });
        this.api.apiScreen.updateScreen(body, screenSelected.ID).subscribe({
          next: (res) => {
            console.log({ resDel: res });
          },
          complete: () => {
            if (
              this.constants._scrnConstants.avalaibles &&
              this.constants._scrnConstants.avalaibles.length !== 0
            ) {
              this.constants._scrnConstants.avalaibles = [screenSelected];
            } else {
              this.constants._scrnConstants.avalaibles.push(screenSelected);
            }
            if (
              this.constants._scrnConstants.selected &&
              this.constants._scrnConstants.selected.length !== 0
            ) {
              this.constants._scrnConstants.selected = [screenSelected];
            } else {
              this.constants._scrnConstants.selected.push(screenSelected);
            }
            if (
              this.constants._scrnConstants.currentGroup &&
              this.constants._scrnConstants.currentGroup.ScreenList
            ) {
              this.constants._scrnConstants.currentGroup.ScreenList = newList;
              this.constants._scrnConstants.groupsScreen[
                currentIndexGroup
              ].ScreenList = newList;
              /* this.sw.emitEvento('screen', {
            newAvalaibles: this.constants._scrnConstants.avalaibles,
            screenDel: screenSelected,
            group: this.constants._scrnConstants.currentGroup,
          }); */
              console.log({
                PantallaRemovida: screenSelected,
                GrupoSeleccionado: this.constants._scrnConstants.currentGroup,
              });
            }
          },
        });
      },
    });
  }

  getScreen() {
    console.log('Obteniendo pantalla...');
    /*     this.api.apiScreen.matchScreen().subscribe({
      next: (res) => {
        console.log({resIp: res});
        let screenMatch;
        if (
          this.constants._scrnConstants.avalaibles &&
          this.constants._scrnConstants.avalaibles.find(
            (screen) => screen.IP === res
          )
        ) {
          screenMatch = this.constants._scrnConstants.avalaibles.find(
            (screen) => screen.IP === res
          );
        } else if (
          this.constants._scrnConstants.screensDetectedQueue &&
          this.constants._scrnConstants.screensDetectedQueue.find(
            (screen) => screen.ip === res
          )
        ) {
          screenMatch =
            this.constants._scrnConstants.screensDetectedQueue.find(
              (screen) => screen.ip === res
            );
        } else if (
          this.constants._scrnConstants.currentGroup &&
          this.constants._scrnConstants.currentGroup.ScreenListID
        ) {
          screenMatch =
            this.constants._scrnConstants.currentGroup.screenList.find(
              (screen) => screen.IP === res
            );
        }
        console.log({screenMatch});
        if (screenMatch) {
          this.constants._scrnConstants.currentScreen = screenMatch;
        } else {
          const screenDetected = {
            id: this.constants._scrnConstants.screenDetectedCount + 1,
            ip: res,
          };
          console.log({screenDetected});
          if (this.constants._scrnConstants.screensDetectedQueue) {
            this.constants._scrnConstants.screensDetectedQueue.push(
              screenDetected
            );
          } else {
            this.constants._scrnConstants.screensDetectedQueue = [
              screenDetected,
            ];
          }
          this.sw.emitEvento('screen', {
            screen: screenDetected,
            group: this.constants._scrnConstants.currentGroup
              ? this.constants._scrnConstants.currentGroup
              : {},
          });
        }
      },
      complete: () => {
        if (this.constants._scrnConstants.currentScreen) {
          if (this.constants._scrnConstants.currentScreen.CurrentGroup) {
            const screenGroup = this.constants._scrnConstants.groupsScreen.find(
              (group) =>
                group.ID ===
                this.constants._scrnConstants.currentScreen.CurrentGroup
            );
            this.constants._scrnConstants.currentGroup = screenGroup;
          }
        }
      },
    }); */
  }

  getAllScreens() {
    console.log('Obteniendo todas las pantallas...');
    if (
      !this.constants._scrnConstants.screenList ||
      (this.constants._scrnConstants.screenList &&
        this.constants._scrnConstants.screenList.length == 0)
    ) {
      let resTemp: any;
      this.api.apiScreen.allScreens().subscribe({
        next: (res) => {
          resTemp = res;
        },
        complete: () => {
          console.log({ screens: resTemp });
          this.constants._scrnConstants = resTemp;
        },
      });
    }
  }

  getAllLocations() {
    console.log('Obteniendo todas los lugares...');
    let resTemp: any;
    this.api.apiLocation.allLocations().subscribe({
      next: (res) => {
        resTemp = res;
      },
      complete: () => {
        console.log({ locations: resTemp });
        this.constants._scrnConstants.locations = resTemp;
      },
    });
  }

  getScreenInQueue(screen: any) {
    console.log('Obteniendo pantalla en cola seleccionada...');
    console.log({ screen });
    this.constants._scrnConstants.currentScreenInQueue = screen;
    screen.Brand
      ? (this.constants._scrnConstants.screenDetectedForm = {
          Brand: screen.Brand,
          LocationID: screen.LocationID + 1,
          DepartmentID: screen.DepartmentID + 1,
        })
      : (this.constants._scrnConstants.screenDetectedForm = {
          Brand: '',
          LocationID: 0,
          DepartmentID: 0,
        });
    console.log({
      currentInQueue: this.constants._scrnConstants.currentScreenInQueue,
    });
    this.constants._scrnConstants.isScreenInQueueSelected = true;
  }

  activateScreen(screen: Screen_) {
    console.log('Activando pantalla...');
    console.log({
      'Pantalla activada': screen,
      constants: this.constants._scrnConstants,
    });
    let columns,
      data: string = '';
    for (let key of Object.keys(screen)) {
      columns = (columns ? `${columns}, ` : '') + `${key}`;
    }
    for (let value of Object.values(screen)) {
      data =
        (data ? `${data}, ` : '') + (isNaN(value) ? `'${value}'` : `${value}`);
    }
    const body = {
      table: 'screens',
      columns: columns,
      data: data,
    };
    console.log({ body });
    let resTemp;
    this.api.apiScreen.createScreen(body).subscribe({
      next: (res) => {
        console.log({ res });
        if (res.body) {
          resTemp = res.body[0].insertId;
          screen.ID = resTemp;
        }
      },
      complete: () => {
        console.log({ screen });
        if (
          this.constants._scrnConstants.screenList &&
          this.constants._scrnConstants.screenList.length !== 0
        ) {
          this.constants._scrnConstants.screenList.push(screen);
        } else {
          this.constants._scrnConstants.screenList = [screen];
        }
        this.constants._scrnConstants.screensDetectedQueue =
          this.constants._scrnConstants.screensDetectedQueue.filter(
            (screenTemp) => screenTemp.IP !== screen.IP
          );
        this.getSelectedScreens(this.constants._userConstants.user);
      },
    });
    /*this.sw.emitEvento('screen', {
      screen: screen,
      group: this.constants._scrnConstants.currentGroup
        ? this.constants._scrnConstants.currentGroup
        : {},
      newQueue: this.constants._scrnConstants.screensDetectedQueue,
      newAvalaibles: this.constants._scrnConstants.avalaibles,
    }); */
  }

  desactivateScreen(screen: Screen_) {
    console.log('Desactivando pantalla...');
    console.log({ 'Pantalla desactivada': screen });
    this.api.apiScreen.deleteScreen(screen.ID).subscribe({
      next: (res) => {
        console.log({ res });
      },
      complete: () => {
        this.constants._scrnConstants.screensDetectedQueue &&
        this.constants._scrnConstants.screensDetectedQueue.length !== 0
          ? this.constants._scrnConstants.screensDetectedQueue.push(screen)
          : (this.constants._scrnConstants.screensDetectedQueue = [screen]);
        this.constants._scrnConstants.screenList =
          this.constants._scrnConstants.screenList.filter(
            (screenTemp) => screenTemp.IP !== screen.IP
          );
        this.getSelectedScreens(this.constants._userConstants.user);
      },
    });
    /* this.sw.emitEvento('screen', {
      screen: screen,
      group: this.constants._scrnConstants.currentGroup
        ? this.constants._scrnConstants.currentGroup
        : {},
      newQueue: this.constants._scrnConstants.screensDetectedQueue,
      newAvalaibles: this.constants._scrnConstants.avalaibles,
    }); */
  }

  getForm(form: any, howAction: any, user: User_) {
    console.log('Obteniendo formulario...');
    console.log({
      currentScreenInQueue: this.constants._scrnConstants.currentScreenInQueue,
    });
    console.log({ form, howAction, user });
    if (this.constants._scrnConstants.currentScreenInQueue) {
      if (howAction === 'isModify') {
        console.log('Actualizando...');
        if (form.Brand !== '') {
          console.log('marca valida');
          if (form.LocationID !== 0) {
            console.log('lugar valido');
            if (form.DepartmentID !== 0) {
              console.log('departamento valido');
              const departmentTemp =
                this.constants._userConstants.departmentList.find(
                  (department) => department.ID === form.DepartmentID - 1
                );
              const locationTemp = this.constants._scrnConstants.locations.find(
                (loc) => loc.ID === form.LocationID - 1
              );
              console.log({ departmentTemp, locationTemp });
              const newScreenInfo: Screen_ = {
                ID: this.constants._scrnConstants.currentScreenInQueue.ID,
                IP: this.constants._scrnConstants.currentScreenInQueue.IP,
                CurrentGroupID:
                  this.constants._scrnConstants.currentScreenInQueue
                    .CurrentGroupID === undefined
                    ? null
                    : this.constants._scrnConstants.currentScreenInQueue
                        .CurrentGroupID,
                Brand: form.Brand,
                LocationID: locationTemp ? locationTemp.ID : -1,
                DepartmentID: departmentTemp ? departmentTemp.ID : -1,
              };
              const columns = Object.keys(newScreenInfo);
              const data = Object.values(newScreenInfo);
              const columnsData = `${columns[1]} = '${data[1]}', ${columns[2]} = ${data[2]}, ${columns[3]} = '${data[3]}', ${columns[4]} = ${data[4]}, ${columns[5]} = ${data[5]}`;
              const body = {
                columnsData: columnsData,
                criterion: `WHERE ID = ${newScreenInfo.ID}`,
              };
              console.log({ body });
              this.api.apiScreen
                .updateScreen(body, newScreenInfo.ID)
                .subscribe({
                  next: (res) => {
                    console.log({ res });
                  },
                  complete: () => {
                    this.constants._scrnConstants.screenList[
                      this.constants._scrnConstants.screenList.findIndex(
                        (screen) =>
                          screen.ID ===
                          this.constants._scrnConstants.currentScreenInQueue.ID
                      )
                    ] = newScreenInfo;
                    console.log({
                      newScreenList: this.constants._scrnConstants.screenList,
                    });
                    this.getSelectedScreens(this.constants._userConstants.user);
                  },
                });
              /* this.sw.emitEvento('screen', {
                screen:
                  this.constants._scrnConstants.avalaibles[
                    this.constants._scrnConstants.avalaibles.findIndex(
                      (screen) =>
                        screen.ID ===
                        this.constants._scrnConstants.currentScreenInQueue.id
                    )
                  ],
                group: this.constants._scrnConstants.currentGroup
                  ? this.constants._scrnConstants.currentGroup
                  : {},
                newQueue: this.constants._scrnConstants.screensDetectedQueue,
                newAvalaibles: this.constants._scrnConstants.avalaibles,
              }); */
            }
          }
        }
      } else if (howAction === 'isActivate') {
        console.log('Activando...');
        if (form.Brand !== '') {
          console.log('marca valida');
          if (form.LocationID !== 0) {
            console.log('lugar valido');
            if (form.DepartmentID !== 0) {
              console.log('departamento valido');
              const locationTemp =
                this.constants._scrnConstants.locations[
                  this.constants._scrnConstants.locations.findIndex(
                    (loc) => loc.ID === form.LocationID - 1
                  )
                ];
              console.log({
                depList: this.constants._userConstants.departmentList,
              });
              const newScreenAvalaible: any = {
                IP: this.constants._scrnConstants.currentScreenInQueue.IP,
                Brand: form.Brand,
                LocationID: locationTemp.ID,
                DepartmentID: user.DepartmentID,
              };
              console.log({ newScreenAvalaible });
              this.activateScreen(newScreenAvalaible);
              console.log('Pantalla detectada Activada');
            } else {
              console.error('Ingrese un departamento valido por favor');
            }
          } else {
            console.error('Ingrese un lugar valido por favor');
          }
        } else {
          console.error('Ingrese una marca valida por favor');
        }
      }
    } else {
      console.error('Seleccione una pantalla en cola por favor');
    }
  }

  getSelectedScreens(user: User_) {
    console.log('Obteniendo todas las pantallas disponibles por usuario...');
    var newSelected: any;
    this.constants._scrnConstants.avalaibles =
      this.constants._scrnConstants.screenList.filter(
        (screen) => !screen.CurrentGroupID
      );
    console.log({
      user,
      selected: this.constants._scrnConstants.selected,
      avalaibles: this.constants._scrnConstants.avalaibles,
    });
    if (
      this.constants._scrnConstants.avalaibles &&
      this.constants._scrnConstants.avalaibles.length !== 0
    ) {
      newSelected = this.constants._scrnConstants.avalaibles.filter(
        (screen) => user.DepartmentID === screen.DepartmentID
      );
      if (newSelected) {
        console.log({
          newSelected,
          avalaibles: this.constants._scrnConstants.avalaibles,
        });
        this.constants._scrnConstants.selected = newSelected;
        console.log({ selected: this.constants._scrnConstants.selected });
      } else {
        this.constants._scrnConstants.selected = [];
        console.log({ selected: this.constants._scrnConstants.selected });
      }
    } else {
      console.log('Sin pantallas disponibles en lista...');
    }
  }

  createGroup(user: User_) {
    console.log('Creando grupo de pantallas...');
    console.log({
      groupTemp: this.constants._scrnConstants.groupFormTemp,
    });
    const newGroup: GroupScreen_ = {
      Name: this.constants._scrnConstants.groupFormTemp.Name,
      DepartmentID: user.DepartmentID,
      CurrentVideo: '',
      ScreenList: [],
    };
    console.log({
      newGroup,
      groupsScreen: this.constants._scrnConstants.groupsScreen,
    });
    if (
      this.constants._scrnConstants.groupsScreen &&
      this.constants._scrnConstants.groupsScreen.length !== 0
    ) {
      this.api.apiGroupScreen
        .createGroupScreen({
          table: 'groups_screen',
          columns: 'Name, DepartmentID',
          data: `'${newGroup.Name}', ${newGroup.DepartmentID}`,
        })
        .subscribe({
          next: (result) => {
            if (result.body) {
              console.log({ result, resBody: result.body[0] });
              newGroup.ID = result.body[0].insertId;
            }
          },
          complete: () => {
            this.constants._scrnConstants.groupsScreen.push(newGroup);
            this.constants._scrnConstants.activeGroupScreens.push(newGroup);
            this.sw.emitEvento('group', {
              groups: this.constants._scrnConstants.groupsScreen,
            });
          },
        });
    } else {
      this.api.apiGroupScreen
        .createGroupScreen({
          table: 'groups_screen',
          columns: 'Name, DepartmentID',
          data: `'${newGroup.Name}', ${newGroup.DepartmentID}`,
        })
        .subscribe({
          next: (result) => {
            if (result.body) {
              console.log({ result, resBody: result.body[0] });
              newGroup.ID = result.body[0].insertId;
            }
          },
          complete: () => {
            this.constants._scrnConstants.groupsScreen = [newGroup];
            this.constants._scrnConstants.activeGroupScreens = [newGroup];
            this.sw.emitEvento('group', {
              groups: this.constants._scrnConstants.groupsScreen,
            });
          },
        });
    }
  }

  getScreenGroups(user: User_) {
    console.log('Obteniendo todos los grupos de pantallas por usuario...');
    console.log({ user, groups: this.constants._scrnConstants.groupsScreen });
    if (
      this.constants._scrnConstants.groupsScreen &&
      this.constants._scrnConstants.groupsScreen.length !== 0
    ) {
      console.log({
        groupsFilter: this.constants._scrnConstants.groupsScreen.filter(
          (group) => group.DepartmentID === user.DepartmentID
        ),
        groupsList: this.constants._scrnConstants.groupsScreen,
      });
      this.constants._scrnConstants.activeGroupScreens =
        this.constants._scrnConstants.groupsScreen.filter(
          (group) => group.DepartmentID === user.DepartmentID
        );
      console.log({
        actuaList: this.constants._scrnConstants.activeGroupScreens,
      });
      this.constants._scrnConstants.isActiveGroup = false;
      this.constants._scrnConstants.isCurrentGroup = false;
    } else {
      this.constants._scrnConstants.activeGroupScreens = [];
      this.constants._scrnConstants.isCurrentGroup = false;
      this.constants._scrnConstants.isActiveGroup = false;
      console.log('Ningun Grupo de Pantallas en lista...');
    }
  }
}
