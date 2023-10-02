import { Component, OnInit } from '@angular/core';
import { Screen } from 'src/app/interfaces/screen';
import { ApiFecthService } from 'src/app/services/api-fecth.service';
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
  constructor(
    public scrn: ScreensService,
    public api: ApiFecthService,
    public sw: SocketioService,
    public vm: VideoManagementService
  ) {}

  ngOnInit(): void {
    this.scrn.getScreen();
    this.indexGroup = this.scrn.groupsScreen?.findIndex(
      (group) => group.id === this.scrn.currentScreen.currentGroup
    );
    console.log(this.indexGroup);
    this.sw.callback.subscribe((res) => {
      console.log('Cambio detectado: ', res);
      if (res.video) {
        if (res.group.id === this.scrn.currentScreen.currentGroup) {
          console.log(
            'grupo corresponde a pantalla actual ' + this.scrn.currentScreen.ip
          );
          this.indexGroup = this.scrn.groupsScreen?.findIndex(
            (group) => group.id === res.group.id
          );
          console.log(this.scrn.groupsScreen);
          console.log(this.indexGroup);
          this.vm.$updateVideo(res);
        }
      } else if (res.screen || res.screenDel) {
        const screenTemp: Screen = res.screen ? res.screen : res.screenDel;
        if (screenTemp.ip === this.scrn.currentScreen.ip) {
          console.log(
            'actualizacion corresponde a pantalla actual ' +
              this.scrn.currentScreen.ip
          );
          this.indexGroup = this.scrn.groupsScreen?.findIndex(
            (group) => group.id === res.group.id
          );
          console.log(this.scrn.groupsScreen);
          console.log(this.indexGroup);
          this.vm.$updateScreen(res);
        }
      } else {
        console.log({ groups: res.groups });
        this.vm.$updateScreen(res);
      }
    });
  }
}
