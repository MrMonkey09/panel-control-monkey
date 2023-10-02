import { Injectable } from '@angular/core';
import { ScreensService } from './screens.service';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root',
})
export class VideoManagementService {
  recharge: boolean = false;
  video: any = '';
  constructor(
    private scrn: ScreensService,
    private userService: UserServiceService
  ) {}

  public $updateVideo(res: any) {
    let indexGroup: number;
    if (this.scrn.groupsScreen) {
      indexGroup = this.scrn.groupsScreen.findIndex(
        (group) => group.id === res.group?.id
      );
    } else {
      this.scrn.groupsScreen = [res.group];
      indexGroup = this.scrn.groupsScreen.findIndex(
        (group) => group.id === res.group?.id
      );
    }
    console.log('$updateVideo 1 Gatillado: ', res);
    if (res.filename) {
      console.log(res.filename);
      this.recharge = false;
      this.video = 'http://192.168.0.15:3001/' + res.filename;
      setTimeout(() => {
        this.recharge = true;
      }, 100);
    } else if (res.video) {
      console.log(res.video);
      this.scrn.groupsScreen[indexGroup].currentVideo = res.video;
      console.log(this.scrn.groupsScreen[indexGroup]);
      this.recharge = false;
      setTimeout(() => {
        this.recharge = true;
      }, 100);
    }
  }

  public $updateScreen(res: any) {
    this.recharge = false;
    console.log('$updateScreen Gatillado: ', res);
    if (res.groups) {
      this.scrn.groupsScreen = res.groups;
    } else {
      const screenTemp = res.screenDel ? res.screenDel : res.screen;
      const groupTemp = res.group;
      const indexGroup = this.scrn.groupsScreen?.findIndex(
        (group) => group.id === groupTemp.id
      );
      const indexScreen = this.scrn.avalaibles?.findIndex(
        (screen) => screen.id === screenTemp.id
      );
      /* Eliminar pantalla */
      if (res.screenDel) {
        /* Grupo abierto vista panel */
        if (this.scrn.currentGroup?.id === res.group.id) {
          this.scrn.currentGroup.screenList = res.group.screenList;
        } /* Vista de pantalla */ else if (this.scrn.currentScreen) {
          this.scrn.currentScreen = screenTemp;
        } /* Grupo cerrado vista panel */ else {
          this.scrn.groupsScreen[indexGroup].screenList = res.group.screenList;
        }
        this.scrn.avalaibles = res.newAvalaibles;
        this.scrn.selected = this.scrn.avalaibles.filter(
          (screen) => screen.department.id === res.group.departament
        );
      } /* agregar pantalla */ else {
        console.log('agregando pantalla');
        /* Grupo abierto vista panel */
        if (this.scrn.currentGroup === res.group.id) {
          console.log('agregando pantalla en current group');
          this.scrn.currentGroup.screenList = res.group.screenList;
        } /* Vista de pantalla */ else if (this.scrn.currentScreen) {
          this.scrn.currentScreen = screenTemp;
        } /* Grupo cerrado vista panel */ else {
          console.log('agregando pantalla en grupo existente');
          this.scrn.groupsScreen[indexGroup].screenList = res.group.screenList;
        }
        this.scrn.avalaibles = res.newAvalaibles;
        this.scrn.selected = this.scrn.avalaibles.filter(
          (screen) => screen.department.id === res.group.departament
        );
      }
    }
  }
}
