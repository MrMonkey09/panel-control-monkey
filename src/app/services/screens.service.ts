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
    /*     const newListAvalaibles = this.constants._scrnConstants.avalaibles.filter(
      (screen) => screen != screenSelected
    );
    this.constants._scrnConstants.selected =
      this.constants._scrnConstants.selected.filter(
        (screen) => screen !== screenSelected
      );
    this.constants._scrnConstants.avalaibles = newListAvalaibles;
 */
    /* if (
      this.constants._scrnConstants.currentGroup &&
      !this.constants._scrnConstants.currentGroup.screenList
    ) {
      screenSelected.CurrentGroup =
        this.constants._scrnConstants.currentGroup.ID;
      this.constants._scrnConstants.currentGroup.screenList = [screenSelected];
      this.sw.emitEvento('screen', {
        newAvalaibles: newListAvalaibles,
        screen: screenSelected,
        group: this.constants._scrnConstants.currentGroup,
      });
    } else {
      if (
        this.constants._scrnConstants.currentGroup &&
        this.constants._scrnConstants.currentGroup.screenList
      ) {
        screenSelected.CurrentGroup =
          this.constants._scrnConstants.currentGroup.ID;
        this.constants._scrnConstants.currentGroup.screenList.push(
          screenSelected
        );
        this.sw.emitEvento('screen', {
          newAvalaibles: newListAvalaibles,
          screen: screenSelected,
          group: this.constants._scrnConstants.currentGroup,
        });
      }
    } */
    /*     console.log({
      PantallaAñadida: screenSelected,
      GrupoSeleccionado: this.constants._scrnConstants.currentGroup,
    }); */
  }

  removeScreen(screenSelected: Screen_) {
    console.log('Eliminando pantalla...');
    /*     screenSelected.CurrentGroup = undefined;
    if (this.constants._scrnConstants.avalaibles.length < 1) {
      this.constants._scrnConstants.avalaibles = [screenSelected];
    } else {
      this.constants._scrnConstants.avalaibles.push(screenSelected);
    }
    if (this.constants._scrnConstants.selected.length < 1) {
      this.constants._scrnConstants.selected = [screenSelected];
    } else {
      this.constants._scrnConstants.selected.push(screenSelected);
    }
    if (
      this.constants._scrnConstants.currentGroup &&
      this.constants._scrnConstants.currentGroup.screenList
    ) {
      const newGroupScreenList =
        this.constants._scrnConstants.currentGroup.screenList.filter(
          (screen: any) => screen != screenSelected
        );
      this.constants._scrnConstants.currentGroup.screenList =
        newGroupScreenList;
      this.sw.emitEvento('screen', {
        newAvalaibles: this.constants._scrnConstants.avalaibles,
        screenDel: screenSelected,
        group: this.constants._scrnConstants.currentGroup,
      });
      console.log({
        PantallaRemovida: screenSelected,
        GrupoSeleccionado: this.constants._scrnConstants.currentGroup,
      });
    } */
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
          this.constants._scrnConstants.screenList = resTemp;
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
    console.log('Obteniendo pantallas en cola...');
    /*    console.log({ screen });
    this.constants._scrnConstants.currentScreenInQueue = screen;
    screen.brand
      ? (this.constants._scrnConstants.screenDetectedForm = {
          brand: screen.brand,
          location: screen.location.id + 1,
          department: screen.deparment,
        })
      : (this.constants._scrnConstants.screenDetectedForm = {
          brand: '',
          location: 0,
          department: 0,
        });
    console.log(this.constants._scrnConstants.currentScreenInQueue);
    this.constants._scrnConstants.isScreenInQueueSelected = true; */
  }

  activateScreen(screen: Screen_) {
    console.log('Activando pantalla...');
    /*     console.log({
      'Pantalla activada': screen,
      constants: this.constants._scrnConstants,
    });
    if (
      this.constants._scrnConstants.avalaibles &&
      this.constants._scrnConstants.avalaibles.length !== 0
    ) {
      this.constants._scrnConstants.avalaibles.push(screen);
    } else {
      this.constants._scrnConstants.avalaibles = [screen];
    }
    if (
      this.constants._scrnConstants.selected &&
      this.constants._scrnConstants.selected.length !== 0
    ) {
      console.log({ selected: this.constants._scrnConstants.selected });
      //this.constants._scrnConstants.selected.push(screen);
    } else {
      this.constants._scrnConstants.selected = [screen];
    }
    this.constants._scrnConstants.screensDetectedQueue =
      this.constants._scrnConstants.screensDetectedQueue.filter(
        (screenTemp) => screenTemp.ip !== screen.IP
      );
    this.sw.emitEvento('screen', {
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
    /*     console.log({ 'Pantalla desactivada': screen });
    this.constants._scrnConstants.screensDetectedQueue
      ? this.constants._scrnConstants.screensDetectedQueue.push(screen)
      : (this.constants._scrnConstants.screensDetectedQueue = [screen]);
    this.constants._scrnConstants.avalaibles =
      this.constants._scrnConstants.avalaibles.filter(
        (screenTemp) => screenTemp.IP !== screen.IP
      );
    this.sw.emitEvento('screen', {
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
    /*     let idTemp: any;
    if (this.constants._scrnConstants.currentScreenInQueue) {
      idTemp = this.constants._scrnConstants.screensDetectedQueue.find(
        (screen) =>
          screen.id === this.constants._scrnConstants.currentScreenInQueue?.id
      )?.id;
    }
    console.log({
      currentScreenInQueue: this.constants._scrnConstants.currentScreenInQueue,
    });
    console.log({ form, howAction, user });
    console.log(this.constants._scrnConstants.screenDetectedCount);
    if (howAction === 'isModify') {
      console.log('Actualizando...');
      if (form.brand !== '') {
        console.log('marca valida');
        if (form.location !== 0) {
          console.log('lugar valido');
          if (form.department !== 0) {
            console.log('departamento valido');
            const departmentTemp =
              this.constants._userConstants.departmentList[
                this.constants._userConstants.departmentList.findIndex(
                  (department) => department.ID === form.department - 1
                )
              ];
            const locationTemp =
              this.constants._scrnConstants.locations[
                this.constants._scrnConstants.locations.findIndex(
                  (loc) => loc.ID === form.location - 1
                )
              ];
            const newScreenInfo: Screen_ = {
              ID: this.constants._scrnConstants.currentScreenInQueue.id,
              IP: this.constants._scrnConstants.currentScreenInQueue.ip,
              CurrentGroup:
                this.constants._scrnConstants.currentScreenInQueue.currentGroup,
              Brand: form.brand,
              LocationID: locationTemp.ID,
              DepartmentID: departmentTemp.ID,
            };

            this.constants._scrnConstants.avalaibles[
              this.constants._scrnConstants.avalaibles.findIndex(
                (screen) =>
                  screen.ID ===
                  this.constants._scrnConstants.currentScreenInQueue.id
              )
            ] = newScreenInfo;

            this.sw.emitEvento('screen', {
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
            });
            console.log('Pantalla detectada Activada');
          }
        }
      }
    } else if (howAction === 'isActivate') {
      console.log('Activando...');
      if (form.brand !== '') {
        console.log('marca valida');
        if (form.location !== 0) {
          console.log('lugar valido');
          if (form.department !== 0) {
            console.log('departamento valido');
            const locationTemp =
              this.constants._scrnConstants.locations[
                this.constants._scrnConstants.locations.findIndex(
                  (loc) => loc.ID === form.location - 1
                )
              ];
            console.log(this.constants._userConstants.departmentList);
            const departmentTemp =
              this.constants._userConstants.departmentList[
                this.constants._userConstants.departmentList.findIndex(
                  (department) => department.ID === form.department - 1
                )
              ];
            const newScreenAvalaible: Screen_ = {
              ID: this.constants._scrnConstants.currentScreenInQueue.id,
              IP: this.constants._scrnConstants.currentScreenInQueue.ip,
              CurrentGroup: undefined,
              Brand: form.brand,
              LocationID: locationTemp.ID,
              DepartmentID: departmentTemp.ID,
            };
            this.activateScreen(newScreenAvalaible);
            console.log('Pantalla detectada Activada');
          }
        }
      }
    } */
  }

  openScreenActivated() {
    console.log('Abriendo panel de activacion de pantallas...');
    /*     console.log('Creador de usuarios abierto');
    setTimeout(() => {
      this.constants._scrnConstants.isPanelScreenUsed = true;
      this.constants._scrnConstants.isScreenActivatedOpened = true;
      this.constants._scrnConstants.isScreenModifiedOpened = false;
      this.constants._scrnConstants.isScreenDesactivatedOpened = false;
    }, 100); */
  }

  openScreenModified() {
    console.log('Abriendo panel de modificacion de pantallas...');
    /*     console.log('Actualizador de usuarios abierto');
    setTimeout(() => {
      this.constants._scrnConstants.isPanelScreenUsed = true;
      this.constants._scrnConstants.isScreenActivatedOpened = false;
      this.constants._scrnConstants.isScreenModifiedOpened = true;
      this.constants._scrnConstants.isScreenDesactivatedOpened = false;
    }, 100); */
  }

  openScreenDesactivated() {
    console.log('Abriendo panel de desactivador de pantallas...');
    /*     console.log('Eliminador de usuarios abierto');
    setTimeout(() => {
      this.constants._scrnConstants.isPanelScreenUsed = true;
      this.constants._scrnConstants.isScreenActivatedOpened = false;
      this.constants._scrnConstants.isScreenModifiedOpened = false;
      this.constants._scrnConstants.isScreenDesactivatedOpened = true;
    }, 100); */
  }

  getAvalaiblescreens(user: User_) {
    console.log('Obteniendo todas las pantallas disponibles por usuario...');
    var newSelected: any;
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
      console.log({
        newSelected,
        avalaibles: this.constants._scrnConstants.avalaibles,
      });
      this.constants._scrnConstants.selected = newSelected;
      console.log({ selected: this.constants._scrnConstants.selected });
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
    };
    console.log({
      newGroup,
      groupsScreen: this.constants._scrnConstants.groupsScreen,
    });
    if (this.constants._scrnConstants.groupsScreen) {
      this.constants._scrnConstants.groupsScreen.push(newGroup);
      this.constants._scrnConstants.activeGroupScreens.push(newGroup);
      this.api.apiGroupScreen
        .createGroupScreen({
          table: 'groups_screen',
          columns: 'Name, DepartmentID',
          data: `'${newGroup.Name}', ${newGroup.DepartmentID}`,
        })
        .subscribe({
          next: (result) => {
            console.log({ result });
          },
          complete: () => {
            this.sw.emitEvento('group', {
              groups: this.constants._scrnConstants.groupsScreen,
            });
          },
        });
    } else {
      this.constants._scrnConstants.groupsScreen = [newGroup];
      this.constants._scrnConstants.activeGroupScreens = [newGroup];
      this.api.apiGroupScreen
        .createGroupScreen({
          table: 'groups_screen',
          columns: 'Name, DepartmentID',
          data: `'${newGroup.Name}', ${newGroup.DepartmentID}`,
        })
        .subscribe({
          next: (result) => {
            console.log({ result });
          },
          complete: () => {
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
      console.log('Ningun Grupo de Pantallas en lista...');
    }
  }
}
