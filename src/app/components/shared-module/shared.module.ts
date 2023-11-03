import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';

import { ApiService } from './services/api/api.service';
import { ScreensService } from './services/screens.service';
import { SocketioService } from './services/socketio.service';
import { UserServiceService } from './services/user-service.service';
import { VideoManagementService } from './services/video-management.service';
import { _ApiFetchConstants } from 'src/app/constants/api-fetch.constants';

const ComponentsList = [LoginComponent, NavbarComponent];
const ImportsList = [CommonModule, FormsModule];
const ProvidersList = [
  ApiService,
  ScreensService,
  SocketioService,
  UserServiceService,
  VideoManagementService,
  _ApiFetchConstants,
];

@NgModule({
  declarations: ComponentsList,
  imports: ImportsList,
  exports: ComponentsList,
  providers: ProvidersList,
})
export class SharedModule {}
