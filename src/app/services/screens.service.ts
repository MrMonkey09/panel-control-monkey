import { Injectable } from '@angular/core';
import { Screen } from '../interfaces/screen';
import { GroupScreen } from '../interfaces/group-screen';
import { screens } from '../fake-data/screens';
import { ApiFecthService } from './api-fecth.service';
import { SocketioService } from './socketio.service';
import { groupScreenList } from '../fake-data/groups-screen';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ScreensService {
  avalaibles: Array<Screen> = screens;
  currentGroup!: GroupScreen;
  isCurrentGroup: boolean = false;
  contGroups: number = 0;
  selected: Array<Screen> = [];
  currentScreen!: Screen;
  isActiveGroup!: boolean;
  groupsScreen!: Array<GroupScreen>;
  activeGroupScreens!: Array<GroupScreen>;
  screenList?: Array<Screen>;
  currentVideo!: string;
  isActive!: boolean;
  isCreateGroupOpened: boolean = false;
  groupFormTemp = {
    name: '',
  };

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
        const screenMatch = this.avalaibles.find(
          (screen) => screen.ip === res.ipScreen
        );
        console.log(screenMatch);
        if (screenMatch) {
          this.currentScreen = screenMatch;
        }
      },
      complete: () => {
        if (this.currentScreen.currentGroup) {
          const [screenGroup] = groupScreenList.filter(
            (group) => group.id === this.currentScreen.currentGroup
          );
          this.currentGroup = screenGroup;
        }
      },
    });
  }

  getAvalaiblescreens(user: User) {
    console.log(this.avalaibles);
    console.log({ user, selected: this.selected });
    const newSelected = this.avalaibles.filter(
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
