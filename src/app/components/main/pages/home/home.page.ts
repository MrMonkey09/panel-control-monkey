import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/services/api/api.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { ScreensService } from 'src/app/services/screens.service';
import { SocketioService } from 'src/app/services/socketio.service';
import { VideoManagementService } from 'src/app/services/video-management.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage implements OnInit, AfterViewInit {
  screenRes!: { width: number; height: number };
  constructor(
    public cookieService: CookieService,
    public constants: ConstantsService,
    public scrnService: ScreensService,
    public api: ApiService,
    private sw: SocketioService,
    private vm: VideoManagementService
  ) {
    this.sw.callback.subscribe((res: any) => {
      console.log('Cambio detectado: ', res);
      if (this.cookieService.get('user-id')) {
        console.log('vista usuario');
        if (res.groupDetectedDel || res.newGroupDetected) {
          if (
            res.newGroupDetected &&
            res.newGroupDetected.DepartmentID ===
              this.constants._userConstants.user.DepartmentID
          ) {
            console.log('grupo nuevo detectado');
            if (
              this.constants._scrnConstants.groupsScreen &&
              this.constants._scrnConstants.groupsScreen.length !== 0
            ) {
              this.constants._scrnConstants.groupsScreen.push(
                res.newGroupDetected
              );
            } else {
              this.constants._scrnConstants.groupsScreen = [
                res.newGroupDetected,
              ];
            }
            if (
              this.constants._scrnConstants.activeGroupScreens &&
              this.constants._scrnConstants.activeGroupScreens.length !== 0
            ) {
              this.constants._scrnConstants.activeGroupScreens.push(
                res.newGroupDetected
              );
            } else {
              this.constants._scrnConstants.activeGroupScreens = [
                res.newGroupDetected,
              ];
            }
          }
          if (
            res.groupDetectedDel &&
            res.groupDetectedDel.DepartmentID ===
              this.constants._userConstants.user.DepartmentID
          ) {
            console.log('grupo eliminado detectado');
            if (
              this.constants._scrnConstants.groupsScreen &&
              this.constants._scrnConstants.groupsScreen.length !== 0
            ) {
              this.constants._scrnConstants.groupsScreen =
                this.constants._scrnConstants.groupsScreen.filter(
                  (group) => group.ID !== res.groupDetectedDel.ID
                );
            }
            if (
              this.constants._scrnConstants.activeGroupScreens &&
              this.constants._scrnConstants.activeGroupScreens.length !== 0
            ) {
              this.constants._scrnConstants.activeGroupScreens =
                this.constants._scrnConstants.activeGroupScreens.filter(
                  (group) => group.ID !== res.groupDetectedDel.ID
                );
            }
            if (
              this.constants._scrnConstants.currentGroup &&
              this.constants._scrnConstants.currentGroup.ID ===
                res.groupDetectedDel.ID
            ) {
              this.constants._scrnConstants.currentGroup = {
                Name: '',
                ScreenList: [],
                CurrentVideo: '',
                DepartmentID: -1,
              };
              this.constants._scrnConstants.isCurrentGroup = false;
            }
          }
        }
        if (res.groupDetected || res.isOutListGroup || res.isAddListGroup) {
          console.log('actualizando grupo');
          if (
            res.groupDetected &&
            res.groupDetected.DepartmentID ===
              this.constants._userConstants.user.DepartmentID &&
            this.constants._scrnConstants.currentGroup &&
            this.constants._scrnConstants.currentGroup.ID ===
              res.groupDetected.ID
          ) {
            this.constants._scrnConstants.currentGroup = res.groupDetected;
            console.log('grupo actual actualizado');
            if (res.isUploadVideo) {
              this.constants._apiConstants.recharge = false;
              setTimeout(() => {
                this.constants._apiConstants.recharge = true;
              }, 100);
            }
          } else if (
            res.groupDetected &&
            res.groupDetected.DepartmentID ===
              this.constants._userConstants.user.DepartmentID
          ) {
            const indexGroupListTemp =
              this.constants._scrnConstants.groupsScreen.findIndex(
                (group) => group.ID === res.groupDetected.ID
              );
            const indexGroupActiveTemp =
              this.constants._scrnConstants.activeGroupScreens.findIndex(
                (group) => group.ID === res.groupDetected.ID
              );
            console.log({ indexGroupActiveTemp, indexGroupListTemp });
            if (
              res.groupDetected.DepartmentID ===
                this.constants._userConstants.user.DepartmentID &&
              indexGroupListTemp !== undefined
            ) {
              this.constants._scrnConstants.groupsScreen[indexGroupListTemp] =
                res.groupDetected;
              console.log(
                'grupo en lista general actualizado',
                this.constants._scrnConstants.groupsScreen[indexGroupListTemp]
              );
            }
            if (
              res.groupDetected.DepartmentID ===
                this.constants._userConstants.user.DepartmentID &&
              indexGroupActiveTemp !== undefined
            ) {
              this.constants._scrnConstants.activeGroupScreens[
                indexGroupActiveTemp
              ] = res.groupDetected;
              console.log(
                'grupo en lista activa actualizado',
                this.constants._scrnConstants.activeGroupScreens[
                  indexGroupActiveTemp
                ]
              );
            }
          }
          if (
            res.isOutListGroup &&
            res.screenDetected &&
            res.screenDetected.DepartmentID ===
              this.constants._userConstants.user.DepartmentID
          ) {
            console.log('pantalla fuera de lista de grupo', res.screenDetected);
            if (
              this.constants._scrnConstants.avalaibles &&
              this.constants._scrnConstants.avalaibles.length !== 0
            ) {
              this.constants._scrnConstants.avalaibles.push(res.screenDetected);
            } else {
              this.constants._scrnConstants.avalaibles = [res.screenDetected];
            }
            if (
              this.constants._scrnConstants.selected &&
              this.constants._scrnConstants.selected.length !== 0
            ) {
              this.constants._scrnConstants.selected.push(res.screenDetected);
            } else {
              this.constants._scrnConstants.selected = [res.screenDetected];
            }
          } else if (
            res.isAddListGroup &&
            res.screenDetected &&
            res.screenDetected.DepartmentID ===
              this.constants._userConstants.user.DepartmentID
          ) {
            console.log(
              'pantalla dentro de lista de grupo',
              res.screenDetected
            );
            if (
              this.constants._scrnConstants.avalaibles &&
              this.constants._scrnConstants.avalaibles.length !== 0
            ) {
              this.constants._scrnConstants.avalaibles =
                this.constants._scrnConstants.avalaibles.filter(
                  (screen) => screen.IP !== res.screenDetected.IP
                );
            }
            if (
              this.constants._scrnConstants.selected &&
              this.constants._scrnConstants.selected.length !== 0
            ) {
              this.constants._scrnConstants.selected =
                this.constants._scrnConstants.selected.filter(
                  (screen) => screen.IP !== res.screenDetected.IP
                );
            }
          }
        } else if (
          res.screenDetected &&
          res.isActive &&
          res.screenDetected.DepartmentID ===
            this.constants._userConstants.user.DepartmentID
        ) {
          console.log('actualizando pantalla');
          const screenAvalaibleIndex =
            this.constants._scrnConstants.avalaibles.findIndex(
              (screen) => screen.IP === res.screenDetected.IP
            );
          const screenSelectedIndex =
            this.constants._scrnConstants.selected.findIndex(
              (screen) => screen.IP === res.screenDetected.IP
            );
          if (screenAvalaibleIndex !== undefined) {
            this.constants._scrnConstants.avalaibles[screenAvalaibleIndex] =
              res.screenDetected;
          }
          if (screenSelectedIndex !== undefined) {
            this.constants._scrnConstants.selected[screenSelectedIndex] =
              res.screenDetected;
          }
        }
        if (
          res.screenDetected &&
          res.isActive === false &&
          res.departmentID === this.constants._userConstants.user
        ) {
          if (
            this.constants._scrnConstants.avalaibles &&
            this.constants._scrnConstants.avalaibles.length !== 0
          ) {
            this.constants._scrnConstants.avalaibles =
              this.constants._scrnConstants.avalaibles.filter(
                (screen) => screen.IP !== res.screenDetected.IP
              );
          }
          if (
            this.constants._scrnConstants.selected &&
            this.constants._scrnConstants.selected.length !== 0
          ) {
            this.constants._scrnConstants.selected =
              this.constants._scrnConstants.selected.filter(
                (screen) => screen.IP !== res.screenDetected.IP
              );
          }
          if (
            this.constants._scrnConstants.screensDetectedQueue &&
            this.constants._scrnConstants.screensDetectedQueue.length !== 0
          ) {
            this.constants._scrnConstants.screensDetectedQueue.push(
              res.screenDetected
            );
          } else {
            this.constants._scrnConstants.screensDetectedQueue = [
              res.screenDetected,
            ];
          }
        } else if (res.screenDetected && !res.screenDetected.DepartmentID) {
          const departmentTemp =
            this.constants._userConstants.departmentList.find(
              (department) =>
                department.ID ===
                this.constants._userConstants.user.DepartmentID
            );
          if (
            departmentTemp &&
            departmentTemp.Name === 'Técnico Soporte Tecnológico' &&
            this.constants._scrnConstants.screensDetectedQueue &&
            this.constants._scrnConstants.screensDetectedQueue.length !== 0
          ) {
            this.constants._scrnConstants.screensDetectedQueue.push({
              IP: res.screenDetected,
            });
          } else {
            this.constants._scrnConstants.screensDetectedQueue = [
              { IP: res.screenDetected },
            ];
          }
        }
      }
    });
  }

  ngOnInit(): void {
    console.log('Home Component Cargado');
  }

  ngAfterViewInit(): void {}
}
