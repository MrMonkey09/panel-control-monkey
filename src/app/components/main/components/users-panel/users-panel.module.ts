import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersPanelRoutingModule } from './users-panel-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { FormsModule } from '@angular/forms';

const ComponentsList = [UserManagementComponent, UserPanelComponent];
@NgModule({
  declarations: ComponentsList,
  imports: [CommonModule, FormsModule, UsersPanelRoutingModule],
  exports: ComponentsList,
})
export class UsersPanelModule {}
