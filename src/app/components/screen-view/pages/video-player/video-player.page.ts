import { Component, OnInit } from '@angular/core';
import { _scrnConstants } from 'src/app/constants/screens.constants';
import { Screen_ } from 'src/app/interfaces/screen';
import { ApiService } from '../../../../services/api/api.service';
import { ScreensService } from '../../../../services/screens.service';
import { SocketioService } from '../../../../services/socketio.service';
import { VideoManagementService } from '../../../../services/video-management.service';

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
    public api: ApiService,
    public sw: SocketioService,
    public vm: VideoManagementService
  ) {
    console.log('VideoPlayer Page cargado');
    console.log({ constants: _scrnConstants });
  }

  ngOnInit(): void {
    this.scrn.getScreen();
/*     this.indexGroup = _scrnConstants.groupsScreen?.findIndex(
      (group) => group.ID === _scrnConstants.currentScreen.CurrentGroup
    );
    console.log(this.indexGroup);
    this.sw.callback.subscribe((res) => {
      console.log('Cambio detectado: ', res);
      if (res.video) {
        console.log(_scrnConstants.currentScreen);
        if (res.group.id === _scrnConstants.currentScreen.CurrentGroup) {
          console.log(
            'grupo corresponde a pantalla actual ' +
              _scrnConstants.currentScreen.IP
          );
          this.indexGroup = _scrnConstants.groupsScreen?.findIndex(
            (group) => group.ID === res.group.id
          );
          console.log(_scrnConstants.groupsScreen);
          console.log(this.indexGroup);
          this.vm.$updateVideo(res);
        }
      } else if (res.screen || res.screenDel) {
        const screenTemp: Screen_ = res.screen ? res.screen : res.screenDel;
        console.log({ screenTemp, constrants: _scrnConstants });
        if (
          _scrnConstants.currentScreen &&
          screenTemp.IP === _scrnConstants.currentScreen.IP
        ) {
          console.log(
            'actualizacion corresponde a pantalla actual ' +
              _scrnConstants.currentScreen.IP
          );
          this.indexGroup = _scrnConstants.groupsScreen?.findIndex(
            (group) => group.ID === res.group.id
          );
          console.log(_scrnConstants.groupsScreen);
          console.log(this.indexGroup);
          this.vm.$updateScreen(res);
        } else {
          this.scrn.getScreen();
        }
      } else {
        console.log({ groups: res.groups });
        this.vm.$updateScreen(res);
      }
    }); */
  }
}
