import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { VideoPlayerPage } from './components/video-player/video-player.page';

const routesConfig: Routes = [
  { path: '', component: HomePage },
  { path: 'view-promo', component: VideoPlayerPage },
];

export default routesConfig;
