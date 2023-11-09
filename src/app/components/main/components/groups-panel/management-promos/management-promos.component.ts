import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Screen_ } from 'src/app/interfaces/screen';
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
    console.log($event);
    const [file] = $event.target.files;
    console.log(file);
    this.fileTemp = {
      fileRaw: file,
      fileName: file.name,
    };
  }

  uploadFile() {
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
        this.api.apiScreen.matchScreen().subscribe({
          next: (res) => {
            console.log(this.resTemp.data);
            this.vm.$updateVideo(this.resTemp.data);
          },
          complete: () => {
            this.constants._apiConstants.recharge = false;
            if (
              this.constants._scrnConstants.groupsScreen &&
              this.constants._scrnConstants.currentGroup &&
              this.constants._scrnConstants
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
            this.sw.emitEvento('video', {
              video: this.constants._videoConstants.video,
              group: this.constants._scrnConstants.currentGroup,
            });
            console.log(this.constants._videoConstants.video);
            if (this.constants._scrnConstants.currentGroup) {
              console.log(
                this.constants._scrnConstants.currentGroup.CurrentVideo
              );
            }
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
  }

  getVideo() {
    this.api.apiScreen
      .matchScreen()
      .subscribe((res) => this.vm.$updateVideo(res));
  }
}
