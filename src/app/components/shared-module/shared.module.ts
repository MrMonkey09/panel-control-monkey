import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { ScreensService } from 'src/app/services/screens.service';
import { SocketioService } from 'src/app/services/socketio.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { VideoManagementService } from 'src/app/services/video-management.service';


const ComponentsList = [LoginComponent, NavbarComponent];
const ImportsList = [CommonModule, FormsModule];
const ProvidersList = [
  ApiService,
  ScreensService,
  SocketioService,
  UserServiceService,
  VideoManagementService,
];

@NgModule({
  declarations: ComponentsList,
  imports: ImportsList,
  exports: ComponentsList,
  providers: ProvidersList,
})
export class SharedModule {}
