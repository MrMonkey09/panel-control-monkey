import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoPlayerPage } from './pages/video-player/video-player.page';

const routes: Routes = [
  {
    path: '',
    component: VideoPlayerPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreenViewRoutingModule {}
