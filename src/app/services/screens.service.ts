import { Injectable } from '@angular/core';
import { Screen_ } from '../interfaces/screen';
import { GroupScreen_ } from '../interfaces/group-screen';
import { User_ } from '../interfaces/user';
import { _ScreensConstants } from '../constants/screens.constants';

@Injectable({
  providedIn: 'root',
})
export class ScreensService {
  _screensConstants = new _ScreensConstants();
  constructor() {
    /*     console.log(this._screensConstants.groupsScreen); */
    console.log('Screens Servicio Cargado');
  }

  // Logica de la seleccion y despliegue de pantallas
  addScreen(screenSelected: Screen_) {
    /*     const newListAvalaibles = this._screensConstants.avalaibles.filter(
      (screen) => screen != screenSelected
    );
    this._screensConstants.selected = this._screensConstants.selected.filter(
      (screen) => screen.id !== screenSelected.id
    );
    this._screensConstants.avalaibles = newListAvalaibles;
    if (!this._screensConstants.currentGroup.screenList) {
      screenSelected.currentGroup = this._screensConstants.currentGroup.id;
      this._screensConstants.currentGroup.screenList = [screenSelected];
      this.socket.emitEvento('screen', {
        newAvalaibles: newListAvalaibles,
        screen: screenSelected,
        group: this._screensConstants.currentGroup,
      });
    } else {
      screenSelected.currentGroup = this._screensConstants.currentGroup.id;
      this._screensConstants.currentGroup.screenList.push(screenSelected);
      this.socket.emitEvento('screen', {
        newAvalaibles: newListAvalaibles,
        screen: screenSelected,
        group: this._screensConstants.currentGroup,
      });
    }
    console.log({
      PantallaAñadida: screenSelected,
      GrupoSeleccionado: this._screensConstants.currentGroup,
    }); */
  }

  removeScreen(screenSelected: Screen_) {
    /*     screenSelected.currentGroup = undefined;
    if (this._screensConstants.avalaibles.length < 1) {
      this._screensConstants.avalaibles = [screenSelected];
    } else {
      this._screensConstants.avalaibles.push(screenSelected);
    }
    if (this._screensConstants.selected.length < 1) {
      this._screensConstants.selected = [screenSelected];
    } else {
      this._screensConstants.selected.push(screenSelected);
    }
    const newGroupScreenList =
      this._screensConstants.currentGroup.screenList?.filter(
        (screen: any) => screen != screenSelected
      );
    this._screensConstants.currentGroup.screenList = newGroupScreenList;
    this.socket.emitEvento('screen', {
      newAvalaibles: this._screensConstants.avalaibles,
      screenDel: screenSelected,
      group: this._screensConstants.currentGroup,
    });
    console.log({
      PantallaRemovida: screenSelected,
      GrupoSeleccionado: this._screensConstants.currentGroup,
    }); */
  }

  getScreen() {
    /*     this.api.getScreen().subscribe({
      next: (res) => {
        console.log(res.ipScreen);
        let screenMatch;
        if (
          this._screensConstants.avalaibles?.find(
            (screen) => screen.ip === res.ipScreen
          )
        ) {
          screenMatch = this._screensConstants.avalaibles?.find(
            (screen) => screen.ip === res.ipScreen
          );
        } else if (
          this._screensConstants.screensDetectedQueue?.find(
            (screen) => screen.ip === res.ipScreen
          )
        ) {
          screenMatch = this._screensConstants.screensDetectedQueue?.find(
            (screen) => screen.ip === res.ipScreen
          );
        }
        console.log(screenMatch);
        if (screenMatch) {
          this._screensConstants.currentScreen = screenMatch;
        } else {
          const screenDetected = {
            id: this._screensConstants.screenDetectedCount + 1,
            ip: res.ipScreen,
          };
          console.log(screenDetected);
          if (this._screensConstants.screensDetectedQueue) {
            this._screensConstants.screensDetectedQueue.push(screenDetected);
          } else {
            this._screensConstants.screensDetectedQueue = [screenDetected];
          }
          this.sw.emitEvento('screen', {
            screen: screenDetected,
            group: this._screensConstants.currentGroup
              ? this._screensConstants.currentGroup
              : {},
          });
        }
      },
      complete: () => {
        if (this._screensConstants.currentScreen) {
          if (this._screensConstants.currentScreen.currentGroup) {
            const [screenGroup] = groupScreenList.filter(
              (group) =>
                group.id === this._screensConstants.currentScreen.currentGroup
            );
            this._screensConstants.currentGroup = screenGroup;
          }
        }
      },
    }); */
  }

  getScreenInQueue(screen: any) {
    /*     console.log({ screen });
    this._screensConstants.currentScreenInQueue = screen;
    screen.brand
      ? (this._screensConstants.screenDetectedForm = {
          brand: screen.brand,
          location: screen.location.id + 1,
        })
      : (this._screensConstants.screenDetectedForm = {
          brand: '',
          location: 0,
        });
    console.log(this._screensConstants.currentScreenInQueue);
    this._screensConstants.isScreenInQueueSelected = true; */
  }

  activateScreen(screen: Screen_) {
    /*     console.log({ 'Pantalla activada': screen });
    this._screensConstants.avalaibles
      ? this._screensConstants.avalaibles.push(screen)
      : (this._screensConstants.avalaibles = [screen]);
    this._screensConstants.screensDetectedQueue =
      this._screensConstants.screensDetectedQueue.filter(
        (screenTemp) => screenTemp.ip !== screen.ip
      );
    this.sw.emitEvento('screen', {
      screen: screen,
      group: this._screensConstants.currentGroup
        ? this._screensConstants.currentGroup
        : {},
      newQueue: this._screensConstants.screensDetectedQueue,
      newAvalaibles: this._screensConstants.avalaibles,
    }); */
  }

  desactivateScreen(screen: Screen_) {
    /*     console.log({ 'Pantalla desactivada': screen });
    this._screensConstants.screensDetectedQueue
      ? this._screensConstants.screensDetectedQueue.push(screen)
      : (this._screensConstants.screensDetectedQueue = [screen]);
    this._screensConstants.avalaibles =
      this._screensConstants.avalaibles.filter(
        (screenTemp) => screenTemp.ip !== screen.ip
      );
    this.sw.emitEvento('screen', {
      screen: screen,
      group: this._screensConstants.currentGroup
        ? this._screensConstants.currentGroup
        : {},
      newQueue: this._screensConstants.screensDetectedQueue,
      newAvalaibles: this._screensConstants.avalaibles,
    }); */
  }

  getForm(form: any, howAction: any, user: any) {
    /*     let idTemp: any;
    if (this._screensConstants.currentScreenInQueue) {
      idTemp = this._screensConstants.screensDetectedQueue.find(
        (screen) =>
          screen.id === this._screensConstants.currentScreenInQueue?.id
      )?.id;
    }
    console.log({
      currentScreenInQueue: this._screensConstants.currentScreenInQueue,
    });
    console.log({ form, howAction, user });
    console.log(this._screensConstants.screenDetectedCount);
    if (howAction === 'isModify') {
      console.log('Actualizando...');
      if (form.brand !== '') {
        console.log('marca valida');
        if (form.location !== 0) {
          console.log('lugar valido');
          const locationTemp =
            this._screensConstants.locations[
              this._screensConstants.locations.findIndex(
                (loc) => loc.id === form.location - 1
              )
            ];
          const newScreenInfo: Screen_ = {
            id: this._screensConstants.currentScreenInQueue.id,
            ip: this._screensConstants.currentScreenInQueue.ip,
            currentGroup:
              this._screensConstants.currentScreenInQueue.currentGroup,
            brand: form.brand,
            location: locationTemp,
            department: this._screensConstants.currentScreenInQueue.department,
            manager: this._screensConstants.currentScreenInQueue,
          };
          this._screensConstants.avalaibles[
            this._screensConstants.avalaibles.findIndex(
              (screen) =>
                screen.id === this._screensConstants.currentScreenInQueue.id
            )
          ] = newScreenInfo;
          this.sw.emitEvento('screen', {
            screen:
              this._screensConstants.avalaibles[
                this._screensConstants.avalaibles.findIndex(
                  (screen) =>
                    screen.id === this._screensConstants.currentScreenInQueue.id
                )
              ],
            group: this._screensConstants.currentGroup
              ? this._screensConstants.currentGroup
              : {},
            newQueue: this._screensConstants.screensDetectedQueue,
            newAvalaibles: this._screensConstants.avalaibles,
          });
          console.log('Pantalla seleccionada Modificada');
        }
      }
    } else if (howAction === 'isActivate') {
      console.log('Activando...');
      if (form.brand !== '') {
        console.log('marca valida');
        if (form.location !== 0) {
          console.log('lugar valido');
          const locationTemp =
            this._screensConstants.locations[
              this._screensConstants.locations.findIndex(
                (loc) => loc.id === form.location - 1
              )
            ];
          const newScreenAvalaible: Screen_ = {
            id: this._screensConstants.currentScreenInQueue.id,
            ip: this._screensConstants.currentScreenInQueue.ip,
            currentGroup: undefined,
            brand: form.brand,
            location: locationTemp,
            department: user.department,
            manager: user,
          };
          this.activateScreen(newScreenAvalaible);
          console.log('Pantalla detectada Activada');
        }
      }
    } */
  }

  closeScreenPanel() {
    /*     this._screensConstants.isPanelScreenOpened = false;
    this._screensConstants.isScreenActivatedOpened = false;
    this._screensConstants.isScreenModifiedOpened = false;
    this._screensConstants.isScreenDesactivatedOpened = false; */
  }

  openScreenActivated() {
    /*     console.log('Creador de usuarios abierto');
    setTimeout(() => {
      this._screensConstants.isPanelScreenUsed = true;
      this._screensConstants.isScreenActivatedOpened = true;
      this._screensConstants.isScreenModifiedOpened = false;
      this._screensConstants.isScreenDesactivatedOpened = false;
    }, 100); */
  }

  openScreenModified() {
    /*     console.log('Actualizador de usuarios abierto');
    setTimeout(() => {
      this._screensConstants.isPanelScreenUsed = true;
      this._screensConstants.isScreenActivatedOpened = false;
      this._screensConstants.isScreenModifiedOpened = true;
      this._screensConstants.isScreenDesactivatedOpened = false;
    }, 100); */
  }

  openScreenDesactivated() {
    /*     console.log('Eliminador de usuarios abierto');
    setTimeout(() => {
      this._screensConstants.isPanelScreenUsed = true;
      this._screensConstants.isScreenActivatedOpened = false;
      this._screensConstants.isScreenModifiedOpened = false;
      this._screensConstants.isScreenDesactivatedOpened = true;
    }, 100); */
  }

  getAvalaiblescreens(user: User_) {
    /*     console.log(this._screensConstants.avalaibles);
    console.log({ user, selected: this._screensConstants.selected });
    const newSelected = this._screensConstants.avalaibles?.filter(
      (screen) => user.department.id === screen.department.id
    );
    console.log({ newSelected, avalaibles: this._screensConstants.avalaibles });
    this._screensConstants.selected = newSelected;
    console.log(this._screensConstants.selected); */
  }

  createGroup(user: User_) {
    /*     console.log('Creador de usuarios abierto');
    console.log(this._screensConstants.groupFormTemp);
    this._screensConstants.contGroups++;
    const newGroup: GroupScreen_ = {
      id: this._screensConstants.contGroups,
      name: this._screensConstants.groupFormTemp.name,
      departament: user.department.id,
      currentVideo: '',
    };
    console.log(newGroup);
    if (this._screensConstants.groupsScreen) {
      this._screensConstants.groupsScreen.push(newGroup);
      this._screensConstants.activeGroupScreens.push(newGroup);
    } else {
      this._screensConstants.groupsScreen = [newGroup];
      this._screensConstants.activeGroupScreens = [newGroup];
    }
    this.sw.emitEvento('group', {
      groups: this._screensConstants.groupsScreen,
      cont: this._screensConstants.contGroups,
    }); */
  }

  getScreenGroups(user: User_) {
    /*     console.log('Obteniendo grupos de pantallas');
    if (this._screensConstants.groupsScreen) {
      console.log(
        this._screensConstants.groupsScreen.filter(
          (group) => group.departament === user.department.id
        )
      );
      setTimeout(() => {
        this._screensConstants.activeGroupScreens =
          this._screensConstants.groupsScreen.filter(
            (group) => group.departament === user.department.id
          );
        console.log({ actuaList: this._screensConstants.activeGroupScreens });
        this._screensConstants.isActiveGroup = false;
        this._screensConstants.isCurrentGroup = false;
      }, 50);
    } */
  }

  delGroup(group: GroupScreen_, user: User_) {
    /*     console.log(group);
    if (group.screenList) {
      for (let screenDel of group.screenList) {
        this._screensConstants.avalaibles.push(screenDel);
        screenDel.currentGroup = undefined;
        group.screenList = group.screenList?.filter(
          (screenTemp) => screenTemp.id !== screenDel.id
        );
        this.socket.emitEvento('screen', {
          screen: screenDel,
          group: group,
          newAvalaibles: this._screensConstants.avalaibles,
        });
      }
      this._screensConstants.selected =
        this._screensConstants.avalaibles.filter(
          (screen) => screen.department.id === group.departament
        );
    }
    this._screensConstants.groupsScreen =
      this._screensConstants.groupsScreen.filter(
        (groupTemp) => groupTemp.id !== group.id
      );
    this.getScreenGroups(user);
    this.sw.emitEvento('group', {
      groups: this._screensConstants.groupsScreen,
    }); */
  }
}
