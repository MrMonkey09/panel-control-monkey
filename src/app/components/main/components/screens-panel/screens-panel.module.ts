import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreensPanelRoutingModule } from './screens-panel-routing.module';
import { ScreenManagementComponent } from './screen-management/screen-management.component';
import { ScreenPanelComponent } from './screen-panel/screen-panel.component';
import { FormsModule } from '@angular/forms';
const ComponentsList = [ScreenManagementComponent, ScreenPanelComponent];

@NgModule({
  declarations: ComponentsList,
  imports: [CommonModule, FormsModule, ScreensPanelRoutingModule],
  exports: ComponentsList,
})
export class ScreensPanelModule {}
