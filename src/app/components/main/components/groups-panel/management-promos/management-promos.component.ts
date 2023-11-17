import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { group } from 'console';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { GroupScreen_ } from 'src/app/interfaces/group-screen';
import { Screen_ } from 'src/app/interfaces/screen';
import { User_ } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api/api.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { ScreensService } from 'src/app/services/screens.service';
import { SocketioService } from 'src/app/services/socketio.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { VideoManagementService } from 'src/app/services/video-management.service';

@Component({
  selector: 'app-management-promos',
  templateUrl: './management-promos.component.html',
  styleUrls: ['./management-promos.component.css'],
})
export class ManagementPromosComponent implements OnInit {
  id?: any;
  progress: { value: number | null; inProgress: boolean; message: string } = {
    value: 0,
    inProgress: false,
    message: '',
  };
  screenList!: Array<Screen_>;
  progressManagement = new Observable((subscriber) => {
    subscriber.next(this.progress);
    subscriber.complete();
  });

  constructor(
    public api: ApiService,
    private cookieService: CookieService,
    private sw: SocketioService,
    public scrn: ScreensService,
    public vm: VideoManagementService,
    public userService: UserServiceService,
    public constants: ConstantsService
  ) {}
  ngOnInit(): void {
    this.id = this.cookieService.get('user-id');
  }

  // Logica de la subida y despliegue de videos
  public fileTemp: any;
  private body = new FormData();
  private resTemp!: any;

  getFile($event: any) {
    this.fileTemp = undefined;
    console.log({ $event });
    const [file] = $event.target.files;
    console.log({ file });
    if (file) {
      this.fileTemp = {
        fileRaw: file,
        fileName: file.name,
      };
    }
  }

  uploadFile() {
    console.log({ fileTemp: this.fileTemp });
    if (this.fileTemp && this.fileTemp.fileRaw) {
      this.body.delete('myFile');
      this.body.append('myFile', this.fileTemp.fileRaw, this.fileTemp.fileName);
      console.log(this.body.get('myFile'));
      this.api.apiSharedApi.apiUpload(this.body).subscribe({
        next: (res) => {
          console.log({ res });
          this.resTemp = res.body;
          if (res.type === HttpEventType.UploadProgress) {
            this.progressManagement
              .subscribe({
                next: () => {
                  this.progress = {
                    value: Math.round((100 * res.loaded) / res.total),
                    inProgress: true,
                    message: '',
                  };
                  console.log(res);
                },
              })
              .unsubscribe();
          }
        },
        complete: () => {
          console.log('carga completada');
          console.log({ resData: this.resTemp.data });
          this.constants._apiConstants.recharge = false;
          if (
            this.constants._scrnConstants.groupsScreen &&
            this.constants._scrnConstants.currentGroup
          ) {
            this.constants._scrnConstants.currentGroup.CurrentVideo =
              this.constants._apiConstants.urlApi + this.resTemp.data.filename;
            console.log({
              groupsScreen: this.constants._scrnConstants.groupsScreen,
              currentGroup: this.constants._scrnConstants.currentGroup,
            });
            this.constants._scrnConstants.groupsScreen[
              this.constants._scrnConstants.groupsScreen.findIndex(
                (group) =>
                  this.constants._scrnConstants.currentGroup &&
                  group.ID === this.constants._scrnConstants.currentGroup.ID
              )
            ].CurrentVideo =
              this.constants._apiConstants.urlApi + this.resTemp.data.filename;
            console.log(
              this.constants._scrnConstants.groupsScreen[
                this.constants._scrnConstants.groupsScreen.findIndex(
                  (group) =>
                    this.constants._scrnConstants.currentGroup &&
                    group.ID === this.constants._scrnConstants.currentGroup.ID
                )
              ]
            );
          }
          this.progress = {
            value: 0,
            inProgress: false,
            message: 'Carga completada.',
          };
          console.log('completado');
          const body = {
            columnsData: `CurrentVideo = '${this.constants._apiConstants.urlApi}${this.resTemp.data.filename}'`,
            criterion: `WHERE ID = ${this.constants._scrnConstants.currentGroup.ID}`,
          };
          if (this.constants._scrnConstants.currentGroup.ID) {
            this.api.apiGroupScreen
              .updateGroupScreen(
                body,
                this.constants._scrnConstants.currentGroup.ID
              )
              .subscribe({
                next: (res) => {
                  console.log({ res });
                },
                complete: () => {
                  setTimeout(() => {
                    this.constants._apiConstants.recharge = true;
                    this.progress = {
                      value: 0,
                      inProgress: false,
                      message: '',
                    };
                    this.sw.emitEvento('group', {
                      groupDetected: this.constants._scrnConstants.currentGroup,
                      isGroupActive: true,
                      isUploadVideo: true,
                    });
                  }, 100);
                },
              });
          }
        },
      });
    } else {
      console.error('Por favor ingresar un archivo para guardar video');
    }
  }

  delGroup(group: GroupScreen_, user: User_) {
    console.log('Eliminando grupo de pantallas...');
    console.log({ group });
    const indexGroup = this.constants._scrnConstants.groupsScreen.findIndex(
      (groupTemp) => groupTemp.ID === group.ID
    );
    let resTemp;
    if (group.ScreenList && group.ScreenList.length !== 0) {
      for (let screenDel of group.ScreenList) {
        this.api.apiScreen.removeScreenOfList(screenDel.ID).subscribe({
          next: (res) => {
            console.log({ resDelList: res });
            resTemp = res;
          },
          complete: () => {
            screenDel.CurrentGroupID = undefined;
            const columns = Object.keys(screenDel);
            const data = Object.values(screenDel);
            const columnsData = `${columns[1]} = '${data[1]}', ${columns[2]} = '${data[2]}', ${columns[3]} = Null, ${columns[4]} = ${data[4]}, ${columns[5]} = ${data[5]}`;
            const body = {
              columnsData: columnsData,
              criterion: `WHERE ID = ${screenDel.ID}`,
            };
            console.log({ bodyDel: body });
            this.api.apiScreen.updateScreen(body, screenDel.ID).subscribe({
              next: (res) => {
                console.log({ res });
              },
              complete: () => {
                const indexScreen =
                  this.constants._scrnConstants.screenList.findIndex(
                    (screenTemp) => screenTemp.ID === screenDel.ID
                  );
                if (
                  this.constants._scrnConstants.screenList[indexScreen] &&
                  this.constants._scrnConstants.screenList[indexScreen]
                    .CurrentGroupID
                ) {
                  this.constants._scrnConstants.screenList[
                    indexScreen
                  ].CurrentGroupID = undefined;
                }
                if (
                  this.constants._scrnConstants.avalaibles &&
                  this.constants._scrnConstants.avalaibles.length !== 0
                ) {
                  this.constants._scrnConstants.avalaibles.push(screenDel);
                } else {
                  this.constants._scrnConstants.avalaibles = [screenDel];
                }
                if (
                  this.constants._scrnConstants.selected &&
                  this.constants._scrnConstants.selected.length !== 0
                ) {
                  this.constants._scrnConstants.selected.push(screenDel);
                } else {
                  this.constants._scrnConstants.selected = [screenDel];
                }
                group.ScreenList = group.ScreenList.filter(
                  (screenTemp) => screenTemp.ID !== screenDel.ID
                );
                this.constants._scrnConstants.groupsScreen[
                  indexGroup
                ].ScreenList = group.ScreenList.filter(
                  (screenTemp) => screenTemp.ID !== screenDel.ID
                );
                const indexCurrentScreen =
                  this.constants._scrnConstants.screenList.findIndex(
                    (screenTemp) => screenTemp.ID === screenDel.ID
                  );
                console.log({ indexCurrentScreen });
                this.sw.emitEvento('screen', {
                  screenDetected: screenDel,
                  isActive: true,
                  isOutListGroup: true,
                });
                this.sw.emitEvento('group', {
                  groupDetected: group,
                  isGroupActive: true,
                  isOutListGroup: true,
                });
                if (indexCurrentScreen < group.ScreenList.length) {
                  console.log('Ultima pantalla en lista del grupo');
                  this.api.apiGroupScreen
                    .deleteGroupScreen(group.ID ? group.ID : -1)
                    .subscribe({
                      next: (res) => {
                        this.resTemp = res;
                      },
                      complete: () => {
                        console.log({ resTemp: this.resTemp });
                        this.constants._scrnConstants.groupsScreen =
                          this.constants._scrnConstants.groupsScreen.filter(
                            (groupTemp) => groupTemp.ID !== group.ID
                          );
                        if (group.ScreenList) {
                          this.api.apiScreen
                            .deleteScreenList(group.ID ? group.ID : -1)
                            .subscribe({
                              next: (res) => {
                                console.log({ res });
                              },
                            });
                        }
                        this.sw.emitEvento('group', {
                          groupDetectedDel: group,
                        });
                        this.scrn.getScreenGroups(user);
                      },
                    });
                }
              },
            });
          },
        });
      }
    } else {
      this.api.apiGroupScreen
        .deleteGroupScreen(group.ID ? group.ID : -1)
        .subscribe({
          next: (res) => {
            this.resTemp = res;
          },
          complete: () => {
            console.log({ resTemp: this.resTemp });
            this.constants._scrnConstants.groupsScreen =
              this.constants._scrnConstants.groupsScreen.filter(
                (groupTemp) => groupTemp.ID !== group.ID
              );
            this.sw.emitEvento('group', {
              groupDetectedDel: group,
            });
            this.scrn.getScreenGroups(user);
          },
        });
    }
  }
}
