import { Component, OnInit } from '@angular/core';
import { _scrnConstants } from 'src/app/constants/screens.constants';
import { ApiService } from 'src/app/services/api/api.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { ScreensService } from 'src/app/services/screens.service';
import { SocketioService } from 'src/app/services/socketio.service';
import { VideoManagementService } from 'src/app/services/video-management.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.page.html',
  styleUrls: ['./video-player.page.css'],
})
export class VideoPlayerPage implements OnInit {
  public indexGroup!: number;
  public screenRes!: { width: number; height: number };
  private resTemp!: any;

  constructor(
    public scrn: ScreensService,
    public api: ApiService,
    public sw: SocketioService,
    public vm: VideoManagementService,
    public constants: ConstantsService
  ) {
    this.sw.callback.subscribe((res: any) => {
      console.log('Cambio detectado: ', res);
      /* if (res.screen || res.screenDel) {
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
      } */
    });
  }

  ngOnInit(): void {
    console.log('VideoPlayer Page cargado');
    this.start();
  }

  start() {
    console.log('Obteniendo todas las pantallas...');
    this.api.apiScreen.allScreens().subscribe({
      next: (res) => {
        this.resTemp = res;
      },
      complete: () => {
        this.constants._scrnConstants.screenList = this.resTemp;
        console.log({
          newScreenList: this.constants._scrnConstants.screenList,
        });
        this.scrn.getScreen();
        /* console.log('Obteniendo todos los grupos de pantallas...');
        this.api.apiGroupScreen.allGroupsScreen().subscribe({
          next: (res) => {
            this.resTemp = res;
          },
          complete: () => {
            const newGroupList = this.resTemp;
            for (let group of newGroupList) {
              const indexGroup = newGroupList.findIndex(
                (groupTemp: any) => groupTemp.ID === group.ID
              );
              this.api.apiScreen.getGroupScreenList(group.ID).subscribe({
                next: (res) => {
                  this.resTemp = res;
                },
                complete: () => {
                  console.log({ resGroup: this.resTemp });
                  let newScreenListGroup: Array<any> = [];
                  for (let screen of this.resTemp) {
                    const newScreen =
                      this.constants._scrnConstants.screenList.find(
                        (screenTemp) => screenTemp.ID === screen.ScreenID
                      );
                    newScreenListGroup.push(newScreen);
                  }
                  group.ScreenList = newScreenListGroup;
                  console.log({
                    groupScreenList: group.ScreenList,
                    newScreenListGroup,
                  });
                  newGroupList[indexGroup] = group;
                },
              });
            }
            this.constants._scrnConstants.groupsScreen = newGroupList;
            console.log({
              newGroupsList: this.constants._scrnConstants.groupsScreen,
            });
            this.scrn.getScreenGroups(userTemp);
          },
        }); */
      },
    });
  }
}
