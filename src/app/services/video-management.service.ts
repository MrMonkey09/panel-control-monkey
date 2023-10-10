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
    } else if (
      (res.screenDel && res.screenDel.department) ||
      (res.screen && res.screen.department)
    ) {
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
        this.scrn.selected = this.scrn.avalaibles.filter(
          (screen) => screen.department.id === res.group.departament
        );
      } /* agregar pantalla */ else if (res.newAvalaibles && !res.newQueue) {
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
        this.scrn.selected = this.scrn.avalaibles.filter(
          (screen) => screen.department.id === res.group.departament
        );
      } else {
        if (
          this.scrn.avalaibles?.find((screen) => screen.id === screenTemp.id)
        ) {
          this.scrn.avalaibles[
            this.scrn.avalaibles.findIndex(
              (screen) => screen.id === screenTemp.id
            )
          ] = screenTemp;

          console.log('pantalla en disponibles');
        } else if (
          this.scrn.screensDetectedQueue.find(
            (screen) => screen.id === screenTemp.id
          )
        ) {
          this.scrn.screensDetectedQueue[
            this.scrn.screensDetectedQueue.findIndex(
              (screen) => screen.id === screenTemp.id
            )
          ] = screenTemp;
          console.log('pantalla en cola');
        }
        console.log({
          'new avalaibles': res.newAvalaibles,
          'new Queue': res.newQueue,
        });
        this.scrn.avalaibles = res.newAvalaibles;
        this.scrn.screensDetectedQueue = res.newQueue;
        if (
          this.scrn.groupsScreen?.find(
            (group) => group.id === screenTemp.currentGroup
          )
        ) {
          console.log("pantalla con grupo adjunto")
        }
        this.userService.user
          ? this.scrn.getAvalaiblescreens(this.userService.user)
          : console.log('sin usuario');
        console.log('Pantalla de actualizada');
      }
    } else {
      console.log({
        'Pantalla detectada en cola': res.screen,
        'Contador de pantallas antiguo': this.scrn.screenDetectedCount,
      });
      const screenDetected = {
        id: this.scrn.screenDetectedCount ? this.scrn.screenDetectedCount : 0,
        ip: res.screen.ip,
      };
      console.log(screenDetected);
      if (
        this.scrn.screensDetectedQueue &&
        !this.scrn.screensDetectedQueue.find(
          (screen) => screen.ip === res.screen.ip
        )
      ) {
        this.scrn.screensDetectedQueue.push(screenDetected);
        this.scrn.screenDetectedCount++;
      } else if (!this.scrn.screensDetectedQueue) {
        this.scrn.screensDetectedQueue = [screenDetected];
        this.scrn.screenDetectedCount++;
      }
      console.log({
        'Lista de pantallas detectadas en cola': this.scrn.screensDetectedQueue,
        'Contador de pantallas detectadas': this.scrn.screenDetectedCount,
      });
    }
  }
}
