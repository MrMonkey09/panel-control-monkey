import { Component, OnInit } from '@angular/core';
import { ApiFecthService } from 'src/app/services/api-fecth.service';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.page.html',
  styleUrls: ['./video-player.page.css'],
})
export class VideoPlayerPage implements OnInit {
  constructor(public api: ApiFecthService, public sw: SocketioService) {}

  ngOnInit(): void {
    this.getVideo();
    this.sw.callback.subscribe((res) => {
      console.log('Cambio detectado: ', res), this.api.observador(res.data);
    });
  }

  getVideo() {
    this.api.getVideo().subscribe((res) => this.api.observador(res));
  }
}
