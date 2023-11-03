import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, DoCheck, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject, timeout } from 'rxjs';
import { ApiService } from 'src/app/components/shared-module/services/api/api.service';
import { ScreensService } from 'src/app/components/shared-module/services/screens.service';
import { SocketioService } from 'src/app/components/shared-module/services/socketio.service';
import { UserServiceService } from 'src/app/components/shared-module/services/user-service.service';
import { VideoManagementService } from 'src/app/components/shared-module/services/video-management.service';

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
  progressManagement = new Observable((subscriber) => {
    subscriber.next(this.progress);
    subscriber.complete();
  });

  constructor(
    public api: ApiService,
    private cookieService: CookieService,
    private sw: SocketioService,
    private http: HttpClient,
    public scrn: ScreensService,
    public vm: VideoManagementService,
    public userService: UserServiceService
  ) {}
  ngOnInit(): void {
    this.id = this.cookieService.get('user-id');
    this.sw.callback.subscribe((res) => {
      console.log('Cambio detectado: ', res);
      if (res.screen || res.screenDel) {
        this.vm.$updateScreen(res);
      } else if (res.video) {
        this.vm.$updateVideo(res);
      } else if (res.groups) {
        console.log('update groups');
        setTimeout(() => {
          if (this.userService._userConstants.user) {
            this.scrn._constants.groupsScreen = res.groups;
            this.scrn.getScreenGroups(this.userService._userConstants.user);
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
            this.api._apiConstants.recharge = false;
            if (
              this.scrn._constants.groupsScreen &&
              this.scrn._constants.currentGroup &&
              this.scrn._constants
            ) {
              this.scrn._constants.currentGroup.currentVideo =
                this.vm._videoConstants.video;
              console.log({
                groupsScreen: this.scrn._constants.groupsScreen,
                currentGroup: this.scrn._constants.currentGroup,
              });
              this.scrn._constants.groupsScreen[
                this.scrn._constants.groupsScreen.findIndex(
                  (group) =>
                    this.scrn._constants.currentGroup &&
                    group.id === this.scrn._constants.currentGroup.id
                )
              ].currentVideo = this.vm._videoConstants.video;
              console.log(
                this.scrn._constants.groupsScreen[
                  this.scrn._constants.groupsScreen.findIndex(
                    (group) =>
                      this.scrn._constants.currentGroup &&
                      group.id === this.scrn._constants.currentGroup.id
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
              video: this.vm._videoConstants.video,
              group: this.scrn._constants.currentGroup,
            });
            console.log(this.vm._videoConstants.video);
            if (this.scrn._constants.currentGroup) {
              console.log(
                this.scrn._constants.currentGroup.currentVideo
              );
            }
            console.log('completado');
            setTimeout(() => {
              this.api._apiConstants.recharge = true;
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
