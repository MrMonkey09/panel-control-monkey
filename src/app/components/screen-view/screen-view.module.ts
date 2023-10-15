import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenViewRoutingModule } from './screen-view-routing.module';
import { VideoPlayerPage } from './pages/video-player/video-player.page';

@NgModule({
  declarations: [VideoPlayerPage],
  imports: [CommonModule, ScreenViewRoutingModule],
})
export class ScreenViewModule {
  constructor() {
    console.log('ScreenView Module Cargado...');
  }
}
