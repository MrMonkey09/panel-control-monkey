import { Component, OnInit } from '@angular/core';
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
  constructor(
    public scrn: ScreensService,
    public api: ApiFecthService,
    public sw: SocketioService,
    public vm: VideoManagementService
  ) {}

  ngOnInit(): void {
    /* this.getVideo(); */
    this.scrn.getScreen();
    this.sw.callback.subscribe((res) => {
      console.log('Cambio detectado: ', res);
      if (res.screen) {
        this.vm.observador2(res);
      } else if (res.video) {
        this.vm.observador(res);
      }
    });
  }

  /*  getVideo() {
    this.api.getVideo().subscribe((res) => this.api.observador(res));
  } */
}
