import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { SocketioService } from './socketio.service';
import { Screen_ } from '../../../interfaces/screen';
import { GroupScreen_ } from '../../../interfaces/group-screen';
import { User_ } from '../../../interfaces/user';
import { _ScreensConstants } from 'src/app/constants/screens.constants';
import { _UserConstants } from 'src/app/constants/user-service.constants';

@Injectable({
  providedIn: 'root',
})
export class ScreensService {
  _constants!: _ScreensConstants;
  _userConstants!: _UserConstants;

  constructor(private sw: SocketioService, private api: ApiService) {
    this.getAllScreens();
    this.getAllLocations();
    console.log('Screens Servicio Cargado');
    let resTemp: any;
    api.apiGroupScreen.allGroupsScreen().subscribe({
      next: (res) => {
        resTemp = res;
        console.log(resTemp);
      },
      complete: () => {
        this._constants.screenList = resTemp;
      },
    });
  }

  getConstants(
    screenConstants: _ScreensConstants,
    userContants: _UserConstants
  ) {
    this._constants = screenConstants;
    this._userConstants = userContants;
    return console.log({
      screenConstants: this._constants,
      userConstants: this._userConstants,
    });
  }

  // Logica de la seleccion y despliegue de pantallas
  addScreen(screenSelected: Screen_) {
    const newListAvalaibles = this._constants.avalaibles.filter(
      (screen) => screen != screenSelected
    );
    this._constants.selected = this._constants.selected.filter(
      (screen) => screen !== screenSelected
    );
    this._constants.avalaibles = newListAvalaibles;
    if (
      this._constants.currentGroup &&
      !this._constants.currentGroup.screenList
    ) {
      screenSelected.currentGroup = this._constants.currentGroup.id;
      this._constants.currentGroup.screenList = [screenSelected];
      this.sw.emitEvento('screen', {
        newAvalaibles: newListAvalaibles,
        screen: screenSelected,
        group: this._constants.currentGroup,
      });
    } else {
      if (
        this._constants.currentGroup &&
        this._constants.currentGroup.screenList
      ) {
        screenSelected.currentGroup = this._constants.currentGroup.id;
        this._constants.currentGroup.screenList.push(screenSelected);
        this.sw.emitEvento('screen', {
          newAvalaibles: newListAvalaibles,
          screen: screenSelected,
          group: this._constants.currentGroup,
        });
      }
    }
    console.log({
      PantallaAñadida: screenSelected,
      GrupoSeleccionado: this._constants.currentGroup,
    });
  }

  removeScreen(screenSelected: Screen_) {
    screenSelected.currentGroup = undefined;
    if (this._constants.avalaibles.length < 1) {
      this._constants.avalaibles = [screenSelected];
    } else {
      this._constants.avalaibles.push(screenSelected);
    }
    if (this._constants.selected.length < 1) {
      this._constants.selected = [screenSelected];
    } else {
      this._constants.selected.push(screenSelected);
    }
    if (
      this._constants.currentGroup &&
      this._constants.currentGroup.screenList
    ) {
      const newGroupScreenList = this._constants.currentGroup.screenList.filter(
        (screen: any) => screen != screenSelected
      );
      this._constants.currentGroup.screenList = newGroupScreenList;
      this.sw.emitEvento('screen', {
        newAvalaibles: this._constants.avalaibles,
        screenDel: screenSelected,
        group: this._constants.currentGroup,
      });
      console.log({
        PantallaRemovida: screenSelected,
        GrupoSeleccionado: this._constants.currentGroup,
      });
    }
  }

  getScreen() {
    this.api.apiScreen.matchScreen().subscribe({
      next: (res) => {
        console.log(res.ipScreen);
        let screenMatch;
        if (
          this._constants.avalaibles &&
          this._constants.avalaibles.find(
            (screen) => screen.ip === res.ipScreen
          )
        ) {
          screenMatch = this._constants.avalaibles.find(
            (screen) => screen.ip === res.ipScreen
          );
        } else if (
          this._constants.screensDetectedQueue &&
          this._constants.screensDetectedQueue.find(
            (screen) => screen.ip === res.ipScreen
          )
        ) {
          screenMatch = this._constants.screensDetectedQueue?.find(
            (screen) => screen.ip === res.ipScreen
          );
        } else if (
          this._constants.currentGroup &&
          this._constants.currentGroup.screenList
        ) {
          screenMatch = this._constants.currentGroup.screenList.find(
            (screen) => screen.ip === res.ipScreen
          );
        }
        console.log(screenMatch);
        if (screenMatch) {
          this._constants.currentScreen = screenMatch;
        } else {
          const screenDetected = {
            id: this._constants.screenDetectedCount + 1,
            ip: res.ipScreen,
          };
          console.log(screenDetected);
          if (this._constants.screensDetectedQueue) {
            this._constants.screensDetectedQueue.push(screenDetected);
          } else {
            this._constants.screensDetectedQueue = [screenDetected];
          }
          this.sw.emitEvento('screen', {
            screen: screenDetected,
            group: this._constants.currentGroup
              ? this._constants.currentGroup
              : {},
          });
        }
      },
      complete: () => {
        if (this._constants.currentScreen) {
          if (this._constants.currentScreen.currentGroup) {
            const screenGroup = this._constants.groupsScreen.find(
              (group) => group.id === this._constants.currentScreen.currentGroup
            );
            this._constants.currentGroup = screenGroup;
          }
        }
      },
    });
  }

  getAllScreens() {
    if (
      !this._constants.screenList ||
      (this._constants.screenList && this._constants.screenList.length == 0)
    ) {
      let resTemp: any;
      this.api.apiScreen.allScreens().subscribe({
        next: (res) => {
          resTemp = res;
        },
        complete: () => {
          console.log({ screens: resTemp.screens });
          this._constants.screenList = resTemp.screens;
        },
      });
    }
  }

  getAllLocations() {
    let resTemp: any;
    this.api.apiLocation.allLocations().subscribe({
      next: (res) => {
        resTemp = res;
      },
      complete: () => {
        console.log({ locations: resTemp.locations });
        this._constants.locations = resTemp.locations;
      },
    });
  }

  getScreenInQueue(screen: any) {
    console.log({ screen });
    this._constants.currentScreenInQueue = screen;
    screen.brand
      ? (this._constants.screenDetectedForm = {
          brand: screen.brand,
          location: screen.location.id + 1,
          department: screen.deparment,
        })
      : (this._constants.screenDetectedForm = {
          brand: '',
          location: 0,
          department: 0,
        });
    console.log(this._constants.currentScreenInQueue);
    this._constants.isScreenInQueueSelected = true;
  }

  activateScreen(screen: Screen_) {
    console.log({
      'Pantalla activada': screen,
      constants: this._constants,
    });
    if (this._constants.avalaibles && this._constants.avalaibles.length !== 0) {
      this._constants.avalaibles.push(screen);
    } else {
      this._constants.avalaibles = [screen];
    }
    if (this._constants.selected && this._constants.selected.length !== 0) {
      console.log({ selected: this._constants.selected });
      //this._constants.selected.push(screen);
    } else {
      this._constants.selected = [screen];
    }
    this._constants.screensDetectedQueue =
      this._constants.screensDetectedQueue.filter(
        (screenTemp) => screenTemp.ip !== screen.ip
      );
    this.sw.emitEvento('screen', {
      screen: screen,
      group: this._constants.currentGroup ? this._constants.currentGroup : {},
      newQueue: this._constants.screensDetectedQueue,
      newAvalaibles: this._constants.avalaibles,
    });
  }

  desactivateScreen(screen: Screen_) {
    console.log({ 'Pantalla desactivada': screen });
    this._constants.screensDetectedQueue
      ? this._constants.screensDetectedQueue.push(screen)
      : (this._constants.screensDetectedQueue = [screen]);
    this._constants.avalaibles = this._constants.avalaibles.filter(
      (screenTemp) => screenTemp.ip !== screen.ip
    );
    this.sw.emitEvento('screen', {
      screen: screen,
      group: this._constants.currentGroup ? this._constants.currentGroup : {},
      newQueue: this._constants.screensDetectedQueue,
      newAvalaibles: this._constants.avalaibles,
    });
  }

  getForm(form: any, howAction: any, user: any) {
    let idTemp: any;
    if (this._constants.currentScreenInQueue) {
      idTemp = this._constants.screensDetectedQueue.find(
        (screen) => screen.id === this._constants.currentScreenInQueue?.id
      )?.id;
    }
    console.log({
      currentScreenInQueue: this._constants.currentScreenInQueue,
    });
    console.log({ form, howAction, user });
    console.log(this._constants.screenDetectedCount);
    if (howAction === 'isModify') {
      console.log('Actualizando...');
      if (form.brand !== '') {
        console.log('marca valida');
        if (form.location !== 0) {
          console.log('lugar valido');
          if (form.department !== 0) {
            console.log('departamento valido');
            const departmentTemp =
              this._userConstants.departmentList[
                this._userConstants.departmentList.findIndex(
                  (department) => department.id === form.department - 1
                )
              ];
            const locationTemp =
              this._constants.locations[
                this._constants.locations.findIndex(
                  (loc) => loc.id === form.location - 1
                )
              ];
            const newScreenInfo: Screen_ = {
              id: this._constants.currentScreenInQueue.id,
              ip: this._constants.currentScreenInQueue.ip,
              currentGroup: this._constants.currentScreenInQueue.currentGroup,
              brand: form.brand,
              location: locationTemp,
              department: departmentTemp,
              manager: this._constants.currentScreenInQueue,
            };

            this._constants.avalaibles[
              this._constants.avalaibles.findIndex(
                (screen) =>
                  screen.id === this._constants.currentScreenInQueue.id
              )
            ] = newScreenInfo;

            this.sw.emitEvento('screen', {
              screen:
                this._constants.avalaibles[
                  this._constants.avalaibles.findIndex(
                    (screen) =>
                      screen.id === this._constants.currentScreenInQueue.id
                  )
                ],
              group: this._constants.currentGroup
                ? this._constants.currentGroup
                : {},
              newQueue: this._constants.screensDetectedQueue,
              newAvalaibles: this._constants.avalaibles,
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
              this._constants.locations[
                this._constants.locations.findIndex(
                  (loc) => loc.id === form.location - 1
                )
              ];
            console.log(this._userConstants.departmentList);
            const departmentTemp =
              this._userConstants.departmentList[
                this._userConstants.departmentList.findIndex(
                  (department) => department.id === form.department - 1
                )
              ];
            const newScreenAvalaible: Screen_ = {
              id: this._constants.currentScreenInQueue.id,
              ip: this._constants.currentScreenInQueue.ip,
              currentGroup: undefined,
              brand: form.brand,
              location: locationTemp,
              department: departmentTemp,
              manager: user,
            };
            this.activateScreen(newScreenAvalaible);
            console.log('Pantalla detectada Activada');
          }
        }
      }
    }
  }

  closeScreenPanel() {
    this._constants.isPanelScreenOpened = false;
    this._constants.isScreenActivatedOpened = false;
    this._constants.isScreenModifiedOpened = false;
    this._constants.isScreenDesactivatedOpened = false;
  }

  openScreenActivated() {
    console.log('Creador de usuarios abierto');
    setTimeout(() => {
      this._constants.isPanelScreenUsed = true;
      this._constants.isScreenActivatedOpened = true;
      this._constants.isScreenModifiedOpened = false;
      this._constants.isScreenDesactivatedOpened = false;
    }, 100);
  }

  openScreenModified() {
    console.log('Actualizador de usuarios abierto');
    setTimeout(() => {
      this._constants.isPanelScreenUsed = true;
      this._constants.isScreenActivatedOpened = false;
      this._constants.isScreenModifiedOpened = true;
      this._constants.isScreenDesactivatedOpened = false;
    }, 100);
  }

  openScreenDesactivated() {
    console.log('Eliminador de usuarios abierto');
    setTimeout(() => {
      this._constants.isPanelScreenUsed = true;
      this._constants.isScreenActivatedOpened = false;
      this._constants.isScreenModifiedOpened = false;
      this._constants.isScreenDesactivatedOpened = true;
    }, 100);
  }

  getAvalaiblescreens(user: User_) {
    var newSelected: any = {};
    console.log({
      user,
      selected: this._constants.selected,
      avalaibles: this._constants.avalaibles,
    });
    if (this._constants.avalaibles && this._constants.avalaibles.length !== 0) {
      newSelected = this._constants.avalaibles.filter(
        (screen) => user.department.id === screen.department.id
      );
    }
    console.log({ newSelected, avalaibles: this._constants.avalaibles });
    this._constants.selected = newSelected;
    console.log(this._constants.selected);
  }

  createGroup(user: User_) {
    console.log('Creador de usuarios abierto');
    console.log(this._constants.groupFormTemp);
    this._constants.contGroups++;
    const newGroup: GroupScreen_ = {
      id: this._constants.contGroups,
      name: this._constants.groupFormTemp.name,
      departament: user.department.id,
      currentVideo: '',
    };
    console.log(newGroup);
    if (this._constants.groupsScreen) {
      this._constants.groupsScreen.push(newGroup);
      this._constants.activeGroupScreens.push(newGroup);
    } else {
      this._constants.groupsScreen = [newGroup];
      this._constants.activeGroupScreens = [newGroup];
    }
    this.sw.emitEvento('group', {
      groups: this._constants.groupsScreen,
      cont: this._constants.contGroups,
    });
  }

  getScreenGroups(user: User_) {
    console.log('Obteniendo grupos de pantallas');
    if (this._constants.groupsScreen) {
      console.log(
        this._constants.groupsScreen.filter(
          (group) => group.departament === user.department.id
        )
      );
      setTimeout(() => {
        this._constants.activeGroupScreens =
          this._constants.groupsScreen.filter(
            (group) => group.departament === user.department.id
          );
        console.log({ actuaList: this._constants.activeGroupScreens });
        this._constants.isActiveGroup = false;
        this._constants.isCurrentGroup = false;
      }, 50);
    }
  }

  delGroup(group: GroupScreen_, user: User_) {
    console.log(group);
    if (group.screenList) {
      for (let screenDel of group.screenList) {
        this._constants.avalaibles.push(screenDel);
        screenDel.currentGroup = undefined;
        group.screenList = group.screenList?.filter(
          (screenTemp) => screenTemp.id !== screenDel.id
        );
        this.sw.emitEvento('screen', {
          screen: screenDel,
          group: group,
          newAvalaibles: this._constants.avalaibles,
        });
      }
      this._constants.selected = this._constants.avalaibles.filter(
        (screen) => screen.department.id === group.departament
      );
    }
    this._constants.groupsScreen = this._constants.groupsScreen.filter(
      (groupTemp) => groupTemp.id !== group.id
    );
    this.getScreenGroups(user);
    this.sw.emitEvento('group', {
      groups: this._constants.groupsScreen,
    });
  }
}
