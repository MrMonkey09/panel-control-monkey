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
  avaibles: Array<Screen> = screens;
  currentGroup!: GroupScreen;
  isCurrentGroup: boolean = false;
  contGroups: number = 0;
  selected!: Array<Screen>;
  currentScreen!: Screen;
  isActiveGroup!: boolean;
  groupsScreen: Array<GroupScreen> = [];
  activeGroupScreens: Array<GroupScreen> = [];
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
    const newListAvaibles = this.avaibles.filter(
      (screen) => screen != screenSelected
    );
    if (!this.currentGroup.screenList) {
      screenSelected.currentGroup = this.currentGroup.id;
      this.currentGroup.screenList = [screenSelected];
      this.socket.emitEvento('screen', {
        screen: screenSelected,
        group: this.currentGroup,
      });
    } else {
      screenSelected.currentGroup = this.currentGroup.id;
      this.currentGroup.screenList.push(screenSelected);
      this.socket.emitEvento('screen', {
        newAvaibles: newListAvaibles,
        screen: screenSelected,
        group: this.currentGroup,
      });
    }
    this.avaibles = newListAvaibles;
    console.log({
      PantallaAñadida: screenSelected,
      GrupoSeleccionado: this.currentGroup,
    });
  }

  removeScreen(screenSelected: Screen) {
    const newListAvaibles = this.currentGroup.screenList?.filter(
      (screen: any) => screen != screenSelected
    );
    if (this.avaibles.length < 1) {
      screenSelected.currentGroup = undefined;
      this.avaibles = [screenSelected];
      this.socket.emitEvento('screen', {
        newAvaibles: newListAvaibles,
        screenDel: screenSelected,
        group: this.currentGroup,
      });
    } else {
      screenSelected.currentGroup = undefined;
      this.avaibles.push(screenSelected);
      this.socket.emitEvento('screen', {
        newAvaibles: newListAvaibles,
        screenDel: screenSelected,
        group: this.currentGroup,
      });
    }
    this.currentGroup.screenList = newListAvaibles;
    console.log({
      PantallaRemovida: screenSelected,
      GrupoSeleccionado: this.currentGroup,
    });
  }

  getScreen() {
    this.api.getScreen().subscribe({
      next: (res) => {
        console.log(res.ipScreen);
        const screenMatch = this.avaibles.find(
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

  getAvaibleScreens(user: User) {
    console.log(screens);
    this.avaibles = screens.filter(
      (screen) => screen.department.id === user.department.id
    );
    console.log(this.avaibles);
  }

  createGroup(user: User) {
    console.log('Creador de usuarios abierto');
    console.log(this.groupFormTemp);
    this.contGroups++;
    this.sw.emitEvento('cont', {
      cont: this.contGroups,
    });
    const newGroup: GroupScreen = {
      id: this.contGroups,
      name: this.groupFormTemp.name,
      departament: user.department.id,
      currentVideo: '',
    };
    console.log(newGroup);
    this.groupsScreen.push(newGroup);
    this.activeGroupScreens.push(newGroup);
    this.sw.emitEvento('group', {
      groups: this.groupsScreen,
    });
  }

  getScreenGroups(user: User) {
    console.log('Obteniendo grupos de pantallas');
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

  delGroup(group: GroupScreen, user: User) {
    console.log(group);
    if (group.screenList) {
      for (let screen of group.screenList) {
        this.avaibles.push(screen);
        screen.currentGroup = undefined;
        group.screenList = group.screenList?.filter(
          (screenTemp) => screenTemp.id !== screen.id
        );
        this.socket.emitEvento('screen', {
          screen: screen,
          group: group,
        });
      }
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
