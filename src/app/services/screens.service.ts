import { Injectable } from '@angular/core';
import { Screen } from '../interfaces/screen';
import { GroupScreen } from '../interfaces/group-screen';
import { screens } from '../fake-data/screens';
import { ApiFecthService } from './api-fecth.service';
import { SocketioService } from './socketio.service';
import { groupScreenList } from '../fake-data/groups-screen';

@Injectable({
  providedIn: 'root',
})
export class ScreensService {
  avaibles = screens;
  currentGroup!: GroupScreen;
  selected!: Array<Screen>;
  currentScreen!: Screen;
  groupsScreen = groupScreenList;

  constructor(private api: ApiFecthService, private socket: SocketioService) {}

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
      (screen) => screen != screenSelected
    );
    if (this.avaibles.length < 1) {
      screenSelected.currentGroup = undefined;
      this.avaibles = [screenSelected];
    } else {
      screenSelected.currentGroup = undefined;
      this.avaibles.push(screenSelected);
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
        const [screenMatch] = this.avaibles.filter(
          (screen) => screen.ip === res.ipScreen
        );
        console.log(screenMatch);
        this.currentScreen = screenMatch;
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
}
