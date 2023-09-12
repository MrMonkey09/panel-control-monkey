/* Utilidades */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import routesConfig from './routes';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http:localhost:3001', options: {} };

/* Componentes */
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ScreenGroupsComponent } from './components/screen-groups/screen-groups.component';
import { ManagementPromosComponent } from './components/management-promos/management-promos.component';

/* Paginas */
import { HomePage } from './pages/home/home.page';
import { VideoPlayerPage } from './pages/video-player/video-player.page';

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
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
