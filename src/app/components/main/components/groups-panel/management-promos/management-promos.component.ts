import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    this.api.apiScreen.allScreens().subscribe({
      next: (res) => {
        console.log({ res });
      },
      complete: () => {},
    });
    this.sw.callback.subscribe((res: any) => {
      console.log('Cambio detectado: ', res);
      if (res.screen || res.screenDel) {
        this.vm.$updateScreen(res);
      } else if (res.video) {
        this.vm.$updateVideo(res);
      } else if (res.groups) {
        console.log('update groups');
        setTimeout(() => {
          if (this.constants._userConstants.user) {
            this.constants._scrnConstants.groupsScreen = res.groups;
            this.scrn.getScreenGroups(this.constants._userConstants.user);
          }
        }, 100);
      } else if (res.cont) {
        console.log('nuevo grupo, cantidad actual: ' + res.cont);
      }
    });
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
          console.log(res);
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
          this.api.apiScreen.matchScreen().subscribe({
            next: (res) => {
              console.log({ resData: this.resTemp.data });
              this.vm.$updateVideo(this.resTemp.data);
            },
            complete: () => {
              this.constants._apiConstants.recharge = false;
              if (
                this.constants._scrnConstants.groupsScreen &&
                this.constants._scrnConstants.currentGroup
              ) {
                this.constants._scrnConstants.currentGroup.CurrentVideo =
                  this.constants._videoConstants.video;
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
                ].CurrentVideo = this.constants._videoConstants.video;
                console.log(
                  this.constants._scrnConstants.groupsScreen[
                    this.constants._scrnConstants.groupsScreen.findIndex(
                      (group) =>
                        this.constants._scrnConstants.currentGroup &&
                        group.ID ===
                          this.constants._scrnConstants.currentGroup.ID
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
              setTimeout(() => {
                this.constants._apiConstants.recharge = true;
                this.progress = {
                  value: 0,
                  inProgress: false,
                  message: '',
                };
              }, 2000);
            },
          });
        },
      });
    } else {
      console.error('Por favor ingresar un archivo para guardar video');
    }
  }

  getVideo() {
    this.api.apiScreen
      .matchScreen()
      .subscribe((res) => this.vm.$updateVideo(res));
  }

  delGroup(group: GroupScreen_, user: User_) {
    console.log('Eliminando grupo de pantallas...');
    console.log({ group });
    if (group.ScreenList) {
      for (let screenDel of group.ScreenList) {
        this.constants._scrnConstants.avalaibles.push(screenDel);
        screenDel.CurrentGroupID = undefined;
        group.ScreenList = group.ScreenList.filter(
          (screenTemp) => screenTemp.ID !== screenDel.ID
        );
        this.sw.emitEvento('screen', {
          screen: screenDel,
          group: group,
          newAvalaibles: this.constants._scrnConstants.avalaibles,
        });
      }
      this.constants._scrnConstants.selected =
        this.constants._scrnConstants.avalaibles.filter(
          (screen) => screen.DepartmentID === group.DepartmentID
        );
    }
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
                complete: () => {},
              });
          }
          this.scrn.getScreenGroups(user);
          this.sw.emitEvento('group', {
            groups: this.constants._scrnConstants.groupsScreen,
          });
        },
      });
  }
}
