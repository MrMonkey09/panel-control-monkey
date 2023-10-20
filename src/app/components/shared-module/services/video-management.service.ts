import { Injectable } from '@angular/core';
import { ScreensService } from './screens.service';
import { UserServiceService } from './user-service.service';
import { _ApiFetchConstants } from '../../../constants/api-fetch.constants';
import { _VideoConstants } from '../../../constants/video-management.constants';
import { _ScreensConstants } from '../../../constants/screens.constants';

@Injectable({
  providedIn: 'root',
})
export class VideoManagementService {
  private _apiConstants = new _ApiFetchConstants();
  public _videoConstants = new _VideoConstants();

  constructor(
    private scrn: ScreensService,
    private userService: UserServiceService
  ) {
    console.log('VideoManagement Servicio Cargado');
  }

  public $updateVideo(res: any) {
    let indexGroup: number;
    if (this.scrn._screensConstants.groupsScreen) {
      indexGroup = this.scrn._screensConstants.groupsScreen.findIndex(
        (group) => group.id === res.group?.id
      );
    } else {
      this.scrn._screensConstants.groupsScreen = [res.group];
      indexGroup = this.scrn._screensConstants.groupsScreen.findIndex(
        (group) => group.id === res.group?.id
      );
    }
    console.log('$updateVideo 1 Gatillado: ', res);
    if (res.filename) {
      console.log(res.filename);
      this._videoConstants.recharge = false;
      this._videoConstants.video = this._apiConstants.urlApi + res.filename;
      setTimeout(() => {
        this._videoConstants.recharge = true;
      }, 100);
    } else if (res.video) {
      console.log(res.video);
      this.scrn._screensConstants.groupsScreen[indexGroup].currentVideo =
        res.video;
      console.log(this.scrn._screensConstants.groupsScreen[indexGroup]);
      this._videoConstants.recharge = false;
      setTimeout(() => {
        this._videoConstants.recharge = true;
      }, 100);
    }
  }

  public $updateScreen(res: any) {
    this._videoConstants.recharge = false;
    console.log('$updateScreen Gatillado: ', res);
    if (res.groups) {
      this.scrn._screensConstants.groupsScreen = res.groups;
    } else if (
      (res.screenDel && res.screenDel.department) ||
      (res.screen && res.screen.department)
    ) {
      const screenTemp = res.screenDel ? res.screenDel : res.screen;
      const groupTemp = res.group;
      const indexGroup = this.scrn._screensConstants.groupsScreen?.length
        ? this.scrn._screensConstants.groupsScreen.findIndex(
            (group) => group.id === groupTemp.id
          )
        : this.scrn._screensConstants.groupsScreen.length + 1;
      const indexScreen = this.scrn._screensConstants.avalaibles?.findIndex(
        (screen) => screen.id === screenTemp.id
      );
      console.log({ screenTemp, groupTemp, indexGroup, indexScreen });
      /* Eliminar pantalla  */
      if (res.screenDel) {
        /* Grupo abierto vista panel  */
        if (
          this.scrn._screensConstants.currentGroup &&
          this.scrn._screensConstants.currentGroup.id === res.group.id
        ) {
          this.scrn._screensConstants.currentGroup.screenList =
            res.group.screenList;
        } /* Vista de pantalla */ else if (
          this.scrn._screensConstants.currentScreen
        ) {
          this.scrn._screensConstants.currentScreen = screenTemp;
          this.scrn._screensConstants.currentGroup = undefined;
        } /* Grupo cerrado vista panel */ else {
          this.scrn._screensConstants.groupsScreen[indexGroup].screenList =
            res.group.screenList;
        }
        this.scrn._screensConstants.selected = this.scrn._screensConstants
          .avalaibles
          ? this.scrn._screensConstants.avalaibles.filter(
              (screen) => screen.department.id === res.group.departament
            )
          : [];
      } /* agregar pantalla */ else if (res.newAvalaibles && !res.newQueue) {
        console.log('agregando pantalla');
        /* Grupo abierto vista panel  */
        if (
          this.scrn._screensConstants.currentGroup &&
          this.scrn._screensConstants.currentGroup === res.group.id
        ) {
          console.log('Vista de Panel Grupo abierto detectado');
          console.log('agregando pantalla en current group');
          this.scrn._screensConstants.currentGroup.screenList =
            res.group.screenList;
        } /* Vista de pantalla */ else if (
          this.scrn._screensConstants.currentScreen
        ) {
          console.log('Vista de Pantalla detectada');
          this.scrn._screensConstants.currentScreen = screenTemp;
          this.scrn._screensConstants.currentGroup =
            this.scrn._screensConstants.groupsScreen[indexGroup];
          console.log({
            currentGroup: this.scrn._screensConstants.currentGroup,
          });
          this._videoConstants.recharge = false;
          setTimeout(() => {
            this._videoConstants.recharge = true;
          }, 100);
        } /* Grupo cerrado vista panel */ else {
          console.log('Vista de Panel grupo cerrado detectado');
          console.log('agregando pantalla en grupo existente');
          this.scrn._screensConstants.groupsScreen[indexGroup].screenList =
            res.group.screenList;
        }
        this.scrn._screensConstants.selected = this.scrn._screensConstants
          .avalaibles
          ? this.scrn._screensConstants.avalaibles.filter(
              (screen) => screen.department.id === res.group.departament
            )
          : [];
      } else {
        if (
          this.scrn._screensConstants.avalaibles?.find(
            (screen) => screen.id === screenTemp.id
          )
        ) {
          this.scrn._screensConstants.avalaibles[
            this.scrn._screensConstants.avalaibles.findIndex(
              (screen) => screen.id === screenTemp.id
            )
          ] = screenTemp;

          console.log('pantalla en disponibles');
        } else if (
          this.scrn._screensConstants.screensDetectedQueue.find(
            (screen) => screen.id === screenTemp.id
          )
        ) {
          this.scrn._screensConstants.screensDetectedQueue[
            this.scrn._screensConstants.screensDetectedQueue.findIndex(
              (screen) => screen.id === screenTemp.id
            )
          ] = screenTemp;
          console.log('pantalla en cola');
        }
        console.log({
          'new avalaibles': res.newAvalaibles,
          'new Queue': res.newQueue,
        });
        this.scrn._screensConstants.avalaibles = res.newAvalaibles;
        this.scrn._screensConstants.screensDetectedQueue = res.newQueue;
        if (
          this.scrn._screensConstants.groupsScreen?.find(
            (group) => group.id === screenTemp.currentGroup
          )
        ) {
          console.log('pantalla con grupo adjunto');
        }
        this.userService._userConstants.user
          ? this.scrn.getAvalaiblescreens(this.userService._userConstants.user)
          : console.log('sin usuario');
        console.log('Pantalla de actualizada');
      }
    } else {
      console.log({
        'Pantalla detectada en cola': res.screen,
        'Contador de pantallas antiguo':
          this.scrn._screensConstants.screenDetectedCount,
      });
      const screenDetected = {
        id: this.scrn._screensConstants.screenDetectedCount
          ? this.scrn._screensConstants.screenDetectedCount
          : 0,
        ip: res.screen.ip,
      };
      console.log(screenDetected);
      if (
        this.scrn._screensConstants.screensDetectedQueue &&
        !this.scrn._screensConstants.screensDetectedQueue.find(
          (screen) => screen.ip === res.screen.ip
        )
      ) {
        this.scrn._screensConstants.screensDetectedQueue.push(screenDetected);
        this.scrn._screensConstants.screenDetectedCount++;
      } else if (!this.scrn._screensConstants.screensDetectedQueue) {
        this.scrn._screensConstants.screensDetectedQueue = [screenDetected];
        this.scrn._screensConstants.screenDetectedCount++;
      }
      console.log({
        'Lista de pantallas detectadas en cola':
          this.scrn._screensConstants.screensDetectedQueue,
        'Contador de pantallas detectadas':
          this.scrn._screensConstants.screenDetectedCount,
      });
    }
    console.log({ constants: this.scrn._screensConstants });
  }
}
