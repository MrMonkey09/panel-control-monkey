import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.page.html',
  styleUrls: ['./video-player.page.css'],
})
export class VideoPlayerPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  video: string = '../../../assets/videos/video_prueba - copia.mp4';
}
