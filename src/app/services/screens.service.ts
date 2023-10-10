import { Injectable } from '@angular/core';
import { Screen } from '../interfaces/screen';
import { GroupScreen } from '../interfaces/group-screen';
import { ApiFecthService } from './api-fecth.service';
import { SocketioService } from './socketio.service';
import { groupScreenList } from '../fake-data/groups-screen';
import { User } from '../interfaces/user';
import { locations } from '../fake-data/locations';
import { Location } from '../interfaces/location';

@Injectable({
  providedIn: 'root',
})
export class ScreensService {
  avalaibles!: Array<Screen>;
  screensDetectedQueue!: Array<any>;
  locations: Array<Location> = locations;
  currentGroup!: GroupScreen;
  contGroups: number = 0;
  selected: Array<Screen> = [];
  currentScreen!: Screen;
  currentScreenInQueue!: any;
  groupsScreen!: Array<GroupScreen>;
  activeGroupScreens!: Array<GroupScreen>;
  screenList?: Array<Screen>;
  currentVideo!: string;
  groupFormTemp = {
    name: '',
  };
  screenDetectedForm = {
    brand: '',
    location: 0,
  };
  isCurrentGroup: boolean = false;
  isActiveGroup!: boolean;
  isActive!: boolean;
  isCreateGroupOpened: boolean = false;
  isPanelScreenOpened: boolean = false;
  isPanelScreenUsed: boolean = false;
  isScreenActivatedOpened: boolean = false;
  isScreenModifiedOpened: boolean = false;
  isScreenDesactivatedOpened: boolean = false;
  isScreenInQueueSelected: boolean = false;
  screenDetectedCount: number = 0;

  constructor(
    private api: ApiFecthService,
    private socket: SocketioService,
    private sw: SocketioService
  ) {
    console.log(this.groupsScreen);
  }

  // Logica de la seleccion y despliegue de pantallas
  addScreen(screenSelected: Screen) {
    const newListAvalaibles = this.avalaibles.filter(
      (screen) => screen != screenSelected
    );
    this.selected = this.selected.filter(
      (screen) => screen.id !== screenSelected.id
    );
    this.avalaibles = newListAvalaibles;
    if (!this.currentGroup.screenList) {
      screenSelected.currentGroup = this.currentGroup.id;
      this.currentGroup.screenList = [screenSelected];
      this.socket.emitEvento('screen', {
        newAvalaibles: newListAvalaibles,
        screen: screenSelected,
        group: this.currentGroup,
      });
    } else {
      screenSelected.currentGroup = this.currentGroup.id;
      this.currentGroup.screenList.push(screenSelected);
      this.socket.emitEvento('screen', {
        newAvalaibles: newListAvalaibles,
        screen: screenSelected,
        group: this.currentGroup,
      });
    }
    console.log({
      PantallaAñadida: screenSelected,
      GrupoSeleccionado: this.currentGroup,
    });
  }

  removeScreen(screenSelected: Screen) {
    screenSelected.currentGroup = undefined;
    if (this.avalaibles.length < 1) {
      this.avalaibles = [screenSelected];
    } else {
      this.avalaibles.push(screenSelected);
    }
    if (this.selected.length < 1) {
      this.selected = [screenSelected];
    } else {
      this.selected.push(screenSelected);
    }
    const newGroupScreenList = this.currentGroup.screenList?.filter(
      (screen: any) => screen != screenSelected
    );
    this.currentGroup.screenList = newGroupScreenList;
    this.socket.emitEvento('screen', {
      newAvalaibles: this.avalaibles,
      screenDel: screenSelected,
      group: this.currentGroup,
    });
    console.log({
      PantallaRemovida: screenSelected,
      GrupoSeleccionado: this.currentGroup,
    });
  }

  getScreen() {
    this.api.getScreen().subscribe({
      next: (res) => {
        console.log(res.ipScreen);
        let screenMatch;
        if (this.avalaibles?.find((screen) => screen.ip === res.ipScreen)) {
          screenMatch = this.avalaibles?.find(
            (screen) => screen.ip === res.ipScreen
          );
        } else if (
          this.screensDetectedQueue?.find(
            (screen) => screen.ip === res.ipScreen
          )
        ) {
          screenMatch = this.screensDetectedQueue?.find(
            (screen) => screen.ip === res.ipScreen
          );
        }
        console.log(screenMatch);
        if (screenMatch) {
          this.currentScreen = screenMatch;
        } else {
          const screenDetected = {
            id: this.screenDetectedCount + 1,
            ip: res.ipScreen,
          };
          console.log(screenDetected);
          if (this.screensDetectedQueue) {
            this.screensDetectedQueue.push(screenDetected);
          } else {
            this.screensDetectedQueue = [screenDetected];
          }
          this.sw.emitEvento('screen', {
            screen: screenDetected,
            group: this.currentGroup ? this.currentGroup : {},
          });
        }
      },
      complete: () => {
        if (this.currentScreen) {
          if (this.currentScreen.currentGroup) {
            const [screenGroup] = groupScreenList.filter(
              (group) => group.id === this.currentScreen.currentGroup
            );
            this.currentGroup = screenGroup;
          }
        }
      },
    });
  }

  getScreenInQueue(screen: any) {
    console.log({ screen });
    this.currentScreenInQueue = screen;
    screen.brand
      ? (this.screenDetectedForm = {
          brand: screen.brand,
          location: screen.location.id + 1,
        })
      : (this.screenDetectedForm = {
          brand: '',
          location: 0,
        });
    console.log(this.currentScreenInQueue);
    this.isScreenInQueueSelected = true;
  }

  activateScreen(screen: Screen) {
    console.log({ 'Pantalla activada': screen });
    this.avalaibles
      ? this.avalaibles.push(screen)
      : (this.avalaibles = [screen]);
    this.screensDetectedQueue = this.screensDetectedQueue.filter(
      (screenTemp) => screenTemp.ip !== screen.ip
    );
    this.sw.emitEvento('screen', {
      screen: screen,
      group: this.currentGroup ? this.currentGroup : {},
      newQueue: this.screensDetectedQueue,
      newAvalaibles: this.avalaibles,
    });
  }

  desactivateScreen(screen: Screen) {
    console.log({ 'Pantalla desactivada': screen });
    this.screensDetectedQueue
      ? this.screensDetectedQueue.push(screen)
      : (this.screensDetectedQueue = [screen]);
    this.avalaibles = this.avalaibles.filter(
      (screenTemp) => screenTemp.ip !== screen.ip
    );
    this.sw.emitEvento('screen', {
      screen: screen,
      group: this.currentGroup ? this.currentGroup : {},
      newQueue: this.screensDetectedQueue,
      newAvalaibles: this.avalaibles,
    });
  }

  getForm(form: any, howAction: any, user: any) {
    let idTemp: any;
    if (this.currentScreenInQueue) {
      idTemp = this.screensDetectedQueue.find(
        (screen) => screen.id === this.currentScreenInQueue?.id
      )?.id;
    }
    console.log({ currentScreenInQueue: this.currentScreenInQueue });
    console.log({ form, howAction, user });
    console.log(this.screenDetectedCount);
    if (howAction === 'isModify') {
      console.log('Actualizando...');
      if (form.brand !== '') {
        console.log('marca valida');
        if (form.location !== 0) {
          console.log('lugar valido');
          const locationTemp =
            this.locations[
              this.locations.findIndex((loc) => loc.id === form.location - 1)
            ];
          const newScreenInfo: Screen = {
            id: this.currentScreenInQueue.id,
            ip: this.currentScreenInQueue.ip,
            currentGroup: this.currentScreenInQueue.currentGroup,
            brand: form.brand,
            location: locationTemp,
            department: this.currentScreenInQueue.department,
            manager: this.currentScreenInQueue,
          };
          this.avalaibles[
            this.avalaibles.findIndex(
              (screen) => screen.id === this.currentScreenInQueue.id
            )
          ] = newScreenInfo;
          this.sw.emitEvento('screen', {
            screen:
              this.avalaibles[
                this.avalaibles.findIndex(
                  (screen) => screen.id === this.currentScreenInQueue.id
                )
              ],
            group: this.currentGroup ? this.currentGroup : {},
            newQueue: this.screensDetectedQueue,
            newAvalaibles: this.avalaibles,
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
            this.locations[
              this.locations.findIndex((loc) => loc.id === form.location - 1)
            ];
          const newScreenAvalaible: Screen = {
            id: this.currentScreenInQueue.id,
            ip: this.currentScreenInQueue.ip,
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
    }
  }

  closeScreenPanel() {
    this.isPanelScreenOpened = false;
    this.isScreenActivatedOpened = false;
    this.isScreenModifiedOpened = false;
    this.isScreenDesactivatedOpened = false;
  }

  openScreenActivated() {
    console.log('Creador de usuarios abierto');
    setTimeout(() => {
      this.isPanelScreenUsed = true;
      this.isScreenActivatedOpened = true;
      this.isScreenModifiedOpened = false;
      this.isScreenDesactivatedOpened = false;
    }, 100);
  }

  openScreenModified() {
    console.log('Actualizador de usuarios abierto');
    setTimeout(() => {
      this.isPanelScreenUsed = true;
      this.isScreenActivatedOpened = false;
      this.isScreenModifiedOpened = true;
      this.isScreenDesactivatedOpened = false;
    }, 100);
  }

  openScreenDesactivated() {
    console.log('Eliminador de usuarios abierto');
    setTimeout(() => {
      this.isPanelScreenUsed = true;
      this.isScreenActivatedOpened = false;
      this.isScreenModifiedOpened = false;
      this.isScreenDesactivatedOpened = true;
    }, 100);
  }

  getAvalaiblescreens(user: User) {
    console.log(this.avalaibles);
    console.log({ user, selected: this.selected });
    const newSelected = this.avalaibles?.filter(
      (screen) => user.department.id === screen.department.id
    );
    console.log({ newSelected, avalaibles: this.avalaibles });
    this.selected = newSelected;
    console.log(this.selected);
  }

  createGroup(user: User) {
    console.log('Creador de usuarios abierto');
    console.log(this.groupFormTemp);
    this.contGroups++;
    const newGroup: GroupScreen = {
      id: this.contGroups,
      name: this.groupFormTemp.name,
      departament: user.department.id,
      currentVideo: '',
    };
    console.log(newGroup);
    if (this.groupsScreen) {
      this.groupsScreen.push(newGroup);
      this.activeGroupScreens.push(newGroup);
    } else {
      this.groupsScreen = [newGroup];
      this.activeGroupScreens = [newGroup];
    }
    this.sw.emitEvento('group', {
      groups: this.groupsScreen,
      cont: this.contGroups,
    });
  }

  getScreenGroups(user: User) {
    console.log('Obteniendo grupos de pantallas');
    if (this.groupsScreen) {
      console.log(
        this.groupsScreen.filter(
          (group) => group.departament === user.department.id
        )
      );
      setTimeout(() => {
        this.activeGroupScreens = this.groupsScreen.filter(
          (group) => group.departament === user.department.id
        );
        console.log({ actuaList: this.activeGroupScreens });
        this.isActiveGroup = false;
        this.isCurrentGroup = false;
      }, 50);
    }
  }

  delGroup(group: GroupScreen, user: User) {
    console.log(group);
    if (group.screenList) {
      for (let screenDel of group.screenList) {
        this.avalaibles.push(screenDel);
        screenDel.currentGroup = undefined;
        group.screenList = group.screenList?.filter(
          (screenTemp) => screenTemp.id !== screenDel.id
        );
        this.socket.emitEvento('screen', {
          screen: screenDel,
          group: group,
          newAvalaibles: this.avalaibles,
        });
      }
      this.selected = this.avalaibles.filter(
        (screen) => screen.department.id === group.departament
      );
    }
    this.groupsScreen = this.groupsScreen.filter(
      (groupTemp) => groupTemp.id !== group.id
    );
    this.getScreenGroups(user);
    this.sw.emitEvento('group', {
      groups: this.groupsScreen,
    });
  }
}
