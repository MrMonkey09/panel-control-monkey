import { Injectable } from '@angular/core';
import { ScreensService } from './screens.service';
import { UserServiceService } from './user-service.service';
import { ApiService } from './api/api.service';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root',
})
export class VideoManagementService {
  constructor(
    private scrn: ScreensService,
    private userService: UserServiceService,
    private apiService: ApiService,
    public constants: ConstantsService
  ) {
    console.log('VideoManagement Servicio Cargado');
  }

  public $updateVideo(res: any) {
    console.log("Cambio en video detectado...")
/*     let indexGroup: number;
    if (this.constants._scrnConstants.groupsScreen) {
      indexGroup = this.constants._scrnConstants.groupsScreen.findIndex(
        (group) => group.ID === res.group?.id
      );
    } else {
      this.constants._scrnConstants.groupsScreen = [res.group];
      indexGroup = this.constants._scrnConstants.groupsScreen.findIndex(
        (group) => group.ID === res.group?.id
      );
    }
    console.log('$updateVideo 1 Gatillado: ', res);
    if (res.filename) {
      console.log(res.filename);
      this.constants._videoConstants.recharge = false;
      this.constants._videoConstants.video =
        this.constants._apiConstants.urlApi + res.filename;
      setTimeout(() => {
        this.constants._videoConstants.recharge = true;
      }, 100);
    } else if (res.video) {
      console.log(res.video);
      this.constants._scrnConstants.groupsScreen[indexGroup].CurrentVideo =
        res.video;
      console.log(this.constants._scrnConstants.groupsScreen[indexGroup]);
      this.constants._videoConstants.recharge = false;
      setTimeout(() => {
        this.constants._videoConstants.recharge = true;
      }, 100);
    } */
  }

  public $updateScreen(res: any) {
    console.log("Cambio en pantalla detectado...")
    /* this.constants._videoConstants.recharge = false;
    console.log('$updateScreen Gatillado: ', res);
    if (res.groups) {
      this.constants._scrnConstants.groupsScreen = res.groups;
    } else if (
      (res.screenDel && res.screenDel.department) ||
      (res.screen && res.screen.department)
    ) {
      const screenTemp = res.screenDel ? res.screenDel : res.screen;
      const groupTemp = res.group;
      const indexGroup = this.constants._scrnConstants.groupsScreen?.length
        ? this.constants._scrnConstants.groupsScreen.findIndex(
            (group) => group.ID === groupTemp.id
          )
        : this.constants._scrnConstants.groupsScreen.length + 1;
      const indexScreen = this.constants._scrnConstants.avalaibles?.findIndex(
        (screen) => screen.ID === screenTemp.id
      );
      console.log({ screenTemp, groupTemp, indexGroup, indexScreen });
       Eliminar pantalla  
      if (res.screenDel) {
         Grupo abierto vista panel  
        if (
          this.constants._scrnConstants.currentGroup &&
          this.constants._scrnConstants.currentGroup.ID === res.group.id
        ) {
           this.constants._scrnConstants.currentGroup.screenList =
            res.group.screenList; 
        }  Vista de pantalla  else if ( */
/*           this.constants._scrnConstants.currentScreen
        ) {
          this.constants._scrnConstants.currentScreen = screenTemp;
          this.constants._scrnConstants.currentGroup = undefined;
        }  Grupo cerrado vista panel  else { */
         /*  this.constants._scrnConstants.groupsScreen[indexGroup].screenList =
            res.group.screenList; */
/*         }
        this.constants._scrnConstants.selected = this.constants._scrnConstants
          .avalaibles
          ? this.constants._scrnConstants.avalaibles.filter(
              (screen) => screen.DepartmentID === res.group.departament
            )
          : [];
      }  agregar pantalla  else if (res.newAvalaibles && !res.newQueue) {
        console.log('agregando pantalla');
         Grupo abierto vista panel   */
/*         if (
          this.constants._scrnConstants.currentGroup &&
          this.constants._scrnConstants.currentGroup === res.group.id
        ) {
          console.log('Vista de Panel Grupo abierto detectado');
          console.log('agregando pantalla en current group');
           this.constants._scrnConstants.currentGroup.screenList =
            res.group.screenList; 
        } Vista de pantalla  else if ( */
/*           this.constants._scrnConstants.currentScreen
        ) {
          console.log('Vista de Pantalla detectada');
          this.constants._scrnConstants.currentScreen = screenTemp;
          this.constants._scrnConstants.currentGroup =
            this.constants._scrnConstants.groupsScreen[indexGroup];
          console.log({
            currentGroup: this.constants._scrnConstants.currentGroup,
          });
          this.constants._videoConstants.recharge = false;
          setTimeout(() => {
            this.constants._videoConstants.recharge = true;
          }, 100);
        } Grupo cerrado vista panel  else { */
/*           console.log('Vista de Panel grupo cerrado detectado');
          console.log('agregando pantalla en grupo existente');
          this.constants._scrnConstants.groupsScreen[indexGroup].ScreenListID =
            res.group.screenList;
        }
        this.constants._scrnConstants.selected = this.constants._scrnConstants
          .avalaibles
          ? this.constants._scrnConstants.avalaibles.filter(
              (screen) => screen.DepartmentID === res.group.departament
            )
          : [];
      } else {
        if (
          this.constants._scrnConstants.avalaibles?.find(
            (screen) => screen.ID === screenTemp.id
          )
        ) {
          this.constants._scrnConstants.avalaibles[
            this.constants._scrnConstants.avalaibles.findIndex(
              (screen) => screen.ID === screenTemp.id
            )
          ] = screenTemp;

          console.log('pantalla en disponibles');
        } else if (
          this.constants._scrnConstants.screensDetectedQueue.find(
            (screen) => screen.ID === screenTemp.id
          )
        ) {
          this.constants._scrnConstants.screensDetectedQueue[
            this.constants._scrnConstants.screensDetectedQueue.findIndex(
              (screen) => screen.ID === screenTemp.id
            )
          ] = screenTemp;
          console.log('pantalla en cola');
        }
        console.log({
          'new avalaibles': res.newAvalaibles,
          'new Queue': res.newQueue,
        });
        this.constants._scrnConstants.avalaibles = res.newAvalaibles;
        this.constants._scrnConstants.screensDetectedQueue = res.newQueue;
        if (
          this.constants._scrnConstants.groupsScreen?.find(
            (group) => group.ID === screenTemp.currentGroup
          )
        ) {
          console.log('pantalla con grupo adjunto');
        }
        this.constants._userConstants.user
          ? this.scrn.getAvalaiblescreens(this.constants._userConstants.user)
          : console.log('sin usuario');
        console.log('Pantalla de actualizada');
      } */
/*     } else {
      console.log({
        'Pantalla detectada en cola': res.screen,
        'Contador de pantallas antiguo':
          this.constants._scrnConstants.screenDetectedCount,
      });
      const screenDetected = {
        id: this.constants._scrnConstants.screenDetectedCount
          ? this.constants._scrnConstants.screenDetectedCount
          : 0,
        ip: res.screen.ip,
      };
      console.log(screenDetected);
      if (
        this.constants._scrnConstants.screensDetectedQueue &&
        !this.constants._scrnConstants.screensDetectedQueue.find(
          (screen) => screen.ip === res.screen.ip
        )
      ) {
        this.constants._scrnConstants.screensDetectedQueue.push(screenDetected);
        this.constants._scrnConstants.screenDetectedCount++;
      } else if (!this.constants._scrnConstants.screensDetectedQueue) {
        this.constants._scrnConstants.screensDetectedQueue = [screenDetected];
        this.constants._scrnConstants.screenDetectedCount++;
      }
      console.log({
        'Lista de pantallas detectadas en cola':
          this.constants._scrnConstants.screensDetectedQueue,
        'Contador de pantallas detectadas':
          this.constants._scrnConstants.screenDetectedCount,
      });
    }
    console.log({ constants: this.constants._scrnConstants }); */
  }
}
