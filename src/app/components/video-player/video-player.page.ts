import { Component, OnInit } from '@angular/core';
import { ApiFecthService } from 'src/app/services/api-fecth.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.page.html',
  styleUrls: ['./video-player.page.css'],
})
export class VideoPlayerPage implements OnInit {
  constructor(public api: ApiFecthService) {}

  ngOnInit(): void {}
}
