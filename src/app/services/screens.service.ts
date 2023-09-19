import { Injectable } from '@angular/core';
import { Screen } from '../interfaces/screen';
import { GroupScreen } from '../interfaces/group-screen';
import { screens } from '../fake-data/screens';

@Injectable({
  providedIn: 'root',
})
export class ScreensService {
  avaibles = screens;
  currentGroup!: GroupScreen;
  selected!: Array<Screen>;
  constructor() {
    console.log(this.avaibles);
  }

  // Logica de la seleccion y despliegue de pantallas
  addScreen(screenSelected: Screen) {
    const newListAvaibles = this.avaibles.filter(
      (screen) => screen != screenSelected
    );
    if (!this.currentGroup.screenList) {
      screenSelected.currentGroup = this.currentGroup.id;
      this.currentGroup.screenList = [screenSelected];
    } else {
      screenSelected.currentGroup = this.currentGroup.id;
      this.currentGroup.screenList.push(screenSelected);
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
}
