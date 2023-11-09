import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomePage } from './pages/home/home.page';
import { GroupsPanelModule } from './components/groups-panel/groups-panel.module';
import { ScreensPanelModule } from './components/screens-panel/screens-panel.module';
import { UsersPanelModule } from './components/users-panel/users-panel.module';
import { SharedModule } from '../shared-module/shared.module';

const ModulesList = [
  CommonModule,
  MainRoutingModule,
  SharedModule,
  GroupsPanelModule,
  ScreensPanelModule,
  UsersPanelModule,
];

@NgModule({
  declarations: [HomePage],
  imports: ModulesList,
})
export class MainModule {
  constructor() {
    
    console.log('Main Module cargado...');
  }
}
