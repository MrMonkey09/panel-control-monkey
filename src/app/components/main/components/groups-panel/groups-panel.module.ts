import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsPanelRoutingModule } from './groups-panel-routing.module';
import { CreateGroupComponent } from './create-group/create-group.component';
import { ManagementPromosComponent } from './management-promos/management-promos.component';
import { ScreenGroupsComponent } from './screen-groups/screen-groups.component';
import { FormsModule } from '@angular/forms';

const ComponentsList = [
  CreateGroupComponent,
  ManagementPromosComponent,
  ScreenGroupsComponent,
];

@NgModule({
  declarations: ComponentsList,
  imports: [
    CommonModule,
    FormsModule,
    /* GroupsPanelRoutingModule */
  ],
  exports: ComponentsList,
})
export class GroupsPanelModule {}
