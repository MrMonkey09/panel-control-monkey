import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';

import { HomePage } from './pages/home/home.page';
import { VideoPlayerPage } from './pages/video-player/video-player.page';

import routesConfig from './routes';
import { ScreenGroupsComponent } from './components/screen-groups/screen-groups.component';
import { ManagementPromosComponent } from './components/management-promos/management-promos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VideoPlayerPage,
    HomePage,
    LoginComponent,
    ScreenGroupsComponent,
    ManagementPromosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routesConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
