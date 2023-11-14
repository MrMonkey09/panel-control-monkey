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
  constructor(
    public scrn: ScreensService,
    public api: ApiService,
    public sw: SocketioService,
    public vm: VideoManagementService,
    public constants: ConstantsService
  ) {
    console.log('VideoPlayer Page cargado');
    console.log({ constants: _scrnConstants });
  }

  ngOnInit(): void {
    this.scrn.getScreen();
  }
}
