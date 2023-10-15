import { Component, OnInit } from '@angular/core';
import { _ScreensConstants } from 'src/app/constants/screens.constants';
import { Screen_ } from 'src/app/interfaces/screen';
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
  public screenRes!: { width: number; height: number };
  constructor(
    public scrn: ScreensService,
    public api: ApiFecthService,
    public sw: SocketioService,
    public vm: VideoManagementService
  ) {
    console.log('VideoPlayer Page cargado');
    console.log({ constants: scrn._screensConstants });
  }

  ngOnInit(): void {
    this.scrn.getScreen();
    this.indexGroup = this.scrn._screensConstants.groupsScreen?.findIndex(
      (group) =>
        group.id === this.scrn._screensConstants.currentScreen.currentGroup
    );
    console.log(this.indexGroup);
    this.sw.callback.subscribe((res) => {
      console.log('Cambio detectado: ', res);
      if (res.video) {
        console.log(this.scrn._screensConstants.currentScreen);
        if (
          res.group.id ===
          this.scrn._screensConstants.currentScreen.currentGroup
        ) {
          console.log(
            'grupo corresponde a pantalla actual ' +
              this.scrn._screensConstants.currentScreen.ip
          );
          this.indexGroup = this.scrn._screensConstants.groupsScreen?.findIndex(
            (group) => group.id === res.group.id
          );
          console.log(this.scrn._screensConstants.groupsScreen);
          console.log(this.indexGroup);
          this.vm.$updateVideo(res);
        }
      } else if (res.screen || res.screenDel) {
        const screenTemp: Screen_ = res.screen ? res.screen : res.screenDel;
        console.log({ screenTemp, constrants: this.scrn._screensConstants });
        if (
          this.scrn._screensConstants.currentScreen &&
          screenTemp.ip === this.scrn._screensConstants.currentScreen.ip
        ) {
          console.log(
            'actualizacion corresponde a pantalla actual ' +
              this.scrn._screensConstants.currentScreen.ip
          );
          this.indexGroup = this.scrn._screensConstants.groupsScreen?.findIndex(
            (group) => group.id === res.group.id
          );
          console.log(this.scrn._screensConstants.groupsScreen);
          console.log(this.indexGroup);
          this.vm.$updateScreen(res);
        } else {
          this.scrn.getScreen();
        }
      } else {
        console.log({ groups: res.groups });
        this.vm.$updateScreen(res);
      }
    });
  }
}
