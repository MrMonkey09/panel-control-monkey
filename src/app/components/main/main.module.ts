import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomePage } from './pages/home/home.page';
import { SharedModule } from '../shared-module/shared.module';

@NgModule({
  declarations: [HomePage],
  imports: [CommonModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
